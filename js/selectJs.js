// ============================================
// CASEMENT WINDOW TYPES
// ============================================
const casementTypes = [
    {
        id: 'type70',
        value: 'c-type1',
        imageSrc: 'img/type-select-images/c-type1.png',
        width: '150px',
        label: 'c-type1'
    },
    {
        id: 'type71',
        value: 'c-type2',
        imageSrc: 'img/type-select-images/c-type2.png',
        width: '197px',
        label: 'c-type2'
    },
    {
        id: 'type72',
        value: 'c-type3',
        imageSrc: 'img/type-select-images/c-type3.png',
        width: '150px',
        label: 'c-type3'
    },
    {
        id: 'type73',
        value: 'c-type4',
        imageSrc: 'img/type-select-images/c-type4.png',
        width: '197px',
        label: 'c-type4'
    },
    {
        id: 'type74',
        value: 'c-type5',
        imageSrc: 'img/type-select-images/c-type5.png',
        width: '197px',
        label: 'c-type5'
    },
    {
        id: 'type75',
        value: 'c-type6',
        imageSrc: 'img/type-select-images/c-type6.png',
        width: '167px',
        label: 'c-type6'
    },
    {
        id: 'type76',
        value: 'c-type7',
        imageSrc: 'img/type-select-images/c-type7.png',
        width: '167px',
        label: 'c-type7'
    }
];

// ============================================
// TOP-HUNG WINDOW TYPES
// ============================================
const topHungTypes = [
    {
        id: 'type13',
        value: 'singlePanel',
        imageSrc: 'img/type-select-images/type-13.png',
        width: '150px',
        label: 'Single Panel'
    },
    {
        id: 'type14',
        value: 'doublePanel',
        imageSrc: 'img/type-select-images/type-14.png',
        width: '197px',
        label: 'Double Panels'
    },
    {
        id: 'type15',
        value: 'customLight',
        imageSrc: 'img/type-select-images/type-15.png',
        width: '150px',
        label: 'Custom Light'
    },
    {
        id: 'type16',
        value: 'centerHung',
        imageSrc: 'img/type-select-images/type-16.png',
        width: '150px',
        label: 'Centre-Hung'
    },
    {
        id: 'type17',
        value: 'fixedLight',
        imageSrc: 'img/type-select-images/type-17.png',
        width: '197px',
        label: 'Fixed Light (Small Vent)'
    },
    {
        id: 'type18',
        value: 'fixedLight2',
        imageSrc: 'img/type-select-images/type-69.png',
        width: '197px',
        label: 'Fixed Light'
    }
];

// ============================================
// SLIDING WINDOW TYPES (NEW)
// ============================================
const slidingTypes = [
    // 2 PANEL WINDOWS
    {
        id: 'type1',
        value: '2-noPartition',
        imageSrc: 'img/type-select-images/type-1.png',
        width: '150px',
        label: '2 Panels (No Fixed)',
        hasFixedHeight: false,
        typeKey: 'type1'
    },
    {
        id: 'type2',
        value: '2-fixedTop',
        imageSrc: 'img/type-select-images/type-2.png',
        width: '197px',
        label: '2 Panels (Single Fixed)',
        hasFixedHeight: true,
        typeKey: 'type2'
    },
    {
        id: 'type3',
        value: '2-doubleFixed',
        imageSrc: 'img/type-select-images/type-3.png',
        width: '150px',
        label: '2 Panels (Double Fixed)',
        hasFixedHeight: true,
        typeKey: 'type3'
    },
    // 3 PANEL WINDOWS
    {
        id: 'type4',
        value: '3-noPartition',
        imageSrc: 'img/type-select-images/type-4.png',
        width: '197px',
        label: '3 Panels (No Fixed)',
        hasFixedHeight: false,
        typeKey: 'type4'
    },
    {
        id: 'type5',
        value: '3-fixedTop',
        imageSrc: 'img/type-select-images/type-5.png',
        width: '197px',
        label: '3 Panels (Single Fixed)',
        hasFixedHeight: true,
        typeKey: 'type5'
    },
    {
        id: 'type6',
        value: '3-doubleFixed',
        imageSrc: 'img/type-select-images/type-6.png',
        width: '167px',
        label: '3 Panels (Double Fixed)',
        hasFixedHeight: true,
        typeKey: 'type6'
    },
    // 4 PANEL WINDOWS
    {
        id: 'type7',
        value: '4-noPartition',
        imageSrc: 'img/type-select-images/type-7.png',
        width: '167px',
        label: '4 Panels (No Fixed)',
        hasFixedHeight: false,
        typeKey: 'type7'
    },
    {
        id: 'type8',
        value: '4-fixedTop',
        imageSrc: 'img/type-select-images/type-8.png',
        width: '167px',
        label: '4 Panels (Single Fixed)',
        hasFixedHeight: true,
        typeKey: 'type8'
    },
    {
        id: 'type9',
        value: '4-doubleFixed',
        imageSrc: 'img/type-select-images/type-9.png',
        width: '167px',
        label: '4 Panels (Double Fixed)',
        hasFixedHeight: true,
        typeKey: 'type9'
    },
    // HYBRID WINDOWS (Sliding + Casement)
    {
        id: 'type10',
        value: '2-openAbleTopFxBtm',
        imageSrc: 'img/type-select-images/type-10.png',
        width: '167px',
        label: '2 Panels (Hybrid)',
        hasFixedHeight: true,
        typeKey: 'type10'
    },
    {
        id: 'type11',
        value: '3-openAbleTopFxBtm',
        imageSrc: 'img/type-select-images/type-11.png',
        width: '167px',
        label: '3 Panels (Hybrid)',
        hasFixedHeight: true,
        typeKey: 'type11'
    },
    {
        id: 'type12',
        value: '4-openAbleTopFxBtm',
        imageSrc: 'img/type-select-images/type-12.png',
        width: '167px',
        label: '4 Panels (Hybrid)',
        hasFixedHeight: true,
        typeKey: 'type12'
    }
];

