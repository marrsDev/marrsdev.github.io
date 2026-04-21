// Define the casement window types with their properties
const casementTypes = [
    {
        id: 'type1',
        value: 'c-type1',
        imageSrc: 'img/type-select-images/c-type1.png',
        width: '150px',
        label: 'c-type1'
    },
    {
        id: 'type2',
        value: 'c-type2',
        imageSrc: 'img/type-select-images/c-type2.png',
        width: '197px',
        label: 'c-type2'
    },
    {
        id: 'type3',
        value: 'c-type3',
        imageSrc: 'img/type-select-images/c-type3.png',
        width: '150px',
        label: 'c-type3'
    },
    {
        id: 'type4',
        value: 'c-type4',
        imageSrc: 'img/type-select-images/c-type4.png',
        width: '197px',
        label: 'c-type4'
    },
    {
        id: 'type5',
        value: 'c-type5',
        imageSrc: 'img/type-select-images/c-type5.png',
        width: '197px',
        label: 'c-type5'
    },
    {
        id: 'type6',
        value: 'c-type6',
        imageSrc: 'img/type-select-images/c-type6.png',
        width: '167px',
        label: 'c-type6'
    },
    {
        id: 'type7',
        value: 'c-type7',
        imageSrc: 'img/type-select-images/c-type7.png',
        width: '167px',
        label: 'c-type7'
    }
];

// Track the currently selected casement type
let selectedCasementType = null;

// Function to handle casement type selection
function selectCasementType(type, element) {
    // Remove selected class from all options
    document.querySelectorAll('.image-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    element.classList.add('selected');
    
    // Update the selected type
    selectedCasementType = type;
    
    // Update hidden input or data attribute for form submission
    const casementTypeInput = document.getElementById('selectedCasementType');
    if (casementTypeInput) {
        casementTypeInput.value = type.value;
    }
    
    console.log(`Selected casement type: ${type.value} - ${type.label}`);
    
    // Trigger a custom event that app.js can listen to
    const event = new CustomEvent('casementChanged', { 
        detail: { type: type.value, label: type.label }
    });
    document.dispatchEvent(event);
    
    // Also trigger the global updatePreview if available
    if (typeof window.updatePreview === 'function') {
        window.updatePreview();
    }
}

// Function to initialize image selection
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
        
        // Add click event listener to each option
        optionDiv.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            selectCasementType(type, optionDiv);
        });
        
        casementTypeSelector.appendChild(optionDiv);
    });
    
    // Select first option by default
    if (casementTypes.length > 0) {
        const firstOption = casementTypeSelector.querySelector('.image-option');
        if (firstOption) {
            selectCasementType(casementTypes[0], firstOption);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCasementSelection);