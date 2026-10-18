#!/usr/bin/env node
/**
 * check-seo.js — validates the SEO head of every page listed in pages.json.
 *
 * Run from cb-app.public:   node seo/check-seo.js
 * Exits non-zero if any check FAILS, so it can gate CI.
 *
 * The key guarantee: a page's canonical must point at that page, not at the
 * homepage. That mistake silently de-indexes category pages, and it is exactly
 * what had happened to aluminium-sliding-windows.html and
 * aluminium-sliding-doors.html before this system existed.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, 'pages.json'), 'utf8'));
const SITE = DATA.site;

const failures = [];
const warnings = [];
const fail = (m) => failures.push(m);
const warn = (m) => warnings.push(m);

const TITLE_MAX = 60;
const TITLE_HARD_MAX = 65;
const DESC_MIN = 70;
const DESC_MAX = 160;

const getMeta = (html, re) => {
  const m = html.match(re);
  return m ? m[1] : null;
};

function checkPage(page) {
  const file = path.join(ROOT, page.file);
  const tag = page.file;

  if (!fs.existsSync(file)) {
    fail(`${tag}: listed in pages.json but the file does not exist`);
    return;
  }
  const raw = fs.readFileSync(file, 'utf8');
  // Mask HTML comments with equal-length spaces: character indices stay aligned,
  // but tags that only appear inside a comment - e.g. the literal
  // "<!-- Add this wrapper right after <body> -->" in two of these pages - are
  // no longer counted as real elements.
  const html = raw.replace(/<!--[\s\S]*?-->/g, (m) => ' '.repeat(m.length));
  const canonical = SITE.origin + page.path;

  // --- canonical: must self-reference ---
  const can = getMeta(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  if (!can) {
    fail(`${tag}: no <link rel="canonical">`);
  } else if (can !== canonical) {
    const why = can === SITE.origin + '/'
      ? ' (points at the HOMEPAGE - this de-indexes the page)'
      : '';
    fail(`${tag}: canonical is "${can}" but should be "${canonical}"${why}`);
  }

  // --- title ---
  const title = getMeta(html, /<title>([\s\S]*?)<\/title>/i);
  if (!title) {
    fail(`${tag}: no <title>`);
  } else {
    if (title.length > TITLE_HARD_MAX) fail(`${tag}: title is ${title.length} chars (>${TITLE_HARD_MAX}), it will be truncated`);
    else if (title.length > TITLE_MAX) warn(`${tag}: title is ${title.length} chars (>${TITLE_MAX}), may be truncated`);
  }

  // --- description ---
  const desc = getMeta(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
  if (!desc) {
    fail(`${tag}: no meta description`);
  } else {
    if (desc.length < DESC_MIN) warn(`${tag}: description is only ${desc.length} chars (<${DESC_MIN})`);
    if (desc.length > DESC_MAX) fail(`${tag}: description is ${desc.length} chars (>${DESC_MAX}), it will be truncated`);
  }

  // --- exactly one h1 ---
  const h1s = html.match(/<h1\b/gi) || [];
  if (h1s.length === 0) fail(`${tag}: no <h1>`);
  else if (h1s.length > 1) fail(`${tag}: ${h1s.length} <h1> elements (must be exactly 1)`);
  if (/<h1[^>]*class=["'][^"']*widget-title/i.test(html) && h1s.length > 1) {
    warn(`${tag}: section headings are still <h1> - demote them to <h2>`);
  }

  // --- structural placement of the generated blocks ---
  const headClose = html.search(/<\/head>/i);
  const bodyOpen = html.search(/<body[^>]*>/i);
  const bodyClose = html.search(/<\/body>/i);
  if ((html.match(/<\/head>/gi) || []).length !== 1) fail(`${tag}: expected exactly one </head>`);
  if ((html.match(/<body[^>]*>/gi) || []).length !== 1) fail(`${tag}: expected exactly one <body>`);

  const headMarker = raw.search(/SEO:HEAD:START/);
  if (headMarker === -1) fail(`${tag}: generated SEO head block missing (run: node seo/build-seo.js)`);
  else if (headClose !== -1 && headMarker > headClose) fail(`${tag}: generated head block sits outside <head>`);

  const h1Marker = raw.search(/SEO:H1:START/);
  if (h1Marker === -1) fail(`${tag}: generated <h1> block missing (run: node seo/build-seo.js)`);
  else if (h1Marker < bodyOpen || (bodyClose !== -1 && h1Marker > bodyClose)) {
    fail(`${tag}: generated <h1> sits outside <body>`);
  }

  // --- Open Graph / Twitter ---
  const ogRequired = ['og:title', 'og:description', 'og:url', 'og:image'];
  for (const prop of ogRequired) {
    const re = new RegExp(`<meta[^>]+property=["']${prop}["'][^>]+content=["']([^"']*)["']`, 'i');
    if (!getMeta(html, re)) fail(`${tag}: missing ${prop}`);
  }
  if (!/<meta[^>]+name=["']twitter:card["']/i.test(html)) fail(`${tag}: missing twitter:card`);

  const ogUrl = getMeta(html, /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']*)["']/i);
  if (ogUrl && ogUrl !== canonical) fail(`${tag}: og:url "${ogUrl}" != canonical "${canonical}"`);

  // --- og:image file present on disk ---
  const ogImage = getMeta(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i);
  if (ogImage) {
    const rel = ogImage.replace(SITE.origin, '');
    if (!fs.existsSync(path.join(ROOT, rel))) fail(`${tag}: og:image not found on disk: ${rel}`);
  }

  // --- JSON-LD parses ---
  const ld = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);
  if (!ld) {
    fail(`${tag}: no JSON-LD structured data`);
  } else {
    try {
      const obj = JSON.parse(ld[1].replace(/\\u003c/g, '<'));
      const graph = obj['@graph'] || [];
      const types = graph.map((n) => n['@type']);
      if (!types.includes('BreadcrumbList')) fail(`${tag}: JSON-LD has no BreadcrumbList`);
      if (!types.includes('WebPage')) fail(`${tag}: JSON-LD has no WebPage`);
    } catch (e) {
      fail(`${tag}: JSON-LD is not valid JSON (${e.message})`);
    }
  }

  return { title, desc };
}

// ---------- run ----------
const seenTitles = new Map();
const seenDescs = new Map();

for (const page of DATA.pages) {
  const meta = checkPage(page);
  if (!meta) continue;
  if (meta.title) {
    if (seenTitles.has(meta.title)) fail(`duplicate title: "${meta.title}" used by ${seenTitles.get(meta.title)} and ${page.file}`);
    else seenTitles.set(meta.title, page.file);
  }
  if (meta.desc) {
    if (seenDescs.has(meta.desc)) fail(`duplicate description: ${seenDescs.get(meta.desc)} and ${page.file}`);
    else seenDescs.set(meta.desc, page.file);
  }
}

// ---------- sitemap + robots ----------
const sitemapFile = path.join(ROOT, 'sitemap.xml');
if (!fs.existsSync(sitemapFile)) {
  fail('sitemap.xml is missing (run: node seo/build-seo.js)');
} else {
  const sm = fs.readFileSync(sitemapFile, 'utf8');
  for (const p of DATA.pages) {
    const loc = SITE.origin + p.path;
    if (!sm.includes(`<loc>${loc}</loc>`)) fail(`sitemap.xml is missing ${loc}`);
  }
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const known = new Set(DATA.pages.map((p) => SITE.origin + p.path));
  for (const loc of locs) if (!known.has(loc)) warn(`sitemap.xml lists a page not in pages.json: ${loc}`);
}

if (!fs.existsSync(path.join(ROOT, 'robots.txt'))) {
  fail('robots.txt is missing (run: node seo/build-seo.js)');
} else if (!/Sitemap:\s*\S+/i.test(fs.readFileSync(path.join(ROOT, 'robots.txt'), 'utf8'))) {
  fail('robots.txt has no Sitemap: line');
}

// ---------- internal links (warning only) ----------
for (const page of DATA.pages) {
  const file = path.join(ROOT, page.file);
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  // Relative .html targets only - absolute URLs (canonical, og:url) are not internal links.
  const hrefs = [...html.matchAll(/href="([^"#?:]+\.html)"/g)].map((m) => m[1]);
  for (const h of new Set(hrefs)) {
    if (/^https?:\/\//i.test(h)) continue;
    if (!fs.existsSync(path.join(ROOT, h))) warn(`${page.file}: links to missing page "${h}" (404)`);
  }
}

// ---------- report ----------
for (const f of failures) console.log('FAIL  ' + f);
for (const w of warnings) console.log('WARN  ' + w);
console.log(`\n${DATA.pages.length} page(s) checked - ${failures.length} failure(s), ${warnings.length} warning(s)`);

if (failures.length) {
  console.log('\nSEO check FAILED');
  process.exit(1);
}
console.log('SEO check PASSED');