// ============================================
// SLIDING SELECTION
// ============================================
let selectedSlidingType = null;
let selectedSlidingTypeKey = null;
let currentFixedHeight = null;

function selectSlidingType(type, element) {
    // Remove selected class from all options
    document.querySelectorAll('#slidingTypeSelector .image-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    element.classList.add('selected');
    
    // Update the selected type
    selectedSlidingType = type;
    selectedSlidingTypeKey = type.typeKey;

    // CRITICAL FIX: Update the global window property so app.js can read it
    window.selectedSlidingTypeKey = type.typeKey;
    window.currentSlidingTypeKey = type.typeKey;
    
    console.log(`Selected sliding type: ${type.value} - ${type.label} (key: ${type.typeKey})`);

    console.log(`🔄 window.selectedSlidingTypeKey set to: ${window.selectedSlidingTypeKey}`);

    
    // Show/hide fixed height input
    const fixedHeightContainer = document.getElementById('fixedHeightContainer');
    if (fixedHeightContainer) {
        if (type.hasFixedHeight) {
            fixedHeightContainer.classList.add('visible');
        } else {
            fixedHeightContainer.classList.remove('visible');
            // Clear any warnings/info
            document.getElementById('fixed-height-info').innerHTML = '';
            document.getElementById('fixed-height-warnings').innerHTML = '';
        }
    }
    
    // Reset fixed height when type changes
    const fixedHeightInput = document.getElementById('fixedHeightInput');
    if (fixedHeightInput) {
        fixedHeightInput.value = '';
        currentFixedHeight = null;
    }
    
    // Trigger a custom event that app.js can listen to
    const event = new CustomEvent('slidingChanged', { 
        detail: { 
            type: type.value, 
            label: type.label,
            typeKey: type.typeKey,
            hasFixedHeight: type.hasFixedHeight
        }
    });
    document.dispatchEvent(event);
    
    // Also trigger the global updatePreview if available
    if (typeof window.updatePreview === 'function') {
        window.updatePreview();
    }
}

function initSlidingSelection() {
    const slidingTypeSelector = document.getElementById('slidingTypeSelector');
    if (!slidingTypeSelector) return;
    
    slidingTypeSelector.innerHTML = '';
    
    slidingTypes.forEach(type => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'image-option';
        optionDiv.dataset.type = type.value;
        optionDiv.dataset.id = type.id;
        optionDiv.dataset.typeKey = type.typeKey;
        optionDiv.dataset.hasFixedHeight = type.hasFixedHeight;
        
        optionDiv.innerHTML = `
            <img src="${type.imageSrc}" alt="${type.label}" width="${type.width}" height="110">
            <span class="option-label">${type.label}</span>
        `;
        
        optionDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            selectSlidingType(type, optionDiv);
        });
        
        slidingTypeSelector.appendChild(optionDiv);
    });
    
    // Select the first option by default
    if (slidingTypes.length > 0) {
        const firstOption = slidingTypeSelector.querySelector('.image-option');
        if (firstOption) {
            // Check if there's a preselected value from localStorage or URL
            const preselectedType = localStorage.getItem('selectedSlidingType');
            if (preselectedType) {
                const matchedOption = slidingTypeSelector.querySelector(`.image-option[data-type="${preselectedType}"]`);
                if (matchedOption) {
                    const matchedType = slidingTypes.find(t => t.value === preselectedType);
                    if (matchedType) {
                        selectSlidingType(matchedType, matchedOption);
                        return;
                    }
                }
            }
            selectSlidingType(slidingTypes[0], firstOption);
        }
    }
}

