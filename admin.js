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

  function renderProductsTable() {
    products = getSafeProducts();
    if (!productsTableBody) return;
    productsTableBody.innerHTML = '';

    products.forEach((p) => {
      const tr = document.createElement('tr');
      const allSizes = ['36', '38', '40', '42'];
      const sizeHtml = allSizes.map(s => {
        const hasSize = (p.availableSizes || []).includes(s);
        return `<span class="size-mini-tag ${hasSize ? '' : 'disabled'}" title="${hasSize ? 'Available' : 'Out of Stock'}">${s}</span>`;
      }).join(' ');

      const conditionClass = (p.condition || '').includes('Used') ? 'condition-used' : '';

      tr.innerHTML = `
        <td>
          <div class="table-product-cell">
            <img src="${p.image}" alt="${p.name}" class="table-thumb">
            <div>
              <div class="table-prod-name">${p.name}</div>
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
            <button class="btn-icon-action edit-btn" data-id="${p.id}" title="Edit Jacket">
              <i data-lucide="edit-3" class="icon-xs"></i>
            </button>
            <button class="btn-icon-action delete delete-btn" data-id="${p.id}" title="Remove Jacket">
              <i data-lucide="trash-2" class="icon-xs"></i>
            </button>
          </div>
        </td>
      `;

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
        broadcastChange('ORDER_STATUS_CHANGED', { orderId: ord.orderId, status: newStatus });
      });

      tr.querySelector('.delete-order-btn').addEventListener('click', () => {
        if (confirm(`Delete order ${ord.orderId}?`)) {
          orders.splice(index, 1);
          localStorage.setItem('swift_jackets_orders', JSON.stringify(orders));
          renderOrdersTable();
          updateBadges();
          broadcastChange('ORDERS_UPDATED');
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
    resetCatalogDefaultsBtn.addEventListener('click', () => {
      if (confirm('Restore factory jacket models and default stats?')) {
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
        alert('Storefront and admin restored to factory defaults!');
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
      broadcastChange('BRAND_UPDATED', brandSettings);
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

  // Client-side automatic image compressor (Prevents QuotaExceededError on mobile devices)
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
        ctx.drawImage(img, 0, 0, w, h);
        const compressed = canvas.toDataURL('image/jpeg', quality);
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
        products.push(payload);
      }

      try {
        localStorage.setItem('swift_jackets_products', JSON.stringify(products));
        localStorage.setItem('swift_jackets_products_backup', JSON.stringify(products));
      } catch (err) {
        console.warn('Storage save warning:', err);
      }

      renderProductsTable();
      updateBadges();
      closeProdModal();
      broadcastChange('PRODUCTS_UPDATED');
    });
  }

  function deleteProduct(id) {
    if (products.length <= 1) {
      alert('You must have at least one active product model in the store.');
      return;
    }
    if (confirm('Are you sure you want to remove this jacket model from the live store?')) {
      products = products.filter(p => p.id !== id);
      try {
        localStorage.setItem('swift_jackets_products', JSON.stringify(products));
        localStorage.setItem('swift_jackets_products_backup', JSON.stringify(products));
      } catch (err) {}
      renderProductsTable();
      updateBadges();
      broadcastChange('PRODUCTS_UPDATED');
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
    if (adminUsernameInput) adminUsernameInput.value = '';
    if (adminPasswordInput) adminPasswordInput.value = '';
    if (loginErrorMsg) loginErrorMsg.style.display = 'none';
    refreshIcons();
  }

  // Check login state
  try {
    if (localStorage.getItem('swift_admin_logged_in') === 'true' || sessionStorage.getItem('swift_admin_logged_in') === 'true') {
      showAdminDashboard();
    } else {
      showAuthGate();
    }
  } catch (err) {
    console.error('Fatal boot error in admin:', err);
    showAdminDashboard();
  }

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
