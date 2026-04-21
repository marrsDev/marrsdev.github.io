// public/js/app.js
const IS_DEV = window.location.hostname.includes('localhost') || 
               window.location.hostname.includes('127.0.0.1');

    if (IS_DEV) {
        console.log('🔄 app.js loading...');
    }

// Initialize Heroku Backend URL at module level
const HEROKU_BACKEND_URL = window.HEROKU_BACKEND_URL || 'http://localhost:3000';


document.addEventListener('DOMContentLoaded', function() {
    if (IS_DEV) {
            console.log('DOM fully loaded');
            console.log('🔍 Checking for calculate button...');
    }
    const currentPage = getCurrentPageType();
    if (IS_DEV) {
            console.log(`📄 Current page type: ${currentPage} (from ${window.location.pathname})`);
    }

    // Initialize variables
    let cost = 0;

    
    // Test backend connection immediately
    testBackendConnection();
    
    // Add event listener to calculate button
    const calculateButton = document.querySelector('.startButton');
    if (calculateButton) {
        calculateButton.addEventListener('click', () => calculateCost(currentPage));
        console.log('Calculate button event listener added');
    } else {
        console.error('Calculate button not found');
    }
    
    // Add event listener to add to cart button
    const addToCartButton = document.getElementById('add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', addToCart);
    }
    
    // Add event listeners for preview updates (with null checks)
    const noOfPanelsEl = document.getElementById('noOfPanels');
    const fixedPartitionEl = document.getElementById('fixedPartition');
    const topHungWindowTypeEl = document.getElementById('topHungWindowType');
    const casementTypeSelector = document.getElementById('casementTypeSelector');
    const profileColourEl = document.getElementById('profileColour');
    
    if (noOfPanelsEl) noOfPanelsEl.addEventListener('change', updatePreview);
    if (fixedPartitionEl) fixedPartitionEl.addEventListener('change', updatePreview);
    if (topHungWindowTypeEl) topHungWindowTypeEl.addEventListener('change', updatePreview);
    if (profileColourEl) profileColourEl.addEventListener('change', updateProfileConfig);

    // Handle casement type selection 
    document.addEventListener('casementChanged', function(e) {
        console.log('CasementChanged event received:', e.detail);
        updatePreview();
        updateCalculationObject();
    });
    
    // Initialize preview based on page type
    updatePreview();

    async function calculateCost(pageType) {
        console.log(`Calculate cost button clicked for ${pageType} page`);
        
        let result;
        
        switch(pageType) {
            case 'topHung':
                result = await calculateTopHungCost();
                break;
            case 'casement':
                result = await calculateCasementCost();
                break;

            case 'sliding':
            default:
                result = await calculateSlidingCost();
                break;
        }
        
        if (result && result.cost) {
            cost = result.cost;
            document.getElementById('cost').value = `KSh ${cost.toLocaleString()}`;
            
            // Store the calculation data for adding to cart
            window.lastCalculation = {
                ...result.requestData,
                cost: result.cost,
                breakdown: result.breakdown || {}
            };
        }
    }
    
    async function calculateSlidingCost() {
        // Get values for sliding windows
        const height = parseInt(document.getElementById('heightId')?.value || 0);
        const width = parseInt(document.getElementById('widthId')?.value || 0);
        const profileColour = document.getElementById('profileColour')?.value || 'white';
        const noOfPanels = document.getElementById('noOfPanels')?.value || '2';
        const fixedPartition = document.getElementById('fixedPartition')?.value || 'noPartition';
        const glassType = document.getElementById('glassType')?.value || 'clear';
        const glassThickness = document.getElementById('glassThickness')?.value || '4mm';
        
        // Validate inputs
        if (!height || !width || height <= 0 || width <= 0) {
            alert('Please enter valid height and width values');
            return null;
        }
        
        console.log('Calculating sliding window cost:', {
            height, width, profileColour, noOfPanels, fixedPartition, glassType, glassThickness
        });
        
        try {
            const requestData = {
                height,
                width,
                noOfPanels,
                fixedPartition,
                glassType,
                glassThickness,
                profileColour
            };
            
            const response = await fetch(`${HEROKU_BACKEND_URL}/api/calculations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Response data:', data);
            
            if (data.success && data.totalCost !== undefined) {
                return {
                    cost: data.totalCost,
                    breakdown: data.breakdown,
                    requestData
                };
            } else {
                throw new Error('Invalid response format from server');
            }
            
        } catch (error) {
            console.error('Error calculating sliding cost:', error);
            alert('Error calculating cost. Please try again.');
            if (error.message.includes('Failed to fetch')) {
                alert('Calculator engine is waking up. Please give it a few seconds.');
            }
            return null;
        }
    }

    async function calculateTopHungCost() {
        // Get values for top-hung windows
        const height = parseInt(document.getElementById('heightId')?.value || 0);
        const width = parseInt(document.getElementById('widthId')?.value || 0);
        const profileColour = document.getElementById('profileColour')?.value || 'white';
        const topHungWindowType = document.getElementById('topHungWindowType')?.value || 'singlePanel';
        const glassType = document.getElementById('glassType')?.value || 'clear';
        const glassThickness = document.getElementById('glassThickness')?.value || '4mm';
        
        // Validate inputs
        if (!height || !width || height <= 0 || width <= 0) {
            alert('Please enter valid height and width values');
            return null;
        }
        
        console.log('Calculating top-hung window cost:', {
            height, width, profileColour, topHungWindowType, glassType, glassThickness
        });
        
        try {
            const requestData = {
                height,
                width,
                topHungWindowType,
                glassType,
                glassThickness,
                profileColour,

            };
            
            const response = await fetch(`${HEROKU_BACKEND_URL}/api/calculations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Response data:', data);
            
            if (data.success && data.totalCost !== undefined) {
                return {
                    cost: data.totalCost,
                    breakdown: data.breakdown,
                    requestData
                };
            } else {
                throw new Error('Invalid response format from server');
            }
            
        } catch (error) {
            console.error('Error calculating top-hung cost:', error);
            alert('Error calculating cost. Please try again.');
            if (error.message.includes('Failed to fetch')) {
                alert('Calculator engine is waking up. Please give it a few seconds.');
            }
            return null;
        }
    }

    async function calculateCasementCost() {
        // Get total window dimensions
        const totalHeight = parseInt(document.getElementById('heightId')?.value || 0);
        const totalWidth = parseInt(document.getElementById('widthId')?.value || 0);
        const profileColour = document.getElementById('profileColour')?.value || 'white';
        const glassType = document.getElementById('glassType')?.value || 'clear';
        const glassThickness = document.getElementById('glassThickness')?.value || '6mm';
        
        // Get VENT dimensions
        const ventWidthInput = document.getElementById('ventWidth')?.value;
        const ventHeightInput = document.getElementById('ventHeight')?.value;
        
        let ventWidth, ventHeight;
        
        if (ventWidthInput && ventWidthInput.trim() !== '') {
            ventWidth = parseInt(ventWidthInput);
            if (isNaN(ventWidth)) ventWidth = undefined;
        } else {
            ventWidth = undefined;
        }
        
        if (ventHeightInput && ventHeightInput.trim() !== '') {
            ventHeight = parseInt(ventHeightInput);
            if (isNaN(ventHeight)) ventHeight = undefined;
        } else {
            ventHeight = undefined;
        }
        
        // Get selected casement type
        let casementType = 'c-type1';
        const selectedImage = document.querySelector('.image-option.selected');
        if (selectedImage) {
            casementType = selectedImage.dataset.type || 'c-type1';
        }
        
        // Validate total dimensions
        if (!totalHeight || !totalWidth || totalHeight <= 0 || totalWidth <= 0) {
            alert('Please enter valid total height and width values');
            return null;
        }
        
        // FRONTEND VALIDATION - Call this before sending to backend
        const validationResult = validateVentDimensions(
            casementType, 
            ventWidth, 
            ventHeight, 
            totalWidth, 
            totalHeight
        );
        
        // Use the validated values
        const finalVentWidth = validationResult.validWidth;
        const finalVentHeight = validationResult.validHeight;
        
        console.log('Calculating casement window cost:', {
            totalHeight, totalWidth, finalVentWidth, finalVentHeight, 
            casementType, glassType, glassThickness
        });
        
        try {
            const requestData = {
                totalHeight,
                totalWidth,
                glassType,
                glassThickness,
                profileColour,
                casementType,
                ventWidth: finalVentWidth,
                ventHeight: finalVentHeight
            };
            
            const response = await fetch(`${HEROKU_BACKEND_URL}/api/calculations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Network response was not ok: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success && data.totalCost !== undefined) {
                return {
                    cost: data.totalCost,
                    breakdown: data.breakdown,
                    requestData
                };
            } else {
                throw new Error('Invalid response format from server');
            }
            
        } catch (error) {
            console.error('Error calculating casement cost:', error);
            alert('Error calculating cost. Please try again.');
            if (error.message.includes('Failed to fetch')) {
                alert('Calculator engine is waking up. Please give it a few seconds.');
            }
            return null;
        }
    }

    function validateVentDimensions(casementType, rawVentWidth, rawVentHeight, totalWidth, totalHeight) {
        let validWidth = rawVentWidth;
        let validHeight = rawVentHeight;
        let warnings = [];
        let appliedDefaults = [];
        
        // Check if user actually provided values
        const hasUserWidth = rawVentWidth !== undefined && !isNaN(rawVentWidth) && rawVentWidth > 0;
        const hasUserHeight = rawVentHeight !== undefined && !isNaN(rawVentHeight) && rawVentHeight > 0;
        
        console.log('Validating vent dimensions:', { casementType, hasUserWidth, hasUserHeight, rawVentWidth, rawVentHeight });
        
        switch(casementType) {
            case 'c-type1': // Single casement with fixed side vents
                // Width validation: default 600, min 300, max 1000
                if (!hasUserWidth) {
                    validWidth = 600;
                    appliedDefaults.push('Vent width set to default 600mm');
                } else {
                    if (rawVentWidth < 300) {
                        validWidth = 300;
                        warnings.push(`Vent width of ${rawVentWidth}mm is too small (minimum 300mm). Adjusted to 300mm.`);
                    } else if (rawVentWidth > 1000) {
                        validWidth = 1000;
                        warnings.push(`Vent width of ${rawVentWidth}mm is too large (maximum 1000mm). Adjusted to 1000mm.`);
                    } else {
                        validWidth = rawVentWidth;
                    }
                }
                
                // Height validation: default 30% of totalHeight, min 300, max 40% of totalHeight or 800mm max
                const defaultHeight = Math.max(300, totalHeight * 0.3);
                const maxHeight = Math.min(totalHeight * 0.4, 800); // Cap at 40% of height or 800mm
                
                if (!hasUserHeight) {
                    validHeight = Math.round(defaultHeight);
                    appliedDefaults.push(`Vent height set to default ${Math.round(defaultHeight)}mm (30% of total height)`);
                } else {
                    if (rawVentHeight < 300) {
                        validHeight = 300;
                        warnings.push(`Vent height of ${rawVentHeight}mm is too small (minimum 300mm). Adjusted to 300mm.`);
                    } else if (rawVentHeight > maxHeight) {
                        validHeight = Math.round(maxHeight);
                        warnings.push(`Vent height of ${rawVentHeight}mm is too large for this window type (maximum ${Math.round(maxHeight)}mm). Adjusted to ${Math.round(maxHeight)}mm.`);
                    } else {
                        validHeight = rawVentHeight;
                    }
                }
                break;
                
            case 'c-type2': // Double casement (French style)
                // Width validation
                if (!hasUserWidth) {
                    validWidth = 600;
                    appliedDefaults.push('Vent width per panel set to default 600mm');
                } else {
                    if (rawVentWidth < 300) {
                        validWidth = 300;
                        warnings.push(`Vent width of ${rawVentWidth}mm is too small (minimum 300mm). Adjusted to 300mm.`);
                    } else if (rawVentWidth > 1000) {
                        validWidth = 1000;
                        warnings.push(`Vent width of ${rawVentWidth}mm is too large (maximum 1000mm). Adjusted to 1000mm.`);
                    } else {
                        validWidth = rawVentWidth;
                    }
                }
                
                // Height validation: default 60% of totalHeight, min 600, max 1200
                const defaultHeight2 = Math.max(600, Math.min(1200, totalHeight * 0.6));
                if (!hasUserHeight) {
                    validHeight = Math.round(defaultHeight2);
                    appliedDefaults.push(`Vent height set to default ${Math.round(defaultHeight2)}mm (60% of total height, max 1200mm)`);
                } else {
                    if (rawVentHeight < 600) {
                        validHeight = 600;
                        warnings.push(`Vent height of ${rawVentHeight}mm is too small (minimum 600mm). Adjusted to 600mm.`);
                    } else if (rawVentHeight > 1200) {
                        validHeight = 1200;
                        warnings.push(`Vent height of ${rawVentHeight}mm is too large (maximum 1200mm). Adjusted to 1200mm.`);
                    } else {
                        validHeight = rawVentHeight;
                    }
                }
                break;
                
            case 'c-type3': // Casement with fixed top light
                if (!hasUserWidth) {
                    validWidth = 600;
                    appliedDefaults.push('Vent width set to default 600mm');
                } else {
                    if (rawVentWidth < 300) {
                        validWidth = 300;
                        warnings.push(`Vent width of ${rawVentWidth}mm is too small (minimum 300mm). Adjusted to 300mm.`);
                    } else if (rawVentWidth > 1000) {
                        validWidth = 1000;
                        warnings.push(`Vent width of ${rawVentWidth}mm is too large (maximum 1000mm). Adjusted to 1000mm.`);
                    } else {
                        validWidth = rawVentWidth;
                    }
                }
                
                const defaultHeight3 = Math.max(400, Math.min(1200, totalHeight * 0.5));
                if (!hasUserHeight) {
                    validHeight = Math.round(defaultHeight3);
                    appliedDefaults.push(`Vent height set to default ${Math.round(defaultHeight3)}mm (50% of total height, max 1200mm)`);
                } else {
                    if (rawVentHeight < 400) {
                        validHeight = 400;
                        warnings.push(`Vent height of ${rawVentHeight}mm is too small (minimum 400mm). Adjusted to 400mm.`);
                    } else if (rawVentHeight > 1200) {
                        validHeight = 1200;
                        warnings.push(`Vent height of ${rawVentHeight}mm is too large (maximum 1200mm). Adjusted to 1200mm.`);
                    } else {
                        validHeight = rawVentHeight;
                    }
                }
                break;
                
            case 'c-type4': // Casement with top transom and side lights
                if (!hasUserWidth) {
                    validWidth = 600;
                    appliedDefaults.push('Vent width set to default 600mm');
                } else {
                    if (rawVentWidth < 300) {
                        validWidth = 300;
                        warnings.push(`Vent width of ${rawVentWidth}mm is too small (minimum 300mm). Adjusted to 300mm.`);
                    } else if (rawVentWidth > 1000) {
                        validWidth = 1000;
                        warnings.push(`Vent width of ${rawVentWidth}mm is too large (maximum 1000mm). Adjusted to 1000mm.`);
                    } else {
                        validWidth = rawVentWidth;
                    }
                }
                
                const defaultHeight4 = Math.max(600, Math.min(1200, totalHeight * 0.6));
                if (!hasUserHeight) {
                    validHeight = Math.round(defaultHeight4);
                    appliedDefaults.push(`Vent height set to default ${Math.round(defaultHeight4)}mm (60% of total height, max 1200mm)`);
                } else {
                    if (rawVentHeight < 600) {
                        validHeight = 600;
                        warnings.push(`Vent height of ${rawVentHeight}mm is too small (minimum 600mm). Adjusted to 600mm.`);
                    } else if (rawVentHeight > 1200) {
                        validHeight = 1200;
                        warnings.push(`Vent height of ${rawVentHeight}mm is too large (maximum 1200mm). Adjusted to 1200mm.`);
                    } else {
                        validHeight = rawVentHeight;
                    }
                }
                break;
                
            case 'c-type5': // Fixed window (non-operable)
            case 'c-type6': // 4-panel casement (2x2 grid)
            case 'c-type7': // Top-hung casement (awning)
                if (!hasUserWidth) {
                    validWidth = 600;
                    appliedDefaults.push('Vent width set to default 600mm');
                } else {
                    if (rawVentWidth < 300) {
                        validWidth = 300;
                        warnings.push(`Vent width of ${rawVentWidth}mm is too small (minimum 300mm). Adjusted to 300mm.`);
                    } else if (rawVentWidth > 1000) {
                        validWidth = 1000;
                        warnings.push(`Vent width of ${rawVentWidth}mm is too large (maximum 1000mm). Adjusted to 1000mm.`);
                    } else {
                        validWidth = rawVentWidth;
                    }
                }
                
                const defaultHeight5 = Math.max(300, totalHeight * 0.3);
                const maxHeight5 = Math.min(totalHeight * 0.4, 800);
                
                if (!hasUserHeight) {
                    validHeight = Math.round(defaultHeight5);
                    appliedDefaults.push(`Vent height set to default ${Math.round(defaultHeight5)}mm (30% of total height)`);
                } else {
                    if (rawVentHeight < 300) {
                        validHeight = 300;
                        warnings.push(`Vent height of ${rawVentHeight}mm is too small (minimum 300mm). Adjusted to 300mm.`);
                    } else if (rawVentHeight > maxHeight5) {
                        validHeight = Math.round(maxHeight5);
                        warnings.push(`Vent height of ${rawVentHeight}mm is too large for this window type (maximum ${Math.round(maxHeight5)}mm). Adjusted to ${Math.round(maxHeight5)}mm.`);
                    } else {
                        validHeight = rawVentHeight;
                    }
                }
                break;
                
            default:
                if (!hasUserWidth) validWidth = 600;
                if (!hasUserHeight) validHeight = 600;
                if (hasUserWidth) validWidth = Math.min(1000, Math.max(300, rawVentWidth));
                if (hasUserHeight) validHeight = Math.max(300, rawVentHeight);
        }
        
    // Display info messages with fade effect
    if (appliedDefaults.length > 0) {
        const infoDiv = document.getElementById('vent-info');
        if (infoDiv) {
            // Clear existing content
            infoDiv.innerHTML = '';
            
            // Add each message with fade class
            appliedDefaults.forEach(message => {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'fade-message';
                messageDiv.textContent = `ℹ️ ${message}`;
                infoDiv.appendChild(messageDiv);
            });
            
            // Remove after animation completes (3 seconds)
            setTimeout(() => {
                if (infoDiv) infoDiv.innerHTML = '';
            }, 12000);
        }
    }
    
    // Display warning messages with fade effect
    if (warnings.length > 0) {
        const warningDiv = document.getElementById('vent-warnings');
        if (warningDiv) {
            // Clear existing content
            warningDiv.innerHTML = '';
            
            // Add each message with fade class
            warnings.forEach(message => {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'fade-message';
                messageDiv.textContent = `⚠️ ${message}`;
                warningDiv.appendChild(messageDiv);
            });
            
            // Remove after animation completes (3 seconds)
            setTimeout(() => {
                if (warningDiv) warningDiv.innerHTML = '';
            }, 12000);
        }
    }
        
        console.log('Validation result:', { validWidth, validHeight, warnings, appliedDefaults });
        
        return { validWidth, validHeight };
    }

    function updateCalculationObject() {
        const currentPage = getCurrentPageType();
        
        if (currentPage === 'casement') {
            const selectedImage = document.querySelector('.image-option.selected');
            const casementType = selectedImage ? selectedImage.dataset.type : 'c-type1';
            
            const calculationObject = {
                casementType: casementType,
                profileColour: document.getElementById('profileColour')?.value || 'white',
                glassType: document.getElementById('glassType')?.value || 'clear',
                glassThickness: document.getElementById('glassThickness')?.value || '4mm'
            };
            
            console.log('Casement calculation object:', calculationObject);
            window.calculationData = calculationObject;
        }
    }
    
    async function addToCart() {
        console.log('Add to cart clicked');
        
        if (!window.lastCalculation || !window.lastCalculation.cost) {
            alert('Please calculate cost first before adding to cart');
            return;
        }
        
        try {
            const success = await cartManager.addToCart(window.lastCalculation);
            
            if (success) {
                alert('Item added to cart!');
            } else {
                alert('Failed to add item to cart. Please try again.');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Error adding to cart. Please try again.');
        }
    }
    
function updatePreview() {
    console.log('Updating preview');
    
    const currentPage = getCurrentPageType();
    const noOfPanels = document.getElementById('noOfPanels')?.value || '2';
    const fixedPartition = document.getElementById('fixedPartition')?.value || 'noPartition';
    const topHungWindowType = document.getElementById('topHungWindowType')?.value;
    
    let imageName = 'type-1'; // default
    
    if (currentPage === 'topHung') {
        // Handle top-hung windows
        if (topHungWindowType === 'doublePanel') imageName = 'type-13';
        else if (topHungWindowType === 'singlePanel') imageName = 'type-12';
        else if (topHungWindowType === 'customLight') imageName = 'type-15';
        else if (topHungWindowType === 'centerHung') imageName = 'type-16';
        else if (topHungWindowType === 'fixedLight') imageName = 'type-69';
        else if (topHungWindowType === 'fixedLight2') imageName = 'type-69';
    } else if (currentPage === 'casement') {

        // Handle casement windows - GET SELECTED CASEMENT TYPE
        const selectedImage = document.querySelector('.image-option.selected');
        console.log('Selected casement image:', selectedImage);
        
        if (selectedImage) {
            const casementType = selectedImage.dataset.type;
            console.log('Casement type selected:', casementType);
            
            // Map casement types to preview images
            const casementMap = {
                'c-type1': 'type-70',
                'c-type2': 'type-71', 
                'c-type3': 'type-72',
                'c-type4': 'type-73',
                'c-type5': 'type-74',
                'c-type6': 'type-75',
                'c-type7': 'type-76'
            };
            imageName = casementMap[casementType] || 'type-70';
        } else {
            // No selection yet, use default
            imageName = 'type-70';
        }
    } else {
        // Handle sliding windows (default)
        if (noOfPanels === '2') {
            if (fixedPartition === 'noPartition') imageName = 'type-1';
            else if (fixedPartition === 'doubleFixed') imageName = 'type-5';
            else if (fixedPartition === 'fixedTop') imageName = 'type-3';
            else if (fixedPartition === 'fixedBottom') imageName = 'type-3';
            else if (fixedPartition === 'openAbleTopFxBtm') imageName = 'type-10';
            else if (fixedPartition === 'openAbleTop') imageName = 'type-69';
        } else if (noOfPanels === '3') {
            if (fixedPartition === 'noPartition') imageName = 'type-2';
            else if (fixedPartition === 'doubleFixed') imageName = 'type-6';
            else if (fixedPartition === 'fixedTop') imageName = 'type-4';
            else if (fixedPartition === 'fixedBottom') imageName = 'type-4';
            else if (fixedPartition === 'openAbleTopFxBtm') imageName = 'type-11';
            else if (fixedPartition === 'openAbleTop') imageName = 'type-69';
        } else if (noOfPanels === '4') {
            if (fixedPartition === 'noPartition') imageName = 'type-69';
            else if (fixedPartition === 'doubleFixed') imageName = 'type-69';
            else if (fixedPartition === 'fixedTop') imageName = 'type-69';
            else if (fixedPartition === 'fixedBottom') imageName = 'type-69';
            else if (fixedPartition === 'openAbleTopFxBtm') imageName = 'type-69';
            else if (fixedPartition === 'openAbleTop') imageName = 'type-69';
        }
    }
    
    // Update image and type code
    const imgElement = document.getElementById('img-type');
    const typeCodeElement = document.getElementById('type-code');
    
    if (imgElement) {
        imgElement.src = `img/previewLabels/${imageName}.png`;
        console.log(`Preview image updated to: img/previewLabels/${imageName}.png`);
    }
    if (typeCodeElement) {
        typeCodeElement.textContent = `#${imageName}`;
    }
}

    function updateProfileConfig() {
        console.log('Profile color changed');
        const profileColour = document.getElementById('profileColour')?.value;
        console.log('Selected profile color:', profileColour);
    }

    async function testBackendConnection() {
        try {
            console.log('🔄 Testing backend connection...');
            const response = await fetch(`${HEROKU_BACKEND_URL}/api/health`);
            const data = await response.json();
            console.log('✅ Backend connection successful:', data);
        } catch (error) {
            console.error('❌ Backend connection failed:', error);
        }
    }

    // Helper function to determine page type
    function getCurrentPageType() {
        const path = window.location.pathname.toLowerCase();
        const filename = path.split('/').pop().toLowerCase();
        
        console.log('📄 Detected page:', filename);
        
        // Explicit mapping of all your HTML files
        const pageMap = {
            'top-hung-windows.html': 'topHung',
            'aluminium-sliding-windows.html': 'sliding',
            'aluminium-doors.html': 'doors',
            'curtain-walling-facades.html': 'facades',
            'office-partitions.html': 'partitions',
            'glass-types.html': 'glass',
            'index.html': 'sliding',
            'aluminium-casement-windows.html': 'casement' // Add this
        };
        
        if (pageMap[filename]) {
            return pageMap[filename];
        }
        
        // Default to sliding (covers root / and any other pages)
        return 'sliding';
    }

    // Make sure these functions are available globally
    window.toggleMenu = function() {
        const menu = document.querySelector('.menu');
        if (menu) {
            menu.classList.toggle('active');
        }
    };
    
    window.updatePreview = updatePreview;
    window.updateProfileConfig = updateProfileConfig;
    
    console.log('app.js loaded successfully');
});