// ============================================
// AUTO-SCROLL NUDGE (Discoverability Feature)
// ============================================

// Store pending nudges that are waiting for cookie consent
let pendingNudges = [];

function nudgeScrollableSelector(selectorId, delay = 1000) {
    const selector = document.getElementById(selectorId);
    if (!selector) return;
    
    // Only nudge if the content is actually scrollable
    const isScrollable = selector.scrollWidth > selector.clientWidth;
    if (!isScrollable) return;
    
    // Check if user has already interacted with this selector
    const hasInteracted = sessionStorage.getItem(`nudge_${selectorId}`);
    if (hasInteracted) return;
    
    // Check if cookie consent is resolved
    const consentGiven = localStorage.getItem('cookieConsent');
    const cookieElement = document.getElementById('cookie-consent');
    const isCookieVisible = cookieElement && cookieElement.style.display !== 'none';
    
    // If cookie consent is pending (banner visible), wait for it
    if (!consentGiven || isCookieVisible) {
        console.log(`⏳ Nudge for ${selectorId} waiting for cookie consent...`);
        // Store the nudge to be executed later
        pendingNudges.push({ selectorId, delay });
        return;
    }
    
    // Cookie consent resolved, trigger nudge
    setTimeout(() => {
        performNudge(selector, selectorId);
    }, delay);
}

// Execute the actual nudge animation
function performNudge(selector, selectorId) {
    // Store that we've nudged this selector
    sessionStorage.setItem(`nudge_${selectorId}`, 'true');
    console.log(`🔄 Performing nudge for ${selectorId}`);
    
    const nudgeDistance = 35;
    
    // Step 1: Scroll right
    selector.scrollBy({
        left: nudgeDistance,
        behavior: 'smooth'
    });
    
    // Step 2: After a short pause, scroll back to original position
    setTimeout(() => {
        selector.scrollBy({
            left: -nudgeDistance,
            behavior: 'smooth'
        });
    }, 400);
    
    // Step 3: Add a subtle highlight effect to draw attention
    selector.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
    selector.style.boxShadow = '0 0 0 2px rgba(52, 152, 219, 0.3)';
    selector.style.borderColor = '#3498db';
    
    // Remove highlight after animation completes
    setTimeout(() => {
        selector.style.boxShadow = '';
        selector.style.borderColor = '';
    }, 1200);
}

// Listen for cookie consent resolution event
document.addEventListener('cookieConsentResolved', function(e) {
    console.log(`🍪 Cookie consent resolved: ${e.detail.status}, processing pending nudges...`);
    
    // Process all pending nudges
    if (pendingNudges.length > 0) {
        pendingNudges.forEach((nudge, index) => {
            // Stagger the nudges slightly so they don't all fire at once
            const staggerDelay = index * 300 + 500;
            setTimeout(() => {
                const selector = document.getElementById(nudge.selectorId);
                if (selector) {
                    // Check again if still scrollable and not already nudged
                    const isScrollable = selector.scrollWidth > selector.clientWidth;
                    const hasInteracted = sessionStorage.getItem(`nudge_${nudge.selectorId}`);
                    if (isScrollable && !hasInteracted) {
                        performNudge(selector, nudge.selectorId);
                    }
                }
            }, staggerDelay);
        });
        // Clear pending nudges after processing
        pendingNudges = [];
    }
});

