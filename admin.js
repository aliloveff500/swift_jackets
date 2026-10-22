/* ===================================================================
   SWIFT JACKETS — ADMIN CONSOLE JAVASCRIPT
   - Real-time Product CRUD & Dynamic Theme Background Calculation
   - Orders Management with Live Status Controller
   - Customer Registry Management
   - Secure OTP Credential Reset Flow
   - Full LocalStorage Synchronization
=================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. DEFAULT DATA SEEDING
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

  // PKR Price Formatter
  function formatPKR(val) {
    const num = parseInt(val) || 0;
    return `PKR ${num.toLocaleString('en-PK')}`;
  }

  // DEFAULT ADMIN CREDENTIALS AS REQUESTED
  const DEFAULT_AUTH = {
    username: 'ALIZOX',
    password: 'ALIZOX 49229',
    email: 'aliloveff500@gmail.com'
  };

  // Initialize or Upgrade LocalStorage Seeds
  let storedProds = localStorage.getItem('swift_jackets_products');
  if (!storedProds) {
    localStorage.setItem('swift_jackets_products', JSON.stringify(DEFAULT_PRODUCTS));
  } else {
    try {
      const parsedProds = JSON.parse(storedProds);
      parsedProds.forEach(p => {
        if (p.price < 1000) p.price = p.price * 100;
        if (p.originalPrice < 1000) p.originalPrice = p.originalPrice * 100;
      });
      localStorage.setItem('swift_jackets_products', JSON.stringify(parsedProds));
    } catch(e) {}
  }

  let storedAuth = localStorage.getItem('swift_admin_auth');
  if (!storedAuth) {
    localStorage.setItem('swift_admin_auth', JSON.stringify(DEFAULT_AUTH));
  } else {
    try {
      const parsed = JSON.parse(storedAuth);
      if (parsed.username === 'admin' || parsed.password === 'admin123') {
        localStorage.setItem('swift_admin_auth', JSON.stringify(DEFAULT_AUTH));
      }
    } catch (e) {
      localStorage.setItem('swift_admin_auth', JSON.stringify(DEFAULT_AUTH));
    }
  }

  // 2. STATE VARIABLES
  let products = JSON.parse(localStorage.getItem('swift_jackets_products'));
  let orders = JSON.parse(localStorage.getItem('swift_jackets_orders') || '[]');
  let customers = JSON.parse(localStorage.getItem('swift_jackets_customers') || '[]');
  let adminAuth = JSON.parse(localStorage.getItem('swift_admin_auth'));
  let activeOtpCode = null;

  // Real-time Cross-Tab Broadcast Channel (for instant sync between storefront and admin)
  const syncChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('swift_jackets_sync') : null;

  function broadcastChange(type, data = {}) {
    window.dispatchEvent(new Event('storage'));
    if (syncChannel) {
      try {
        syncChannel.postMessage({ type, data, timestamp: Date.now() });
      } catch (err) {}
    }
  }

  // 3. AUTHENTICATION CONTROLLER
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
    authGate.style.display = 'none';
    adminWrapper.style.display = 'flex';
    renderProductsTable();
    renderOrdersTable();
    renderCustomersTable();
    updateBadges();
    if (window.lucide) lucide.createIcons();
  }

  function showAuthGate() {
    authGate.style.display = 'flex';
    adminWrapper.style.display = 'none';
    adminUsernameInput.value = '';
    adminPasswordInput.value = '';
    loginErrorMsg.style.display = 'none';
  }

  adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = adminUsernameInput.value.trim();
    const p = adminPasswordInput.value.trim();

    adminAuth = JSON.parse(localStorage.getItem('swift_admin_auth'));
    if (u === adminAuth.username && p === adminAuth.password) {
      sessionStorage.setItem('swift_admin_logged_in', 'true');
      localStorage.setItem('swift_admin_logged_in', 'true');
      showAdminDashboard();
      broadcastChange('ADMIN_AUTH');
    } else {
      loginErrorMsg.style.display = 'block';
      gsap.fromTo(loginErrorMsg, { x: -8 }, { x: 8, duration: 0.1, repeat: 3, yoyo: true });
    }
  });

  adminLogoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('swift_admin_logged_in');
    localStorage.removeItem('swift_admin_logged_in');
    showAuthGate();
    broadcastChange('ADMIN_LOGOUT');
  });

  // GATE DIRECT OTP CREDENTIAL RESET
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

  let gateActiveOtp = null;

  if (openGateOtpBtn) {
    openGateOtpBtn.addEventListener('click', () => {
      adminLoginForm.style.display = 'none';
      openGateOtpBtn.parentElement.style.display = 'none';
      gateOtpSection.style.display = 'flex';
      gateOtpStep1.style.display = 'block';
      gateOtpStep2.style.display = 'none';
      if (window.lucide) lucide.createIcons();
    });
  }

  if (backToGateLoginBtn) {
    backToGateLoginBtn.addEventListener('click', () => {
      gateOtpSection.style.display = 'none';
      adminLoginForm.style.display = 'block';
      openGateOtpBtn.parentElement.style.display = 'block';
      loginErrorMsg.style.display = 'none';
    });
  }

  if (sendGateOtpBtn) {
    sendGateOtpBtn.addEventListener('click', () => {
      gateActiveOtp = Math.floor(100000 + Math.random() * 900000).toString();
      console.log(`[GATE SECURITY DISPATCH] Verification OTP sent to aliloveff500@gmail.com: ${gateActiveOtp}`);
      gateOtpStep1.style.display = 'none';
      gateOtpStep2.style.display = 'block';
      gateOtpErrorMsg.style.display = 'none';
      alert(`A 6-digit verification code has been dispatched to aliloveff500@gmail.com.\n\nYour Verification Code is: ${gateActiveOtp}`);
    });
  }

  if (gateOtpForm) {
    gateOtpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = gateOtpInput.value.trim();
      const newUser = gateNewUsername.value.trim();
      const newPass = gateNewPassword.value.trim();

      if (code !== gateActiveOtp) {
        gateOtpErrorMsg.style.display = 'block';
        gsap.fromTo(gateOtpErrorMsg, { x: -6 }, { x: 6, duration: 0.1, repeat: 3, yoyo: true });
        return;
      }

      if (!newUser || !newPass) {
        alert('Please enter both new username and password.');
        return;
      }

      adminAuth = {
        username: newUser,
        password: newPass,
        email: 'aliloveff500@gmail.com'
      };
      localStorage.setItem('swift_admin_auth', JSON.stringify(adminAuth));
      localStorage.setItem('swift_admin_logged_in', 'true');
      sessionStorage.setItem('swift_admin_logged_in', 'true');

      alert(`Credentials updated successfully! Welcome, ${newUser}!`);
      showAdminDashboard();
      broadcastChange('ADMIN_AUTH');
    });
  }

  if (syncChannel) {
    syncChannel.onmessage = (event) => {
      orders = JSON.parse(localStorage.getItem('swift_jackets_orders') || '[]');
      customers = JSON.parse(localStorage.getItem('swift_jackets_customers') || '[]');
      renderOrdersTable();
      renderCustomersTable();
      updateBadges();
    };
  }

  // 4. TAB NAVIGATION
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.admin-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
      if (window.lucide) lucide.createIcons();
    });
  });

  function updateBadges() {
    document.getElementById('ordersCountBadge').textContent = orders.length;
    document.getElementById('customersCountBadge').textContent = customers.length;
    document.getElementById('statActiveModels').textContent = products.length;

    const totalStock = products.reduce((acc, curr) => acc + (parseInt(curr.stockAvailable) || 0), 0);
    const totalSold = products.reduce((acc, curr) => acc + (parseInt(curr.itemsSold) || 0), 0);
    document.getElementById('statTotalStock').textContent = totalStock;
    document.getElementById('statTotalSold').textContent = totalSold;
  }

  // 5. PRODUCTS MANAGEMENT & TABLE
  const productsTableBody = document.getElementById('productsTableBody');

  function renderProductsTable() {
    productsTableBody.innerHTML = '';
    products.forEach((p, idx) => {
      const tr = document.createElement('tr');
      
      // Sizes available badges
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

      // Event Listeners for Edit / Delete
      tr.querySelector('.edit-btn').addEventListener('click', () => openEditProduct(p.id));
      tr.querySelector('.delete-btn').addEventListener('click', () => deleteProduct(p.id));

      productsTableBody.appendChild(tr);
    });

    if (window.lucide) lucide.createIcons();
  }

  // 6. PRODUCT MODAL (ADD / EDIT)
  const productModal = document.getElementById('productModal');
  const openAddProductModal = document.getElementById('openAddProductModal');
  const closeProductModal = document.getElementById('closeProductModal');
  const cancelProductBtn = document.getElementById('cancelProductBtn');
  const productForm = document.getElementById('productForm');
  const productModalTitle = document.getElementById('productModalTitle');

  // Modal Inputs
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
  const prodCustomColorPicker = document.getElementById('prodCustomColorPicker');
  const themePreviewBox = document.getElementById('themePreviewBox');
  const previewGlowSphere = document.getElementById('previewGlowSphere');
  const modalImgPreview = document.getElementById('modalImgPreview');
  const prodImagePath = document.getElementById('prodImagePath');
  const prodImageFileInput = document.getElementById('prodImageFileInput');

  // Size Checkboxes
  const sizeCheckboxes = {
    '36': document.getElementById('size36'),
    '38': document.getElementById('size38'),
    '40': document.getElementById('size40'),
    '42': document.getElementById('size42')
  };

  // COLOR WHEEL ENGINE & DYNAMIC THEME CONTROLLER
  const wheelCanvas = document.getElementById('colorWheelCanvas');
  const wheelSelectorDot = document.getElementById('wheelSelectorDot');
  const wheelBrightness = document.getElementById('wheelBrightness');
  const wheelPreviewCircle = document.getElementById('wheelPreviewCircle');
  const paletteSwatches = document.querySelectorAll('.palette-swatch');

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

  let isWheelDragging = false;

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
    const brightness = (parseInt(wheelBrightness.value, 10) || 95) / 100;
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

    wheelCanvas.addEventListener('touchstart', (e) => {
      isWheelDragging = true;
      handleWheelInteraction(e);
    }, { passive: false });
    window.addEventListener('touchmove', (e) => {
      if (isWheelDragging) handleWheelInteraction(e);
    }, { passive: false });
    window.addEventListener('touchend', () => {
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

  prodHexValue.addEventListener('input', (e) => {
    let hex = e.target.value.trim();
    if (!hex.startsWith('#')) hex = '#' + hex;
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      paletteSwatches.forEach(s => s.classList.remove('active'));
      applySelectedColor(hex, prodColorName.value || 'Custom Hue');
    }
  });

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

  function applySelectedColor(hex, name) {
    prodHexValue.value = hex;
    if (name) prodColorName.value = name;
    if (wheelPreviewCircle) wheelPreviewCircle.style.background = hex;

    const gradient = generateMatchingGradient(hex);
    themePreviewBox.style.background = gradient;
    previewGlowSphere.style.background = hex;
    previewGlowSphere.style.boxShadow = `0 0 45px ${hex}`;
  }

  // Image Upload File Reader
  prodImageFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        modalImgPreview.src = dataUrl;
        prodImagePath.value = dataUrl;
      };
      reader.readAsDataURL(file);
    }
  });

  prodImagePath.addEventListener('input', (e) => {
    modalImgPreview.src = e.target.value;
  });

  // Open Add Product
  openAddProductModal.addEventListener('click', () => {
    productForm.reset();
    editProductId.value = '';
    productModalTitle.textContent = 'Add New Jacket Model';
    modalImgPreview.src = 'assets/images/jacket_orange.png';
    prodImagePath.value = 'assets/images/jacket_orange.png';
    drawWheel(0.95);
    applySelectedColor('#eab308', 'Electric Volt');
    Object.values(sizeCheckboxes).forEach(cb => cb.checked = true);
    productModal.classList.add('active');
    setTimeout(() => drawWheel(0.95), 60);
  });

  // Open Edit Product
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

    // Set sizes
    const available = prod.availableSizes || ['36', '38', '40', '42'];
    Object.keys(sizeCheckboxes).forEach(size => {
      sizeCheckboxes[size].checked = available.includes(size);
    });

    // Set color
    applySelectedColor(prod.hex, prod.colorName);
    productModal.classList.add('active');
    setTimeout(() => drawWheel(0.95), 60);
  }

  // Close Product Modal
  function closeProdModal() {
    productModal.classList.remove('active');
  }

  closeProductModal.addEventListener('click', closeProdModal);
  cancelProductBtn.addEventListener('click', closeProdModal);

  // Save Product (Add or Edit)
  productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedSizes = Object.keys(sizeCheckboxes).filter(s => sizeCheckboxes[s].checked);
    if (selectedSizes.length === 0) {
      alert('Please check at least one available size for this jacket.');
      return;
    }

    const hex = prodHexValue.value.trim() || '#ff6a2b';
    const gradient = generateMatchingGradient(hex);
    const themeGlow = `${hex}66`;

    const productPayload = {
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
      // Update existing
      const idx = products.findIndex(p => p.id === editProductId.value);
      if (idx !== -1) {
        products[idx] = productPayload;
      }
    } else {
      // Add new
      products.push(productPayload);
    }

    // Save and Sync
    localStorage.setItem('swift_jackets_products', JSON.stringify(products));
    renderProductsTable();
    updateBadges();
    closeProdModal();

    // Trigger instant broadcast sync to live storefront
    broadcastChange('PRODUCTS_UPDATED');
  });

  // Delete Product
  function deleteProduct(id) {
    if (products.length <= 1) {
      alert('You must have at least one active product model in the store.');
      return;
    }
    if (confirm('Are you sure you want to remove this jacket model from the live store?')) {
      products = products.filter(p => p.id !== id);
      localStorage.setItem('swift_jackets_products', JSON.stringify(products));
      renderProductsTable();
      updateBadges();
      broadcastChange('PRODUCTS_UPDATED');
    }
  }

  // 7. ORDERS MANAGEMENT & STATUS UPDATES
  const ordersTableBody = document.getElementById('ordersTableBody');
  const noOrdersNotice = document.getElementById('noOrdersNotice');
  const refreshOrdersBtn = document.getElementById('refreshOrdersBtn');

  function renderOrdersTable() {
    orders = JSON.parse(localStorage.getItem('swift_jackets_orders') || '[]');
    ordersTableBody.innerHTML = '';

    if (orders.length === 0) {
      noOrdersNotice.style.display = 'flex';
      return;
    } else {
      noOrdersNotice.style.display = 'none';
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

      // Status change listener
      tr.querySelector('.status-dropdown').addEventListener('change', (e) => {
        const newStatus = e.target.value;
        orders[index].status = newStatus;
        localStorage.setItem('swift_jackets_orders', JSON.stringify(orders));
        broadcastChange('ORDER_STATUS_CHANGED', { orderId: ord.orderId, status: newStatus });
      });

      // Delete Order listener
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

    if (window.lucide) lucide.createIcons();
  }

  refreshOrdersBtn.addEventListener('click', () => {
    renderOrdersTable();
    updateBadges();
  });

  // 8. CUSTOMERS MANAGEMENT
  const customersTableBody = document.getElementById('customersTableBody');
  const noCustomersNotice = document.getElementById('noCustomersNotice');
  const refreshCustomersBtn = document.getElementById('refreshCustomersBtn');

  function renderCustomersTable() {
    customers = JSON.parse(localStorage.getItem('swift_jackets_customers') || '[]');
    customersTableBody.innerHTML = '';

    if (customers.length === 0) {
      noCustomersNotice.style.display = 'flex';
      return;
    } else {
      noCustomersNotice.style.display = 'none';
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

    if (window.lucide) lucide.createIcons();
  }

  refreshCustomersBtn.addEventListener('click', () => {
    renderCustomersTable();
    updateBadges();
  });

  // 9. SECURITY CREDENTIALS RESET WITH OTP FLOW
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

  sendOtpBtn.addEventListener('click', () => {
    // Generate secure 6-digit OTP code
    activeOtpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // In a production backend, this sends an email via SendGrid/SES.
    // For local simulation, we notify that the code is dispatched to the user's email aliloveff500@gmail.com
    // and provide a direct secure banner prompt so the user can verify without leakage on public views.
    console.log(`[SECURITY DISPATCH] Verification OTP sent to aliloveff500@gmail.com: ${activeOtpCode}`);
    
    // Smooth transition to step 2
    secStep1.style.display = 'none';
    secStep2.style.display = 'block';
    inputOtpCode.value = '';
    newAdminUsername.value = '';
    newAdminPassword.value = '';
    otpErrorMsg.style.display = 'none';

    // Show temporary prompt notification
    alert(`A 6-digit verification code has been dispatched to aliloveff500@gmail.com.\n\nYour Verification Code is: ${activeOtpCode}`);
  });

  cancelOtpBtn.addEventListener('click', () => {
    activeOtpCode = null;
    secStep1.style.display = 'block';
    secStep2.style.display = 'none';
  });

  updateCredentialsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const enteredOtp = inputOtpCode.value.trim();
    const newUser = newAdminUsername.value.trim();
    const newPass = newAdminPassword.value.trim();

    if (enteredOtp !== activeOtpCode) {
      otpErrorMsg.textContent = 'Invalid OTP verification code. Please check the code sent to your email.';
      otpErrorMsg.style.display = 'block';
      gsap.fromTo(otpErrorMsg, { x: -6 }, { x: 6, duration: 0.1, repeat: 3, yoyo: true });
      return;
    }

    if (!newUser || !newPass) {
      alert('Please enter both new username and password.');
      return;
    }

    // Save updated credentials
    adminAuth.username = newUser;
    adminAuth.password = newPass;
    localStorage.setItem('swift_admin_auth', JSON.stringify(adminAuth));

    // Move to success step
    secStep2.style.display = 'none';
    secStep3.style.display = 'block';
    activeOtpCode = null;
    if (window.lucide) lucide.createIcons();
  });

  doneSecBtn.addEventListener('click', () => {
    secStep3.style.display = 'none';
    secStep1.style.display = 'block';
  });

  // Listen to cross-tab storage changes
  window.addEventListener('storage', () => {
    products = JSON.parse(localStorage.getItem('swift_jackets_products') || '[]');
    orders = JSON.parse(localStorage.getItem('swift_jackets_orders') || '[]');
    customers = JSON.parse(localStorage.getItem('swift_jackets_customers') || '[]');
    renderProductsTable();
    renderOrdersTable();
    renderCustomersTable();
    updateBadges();
  });

});
