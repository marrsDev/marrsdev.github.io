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
    if (profileColourEl) profileColourEl.addEventListener('change', updateProfileConfig);

    // Handle casement type selection 
    document.addEventListener('casementChanged', function(e) {
        console.log('CasementChanged event received:', e.detail);
        updatePreview();
        updateCalculationObject();
    });

    // Handle top-hung type selection
    document.addEventListener('topHungChanged', function(e) {
        console.log('TopHungChanged event received:', e.detail);
        updatePreview();
        if (typeof updateTopHungVentFields === 'function') {
            updateTopHungVentFields(e.detail.type);
        }
    });

    // Handle sliding type selection (NEW)
    document.addEventListener('slidingChanged', function(e) {
        console.log('SlidingChanged event received:', e.detail);
        updatePreview();
        // Update hidden fields or state
        if (window.selectedSlidingTypeKey) {
            // Store the selected type key for calculation
            window.currentSlidingTypeKey = e.detail.typeKey;
        }
        // Trigger any dependent updates
        updateSlidingConfiguration(e.detail);
    });

    // Function to update sliding configuration when type changes
    function updateSlidingConfiguration(detail) {
        // Update any UI elements that depend on the sliding type
        const fixedHeightContainer = document.getElementById('fixedHeightContainer');
        if (fixedHeightContainer) {
            if (detail.hasFixedHeight) {
                fixedHeightContainer.classList.add('visible');
            } else {
                fixedHeightContainer.classList.remove('visible');
            }
        }
    }

    const topHungTypeSelect = document.getElementById('topHungWindowType');
    if (topHungTypeSelect) {
        const totalHeight = parseInt(document.getElementById('heightId')?.value || 0);
        const totalWidth = parseInt(document.getElementById('widthId')?.value || 0);
        
        validateTopHungDimensions(
            topHungTypeSelect.value,
            null, null,
            totalWidth || 0,
            totalHeight || 0
        );
        
        topHungTypeSelect.addEventListener('change', function() {
            const totalHeight = parseInt(document.getElementById('heightId')?.value || 0);
            const totalWidth = parseInt(document.getElementById('widthId')?.value || 0);
            
            const ventWidthInput = document.getElementById('topHungVentWidth');
            const ventHeightInput = document.getElementById('topHungVentHeight');
            if (ventWidthInput) ventWidthInput.value = '';
            if (ventHeightInput) ventHeightInput.value = '';
            
            if (window.ventClearTimeout) {
                clearTimeout(window.ventClearTimeout);
                window.ventClearTimeout = null;
            }
            
            validateTopHungDimensions(
                this.value,
                null, null,
                totalWidth || 0,
                totalHeight || 0
            );
            
            updatePreview();
        });
    }

    // Initialize preview based on page type
    updatePreview();

    // ============================================
    // SLIDING WINDOW CALCULATION (UPDATED)
    // ============================================
    async function calculateSlidingCost() {
        // Get values for sliding windows
        const height = parseInt(document.getElementById('heightId')?.value || 0);
        const width = parseInt(document.getElementById('widthId')?.value || 0);
        const profileColour = document.getElementById('profileColour')?.value || 'white';
        const glassType = document.getElementById('glassType')?.value || 'clear';
        const glassThickness = document.getElementById('glassThickness')?.value || '4mm';
        
        // CRITICAL FIX: Use the global window property that selectJs updates
        let selectedTypeKey = window.selectedSlidingTypeKey || null;
        
        // Log the current selection for debugging
        console.log(`🔑 Selected type key from window: ${selectedTypeKey}`);
        
        // If no type selected yet, default to type1
        if (!selectedTypeKey) {
            console.log('⚠️ No sliding type selected, defaulting to type1');
            selectedTypeKey = 'type1';
        }
        
        // Get fixed height if applicable
        let fixedHeight = null;
        const fixedHeightInput = document.getElementById('fixedHeightInput');
        if (fixedHeightInput && fixedHeightInput.value.trim() !== '') {
            fixedHeight = parseInt(fixedHeightInput.value);
        }
        
        // If no fixed height but type supports it, use default 500
        if (fixedHeight === null || isNaN(fixedHeight)) {
            const selectedType = window.getSelectedSlidingType ? window.getSelectedSlidingType() : null;
            if (selectedType && selectedType.hasFixedHeight) {
                fixedHeight = 500; // Default
            }
        }
        
        // Validate inputs
        if (!height || !width || height <= 0 || width <= 0) {
            alert('Please enter valid height and width values');
            return null;
        }
        
// Validate fixed height if provided
if (fixedHeight !== null && !isNaN(fixedHeight)) {
    // Check if this is a double fixed type
    const isDoubleFixed = selectedTypeKey === 'type3' || 
                         selectedTypeKey === 'type6' || 
                         selectedTypeKey === 'type9' || 
                         selectedTypeKey === 'type10' || 
                         selectedTypeKey === 'type11' || 
                         selectedTypeKey === 'type12';
    
    // Calculate total fixed height
    const totalFixedHeight = isDoubleFixed ? fixedHeight * 2 : fixedHeight;
    const openableHeight = height - totalFixedHeight;
    
    // Different minimums for single vs double fixed
    const minOpenableHeight = isDoubleFixed ? height * 0.5 : height * 0.6;
    
    if (openableHeight < minOpenableHeight) {
        if (isDoubleFixed) {
            alert(`Fixed height of ${fixedHeight}mm each (${totalFixedHeight}mm total) is too large. The sliding section would be only ${openableHeight}mm (${(openableHeight/height*100).toFixed(0)}% of total). Please select a different design or reduce the 'Fixed Height input'.`);
        } else {
            alert(`Fixed height of ${fixedHeight}mm is too large. The sliding section would be only ${openableHeight}mm (${(openableHeight/height*100).toFixed(0)}% of total). Please select a different design or reduce the 'Fixed Height input'.`);
        }
        return null;
    }
}
        
        console.log('Calculating sliding window cost:', {
            height, width, profileColour, selectedTypeKey, fixedHeight, glassType, glassThickness
        });
        
        try {
            const requestData = {
                height,
                width,
                noOfPanels: '2', // Legacy field - will be overridden by typeKey
                fixedPartition: 'noPartition', // Legacy field - will be overridden by typeKey
                slidingTypeKey: selectedTypeKey, // Pass the selected type key directly
                fixedHeight: fixedHeight, // Pass the fixed height if applicable
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

    // ============================================
    // TOP-HUNG CALCULATION (EXISTING - UNCHANGED)
    // ============================================
    async function calculateTopHungCost() {
        // Get total window dimensions
        const totalHeight = parseInt(document.getElementById('heightId')?.value || 0);
        const totalWidth = parseInt(document.getElementById('widthId')?.value || 0);
        const profileColour = document.getElementById('profileColour')?.value || 'white';
        const glassType = document.getElementById('glassType')?.value || 'clear';
        const glassThickness = document.getElementById('glassThickness')?.value || '4mm';
        
        // Get top-hung window type
        const topHungWindowType = document.getElementById('topHungWindowType')?.value || 'singlePanel';
        
        // Get raw vent dimensions (user input or null)
        let rawVentWidth = document.getElementById('topHungVentWidth')?.value;
        let rawVentHeight = document.getElementById('topHungVentHeight')?.value;
        
        rawVentWidth = rawVentWidth ? parseInt(rawVentWidth) : null;
        rawVentHeight = rawVentHeight ? parseInt(rawVentHeight) : null;
        
        if (!totalHeight || !totalWidth || totalHeight <= 0 || totalWidth <= 0) {
            alert('Please enter valid total height and width values');
            return null;
        }
        
        const { validWidth: ventWidth, validHeight: ventHeight } = validateTopHungDimensions(
            topHungWindowType,
            rawVentWidth,
            rawVentHeight,
            totalWidth,
            totalHeight
        );
        
        const usedVentWidth = ventWidth;
        const usedVentHeight = ventHeight;
        
        const ventWidthInput = document.getElementById('topHungVentWidth');
        const ventHeightInput = document.getElementById('topHungVentHeight');
        
        if (ventWidthInput && !isNaN(usedVentWidth)) {
            ventWidthInput.value = usedVentWidth;
        }
        if (ventHeightInput && !isNaN(usedVentHeight)) {
            ventHeightInput.value = usedVentHeight;
        }
        
        if (window.ventClearTimeout) {
            clearTimeout(window.ventClearTimeout);
        }
        
        window.ventClearTimeout = setTimeout(() => {
            const widthInput = document.getElementById('topHungVentWidth');
            const heightInput = document.getElementById('topHungVentHeight');
            
            if (widthInput && !widthInput.hasAttribute('data-user-interacted')) {
                widthInput.value = '';
            }
            if (heightInput && !heightInput.hasAttribute('data-user-interacted')) {
                heightInput.value = '';
            }
            
            setTimeout(() => {
                if (widthInput) widthInput.removeAttribute('data-user-interacted');
                if (heightInput) heightInput.removeAttribute('data-user-interacted');
            }, 1000);
        }, 4000);
        
        const addInteractionListener = (input) => {
            if (!input) return;
            if (input.hasAttribute('data-listener-added')) return;
            
            const markInteraction = () => {
                input.setAttribute('data-user-interacted', 'true');
                if (window.ventClearTimeout) {
                    clearTimeout(window.ventClearTimeout);
                    window.ventClearTimeout = null;
                }
            };
            
            input.addEventListener('focus', markInteraction);
            input.addEventListener('input', markInteraction);
            input.setAttribute('data-listener-added', 'true');
        };
        
        addInteractionListener(ventWidthInput);
        addInteractionListener(ventHeightInput);
        
        console.log('Calculating top-hung window cost:', {
            totalHeight, totalWidth, 
            usedVentWidth, usedVentHeight,
            topHungWindowType, glassType, glassThickness
        });
        
        try {
            const requestData = {
                totalHeight,
                totalWidth,
                ventWidth: usedVentWidth,
                ventHeight: usedVentHeight,
                topHungWindowType,
                glassType,
                glassThickness,
                profileColour
            };
            
            const response = await fetch(`${HEROKU_BACKEND_URL}/api/calculations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
            if (window.ventClearTimeout) {
                clearTimeout(window.ventClearTimeout);
                window.ventClearTimeout = null;
            }
            alert('Error calculating cost. Please try again.');
            return null;
        }
    }

    // ============================================
    // CASEMENT CALCULATION (EXISTING - UNCHANGED)
    // ============================================
    async function calculateCasementCost() {
        // Get total window dimensions
        const totalHeight = parseInt(document.getElementById('heightId')?.value || 0);
        const totalWidth = parseInt(document.getElementById('widthId')?.value || 0);
        const profileColour = document.getElementById('profileColour')?.value || 'white';
        const glassType = document.getElementById('glassType')?.value || 'clear';
        const glassThickness = document.getElementById('glassThickness')?.value || '6mm';
        
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
        
        let casementType = 'c-type1';
        const selectedImage = document.querySelector('.image-option.selected');
        if (selectedImage) {
            casementType = selectedImage.dataset.type || 'c-type1';
        }
        
        if (!totalHeight || !totalWidth || totalHeight <= 0 || totalWidth <= 0) {
            alert('Please enter valid total height and width values');
            return null;
        }
        
        const validationResult = validateVentDimensions(
            casementType, 
            ventWidth, 
            ventHeight, 
            totalWidth, 
            totalHeight
        );
        
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

    // ============================================
    // CALCULATE COST (MAIN ENTRY POINT)
    // ============================================
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
            
            window.lastCalculation = {
                ...result.requestData,
                cost: result.cost,
                breakdown: result.breakdown || {}
            };
        }
    }

    // ============================================
    // VALIDATION FUNCTIONS (EXISTING)
    // ============================================
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

    function validateTopHungDimensions(topHungWindowType, rawVentWidth, rawVentHeight, totalWidth, totalHeight) {
        let validWidth = rawVentWidth;
        let validHeight = rawVentHeight;
        let warnings = [];
        let appliedDefaults = [];
        
        let showWidthInput = false;
        let showHeightInput = false;
        
        const ventInputsContainer = document.getElementById('topHungVentInputs');
        const ventWidthInputContainer = document.getElementById('topHungVentWidthContainer');
        const ventHeightInputContainer = document.getElementById('topHungVentHeightContainer');
        
    switch(topHungWindowType) {
        case 'singlePanel': // TYPE 13 - Full width & height
            showWidthInput = false;
            showHeightInput = false;
            validWidth = totalWidth;
            validHeight = totalHeight;
            
            // Validate total dimensions
            if (totalWidth < 200) {
                warnings.push(`Window's width cannot be less than 200mm - current: ${totalWidth}mm`);
            }
            if (totalWidth > 1500) {
                warnings.push(`Window's width cannot exceed 1500mm - current: ${totalWidth}mm`);
            }
            if (totalHeight < 200) {
                warnings.push(`Window'sheight cannot be less than 200mm - current: ${totalHeight}mm`);
            }
            if (totalHeight > 1400) {
                warnings.push(`Window'sheight cannot exceed 1400mm - current: ${totalHeight}mm`);
            }
            break;
            
        case 'doublePanel': // TYPE 14 - Full width, height adjustable
            showWidthInput = false;
            showHeightInput = true;
            validWidth = totalWidth;
            
            const defaultHeight14 = Math.max(200, totalHeight * 0.5);
            if (!validHeight || isNaN(validHeight)) {
                validHeight = Math.round(defaultHeight14);
                appliedDefaults.push(`Vent height set to default ${validHeight}mm (50% of total height)`);
            } else {
                const maxHeight14 = totalHeight * 0.7;
                if (validHeight < 200) {
                    validHeight = 200;
                    warnings.push('Vent height cannot be less than 200mm - adjusted to 200mm');
                }
                if (validHeight > maxHeight14) {
                    validHeight = Math.round(maxHeight14);
                    warnings.push(`Vent height cannot exceed ${Math.round(maxHeight14)}mm (70% of total) - adjusted`);
                }
            }
            
            // Validate totalWidth
            if (totalWidth < 200) {
                warnings.push(`Window's width cannot be less than 200mm - current: ${totalWidth}mm`);
            }
            if (totalWidth > 1500) {
                warnings.push(`Window's width cannot exceed 1500mm - current: ${totalWidth}mm`);
            }
            break;
            
        case 'customLight': // TYPE 15 - Both width and height adjustable
            showWidthInput = true;
            showHeightInput = true;
            
            // Vent Width: default 40% of totalWidth, constraints min 300, max 40% of totalWidth
            const defaultWidth15 = Math.max(300, totalWidth * 0.4);
            if (!validWidth || isNaN(validWidth)) {
                validWidth = Math.round(defaultWidth15);
                appliedDefaults.push(`Vent width set to default ${validWidth}mm (40% of total width)`);
            } else {
                const maxWidth15 = totalWidth * 0.4;
                if (validWidth < 300) {
                    validWidth = 300;
                    warnings.push('Vent width cannot be less than 300mm - adjusted to 300mm');
                }
                if (validWidth > maxWidth15) {
                    validWidth = Math.round(maxWidth15);
                    warnings.push(`Vent width cannot exceed ${Math.round(maxWidth15)}mm (40% of total width) - adjusted`);
                }
            }
            
            // Vent Height: default 50% of totalHeight, constraints 200 to 80% of totalHeight
            const defaultHeight15 = Math.max(200, totalHeight * 0.5);
            if (!validHeight || isNaN(validHeight)) {
                validHeight = Math.round(defaultHeight15);
                appliedDefaults.push(`Vent height set to default ${validHeight}mm (50% of total height)`);
            } else {
                const maxHeight15 = totalHeight * 0.8;
                if (validHeight < 200) {
                    validHeight = 200;
                    warnings.push('Vent height cannot be less than 200mm - adjusted to 200mm');
                }
                if (validHeight > maxHeight15) {
                    validHeight = Math.round(maxHeight15);
                    warnings.push(`Vent height cannot exceed ${Math.round(maxHeight15)}mm (80% of total height) - adjusted`);
                }
            }
            break;
            
        case 'centerHung': // TYPE 16 - Full width, height adjustable
            showWidthInput = false;
            showHeightInput = true;
            validWidth = totalWidth;
            
            // Height: default 60% of total, constraints 300 to 80% of total
            const defaultHeight16 = Math.max(300, totalHeight * 0.6);
            if (!validHeight || isNaN(validHeight)) {
                validHeight = Math.round(defaultHeight16);
                appliedDefaults.push(`Vent height set to default ${validHeight}mm (60% of total height)`);
            } else {
                const maxHeight16 = totalHeight * 0.8;
                if (validHeight < 300) {
                    validHeight = 300;
                    warnings.push('Vent height cannot be less than 300mm - adjusted to 300mm');
                }
                if (validHeight > maxHeight16) {
                    validHeight = Math.round(maxHeight16);
                    warnings.push(`Vent height cannot exceed ${Math.round(maxHeight16)}mm (80% of total) - adjusted`);
                }
            }
            
            // Validate totalWidth
            if (totalWidth < 200) {
                warnings.push(`Window's width cannot be less than 200mm - current: ${totalWidth}mm`);
            }
            if (totalWidth > 1500) {
                warnings.push(`Window's width cannot exceed 1500mm - current: ${totalWidth}mm`);
            }
            break;
            
        case 'fixedLight': // TYPE 17
        case 'fixedLight2': // TYPE 18
            showWidthInput = true;
            showHeightInput = true;
            
            if (!validWidth || isNaN(validWidth)) {
                validWidth = 600;
                appliedDefaults.push('Vent width set to default 600mm');
            } else {
                if (validWidth < 300) {
                    validWidth = 300;
                    warnings.push('Vent width cannot be less than 300mm - adjusted to 300mm');
                }
                if (validWidth > 1000) {
                    validWidth = 1000;
                    warnings.push('Vent width cannot exceed 1000mm - adjusted to 1000mm');
                }
            }
            
            const defaultHeight17 = Math.max(300, totalHeight * 0.6);
            if (!validHeight || isNaN(validHeight)) {
                validHeight = Math.round(defaultHeight17);
                appliedDefaults.push(`Vent height set to default ${validHeight}mm (60% of total height)`);
            } else {
                const maxHeight17 = totalHeight * 0.8;
                if (validHeight < 300) {
                    validHeight = 300;
                    warnings.push('Vent height cannot be less than 300mm - adjusted to 300mm');
                }
                if (validHeight > maxHeight17) {
                    validHeight = Math.round(maxHeight17);
                    warnings.push(`Vent height cannot exceed ${Math.round(maxHeight17)}mm (80% of total) - adjusted`);
                }
            }
            break;
            
        default:
            // This should never happen, but provide safe defaults
            showWidthInput = true;
            showHeightInput = true;
            if (!validWidth || isNaN(validWidth)) validWidth = 600;
            if (!validHeight || isNaN(validHeight)) validHeight = 600;
    }
    
    // Show/hide the entire vent inputs container if both are hidden (TYPE13)
    if (ventInputsContainer) {
        const shouldShowContainer = showWidthInput || showHeightInput;
        ventInputsContainer.style.display = shouldShowContainer ? 'block' : 'none';
        console.log(`📦 Container visibility: ${shouldShowContainer ? 'SHOW' : 'HIDE'}`);
    } else {
        console.warn('⚠️ ventInputsContainer not found');
    }
    
    // Show/hide individual input containers
    if (ventWidthInputContainer) {
        ventWidthInputContainer.style.display = showWidthInput ? 'block' : 'none';
        console.log(`📏 Width input visibility: ${showWidthInput ? 'SHOW' : 'HIDE'}`);
    } else {
        console.warn('⚠️ ventWidthInputContainer not found');
    }
    
    if (ventHeightInputContainer) {
        ventHeightInputContainer.style.display = showHeightInput ? 'block' : 'none';
        console.log(`📏 Height input visibility: ${showHeightInput ? 'SHOW' : 'HIDE'}`);
    } else {
        console.warn('⚠️ ventHeightInputContainer not found');
    }
    
    // Update help text
    const widthHelp = document.getElementById('ventWidthHelp');
    const heightHelp = document.getElementById('ventHeightHelp');
    if (widthHelp && heightHelp) {
        switch(topHungWindowType) {
            case 'singlePanel':
                widthHelp.textContent = 'Fixed to full window width';
                heightHelp.textContent = 'Fixed to full window height';
                break;
            case 'doublePanel':
                widthHelp.textContent = 'Fixed to full window width (not adjustable)';
                heightHelp.textContent = 'User adjustable (200mm to 70% of total height)';
                break;
            case 'customLight':
                widthHelp.textContent = 'User adjustable (300mm to 40% of total width)';
                heightHelp.textContent = 'User adjustable (200mm to 80% of total height)';
                break;
            case 'centerHung':
                widthHelp.textContent = 'Fixed to full window width (not adjustable)';
                heightHelp.textContent = 'User adjustable (300mm to 80% of total height)';
                break;
            default:
                widthHelp.textContent = 'User adjustable (300-1000mm)';
                heightHelp.textContent = 'User adjustable (300mm to 80% of total height)';
        }
    }
    
    // Display messages
    if (appliedDefaults.length > 0) {
        const infoDiv = document.getElementById('top-hung-vent-info');
        if (infoDiv) {
            infoDiv.innerHTML = appliedDefaults.map(d => `<div class="info">ℹ️ ${d}</div>`).join('');
            setTimeout(() => { if (infoDiv) infoDiv.innerHTML = ''; }, 5000);
        }
    }
    
    if (warnings.length > 0) {
        const warningDiv = document.getElementById('top-hung-vent-warnings');
        if (warningDiv) {
            warningDiv.innerHTML = warnings.map(w => `<div class="warning">⚠️ ${w}</div>`).join('');
            setTimeout(() => { if (warningDiv) warningDiv.innerHTML = ''; }, 5000);
        }
    }

        
        return { validWidth, validHeight };
    }

    // ============================================
    // UPDATE FUNCTIONS
    // ============================================
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
            // Handle casement windows
            const selectedImage = document.querySelector('.image-option.selected');
            console.log('Selected casement image:', selectedImage);
            
            if (selectedImage) {
                const casementType = selectedImage.dataset.type;
                console.log('Casement type selected:', casementType);
                
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
                imageName = 'type-70';
            }
        } else {
            // Handle sliding windows - FIRST try the image selector (new method)
            const selectedTypeKey = window.selectedSlidingTypeKey || null;
            console.log(`🔄 updatePreview: selectedTypeKey from window: ${selectedTypeKey}`);
            
            // Map typeKey to preview image name (NEW method)
            const slidingPreviewMap = {
                'type1': 'type-1',
                'type2': 'type-2',
                'type3': 'type-3',
                'type4': 'type-4',
                'type5': 'type-5',
                'type6': 'type-6',
                'type7': 'type-7',
                'type8': 'type-8',
                'type9': 'type-9',
                'type10': 'type-10',
                'type11': 'type-11',
                'type12': 'type-12'
            };
            
            // If we have a valid selectedTypeKey from the image selector, use it
            if (selectedTypeKey && slidingPreviewMap[selectedTypeKey]) {
                imageName = slidingPreviewMap[selectedTypeKey];
                console.log(`🔄 updatePreview: Using image selector mapping: ${selectedTypeKey} -> ${imageName}`);
            } else {
                // FALLBACK: Legacy mapping (keep for backward compatibility)
                console.log('🔄 updatePreview: Falling back to legacy mapping (dropdown selectors)');
                if (noOfPanels === '2') {
                    if (fixedPartition === 'noPartition') imageName = 'type-1';
                    else if (fixedPartition === 'doubleFixed') imageName = 'type-3';
                    else if (fixedPartition === 'fixedTop') imageName = 'type-2';
                    else if (fixedPartition === 'fixedBottom') imageName = 'type-2';
                    else if (fixedPartition === 'openAbleTopFxBtm') imageName = 'type-10';
                    else if (fixedPartition === 'openAbleTop') imageName = 'type-69';
                } else if (noOfPanels === '3') {
                    if (fixedPartition === 'noPartition') imageName = 'type-4';
                    else if (fixedPartition === 'doubleFixed') imageName = 'type-6';
                    else if (fixedPartition === 'fixedTop') imageName = 'type-5';
                    else if (fixedPartition === 'fixedBottom') imageName = 'type-5';
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
        }
        
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

    function getCurrentPageType() {
        const path = window.location.pathname.toLowerCase();
        const filename = path.split('/').pop().toLowerCase();
        
        console.log('📄 Detected page:', filename);
        
        const pageMap = {
            'top-hung-windows.html': 'topHung',
            'aluminium-sliding-windows.html': 'sliding',
            'aluminium-doors.html': 'doors',
            'curtain-walling-facades.html': 'facades',
            'office-partitions.html': 'partitions',
            'glass-types.html': 'glass',
            'index.html': 'sliding',
            'aluminium-casement-windows.html': 'casement'
        };
        
        if (pageMap[filename]) {
            return pageMap[filename];
        }
        
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
    window.validateTopHungDimensions = validateTopHungDimensions;
    window.validateVentDimensions = validateVentDimensions;
    
    console.log('app.js loaded successfully');
});