// Also handle the case where DOM loads after cookie consent
// Check if cookie consent is already resolved when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const consentGiven = localStorage.getItem('cookieConsent');
    const cookieElement = document.getElementById('cookie-consent');
    const isCookieVisible = cookieElement && cookieElement.style.display !== 'none';
    
    // If consent is already given and banner is hidden, process any pending nudges
    if (consentGiven && !isCookieVisible && pendingNudges.length > 0) {
        console.log('🍪 Cookie already resolved on DOM load, processing pending nudges...');
        setTimeout(() => {
            pendingNudges.forEach((nudge, index) => {
                const staggerDelay = index * 300 + 500;
                setTimeout(() => {
                    const selector = document.getElementById(nudge.selectorId);
                    if (selector) {
                        const isScrollable = selector.scrollWidth > selector.clientWidth;
                        const hasInteracted = sessionStorage.getItem(`nudge_${nudge.selectorId}`);
                        if (isScrollable && !hasInteracted) {
                            performNudge(selector, nudge.selectorId);
                        }
                    }
                }, staggerDelay);
            });
            pendingNudges = [];
        }, 800);
    }
});

// ============================================
// FIXED HEIGHT VALIDATION (UI Help Text Only)
// ============================================
function validateFixedHeight(totalHeight) {
    const fixedHeightInput = document.getElementById('fixedHeightInput');
    const warningsDiv = document.getElementById('fixed-height-warnings');
    const infoDiv = document.getElementById('fixed-height-info');
    
    if (!fixedHeightInput || !selectedSlidingType || !selectedSlidingType.hasFixedHeight) {
        return null;
    }
    
    const rawValue = fixedHeightInput.value.trim();
    
    // Clear previous messages
    warningsDiv.innerHTML = '';
    infoDiv.innerHTML = '';
    
    // Check if this is a double fixed type (UI display purposes only)
    const isDoubleFixed = selectedSlidingType.typeKey === 'type3' || 
                         selectedSlidingType.typeKey === 'type6' || 
                         selectedSlidingType.typeKey === 'type9' || 
                         selectedSlidingType.typeKey === 'type10' || 
                         selectedSlidingType.typeKey === 'type11' || 
                         selectedSlidingType.typeKey === 'type12';
    
    // If no value entered, use default 500mm
    if (rawValue === '') {
        const defaultFixedHeight = 500;
        const totalFixedHeight = isDoubleFixed ? defaultFixedHeight * 2 : defaultFixedHeight;
        const openableHeight = totalHeight - totalFixedHeight;
        const minOpenableHeight = isDoubleFixed ? totalHeight * 0.5 : totalHeight * 0.6;
        
        // UI help text only - calculation logic still uses fixedHeight correctly in calculationService.js
        if (isDoubleFixed) {
            if (openableHeight < minOpenableHeight) {
                infoDiv.innerHTML = `ℹ️ Default fixed height of ${defaultFixedHeight}mm each (${totalFixedHeight}mm total) results in ${openableHeight}mm (${(openableHeight/totalHeight*100).toFixed(0)}% of total) openable. Consider increasing window height or reducing fixed height.`;
            } else {
                infoDiv.innerHTML = `ℹ️ Using default fixed height: ${defaultFixedHeight}mm each (${totalFixedHeight}mm total fixed). Openable section: ${openableHeight}mm = ${(openableHeight/totalHeight*100).toFixed(0)}% of total`;
            }
        } else {
            infoDiv.innerHTML = `ℹ️ Using default fixed height: ${defaultFixedHeight}mm. Openable section: ${openableHeight}mm = ${(openableHeight/totalHeight*100).toFixed(0)}% of total`;
        }
        currentFixedHeight = defaultFixedHeight;
        return defaultFixedHeight;
    }
    
    const fixedHeight = parseInt(rawValue);
    
    if (isNaN(fixedHeight) || fixedHeight <= 0) {
        warningsDiv.innerHTML = '⚠️ Please enter a valid positive number for fixed height';
        return null;
    }
    
    // Calculate total fixed height for UI display only
    const totalFixedHeight = isDoubleFixed ? fixedHeight * 2 : fixedHeight;
    const openableHeight = totalHeight - totalFixedHeight;
    const minOpenableHeight = isDoubleFixed ? totalHeight * 0.5 : totalHeight * 0.6;
    
    // Validate that openable section is at least the minimum (50% for double, 60% for single)
    if (openableHeight < minOpenableHeight) {
        if (isDoubleFixed) {
            warningsDiv.innerHTML = `⚠️ Fixed height of ${fixedHeight}mm each (${totalFixedHeight}mm total) is too large. The sliding section would be only ${openableHeight}mm (${(openableHeight/totalHeight*100).toFixed(0)}% of total). Minimum openable height is ${Math.round(minOpenableHeight)}mm (50% of total).`;
        } else {
            warningsDiv.innerHTML = `⚠️ Fixed height of ${fixedHeight}mm is too large. The sliding section would be only ${openableHeight}mm (${(openableHeight/totalHeight*100).toFixed(0)}% of total). Minimum openable height is ${Math.round(minOpenableHeight)}mm (60% of total).`;
        }
        return null;
    }
    
    if (fixedHeight < 200) {
        warningsDiv.innerHTML = '⚠️ Fixed height should be at least 200mm for structural integrity';
        return null;
    }
    
    // Warn if fixed height exceeds 40% of total (UI warning only)
    if (fixedHeight > totalHeight * 0.4) {
        if (isDoubleFixed) {
            warningsDiv.innerHTML = `⚠️ Fixed height of ${fixedHeight}mm each exceeds 40% of total height per section. Consider a smaller fixed section.`;
        } else {
            warningsDiv.innerHTML = `⚠️ Fixed height of ${fixedHeight}mm exceeds 40% of total height. Consider a smaller fixed section.`;
        }
        // Still allow it but warn
    }
    
    // Success message with details (UI help text only)
    if (isDoubleFixed) {
        infoDiv.innerHTML = `✅ Using fixed height: ${fixedHeight}mm each (${totalFixedHeight}mm total fixed). Sliding section: ${openableHeight}mm = ${(openableHeight/totalHeight*100).toFixed(0)}% of total`;
    } else {
        infoDiv.innerHTML = `✅ Using fixed height: ${fixedHeight}mm. Sliding section: ${openableHeight}mm = ${(openableHeight/totalHeight*100).toFixed(0)}% of total`;
    }
    
    currentFixedHeight = fixedHeight;
    return fixedHeight;
}

