#!/usr/bin/env python3
"""
make-og-images.py — generates the 1200x630 Open Graph cards used for social /
WhatsApp link previews.

Run from the repo root:   python3 seo-tools/make-og-images.py

Output: img/og/*.jpg  (referenced by pages.json -> ogImage)

This is a manual step (not wired into CI) because it depends on Pillow. Re-run it
if a page headline changes, then re-run `node seo-tools/build-seo.js`.
"""
import os
from PIL import Image, ImageDraw, ImageFont

# Site root: same resolution as build-seo.js / check-seo.js.
#   <repo>/cb-app.public  or  <repo>/docs  - or set SEO_ROOT to override.
import sys

_REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_env = os.environ.get("SEO_ROOT")
if _env:
    ROOT = os.path.join(_REPO_ROOT, _env)
    if not os.path.isdir(ROOT):
        sys.exit(f'SEO_ROOT is set to "{_env}" but {ROOT} does not exist')
else:
    for _cand in ("cb-app.public", "docs"):
        if os.path.isdir(os.path.join(_REPO_ROOT, _cand)):
            ROOT = os.path.join(_REPO_ROOT, _cand)
            break
    else:
        sys.exit(f"Could not find the published site folder in {_REPO_ROOT}")
OUT_DIR = os.path.join(ROOT, "img", "og")
LOGO = os.path.join(ROOT, "img", "Capital builders logo.png")

W, H = 1200, 630
BG = (28, 59, 86)          # #1c3b56 — matches .right-section
BG_DARK = (20, 43, 63)
ORANGE = (255, 102, 0)     # #ff6600 — matches the site accent
WHITE = (255, 255, 255)
MUTED = (190, 210, 226)

BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

CARDS = [
    ("og-home.jpg", "Aluminium Windows", "Price in Kenya", "Instant cost calculator"),
    ("og-sliding-windows.jpg", "Sliding Windows", "Price in Kenya", "Instant quote calculator"),
    ("og-sliding-doors.jpg", "Sliding Doors", "Price in Kenya", "Instant quote calculator"),
    ("og-casement-windows.jpg", "Casement Windows", "Price in Kenya", "Instant quote calculator"),
    ("og-top-hung-windows.jpg", "Top Hung Windows", "Price in Kenya", "Instant quote calculator"),
    ("og-window-blinds.jpg", "Window Blinds", "Price in Kenya", "Instant quote calculator"),
    ("og-curtain-walling.jpg", "Curtain Walling", "& Facades", "Instant quote calculator"),
]


def wrap(draw, text, font, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=font) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def make(fname, line1, line2, sub):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    # subtle diagonal band for depth
    d.polygon([(0, H), (0, H - 150), (W, H - 300), (W, H)], fill=BG_DARK)
    # orange accent bar bottom-left
    d.rectangle([0, H - 14, W, H], fill=ORANGE)

    # logo
    try:
        logo = Image.open(LOGO).convert("RGBA")
        ratio = 62 / logo.height
        logo = logo.resize((int(logo.width * ratio), 62), Image.LANCZOS)
        img.paste(logo, (72, 62), logo)
    except Exception as e:
        print("  ! logo skipped:", e)

    # headline
    f1 = ImageFont.truetype(BOLD, 78)
    f2 = ImageFont.truetype(BOLD, 62)
    y = 210
    for text, font in ((line1, f1), (line2, f2)):
        for ln in wrap(d, text, font, W - 144):
            d.text((72, y), ln, font=font, fill=WHITE)
            y += int(font.size * 1.18)

    # sub-line
    fsub = ImageFont.truetype(REG, 32)
    d.text((72, H - 96), sub, font=fsub, fill=MUTED)

    # domain, bottom right, orange
    fdom = ImageFont.truetype(BOLD, 30)
    dom = "capitalbuilders.co.ke"
    d.text((W - 72 - d.textlength(dom, font=fdom), H - 96), dom, font=fdom, fill=ORANGE)

    out = os.path.join(OUT_DIR, fname)
    img.save(out, "JPEG", quality=88, optimize=True)
    return out


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    for fname, l1, l2, sub in CARDS:
        p = make(fname, l1, l2, sub)
        print("  wrote %s (%d KB)" % (os.path.relpath(p, ROOT), os.path.getsize(p) // 1024))


if __name__ == "__main__":
    main()
