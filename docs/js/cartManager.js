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
      type21: { label: '3 Panel Folding Window', category: 'folding' },

      // Casement Windows
      'c-type1': { label: 'Dbl Top-hung Casement Window', category: 'casement' },
      'c-type2': { label: 'Double Casement Window', category: 'casement' },
      'c-type3': { label: 'Single Center-hung Casement Wndw', category: 'casement' },
      'c-type4': { label: 'Single Top-hung Casement Window', category: 'casement' },
      'c-type5': { label: 'Dbl Top-hung Casement Window', category: 'casement' },
      'c-type6': { label: 'Single Top-hung Casement Window', category: 'casement' },
      'c-type7': { label: 'Single Top-Hung Casement Window', category: 'casement' },

      // Sliding Aluminium Doors
      type31: { label: '2 Panel Sliding Door', category: 'slidingAluDoor' },
      type32: { label: '2 Panel Sliding Door', category: 'slidingAluDoor' },
      type34: { label: '3 Panel Sliding Door', category: 'slidingAluDoor' },
      type35: { label: '3 Panel Sliding Door', category: 'slidingAluDoor' },
      type37: { label: '4 Panel Sliding Door', category: 'slidingAluDoor' },
      type38: { label: '4 Panel Sliding Door', category: 'slidingAluDoor' },
      type41: { label: '2 Panel Sliding Door with Openable Top', category: 'sliding-hybridAluDoor' },
      type42: { label: '3 Panel Sliding Door with Openable Top', category: 'sliding-hybridAluDoor' },
      type43: { label: '4 Panel Sliding Door with Openable Top', category: 'sliding-hybridAluDoor' },
      type44: { label: '2 Panel Sliding Door + Insect mesh', category: 'slidingAluDoor' },
      type45: { label: '2 Panel Sliding Door, fixed top + Insect mesh', category: 'slidingAluDoor' },
      type46: { label: '3 Panel Sliding Door + Insect mesh', category: 'slidingAluDoor' },
      type47: { label: '3 Panel Sliding Door, fixed top + Insect mesh', category: 'slidingAluDoor' },
      type48: { label: '4 Panel Sliding Door + Insect mesh', category: 'slidingAluDoor' },
      type49: { label: '4 Panel Sliding Door, fixed top + Insect mesh', category: 'slidingAluDoor' },
      type50: { label: '2 Panel Sliding Door, awning top + Insect mesh', category: 'sliding-hybridAluDoor' },
      type51: { label: '3 Panel Sliding Door, awning top + Insect mesh', category: 'sliding-hybridAluDoor' },
      type52: { label: '4 Panel Sliding Door, awning top + Insect mesh', category: 'sliding-hybridAluDoor' },
    };

    // A cart arriving via a share link is a READ-ONLY SNAPSHOT. It is only ever
    // rendered; it is never used as the visitor's working cart. The first edit
    // forks it into a brand new cart owned by the visitor.
    this.isViewingSharedCart = false;
    this.sharedCartId = null;

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

  // ========== MOVED THESE METHODS OUTSIDE CONSTRUCTOR ==========
  init() {
    // A shared cart must NOT have its id replaced by syncCartId(). That is what
    // previously made a shared link silently show the visitor's own cart.
    if (this.isViewingSharedCart) {
      this.loadCart();
      return;
    }

    // Sync cart ID from localStorage if available
    this.syncCartId();
    this.loadCart();
  }

  syncCartId() {
    const storedId = localStorage.getItem('persistentCartId');
    const cookieId = this.getCookie('cartId');
    const sessionId = sessionStorage.getItem('sessionCartId');
    
    if (storedId) {
      // Use stored ID and ensure cookie matches
      this.cartId = storedId;
      if (!cookieId || cookieId !== storedId) {
        document.cookie = `cartId=${storedId}; max-age=31536000; path=/; samesite=strict`;
      }
      if (!sessionId || sessionId !== storedId) {
        sessionStorage.setItem('sessionCartId', storedId);
      }
    } else if (cookieId) {
      this.cartId = cookieId;
      localStorage.setItem('persistentCartId', cookieId);
    } else if (sessionId) {
      this.cartId = sessionId;
      localStorage.setItem('persistentCartId', sessionId);
    } else {
      this.cartId = this.generateCartId();
    }
    
    console.log('🛒 Cart ID synced:', this.cartId);
  }
  // ========== END OF MOVED METHODS ==========

  generateCartId() {
    try {
      const consent = localStorage.getItem('cookieConsent');
      
      // First, check if there's an existing cart ID in localStorage (for persistence across pages)
      const storedCartId = localStorage.getItem('persistentCartId');
      if (storedCartId) {
        console.log('🛒 Using stored cart ID:', storedCartId);
        return storedCartId;
      }
      
      if (consent === 'rejected') {
        // Use sessionStorage but also store in localStorage for persistence
        let sessionId = sessionStorage.getItem('sessionCartId');
        if (!sessionId) {
          sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          sessionStorage.setItem('sessionCartId', sessionId);
          localStorage.setItem('persistentCartId', sessionId);
        }
        return sessionId;
      }
      
      // Check for existing cookie
      const existingCartId = this.getCookie('cartId');
      if (existingCartId) {
        // Store in localStorage for persistence across pages
        localStorage.setItem('persistentCartId', existingCartId);
        return existingCartId;
      }
      
      // Create new cart ID and set cookie and localStorage
      const newCartId = `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      document.cookie = `cartId=${newCartId}; max-age=31536000; path=/; samesite=strict`;
      localStorage.setItem('persistentCartId', newCartId);
      return newCartId;
      
    } catch (error) {
      console.warn('Storage access blocked, using session ID');
      let fallbackId = sessionStorage.getItem('fallbackCartId');
      if (!fallbackId) {
        fallbackId = `fallback-${Date.now()}`;
        sessionStorage.setItem('fallbackCartId', fallbackId);
        localStorage.setItem('persistentCartId', fallbackId);
      }
      return fallbackId;
    }
  }

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
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

  /** The cart id this browser is currently pointing at (not the shared one). */
  getStoredCartId() {
    try {
      return localStorage.getItem('persistentCartId')
        || this.getCookie('cartId')
        || sessionStorage.getItem('sessionCartId')
        || null;
    } catch (error) {
      return null;
    }
  }

  /** Write a cart id to every storage layer syncCartId() reads. */
  persistCartId(cartId) {
    try {
      localStorage.setItem('persistentCartId', cartId);
      sessionStorage.setItem('sessionCartId', cartId);
      document.cookie = `cartId=${cartId}; max-age=31536000; path=/; samesite=strict`;
    } catch (error) {
      console.warn('Could not persist cart id:', error);
    }
  }

  /**
   * A shared cart is read-only. The first edit creates a brand-new cart -
   * pre-populated with the snapshot's items - and switches to it, so continuing
   * from a shared cart can never mutate what the sender shared.
   *
   * The visitor's previous cart is NOT deleted or modified: its rows stay intact
   * in the database, and its id is kept in `preForkCartId` so they can be
   * returned to it (see returnToOwnCart).
   */
  async ensureWritableCart() {
    if (!this.isViewingSharedCart) return true;

    try {
      const response = await fetch(this.backendUrl + '/api/cart/fork-shared', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fromCartId: this.sharedCartId })
      });

      const data = await response.json();

      if (!data.success || !data.cartId) {
        throw new Error(data.error || 'Could not start a new cart');
      }

      // Remember the cart this browser had before the fork so it is never
      // orphaned - only the pointer moves, the rows are untouched.
      const ownCartId = this.getStoredCartId();
      if (ownCartId && ownCartId !== this.sharedCartId && ownCartId !== data.cartId) {
        try {
          localStorage.setItem('preForkCartId', ownCartId);
        } catch (error) {
          console.warn('Could not remember the previous cart id:', error);
        }
      }

      this.cartId = data.cartId;
      this.isViewingSharedCart = false;
      this.sharedCartId = null;

      // Keep BOTH ids so the switch is reversible: preForkCartId is the visitor's
      // own cart, forkCartId is the parallel cart copied from the shared one.
      try {
        localStorage.setItem('forkCartId', data.cartId);
      } catch (error) {
        console.warn('Could not remember the forked cart id:', error);
      }

      this.persistCartId(this.cartId);

      console.log('🆕 Continuing in a forked cart:', this.cartId);
      alert('Continuing a new cart from a shared cart');

      return true;
    } catch (error) {
      console.error('Error continuing from shared cart:', error);
      alert(`Could not continue from the shared cart: ${error.message}`);
      return false;
    }
  }

  /**
   * Switch back to the cart the visitor had before they continued from a shared
   * one. Nothing was lost in the meantime - this restores the pointer.
   */
  /** Switch the active cart. Both ids are kept, so the switch is reversible. */
  async switchToCart(cartId) {
    if (!cartId) return false;

    this.cartId = cartId;
    this.isViewingSharedCart = false;
    this.sharedCartId = null;
    this.persistCartId(cartId);

    await this.loadCart();
    return true;
  }

  /**
   * The other cart this browser can switch to, if both ids are known.
   * Returns { label, action } or null.
   */
  getAlternateCart() {
    try {
      const ownCartId = localStorage.getItem('preForkCartId');
      const forkCartId = localStorage.getItem('forkCartId');

      if (!ownCartId || !forkCartId) return null;

      return (this.cartId === forkCartId)
        ? { label: 'Return to my cart', action: 'returnToOwnCart()' }
        : { label: 'Go to shared cart', action: 'goToForkedCart()' };
    } catch (error) {
      return null;
    }
  }

  /** Back to the cart this browser had before continuing from a shared one. */
  async returnToOwnCart() {
    let ownCartId = null;
    try {
      ownCartId = localStorage.getItem('preForkCartId');
    } catch (error) {
      console.warn('Could not read the previous cart id:', error);
    }

    return this.switchToCart(ownCartId);
  }

  /** Back to the parallel cart that was created from the shared cart. */
  async goToForkedCart() {
    let forkCartId = null;
    try {
      forkCartId = localStorage.getItem('forkCartId');
    } catch (error) {
      console.warn('Could not read the forked cart id:', error);
    }

    return this.switchToCart(forkCartId);
  }

  async addToCart(itemData) {
    try {
      console.log('🛒 cartManager.addToCart called with:', itemData);

      // Editing a shared cart forks it into the visitor's own cart first.
      if (!(await this.ensureWritableCart())) return false;

      // Ensure we have the latest cart ID
      this.syncCartId();
      
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
      if (!(await this.ensureWritableCart())) return false;

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
      if (!(await this.ensureWritableCart())) return false;

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
      if (!(await this.ensureWritableCart())) return false;

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
      // The empty branch must still offer the cart switch, otherwise a visitor
      // whose own cart is empty would have no way back to the parallel cart.
      const alternate = this.getAlternateCart();
      cartPreview.innerHTML = `
        <div class="cart-container">
          <div class="empty-cart">
            <p>Your cart is empty</p>
          </div>
          ${alternate ? `<div class="cart-actions"><button onclick="${alternate.action}" class="return-cart-btn">${alternate.label}</button></div>` : ''}
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

    // Offer a reversible switch between this browser's own cart and the parallel
    // cart created from a shared one. Whichever is active, the button leads to
    // the other.
    const alternateCart = this.getAlternateCart();
    
    html += `
        <div class="cart-footer">
          <div class="total-items">Total Items: ${totals.totalItems || 0}</div>
          <div class="grand-total">
            <strong>Grand Total:</strong> Ksh ${roundedGrandTotal.toLocaleString()}
          </div>
        </div>
        <div class="cart-actions">
          ${alternateCart ? `<button onclick="${alternateCart.action}" class="return-cart-btn">${alternateCart.label}</button>` : ''}
          <button onclick="cartManager.clearCart()" class="clear-cart-btn">Clear Cart</button>
          <button onclick="exportQuote()" class="export-btn">Contact Us with this order</button>
        </div>
      </div>
    `;

    cartPreview.innerHTML = html;
  }

  getCategoryLabel(category) {
    const categoryLabels = {
      'sliding': 'Sliding Windows',
      'top-hung': 'Top-Hung Windows',
      'hybrid': 'Hybrid Windows',
      'sliding-hybrid': 'Sliding Windows with Openable Top',
      'folding': 'Folding Windows',
      'casement': 'Casement Windows',
      'slidingAluDoor': 'Sliding Aluminium Doors',
      'sliding-hybridAluDoor': 'Sliding Doors with Openable Top',
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
      'casement': '/img/labels/casement/',
      'slidingAluDoor': '/img/labels/doors/',
      'sliding-hybridAluDoor': '/img/labels/doors/',
      'facades': '/img/labels/facades/',
      'partitions': '/img/labels/partitions/'
    };
    
    const dir = imageDirs[category] || '/img/labels/';
    return `${dir}${type}.png`;
  }

  async exportQuote() {
    try {
      return await this.shareCartOnWhatsApp();
    } catch (error) {
      console.error('Error exporting quote:', error);
      alert('Sorry, there was an error preparing your quote for sharing.');
      return false;
    }
  }

  async shareCartOnWhatsApp() {
    const shareableLink = await this.buildShareableLink();
    if (!shareableLink) return false;

    const whatsappMessage = `Hello! I'm interested in this window configuration: ${shareableLink}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);

    window.open(`https://api.whatsapp.com/send/?phone=254724275877&text=${encodedMessage}&app_absent=0`, '_blank');
    return true;
  }

  // Kept as thin aliases so any existing caller keeps working.
  async handleCookieCartExport() {
    return this.shareCartOnWhatsApp();
  }

  async handleSessionCartExport() {
    return this.shareCartOnWhatsApp();
  }

  /**
   * Freeze the current cart server-side, then build the link from the SNAPSHOT id.
   *
   * This is what makes a shared link immutable: the sender can keep editing their
   * own cart, and anyone opening an already-sent link still sees exactly what was
   * sent. A new share therefore produces a new link.
   */
  async buildShareableLink() {
    if (this.isViewingSharedCart) {
      alert('You are viewing a shared cart. Add or remove an item to start your own cart, then share that.');
      return null;
    }

    try {
      const response = await fetch(this.backendUrl + '/api/cart/share-snapshot', {
        method: 'POST',
        headers: { 'X-Cart-ID': this.cartId }
      });

      const data = await response.json();

      if (!data.success || !data.cartId) {
        throw new Error(data.error || 'Could not create a shareable cart');
      }

      const cartData = {
        cartId: data.cartId, // the immutable snapshot - NOT this.cartId
        timestamp: Date.now(),
        storageType: 'shared'
      };

      return `${window.location.origin}${window.location.pathname}?cart=${btoa(JSON.stringify(cartData))}`;
    } catch (error) {
      console.error('Error building shareable link:', error);
      alert(`Sorry, could not prepare your quote for sharing: ${error.message}`);
      return null;
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

      if (!cartData || !cartData.cartId) {
        throw new Error('Malformed shared cart link');
      }

      this.sharedCartId = cartData.cartId;
      this.isViewingSharedCart = true;
      // Render this id, but never persist it as the visitor's own cart.
      this.cartId = cartData.cartId;
      this.isPersistentCart = cartData.storageType !== 'session';

      console.log('🔗 Viewing shared cart snapshot:', this.sharedCartId);

    } catch (error) {
      console.error('Error loading shared cart:', error);
      this.isViewingSharedCart = false;
      this.sharedCartId = null;
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

// Switch back to the cart this browser had before continuing from a shared one.
window.returnToOwnCart = function() {
  if (window.cartManager) {
    return cartManager.returnToOwnCart();
  }
  console.error('Cart manager not initialized');
  return false;
};

// Switch to the parallel cart created from the shared cart.
window.goToForkedCart = function() {
  if (window.cartManager) {
    return cartManager.goToForkedCart();
  }
  console.error('Cart manager not initialized');
  return false;
};