// ============================================
// CASEMENT SELECTION
// ============================================
let selectedCasementType = null;

function selectCasementType(type, element) {
    document.querySelectorAll('#casementTypeSelector .image-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    element.classList.add('selected');
    selectedCasementType = type;
    
    const topHungDropdown = document.getElementById('topHungWindowType');
    if (topHungDropdown && type.value) {
        topHungDropdown.value = type.value;
        const changeEvent = new Event('change');
        topHungDropdown.dispatchEvent(changeEvent);
    }
    
    console.log(`Selected casement type: ${type.value} - ${type.label}`);
    
    const event = new CustomEvent('casementChanged', { 
        detail: { type: type.value, label: type.label }
    });
    document.dispatchEvent(event);
    
    if (typeof window.updatePreview === 'function') {
        window.updatePreview();
    }
}

function initCasementSelection() {
    const casementTypeSelector = document.getElementById('casementTypeSelector');
    if (!casementTypeSelector) return;
    
    casementTypeSelector.innerHTML = '';
    
    casementTypes.forEach(type => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'image-option';
        optionDiv.dataset.type = type.value;
        optionDiv.dataset.id = type.id;
        
        optionDiv.innerHTML = `
            <img src="${type.imageSrc}" alt="${type.label}" width="${type.width}" height="110">
            <span class="option-label">${type.label}</span>
        `;
        
        optionDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            selectCasementType(type, optionDiv);
        });
        
        casementTypeSelector.appendChild(optionDiv);
    });
    
    if (casementTypes.length > 0) {
        const firstOption = casementTypeSelector.querySelector('.image-option');
        if (firstOption) {
            selectCasementType(casementTypes[0], firstOption);
        }
    }
}

