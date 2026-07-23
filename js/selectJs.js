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
// FIXED HEIGHT VALIDATION
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
    
    // If no value entered, use default 500mm
    if (rawValue === '') {
        infoDiv.innerHTML = 'ℹ️ Using default fixed height: 500mm';
        currentFixedHeight = 500;
        return 500;
    }
    
    const fixedHeight = parseInt(rawValue);
    
    if (isNaN(fixedHeight) || fixedHeight <= 0) {
        warningsDiv.innerHTML = '⚠️ Please enter a valid positive number for fixed height';
        return null;
    }
    
    // Validate that newHeight (totalHeight - fixedHeight) is at least 60% of totalHeight
    const newHeight = totalHeight - fixedHeight;
    const minNewHeight = totalHeight * 0.6;
    
    if (newHeight < minNewHeight) {
        warningsDiv.innerHTML = `⚠️ Fixed height of ${fixedHeight}mm is too large. The openable section would be only ${newHeight}mm (${(newHeight/totalHeight*100).toFixed(0)}% of total). Minimum openable height is ${Math.round(minNewHeight)}mm (60% of total).`;
        return null;
    }
    
    if (fixedHeight < 200) {
        warningsDiv.innerHTML = '⚠️ Fixed height should be at least 200mm for structural integrity';
        return null;
    }
    
    if (fixedHeight > totalHeight * 0.4) {
        warningsDiv.innerHTML = `⚠️ Fixed height of ${fixedHeight}mm exceeds 40% of total height. Consider a smaller fixed section.`;
        // Still allow it but warn
    }
    
    infoDiv.innerHTML = `✅ Using fixed height: ${fixedHeight}mm (openable section: ${newHeight}mm = ${(newHeight/totalHeight*100).toFixed(0)}% of total)`;
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
    
    const topHungDropdown = document.getElementById('topHungWindowType');
    if (topHungDropdown && type.value) {
        topHungDropdown.value = type.value;
        const changeEvent = new Event('change');
        topHungDropdown.dispatchEvent(changeEvent);
    }
    
    console.log(`Selected top-hung type: ${type.value} - ${type.label}`);
    
    const event = new CustomEvent('topHungChanged', { 
        detail: { type: type.value, label: type.label }
    });
    document.dispatchEvent(event);
    
    if (typeof window.updatePreview === 'function') {
        window.updatePreview();
    }
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
// INITIALIZATION
// ============================================
function initAllSelections() {
    // Initialize based on which selector exists on the page
    if (document.getElementById('casementTypeSelector')) {
        initCasementSelection();
    }
    
    if (document.getElementById('topHungTypeSelector')) {
        initTopHungSelection();
        syncDropdownWithImageSelection();
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