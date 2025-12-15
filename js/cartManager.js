// public/js/cartManager.js 
const IS_DEV = window.location.hostname.includes('localhost') || 
               window.location.hostname.includes('127.0.0.1');
class CartManager {
  constructor() {
    this.backendUrl = HEROKU_BACKEND_URL;

    
    // Type labels mapping with categories - Defined at class level
    this.typeLabels = {
      // Sliding Windows
      type1: { label: '2 Panel Sliding Window', category: 'sliding' },
      type2: { label: '2 Panel Sliding Window with Fixed', category: 'sliding' },
      type3: { label: '2 Panel Sliding Window with Double Fixed', category: 'sliding' },
      type4: { label: '3 Panel Sliding Window', category: 'sliding' },
      type5: { label: '3 Panel Sliding Window with Fixed', category: 'sliding' },
      type6: { label: '3 Panel Sliding Window with Double Fixed', category: 'sliding' },
      type7: { label: '4 Panel Sliding Window', category: 'sliding' },
      type8: { label: '4 Panel Sliding Window with Fixed', category: 'sliding' },
      type9: { label: '4 Panel Sliding Window with Double Fixed', category: 'sliding' },
      type10: { label: '2 Panel with Openable Top', category: 'sliding-hybrid' },
      type11: { label: '3 Panel with Openable Top', category: 'sliding-hybrid' },
      type12: { label: '4 Panel with Openable Top', category: 'sliding-hybrid' },
      
      // Top-Hung/Casement Windows
      type13: { label: 'Single Top-Hung Window', category: 'top-hung' },
      type14: { label: 'Double Top-Hung Window', category: 'top-hung' },
      type15: { label: 'Custom Projecting Light Window', category: 'top-hung' },
      type16: { label: 'Single Centre-Hung Window', category: 'top-hung' },
      type17: { label: 'Fixed Light Window - Small Vent', category: 'top-hung' },
      type18: { label: 'Fixed Light Window', category: 'top-hung' },
      
      // Sliding with Awning Top
      type19: { label: 'Sliding with Awning Top', category: 'hybrid' },
      
      // Folding Windows
      type20: { label: '4 Panel Folding Window', category: 'folding' },
      type21: { label: '3 Panel Folding Window', category: 'folding' }
    };

    // First check if we have a cart in URL
    const urlParams = new URLSearchParams(window.location.search);
    const cartParam = urlParams.get('cart');
    
    if (cartParam) {
      // Load from shared link
      this.loadFromSharedCart(cartParam);
    } else {
      // Normal operation
      this.cartId = this.generateCartId();
    }
    
    this.init();
  }