// ============================================
// TOP-HUNG SELECTION
// ============================================
    let selectedTopHungType = null;

    function selectTopHungType(type, element) {
        document.querySelectorAll('#topHungTypeSelector .image-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        element.classList.add('selected');
        selectedTopHungType = type; 
        

        window.selectedTopHungType = type.value;
        
        console.log(`Selected top-hung type: ${type.value} - ${type.label}`);
        console.log(`🔄 window.selectedTopHungType set to: ${window.selectedTopHungType}`);
        
        const totalHeight = parseInt(document.getElementById('heightId')?.value || 0);
        const totalWidth = parseInt(document.getElementById('widthId')?.value || 0);
        
        if (typeof window.validateTopHungDimensions === 'function') {
            window.validateTopHungDimensions(
                type.value,
                null, null,
                totalWidth || 0,
                totalHeight || 0
            );
        }
        
        if (typeof window.updatePreview === 'function') {
            window.updatePreview();
        }
        
        const event = new CustomEvent('topHungChanged', { 
            detail: { type: type.value, label: type.label }
        });
        document.dispatchEvent(event);
    }

function initTopHungSelection() {
    const topHungTypeSelector = document.getElementById('topHungTypeSelector');
    if (!topHungTypeSelector) return;
    
    topHungTypeSelector.innerHTML = '';
    
    topHungTypes.forEach(type => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'image-option';
        optionDiv.dataset.type = type.value;
        optionDiv.dataset.id = type.id;
        
        optionDiv.innerHTML = `
            <img src="${type.imageSrc}" alt="${type.label}" width="${type.width}" height="110">
            <span class="option-label">${type.label}</span>
        `;
        
        optionDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            selectTopHungType(type, optionDiv);
        });
        
        topHungTypeSelector.appendChild(optionDiv);
    });
    
    const topHungDropdown = document.getElementById('topHungWindowType');
    let preselectedValue = null;
    if (topHungDropdown && topHungDropdown.value) {
        preselectedValue = topHungDropdown.value;
    }
    
    let selectedOption = null;
    if (preselectedValue) {
        selectedOption = topHungTypeSelector.querySelector(`.image-option[data-type="${preselectedValue}"]`);
    }
    
    if (selectedOption) {
        const selectedType = topHungTypes.find(t => t.value === preselectedValue);
        if (selectedType) {
            selectTopHungType(selectedType, selectedOption);
        }
    } else if (topHungTypes.length > 0) {
        const firstOption = topHungTypeSelector.querySelector('.image-option');
        if (firstOption) {
            selectTopHungType(topHungTypes[0], firstOption);
        }
    }
}

function syncDropdownWithImageSelection() {
    const topHungDropdown = document.getElementById('topHungWindowType');
    if (!topHungDropdown) return;
    
    topHungDropdown.addEventListener('change', function() {
        const selectedValue = this.value;
        const topHungTypeSelector = document.getElementById('topHungTypeSelector');
        if (!topHungTypeSelector) return;
        
        const matchingOption = topHungTypeSelector.querySelector(`.image-option[data-type="${selectedValue}"]`);
        if (matchingOption) {
            matchingOption.click();
        }
    });
}

// ============================================
// INITIALIZATION (UPDATED)
// ============================================
function initAllSelections() {
    // Initialize based on which selector exists on the page
    if (document.getElementById('casementTypeSelector')) {
        initCasementSelection();
        // Nudge after a short delay for casement - cookie aware
        setTimeout(() => nudgeScrollableSelector('casementTypeSelector', 800), 1200);
    }
    
    if (document.getElementById('topHungTypeSelector')) {
        initTopHungSelection();
        syncDropdownWithImageSelection();
        // Nudge after a short delay for top-hung - cookie aware
        setTimeout(() => nudgeScrollableSelector('topHungTypeSelector', 800), 1200);
    }
    
    if (document.getElementById('slidingTypeSelector')) {
        initSlidingSelection();
        
        // Set up fixed height validation on input change
        const fixedHeightInput = document.getElementById('fixedHeightInput');
        if (fixedHeightInput) {
            fixedHeightInput.addEventListener('input', function() {
                const heightInput = document.getElementById('heightId');
                if (heightInput && heightInput.value) {
                    const totalHeight = parseInt(heightInput.value);
                    if (!isNaN(totalHeight) && totalHeight > 0) {
                        validateFixedHeight(totalHeight);
                    }
                }
            });
        }
        
        // Also validate when height changes
        const heightInput = document.getElementById('heightId');
        if (heightInput) {
            heightInput.addEventListener('change', function() {
                const totalHeight = parseInt(this.value);
                if (!isNaN(totalHeight) && totalHeight > 0 && selectedSlidingType && selectedSlidingType.hasFixedHeight) {
                    validateFixedHeight(totalHeight);
                }
            });
        }
        
        // Nudge after a short delay for sliding - cookie aware
        setTimeout(() => nudgeScrollableSelector('slidingTypeSelector', 800), 1200);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initAllSelections);

// Make functions globally accessible
window.selectSlidingType = selectSlidingType;
window.validateFixedHeight = validateFixedHeight;
window.getSelectedSlidingType = () => selectedSlidingType;
window.getSelectedSlidingTypeKey = () => selectedSlidingTypeKey;
window.getCurrentFixedHeight = () => currentFixedHeight;