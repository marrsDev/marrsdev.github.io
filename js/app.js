// public/js/app.js
const IS_DEV = window.location.hostname.includes('localhost') || 
               window.location.hostname.includes('127.0.0.1');

    if (IS_DEV) {
        console.log('🔄 app.js loading...');
    }

// Initialize Heroku Backend URL at module level
const HEROKU_BACKEND_URL = window.HEROKU_BACKEND_URL || 'https://dynamicamazement-d1e43569e1df.herokuapp.com';


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
    const profileColourEl = document.getElementById('profileColour');
    
    if (noOfPanelsEl) noOfPanelsEl.addEventListener('change', updatePreview);
    if (fixedPartitionEl) fixedPartitionEl.addEventListener('change', updatePreview);
    if (topHungWindowTypeEl) topHungWindowTypeEl.addEventListener('change', updatePreview);
    if (profileColourEl) profileColourEl.addEventListener('change', updateProfileConfig);
    
    // Initialize preview based on page type
    updatePreview();

    async function calculateCost(pageType) {
        console.log(`Calculate cost button clicked for ${pageType} page`);
        
        let result;
        
        switch(pageType) {
            case 'topHung':
                result = await calculateTopHungCost();
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
            'aluminium-doors.html': 'doors', // if you add this later
            'curtain-walling-facades.html': 'facades', // if you add this later
            'office-partitions.html': 'partitions', // if you add this later
            'glass-types.html': 'glass', // if you add this later
            'index.html': 'sliding' // Explicitly map index.html to sliding
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
