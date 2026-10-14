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
// SLIDING ALU DOOR TYPES (NEW)
// ============================================
const slidingAluDoorTypes = [
    // 2 PANEL Sliding Door
    {
        id: 'type31',
        value: '2-noPartition-aluDoor',
        imageSrc: 'img/type-select-images/type-31.png',
        width: '150px',
        label: '2 Panels Door (No Fixed) - no insect Mesh',
        hasFixedHeight: false,
        typeKey: 'type31'
    },
    {
        id: 'type32',
        value: '2-fixedTop-aluDoor',
        imageSrc: 'img/type-select-images/type-32.png',
        width: '197px',
        label: '2 Panels Door (Single Fixed) - no insect Mesh',
        hasFixedHeight: true,
        typeKey: 'type32'
    },

    // 3 PANEL DOOR
    {
        id: 'type34',
        value: '3-noPartition-aluDoor',
        imageSrc: 'img/type-select-images/type-34.png',
        width: '197px',
        label: '3 Panels Door (No Fixed) - no insect Mesh',
        hasFixedHeight: false,
        typeKey: 'type34'
    },
    {
        id: 'type35',
        value: '3-fixedTop-aluDoor',
        imageSrc: 'img/type-select-images/type-35.png',
        width: '197px',
        label: '3 Panels Door (Single Fixed) - no insect Mesh',
        hasFixedHeight: true,
        typeKey: 'type35'
    },

    // 4 PANEL DOORS
    {
        id: 'type37',
        value: '4-noPartition-aluDoor',
        imageSrc: 'img/type-select-images/type-37.png',
        width: '167px',
        label: '4 Panels Door (No Fixed) - no insect Mesh',
        hasFixedHeight: false,
        typeKey: 'type37'
    },
    {
        id: 'type38',
        value: '4-fixedTop-aluDoor',
        imageSrc: 'img/type-select-images/type-38.png',
        width: '167px',
        label: '4 Panels Door (Single Fixed) - no insect Mesh',
        hasFixedHeight: true,
        typeKey: 'type38'
    },

    // HYBRID DOORS (Sliding + Casement)
    {
        id: 'type41',
        value: '2-openAbleTop-aluDoor',
        imageSrc: 'img/type-select-images/type-41.png',
        width: '167px',
        label: '2 Panels Door (Hybrid) - no insect Mesh',
        hasFixedHeight: true,
        typeKey: 'type41'
    },
    {
        id: 'type42',
        value: '3-openAbleTop-aluDoor',
        imageSrc: 'img/type-select-images/type-42.png',
        width: '167px',
        label: '3 Panels Door (Hybrid) - no insect Mesh',
        hasFixedHeight: true,
        typeKey: 'type42'
    },
    {
        id: 'type43',
        value: '4-openAbleTop-aluDoor',
        imageSrc: 'img/type-select-images/type-43.png',
        width: '167px',
        label: '4 Panels Door (Hybrid) - no insect Mesh',
        hasFixedHeight: true,
        typeKey: 'type43'
    },
    {
        id: 'type44',
        value: '2-noPartition-aluDoor-withMosquitoPanel',
        imageSrc: 'img/type-select-images/type-44.png',
        width: '167px',
        label: '2 Panels Door (with insect mesh)',
        hasFixedHeight: false,
        typeKey: 'type44'
    },
    {
        id: 'type45',
        value: '2-fixedTop-aluDoor-withMosquitoPanel',
        imageSrc: 'img/type-select-images/type-45.png',
        width: '167px',
        label: '2 Panels Door (with insect mesh)',
        hasFixedHeight: true,
        typeKey: 'type45'
    },
    {
        id: 'type46',
        value: '3-noPartition-aluDoor-withMosquitoPanel',
        imageSrc: 'img/type-select-images/type-46.png',
        width: '167px',
        label: '3 Panels Door (with insect mesh)',
        hasFixedHeight: false,
        typeKey: 'type46'
    },
    {
        id: 'type47',
        value: '3-fixedTop-aluDoor-withMosquitoPanel',
        imageSrc: 'img/type-select-images/type-47.png',
        width: '167px',
        label: '3 Panels Door (with insect mesh)',
        hasFixedHeight: true,
        typeKey: 'type47'
    },
    {
        id: 'type48',
        value: '4-noPartition-aluDoor-withMosquitoPanel',
        imageSrc: 'img/type-select-images/type-48.png',
        width: '167px',
        label: '4 Panels Door (with insect mesh)',
        hasFixedHeight: false,
        typeKey: 'type48'
    },
    {
        id: 'type49',
        value: '4-fixedTop-aluDoor-withMosquitoPanel',
        imageSrc: 'img/type-select-images/type-49.png',
        width: '167px',
        label: '4 Panels Door (with insect mesh)',
        hasFixedHeight: true,
        typeKey: 'type49'
    },
    {
        id: 'type50',
        value: '2-openAbleTop-aluDoor-withMosquitoPanel',
        imageSrc: 'img/type-select-images/type-50.png',
        width: '167px',
        label: '2 Panels Door (Hybrid with insect mesh)',
        hasFixedHeight: true,
        typeKey: 'type50'
    },
    {
        id: 'type51',
        value: '3-openAbleTop-aluDoor-withMosquitoPanel',
        imageSrc: 'img/type-select-images/type-51.png',
        width: '167px',
        label: '3 Panels Door (Hybrid with insect mesh)',
        hasFixedHeight: true,
        typeKey: 'type51'
    },
        {
        id: 'type52',
        value: '4-openAbleTop-aluDoor-withMosquitoPanel',
        imageSrc: 'img/type-select-images/type-52.png',
        width: '167px',
        label: '4 Panels Door (Hybrid with insect mesh)',
        hasFixedHeight: true,
        typeKey: 'type52'
    },

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
    
    // Refresh the fixed-partition guidance immediately - same reasoning as the
    // alu-door selector: the divs must not depend on a height input event.
    const heightInput = document.getElementById('heightId');
    const totalHeight = heightInput ? parseInt(heightInput.value) : NaN;
    if (!isNaN(totalHeight) && totalHeight > 0) {
        validateFixedHeight(totalHeight);
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
// ALU DOOR FIXED HEIGHT VALIDATION (UI Help Text Only)
// Sliding aluminium doors are SINGLE fixed only - never double fixed.
// Rule: the openable (sliding) section must be at least 1800mm tall.
// Default fixed partition is 500mm, i.e. default openable = totalHeight - 500.
// ============================================
const ALU_DOOR_MIN_OPENABLE_HEIGHT = 1800;
const ALU_DOOR_DEFAULT_FIXED_HEIGHT = 500;

function validateAluDoorFixedHeight(totalHeight) {
    const fixedHeightInput = document.getElementById('fixedHeightInput');
    const warningsDiv = document.getElementById('fixed-height-warnings');
    const infoDiv = document.getElementById('fixed-height-info');
    
    if (!fixedHeightInput || !warningsDiv || !infoDiv) return null;
    if (!selectedSlidingAluDoorType || !selectedSlidingAluDoorType.hasFixedHeight) return null;
    
    const rawValue = fixedHeightInput.value.trim();
    
    // Clear previous messages
    warningsDiv.innerHTML = '';
    infoDiv.innerHTML = '';
    
    // Largest fixed partition this height can carry and still leave 1800mm openable
    const maxFixedHeight = totalHeight - ALU_DOOR_MIN_OPENABLE_HEIGHT;
    
    // No user value: the 500mm default applies, i.e. openable = totalHeight - 500
    if (rawValue === '') {
        const openableHeight = totalHeight - ALU_DOOR_DEFAULT_FIXED_HEIGHT;
        currentSlidingAluDoorFixedHeight = ALU_DOOR_DEFAULT_FIXED_HEIGHT;
        
        if (openableHeight < ALU_DOOR_MIN_OPENABLE_HEIGHT) {
            warningsDiv.innerHTML = `⚠️ The default ${ALU_DOOR_DEFAULT_FIXED_HEIGHT}mm fixed partition leaves only ${openableHeight}mm openable, below the ${ALU_DOOR_MIN_OPENABLE_HEIGHT}mm minimum for a door. Increase the height, or choose a door type without a fixed partition.`;
        } else {
            infoDiv.innerHTML = `ℹ️ Using default fixed height: ${ALU_DOOR_DEFAULT_FIXED_HEIGHT}mm. Openable section: ${openableHeight}mm (minimum ${ALU_DOOR_MIN_OPENABLE_HEIGHT}mm)`;
        }
        return ALU_DOOR_DEFAULT_FIXED_HEIGHT;
    }
    
    const fixedHeight = parseInt(rawValue);
    
    if (isNaN(fixedHeight) || fixedHeight <= 0) {
        warningsDiv.innerHTML = '⚠️ Please enter a valid positive number for fixed height';
        return null;
    }
    
    const openableHeight = totalHeight - fixedHeight;
    
    // A user-supplied fixed height must leave at least 1800mm of openable door
    if (openableHeight < ALU_DOOR_MIN_OPENABLE_HEIGHT) {
        const remedy = maxFixedHeight > 0
            ? `Choose a door type without a fixed partition, or reduce the fixed height to ${maxFixedHeight}mm or less.`
            : `Choose a door type without a fixed partition - at ${totalHeight}mm height there is no room for one.`;
        
        warningsDiv.innerHTML = `⚠️ Fixed height of ${fixedHeight}mm is too large: it leaves only ${openableHeight}mm openable, below the ${ALU_DOOR_MIN_OPENABLE_HEIGHT}mm minimum for a door. ${remedy}`;
        currentSlidingAluDoorFixedHeight = fixedHeight;
        return null;
    }
    
    if (fixedHeight < 200) {
        warningsDiv.innerHTML = '⚠️ Fixed height should be at least 200mm for structural integrity';
        currentSlidingAluDoorFixedHeight = fixedHeight;
        return null;
    }
    
    infoDiv.innerHTML = `✅ Using fixed height: ${fixedHeight}mm. Openable section: ${openableHeight}mm (minimum ${ALU_DOOR_MIN_OPENABLE_HEIGHT}mm)`;
    currentSlidingAluDoorFixedHeight = fixedHeight;
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
// Alu SLIDING DOOR SELECTION
// ============================================
let selectedSlidingAluDoorType = null;
let selectedSlidingAluDoorTypeKey = null;
let currentSlidingAluDoorFixedHeight = null;

function selectSlidingAluDoorType(type, element) {
    // Remove selected class from all options
    document.querySelectorAll('#slidingAluDoorTypeSelector .image-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    element.classList.add('selected');
    
    // Update the selected type
    selectedSlidingAluDoorType = type;
    selectedSlidingAluDoorTypeKey = type.typeKey;

    // CRITICAL FIX: Update the global window property so app.js can read it
    window.selectedSlidingAluDoorTypeKey = type.typeKey;
    window.currentSlidingAluDoorTypeKey = type.typeKey;
    
    console.log(`Selected sliding type: ${type.value} - ${type.label} (key: ${type.typeKey})`);

    console.log(`🔄 window.selectedSlidingAluDoorTypeKey set to: ${window.selectedSlidingAluDoorTypeKey}`);

    
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
        currentSlidingAluDoorFixedHeight = null;
    }
    
    // Trigger a custom event that app.js can listen to
    // NOTE: app.js listens for 'slidingAluDoorChanged' (not 'slidingChanged')
    const event = new CustomEvent('slidingAluDoorChanged', { 
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
    
    // Refresh the fixed-partition guidance immediately. Without this the info and
    // warning divs only update on a height/fixed-height input event, so a user who
    // just clicks a different type image never sees the current guidance.
    const heightInput = document.getElementById('heightId');
    const totalHeight = heightInput ? parseInt(heightInput.value) : NaN;
    if (!isNaN(totalHeight) && totalHeight > 0) {
        validateAluDoorFixedHeight(totalHeight);
    }
}

// ============================================
// ALU DOOR: no-fixed fallback types
// When the default 500mm fixed partition leaves less than 1800mm openable the
// calculation is denied and the equivalent door WITHOUT a fixed partition is
// selected instead. Panel count and insect mesh are preserved; only the fixed
// (awning) top is dropped. The hybrid types have no hybrid equivalent, so they
// fall back to the plain sliding door of the same panel count.
// ============================================
const ALU_DOOR_NO_FIXED_FALLBACK = {
    type32: 'type31', // 2 panel, two track
    type35: 'type34', // 3 panel, tripple track
    type38: 'type37', // 4 panel, two track
    type41: 'type31', // 2 panel hybrid      -> plain 2 panel
    type42: 'type34', // 3 panel hybrid      -> plain 3 panel
    type43: 'type37', // 4 panel hybrid      -> plain 4 panel
    type45: 'type44', // 2 panel + mesh
    type47: 'type46', // 3 panel + mesh
    type49: 'type48', // 4 panel + mesh
    type50: 'type44', // 2 panel hybrid+mesh -> 2 panel + mesh
    type51: 'type46', // 3 panel hybrid+mesh -> 3 panel + mesh
    type52: 'type48'  // 4 panel hybrid+mesh -> 4 panel + mesh
};

function getAluDoorNoFixedFallback(typeKey) {
    return ALU_DOOR_NO_FIXED_FALLBACK[typeKey] || null;
}

// Bring an option into the centre of the selector strip. Uses rect maths rather
// than scrollIntoView so the page's vertical scroll position is never disturbed.
function scrollAluDoorTypeIntoView(option) {
    const selector = document.getElementById('slidingAluDoorTypeSelector');
    if (!selector || !option) return;
    if (typeof selector.getBoundingClientRect !== 'function' ||
        typeof option.getBoundingClientRect !== 'function') return;
    
    const maxScroll = selector.scrollWidth - selector.clientWidth;
    if (maxScroll <= 0) return;   // the strip fits, nothing to scroll
    
    const selectorRect = selector.getBoundingClientRect();
    const optionRect = option.getBoundingClientRect();
    const target = selector.scrollLeft + (optionRect.left - selectorRect.left)
                 - (selector.clientWidth - optionRect.width) / 2;
    const left = Math.max(0, Math.min(target, maxScroll));
    
    // Stop the one-off discoverability nudge from scrolling the strip straight
    // back away from the newly selected type.
    try { sessionStorage.setItem('nudge_slidingAluDoorTypeSelector', 'true'); } catch (err) {}
    
    if (typeof selector.scrollTo === 'function') {
        selector.scrollTo({ left: left, behavior: 'smooth' });
    } else {
        selector.scrollLeft = left;
    }
}

// Programmatically select a door type by its typeKey, driving the same code path
// as a user click (selected class, globals, fixed-height container, preview).
// Also scrolls the strip to the new selection - after an automatic fallback the
// substitute can be far from wherever the user was looking.
function selectAluDoorTypeByKey(typeKey) {
    const selector = document.getElementById('slidingAluDoorTypeSelector');
    if (!selector || !typeKey) return null;
    
    const type = slidingAluDoorTypes.find(t => t.typeKey === typeKey);
    if (!type) return null;
    
    const optionDiv = selector.querySelector(`.image-option[data-type-key="${typeKey}"]`);
    if (!optionDiv) return null;
    
    // selectSlidingAluDoorType refreshes the fixed-partition guidance itself,
    // so no explicit clear happens here - clearing would wipe the fresh text.
    selectSlidingAluDoorType(type, optionDiv);
    
    scrollAluDoorTypeIntoView(optionDiv);
    
    return type;
}

function initSlidingAluDoorSelection() {
    const slidingAluDoorTypeSelector = document.getElementById('slidingAluDoorTypeSelector');
    if (!slidingAluDoorTypeSelector) return;
    
    slidingAluDoorTypeSelector.innerHTML = '';
    
    slidingAluDoorTypes.forEach(type => {
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
            selectSlidingAluDoorType(type, optionDiv);
        });
        
        slidingAluDoorTypeSelector.appendChild(optionDiv);
    });
    
    // Select the first option by default
    if (slidingAluDoorTypes.length > 0) {
        const firstOption = slidingAluDoorTypeSelector.querySelector('.image-option');
        if (firstOption) {
            // Check if there's a preselected value from localStorage or URL
            const preselectedAluDoorType = localStorage.getItem('selectedSlidingAluDoorType');
            if (preselectedAluDoorType) {
                const matchedOption = slidingAluDoorTypeSelector.querySelector(`.image-option[data-type="${preselectedAluDoorType}"]`);
                if (matchedOption) {
                    const matchedType = slidingAluDoorTypes.find(t => t.value === preselectedAluDoorType);
                    if (matchedType) {
                        selectSlidingAluDoorType(matchedType, matchedOption);
                        return;
                    }
                }
            }
            selectSlidingAluDoorType(slidingAluDoorTypes[0], firstOption);
        }
    }
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

    if (document.getElementById('slidingAluDoorTypeSelector')) {
        initSlidingAluDoorSelection();
        
        // Set up fixed height validation on input change
        const fixedHeightInput = document.getElementById('fixedHeightInput');
        if (fixedHeightInput) {
            fixedHeightInput.addEventListener('input', function() {
                const heightInput = document.getElementById('heightId');
                if (heightInput && heightInput.value) {
                    const totalHeight = parseInt(heightInput.value);
                    if (!isNaN(totalHeight) && totalHeight > 0) {
                        validateAluDoorFixedHeight(totalHeight);
                    }
                }
            });
        }
        
        // Also validate when height changes
        const heightInput = document.getElementById('heightId');
        if (heightInput) {
            heightInput.addEventListener('change', function() {
                const totalHeight = parseInt(this.value);
                if (!isNaN(totalHeight) && totalHeight > 0 && selectedSlidingAluDoorType && selectedSlidingAluDoorType.hasFixedHeight) {
                    validateAluDoorFixedHeight(totalHeight);
                }
            });
        }
        
        // Nudge after a short delay for sliding doors - cookie aware
        setTimeout(() => nudgeScrollableSelector('slidingAluDoorTypeSelector', 800), 1200);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initAllSelections);

// Make functions globally accessible
window.selectSlidingType = selectSlidingType;
window.selectSlidingAluDoorType = selectSlidingAluDoorType;
window.validateFixedHeight = validateFixedHeight;
window.validateAluDoorFixedHeight = validateAluDoorFixedHeight;
window.getSelectedSlidingType = () => selectedSlidingType;
window.getSelectedSlidingTypeKey = () => selectedSlidingTypeKey;
window.getSelectedSlidingAluDoorType = () => selectedSlidingAluDoorType;
window.getSelectedSlidingAluDoorTypeKey  = () => selectedSlidingAluDoorTypeKey ;
window.getAluDoorNoFixedFallback = getAluDoorNoFixedFallback;
window.selectAluDoorTypeByKey = selectAluDoorTypeByKey;
window.scrollAluDoorTypeIntoView = scrollAluDoorTypeIntoView;
window.getCurrentFixedHeight = () => currentFixedHeight;
window.getCurrentSlidingAluDoorFixedHeight = () => currentSlidingAluDoorFixedHeight;