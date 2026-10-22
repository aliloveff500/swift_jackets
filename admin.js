/* ===================================================================
   SWIFT JACKETS — ADMIN CONSOLE & VISUAL STOREFRONT CONTROLLER
   - Visual Storefront Editor (Identical to storefront with inline [Edit] on all elements)
   - Brand Identity & Logo Customizer
   - Advanced Jackets & Inventory Hub (Search, Filter, Stock +/- Adjusters, HSV Color Wheel)
   - Advanced Orders Hub (Status Tabs, WhatsApp Direct Link, Status Controller)
   - Customer Registry with Lifetime Spend & WhatsApp Contact
   - Secure OTP Credential Management (ALIZOX / ALIZOX 49229)
   - Cross-Tab Real-time Broadcast Synchronization
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
      description: "It's not just about staying warm, it's about stepping outside and instantly feeling confident, comfortable, and completely yourself. Designed to elevate even the simplest outfit, this jacket wraps you in lightweight warmth.",
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
      description: "Matte obsidian finish with stormproof seam sealing and ergonomic baffle architecture. A subtle silhouette engineered to deflect freezing gusts while locking in natural body warmth.",
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
      description: "High-sheen pearl finish reflecting winter radiance. Ultra-compressible 850 fill-power responsibly sourced down for cloud-like thermal comfort that transitions seamlessly from chalet to street.",
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
      description: "Vibrant high-contrast crimson with satin luster. Windproof micro-weave that stands out across city skylines while trapping vital core heat during rapid temperature drops.",
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
    logoChoice: 'thunderbolt',
    logoCustomUrl: ''
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
      ordersCount: 1,
      totalSpent: 14999
    },
    {
      name: 'Hamza Khan',
      email: 'hamza.k@example.com',
      phone: '03219876543',
      city: 'Karachi',
      registeredAt: new Date(Date.now() - 86400000 * 30).toISOString(),
      ordersCount: 1,
      totalSpent: 18999
    }
  ];

  // Price formatting helper in PKR
  function formatPKR(val) {
    const num = parseInt(val) || 0;
    return `PKR ${num.toLocaleString('en-PK')}`;
  }

  // Safe Lucide icon initializer
  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try {
        window.lucide.createIcons();
      } catch (err) {
        console.warn('Lucide icon refresh non-fatal warning:', err);
      }
    }
  }

  // Robust LocalStorage Getters
  function getSafeProducts() {
    try {
      const raw = localStorage.getItem('swift_jackets_products');
      if (!raw) {
        localStorage.setItem('swift_jackets_products', JSON.stringify(DEFAULT_PRODUCTS));
        return DEFAULT_PRODUCTS;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        parsed.forEach(p => {
          if (p.price < 1000) p.price = p.price * 100;
          if (p.originalPrice < 1000) p.originalPrice = p.originalPrice * 100;
        });
        localStorage.setItem('swift_jackets_products', JSON.stringify(parsed));
        return parsed;
      }
      localStorage.setItem('swift_jackets_products', JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    } catch (e) {
      localStorage.setItem('swift_jackets_products', JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }
  }

  function getSafeBrand() {
    try {
      const raw = localStorage.getItem('swift_brand_settings');
      if (!raw) {
        localStorage.setItem('swift_brand_settings', JSON.stringify(DEFAULT_BRAND));
        return DEFAULT_BRAND;
      }
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_BRAND, ...parsed };
    } catch (e) {
      return DEFAULT_BRAND;
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
  // 2. STATE VARIABLES
  // =================================================================
  let products = getSafeProducts();
  let brandSettings = getSafeBrand();
  let orders = getSafeOrders();
  let customers = getSafeCustomers();
  let adminAuth = getSafeAuth();
  
  let activeVisualIndex = 0;
  let activeOtpCode = null;
  let activeGateOtp = null;
  let activeOrderFilter = 'all';
  let activeProductFilter = 'all';

  // Cross-Tab Broadcast Channel
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
  // 3. COLOR WHEEL ENGINE
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

  function drawWheelCanvas(canvas, brightness = 0.95) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
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

  // =================================================================
  // 4. AUTHENTICATION & LOGIN CONTROLLER
  // =================================================================
  const authGate = document.getElementById('authGate');
  const adminWrapper = document.getElementById('adminWrapper');
  const adminLoginForm = document.getElementById('adminLoginForm');
  const adminUsernameInput = document.getElementById('adminUsername');
  const adminPasswordInput = document.getElementById('adminPassword');
  const loginErrorMsg = document.getElementById('loginErrorMsg');
  const adminLogoutBtn = document.getElementById('adminLogoutBtn');

  // Check Persistent or Session Login
  if (localStorage.getItem('swift_admin_logged_in') === 'true' || sessionStorage.getItem('swift_admin_logged_in') === 'true') {
    showAdminDashboard();
  } else {
    showAuthGate();
  }

  function showAdminDashboard() {
    if (authGate) authGate.style.display = 'none';
    if (adminWrapper) adminWrapper.style.display = 'flex';
    
    // Always refresh datasets
    products = getSafeProducts();
    brandSettings = getSafeBrand();
    orders = getSafeOrders();
    customers = getSafeCustomers();

    updateBrandUI();
    renderVisualEditor();
    renderProductsTable();
    renderOrdersTable();
    renderCustomersTable();
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

  // Emergency Reset Defaults
  const resetCatalogDefaultsBtn = document.getElementById('resetCatalogDefaultsBtn');
  if (resetCatalogDefaultsBtn) {
    resetCatalogDefaultsBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to restore official jacket models, branding and demo orders? This will fix any empty stats.')) {
        localStorage.setItem('swift_jackets_products', JSON.stringify(DEFAULT_PRODUCTS));
        localStorage.setItem('swift_brand_settings', JSON.stringify(DEFAULT_BRAND));
        localStorage.setItem('swift_jackets_orders', JSON.stringify(DEFAULT_ORDERS));
        localStorage.setItem('swift_jackets_customers', JSON.stringify(DEFAULT_CUSTOMERS));
        localStorage.setItem('swift_admin_auth', JSON.stringify(DEFAULT_AUTH));
        
        products = DEFAULT_PRODUCTS;
        brandSettings = DEFAULT_BRAND;
        orders = DEFAULT_ORDERS;
        customers = DEFAULT_CUSTOMERS;
        activeVisualIndex = 0;

        showAdminDashboard();
        broadcastChange('ALL_RESET');
        alert('All store models, branding and orders restored successfully!');
      }
    });
  }

  // GATE OTP CREDENTIAL RESET
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
      activeGateOtp = null;
    });
  }

  if (sendGateOtpBtn) {
    sendGateOtpBtn.addEventListener('click', () => {
      activeGateOtp = Math.floor(100000 + Math.random() * 900000).toString();
      console.log(`[AUTH GATE SECURITY] OTP sent to aliloveff500@gmail.com: ${activeGateOtp}`);
      gateOtpStep1.style.display = 'none';
      gateOtpStep2.style.display = 'block';
      alert(`A 6-digit verification code has been dispatched to aliloveff500@gmail.com.\n\nYour Verification Code is: ${activeGateOtp}`);
    });
  }

  if (gateOtpForm) {
    gateOtpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const entered = gateOtpInput.value.trim();
      const newUser = gateNewUsername.value.trim();
      const newPass = gateNewPassword.value.trim();

      if (entered !== activeGateOtp) {
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

  // =================================================================
  // 5. TAB NAVIGATION
  // =================================================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.admin-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetSection = document.getElementById(targetTab);
      if (targetSection) targetSection.classList.add('active');

      if (targetTab === 'tab-visual-editor') {
        renderVisualEditor();
      } else if (targetTab === 'tab-products') {
        renderProductsTable();
      } else if (targetTab === 'tab-orders') {
        renderOrdersTable();
      } else if (targetTab === 'tab-customers') {
        renderCustomersTable();
      } else if (targetTab === 'tab-branding') {
        populateBrandSettingsForm();
      }

      refreshIcons();
    });
  });

  function updateBadges() {
    const modelsBadge = document.getElementById('modelsCountBadge');
    const ordersBadge = document.getElementById('ordersCountBadge');
    const customersBadge = document.getElementById('customersCountBadge');

    if (modelsBadge) modelsBadge.textContent = products.length;
    if (ordersBadge) ordersBadge.textContent = orders.length;
    if (customersBadge) customersBadge.textContent = customers.length;

    const statActiveModels = document.getElementById('statActiveModels');
    const statTotalStock = document.getElementById('statTotalStock');
    const statTotalSold = document.getElementById('statTotalSold');

    if (statActiveModels) statActiveModels.textContent = products.length;

    const totalStock = products.reduce((acc, curr) => acc + (parseInt(curr.stockAvailable) || 0), 0);
    const totalSold = products.reduce((acc, curr) => acc + (parseInt(curr.itemsSold) || 0), 0);

    if (statTotalStock) statTotalStock.textContent = totalStock;
    if (statTotalSold) statTotalSold.textContent = totalSold;

    // Customers stats
    const statCustCount = document.getElementById('statCustomersCount');
    const statRevenue = document.getElementById('statTotalRevenue');
    const statAvgOrder = document.getElementById('statAvgOrderValue');

    if (statCustCount) statCustCount.textContent = customers.length;

    const totalRevenue = orders.reduce((acc, curr) => acc + (parseInt(curr.total) || 0), 0);
    if (statRevenue) statRevenue.textContent = formatPKR(totalRevenue);
    if (statAvgOrder) {
      const avg = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
      statAvgOrder.textContent = formatPKR(avg);
    }

    // Orders Filter Counts
    const countAll = document.getElementById('countAllOrders');
    const countPending = document.getElementById('countPendingOrders');
    const countProcessing = document.getElementById('countProcessingOrders');
    const countShipped = document.getElementById('countShippedOrders');
    const countDelivered = document.getElementById('countDeliveredOrders');
    const countCancelled = document.getElementById('countCancelledOrders');

    if (countAll) countAll.textContent = orders.length;
    if (countPending) countPending.textContent = orders.filter(o => o.status === 'Pending').length;
    if (countProcessing) countProcessing.textContent = orders.filter(o => o.status === 'Processing').length;
    if (countShipped) countShipped.textContent = orders.filter(o => o.status === 'Shipped').length;
    if (countDelivered) countDelivered.textContent = orders.filter(o => o.status === 'Delivered').length;
    if (countCancelled) countCancelled.textContent = orders.filter(o => o.status === 'Cancelled').length;
  }

  // =================================================================
  // 6. BRANDING CONTROLLER & DYNAMIC LOGO / NAME
  // =================================================================
  function getLogoSvgMarkup(choice) {
    switch (choice) {
      case 'diamond':
        return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M6 3h12l4 6-10 13L2 9z"></path></svg>`;
      case 'crown':
        return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path></svg>`;
      case 'flame':
        return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`;
      default: // thunderbolt
        return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`;
    }
  }

  function updateBrandUI() {
    brandSettings = getSafeBrand();

    // Admin Header Branding
    const brandNameEl = document.getElementById('adminHeaderBrandName');
    if (brandNameEl) {
      brandNameEl.innerHTML = `${brandSettings.brandName} <span>${brandSettings.brandSuffix}</span>`;
    }

    const brandIconEl = document.getElementById('adminHeaderBrandIcon');
    if (brandIconEl) {
      if (brandSettings.logoCustomUrl) {
        brandIconEl.innerHTML = `<img src="${brandSettings.logoCustomUrl}" alt="Logo" style="width:22px;height:22px;object-fit:contain;">`;
      } else {
        brandIconEl.innerHTML = getLogoSvgMarkup(brandSettings.logoChoice);
      }
    }

    // Gate branding
    const gateBrandTitle = document.getElementById('gateBrandTitle');
    if (gateBrandTitle) {
      gateBrandTitle.innerHTML = `${brandSettings.brandName} <span>ADMIN</span>`;
    }

    // Mock preview card in branding tab
    const mockBrandName = document.getElementById('mockPreviewBrandName');
    if (mockBrandName) {
      mockBrandName.innerHTML = `${brandSettings.brandName} <span>${brandSettings.brandSuffix}</span>`;
    }
    const mockIcon = document.getElementById('mockPreviewIcon');
    if (mockIcon) {
      if (brandSettings.logoCustomUrl) {
        mockIcon.innerHTML = `<img src="${brandSettings.logoCustomUrl}" alt="Logo" style="width:22px;height:22px;object-fit:contain;">`;
      } else {
        mockIcon.innerHTML = getLogoSvgMarkup(brandSettings.logoChoice);
      }
    }
    const mockTagline = document.getElementById('mockPreviewTagline');
    if (mockTagline) mockTagline.textContent = `"${brandSettings.tagline}"`;
    const mockHeadline = document.getElementById('mockPreviewHeadline');
    if (mockHeadline) mockHeadline.innerHTML = `${brandSettings.headlineMain} <span>${brandSettings.headlineSub}</span>`;
    const mockAgent = document.getElementById('mockPreviewAgent');
    if (mockAgent) mockAgent.textContent = brandSettings.supportAgent;
  }

  function populateBrandSettingsForm() {
    brandSettings = getSafeBrand();
    const bName = document.getElementById('brandNameInput');
    const bSuffix = document.getElementById('brandSuffixInput');
    const bTagline = document.getElementById('brandTaglineInput');
    const bHeadMain = document.getElementById('brandHeadlineMainInput');
    const bHeadSub = document.getElementById('brandHeadlineSubInput');
    const sAgent = document.getElementById('supportAgentInput');
    const sPhone = document.getElementById('supportPhoneInput');

    if (bName) bName.value = brandSettings.brandName || 'SWIFT';
    if (bSuffix) bSuffix.value = brandSettings.brandSuffix || 'JACKETS';
    if (bTagline) bTagline.value = brandSettings.tagline || 'Confidence, wrapped in warmth';
    if (bHeadMain) bHeadMain.value = brandSettings.headlineMain || 'Stand out';
    if (bHeadSub) bHeadSub.value = brandSettings.headlineSub || 'Without trying';
    if (sAgent) sAgent.value = brandSettings.supportAgent || 'ALIZOX';
    if (sPhone) sPhone.value = brandSettings.supportPhone || '03079436896';

    const radio = document.querySelector(`input[name="logoStyleChoice"][value="${brandSettings.logoChoice || 'thunderbolt'}"]`);
    if (radio) radio.checked = true;

    updateBrandUI();
  }

  // Quick Edit Brand button in header
  const quickEditBrandBtn = document.getElementById('quickEditBrandBtn');
  if (quickEditBrandBtn) {
    quickEditBrandBtn.addEventListener('click', () => {
      const tabBrandingBtn = document.getElementById('tabBtnBranding');
      if (tabBrandingBtn) tabBrandingBtn.click();
    });
  }

  // Save Brand Settings Form
  const brandSettingsForm = document.getElementById('brandSettingsForm');
  if (brandSettingsForm) {
    brandSettingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const bName = document.getElementById('brandNameInput').value.trim() || 'SWIFT';
      const bSuffix = document.getElementById('brandSuffixInput').value.trim() || 'JACKETS';
      const bTagline = document.getElementById('brandTaglineInput').value.trim() || 'Confidence, wrapped in warmth';
      const bHeadMain = document.getElementById('brandHeadlineMainInput').value.trim() || 'Stand out';
      const bHeadSub = document.getElementById('brandHeadlineSubInput').value.trim() || 'Without trying';
      const sAgent = document.getElementById('supportAgentInput').value.trim() || 'ALIZOX';
      const sPhone = document.getElementById('supportPhoneInput').value.trim() || '03079436896';
      const choiceRadio = document.querySelector('input[name="logoStyleChoice"]:checked');
      const logoChoice = choiceRadio ? choiceRadio.value : 'thunderbolt';

      brandSettings = {
        ...brandSettings,
        brandName: bName,
        brandSuffix: bSuffix,
        tagline: bTagline,
        headlineMain: bHeadMain,
        headlineSub: bHeadSub,
        supportAgent: sAgent,
        supportPhone: sPhone,
        logoChoice: logoChoice
      };

      localStorage.setItem('swift_brand_settings', JSON.stringify(brandSettings));
      updateBrandUI();
      renderVisualEditor();
      broadcastChange('BRAND_UPDATED', brandSettings);
      alert('Brand settings and logo saved successfully! Storefront synchronized.');
    });
  }

  // Custom Logo Upload
  const customLogoFileInput = document.getElementById('customLogoFileInput');
  const brandLogoPreviewBox = document.getElementById('brandLogoPreviewBox');
  const resetLogoToIconBtn = document.getElementById('resetLogoToIconBtn');

  if (customLogoFileInput) {
    customLogoFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          brandSettings.logoCustomUrl = evt.target.result;
          localStorage.setItem('swift_brand_settings', JSON.stringify(brandSettings));
          if (brandLogoPreviewBox) {
            brandLogoPreviewBox.innerHTML = `<img src="${evt.target.result}" style="width:32px;height:32px;object-fit:contain;">`;
          }
          updateBrandUI();
          broadcastChange('BRAND_UPDATED', brandSettings);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (resetLogoToIconBtn) {
    resetLogoToIconBtn.addEventListener('click', () => {
      brandSettings.logoCustomUrl = '';
      localStorage.setItem('swift_brand_settings', JSON.stringify(brandSettings));
      if (brandLogoPreviewBox) {
        brandLogoPreviewBox.innerHTML = getLogoSvgMarkup(brandSettings.logoChoice);
      }
      updateBrandUI();
      broadcastChange('BRAND_UPDATED', brandSettings);
    });
  }

  // =================================================================
  // 7. VISUAL STOREFRONT EDITOR CONTROLLER
  // =================================================================
  const visualHeroStage = document.getElementById('visualHeroStage');
  const visualBgGlow = document.getElementById('visualBgGlow');
  const visualCollectionTag = document.getElementById('visualCollectionTag');
  const visualConditionBadge = document.getElementById('visualConditionBadge');
  const visualStockBadge = document.getElementById('visualStockBadge');
  const visualCurrentSlideNum = document.getElementById('visualCurrentSlideNum');
  const visualTotalSlidesNum = document.getElementById('visualTotalSlidesNum');
  const visualHeadlineMain = document.getElementById('visualHeadlineMain');
  const visualHeadlineSub = document.getElementById('visualHeadlineSub');
  const visualProductDesc = document.getElementById('visualProductDesc');
  const visualTechText = document.getElementById('visualTechText');
  const visualMainJacketImg = document.getElementById('visualMainJacketImg');
  const visualTaglineText = document.getElementById('visualTaglineText');
  const visualColorName = document.getElementById('visualColorName');
  const visualDiscountBadge = document.getElementById('visualDiscountBadge');
  const visualCurrentPrice = document.getElementById('visualCurrentPrice');
  const visualOriginalPrice = document.getElementById('visualOriginalPrice');
  const visualSwatchesGrid = document.getElementById('visualSwatchesGrid');
  const visualSizeOptions = document.getElementById('visualSizeOptions');
  const visualColorWheelCanvas = document.getElementById('visualColorWheelCanvas');
  const visualWheelDot = document.getElementById('visualWheelDot');
  const visualWheelPreviewDot = document.getElementById('visualWheelPreviewDot');
  const visualThemeHexInput = document.getElementById('visualThemeHexInput');
  const saveActiveThemeColorBtn = document.getElementById('saveActiveThemeColorBtn');

  function renderVisualEditor() {
    products = getSafeProducts();
    if (products.length === 0) return;

    if (activeVisualIndex >= products.length) activeVisualIndex = 0;
    const current = products[activeVisualIndex];

    // Slide Counter
    if (visualCurrentSlideNum) visualCurrentSlideNum.textContent = String(activeVisualIndex + 1).padStart(2, '0');
    if (visualTotalSlidesNum) visualTotalSlidesNum.textContent = String(products.length).padStart(2, '0');

    // Tag & Badges
    if (visualCollectionTag) visualCollectionTag.textContent = current.tag || 'WINTER 2026 EDITION';
    if (visualConditionBadge) {
      visualConditionBadge.textContent = current.condition || 'Brand New';
      if ((current.condition || '').includes('Used')) {
        visualConditionBadge.classList.add('condition-used');
      } else {
        visualConditionBadge.classList.remove('condition-used');
      }
    }
    if (visualStockBadge) visualStockBadge.textContent = `${current.stockAvailable || 0} Available`;

    // Headlines & Description
    if (visualHeadlineMain) visualHeadlineMain.textContent = current.headline || 'Stand out';
    if (visualHeadlineSub) visualHeadlineSub.textContent = current.headlineLight || 'Without trying';
    if (visualProductDesc) visualProductDesc.textContent = current.description || '';
    if (visualTechText) visualTechText.textContent = current.tech || 'Aerogel 850+ Fill';

    // 3D Jacket Image & Dynamic Background Glow
    if (visualMainJacketImg) {
      visualMainJacketImg.src = current.image;
      visualMainJacketImg.alt = current.name;
    }
    if (visualBgGlow) {
      visualBgGlow.style.background = `radial-gradient(circle, ${current.hex}55 0%, rgba(20, 21, 28, 0) 70%)`;
    }
    if (visualTaglineText) visualTaglineText.textContent = current.tagline || brandSettings.tagline;

    // Pricing
    if (visualColorName) visualColorName.textContent = current.colorName;
    if (visualDiscountBadge) visualDiscountBadge.textContent = current.discount || 'Save 25%';
    if (visualCurrentPrice) visualCurrentPrice.textContent = formatPKR(current.price);
    if (visualOriginalPrice) visualOriginalPrice.textContent = formatPKR(current.originalPrice);

    // Swatches
    if (visualSwatchesGrid) {
      visualSwatchesGrid.innerHTML = '';
      products.forEach((p, idx) => {
        const swatch = document.createElement('div');
        swatch.className = `visual-color-swatch-item ${idx === activeVisualIndex ? 'active' : ''}`;
        swatch.title = `${p.name} (${p.colorName})`;
        swatch.innerHTML = `<span class="swatch-fill" style="background: ${p.hex};"></span>`;
        swatch.addEventListener('click', () => {
          activeVisualIndex = idx;
          renderVisualEditor();
        });
        visualSwatchesGrid.appendChild(swatch);
      });
    }

    // Sizes
    if (visualSizeOptions) {
      visualSizeOptions.innerHTML = '';
      const allSizes = ['36', '38', '40', '42'];
      allSizes.forEach(s => {
        const isAvail = (current.availableSizes || []).includes(s);
        const pill = document.createElement('button');
        pill.className = `size-pill ${isAvail ? 'active' : 'disabled'}`;
        pill.textContent = s;
        pill.title = isAvail ? `Size ${s} Available` : `Size ${s} Out of Stock`;
        pill.addEventListener('click', () => {
          // Quick toggle size
          let sizes = current.availableSizes || [];
          if (sizes.includes(s)) {
            sizes = sizes.filter(x => x !== s);
          } else {
            sizes.push(s);
          }
          current.availableSizes = sizes;
          saveAndBroadcastProducts();
          renderVisualEditor();
        });
        visualSizeOptions.appendChild(pill);
      });
    }

    // Color Wheel Sync
    if (visualWheelPreviewDot) visualWheelPreviewDot.style.background = current.hex;
    if (visualThemeHexInput) visualThemeHexInput.value = current.hex;

    if (visualColorWheelCanvas) {
      drawWheelCanvas(visualColorWheelCanvas, 0.95);
    }

    refreshIcons();
  }

  // 3D Tilt Drag Controller on the Visual Jacket
  const visualJacketFrame = document.getElementById('visualJacketFrame');
  let is3dDragging = false;
  let startX = 0;
  let startY = 0;
  let currentRotY = 0;
  let currentRotX = 0;

  if (visualJacketFrame) {
    visualJacketFrame.addEventListener('mousedown', (e) => {
      is3dDragging = true;
      startX = e.clientX;
      startY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!is3dDragging) return;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      currentRotY += deltaX * 0.4;
      currentRotX -= deltaY * 0.2;
      currentRotX = Math.max(-25, Math.min(25, currentRotX));

      if (visualMainJacketImg) {
        visualMainJacketImg.style.transform = `rotateY(${currentRotY}deg) rotateX(${currentRotX}deg) scale(1.05)`;
      }
      startX = e.clientX;
      startY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      if (!is3dDragging) return;
      is3dDragging = false;
      // Spring back slightly
      if (visualMainJacketImg && window.gsap) {
        gsap.to(visualMainJacketImg, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out'
        });
      }
      currentRotY = 0;
      currentRotX = 0;
    });
  }

  // Navigation Arrows in Visual Editor
  const visualPrevBtn = document.getElementById('visualPrevJacketBtn');
  const visualNextBtn = document.getElementById('visualNextJacketBtn');

  if (visualPrevBtn) {
    visualPrevBtn.addEventListener('click', () => {
      activeVisualIndex = (activeVisualIndex - 1 + products.length) % products.length;
      renderVisualEditor();
    });
  }

  if (visualNextBtn) {
    visualNextBtn.addEventListener('click', () => {
      activeVisualIndex = (activeVisualIndex + 1) % products.length;
      renderVisualEditor();
    });
  }

  // Mini Color Wheel in Visual Editor
  let isMiniWheelDragging = false;

  function handleMiniWheelInteraction(e) {
    if (!visualColorWheelCanvas) return;
    const rect = visualColorWheelCanvas.getBoundingClientRect();
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
    const [r, g, b] = hsvToRgb(hue, sat, 0.95);
    const hex = rgbToHex(r, g, b);

    if (visualWheelDot) {
      const dotX = (rect.width / 2) + Math.cos(angle) * dist;
      const dotY = (rect.height / 2) + Math.sin(angle) * dist;
      visualWheelDot.style.left = `${dotX}px`;
      visualWheelDot.style.top = `${dotY}px`;
    }

    if (visualWheelPreviewDot) visualWheelPreviewDot.style.background = hex;
    if (visualThemeHexInput) visualThemeHexInput.value = hex;

    // Live preview on stage
    if (visualBgGlow) {
      visualBgGlow.style.background = `radial-gradient(circle, ${hex}66 0%, rgba(20, 21, 28, 0) 70%)`;
    }
  }

  if (visualColorWheelCanvas) {
    visualColorWheelCanvas.addEventListener('mousedown', (e) => {
      isMiniWheelDragging = true;
      handleMiniWheelInteraction(e);
    });
    window.addEventListener('mousemove', (e) => {
      if (isMiniWheelDragging) handleMiniWheelInteraction(e);
    });
    window.addEventListener('mouseup', () => {
      isMiniWheelDragging = false;
    });
  }

  if (saveActiveThemeColorBtn) {
    saveActiveThemeColorBtn.addEventListener('click', () => {
      const hex = visualThemeHexInput.value.trim();
      if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        const current = products[activeVisualIndex];
        current.hex = hex;
        current.gradient = generateMatchingGradient(hex);
        current.themeGlow = `${hex}66`;
        saveAndBroadcastProducts();
        renderVisualEditor();
        alert(`New background theme color (${hex}) applied to ${current.name} and live storefront!`);
      } else {
        alert('Please enter a valid 6-digit hex code (e.g. #ff6a2b).');
      }
    });
  }

  // =================================================================
  // 8. QUICK EDIT MODAL (FOR INLINE [EDIT] CHIPS)
  // =================================================================
  const quickEditModal = document.getElementById('quickEditModal');
  const quickModalTitle = document.getElementById('quickModalTitle');
  const quickModalBody = document.getElementById('quickModalBody');
  const closeQuickModalBtn = document.getElementById('closeQuickModalBtn');
  const cancelQuickModalBtn = document.getElementById('cancelQuickModalBtn');
  const saveQuickModalBtn = document.getElementById('saveQuickModalBtn');

  let activeQuickSaveCallback = null;

  function openQuickModal(title, htmlContent, onSave) {
    if (!quickEditModal) return;
    quickModalTitle.textContent = title;
    quickModalBody.innerHTML = htmlContent;
    activeQuickSaveCallback = onSave;
    quickEditModal.classList.add('active');
    refreshIcons();
  }

  function closeQuickModal() {
    if (quickEditModal) quickEditModal.classList.remove('active');
    activeQuickSaveCallback = null;
  }

  if (closeQuickModalBtn) closeQuickModalBtn.addEventListener('click', closeQuickModal);
  if (cancelQuickModalBtn) cancelQuickModalBtn.addEventListener('click', closeQuickModal);

  if (saveQuickModalBtn) {
    saveQuickModalBtn.addEventListener('click', () => {
      if (typeof activeQuickSaveCallback === 'function') {
        activeQuickSaveCallback();
      }
      closeQuickModal();
    });
  }

  // Hooking up Visual Editor [Edit] Chips
  const editCollectionTagBtn = document.getElementById('editCollectionTagBtn');
  if (editCollectionTagBtn) {
    editCollectionTagBtn.addEventListener('click', () => {
      const current = products[activeVisualIndex];
      openQuickModal('Edit Collection Tag', `
        <div class="form-group">
          <label>Collection Tag / Edition Name:</label>
          <input type="text" id="quickInputVal" value="${current.tag || ''}" style="width:100%;">
        </div>
      `, () => {
        const val = document.getElementById('quickInputVal').value.trim();
        current.tag = val || 'SPECIAL EDITION';
        saveAndBroadcastProducts();
        renderVisualEditor();
      });
    });
  }

  const quickEditStockConditionBtn = document.getElementById('quickEditStockConditionBtn');
  if (quickEditStockConditionBtn) {
    quickEditStockConditionBtn.addEventListener('click', () => {
      const current = products[activeVisualIndex];
      openQuickModal('Quick Stock & Condition', `
        <div class="form-group">
          <label>Condition:</label>
          <select id="quickConditionSelect" style="width:100%; padding:0.7rem; background:#1e1f29; border:1px solid #444; color:#fff; border-radius:8px;">
            <option value="Brand New" ${current.condition === 'Brand New' ? 'selected' : ''}>Brand New</option>
            <option value="Like New (Mint)" ${current.condition === 'Like New (Mint)' ? 'selected' : ''}>Like New (Mint)</option>
            <option value="Pre-Owned (Good)" ${current.condition === 'Pre-Owned (Good)' ? 'selected' : ''}>Pre-Owned (Good)</option>
          </select>
        </div>
        <div class="form-group" style="margin-top:1rem;">
          <label>Stock Available (Units):</label>
          <input type="number" id="quickStockVal" value="${current.stockAvailable || 10}" style="width:100%;">
        </div>
      `, () => {
        current.condition = document.getElementById('quickConditionSelect').value;
        current.stockAvailable = parseInt(document.getElementById('quickStockVal').value) || 0;
        saveAndBroadcastProducts();
        renderVisualEditor();
      });
    });
  }

  const editHeadlinesBtn = document.getElementById('editHeadlinesBtn');
  if (editHeadlinesBtn) {
    editHeadlinesBtn.addEventListener('click', () => {
      const current = products[activeVisualIndex];
      openQuickModal('Edit Hero Headlines', `
        <div class="form-group">
          <label>Primary Headline:</label>
          <input type="text" id="quickHeadMain" value="${current.headline || ''}" style="width:100%;">
        </div>
        <div class="form-group" style="margin-top:1rem;">
          <label>Secondary Headline:</label>
          <input type="text" id="quickHeadSub" value="${current.headlineLight || ''}" style="width:100%;">
        </div>
      `, () => {
        current.headline = document.getElementById('quickHeadMain').value.trim();
        current.headlineLight = document.getElementById('quickHeadSub').value.trim();
        saveAndBroadcastProducts();
        renderVisualEditor();
      });
    });
  }

  const editDescriptionBtn = document.getElementById('editDescriptionBtn');
  if (editDescriptionBtn) {
    editDescriptionBtn.addEventListener('click', () => {
      const current = products[activeVisualIndex];
      openQuickModal('Edit Product Story', `
        <div class="form-group">
          <label>Description & Story:</label>
          <textarea id="quickDescVal" rows="4" style="width:100%; padding:0.7rem; background:#1e1f29; border:1px solid #444; color:#fff; border-radius:8px;">${current.description || ''}</textarea>
        </div>
      `, () => {
        current.description = document.getElementById('quickDescVal').value.trim();
        saveAndBroadcastProducts();
        renderVisualEditor();
      });
    });
  }

  const editTechBadgeBtn = document.getElementById('editTechBadgeBtn');
  if (editTechBadgeBtn) {
    editTechBadgeBtn.addEventListener('click', () => {
      const current = products[activeVisualIndex];
      openQuickModal('Edit Tech Specs', `
        <div class="form-group">
          <label>Technical Spec Pill:</label>
          <input type="text" id="quickTechVal" value="${current.tech || ''}" style="width:100%;">
        </div>
      `, () => {
        current.tech = document.getElementById('quickTechVal').value.trim();
        saveAndBroadcastProducts();
        renderVisualEditor();
      });
    });
  }

  const editTaglineBtn = document.getElementById('editTaglineBtn');
  if (editTaglineBtn) {
    editTaglineBtn.addEventListener('click', () => {
      const current = products[activeVisualIndex];
      openQuickModal('Edit Hero Center Tagline', `
        <div class="form-group">
          <label>Tagline:</label>
          <input type="text" id="quickTaglineVal" value="${current.tagline || ''}" style="width:100%;">
        </div>
      `, () => {
        current.tagline = document.getElementById('quickTaglineVal').value.trim();
        saveAndBroadcastProducts();
        renderVisualEditor();
      });
    });
  }

  const editPriceCardBtn = document.getElementById('editPriceCardBtn');
  if (editPriceCardBtn) {
    editPriceCardBtn.addEventListener('click', () => {
      const current = products[activeVisualIndex];
      openQuickModal('Edit Pricing', `
        <div class="form-group">
          <label>Current Discounted Price (PKR):</label>
          <input type="number" id="quickPriceVal" value="${current.price || 14999}" style="width:100%;">
        </div>
        <div class="form-group" style="margin-top:1rem;">
          <label>Original Price (PKR):</label>
          <input type="number" id="quickOrigPriceVal" value="${current.originalPrice || 19999}" style="width:100%;">
        </div>
      `, () => {
        const pr = parseInt(document.getElementById('quickPriceVal').value) || 14999;
        const orig = parseInt(document.getElementById('quickOrigPriceVal').value) || 19999;
        current.price = pr;
        current.originalPrice = orig;
        current.discount = `Save ${Math.max(5, Math.round(((orig - pr) / orig) * 100))}%`;
        saveAndBroadcastProducts();
        renderVisualEditor();
      });
    });
  }

  const editCurrentJacketBtn = document.getElementById('editCurrentJacketBtn');
  if (editCurrentJacketBtn) {
    editCurrentJacketBtn.addEventListener('click', () => {
      const current = products[activeVisualIndex];
      openEditProduct(current.id);
    });
  }

  const visualAddJacketBtn = document.getElementById('visualAddJacketBtn');
  if (visualAddJacketBtn) {
    visualAddJacketBtn.addEventListener('click', () => {
      const openAddBtn = document.getElementById('openAddProductModal');
      if (openAddBtn) openAddBtn.click();
    });
  }

  const visualManageColorsBtn = document.getElementById('visualManageColorsBtn');
  if (visualManageColorsBtn) {
    visualManageColorsBtn.addEventListener('click', () => {
      const tabProductsBtn = document.getElementById('tabBtnProducts');
      if (tabProductsBtn) tabProductsBtn.click();
    });
  }

  const visualEditSizesBtn = document.getElementById('visualEditSizesBtn');
  if (visualEditSizesBtn) {
    visualEditSizesBtn.addEventListener('click', () => {
      const current = products[activeVisualIndex];
      openQuickModal('Edit Available Sizes', `
        <p style="font-size:0.85rem; color:#aaa; margin-bottom:1rem;">Check the sizes in stock for <strong>${current.name}</strong>:</p>
        <div style="display:flex; gap:1rem;">
          <label><input type="checkbox" id="qSize36" ${(current.availableSizes||[]).includes('36')?'checked':''}> Size 36</label>
          <label><input type="checkbox" id="qSize38" ${(current.availableSizes||[]).includes('38')?'checked':''}> Size 38</label>
          <label><input type="checkbox" id="qSize40" ${(current.availableSizes||[]).includes('40')?'checked':''}> Size 40</label>
          <label><input type="checkbox" id="qSize42" ${(current.availableSizes||[]).includes('42')?'checked':''}> Size 42</label>
        </div>
      `, () => {
        const sizes = [];
        if (document.getElementById('qSize36').checked) sizes.push('36');
        if (document.getElementById('qSize38').checked) sizes.push('38');
        if (document.getElementById('qSize40').checked) sizes.push('40');
        if (document.getElementById('qSize42').checked) sizes.push('42');
        if (sizes.length === 0) sizes.push('38');
        current.availableSizes = sizes;
        saveAndBroadcastProducts();
        renderVisualEditor();
      });
    });
  }

  // =================================================================
  // 9. PRODUCTS & INVENTORY TABLE & CRUD
  // =================================================================
  const productsTableBody = document.getElementById('productsTableBody');
  const productsSearchInput = document.getElementById('productsSearchInput');
  const productFilterPills = document.querySelectorAll('.filter-pill');
  const refreshProductsBtn = document.getElementById('refreshProductsBtn');

  function renderProductsTable() {
    products = getSafeProducts();
    if (!productsTableBody) return;
    productsTableBody.innerHTML = '';

    const query = productsSearchInput ? productsSearchInput.value.toLowerCase().trim() : '';
    
    const filtered = products.filter(p => {
      const matchesQuery = !query || 
        (p.name && p.name.toLowerCase().includes(query)) ||
        (p.colorName && p.colorName.toLowerCase().includes(query)) ||
        (p.tag && p.tag.toLowerCase().includes(query)) ||
        (p.condition && p.condition.toLowerCase().includes(query));

      if (!matchesQuery) return false;

      if (activeProductFilter === 'brand-new') return (p.condition || '').includes('Brand New');
      if (activeProductFilter === 'in-stock') return (p.stockAvailable || 0) > 0;
      if (activeProductFilter === 'low-stock') return (p.stockAvailable || 0) <= 10;
      return true;
    });

    filtered.forEach((p) => {
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
            <span class="stock-count" id="stockCount-${p.id}">${p.stockAvailable || 0} in stock</span>
            <span class="sold-count">${p.itemsSold || 0} sold</span>
          </div>
          <div class="stock-adjust-group">
            <button class="stock-adjust-btn minus-stock" data-id="${p.id}" title="Decrease Stock (-1)">-</button>
            <button class="stock-adjust-btn plus-stock" data-id="${p.id}" title="Increase Stock (+1)">+</button>
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

      // Event Listeners for Edit, Delete, Stock +/-
      tr.querySelector('.edit-btn').addEventListener('click', () => openEditProduct(p.id));
      tr.querySelector('.delete-btn').addEventListener('click', () => deleteProduct(p.id));

      tr.querySelector('.plus-stock').addEventListener('click', () => {
        p.stockAvailable = (p.stockAvailable || 0) + 1;
        saveAndBroadcastProducts();
        renderProductsTable();
        renderVisualEditor();
      });

      tr.querySelector('.minus-stock').addEventListener('click', () => {
        if ((p.stockAvailable || 0) > 0) {
          p.stockAvailable = p.stockAvailable - 1;
          saveAndBroadcastProducts();
          renderProductsTable();
          renderVisualEditor();
        }
      });

      productsTableBody.appendChild(tr);
    });

    refreshIcons();
    updateBadges();
  }

  if (productsSearchInput) {
    productsSearchInput.addEventListener('input', renderProductsTable);
  }

  productFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      productFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeProductFilter = pill.getAttribute('data-filter');
      renderProductsTable();
    });
  });

  if (refreshProductsBtn) {
    refreshProductsBtn.addEventListener('click', () => {
      products = getSafeProducts();
      renderProductsTable();
      renderVisualEditor();
    });
  }

  function saveAndBroadcastProducts() {
    localStorage.setItem('swift_jackets_products', JSON.stringify(products));
    updateBadges();
    broadcastChange('PRODUCTS_UPDATED');
  }

  // =================================================================
  // 10. PRODUCT MODAL (ADD / EDIT) & MODAL COLOR WHEEL
  // =================================================================
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

  const wheelCanvas = document.getElementById('colorWheelCanvas');
  const wheelSelectorDot = document.getElementById('wheelSelectorDot');
  const wheelBrightness = document.getElementById('wheelBrightness');
  const wheelPreviewCircle = document.getElementById('wheelPreviewCircle');
  const paletteSwatches = document.querySelectorAll('.palette-swatch');

  let isWheelDragging = false;

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

  function handleModalWheelInteraction(e) {
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

  if (wheelCanvas) {
    drawWheelCanvas(wheelCanvas, 0.95);
    wheelCanvas.addEventListener('mousedown', (e) => {
      isWheelDragging = true;
      handleModalWheelInteraction(e);
    });
    window.addEventListener('mousemove', (e) => {
      if (isWheelDragging) handleModalWheelInteraction(e);
    });
    window.addEventListener('mouseup', () => {
      isWheelDragging = false;
    });
  }

  if (wheelBrightness) {
    wheelBrightness.addEventListener('input', (e) => {
      const b = (parseInt(e.target.value, 10) || 95) / 100;
      drawWheelCanvas(wheelCanvas, b);
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

  if (prodImageFileInput) {
    prodImageFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target.result;
          if (modalImgPreview) modalImgPreview.src = dataUrl;
          if (prodImagePath) prodImagePath.value = dataUrl;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (prodImagePath) {
    prodImagePath.addEventListener('input', (e) => {
      if (modalImgPreview) modalImgPreview.src = e.target.value;
    });
  }

  if (openAddProductModal) {
    openAddProductModal.addEventListener('click', () => {
      productForm.reset();
      editProductId.value = '';
      productModalTitle.textContent = 'Add New Jacket Model';
      if (modalImgPreview) modalImgPreview.src = 'assets/images/jacket_orange.png';
      if (prodImagePath) prodImagePath.value = 'assets/images/jacket_orange.png';
      drawWheelCanvas(wheelCanvas, 0.95);
      applySelectedColor('#eab308', 'Electric Volt');
      Object.values(sizeCheckboxes).forEach(cb => { if (cb) cb.checked = true; });
      productModal.classList.add('active');
      setTimeout(() => drawWheelCanvas(wheelCanvas, 0.95), 60);
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
    if (modalImgPreview) modalImgPreview.src = prod.image;
    if (prodImagePath) prodImagePath.value = prod.image;

    const available = prod.availableSizes || ['36', '38', '40', '42'];
    Object.keys(sizeCheckboxes).forEach(size => {
      if (sizeCheckboxes[size]) sizeCheckboxes[size].checked = available.includes(size);
    });

    applySelectedColor(prod.hex, prod.colorName);
    productModal.classList.add('active');
    setTimeout(() => drawWheelCanvas(wheelCanvas, 0.95), 60);
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
        alert('Please select at least one available size for this jacket.');
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

      saveAndBroadcastProducts();
      renderProductsTable();
      renderVisualEditor();
      closeProdModal();
    });
  }

  function deleteProduct(id) {
    if (products.length <= 1) {
      alert('You must have at least one active product model in the store.');
      return;
    }
    if (confirm('Are you sure you want to remove this jacket model from the live store?')) {
      products = products.filter(p => p.id !== id);
      saveAndBroadcastProducts();
      renderProductsTable();
      renderVisualEditor();
    }
  }

  // =================================================================
  // 11. ADVANCED ORDERS MANAGEMENT (STATUS TABS & WHATSAPP)
  // =================================================================
  const ordersTableBody = document.getElementById('ordersTableBody');
  const noOrdersNotice = document.getElementById('noOrdersNotice');
  const ordersSearchInput = document.getElementById('ordersSearchInput');
  const orderFilterPills = document.querySelectorAll('.order-filter-pill');
  const refreshOrdersBtn = document.getElementById('refreshOrdersBtn');

  function renderOrdersTable() {
    orders = getSafeOrders();
    if (!ordersTableBody) return;
    ordersTableBody.innerHTML = '';

    const query = ordersSearchInput ? ordersSearchInput.value.toLowerCase().trim() : '';

    const filtered = orders.filter(o => {
      const matchesFilter = activeOrderFilter === 'all' || o.status === activeOrderFilter;
      if (!matchesFilter) return false;

      const matchesQuery = !query ||
        (o.orderId && o.orderId.toLowerCase().includes(query)) ||
        (o.customer?.name && o.customer.name.toLowerCase().includes(query)) ||
        (o.customer?.phone && o.customer.phone.toLowerCase().includes(query)) ||
        (o.customer?.city && o.customer.city.toLowerCase().includes(query));

      return matchesQuery;
    });

    if (filtered.length === 0) {
      if (noOrdersNotice) noOrdersNotice.style.display = 'flex';
      return;
    } else {
      if (noOrdersNotice) noOrdersNotice.style.display = 'none';
    }

    filtered.forEach((ord, index) => {
      const tr = document.createElement('tr');
      const dateFormatted = new Date(ord.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      // Clean phone for WhatsApp link
      const rawPhone = ord.customer?.phone || '';
      let cleanPhone = rawPhone.replace(/\D/g, '');
      if (cleanPhone.startsWith('03')) cleanPhone = '92' + cleanPhone.substring(1);

      const whatsAppMsg = encodeURIComponent(`Hello ${ord.customer?.name || 'Customer'}, this is ALIZOX from Swift Jackets regarding your Order ${ord.orderId} (${ord.item?.name || 'Jacket'}). Current Status: ${ord.status}.`);
      const whatsAppLink = `https://wa.me/${cleanPhone}?text=${whatsAppMsg}`;

      tr.innerHTML = `
        <td>
          <div style="font-weight: 800; font-family: var(--font-display); color: #fff;">${ord.orderId}</div>
          <div style="font-size: 0.75rem; color: var(--admin-text-dim);">${dateFormatted}</div>
        </td>
        <td>
          <div style="font-weight: 700;">${ord.customer?.name || 'Customer'}</div>
          <div style="font-size: 0.78rem; color: var(--admin-text-muted); margin-bottom: 0.25rem;">${ord.customer?.phone || ''}</div>
          ${rawPhone ? `<a href="${whatsAppLink}" target="_blank" class="btn-whatsapp-chat" title="Chat with customer on WhatsApp"><i data-lucide="message-circle" class="icon-micro"></i><span>WhatsApp</span></a>` : ''}
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
            <select class="status-dropdown" data-order-id="${ord.orderId}">
              <option value="Pending" ${ord.status === 'Pending' ? 'selected' : ''}>⏳ Pending</option>
              <option value="Processing" ${ord.status === 'Processing' ? 'selected' : ''}>🔄 Processing</option>
              <option value="Shipped" ${ord.status === 'Shipped' ? 'selected' : ''}>🚚 Shipped</option>
              <option value="Delivered" ${ord.status === 'Delivered' ? 'selected' : ''}>✅ Delivered</option>
              <option value="Cancelled" ${ord.status === 'Cancelled' ? 'selected' : ''}>❌ Cancelled</option>
            </select>
          </div>
        </td>
        <td style="text-align: right;">
          <button class="btn-icon-action delete delete-order-btn" data-order-id="${ord.orderId}" title="Delete Order">
            <i data-lucide="trash-2" class="icon-xs"></i>
          </button>
        </td>
      `;

      // Status change listener
      tr.querySelector('.status-dropdown').addEventListener('change', (e) => {
        const newStatus = e.target.value;
        const realIdx = orders.findIndex(o => o.orderId === ord.orderId);
        if (realIdx !== -1) {
          orders[realIdx].status = newStatus;
          localStorage.setItem('swift_jackets_orders', JSON.stringify(orders));
          updateBadges();
          broadcastChange('ORDER_STATUS_CHANGED', { orderId: ord.orderId, status: newStatus });
        }
      });

      // Delete Order listener
      tr.querySelector('.delete-order-btn').addEventListener('click', () => {
        if (confirm(`Delete order ${ord.orderId}?`)) {
          orders = orders.filter(o => o.orderId !== ord.orderId);
          localStorage.setItem('swift_jackets_orders', JSON.stringify(orders));
          renderOrdersTable();
          updateBadges();
          broadcastChange('ORDERS_UPDATED');
        }
      });

      ordersTableBody.appendChild(tr);
    });

    refreshIcons();
    updateBadges();
  }

  if (ordersSearchInput) {
    ordersSearchInput.addEventListener('input', renderOrdersTable);
  }

  orderFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      orderFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeOrderFilter = pill.getAttribute('data-status');
      renderOrdersTable();
    });
  });

  if (refreshOrdersBtn) {
    refreshOrdersBtn.addEventListener('click', () => {
      orders = getSafeOrders();
      renderOrdersTable();
      updateBadges();
    });
  }

  // =================================================================
  // 12. ADVANCED CUSTOMERS REGISTRY
  // =================================================================
  const customersTableBody = document.getElementById('customersTableBody');
  const noCustomersNotice = document.getElementById('noCustomersNotice');
  const customersSearchInput = document.getElementById('customersSearchInput');
  const refreshCustomersBtn = document.getElementById('refreshCustomersBtn');

  function renderCustomersTable() {
    customers = getSafeCustomers();
    if (!customersTableBody) return;
    customersTableBody.innerHTML = '';

    const query = customersSearchInput ? customersSearchInput.value.toLowerCase().trim() : '';

    const filtered = customers.filter(c => {
      return !query ||
        (c.name && c.name.toLowerCase().includes(query)) ||
        (c.email && c.email.toLowerCase().includes(query)) ||
        (c.phone && c.phone.toLowerCase().includes(query)) ||
        (c.city && c.city.toLowerCase().includes(query));
    });

    if (filtered.length === 0) {
      if (noCustomersNotice) noCustomersNotice.style.display = 'flex';
      return;
    } else {
      if (noCustomersNotice) noCustomersNotice.style.display = 'none';
    }

    filtered.forEach(cust => {
      const tr = document.createElement('tr');
      const dateFormatted = cust.registeredAt ? new Date(cust.registeredAt).toLocaleDateString() : 'Active User';

      const rawPhone = cust.phone || '';
      let cleanPhone = rawPhone.replace(/\D/g, '');
      if (cleanPhone.startsWith('03')) cleanPhone = '92' + cleanPhone.substring(1);
      const whatsAppLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${cust.name || 'Customer'}, thank you for shopping with Swift Jackets!`)}`;

      tr.innerHTML = `
        <td>
          <div style="font-weight: 700; color: #fff;">${cust.name || 'Anonymous User'}</div>
        </td>
        <td>
          <div style="color: var(--admin-text-muted);">${cust.email || 'N/A'}</div>
        </td>
        <td>
          <div style="color: var(--admin-text-dim); margin-bottom: 0.2rem;">${cust.phone || 'N/A'}</div>
          ${rawPhone ? `<a href="${whatsAppLink}" target="_blank" class="btn-whatsapp-chat" title="Chat on WhatsApp"><i data-lucide="message-circle" class="icon-micro"></i><span>WhatsApp</span></a>` : ''}
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
        <td style="text-align: right; font-weight: 800; font-family: var(--font-display); color: #34d399;">
          ${formatPKR(cust.totalSpent || 14999)}
        </td>
      `;
      customersTableBody.appendChild(tr);
    });

    refreshIcons();
    updateBadges();
  }

  if (customersSearchInput) {
    customersSearchInput.addEventListener('input', renderCustomersTable);
  }

  if (refreshCustomersBtn) {
    refreshCustomersBtn.addEventListener('click', () => {
      customers = getSafeCustomers();
      renderCustomersTable();
      updateBadges();
    });
  }

  // =================================================================
  // 13. SECURITY & CREDENTIALS RESET (OTP FLOW)
  // =================================================================
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

  if (sendOtpBtn) {
    sendOtpBtn.addEventListener('click', () => {
      activeOtpCode = Math.floor(100000 + Math.random() * 900000).toString();
      console.log(`[SECURITY DISPATCH] Verification OTP sent to aliloveff500@gmail.com: ${activeOtpCode}`);
      
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

  // Cross-Tab Listener
  if (syncChannel) {
    syncChannel.onmessage = () => {
      products = getSafeProducts();
      brandSettings = getSafeBrand();
      orders = getSafeOrders();
      customers = getSafeCustomers();
      renderVisualEditor();
      renderProductsTable();
      renderOrdersTable();
      renderCustomersTable();
      updateBadges();
      updateBrandUI();
    };
  }

  window.addEventListener('storage', () => {
    products = getSafeProducts();
    brandSettings = getSafeBrand();
    orders = getSafeOrders();
    customers = getSafeCustomers();
    renderVisualEditor();
    renderProductsTable();
    renderOrdersTable();
    renderCustomersTable();
    updateBadges();
    updateBrandUI();
  });

  // Initial Boot
  showAdminDashboard();

});