  generateCartId() {
    try {
      const consent = localStorage.getItem('cookieConsent');
      
      if (consent === 'rejected') {
        if (!sessionStorage.getItem('sessionCartId')) {
          sessionStorage.setItem('sessionCartId', `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
        }
        return sessionStorage.getItem('sessionCartId');
      }
      
      // Check for existing cookie
      const existingCartId = this.getCookie('cartId');
      if (existingCartId) {
        return existingCartId;
      }
      
      // Create new cart ID and set cookie
      const newCartId = `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      document.cookie = `cartId=${newCartId}; max-age=31536000; path=/; secure; samesite=strict`;
      return newCartId;
      
    } catch (error) {
      console.warn('Storage access blocked, using session ID');
      return `fallback-${Date.now()}`;
    }
  }

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  init() {
    this.loadCart();
  }

  async loadCart() {
    try {
      if (IS_DEV) {
        console.log('🛒 Loading cart from:', this.backendUrl + '/api/cart');
      }
      const response = await fetch(this.backendUrl + '/api/cart', {
        headers: {
          'X-Cart-ID': this.cartId
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        this.renderCart(data);
      } else {
        console.error('API returned error:', data.error);
      }
      
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }

  async addToCart(itemData) {
    try {
      console.log('🛒 cartManager.addToCart called with:', itemData);
      
      const response = await fetch(this.backendUrl + '/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Cart-ID': this.cartId
        },
        body: JSON.stringify(itemData)
      });

      console.log('📤 Response status:', response.status);
      
      const data = await response.json();

      
      if (data.success) {
        console.log('✅ Item added to cart successfully');
        console.log('📊 Response structure:', {
          hasItems: !!data.items,
          itemsCount: data.items?.length || 0,
          hasTotals: !!data.totals
        });
        
        // Force re-render even if items might be empty
        this.renderCart(data);
        return true;
      } else {
        console.error('❌ Failed to add to cart:', data.error);
        return false;
      }
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      return false;
    }
  }

  async removeItem(itemId) {
    try {
      const response = await fetch(this.backendUrl + '/api/cart/item/' + itemId, {
        method: 'DELETE',
        headers: {
          'X-Cart-ID': this.cartId
        }
      });

      const data = await response.json();
      
      if (data.success) {
        this.renderCart(data);
        return true;
      } else {
        console.error('Failed to remove item:', data.error);
        return false;
      }
    } catch (error) {
      console.error('Error removing item:', error);
      return false;
    }
  }

  async updateQuantity(itemId, quantity) {
    try {
      const response = await fetch(this.backendUrl + '/api/cart/item/' + itemId + '/quantity', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Cart-ID': this.cartId
        },
        body: JSON.stringify({ quantity })
      });

      const data = await response.json();
      
      if (data.success) {
        this.renderCart(data);
        return true;
      } else {
        console.error('Failed to update quantity:', data.error);
        return false;
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      return false;
    }
  }

  async clearCart() {
    try {
      const response = await fetch(this.backendUrl + '/api/cart/clear', {
        method: 'DELETE',
        headers: {
          'X-Cart-ID': this.cartId
        }
      });

      const data = await response.json();
      
      if (data.success) {
        this.renderCart(data);
        return true;
      } else {
        console.error('Failed to clear cart:', data.error);
        return false;
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  }

  renderCart(cartData) {
    console.log('🎨 renderCart called with data:', cartData);
    
    const cartPreview = document.getElementById('cart-preview');
    console.log('🔍 cartPreview element:', cartPreview);
    console.log('📍 Document readyState:', document.readyState);
    
    if (!cartPreview) {
      console.error('❌ #cart-preview element not found!');
      console.log('🔍 Searching for cart elements:');
      console.log('- cart-preview:', document.getElementById('cart-preview'));
      console.log('- .cart-preview:', document.querySelector('.cart-preview'));
      console.log('- cart-container:', document.querySelector('.cart-container'));
      return;
    }

    const { items, totals } = cartData;
    console.log('📦 Cart data:', { items, totals });
    
    if (!items || items.length === 0) {
      console.log('🛒 Cart is empty, showing empty state');
      cartPreview.innerHTML = `
        <div class="cart-container">
          <div class="empty-cart">
            <p>Your cart is empty</p>
          </div>
        </div>
      `;
      return;
    }

    console.log('🛒 Rendering cart with', items.length, 'items');

    // Group items by category
    const categorizedItems = {};
    items.forEach(item => {
      const typeInfo = this.typeLabels[item.type] || { label: item.type, category: 'other' };
      const category = typeInfo.category;
      
      if (!categorizedItems[category]) {
        categorizedItems[category] = {
          label: this.getCategoryLabel(category),
          items: []
        };
      }
      categorizedItems[category].items.push({ ...item, typeInfo });
    });

    let html = `
      <div class="cart-container">
        <div class="cart-header">
          <div class="preview-head">Preview</div>
          <div class="desc-head">Description</div>
          <div class="price-head">Unit Price</div>
          <div class="qty-head">Quantity</div>
          <div class="total-head">Total</div>
        </div>
    `;

    // Render items by category
    Object.entries(categorizedItems).forEach(([category, categoryData]) => {
      // Optional: Add category header
      html += `
        <div class="cart-category-header">
          <h3>${categoryData.label}</h3>
        </div>
      `;
      
      categoryData.items.forEach(item => {
        const itemTotal = Math.round(item.unitPrice * item.quantity);
        
        // Get the correct image path based on category
        const imagePath = this.getImagePath(item.type, item.typeInfo.category);
        
        html += `
          <div class="cart-item" data-id="${item._id}" data-category="${item.typeInfo.category}">
            <div class="preview">
              <img src="${imagePath}" alt="${item.typeInfo.label}" width="100" height="100">
            </div>
            <div class="description">
              <h4>${item.typeInfo.label}</h4>
              <p>${item.measurements.width} × ${item.measurements.height} mm</p>
              <p>Color: ${item.profileColour}</p>
              <p>Glass: ${item.glassThickness} ${item.glassType}</p>
              <button class="remove-btn" onclick="cartManager.removeItem('${item._id}')">Remove</button>
            </div>
            <div class="price">
              Ksh ${Math.round(item.unitPrice).toLocaleString()}
            </div>
            <div class="quantity">
              <button class="qty-btn plus" onclick="cartManager.updateQuantity('${item._id}', ${item.quantity + 1})">+</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn minus" onclick="cartManager.updateQuantity('${item._id}', ${item.quantity - 1})">−</button>
            </div>
            <div class="total">
              Ksh ${itemTotal.toLocaleString()}
            </div>
          </div>
        `;
      });
    });

    const roundedGrandTotal = Math.round(totals.grandTotal || 0);
    
    html += `
        <div class="cart-footer">
          <div class="total-items">Total Items: ${totals.totalItems || 0}</div>
          <div class="grand-total">
            <strong>Grand Total:</strong> Ksh ${roundedGrandTotal.toLocaleString()}
          </div>
        </div>
        <div class="cart-actions">
          <button onclick="cartManager.clearCart()" class="clear-cart-btn">Clear Cart</button>
          <button onclick="exportQuote()" class="export-btn">Contact Us with this order</button>
        </div>
      </div>
    `;

    cartPreview.innerHTML = html;
  }

  // Add these helper methods to CartManager class
  getCategoryLabel(category) {
    const categoryLabels = {
      'sliding': 'Sliding Windows',
      'top-hung': 'Top-Hung Windows',
      'hybrid': 'Hybrid Windows',
      'sliding-hybrid': 'Sliding Windows with Openable Top',
      'folding': 'Folding Windows',
      'doors': 'Aluminium Doors',
      'facades': 'Curtain Walling Facades',
      'partitions': 'Office Partitions',
      'other': 'Other Items'
    };
    return categoryLabels[category] || category;
  }

  getImagePath(type, category) {
    // Define different image directories for different categories
    const imageDirs = {
      'sliding': '/img/labels/sliding/',
      'top-hung': '/img/labels/top-hung/',
      'hybrid': '/img/labels/hybrid/',
      'sliding-hybrid': '/img/labels/hybrid/',
      'folding': '/img/labels/folding/',
      'doors': '/img/labels/doors/',
      'facades': '/img/labels/facades/',
      'partitions': '/img/labels/partitions/'
    };
    
    const dir = imageDirs[category] || '/img/labels/';
    return `${dir}${type}.png`;
  }

  exportQuote() {
    try {
      const consent = localStorage.getItem('cookieConsent');
      
      if (consent === 'rejected') {
        return this.handleSessionCartExport();
      }
      
      return this.handleCookieCartExport();
      
    } catch (error) {
      console.error('Error exporting quote:', error);
      alert('Sorry, there was an error preparing your quote for sharing.');
      return false;
    }
  }

  handleCookieCartExport() {
    const cartData = {
      cartId: this.cartId,
      timestamp: Date.now(),
      storageType: 'cookie'
    };
    
    const encodedCart = btoa(JSON.stringify(cartData));
    const shareableLink = `${window.location.origin}${window.location.pathname}?cart=${encodedCart}`;
    
    const whatsappMessage = `Hello! I'm interested in this window configuration: ${shareableLink}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    window.open(`https://api.whatsapp.com/send/?phone=254724275877&text=${encodedMessage}&app_absent=0`, '_blank');
    return true;
  }

  async handleSessionCartExport() {
    const shouldSave = confirm('To share your cart, we need to save it to our database first. This will allow us to retrieve it later. Continue?');
    
    if (!shouldSave) return false;
    
    try {
      const persistentCartId = await this.saveSessionCartToDatabase();
      if (!persistentCartId) return false;
      
      const cartData = {
        cartId: persistentCartId,
        timestamp: Date.now(),
        storageType: 'database'
      };
      
      const encodedCart = btoa(JSON.stringify(cartData));
      const shareableLink = `${window.location.origin}${window.location.pathname}?cart=${encodedCart}`;
      
      const whatsappMessage = `Hello! I'm interested in this window configuration: ${shareableLink}`;
      const encodedMessage = encodeURIComponent(whatsappMessage);
      
      window.open(`https://api.whatsapp.com/send/?phone=254724275877&text=${encodedMessage}&app_absent=0`, '_blank');
      return true;
      
    } catch (error) {
      console.error('Error saving session cart:', error);
      alert('Failed to save your cart. Please try again or accept cookies to enable sharing.');
      return false;
    }
  }

  async saveSessionCartToDatabase() {
    try {
      const response = await fetch(this.backendUrl + '/api/cart/save-session-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Cart-ID': this.cartId
        }
      });
      
      const data = await response.json();
      return data.success ? data.persistentCartId : null;
      
    } catch (error) {
      console.error('Error saving session cart to database:', error);
      throw error;
    }
  }

  loadFromSharedCart(cartParam) {
    try {
      const cartData = JSON.parse(atob(cartParam));
      
      if (cartData.storageType === 'database') {
        this.cartId = cartData.cartId;
        this.isPersistentCart = true;
      } else {
        this.cartId = cartData.cartId;
        this.isPersistentCart = false;
      }
      
      this.loadCart();
      
    } catch (error) {
      console.error('Error loading shared cart:', error);
      this.cartId = this.generateCartId();
    }
  }
}

// Initialize cart manager
const cartManager = new CartManager();

// Make it available globally
window.cartManager = cartManager;

window.exportQuote = function() {
  if (window.cartManager) {
    return cartManager.exportQuote();
  }
  console.error('Cart manager not initialized');
  return false;
};
