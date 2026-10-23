/* ===================================================================
   SWIFT JACKETS — INTERACTIVE APPLICATION SCRIPT (ENHANCED)
   - Real-time Synchronization with Admin Portal
   - Dynamic Custom Color & 3D Background Theme Generation
   - Product Condition & Stock Meters
   - Dynamic Size Availability Toggles
   - Email Notification on Order Placement (aliloveff500@gmail.com)
   - Customer Registry Synchronization
=================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // =================================================================
  // SWIFT LUXURY CUSTOM DIALOG & TOAST SYSTEM (Replaces Native Browser alert/confirm)
  // =================================================================
  function showSwiftAlert(options) {
    const opts = typeof options === 'string' ? { message: options } : (options || {});
    const title = opts.title || 'Notice';
    const message = opts.message || '';
    const type = opts.type || 'warning';
    const confirmText = opts.confirmText || 'Got It';

    return new Promise((resolve) => {
      let backdrop = document.getElementById('swiftDialogBackdrop');
      if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'swiftDialogBackdrop';
        backdrop.className = 'swift-dialog-backdrop';
        backdrop.innerHTML = `
          <div class="swift-dialog-card" id="swiftDialogCard">
            <div class="swift-dialog-icon-ring" id="swiftDialogIconRing"></div>
            <div class="swift-dialog-content">
              <h3 class="swift-dialog-title" id="swiftDialogTitle"></h3>
              <p class="swift-dialog-message" id="swiftDialogMessage"></p>
            </div>
            <div class="swift-dialog-actions" id="swiftDialogActions">
              <button type="button" class="swift-dialog-btn secondary" id="swiftDialogCancelBtn" style="display: none;">Cancel</button>
              <button type="button" class="swift-dialog-btn primary" id="swiftDialogConfirmBtn">OK</button>
            </div>
          </div>
        `;
        document.body.appendChild(backdrop);
      }

      const card = backdrop.querySelector('#swiftDialogCard');
      const iconRing = backdrop.querySelector('#swiftDialogIconRing');
      const titleEl = backdrop.querySelector('#swiftDialogTitle');
      const msgEl = backdrop.querySelector('#swiftDialogMessage');
      const cancelBtn = backdrop.querySelector('#swiftDialogCancelBtn');
      const confirmBtn = backdrop.querySelector('#swiftDialogConfirmBtn');

      card.className = `swift-dialog-card variant-${type}`;

      const icons = {
        warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
        danger: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
        success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
        info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`
      };

      iconRing.innerHTML = icons[type] || icons.warning;
      titleEl.textContent = title;
      msgEl.textContent = message;
      confirmBtn.textContent = confirmText;
      cancelBtn.style.display = 'none';

      function cleanup(res) {
        backdrop.classList.remove('active');
        confirmBtn.onclick = null;
        cancelBtn.onclick = null;
        backdrop.onclick = null;
        document.removeEventListener('keydown', keyHandler);
        resolve(res);
      }

      function keyHandler(e) {
        if (e.key === 'Escape' || e.key === 'Enter') cleanup(true);
      }

      confirmBtn.onclick = () => cleanup(true);
      backdrop.onclick = (e) => {
        if (e.target === backdrop) cleanup(true);
      };
      document.addEventListener('keydown', keyHandler);
      backdrop.classList.add('active');
    });
  }

  function showSwiftToast(text, type = 'info') {
    let container = document.getElementById('swiftToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'swiftToastContainer';
      container.className = 'swift-toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'swift-toast-item';
    const icon = type === 'success' ? '✓' : (type === 'danger' ? '⚠️' : 'ℹ️');
    toast.innerHTML = `<span>${icon}</span> <span>${text}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('out');
      setTimeout(() => toast.remove(), 260);
    }, 3200);
  }

  // Override window.alert so Google/native alerts NEVER appear anywhere on website
  window.alert = (msg) => {
    return showSwiftAlert({
      title: 'Notice',
      message: String(msg || ''),
      type: 'warning',
      confirmText: 'Understood'
    });
  };

  // 1. DEFAULT DATASET (Seeded if localStorage empty)
  const DEFAULT_PRODUCTS = [
    {
      id: 'swift-orange',
      name: 'Swift ThermoPuff Apex',
      colorName: 'Solar Ember',
      themeClass: 'theme-orange',
      hex: '#ff6a2b',
      gradient: 'radial-gradient(circle at 62% 48%, #ff6b2b 0%, #a23807 38%, #140702 92%)',
      themeGlow: 'rgba(255, 106, 43, 0.45)',
      price: 14999,
      originalPrice: 19999,
      discount: 'Save 25%',
      condition: 'Brand New',
      stockAvailable: 18,
      itemsSold: 42,
      availableSizes: ['36', '38', '40', '42'],
      tag: 'WINTER 2026 EDITION',
      headline: 'Stand out',
      headlineLight: 'Without trying',
      tagline: 'Confidence, wrapped in warmth',
      description: "Ultralight aerogel warmth. Sculpted modern silhouette.",
      tech: 'Aerogel 850+ Fill',
      image: 'assets/images/jacket_orange.png'
    },
    {
      id: 'swift-black',
      name: 'Swift AeroShadow Ghost',
      colorName: 'Stealth Obsidian',
      themeClass: 'theme-black',
      hex: '#2b2d35',
      gradient: 'radial-gradient(circle at 62% 48%, #3e424c 0%, #1c1e25 42%, #08090c 92%)',
      themeGlow: 'rgba(160, 174, 192, 0.35)',
      price: 18999,
      originalPrice: 24999,
      discount: 'Save 24%',
      condition: 'Brand New',
      stockAvailable: 24,
      itemsSold: 65,
      availableSizes: ['36', '38', '40', '42'],
      tag: 'STEALTH LABS EDITION',
      headline: 'Quiet power,',
      headlineLight: 'Unmatched warmth',
      tagline: 'Precision cut, engineered for stealth',
      description: "Matte stormproof shell. Engineered for quiet warmth.",
      tech: 'GORE Windstopper & 850 Down',
      image: 'assets/images/jacket_black.png'
    },
    {
      id: 'swift-white',
      name: 'Swift Arctic Frost Luxe',
      colorName: 'Glacier Pearl',
      themeClass: 'theme-white',
      hex: '#cfdbe6',
      gradient: 'radial-gradient(circle at 62% 48%, #cfdbe6 0%, #76899b 42%, #141d24 92%)',
      themeGlow: 'rgba(186, 215, 233, 0.45)',
      price: 16999,
      originalPrice: 22999,
      discount: 'Save 26%',
      condition: 'Brand New',
      stockAvailable: 12,
      itemsSold: 31,
      availableSizes: ['36', '38', '40'],
      tag: 'ALPINE GLACIER CAPSULE',
      headline: 'Pure elegance,',
      headlineLight: 'Effortless warmth',
      tagline: 'Luminous comfort in sub-zero calm',
      description: "Sub-zero pearl ripstop. Responsible 850 down fill.",
      tech: 'Hydrophobic Pearl Ripstop',
      image: 'assets/images/jacket_white.png'
    },
    {
      id: 'swift-red',
      name: 'Swift Velvet Blaze',
      colorName: 'Crimson Ruby',
      themeClass: 'theme-red',
      hex: '#e11d48',
      gradient: 'radial-gradient(circle at 62% 48%, #e11d48 0%, #7a091e 40%, #140206 92%)',
      themeGlow: 'rgba(244, 63, 94, 0.45)',
      price: 15999,
      originalPrice: 20999,
      discount: 'Save 24%',
      condition: 'Brand New',
      stockAvailable: 9,
      itemsSold: 28,
      availableSizes: ['38', '40', '42'],
      tag: 'HIGH ROLLER LIMITED',
      headline: 'Bold presence,',
      headlineLight: 'Timeless comfort',
      tagline: 'Command attention in every room',
      description: "Windproof micro-weave. High-contrast thermal warmth.",
      tech: 'Thermal Core Micro-Weave',
      image: 'assets/images/jacket_red.png'
    }
  ];

  // Price formatting in PKR
  function formatPKR(val) {
    const num = parseInt(val) || 0;
    return `PKR ${num.toLocaleString('en-PK')}`;
  }

  // Load products from LocalStorage with dual redundancy backup
  function getLiveProducts() {
    let stored = localStorage.getItem('swift_jackets_products');
    if (!stored) {
      stored = localStorage.getItem('swift_jackets_products_backup');
    }
    if (!stored) {
      try {
        localStorage.setItem('swift_jackets_products', JSON.stringify(DEFAULT_PRODUCTS));
        localStorage.setItem('swift_jackets_products_backup', JSON.stringify(DEFAULT_PRODUCTS));
      } catch (err) {}
      return DEFAULT_PRODUCTS;
    }
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        parsed.forEach(p => {
          if (p.price && p.price < 100) p.price = p.price * 100;
          if (p.originalPrice && p.originalPrice < 100) p.originalPrice = p.originalPrice * 100;
          // Auto-migrate legacy long paragraph text to clean concise 1-liners
          if (p.description && p.description.includes("It's not just about staying warm")) {
            p.description = "Ultralight aerogel warmth. Sculpted modern silhouette.";
          } else if (p.description && p.description.includes("Matte obsidian finish")) {
            p.description = "Matte stormproof shell. Engineered for quiet warmth.";
          } else if (p.description && p.description.includes("High-sheen pearl finish")) {
            p.description = "Sub-zero pearl ripstop. Responsible 850 down fill.";
          } else if (p.description && p.description.includes("Vibrant high-contrast crimson")) {
            p.description = "Windproof micro-weave. High-contrast thermal warmth.";
          }
        });
        try {
          localStorage.setItem('swift_jackets_products', JSON.stringify(parsed));
          localStorage.setItem('swift_jackets_products_backup', JSON.stringify(parsed));
        } catch (err) {}
        return parsed;
      }
      return DEFAULT_PRODUCTS;
    } catch (e) {
      return DEFAULT_PRODUCTS;
    }
  }

  let products = getLiveProducts();

  // 2. STATE VARIABLES
  let currentIndex = 0;
  let selectedSize = '38';
  let cartQuantity = 1;
  let isAnimating = false;
  let ordersList = JSON.parse(localStorage.getItem('swift_jackets_orders') || '[]');
  let currentUser = JSON.parse(localStorage.getItem('swift_jackets_user') || 'null');

  // 3. DOM ELEMENTS
  const body = document.body;
  const currentSlideNum = document.getElementById('currentSlideNum');
  const totalSlidesNum = document.getElementById('totalSlidesNum');
  const collectionTag = document.getElementById('collectionTag');
  const heroHeadlineMain = document.getElementById('heroHeadlineMain');
  const heroHeadlineSub = document.getElementById('heroHeadlineSub');
  const productDesc = document.getElementById('productDesc');
  const techTagText = document.getElementById('techTagText');
  const heroTagline = document.getElementById('heroTagline');
  const jacketColorName = document.getElementById('jacketColorName');
  const discountBadge = document.getElementById('discountBadge');
  const currentPrice = document.getElementById('currentPrice');
  const originalPrice = document.getElementById('originalPrice');
  const mainJacketImg = document.getElementById('mainJacketImg');
  const jacketContainer = document.getElementById('jacketContainer');
  const jacketShadow = document.getElementById('jacketShadow');
  const previewThumbImg = document.getElementById('previewThumbImg');
  const previewColorTitle = document.getElementById('previewColorTitle');
  const previewPriceTitle = document.getElementById('previewPriceTitle');
  const nextPreviewCard = document.getElementById('nextPreviewCard');
  const colorSwatchesContainer = document.getElementById('colorSwatches');
  const swatchActiveName = document.getElementById('swatchActiveName');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const sizePills = document.querySelectorAll('.size-pill');
  const addToCartBtn = document.getElementById('addToCartBtn');
  const cartBadge = document.getElementById('cartBadge');
  const heroConditionBadge = document.getElementById('heroConditionBadge');
  const heroStockBadge = document.getElementById('heroStockBadge');

  // CART DRAWER ELEMENTS
  const cartOverlay = document.getElementById('cartOverlay');
  const openCartDrawer = document.getElementById('openCartDrawer');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartCheckoutView = document.getElementById('cartCheckoutView');
  const orderStatusView = document.getElementById('orderStatusView');
  const cartItemCard = document.getElementById('cartItemCard');
  const cartItemImage = document.getElementById('cartItemImage');
  const cartItemTitle = document.getElementById('cartItemTitle');
  const cartItemPrice = document.getElementById('cartItemPrice');
  const cartItemColor = document.getElementById('cartItemColor');
  const cartItemSize = document.getElementById('cartItemSize');
  const removeCartItemBtn = document.getElementById('removeCartItemBtn');
  const cartEmptyState = document.getElementById('cartEmptyState');
  const emptyExploreBtn = document.getElementById('emptyExploreBtn');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const qtyValue = document.getElementById('qtyValue');
  const summaryTotal = document.getElementById('summaryTotal');
  const checkoutForm = document.getElementById('checkoutForm');
  const placeOrderBtn = document.getElementById('placeOrderBtn');
  const orderAnotherBtn = document.getElementById('orderAnotherBtn');

  // ORDER STATUS VIEW ELEMENTS
  const placedOrderId = document.getElementById('placedOrderId');
  const placedOrderStatus = document.getElementById('placedOrderStatus');
  const placedOrderRecipient = document.getElementById('placedOrderRecipient');
  const placedOrderAddress = document.getElementById('placedOrderAddress');
  const placedOrderContact = document.getElementById('placedOrderContact');
  const placedOrderImg = document.getElementById('placedOrderImg');
  const placedOrderTitle = document.getElementById('placedOrderTitle');
  const placedOrderDetails = document.getElementById('placedOrderDetails');
  const placedOrderPrice = document.getElementById('placedOrderPrice');

  // INLINE ORDER STATUS ELEMENTS (In Shopping Bag Drawer Blank Area)
  const inlineOrderStatusCard = document.getElementById('inlineOrderStatusCard');
  const inlineOrderId = document.getElementById('inlineOrderId');
  const inlineOrderStatus = document.getElementById('inlineOrderStatus');
  const inlineRecipientName = document.getElementById('inlineRecipientName');
  const inlineContact = document.getElementById('inlineContact');
  const inlineAddress = document.getElementById('inlineAddress');
  const inlineTotal = document.getElementById('inlineTotal');
  const inlineWhatsAppBtn = document.getElementById('inlineWhatsAppBtn');
  const inlineOrderAgainBtn = document.getElementById('inlineOrderAgainBtn');
  const cartDrawer = document.getElementById('cartDrawer');

  // AUTH MODAL ELEMENTS
  const authModal = document.getElementById('authModal');
  const openAuthModal = document.getElementById('openAuthModal');
  const closeAuthModal = document.getElementById('closeAuthModal');
  const authButtonText = document.getElementById('authButtonText');
  const loginForm = document.getElementById('loginForm');
  const authFormSection = document.getElementById('authFormSection');
  const authProfileSection = document.getElementById('authProfileSection');
  const profileGreeting = document.getElementById('profileGreeting');
  const profileEmail = document.getElementById('profileEmail');
  const userOrdersCount = document.getElementById('userOrdersCount');
  const signOutBtn = document.getElementById('signOutBtn');

  // ABOUT MODAL ELEMENTS
  const aboutModal = document.getElementById('aboutModal');
  const navAboutUs = document.getElementById('navAboutUs');
  const closeAboutModal = document.getElementById('closeAboutModal');
  const aboutCloseCta = document.getElementById('aboutCloseCta');
  const navContact = document.getElementById('navContact');

  // ALL PRODUCTS MODAL ELEMENTS
  const allProductsModal = document.getElementById('allProductsModal');
  const navAllProducts = document.getElementById('navAllProducts');
  const closeAllProductsModal = document.getElementById('closeAllProductsModal');
  const productsCatalogGrid = document.getElementById('productsCatalogGrid');

  // 4. APPLY DYNAMIC CUSTOM COLOR & BACKGROUND THEME
  function calculateThemeFromHex(hex) {
    let c = (hex || '#ff6a2b').replace('#', '').trim();
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    if (c.length !== 6) c = 'ff6a2b';
    const r = parseInt(c.substring(0, 2), 16) || 255;
    const g = parseInt(c.substring(2, 4), 16) || 106;
    const b = parseInt(c.substring(4, 6), 16) || 43;

    const midR = Math.round(r * 0.42);
    const midG = Math.round(g * 0.42);
    const midB = Math.round(b * 0.42);

    const baseR = Math.round(r * 0.07);
    const baseG = Math.round(g * 0.07);
    const baseB = Math.round(b * 0.07);

    const gradient = `radial-gradient(circle at 62% 48%, rgb(${r}, ${g}, ${b}) 0%, rgb(${midR}, ${midG}, ${midB}) 42%, rgb(${baseR}, ${baseG}, ${baseB}) 92%)`;
    const glow = `rgba(${r}, ${g}, ${b}, 0.55)`;

    return { hex: `#${c}`, gradient, glow, rgb: `${r}, ${g}, ${b}` };
  }

  // 4. APPLY DYNAMIC CUSTOM COLOR & BACKGROUND THEME
  function applyProductTheme(prod) {
    if (prod.themeClass) {
      body.className = prod.themeClass;
    } else {
      body.className = '';
    }

    const calc = calculateThemeFromHex(prod.hex);
    const gradient = prod.gradient || calc.gradient;
    const glow = prod.themeGlow || calc.glow;
    const hex = prod.hex || calc.hex;

    document.documentElement.style.setProperty('--theme-primary', hex);
    document.documentElement.style.setProperty('--theme-glow', glow);
    document.documentElement.style.setProperty('--theme-bg-gradient', gradient);

    // Apply directly to dynamic background canvas elements
    const bgLayer = document.querySelector('.bg-gradient-layer.current');
    if (bgLayer) {
      bgLayer.style.background = gradient;
    }
    const ambientGlow = document.querySelector('.bg-ambient-glow');
    if (ambientGlow) {
      ambientGlow.style.background = `radial-gradient(circle, ${glow} 0%, transparent 68%)`;
    }
    const ambientRing = document.querySelector('.ambient-ring');
    if (ambientRing) {
      ambientRing.style.boxShadow = `0 0 60px ${glow}, inset 0 0 40px ${glow}`;
    }

    if (swatchActiveName) swatchActiveName.textContent = prod.colorName;

    // Immediately update main hero jacket image to match current product
    if (mainJacketImg && prod && prod.image) {
      mainJacketImg.src = prod.image;
    }
  }

  // 5. INITIALIZE VISIBLE COLORWAY SWATCHES
  function initColorSwatches() {
    colorSwatchesContainer.innerHTML = '';
    products.forEach((p, idx) => {
      const btn = document.createElement('button');
      btn.className = `color-dot-btn ${idx === currentIndex ? 'active' : ''}`;
      btn.title = `${p.colorName} (${formatPKR(p.price)})`;
      btn.setAttribute('aria-label', p.colorName);

      const borderStyle = p.hex === '#2b2d35' || p.hex === '#000000' ? 'border: 1px solid rgba(255,255,255,0.4);' : '';
      btn.innerHTML = `<span class="color-dot-fill" style="background: ${p.hex}; ${borderStyle}"></span>`;

      btn.addEventListener('click', () => {
        if (idx !== currentIndex && !isAnimating) {
          switchProduct(idx, idx > currentIndex ? 1 : -1, true);
        }
      });
      colorSwatchesContainer.appendChild(btn);
    });

    if (totalSlidesNum) totalSlidesNum.textContent = `0${products.length}`;
  }

  // 6. UPDATE SIZE AVAILABILITY FOR CURRENT JACKET
  function updateSizeAvailability(prod) {
    const available = prod.availableSizes || ['36', '38', '40', '42'];
    let selectedStillValid = false;

    sizePills.forEach(pill => {
      const sizeVal = pill.getAttribute('data-size');
      if (available.includes(sizeVal)) {
        pill.classList.remove('disabled');
        pill.removeAttribute('disabled');
        pill.title = `Size ${sizeVal} (In Stock)`;
        if (sizeVal === selectedSize) selectedStillValid = true;
      } else {
        pill.classList.add('disabled');
        pill.setAttribute('disabled', 'true');
        pill.classList.remove('active');
        pill.title = `Size ${sizeVal} (Unavailable for this model)`;
      }
    });

    // If previously selected size is disabled for this jacket, pick the first available size
    if (!selectedStillValid && available.length > 0) {
      selectedSize = available[0];
      sizePills.forEach(p => {
        if (p.getAttribute('data-size') === selectedSize) {
          p.classList.add('active');
        }
      });
    }
  }

  // 7. SWITCH PRODUCT LOGIC
  function switchProduct(newIndex, direction = 1, fromSwatch = false) {
    if (isAnimating || products.length === 0) return;
    isAnimating = true;

    currentIndex = newIndex % products.length;
    const nextProd = products[currentIndex];

    // Apply color theme dynamically
    applyProductTheme(nextProd);

    // Update size toggles
    updateSizeAvailability(nextProd);

    if (!fromSwatch && nextPreviewCard) {
      animateFromBottomRightToHero(nextProd);
    } else {
      animateDirectionalSlide(nextProd, direction);
    }
  }

  // ANIMATION: BOTTOM-RIGHT THUMBNAIL INTO HERO
  function animateFromBottomRightToHero(nextProd) {
    const thumbRect = previewThumbImg.getBoundingClientRect();
    const heroRect = mainJacketImg.getBoundingClientRect();

    const flyingThumb = document.createElement('img');
    flyingThumb.src = nextProd.image;
    flyingThumb.style.position = 'fixed';
    flyingThumb.style.left = `${thumbRect.left}px`;
    flyingThumb.style.top = `${thumbRect.top}px`;
    flyingThumb.style.width = `${thumbRect.width}px`;
    flyingThumb.style.height = `${thumbRect.height}px`;
    flyingThumb.style.objectFit = 'contain';
    flyingThumb.style.zIndex = '90';
    flyingThumb.style.pointerEvents = 'none';
    flyingThumb.style.filter = 'drop-shadow(0 15px 30px rgba(0,0,0,0.5))';
    document.body.appendChild(flyingThumb);

    const tl = gsap.timeline({
      onComplete: () => {
        flyingThumb.remove();
        isAnimating = false;
      }
    });

    tl.to(mainJacketImg, {
      scale: 0.8,
      y: -30,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in'
    }, 0);

    tl.to([productDesc, heroTagline, currentPrice], {
      opacity: 0.3,
      y: -6,
      duration: 0.2
    }, 0);

    tl.to(flyingThumb, {
      left: heroRect.left,
      top: heroRect.top,
      width: heroRect.width,
      height: heroRect.height,
      rotation: 0,
      duration: 0.55,
      ease: 'power3.out',
      onComplete: () => {
        mainJacketImg.src = nextProd.image;
        gsap.set(mainJacketImg, { scale: 1, y: 0, opacity: 1, rotationX: 0, rotationY: 0 });
      }
    }, 0.1);

    tl.add(() => {
      updateEditorialContent(nextProd);
    }, 0.25);

    tl.to([productDesc, heroTagline, currentPrice], {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: 'power2.out'
    }, 0.35);

    tl.fromTo(jacketShadow, 
      { scale: 0.6, opacity: 0.3 }, 
      { scale: 1, opacity: 0.8, duration: 0.5, ease: 'power2.out' }, 
      0.3
    );
  }

  // ANIMATION: DIRECTIONAL SLIDE
  function animateDirectionalSlide(nextProd, direction) {
    const exitX = direction === 1 ? -180 : 180;
    const enterX = direction === 1 ? 180 : -180;
    const exitRot = direction === 1 ? -12 : 12;
    const enterRot = direction === 1 ? 12 : -12;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating = false;
      }
    });

    tl.to(mainJacketImg, {
      x: exitX,
      y: -15,
      rotationY: exitRot,
      scale: 0.88,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        mainJacketImg.src = nextProd.image;
        gsap.set(mainJacketImg, {
          x: enterX,
          y: 15,
          rotationY: enterRot,
          scale: 0.88,
          opacity: 0
        });
      }
    });

    tl.to([productDesc, heroTagline, currentPrice], { opacity: 0.3, y: -6, duration: 0.2 }, 0);

    tl.add(() => {
      updateEditorialContent(nextProd);
    }, 0.25);

    tl.to(mainJacketImg, {
      x: 0,
      y: 0,
      rotationY: 0,
      scale: 1,
      opacity: 1,
      duration: 0.55,
      ease: 'power3.out'
    });

    tl.to([productDesc, heroTagline, currentPrice], { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, '-=0.4');
  }

  // HELPER: UPDATE EDITORIAL CONTENT
  function updateEditorialContent(prod) {
    currentSlideNum.textContent = `0${currentIndex + 1}`;
    collectionTag.textContent = prod.tag || 'WINTER 2026 EDITION';
    if (heroHeadlineMain) heroHeadlineMain.textContent = prod.headline || 'Stand out';
    if (heroHeadlineSub) heroHeadlineSub.textContent = prod.headlineLight || 'Without trying';
    productDesc.textContent = prod.description;
    techTagText.textContent = prod.tech || 'Aerogel 850+ Fill';
    heroTagline.innerHTML = `<span class="quote-line"></span><p>${prod.tagline || 'Confidence, wrapped in warmth'}</p><span class="quote-line"></span>`;
    jacketColorName.textContent = prod.colorName;
    discountBadge.textContent = prod.discount || 'Save 25%';
    currentPrice.textContent = formatPKR(prod.price);
    originalPrice.textContent = formatPKR(prod.originalPrice);

    // Update Condition & Stock
    if (heroConditionBadge) {
      heroConditionBadge.textContent = prod.condition || 'Brand New';
      heroConditionBadge.className = `condition-badge ${(prod.condition || '').includes('Used') ? 'used' : ''}`;
    }

    if (heroStockBadge) {
      const avail = prod.stockAvailable || 15;
      const sold = prod.itemsSold || 0;
      heroStockBadge.textContent = `${avail} Available • ${sold} Sold`;
    }

    // Update active swatch
    const dots = colorSwatchesContainer.querySelectorAll('.color-dot-btn');
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));

    // Update bottom-right mini preview card
    const upcomingIndex = (currentIndex + 1) % products.length;
    const upcomingProd = products[upcomingIndex];
    previewThumbImg.src = upcomingProd.image;
    previewColorTitle.textContent = upcomingProd.colorName;
    if (previewPriceTitle) {
      previewPriceTitle.textContent = formatPKR(upcomingProd.price);
    }

    // Immediately update main hero jacket image to match current product
    if (mainJacketImg && prod && prod.image) {
      mainJacketImg.src = prod.image;
    }
  }

  // 8. NAVIGATION ARROWS
  nextBtn.addEventListener('click', () => {
    const nextIdx = (currentIndex + 1) % products.length;
    switchProduct(nextIdx, 1, false);
  });

  prevBtn.addEventListener('click', () => {
    const prevIdx = (currentIndex - 1 + products.length) % products.length;
    switchProduct(prevIdx, -1, false);
  });

  nextPreviewCard.addEventListener('click', () => {
    const nextIdx = (currentIndex + 1) % products.length;
    switchProduct(nextIdx, 1, false);
  });

  // 9. 3D DRAG-TO-ROTATE
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentRotY = 0;
  let currentRotX = 0;
  let targetRotY = 0;
  let targetRotX = 0;
  let resetTimeout = null;

  jacketContainer.addEventListener('mousedown', (e) => {
    if (isAnimating) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    jacketContainer.classList.add('is-dragging');
    clearTimeout(resetTimeout);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    targetRotY = currentRotY + deltaX * 0.45;
    targetRotX = Math.max(-25, Math.min(25, currentRotX - deltaY * 0.35));

    gsap.to(mainJacketImg, {
      rotationY: targetRotY,
      rotationX: targetRotX,
      duration: 0.2,
      ease: 'power1.out',
      transformPerspective: 1000
    });

    gsap.to(jacketShadow, {
      x: deltaX * 0.15,
      duration: 0.2,
      ease: 'power1.out'
    });
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    currentRotY = targetRotY;
    currentRotX = targetRotX;
    jacketContainer.classList.remove('is-dragging');

    clearTimeout(resetTimeout);
    resetTimeout = setTimeout(() => {
      gsap.to(mainJacketImg, {
        rotationY: 0,
        rotationX: 0,
        x: 0,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        onComplete: () => {
          currentRotY = 0;
          currentRotX = 0;
        }
      });
      gsap.to(jacketShadow, {
        x: 0,
        duration: 0.9,
        ease: 'power2.out'
      });
    }, 2200);
  });

  // 10. SIZE SELECTION
  sizePills.forEach(pill => {
    pill.addEventListener('click', () => {
      if (pill.classList.contains('disabled')) return;
      sizePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedSize = pill.getAttribute('data-size');
      gsap.fromTo(pill, { scale: 0.85 }, { scale: 1.05, duration: 0.25, ease: 'back.out(2)' });
    });
  });

  // 11. FLYING ADD TO CART ANIMATION
  addToCartBtn.addEventListener('click', () => {
    const currentProd = products[currentIndex] || products[0];
    
    cartItemImage.src = currentProd.image;
    cartItemTitle.textContent = currentProd.name;
    cartItemPrice.textContent = formatPKR(currentProd.price);
    cartItemColor.textContent = currentProd.colorName;
    cartItemSize.textContent = selectedSize;
    cartQuantity = 1;
    qtyValue.textContent = cartQuantity;
    updateCartCalculations();

    // Reset checkout so multiple orders can be placed effortlessly without lockup
    resetCheckoutStateForNewOrder();

    cartCheckoutView.style.display = 'flex';
    cartItemCard.style.display = 'flex';
    checkoutForm.style.display = 'flex';
    cartEmptyState.style.display = 'none';
    orderStatusView.style.display = 'none';
    document.getElementById('cartHeaderSubtitle').textContent = 'Complete checkout below';

    animateFlyToCart(() => {
      cartOverlay.classList.add('active');
    });
  });

  function animateFlyToCart(callback) {
    const btnRect = addToCartBtn.getBoundingClientRect();
    const cartRect = openCartDrawer.getBoundingClientRect();

    const ghost = document.createElement('div');
    ghost.className = 'ghost-flyer';
    ghost.style.left = `${btnRect.left}px`;
    ghost.style.top = `${btnRect.top}px`;
    ghost.style.width = `${btnRect.width}px`;
    ghost.style.height = `${btnRect.height}px`;
    ghost.innerHTML = `<span style="font-size: 0.88rem; font-weight:800; display:flex; align-items:center; gap:6px;">
      <i data-lucide="shopping-bag" style="width:16px;height:16px;"></i> ${products[currentIndex].name}
    </span>`;
    document.body.appendChild(ghost);
    if (window.lucide) lucide.createIcons();

    const targetX = cartRect.left + cartRect.width / 2 - (btnRect.left + btnRect.width / 2);
    const targetY = cartRect.top + cartRect.height / 2 - (btnRect.top + btnRect.height / 2);

    const tl = gsap.timeline({
      onComplete: () => {
        ghost.remove();
        cartBadge.textContent = '1';
        gsap.fromTo(cartBadge, 
          { scale: 1.8, rotate: -15 }, 
          { scale: 1, rotate: 0, duration: 0.45, ease: 'back.out(2.5)' }
        );
        gsap.fromTo(openCartDrawer, 
          { scale: 1.25 }, 
          { scale: 1, duration: 0.35, ease: 'elastic.out(1, 0.4)' }
        );
        if (callback) callback();
      }
    });

    tl.to(ghost, {
      x: targetX,
      y: targetY,
      width: 44,
      height: 44,
      borderRadius: '50%',
      scale: 0.4,
      opacity: 0.9,
      duration: 0.65,
      ease: 'power2.inOut'
    });
  }

  // 12. CART QUANTITY & CALCULATIONS
  function updateCartCalculations() {
    const p = products[currentIndex];
    const total = p.price * cartQuantity;
    if (summaryTotal) summaryTotal.textContent = formatPKR(total);
    if (cartItemPrice) cartItemPrice.textContent = formatPKR(p.price);
  }

  qtyPlus.addEventListener('click', () => {
    cartQuantity++;
    qtyValue.textContent = cartQuantity;
    updateCartCalculations();
  });

  qtyMinus.addEventListener('click', () => {
    if (cartQuantity > 1) {
      cartQuantity--;
      qtyValue.textContent = cartQuantity;
      updateCartCalculations();
    }
  });

  // REMOVE PRODUCT FROM CART
  if (removeCartItemBtn) {
    removeCartItemBtn.addEventListener('click', () => {
      gsap.to(cartItemCard, {
        opacity: 0,
        scale: 0.9,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          cartItemCard.style.display = 'none';
          cartItemCard.style.opacity = '1';
          cartItemCard.style.transform = 'none';
          checkoutForm.style.display = 'none';
          cartEmptyState.style.display = 'flex';
          cartBadge.textContent = '0';
          cartQuantity = 0;
          document.getElementById('cartHeaderSubtitle').textContent = 'Your bag is empty';
          if (window.lucide) lucide.createIcons();
        }
      });
    });
  }

  if (emptyExploreBtn) {
    emptyExploreBtn.addEventListener('click', () => {
      cartOverlay.classList.remove('active');
    });
  }

  openCartDrawer.addEventListener('click', () => {
    prefillCustomerDetails();
    cartOverlay.classList.add('active');
  });

  closeCartBtn.addEventListener('click', () => {
    cartOverlay.classList.remove('active');
  });

  cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) {
      cartOverlay.classList.remove('active');
    }
  });

  // 13. CHECKOUT FORM ORDER PLACEMENT & MULTI-ORDER LIFECYCLE
  function prefillCustomerDetails() {
    try {
      const raw = localStorage.getItem('swift_last_customer_info');
      if (raw) {
        const info = JSON.parse(raw);
        const nameInput = document.getElementById('custName');
        const emailInput = document.getElementById('custEmail');
        const phoneInput = document.getElementById('custPhone');
        const cityInput = document.getElementById('custCity');
        const houseInput = document.getElementById('custHouse');
        const streetInput = document.getElementById('custStreet');
        if (nameInput && !nameInput.value && info.name) nameInput.value = info.name;
        if (emailInput && !emailInput.value && info.email) emailInput.value = info.email;
        if (phoneInput && !phoneInput.value && info.phone) phoneInput.value = info.phone;
        if (cityInput && !cityInput.value && info.city) cityInput.value = info.city;
        if (houseInput && !houseInput.value && info.house) houseInput.value = info.house;
        if (streetInput && !streetInput.value && info.street) streetInput.value = info.street;
      }
    } catch(e) {}
  }

  function resetCheckoutStateForNewOrder() {
    if (inlineOrderStatusCard) {
      inlineOrderStatusCard.style.display = 'none';
    }
    if (placeOrderBtn) {
      placeOrderBtn.innerHTML = `<span>Place Order Now</span><i data-lucide="check-circle" class="icon-sm"></i>`;
      placeOrderBtn.style.background = '';
      placeOrderBtn.style.boxShadow = '';
      placeOrderBtn.disabled = false;
    }
    prefillCustomerDetails();
    if (cartDrawer) {
      cartDrawer.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (window.lucide) lucide.createIcons();
  }

  function handlePlaceOrder(e) {
    if (e) e.preventDefault();

    const nameInput = document.getElementById('custName');
    const emailInput = document.getElementById('custEmail');
    const phoneInput = document.getElementById('custPhone');
    const cityInput = document.getElementById('custCity');
    const houseInput = document.getElementById('custHouse');
    const streetInput = document.getElementById('custStreet');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const city = cityInput ? cityInput.value.trim() : '';
    const house = houseInput ? houseInput.value.trim() : '';
    const street = streetInput ? streetInput.value.trim() : '';

    if (!name || !email || !phone || !city || !street) {
      showSwiftAlert({
        title: 'Missing Required Details',
        message: 'Please fill out your Full Name, Email, Phone, City, and Street Address to complete your order.',
        type: 'warning',
        confirmText: 'Got It'
      });

      const requiredFields = [
        { el: nameInput, val: name },
        { el: emailInput, val: email },
        { el: phoneInput, val: phone },
        { el: cityInput, val: city },
        { el: streetInput, val: street }
      ];
      requiredFields.forEach(f => {
        if (!f.val && f.el) {
          f.el.style.borderColor = '#ef4444';
          f.el.style.boxShadow = '0 0 12px rgba(239, 68, 68, 0.45)';
          setTimeout(() => {
            f.el.style.borderColor = '';
            f.el.style.boxShadow = '';
          }, 3500);
        }
      });
      return;
    }

    // Save customer info in localStorage so future orders pre-fill seamlessly
    try {
      localStorage.setItem('swift_last_customer_info', JSON.stringify({ name, email, phone, city, house, street }));
    } catch(e) {}

    const currentProd = products[currentIndex] || products[0];
    const orderNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `#SJ-${orderNum}`;
    const fullAddress = `${house ? house + ', ' : ''}${street}, ${city}`;
    const totalPrice = (currentProd.price || 14999) * cartQuantity;

    const newOrder = {
      orderId: orderId,
      date: new Date().toISOString(),
      customer: { name, email, phone, city, house, street, fullAddress },
      item: {
        productId: currentProd.id,
        name: currentProd.name,
        color: currentProd.colorName,
        size: selectedSize,
        price: currentProd.price,
        quantity: cartQuantity,
        image: currentProd.image
      },
      total: totalPrice,
      status: 'Pending' // Orders begin as Pending in Admin Panel
    };

    // Save order in localStorage with backup for Admin Panel
    ordersList.unshift(newOrder);
    try {
      localStorage.setItem('swift_jackets_orders', JSON.stringify(ordersList));
      localStorage.setItem('swift_jackets_orders_backup', JSON.stringify(ordersList));
    } catch (err) {}

    // Register / Update customer in Customers Registry
    let customersList = JSON.parse(localStorage.getItem('swift_jackets_customers') || '[]');
    let existingCust = customersList.find(c => c.email && c.email.toLowerCase() === email.toLowerCase());
    if (existingCust) {
      existingCust.ordersCount = (existingCust.ordersCount || 1) + 1;
      existingCust.phone = phone;
      existingCust.city = city;
    } else {
      customersList.unshift({
        id: `cust-${Date.now()}`,
        name: name,
        email: email,
        phone: phone,
        city: city,
        registeredAt: new Date().toISOString(),
        ordersCount: 1
      });
    }
    try {
      localStorage.setItem('swift_jackets_customers', JSON.stringify(customersList));
    } catch (err) {}

    // Immediately push new order to Cloud Sync so Admin on mobile or PC receives it in real time!
    try {
      fetch(GLOBAL_CLOUD_SYNC_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Title': 'NewOrder' },
        body: JSON.stringify({
          updatedAt: Date.now(),
          type: 'ORDER_PLACED',
          order: newOrder,
          orders: ordersList,
          customers: customersList
        })
      }).catch(() => {});
    } catch (e) {}

    // Render LIVE INLINE STATUS CARD IN THE BLANK AREA BELOW BUTTON
    if (inlineOrderStatusCard) {
      if (inlineOrderId) inlineOrderId.textContent = orderId;
      if (inlineOrderStatus) inlineOrderStatus.textContent = 'Pending (Received in Admin)';
      if (inlineRecipientName) inlineRecipientName.textContent = name;
      if (inlineContact) inlineContact.textContent = `${phone} | ${email}`;
      if (inlineAddress) inlineAddress.textContent = fullAddress;
      if (inlineTotal) inlineTotal.textContent = formatPKR(totalPrice);

      // WhatsApp direct track link
      if (inlineWhatsAppBtn) {
        const brand = JSON.parse(localStorage.getItem('swift_brand_settings') || '{}');
        const rawPhone = brand.supportPhone || '03079436896';
        let cleanPhone = rawPhone.replace(/\D/g, '');
        if (cleanPhone.startsWith('03')) cleanPhone = '92' + cleanPhone.substring(1);
        const waMsg = encodeURIComponent(`Hello ALIZOX, I placed Order ${orderId} on Swift Jackets!\nItem: ${currentProd.name} (Size: ${selectedSize}, Color: ${currentProd.colorName})\nTotal: ${formatPKR(totalPrice)}\nCustomer: ${name} (${phone})\nPlease confirm and share tracking details.`);
        inlineWhatsAppBtn.href = `https://wa.me/${cleanPhone}?text=${waMsg}`;
      }

      inlineOrderStatusCard.style.display = 'flex';
      if (window.lucide) lucide.createIcons();
    }

    // Update button to success state
    if (placeOrderBtn) {
      placeOrderBtn.innerHTML = `<span>✓ Order Placed Successfully</span><i data-lucide="check-circle" class="icon-sm"></i>`;
      placeOrderBtn.style.background = '#10b981';
      placeOrderBtn.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.5)';
      placeOrderBtn.disabled = true;
      if (window.lucide) lucide.createIcons();
    }

    // Also update View 2 for fallback
    if (placedOrderId) placedOrderId.textContent = orderId;
    if (placedOrderStatus) placedOrderStatus.textContent = 'Pending';
    if (placedOrderRecipient) placedOrderRecipient.textContent = name;
    if (placedOrderAddress) placedOrderAddress.textContent = fullAddress;
    if (placedOrderContact) placedOrderContact.textContent = `Phone: ${phone} | ${email}`;
    if (placedOrderImg) placedOrderImg.src = currentProd.image;
    if (placedOrderTitle) placedOrderTitle.textContent = currentProd.name;
    if (placedOrderDetails) placedOrderDetails.textContent = `Color: ${currentProd.colorName} | Size: ${selectedSize} | Qty: ${cartQuantity}`;
    if (placedOrderPrice) placedOrderPrice.textContent = formatPKR(totalPrice);

    // Smoothly scroll drawer down to make status card immediately visible in the blank area
    if (cartDrawer) {
      setTimeout(() => {
        cartDrawer.scrollTo({
          top: cartDrawer.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }

    // Cross-tab sync to Admin Console
    window.dispatchEvent(new Event('storage'));
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const ch = new BroadcastChannel('swift_jackets_sync');
        ch.postMessage({ type: 'NEW_ORDER', orderId, timestamp: Date.now() });
      } catch (err) {}
    }
  }

  // Bind both form submit AND button direct click for mobile touch compatibility
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handlePlaceOrder);
  }
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', (e) => {
      handlePlaceOrder(e);
    });
  }

  // Handle inline "Place Another Order" button
  if (inlineOrderAgainBtn) {
    inlineOrderAgainBtn.addEventListener('click', () => {
      resetCheckoutStateForNewOrder();
    });
  }

  if (orderAnotherBtn) {
    orderAnotherBtn.addEventListener('click', () => {
      resetCheckoutStateForNewOrder();
      cartCheckoutView.style.display = 'flex';
      cartCheckoutView.style.opacity = '1';
      orderStatusView.style.display = 'none';
      document.getElementById('cartHeaderSubtitle').textContent = 'Complete checkout below';
      cartOverlay.classList.remove('active');
    });
  }

  // 14. ALL PRODUCTS MODAL / CATALOG
  function renderAllProductsCatalog() {
    productsCatalogGrid.innerHTML = '';
    products.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = 'catalog-card';
      card.innerHTML = `
        <div class="catalog-card-img-wrap">
          <img src="${p.image}" alt="${p.name}" class="catalog-card-img">
        </div>
        <div class="catalog-card-meta">
          <span class="catalog-card-color" style="color: ${p.hex};">${p.colorName}</span>
          <h3 class="catalog-card-name">${p.name}</h3>
          <div class="catalog-card-price-row">
            <span class="catalog-card-price">${formatPKR(p.price)}</span>
            <span class="catalog-card-orig">${formatPKR(p.originalPrice)}</span>
          </div>
        </div>
        <div class="catalog-card-actions">
          <button class="catalog-view-btn select-hero-btn" data-index="${idx}">
            <i data-lucide="eye" style="width:14px;height:14px;"></i> View in 3D Hero
          </button>
        </div>
      `;

      card.querySelector('.select-hero-btn').addEventListener('click', () => {
        allProductsModal.classList.remove('active');
        switchProduct(idx, idx > currentIndex ? 1 : -1, true);
      });

      productsCatalogGrid.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();
  }

  navAllProducts.addEventListener('click', (e) => {
    e.preventDefault();
    renderAllProductsCatalog();
    allProductsModal.classList.add('active');
  });

  closeAllProductsModal.addEventListener('click', () => {
    allProductsModal.classList.remove('active');
  });

  allProductsModal.addEventListener('click', (e) => {
    if (e.target === allProductsModal) {
      allProductsModal.classList.remove('active');
    }
  });

  // 15. SIGN IN / AUTH MODAL
  openAuthModal.addEventListener('click', () => {
    updateAuthModalState();
    authModal.classList.add('active');
  });

  closeAuthModal.addEventListener('click', () => {
    authModal.classList.remove('active');
  });

  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
      authModal.classList.remove('active');
    }
  });

  function updateAuthModalState() {
    if (currentUser) {
      authFormSection.style.display = 'none';
      authProfileSection.style.display = 'block';
      profileGreeting.textContent = `Hello, ${currentUser.name}!`;
      profileEmail.textContent = currentUser.email;
      userOrdersCount.textContent = ordersList.length;
      authButtonText.textContent = currentUser.name.split(' ')[0];
    } else {
      authFormSection.style.display = 'block';
      authProfileSection.style.display = 'none';
      authButtonText.textContent = 'Sign In';
    }
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    currentUser = {
      name: email.split('@')[0].toUpperCase(),
      email: email,
      signedInAt: new Date().toISOString()
    };
    localStorage.setItem('swift_jackets_user', JSON.stringify(currentUser));

    // Also register into Customers table for Admin Panel
    let customersList = JSON.parse(localStorage.getItem('swift_jackets_customers') || '[]');
    if (!customersList.find(c => c.email.toLowerCase() === email.toLowerCase())) {
      customersList.unshift({
        id: `cust-${Date.now()}`,
        name: currentUser.name,
        email: email,
        phone: 'Unspecified',
        city: 'Online Member',
        registeredAt: new Date().toISOString(),
        ordersCount: 0
      });
      localStorage.setItem('swift_jackets_customers', JSON.stringify(customersList));
      window.dispatchEvent(new Event('storage'));
      if (typeof BroadcastChannel !== 'undefined') {
        try {
          const ch = new BroadcastChannel('swift_jackets_sync');
          ch.postMessage({ type: 'NEW_CUSTOMER', timestamp: Date.now() });
        } catch (err) {}
      }
    }

    updateAuthModalState();
    setTimeout(() => {
      authModal.classList.remove('active');
    }, 400);
  });

  signOutBtn.addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem('swift_jackets_user');
    updateAuthModalState();
  });

  // 16. ABOUT US MODAL
  navAboutUs.addEventListener('click', (e) => {
    e.preventDefault();
    aboutModal.classList.add('active');
  });

  closeAboutModal.addEventListener('click', () => {
    aboutModal.classList.remove('active');
  });

  aboutCloseCta.addEventListener('click', () => {
    aboutModal.classList.remove('active');
  });

  aboutModal.addEventListener('click', (e) => {
    if (e.target === aboutModal) {
      aboutModal.classList.remove('active');
    }
  });

  navContact.addEventListener('click', (e) => {
    e.preventDefault();
    cartOverlay.classList.add('active');
  });

  document.getElementById('getTheLookBtn').addEventListener('click', () => {
    addToCartBtn.click();
  });

  // 17. REAL-TIME STORAGE & BROADCAST SYNC (Instant updates from Admin Panel)
  function applyBrandSettings() {
    try {
      const raw = localStorage.getItem('swift_brand_settings');
      if (!raw) return;
      const b = JSON.parse(raw);
      
      // Update brand name
      const brandNameEls = document.querySelectorAll('.brand-name');
      brandNameEls.forEach(el => {
        el.innerHTML = `${b.brandName || 'SWIFT'} <span>${b.brandSuffix || 'JACKETS'}</span>`;
      });

      // Update brand logo icon
      const brandIconEls = document.querySelectorAll('.brand-icon');
      brandIconEls.forEach(el => {
        if (b.logoCustomUrl) {
          el.innerHTML = `<img src="${b.logoCustomUrl}" alt="Logo" style="width:22px;height:22px;object-fit:contain;">`;
        } else if (b.logoChoice === 'diamond') {
          el.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M6 3h12l4 6-10 13L2 9z"></path></svg>`;
        } else if (b.logoChoice === 'crown') {
          el.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path></svg>`;
        } else if (b.logoChoice === 'flame') {
          el.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`;
        } else {
          el.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`;
        }
      });

      // Update customer support link
      const custSupportLink = document.getElementById('customerSupportLink');
      if (custSupportLink) {
        const rawPhone = b.supportPhone || '03079436896';
        let cleanPhone = rawPhone.replace(/\D/g, '');
        if (cleanPhone.startsWith('03')) cleanPhone = '92' + cleanPhone.substring(1);
        const msg = encodeURIComponent(`Hello ${b.supportAgent || 'ALIZOX'}, I need assistance regarding Swift Jackets.`);
        custSupportLink.href = `https://wa.me/${cleanPhone}?text=${msg}`;
      }
    } catch (e) {
      console.warn('Non-fatal brand settings error:', e);
    }
  }

  function reloadStoreFromStorage() {
    products = getLiveProducts();
    ordersList = JSON.parse(localStorage.getItem('swift_jackets_orders') || '[]');
    applyBrandSettings();
    initColorSwatches();
    if (currentIndex >= products.length) currentIndex = 0;
    const currentProd = products[currentIndex];
    applyProductTheme(currentProd);
    updateEditorialContent(currentProd);
    updateSizeAvailability(currentProd);

    // Update active cart order status in live view if present
    if (placedOrderId && placedOrderStatus) {
      const activeId = placedOrderId.textContent.trim();
      const match = ordersList.find(o => o.orderId === activeId);
      if (match) {
        placedOrderStatus.textContent = match.status;
      }
    }
  }

  window.addEventListener('storage', reloadStoreFromStorage);

  if (typeof BroadcastChannel !== 'undefined') {
    try {
      const liveSyncChannel = new BroadcastChannel('swift_jackets_sync');
      liveSyncChannel.onmessage = (event) => {
        reloadStoreFromStorage();
      };
    } catch (err) {}
  }

  // 17.5 CROSS-DEVICE CLOUD & URL SYNC ENGINE
  function checkUrlSyncParam() {
    try {
      const params = new URLSearchParams(window.location.search);
      const syncData = params.get('sync_data');
      if (syncData) {
        const jsonStr = decodeURIComponent(escape(atob(decodeURIComponent(syncData))));
        const parsed = JSON.parse(jsonStr);
        if (parsed && Array.isArray(parsed.p) && parsed.p.length > 0) {
          localStorage.setItem('swift_jackets_products', JSON.stringify(parsed.p));
          localStorage.setItem('swift_jackets_products_backup', JSON.stringify(parsed.p));
          localStorage.setItem('swift_has_user_changes', 'true');
          if (parsed.b) {
            localStorage.setItem('swift_brand_settings', JSON.stringify(parsed.b));
            localStorage.setItem('swift_brand_backup', JSON.stringify(parsed.b));
          }
          window.history.replaceState({}, document.title, window.location.pathname);
          showSwiftToast('Store Synced Successfully!', 'success');
          window.location.reload();
        }
      }
    } catch (e) {
      console.warn('URL sync error:', e);
    }
  }

  const GLOBAL_CLOUD_SYNC_URL = 'https://ntfy.sh/swiftjackets_cloud_v5_live_9281';

  async function checkCloudUpdates() {
    try {
      let cloudData = null;

      // 1. Fetch from Global Multi-Device Cloud Sync Channel (Works across all devices/networks)
      try {
        const res = await fetch(`${GLOBAL_CLOUD_SYNC_URL}/json?poll=1`, { cache: 'no-store' });
        if (res.ok) {
          const text = await res.text();
          const lines = text.trim().split('\n').filter(Boolean);
          let maxTime = 0;
          for (const line of lines) {
            try {
              const entry = JSON.parse(line);
              if (entry.event === 'message') {
                let parsed = null;
                if (entry.attachment && entry.attachment.url) {
                  try {
                    const aRes = await fetch(entry.attachment.url);
                    if (aRes.ok) parsed = await aRes.json();
                  } catch(e) {}
                }
                if (!parsed && entry.message) {
                  try {
                    parsed = JSON.parse(entry.message);
                  } catch(e) {}
                }
                if (parsed && Array.isArray(parsed.products) && parsed.products.length > 0) {
                  const t = parseInt(parsed.updatedAt || '0');
                  if (t >= maxTime) {
                    maxTime = t;
                    cloudData = parsed;
                  }
                }
              }
            } catch(e) {}
          }
        }
      } catch(e) {}

      // 2. Fallbacks: ONLY if local storage has never been initialized
      const hasStoredProducts = !!localStorage.getItem('swift_jackets_products');
      if (!cloudData && !hasStoredProducts) {
        const fallbacks = ['sync.php', '/api/sync', 'data/store_data.json'];
        for (const fb of fallbacks) {
          try {
            const res = await fetch(fb, { cache: 'no-store' });
            if (res && res.ok) {
              const json = await res.json();
              if (json && Array.isArray(json.products) && json.products.length > 0) {
                cloudData = json;
                break;
              }
            }
          } catch(e) {}
        }
      }

      if (cloudData && Array.isArray(cloudData.products) && cloudData.products.length > 0) {
        const localTime = parseInt(localStorage.getItem('swift_last_sync_time') || '0');
        const cloudTime = parseInt(cloudData.updatedAt || '0');
        const hasUserChanges = localStorage.getItem('swift_has_user_changes') === 'true';

        // Only update if cloud has genuine newer changes, or if local is completely empty
        if (cloudTime > localTime || (!hasUserChanges && !hasStoredProducts)) {
          localStorage.setItem('swift_jackets_products', JSON.stringify(cloudData.products));
          localStorage.setItem('swift_jackets_products_backup', JSON.stringify(cloudData.products));
          localStorage.setItem('swift_last_sync_time', cloudTime.toString());
          if (cloudData.brand) {
            localStorage.setItem('swift_brand_settings', JSON.stringify(cloudData.brand));
            localStorage.setItem('swift_brand_backup', JSON.stringify(cloudData.brand));
          }
          reloadStoreFromStorage();
        }
      }
    } catch (err) {
      console.warn('Cloud sync error:', err);
    }
  }

  // Live Real-Time Multi-Device Stream (Instant updates without page refresh)
  function initLiveCloudStream() {
    try {
      if (typeof EventSource !== 'undefined') {
        const es = new EventSource(`${GLOBAL_CLOUD_SYNC_URL}/sse`);
        es.onmessage = async (e) => {
          try {
            const data = JSON.parse(e.data);
            if (data && data.event === 'message') {
              let parsed = null;
              if (data.attachment && data.attachment.url) {
                try {
                  const aRes = await fetch(data.attachment.url);
                  if (aRes.ok) parsed = await aRes.json();
                } catch(err) {}
              }
              if (!parsed && data.message) {
                try {
                  parsed = JSON.parse(data.message);
                } catch(err) {}
              }
              if (parsed && Array.isArray(parsed.products) && parsed.products.length > 0) {
                const localTime = parseInt(localStorage.getItem('swift_last_sync_time') || '0');
                const cloudTime = parseInt(parsed.updatedAt || '0');
                if (cloudTime > localTime) {
                  localStorage.setItem('swift_jackets_products', JSON.stringify(parsed.products));
                  localStorage.setItem('swift_jackets_products_backup', JSON.stringify(parsed.products));
                  localStorage.setItem('swift_last_sync_time', cloudTime.toString());
                  if (parsed.brand) {
                    localStorage.setItem('swift_brand_settings', JSON.stringify(parsed.brand));
                    localStorage.setItem('swift_brand_backup', JSON.stringify(parsed.brand));
                  }
                  reloadStoreFromStorage();
                }
              }
            }
          } catch(err) {}
        };
      }
    } catch(e) {}
  }

  // 18. INITIALIZE APPLICATION
  checkUrlSyncParam();
  applyBrandSettings();
  initColorSwatches();
  applyProductTheme(products[0]);
  updateEditorialContent(products[0]);
  updateSizeAvailability(products[0]);
  if (mainJacketImg && products[0] && products[0].image) {
    mainJacketImg.src = products[0].image;
  }
  updateAuthModalState();
  checkCloudUpdates();
  initLiveCloudStream();
  if (window.lucide) {
    lucide.createIcons();
  }

});
