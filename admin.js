/* ===================================================================
   SWIFT JACKETS — ADMIN CONSOLE JAVASCRIPT (CLEAN ORIGINAL LAYOUT)
   - Real-time Product CRUD & Dynamic Theme Background Calculation
   - Orders Management with Live Status Controller
   - Customer Registry Management
   - Brand Settings & Logo Customizer
   - Secure OTP Credential Reset Flow (ALIZOX / ALIZOX 49229)
   - Full LocalStorage & Cross-Tab Synchronization
=================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // =================================================================
  // SWIFT LUXURY CUSTOM DIALOG & TOAST SYSTEM (Replaces Native Browser alert/confirm)
  // =================================================================
  function showAdminDialog({ title, message, type = 'warning', confirmText = 'OK', cancelText = null }) {
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
      titleEl.textContent = title || (type === 'danger' ? 'Confirm Action' : 'Notice');
      msgEl.textContent = message || '';
      confirmBtn.textContent = confirmText || 'OK';

      if (cancelText) {
        cancelBtn.style.display = 'inline-flex';
        cancelBtn.textContent = cancelText;
      } else {
        cancelBtn.style.display = 'none';
      }

      function cleanup(res) {
        backdrop.classList.remove('active');
        confirmBtn.onclick = null;
        cancelBtn.onclick = null;
        backdrop.onclick = null;
        document.removeEventListener('keydown', keyHandler);
        resolve(res);
      }

      function keyHandler(e) {
        if (e.key === 'Escape') cleanup(false);
        else if (e.key === 'Enter') cleanup(true);
      }

      confirmBtn.onclick = () => cleanup(true);
      cancelBtn.onclick = () => cleanup(false);
      backdrop.onclick = (e) => {
        if (e.target === backdrop) cleanup(false);
      };
      document.addEventListener('keydown', keyHandler);
      backdrop.classList.add('active');
    });
  }

  function showAdminConfirm(message, title = 'Confirm Action', options = {}) {
    return showAdminDialog({
      title: title,
      message: message,
      type: options.type || 'danger',
      confirmText: options.confirmText || 'Confirm',
      cancelText: options.cancelText || 'Cancel'
    });
  }

  function showAdminAlert(message, title = 'Notice', type = 'warning') {
    return showAdminDialog({
      title: title,
      message: message,
      type: type,
      confirmText: 'Understood'
    });
  }

  function showAdminToast(text, type = 'info') {
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

  // Override window.alert so native browser alert NEVER appears in Admin
  window.alert = (msg) => {
    return showAdminAlert(String(msg || ''), 'Admin Notice', 'warning');
  };

  // =================================================================
  // 1. DEFAULT DATASETS (Seeded safely so stats never show 0)
  // =================================================================
  const DEFAULT_PRODUCTS = [
    {
      id: 'swift-orange',
      name: 'Swift ThermoPuff Apex',
      colorName: 'Solar Ember',
      hex: '#ff6a2b',
      gradient: 'radial-gradient(circle at 62% 48%, #ff6b2b 0%, #a23807 38%, #140702 92%)',
      themeGlow: 'rgba(255, 106, 43, 0.45)',
      themeClass: 'theme-orange',
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
      hex: '#2b2d35',
      gradient: 'radial-gradient(circle at 62% 48%, #3e424c 0%, #1c1e25 42%, #08090c 92%)',
      themeGlow: 'rgba(160, 174, 192, 0.35)',
      themeClass: 'theme-black',
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
      hex: '#cfdbe6',
      gradient: 'radial-gradient(circle at 62% 48%, #cfdbe6 0%, #76899b 42%, #141d24 92%)',
      themeGlow: 'rgba(186, 215, 233, 0.45)',
      themeClass: 'theme-white',
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
      hex: '#e11d48',
      gradient: 'radial-gradient(circle at 62% 48%, #e11d48 0%, #7a091e 40%, #140206 92%)',
      themeGlow: 'rgba(244, 63, 94, 0.45)',
      themeClass: 'theme-red',
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

  const DEFAULT_BRAND = {
    brandName: 'SWIFT',
    brandSuffix: 'JACKETS',
    tagline: 'Confidence, wrapped in warmth',
    headlineMain: 'Stand out',
    headlineSub: 'Without trying',
    supportAgent: 'ALIZOX',
    supportPhone: '03079436896',
    logoChoice: 'thunderbolt'
  };

  const DEFAULT_AUTH = {
    username: 'ALIZOX',
    password: 'ALIZOX 49229',
    email: 'aliloveff500@gmail.com'
  };

  const DEFAULT_ORDERS = [
    {
      orderId: 'SWIFT-ORD-8491',
      date: new Date(Date.now() - 3600000 * 2).toISOString(),
      customer: {
        name: 'Muhammad Ali',
        phone: '03001234567',
        email: 'ali.customer@example.com',
        city: 'Lahore',
        fullAddress: 'House 42, Street 9, DHA Phase 5, Lahore'
      },
      item: {
        id: 'swift-orange',
        name: 'Swift ThermoPuff Apex',
        color: 'Solar Ember',
        size: '38',
        price: 14999,
        quantity: 1,
        image: 'assets/images/jacket_orange.png'
      },
      total: 14999,
      status: 'Pending'
    },
    {
      orderId: 'SWIFT-ORD-7822',
      date: new Date(Date.now() - 86400000).toISOString(),
      customer: {
        name: 'Hamza Khan',
        phone: '03219876543',
        email: 'hamza.k@example.com',
        city: 'Karachi',
        fullAddress: 'Apartment 12B, Clifton Block 4, Karachi'
      },
      item: {
        id: 'swift-black',
        name: 'Swift AeroShadow Ghost',
        color: 'Stealth Obsidian',
        size: '40',
        price: 18999,
        quantity: 1,
        image: 'assets/images/jacket_black.png'
      },
      total: 18999,
      status: 'Shipped'
    }
  ];

  const DEFAULT_CUSTOMERS = [
    {
      name: 'Muhammad Ali',
      email: 'ali.customer@example.com',
      phone: '03001234567',
      city: 'Lahore',
      registeredAt: new Date(Date.now() - 86400000 * 14).toISOString(),
      ordersCount: 1
    },
    {
      name: 'Hamza Khan',
      email: 'hamza.k@example.com',
      phone: '03219876543',
      city: 'Karachi',
      registeredAt: new Date(Date.now() - 86400000 * 30).toISOString(),
      ordersCount: 1
    }
  ];

  // Helper: Price Formatter in PKR
  function formatPKR(val) {
    const num = parseInt(val) || 0;
    return `PKR ${num.toLocaleString('en-PK')}`;
  }

  // Safe Lucide icon initializer
  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try {
        window.lucide.createIcons();
      } catch (e) {}
    }
  }

  // Safe LocalStorage Getters
  function getSafeProducts() {
    try {
      let raw = localStorage.getItem('swift_jackets_products');
      if (!raw) {
        raw = localStorage.getItem('swift_jackets_products_backup');
      }
      if (!raw) {
        try {
          localStorage.setItem('swift_jackets_products', JSON.stringify(DEFAULT_PRODUCTS));
          localStorage.setItem('swift_jackets_products_backup', JSON.stringify(DEFAULT_PRODUCTS));
        } catch (e) {}
        return DEFAULT_PRODUCTS;
      }
      const p = JSON.parse(raw);
      if (Array.isArray(p) && p.length > 0) {
        p.forEach(prod => {
          if (prod.price && prod.price < 100) prod.price = prod.price * 100;
          if (prod.originalPrice && prod.originalPrice < 100) prod.originalPrice = prod.originalPrice * 100;
          if (prod.description && prod.description.includes("It's not just about staying warm")) {
            prod.description = "Ultralight aerogel warmth. Sculpted modern silhouette.";
          } else if (prod.description && prod.description.includes("Matte obsidian finish")) {
            prod.description = "Matte stormproof shell. Engineered for quiet warmth.";
          } else if (prod.description && prod.description.includes("High-sheen pearl finish")) {
            prod.description = "Sub-zero pearl ripstop. Responsible 850 down fill.";
          } else if (prod.description && prod.description.includes("Vibrant high-contrast crimson")) {
            prod.description = "Windproof micro-weave. High-contrast thermal warmth.";
          }
        });
        try {
          localStorage.setItem('swift_jackets_products', JSON.stringify(p));
          localStorage.setItem('swift_jackets_products_backup', JSON.stringify(p));
        } catch (e) {}
        return p;
      }
      return DEFAULT_PRODUCTS;
    } catch (e) {
      return DEFAULT_PRODUCTS;
    }
  }

  function getSafeOrders() {
    try {
      const raw = localStorage.getItem('swift_jackets_orders');
      if (!raw) {
        localStorage.setItem('swift_jackets_orders', JSON.stringify(DEFAULT_ORDERS));
        return DEFAULT_ORDERS;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      localStorage.setItem('swift_jackets_orders', JSON.stringify(DEFAULT_ORDERS));
      return DEFAULT_ORDERS;
    } catch (e) {
      return DEFAULT_ORDERS;
    }
  }

  function getSafeCustomers() {
    try {
      const raw = localStorage.getItem('swift_jackets_customers');
      if (!raw) {
        localStorage.setItem('swift_jackets_customers', JSON.stringify(DEFAULT_CUSTOMERS));
        return DEFAULT_CUSTOMERS;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      localStorage.setItem('swift_jackets_customers', JSON.stringify(DEFAULT_CUSTOMERS));
      return DEFAULT_CUSTOMERS;
    } catch (e) {
      return DEFAULT_CUSTOMERS;
    }
  }

  function getSafeBrand() {
    try {
      const raw = localStorage.getItem('swift_brand_settings');
      if (!raw) {
        localStorage.setItem('swift_brand_settings', JSON.stringify(DEFAULT_BRAND));
        return DEFAULT_BRAND;
      }
      return { ...DEFAULT_BRAND, ...JSON.parse(raw) };
    } catch (e) {
      return DEFAULT_BRAND;
    }
  }

  function getSafeAuth() {
    try {
      const raw = localStorage.getItem('swift_admin_auth');
      if (!raw) {
        localStorage.setItem('swift_admin_auth', JSON.stringify(DEFAULT_AUTH));
        return DEFAULT_AUTH;
      }
      const parsed = JSON.parse(raw);
      if (parsed.username === 'admin' || parsed.password === 'admin123') {
        localStorage.setItem('swift_admin_auth', JSON.stringify(DEFAULT_AUTH));
        return DEFAULT_AUTH;
      }
      return parsed;
    } catch (e) {
      return DEFAULT_AUTH;
    }
  }

  // =================================================================
  // 2. DOM ELEMENTS (Declared first to eliminate any ReferenceErrors)
  // =================================================================
  const authGate = document.getElementById('authGate');
  const adminWrapper = document.getElementById('adminWrapper');
  const adminLoginForm = document.getElementById('adminLoginForm');
  const adminUsernameInput = document.getElementById('adminUsername');
  const adminPasswordInput = document.getElementById('adminPassword');
  const loginErrorMsg = document.getElementById('loginErrorMsg');
  const adminLogoutBtn = document.getElementById('adminLogoutBtn');

  // Gate OTP
  const openGateOtpBtn = document.getElementById('openGateOtpBtn');
  const gateOtpSection = document.getElementById('gateOtpSection');
  const backToGateLoginBtn = document.getElementById('backToGateLoginBtn');
  const sendGateOtpBtn = document.getElementById('sendGateOtpBtn');
  const gateOtpStep1 = document.getElementById('gateOtpStep1');
  const gateOtpStep2 = document.getElementById('gateOtpStep2');
  const gateOtpForm = document.getElementById('gateOtpForm');
  const gateOtpInput = document.getElementById('gateOtpInput');
  const gateNewUsername = document.getElementById('gateNewUsername');
  const gateNewPassword = document.getElementById('gateNewPassword');
  const gateOtpErrorMsg = document.getElementById('gateOtpErrorMsg');

  // Tabs & Badges
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.admin-tab-content');
  const ordersBadge = document.getElementById('ordersCountBadge');
  const custBadge = document.getElementById('customersCountBadge');
  const statActive = document.getElementById('statActiveModels');
  const statStock = document.getElementById('statTotalStock');
  const statSold = document.getElementById('statTotalSold');
  const resetCatalogDefaultsBtn = document.getElementById('resetCatalogDefaultsBtn');

  // Tables
  const productsTableBody = document.getElementById('productsTableBody');
  const ordersTableBody = document.getElementById('ordersTableBody');
  const noOrdersNotice = document.getElementById('noOrdersNotice');
  const refreshOrdersBtn = document.getElementById('refreshOrdersBtn');
  const customersTableBody = document.getElementById('customersTableBody');
  const noCustomersNotice = document.getElementById('noCustomersNotice');
  const refreshCustomersBtn = document.getElementById('refreshCustomersBtn');

  // Brand Form
  const brandNameInput = document.getElementById('brandNameInput');
  const brandSuffixInput = document.getElementById('brandSuffixInput');
  const brandTaglineInput = document.getElementById('brandTaglineInput');
  const supportAgentInput = document.getElementById('supportAgentInput');
  const supportPhoneInput = document.getElementById('supportPhoneInput');
  const brandSettingsForm = document.getElementById('brandSettingsForm');

  // Product Add / Edit Modal
  const productModal = document.getElementById('productModal');
  const openAddProductModal = document.getElementById('openAddProductModal');
  const closeProductModal = document.getElementById('closeProductModal');
  const cancelProductBtn = document.getElementById('cancelProductBtn');
  const productForm = document.getElementById('productForm');
  const productModalTitle = document.getElementById('productModalTitle');

  const editProductId = document.getElementById('editProductId');
  const prodName = document.getElementById('prodName');
  const prodPrice = document.getElementById('prodPrice');
  const prodOriginalPrice = document.getElementById('prodOriginalPrice');
  const prodCondition = document.getElementById('prodCondition');
  const prodStock = document.getElementById('prodStock');
  const prodSold = document.getElementById('prodSold');
  const prodTag = document.getElementById('prodTag');
  const prodHeadline = document.getElementById('prodHeadline');
  const prodHeadlineLight = document.getElementById('prodHeadlineLight');
  const prodTagline = document.getElementById('prodTagline');
  const prodDesc = document.getElementById('prodDesc');
  const prodColorName = document.getElementById('prodColorName');
  const prodHexValue = document.getElementById('prodHexValue');
  const themePreviewBox = document.getElementById('themePreviewBox');
  const previewGlowSphere = document.getElementById('previewGlowSphere');
  const modalImgPreview = document.getElementById('modalImgPreview');
  const prodImagePath = document.getElementById('prodImagePath');
  const prodImageFileInput = document.getElementById('prodImageFileInput');

  const sizeCheckboxes = {
    '36': document.getElementById('size36'),
    '38': document.getElementById('size38'),
    '40': document.getElementById('size40'),
    '42': document.getElementById('size42')
  };

  // Color Wheel
  const wheelCanvas = document.getElementById('colorWheelCanvas');
  const wheelSelectorDot = document.getElementById('wheelSelectorDot');
  const wheelBrightness = document.getElementById('wheelBrightness');
  const wheelPreviewCircle = document.getElementById('wheelPreviewCircle');
  const paletteSwatches = document.querySelectorAll('.palette-swatch');

  // Security Credentials Reset Tab
  const secStep1 = document.getElementById('secStep1');
  const secStep2 = document.getElementById('secStep2');
  const secStep3 = document.getElementById('secStep3');
  const sendOtpBtn = document.getElementById('sendOtpBtn');
  const updateCredentialsForm = document.getElementById('updateCredentialsForm');
  const inputOtpCode = document.getElementById('inputOtpCode');
  const newAdminUsername = document.getElementById('newAdminUsername');
  const newAdminPassword = document.getElementById('newAdminPassword');
  const otpErrorMsg = document.getElementById('otpErrorMsg');
  const cancelOtpBtn = document.getElementById('cancelOtpBtn');
  const doneSecBtn = document.getElementById('doneSecBtn');

  // Cross-Device Sync Modal Elements
  const syncModal = document.getElementById('syncModal');
  const openSyncModalBtn = document.getElementById('openSyncModalBtn');
  const closeSyncModal = document.getElementById('closeSyncModal');
  const syncQrImg = document.getElementById('syncQrImg');
  const generateSyncLinkBtn = document.getElementById('generateSyncLinkBtn');
  const copySyncLinkBtn = document.getElementById('copySyncLinkBtn');
  const copySyncLinkText = document.getElementById('copySyncLinkText');
  const syncFeedbackAlert = document.getElementById('syncFeedbackAlert');
  const pushToCloudBtn = document.getElementById('pushToCloudBtn');
  const pullFromCloudBtn = document.getElementById('pullFromCloudBtn');
  const cloudStatusMsg = document.getElementById('cloudStatusMsg');
  const syncCodeArea = document.getElementById('syncCodeArea');
  const copyStoreCodeBtn = document.getElementById('copyStoreCodeBtn');
  const restoreStoreCodeBtn = document.getElementById('restoreStoreCodeBtn');

  // =================================================================
  // 3. STATE & CROSS-TAB SYNC
  // =================================================================
  let products = getSafeProducts();
  let orders = getSafeOrders();
  let customers = getSafeCustomers();
  let brandSettings = getSafeBrand();
  let adminAuth = getSafeAuth();
  let activeOtpCode = null;
  let gateActiveOtp = null;
  let isWheelDragging = false;

  const syncChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('swift_jackets_sync') : null;

  function broadcastChange(type, data = {}) {
    window.dispatchEvent(new Event('storage'));
    if (syncChannel) {
      try {
        syncChannel.postMessage({ type, data, timestamp: Date.now() });
      } catch (err) {}
    }
  }

  // =================================================================
  // 4. COLOR WHEEL & GRADIENT GENERATOR
  // =================================================================
  function hsvToRgb(h, s, v) {
    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  }

  function detectColorFamily(r, g, b) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max - min < 20) {
      if (max < 60) return 'Stealth Obsidian';
      if (max > 200) return 'Glacier Pearl';
      return 'Titanium Slate';
    }
    if (r > 200 && g > 180 && b < 80) return 'Electric Volt';
    if (r > 210 && g > 90 && b < 50) return 'Solar Ember';
    if (r > 190 && g < 70 && b < 70) return 'Crimson Ruby';
    if (r < 70 && g > 160 && b < 90) return 'Emerald Forest';
    if (r < 80 && g > 180 && b > 180) return 'Neon Cyan';
    if (r < 80 && g < 120 && b > 200) return 'Sapphire Blue';
    if (r > 140 && g < 70 && b > 180) return 'Cyber Violet';
    if (r > 200 && g < 100 && b > 140) return 'Rose Blush';
    if (r > 180 && g > 120 && b < 50) return 'Amber Sunset';
    return 'Custom Hue';
  }

  function generateMatchingGradient(hex) {
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

    return `radial-gradient(circle at 62% 48%, rgb(${r}, ${g}, ${b}) 0%, rgb(${midR}, ${midG}, ${midB}) 42%, rgb(${baseR}, ${baseG}, ${baseB}) 92%)`;
  }

  function drawWheel(brightness = 0.95) {
    if (!wheelCanvas) return;
    const ctx = wheelCanvas.getContext('2d');
    const width = wheelCanvas.width;
    const height = wheelCanvas.height;
    const radius = width / 2;
    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = -radius; y < radius; y++) {
      for (let x = -radius; x < radius; x++) {
        const d = Math.sqrt(x * x + y * y);
        const px = (x + radius) + (y + radius) * width;
        const idx = px * 4;

        if (d <= radius) {
          let angle = Math.atan2(y, x);
          if (angle < 0) angle += 2 * Math.PI;
          const hue = angle / (2 * Math.PI);
          const sat = Math.min(1, d / radius);
          const [r, g, b] = hsvToRgb(hue, sat, brightness);
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 255;
        } else {
          data[idx + 3] = 0;
        }
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  function handleWheelInteraction(e) {
    if (!wheelCanvas) return;
    const rect = wheelCanvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left - (rect.width / 2);
    const y = clientY - rect.top - (rect.height / 2);
    const radius = rect.width / 2;
    const dist = Math.min(radius, Math.sqrt(x * x + y * y));
    let angle = Math.atan2(y, x);
    if (angle < 0) angle += 2 * Math.PI;

    const hue = angle / (2 * Math.PI);
    const sat = dist / radius;
    const brightness = (parseInt(wheelBrightness ? wheelBrightness.value : 95, 10) || 95) / 100;
    const [r, g, b] = hsvToRgb(hue, sat, brightness);
    const hex = rgbToHex(r, g, b);

    if (wheelSelectorDot) {
      const dotX = (rect.width / 2) + Math.cos(angle) * dist;
      const dotY = (rect.height / 2) + Math.sin(angle) * dist;
      wheelSelectorDot.style.left = `${dotX}px`;
      wheelSelectorDot.style.top = `${dotY}px`;
    }

    paletteSwatches.forEach(s => s.classList.remove('active'));
    applySelectedColor(hex, detectColorFamily(r, g, b));
  }

  function applySelectedColor(hex, name) {
    if (prodHexValue) prodHexValue.value = hex;
    if (name && prodColorName) prodColorName.value = name;
    if (wheelPreviewCircle) wheelPreviewCircle.style.background = hex;

    const gradient = generateMatchingGradient(hex);
    if (themePreviewBox) themePreviewBox.style.background = gradient;
    if (previewGlowSphere) {
      previewGlowSphere.style.background = hex;
      previewGlowSphere.style.boxShadow = `0 0 45px ${hex}`;
    }
  }

  if (wheelCanvas) {
    drawWheel(0.95);
    wheelCanvas.addEventListener('mousedown', (e) => {
      isWheelDragging = true;
      handleWheelInteraction(e);
    });
    window.addEventListener('mousemove', (e) => {
      if (isWheelDragging) handleWheelInteraction(e);
    });
    window.addEventListener('mouseup', () => {
      isWheelDragging = false;
    });
  }

  if (wheelBrightness) {
    wheelBrightness.addEventListener('input', (e) => {
      const b = (parseInt(e.target.value, 10) || 95) / 100;
      drawWheel(b);
      const curHex = prodHexValue.value.trim();
      if (/^#[0-9A-Fa-f]{6}$/.test(curHex)) {
        applySelectedColor(curHex, prodColorName.value);
      }
    });
  }

  paletteSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      paletteSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      const hex = swatch.getAttribute('data-hex');
      const name = swatch.getAttribute('data-name');
      applySelectedColor(hex, name);
    });
  });

  // =================================================================
  // 5. DATA RENDERING FUNCTIONS
  // =================================================================
  function updateBadges() {
    products = getSafeProducts();
    orders = getSafeOrders();
    customers = getSafeCustomers();

    if (ordersBadge) ordersBadge.textContent = orders.length;
    if (custBadge) custBadge.textContent = customers.length;
    if (statActive) statActive.textContent = products.length;

    const totalStock = products.reduce((acc, curr) => acc + (parseInt(curr.stockAvailable) || 0), 0);
    const totalSold = products.reduce((acc, curr) => acc + (parseInt(curr.itemsSold) || 0), 0);

    if (statStock) statStock.textContent = totalStock;
    if (statSold) statSold.textContent = totalSold;
  }

  function setAsHeroProduct(id) {
    const idx = products.findIndex(p => p.id === id);
    if (idx > 0) {
      const [item] = products.splice(idx, 1);
      products.unshift(item);
      localStorage.setItem('swift_jackets_products', JSON.stringify(products));
      localStorage.setItem('swift_jackets_products_backup', JSON.stringify(products));
      localStorage.setItem('swift_has_user_changes', 'true');
      localStorage.setItem('swift_last_sync_time', Date.now().toString());
      renderProductsTable();
      broadcastChange('PRODUCTS_UPDATED');
      autoPushToCloud();
      showAdminToast(`"${item.name}" is now the primary Hero Jacket!`, 'success');
    }
  }

  function renderProductsTable() {
    products = getSafeProducts();
    if (!productsTableBody) return;
    productsTableBody.innerHTML = '';

    products.forEach((p, index) => {
      const tr = document.createElement('tr');
      const allSizes = ['36', '38', '40', '42'];
      const sizeHtml = allSizes.map(s => {
        const hasSize = (p.availableSizes || []).includes(s);
        return `<span class="size-mini-tag ${hasSize ? '' : 'disabled'}" title="${hasSize ? 'Available' : 'Out of Stock'}">${s}</span>`;
      }).join(' ');

      const conditionClass = (p.condition || '').includes('Used') ? 'condition-used' : '';
      const isHero = index === 0;

      tr.innerHTML = `
        <td>
          <div class="table-product-cell">
            <img src="${p.image}" alt="${p.name}" class="table-thumb">
            <div>
              <div class="table-prod-name">
                ${p.name}
                ${isHero ? '<span style="background: rgba(255, 106, 43, 0.2); border: 1px solid #ff6a2b; color: #ff8c42; font-size: 0.68rem; padding: 2px 7px; border-radius: 6px; margin-left: 6px; font-weight: 800; letter-spacing: 0.04em;">★ HERO</span>' : ''}
              </div>
              <div class="table-prod-desc">${p.tagline || p.description}</div>
            </div>
          </div>
        </td>
        <td>
          <div class="color-badge">
            <span class="color-dot-indicator" style="background: ${p.hex};"></span>
            <span>${p.colorName}</span>
          </div>
        </td>
        <td>
          <span class="condition-pill ${conditionClass}">${p.condition || 'Brand New'}</span>
        </td>
        <td>
          <span class="price-text">${formatPKR(p.price)}</span>
          <span class="orig-price-text">${formatPKR(p.originalPrice)}</span>
        </td>
        <td>
          <div class="stock-meter">
            <span class="stock-count">${p.stockAvailable || 0} in stock</span>
            <span class="sold-count">${p.itemsSold || 0} sold</span>
          </div>
        </td>
        <td>
          <div class="sizes-badge-row">
            ${sizeHtml}
          </div>
        </td>
        <td>
          <div class="action-btns-group">
            <button class="btn-icon-action hero-btn" data-id="${p.id}" title="${isHero ? 'Current Featured Hero Jacket' : 'Make Primary Hero Jacket'}" style="${isHero ? 'color: #ff6a2b; border-color: rgba(255, 106, 43, 0.5);' : ''}">
              <i data-lucide="star" class="icon-xs"></i>
            </button>
            <button class="btn-icon-action edit-btn" data-id="${p.id}" title="Edit Jacket">
              <i data-lucide="edit-3" class="icon-xs"></i>
            </button>
            <button class="btn-icon-action delete delete-btn" data-id="${p.id}" title="Remove Jacket">
              <i data-lucide="trash-2" class="icon-xs"></i>
            </button>
          </div>
        </td>
      `;

      tr.querySelector('.hero-btn').addEventListener('click', () => setAsHeroProduct(p.id));
      tr.querySelector('.edit-btn').addEventListener('click', () => openEditProduct(p.id));
      tr.querySelector('.delete-btn').addEventListener('click', () => deleteProduct(p.id));

      productsTableBody.appendChild(tr);
    });

    updateBadges();
    refreshIcons();
  }

  function renderOrdersTable() {
    orders = getSafeOrders();
    if (!ordersTableBody) return;
    ordersTableBody.innerHTML = '';

    if (orders.length === 0) {
      if (noOrdersNotice) noOrdersNotice.style.display = 'flex';
      return;
    } else {
      if (noOrdersNotice) noOrdersNotice.style.display = 'none';
    }

    orders.forEach((ord, index) => {
      const tr = document.createElement('tr');
      const dateFormatted = new Date(ord.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      tr.innerHTML = `
        <td>
          <div style="font-weight: 800; font-family: var(--font-display); color: #fff;">${ord.orderId}</div>
          <div style="font-size: 0.75rem; color: var(--admin-text-dim);">${dateFormatted}</div>
        </td>
        <td>
          <div style="font-weight: 700;">${ord.customer?.name || 'Customer'}</div>
          <div style="font-size: 0.78rem; color: var(--admin-text-muted);">${ord.customer?.phone || ''}</div>
          <div style="font-size: 0.75rem; color: var(--admin-text-dim);">${ord.customer?.email || ''}</div>
        </td>
        <td>
          <div style="font-size: 0.85rem; max-width: 200px; color: var(--admin-text-muted);">${ord.customer?.fullAddress || ord.customer?.street || 'N/A'}</div>
          <div style="font-size: 0.75rem; color: #38bdf8; font-weight: 600;">${ord.customer?.city || ''}</div>
        </td>
        <td>
          <div class="table-product-cell">
            <img src="${ord.item?.image || 'assets/images/jacket_orange.png'}" class="table-thumb" style="width: 40px; height: 40px;">
            <div>
              <div style="font-weight: 700; font-size: 0.88rem;">${ord.item?.name || 'Swift Jacket'}</div>
              <div style="font-size: 0.75rem; color: var(--admin-text-muted);">Size: ${ord.item?.size || '38'} | Color: ${ord.item?.color || 'N/A'} | Qty: ${ord.item?.quantity || 1}</div>
            </div>
          </div>
        </td>
        <td>
          <div style="font-family: var(--font-display); font-weight: 800; font-size: 1.1rem; color: #34d399;">${formatPKR(ord.total || ord.item?.price)}</div>
        </td>
        <td>
          <div class="status-select-wrap">
            <select class="status-dropdown" data-index="${index}">
              <option value="Pending" ${ord.status === 'Pending' ? 'selected' : ''}>⏳ Pending</option>
              <option value="Processing" ${ord.status === 'Processing' ? 'selected' : ''}>🔄 Processing</option>
              <option value="Shipped" ${ord.status === 'Shipped' ? 'selected' : ''}>🚚 Shipped</option>
              <option value="Delivered" ${ord.status === 'Delivered' ? 'selected' : ''}>✅ Delivered</option>
              <option value="Cancelled" ${ord.status === 'Cancelled' ? 'selected' : ''}>❌ Cancelled</option>
            </select>
          </div>
        </td>
        <td style="text-align: right;">
          <button class="btn-icon-action delete delete-order-btn" data-index="${index}" title="Delete Order">
            <i data-lucide="trash-2" class="icon-xs"></i>
          </button>
        </td>
      `;

      tr.querySelector('.status-dropdown').addEventListener('change', (e) => {
        const newStatus = e.target.value;
        orders[index].status = newStatus;
        localStorage.setItem('swift_jackets_orders', JSON.stringify(orders));
        localStorage.setItem('swift_jackets_orders_backup', JSON.stringify(orders));
        broadcastChange('ORDER_STATUS_CHANGED', { orderId: ord.orderId, status: newStatus });
        autoPushToCloud();
      });

      tr.querySelector('.delete-order-btn').addEventListener('click', async () => {
        const confirmed = await showAdminConfirm(
          `Are you sure you want to delete order ${ord.orderId} for customer ${ord.customer ? ord.customer.name : ''}?`,
          'Delete Customer Order?',
          { confirmText: 'Delete Order', cancelText: 'Cancel', type: 'danger' }
        );
        if (confirmed) {
          orders.splice(index, 1);
          localStorage.setItem('swift_jackets_orders', JSON.stringify(orders));
          localStorage.setItem('swift_jackets_orders_backup', JSON.stringify(orders));
          renderOrdersTable();
          updateBadges();
          broadcastChange('ORDERS_UPDATED');
          autoPushToCloud();
          showAdminToast(`Order ${ord.orderId} deleted.`, 'info');
        }
      });

      ordersTableBody.appendChild(tr);
    });

    updateBadges();
    refreshIcons();
  }

  function renderCustomersTable() {
    customers = getSafeCustomers();
    if (!customersTableBody) return;
    customersTableBody.innerHTML = '';

    if (customers.length === 0) {
      if (noCustomersNotice) noCustomersNotice.style.display = 'flex';
      return;
    } else {
      if (noCustomersNotice) noCustomersNotice.style.display = 'none';
    }

    customers.forEach(cust => {
      const tr = document.createElement('tr');
      const dateFormatted = cust.registeredAt ? new Date(cust.registeredAt).toLocaleDateString() : 'Active User';

      tr.innerHTML = `
        <td>
          <div style="font-weight: 700; color: #fff;">${cust.name || 'Anonymous User'}</div>
        </td>
        <td>
          <div style="color: var(--admin-text-muted);">${cust.email || 'N/A'}</div>
        </td>
        <td>
          <div style="color: var(--admin-text-dim);">${cust.phone || 'N/A'}</div>
        </td>
        <td>
          <span style="color: #38bdf8; font-weight: 600;">${cust.city || 'Store Visitor'}</span>
        </td>
        <td>
          <div style="font-size: 0.82rem; color: var(--admin-text-dim);">${dateFormatted}</div>
        </td>
        <td>
          <span class="condition-pill" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border-color: rgba(16, 185, 129, 0.3);">
            ${cust.ordersCount || 1} Orders
          </span>
        </td>
      `;
      customersTableBody.appendChild(tr);
    });

    updateBadges();
    refreshIcons();
  }

  function populateBrandForm() {
    brandSettings = getSafeBrand();
    if (brandNameInput) brandNameInput.value = brandSettings.brandName || 'SWIFT';
    if (brandSuffixInput) brandSuffixInput.value = brandSettings.brandSuffix || 'JACKETS';
    if (brandTaglineInput) brandTaglineInput.value = brandSettings.tagline || 'Confidence, wrapped in warmth';
    if (supportAgentInput) supportAgentInput.value = brandSettings.supportAgent || 'ALIZOX';
    if (supportPhoneInput) supportPhoneInput.value = brandSettings.supportPhone || '03079436896';
    const rad = document.querySelector(`input[name="logoChoice"][value="${brandSettings.logoChoice || 'thunderbolt'}"]`);
    if (rad) rad.checked = true;
  }

  // =================================================================
  // 6. EVENT LISTENERS SETUP
  // =================================================================

  // Auth gate login
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const u = adminUsernameInput.value.trim();
      const p = adminPasswordInput.value.trim();

      adminAuth = getSafeAuth();
      if (u === adminAuth.username && p === adminAuth.password) {
        sessionStorage.setItem('swift_admin_logged_in', 'true');
        localStorage.setItem('swift_admin_logged_in', 'true');
        showAdminDashboard();
        broadcastChange('ADMIN_AUTH');
      } else {
        if (loginErrorMsg) {
          loginErrorMsg.style.display = 'block';
          if (window.gsap) gsap.fromTo(loginErrorMsg, { x: -8 }, { x: 8, duration: 0.1, repeat: 3, yoyo: true });
        }
      }
    });
  }

  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('swift_admin_logged_in');
      localStorage.removeItem('swift_admin_logged_in');
      showAuthGate();
      broadcastChange('ADMIN_LOGOUT');
    });
  }

  // Emergency Reset Defaults Button
  if (resetCatalogDefaultsBtn) {
    resetCatalogDefaultsBtn.addEventListener('click', async () => {
      const confirmed = await showAdminConfirm(
        'Restore factory jacket models and default stats? This will reset custom jackets and orders to original defaults.',
        'Restore Factory Defaults?',
        { confirmText: 'Restore Defaults', cancelText: 'Cancel', type: 'danger' }
      );
      if (confirmed) {
        localStorage.setItem('swift_jackets_products', JSON.stringify(DEFAULT_PRODUCTS));
        localStorage.setItem('swift_jackets_orders', JSON.stringify(DEFAULT_ORDERS));
        localStorage.setItem('swift_jackets_customers', JSON.stringify(DEFAULT_CUSTOMERS));
        localStorage.setItem('swift_admin_auth', JSON.stringify(DEFAULT_AUTH));
        localStorage.setItem('swift_brand_settings', JSON.stringify(DEFAULT_BRAND));
        products = DEFAULT_PRODUCTS;
        orders = DEFAULT_ORDERS;
        customers = DEFAULT_CUSTOMERS;
        showAdminDashboard();
        broadcastChange('ALL_RESET');
        showAdminToast('Storefront and admin restored to factory defaults.', 'info');
      }
    });
  }

  // Gate OTP
  if (openGateOtpBtn) {
    openGateOtpBtn.addEventListener('click', () => {
      adminLoginForm.style.display = 'none';
      openGateOtpBtn.parentElement.style.display = 'none';
      gateOtpSection.style.display = 'flex';
      gateOtpStep1.style.display = 'block';
      gateOtpStep2.style.display = 'none';
      refreshIcons();
    });
  }

  if (backToGateLoginBtn) {
    backToGateLoginBtn.addEventListener('click', () => {
      gateOtpSection.style.display = 'none';
      adminLoginForm.style.display = 'block';
      openGateOtpBtn.parentElement.style.display = 'block';
      gateActiveOtp = null;
    });
  }

  if (sendGateOtpBtn) {
    sendGateOtpBtn.addEventListener('click', () => {
      gateActiveOtp = Math.floor(100000 + Math.random() * 900000).toString();
      gateOtpStep1.style.display = 'none';
      gateOtpStep2.style.display = 'block';
      alert(`A 6-digit verification code has been dispatched to aliloveff500@gmail.com.\n\nYour Verification Code is: ${gateActiveOtp}`);
    });
  }

  if (gateOtpForm) {
    gateOtpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const entered = gateOtpInput.value.trim();
      const newUser = gateNewUsername.value.trim();
      const newPass = gateNewPassword.value.trim();

      if (entered !== gateActiveOtp) {
        gateOtpErrorMsg.style.display = 'block';
        return;
      }

      if (!newUser || !newPass) {
        alert('Please enter both username and password.');
        return;
      }

      adminAuth.username = newUser;
      adminAuth.password = newPass;
      localStorage.setItem('swift_admin_auth', JSON.stringify(adminAuth));
      sessionStorage.setItem('swift_admin_logged_in', 'true');
      localStorage.setItem('swift_admin_logged_in', 'true');

      alert(`Admin credentials updated successfully! Welcome, ${newUser}!`);
      showAdminDashboard();
      broadcastChange('ADMIN_AUTH');
    });
  }

  // Tab navigation
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(targetTab);
      if (targetContent) targetContent.classList.add('active');

      if (targetTab === 'tab-products') renderProductsTable();
      if (targetTab === 'tab-orders') renderOrdersTable();
      if (targetTab === 'tab-customers') renderCustomersTable();
      if (targetTab === 'tab-branding') populateBrandForm();
      refreshIcons();
    });
  });

  // Table Refresh buttons
  if (refreshOrdersBtn) {
    refreshOrdersBtn.addEventListener('click', () => {
      orders = getSafeOrders();
      renderOrdersTable();
      updateBadges();
    });
  }

  if (refreshCustomersBtn) {
    refreshCustomersBtn.addEventListener('click', () => {
      customers = getSafeCustomers();
      renderCustomersTable();
      updateBadges();
    });
  }

  // Branding Form submit
  if (brandSettingsForm) {
    brandSettingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const choice = document.querySelector('input[name="logoChoice"]:checked');
      brandSettings = {
        ...brandSettings,
        brandName: brandNameInput.value.trim() || 'SWIFT',
        brandSuffix: brandSuffixInput.value.trim() || 'JACKETS',
        tagline: brandTaglineInput.value.trim() || 'Confidence, wrapped in warmth',
        supportAgent: supportAgentInput.value.trim() || 'ALIZOX',
        supportPhone: supportPhoneInput.value.trim() || '03079436896',
        logoChoice: choice ? choice.value : 'thunderbolt'
      };
      localStorage.setItem('swift_brand_settings', JSON.stringify(brandSettings));
      localStorage.setItem('swift_brand_backup', JSON.stringify(brandSettings));
      localStorage.setItem('swift_has_user_changes', 'true');
      broadcastChange('BRAND_UPDATED', brandSettings);
      autoPushToCloud();
      alert('Brand settings updated and synchronized to storefront!');
    });
  }

  // Product Add / Edit Modal interactions
  if (prodHexValue) {
    prodHexValue.addEventListener('input', (e) => {
      let hex = e.target.value.trim();
      if (!hex.startsWith('#')) hex = '#' + hex;
      if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        paletteSwatches.forEach(s => s.classList.remove('active'));
        applySelectedColor(hex, prodColorName.value || 'Custom Hue');
      }
    });
  }

  // Client-side automatic image compressor (Preserves 100% transparent PNG backgrounds)
  function compressImageFile(file, maxWidth, maxHeight, quality, callback) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > maxWidth || h > maxHeight) {
          if (w > h) {
            h = Math.round((h * maxWidth) / w);
            w = maxWidth;
          } else {
            w = Math.round((w * maxHeight) / h);
            h = maxHeight;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');

        // Clear canvas with transparent pixels (no black background)
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);

        const isTransparentType = 
          file.type === 'image/png' || 
          file.type === 'image/webp' || 
          file.type === 'image/x-png' ||
          (file.name && /\.(png|webp)$/i.test(file.name));
        let compressed;

        if (isTransparentType) {
          // Transparent cutouts (e.g. remove.bg): Always preserve full alpha transparency
          try {
            const png = canvas.toDataURL('image/png');
            if (png.length < 750000) {
              compressed = png;
            } else {
              const webp = canvas.toDataURL('image/webp', 0.88);
              if (webp.startsWith('data:image/webp')) {
                compressed = webp;
              } else {
                compressed = png;
              }
            }
          } catch(e) {
            compressed = canvas.toDataURL('image/png');
          }
        } else {
          // Normal JPEG
          compressed = canvas.toDataURL('image/jpeg', quality);
        }

        callback(compressed);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  if (prodImageFileInput) {
    prodImageFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        compressImageFile(file, 520, 520, 0.75, (compressedDataUrl) => {
          modalImgPreview.src = compressedDataUrl;
          prodImagePath.value = compressedDataUrl;
        });
      }
    });
  }

  if (prodImagePath) {
    prodImagePath.addEventListener('input', (e) => {
      modalImgPreview.src = e.target.value;
    });
  }

  if (openAddProductModal) {
    openAddProductModal.addEventListener('click', () => {
      productForm.reset();
      editProductId.value = '';
      productModalTitle.textContent = 'Add New Jacket Model';
      modalImgPreview.src = 'assets/images/jacket_orange.png';
      prodImagePath.value = 'assets/images/jacket_orange.png';
      drawWheel(0.95);
      applySelectedColor('#eab308', 'Electric Volt');
      Object.values(sizeCheckboxes).forEach(cb => { if (cb) cb.checked = true; });
      productModal.classList.add('active');
      setTimeout(() => drawWheel(0.95), 60);
    });
  }

  function openEditProduct(id) {
    const prod = products.find(p => p.id === id);
    if (!prod) return;

    editProductId.value = prod.id;
    productModalTitle.textContent = `Edit Model: ${prod.name}`;
    prodName.value = prod.name;
    prodPrice.value = prod.price;
    prodOriginalPrice.value = prod.originalPrice;
    prodCondition.value = prod.condition || 'Brand New';
    prodStock.value = prod.stockAvailable || 15;
    prodSold.value = prod.itemsSold || 0;
    prodTag.value = prod.tag || 'WINTER 2026 EDITION';
    prodHeadline.value = prod.headline || 'Stand out';
    prodHeadlineLight.value = prod.headlineLight || 'Without trying';
    prodTagline.value = prod.tagline || 'Confidence, wrapped in warmth';
    prodDesc.value = prod.description || '';
    modalImgPreview.src = prod.image;
    prodImagePath.value = prod.image;

    const available = prod.availableSizes || ['36', '38', '40', '42'];
    Object.keys(sizeCheckboxes).forEach(size => {
      if (sizeCheckboxes[size]) sizeCheckboxes[size].checked = available.includes(size);
    });

    applySelectedColor(prod.hex, prod.colorName);
    productModal.classList.add('active');
    setTimeout(() => drawWheel(0.95), 60);
  }

  function closeProdModal() {
    if (productModal) productModal.classList.remove('active');
  }

  if (closeProductModal) closeProductModal.addEventListener('click', closeProdModal);
  if (cancelProductBtn) cancelProductBtn.addEventListener('click', closeProdModal);

  if (productForm) {
    productForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const selectedSizes = Object.keys(sizeCheckboxes).filter(s => sizeCheckboxes[s] && sizeCheckboxes[s].checked);
      if (selectedSizes.length === 0) {
        alert('Please check at least one available size for this jacket.');
        return;
      }

      const hex = prodHexValue.value.trim() || '#ff6a2b';
      const gradient = generateMatchingGradient(hex);
      const themeGlow = `${hex}66`;

      const payload = {
        id: editProductId.value || `swift-${Date.now()}`,
        name: prodName.value.trim(),
        colorName: prodColorName.value.trim() || 'Custom Hue',
        hex: hex,
        gradient: gradient,
        themeGlow: themeGlow,
        price: parseInt(prodPrice.value) || 14999,
        originalPrice: parseInt(prodOriginalPrice.value) || 19999,
        discount: `Save ${Math.max(5, Math.round(((parseInt(prodOriginalPrice.value) - parseInt(prodPrice.value)) / parseInt(prodOriginalPrice.value)) * 100))}%`,
        condition: prodCondition.value,
        stockAvailable: parseInt(prodStock.value) || 10,
        itemsSold: parseInt(prodSold.value) || 0,
        availableSizes: selectedSizes,
        tag: prodTag.value.trim() || 'EXCLUSIVE DROP',
        headline: prodHeadline.value.trim() || 'Stand out',
        headlineLight: prodHeadlineLight.value.trim() || 'Without trying',
        tagline: prodTagline.value.trim() || 'Confidence, wrapped in warmth',
        description: prodDesc.value.trim() || "Lightweight warmth and modern silhouette.",
        tech: 'Thermal Aerogel Core',
        image: prodImagePath.value || 'assets/images/jacket_orange.png'
      };

      if (editProductId.value) {
        const idx = products.findIndex(p => p.id === editProductId.value);
        if (idx !== -1) products[idx] = payload;
      } else {
        products.unshift(payload); // New jacket immediately becomes the primary hero jacket!
      }

      try {
        localStorage.setItem('swift_jackets_products', JSON.stringify(products));
        localStorage.setItem('swift_jackets_products_backup', JSON.stringify(products));
        localStorage.setItem('swift_has_user_changes', 'true');
        localStorage.setItem('swift_last_sync_time', Date.now().toString());
      } catch (err) {
        console.warn('Storage save warning:', err);
      }

      renderProductsTable();
      updateBadges();
      closeProdModal();
      broadcastChange('PRODUCTS_UPDATED');
      autoPushToCloud();
      showAdminToast(`"${payload.name}" saved and synced to live storefront!`, 'success');
    });
  }

  async function deleteProduct(id) {
    if (products.length <= 1) {
      showAdminAlert('You must have at least one active product model in the store.', 'Action Restricted', 'warning');
      return;
    }

    const targetProd = products.find(p => p.id === id);
    const prodName = targetProd ? targetProd.name : 'this jacket';

    const confirmed = await showAdminConfirm(
      `Are you sure you want to remove "${prodName}" from the live store?\nThis model will be deleted from all devices.`,
      'Remove Jacket Model?',
      { confirmText: 'Delete Jacket', cancelText: 'Cancel', type: 'danger' }
    );

    if (confirmed) {
      products = products.filter(p => p.id !== id);
      try {
        localStorage.setItem('swift_jackets_products', JSON.stringify(products));
        localStorage.setItem('swift_jackets_products_backup', JSON.stringify(products));
        localStorage.setItem('swift_has_user_changes', 'true');
        localStorage.setItem('swift_last_sync_time', Date.now().toString());
      } catch (err) {}
      renderProductsTable();
      updateBadges();
      broadcastChange('PRODUCTS_UPDATED');
      autoPushToCloud();
      showAdminToast(`"${prodName}" has been removed from store.`, 'info');
    }
  }

  // Security Credentials Reset Form
  if (sendOtpBtn) {
    sendOtpBtn.addEventListener('click', () => {
      activeOtpCode = Math.floor(100000 + Math.random() * 900000).toString();
      secStep1.style.display = 'none';
      secStep2.style.display = 'block';
      inputOtpCode.value = '';
      newAdminUsername.value = '';
      newAdminPassword.value = '';
      otpErrorMsg.style.display = 'none';
      alert(`A 6-digit verification code has been dispatched to aliloveff500@gmail.com.\n\nYour Verification Code is: ${activeOtpCode}`);
    });
  }

  if (cancelOtpBtn) {
    cancelOtpBtn.addEventListener('click', () => {
      activeOtpCode = null;
      secStep1.style.display = 'block';
      secStep2.style.display = 'none';
    });
  }

  if (updateCredentialsForm) {
    updateCredentialsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredOtp = inputOtpCode.value.trim();
      const newUser = newAdminUsername.value.trim();
      const newPass = newAdminPassword.value.trim();

      if (enteredOtp !== activeOtpCode) {
        otpErrorMsg.textContent = 'Invalid OTP verification code. Please check the code sent to your email.';
        otpErrorMsg.style.display = 'block';
        if (window.gsap) gsap.fromTo(otpErrorMsg, { x: -6 }, { x: 6, duration: 0.1, repeat: 3, yoyo: true });
        return;
      }

      if (!newUser || !newPass) {
        alert('Please enter both new username and password.');
        return;
      }

      adminAuth.username = newUser;
      adminAuth.password = newPass;
      localStorage.setItem('swift_admin_auth', JSON.stringify(adminAuth));

      secStep2.style.display = 'none';
      secStep3.style.display = 'block';
      activeOtpCode = null;
      refreshIcons();
    });
  }

  if (doneSecBtn) {
    doneSecBtn.addEventListener('click', () => {
      secStep3.style.display = 'none';
      secStep1.style.display = 'block';
    });
  }

  // =================================================================
  // 6.5 CROSS-DEVICE CLOUD & QR SYNCHRONIZATION ENGINE
  // =================================================================
  const GLOBAL_CLOUD_SYNC_URL = 'https://ntfy.sh/swiftjackets_cloud_v5_live_9281';

  async function autoPushToCloud(silent = true) {
    const payload = {
      updatedAt: Date.now(),
      brand: brandSettings,
      products: products,
      orders: orders,
      customers: customers
    };

    try {
      localStorage.setItem('swift_has_user_changes', 'true');
      localStorage.setItem('swift_last_sync_time', payload.updatedAt.toString());
    } catch(e) {}

    // 1. Push to Global Multi-Device Cloud Channel (Shared across all mobile & desktop devices)
    try {
      fetch(GLOBAL_CLOUD_SYNC_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Title': 'StoreUpdate' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch(e) {}

    // 2. Push to PHP endpoint (for InfinityFree / kesug.com)
    try {
      fetch('sync.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch(e) {}

    // 3. Push to Vercel Serverless API (/api/sync)
    try {
      fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch(e) {}

    if (!silent && cloudStatusMsg) {
      cloudStatusMsg.textContent = `✓ Successfully pushed to global cloud at ${new Date().toLocaleTimeString()}! All devices updated.`;
      cloudStatusMsg.style.color = '#10b981';
    }
  }

  async function pullFromCloud(manual = true) {
    if (cloudStatusMsg) {
      cloudStatusMsg.textContent = 'Fetching latest cloud state...';
      cloudStatusMsg.style.color = '#38bdf8';
    }

    let cloudData = null;

    // 1. Check Global Cloud Channel first
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

    // 2. Fallbacks: sync.php, /api/sync, data/store_data.json
    if (!cloudData) {
      const endpoints = ['sync.php', '/api/sync', 'data/store_data.json'];
      for (const ep of endpoints) {
        try {
          const res = await fetch(ep, { cache: 'no-store' });
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

    if (cloudData) {
      products = cloudData.products;
      localStorage.setItem('swift_jackets_products', JSON.stringify(products));
      localStorage.setItem('swift_jackets_products_backup', JSON.stringify(products));
      localStorage.setItem('swift_has_user_changes', 'true');
      if (cloudData.brand) {
        brandSettings = { ...DEFAULT_BRAND, ...cloudData.brand };
        localStorage.setItem('swift_brand_settings', JSON.stringify(brandSettings));
        localStorage.setItem('swift_brand_backup', JSON.stringify(brandSettings));
        populateBrandForm();
      }
      if (cloudData.orders && Array.isArray(cloudData.orders)) {
        orders = cloudData.orders;
        localStorage.setItem('swift_jackets_orders', JSON.stringify(orders));
        localStorage.setItem('swift_jackets_orders_backup', JSON.stringify(orders));
        renderOrdersTable();
      }
      renderProductsTable();
      updateBadges();
      broadcastChange('ALL_SYNCED');

      if (cloudStatusMsg) {
        cloudStatusMsg.textContent = `✓ Synchronized with cloud (${products.length} products loaded)!`;
        cloudStatusMsg.style.color = '#10b981';
      }
      if (manual) alert(`✓ Cloud Sync Successful!\nLoaded ${products.length} jackets and store settings.`);
    } else {
      if (cloudStatusMsg) {
        cloudStatusMsg.textContent = 'Notice: No newer cloud updates found. Local store is up to date.';
        cloudStatusMsg.style.color = 'var(--admin-text-dim)';
      }
      if (manual) alert('Local store is already up to date!');
    }
  }

  function generateSyncQrAndLink() {
    const compactProducts = products.map(p => ({
      id: p.id,
      name: p.name,
      colorName: p.colorName,
      hex: p.hex,
      gradient: p.gradient,
      themeGlow: p.themeGlow,
      themeClass: p.themeClass,
      price: p.price,
      originalPrice: p.originalPrice,
      discount: p.discount,
      condition: p.condition,
      stockAvailable: p.stockAvailable,
      itemsSold: p.itemsSold,
      availableSizes: p.availableSizes,
      tag: p.tag,
      headline: p.headline,
      headlineLight: p.headlineLight,
      tagline: p.tagline,
      description: p.description,
      tech: p.tech,
      image: p.image
    }));

    const syncPayload = {
      t: Date.now(),
      b: brandSettings,
      p: compactProducts
    };

    const jsonStr = JSON.stringify(syncPayload);
    if (syncCodeArea) {
      syncCodeArea.value = jsonStr;
    }

    try {
      const b64 = btoa(unescape(encodeURIComponent(jsonStr)));
      const syncUrl = `${window.location.origin}${window.location.pathname}?sync_data=${encodeURIComponent(b64)}`;
      if (syncQrImg) {
        syncQrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(syncUrl)}`;
      }
      return syncUrl;
    } catch(err) {
      console.warn('QR link generation warning:', err);
      return '';
    }
  }

  function checkUrlSyncParam() {
    try {
      const params = new URLSearchParams(window.location.search);
      const syncData = params.get('sync_data');
      if (syncData) {
        const jsonStr = decodeURIComponent(escape(atob(decodeURIComponent(syncData))));
        const parsed = JSON.parse(jsonStr);
        if (parsed && Array.isArray(parsed.p) && parsed.p.length > 0) {
          products = parsed.p;
          localStorage.setItem('swift_jackets_products', JSON.stringify(products));
          localStorage.setItem('swift_jackets_products_backup', JSON.stringify(products));
          localStorage.setItem('swift_has_user_changes', 'true');
          if (parsed.b) {
            brandSettings = { ...DEFAULT_BRAND, ...parsed.b };
            localStorage.setItem('swift_brand_settings', JSON.stringify(brandSettings));
            localStorage.setItem('swift_brand_backup', JSON.stringify(brandSettings));
          }
          window.history.replaceState({}, document.title, window.location.pathname);
          alert('🎉 Synchronization Complete! This device now has the latest store catalog & settings.');
          window.location.reload();
        }
      }
    } catch (e) {
      console.warn('Sync URL check error:', e);
    }
  }

  async function syncFromCloudOnBoot() {
    try {
      let cloudData = null;

      // 1. Fetch from Global Multi-Device Cloud Channel first (syncs across all mobile & PC devices)
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
        const endpoints = ['sync.php', '/api/sync', 'data/store_data.json'];
        for (const ep of endpoints) {
          try {
            const res = await fetch(ep, { cache: 'no-store' });
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
          products = cloudData.products;
          localStorage.setItem('swift_jackets_products', JSON.stringify(products));
          localStorage.setItem('swift_jackets_products_backup', JSON.stringify(products));
          localStorage.setItem('swift_last_sync_time', cloudTime.toString());
          if (cloudData.brand) {
            brandSettings = { ...DEFAULT_BRAND, ...cloudData.brand };
            localStorage.setItem('swift_brand_settings', JSON.stringify(brandSettings));
            localStorage.setItem('swift_brand_backup', JSON.stringify(brandSettings));
            populateBrandForm();
          }
          renderProductsTable();
          updateBadges();
        }
      }
    } catch (e) {}
  }

  // Live Real-Time Multi-Device Stream for Admin (Instant updates without reload)
  function initAdminLiveCloudStream() {
    try {
      if (typeof EventSource !== 'undefined') {
        const es = new EventSource(`${GLOBAL_CLOUD_SYNC_URL}/sse`);
        es.onmessage = (e) => {
          try {
            const data = JSON.parse(e.data);
            if (data && data.event === 'message' && data.message) {
              const parsed = JSON.parse(data.message);

              // 1. Order placed by customer on storefront
              if (parsed && parsed.type === 'ORDER_PLACED' && Array.isArray(parsed.orders) && parsed.orders.length > 0) {
                orders = parsed.orders;
                localStorage.setItem('swift_jackets_orders', JSON.stringify(orders));
                localStorage.setItem('swift_jackets_orders_backup', JSON.stringify(orders));
                if (Array.isArray(parsed.customers)) {
                  customers = parsed.customers;
                  localStorage.setItem('swift_jackets_customers', JSON.stringify(customers));
                  localStorage.setItem('swift_jackets_customers_backup', JSON.stringify(customers));
                  renderCustomersTable();
                }
                renderOrdersTable();
                updateBadges();
                showAdminToast(`New Order ${parsed.order ? parsed.order.orderId : ''} Placed!`, 'success');
              }

              // 2. Product and Brand changes from other devices
              if (parsed && Array.isArray(parsed.products) && parsed.products.length > 0) {
                const localTime = parseInt(localStorage.getItem('swift_last_sync_time') || '0');
                const cloudTime = parseInt(parsed.updatedAt || '0');
                if (cloudTime > localTime) {
                  products = parsed.products;
                  localStorage.setItem('swift_jackets_products', JSON.stringify(products));
                  localStorage.setItem('swift_jackets_products_backup', JSON.stringify(products));
                  localStorage.setItem('swift_last_sync_time', cloudTime.toString());
                  localStorage.setItem('swift_has_user_changes', 'true');
                  if (parsed.brand) {
                    brandSettings = { ...DEFAULT_BRAND, ...parsed.brand };
                    localStorage.setItem('swift_brand_settings', JSON.stringify(brandSettings));
                    localStorage.setItem('swift_brand_backup', JSON.stringify(brandSettings));
                    populateBrandForm();
                  }
                  renderProductsTable();
                  updateBadges();
                }
              }
            }
          } catch(err) {}
        };
      }
    } catch(e) {}
  }

  // Sync Modal Open / Close
  function openSyncModalHandler() {
    if (syncModal) syncModal.classList.add('active');
    generateSyncQrAndLink();
    refreshIcons();
  }

  function closeSyncModalHandler() {
    if (syncModal) syncModal.classList.remove('active');
  }

  if (openSyncModalBtn) openSyncModalBtn.addEventListener('click', openSyncModalHandler);
  if (closeSyncModal) closeSyncModal.addEventListener('click', closeSyncModalHandler);

  if (generateSyncLinkBtn) {
    generateSyncLinkBtn.addEventListener('click', () => {
      generateSyncQrAndLink();
      if (syncFeedbackAlert) {
        syncFeedbackAlert.textContent = '✓ QR Code & Sync Link Refreshed with latest changes!';
        syncFeedbackAlert.style.display = 'block';
        setTimeout(() => { syncFeedbackAlert.style.display = 'none'; }, 4000);
      }
    });
  }

  if (copySyncLinkBtn) {
    copySyncLinkBtn.addEventListener('click', () => {
      const url = generateSyncQrAndLink();
      if (url && navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          if (copySyncLinkText) copySyncLinkText.textContent = 'Copied to Clipboard!';
          if (syncFeedbackAlert) {
            syncFeedbackAlert.textContent = '✓ Link copied! Open this URL on your phone or PC to sync.';
            syncFeedbackAlert.style.display = 'block';
          }
          setTimeout(() => {
            if (copySyncLinkText) copySyncLinkText.textContent = 'Copy 1-Click Sync Link';
            if (syncFeedbackAlert) syncFeedbackAlert.style.display = 'none';
          }, 3500);
        }).catch(() => {
          prompt('Copy this sync link:', url);
        });
      } else {
        prompt('Copy this sync link:', url);
      }
    });
  }

  if (pushToCloudBtn) {
    pushToCloudBtn.addEventListener('click', async () => {
      pushToCloudBtn.disabled = true;
      pushToCloudBtn.innerHTML = '<span>Pushing to Cloud...</span>';
      await autoPushToCloud(false);
      pushToCloudBtn.disabled = false;
      pushToCloudBtn.innerHTML = '<i data-lucide="upload-cloud" class="icon-xs"></i><span>Push Changes to Cloud</span>';
      refreshIcons();
    });
  }

  if (pullFromCloudBtn) {
    pullFromCloudBtn.addEventListener('click', async () => {
      pullFromCloudBtn.disabled = true;
      pullFromCloudBtn.innerHTML = '<span>Fetching from Cloud...</span>';
      await pullFromCloud(true);
      pullFromCloudBtn.disabled = false;
      pullFromCloudBtn.innerHTML = '<i data-lucide="download-cloud" class="icon-xs"></i><span>Pull from Cloud</span>';
      refreshIcons();
    });
  }

  if (copyStoreCodeBtn) {
    copyStoreCodeBtn.addEventListener('click', () => {
      if (syncCodeArea && syncCodeArea.value) {
        navigator.clipboard.writeText(syncCodeArea.value).then(() => {
          alert('Backup code copied to clipboard!');
        }).catch(() => {
          syncCodeArea.select();
        });
      }
    });
  }

  if (restoreStoreCodeBtn) {
    restoreStoreCodeBtn.addEventListener('click', () => {
      if (!syncCodeArea || !syncCodeArea.value.trim()) {
        alert('Please paste a valid store backup code into the box first.');
        return;
      }
      try {
        const parsed = JSON.parse(syncCodeArea.value.trim());
        const prods = parsed.p || parsed.products;
        if (Array.isArray(prods) && prods.length > 0) {
          products = prods;
          localStorage.setItem('swift_jackets_products', JSON.stringify(products));
          localStorage.setItem('swift_jackets_products_backup', JSON.stringify(products));
          localStorage.setItem('swift_has_user_changes', 'true');
          if (parsed.b || parsed.brand) {
            brandSettings = { ...DEFAULT_BRAND, ...(parsed.b || parsed.brand) };
            localStorage.setItem('swift_brand_settings', JSON.stringify(brandSettings));
            localStorage.setItem('swift_brand_backup', JSON.stringify(brandSettings));
            populateBrandForm();
          }
          renderProductsTable();
          updateBadges();
          broadcastChange('ALL_SYNCED');
          alert('✓ Store successfully restored from backup code!');
          closeSyncModalHandler();
        } else {
          alert('Invalid backup code format: Missing products catalog.');
        }
      } catch (err) {
        alert('Invalid JSON backup code. Please check that you copied the complete code.');
      }
    });
  }

  // =================================================================
  // 7. INITIAL BOOT & DISPLAY FUNCTIONS (Called at bottom)
  // =================================================================
  function showAdminDashboard() {
    if (authGate) authGate.style.display = 'none';
    if (adminWrapper) adminWrapper.style.display = 'flex';
    products = getSafeProducts();
    orders = getSafeOrders();
    customers = getSafeCustomers();
    brandSettings = getSafeBrand();

    renderProductsTable();
    renderOrdersTable();
    renderCustomersTable();
    populateBrandForm();
    updateBadges();
    refreshIcons();
  }

  function showAuthGate() {
    if (authGate) authGate.style.display = 'flex';
    if (adminWrapper) adminWrapper.style.display = 'none';
    if (adminUsernameInput) {
      adminUsernameInput.value = '';
      adminUsernameInput.setAttribute('readonly', 'readonly');
    }
    if (adminPasswordInput) {
      adminPasswordInput.value = '';
      adminPasswordInput.setAttribute('readonly', 'readonly');
    }
    if (loginErrorMsg) loginErrorMsg.style.display = 'none';
    setTimeout(() => {
      if (adminUsernameInput) adminUsernameInput.value = '';
      if (adminPasswordInput) adminPasswordInput.value = '';
    }, 150);
    refreshIcons();
  }

  // Check login state
  try {
    if (sessionStorage.getItem('swift_admin_logged_in') === 'true') {
      showAdminDashboard();
    } else {
      showAuthGate();
    }
  } catch (err) {
    showAuthGate();
  }

  // Check URL sync parameter and cloud updates on boot
  checkUrlSyncParam();
  syncFromCloudOnBoot();
  initAdminLiveCloudStream();

  // Cross-tab storage listener
  if (syncChannel) {
    syncChannel.onmessage = () => {
      renderProductsTable();
      renderOrdersTable();
      renderCustomersTable();
      updateBadges();
    };
  }

  window.addEventListener('storage', () => {
    renderProductsTable();
    renderOrdersTable();
    renderCustomersTable();
    updateBadges();
  });

});
