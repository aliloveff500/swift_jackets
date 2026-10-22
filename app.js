/* ===================================================================
   SWIFT JACKETS — INTERACTIVE APPLICATION SCRIPT (UPDATED)
   - Distinct Pricing for Every Jacket
   - Bottom-Right Thumbnail to Center Hero Cinematic Transition
   - Full 3D Drag-to-Rotate Interactive Preview
   - All Products Catalog Modal
   - Visible Colorway Swatches with Active Highlights
   - Flying Cart Animation & In-Drawer Order Placement & Tracking
=================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. PRODUCTS DATASET (DISTINCT PRICING & SPECS FOR EACH JACKET)
  const products = [
    {
      id: 'swift-orange',
      name: 'Swift ThermoPuff Apex',
      colorName: 'Solar Ember',
      themeClass: 'theme-orange',
      price: 149,
      originalPrice: 199,
      discount: 'Save 25%',
      tag: 'WINTER 2026 EDITION',
      headline: 'Stand out',
      headlineLight: 'Without trying',
      tagline: 'Confidence, wrapped in warmth',
      description: "It's not just about staying warm, it's about stepping outside and instantly feeling confident, comfortable, and completely yourself. Designed to elevate even the simplest outfit, this jacket wraps you in lightweight warmth.",
      tech: 'Aerogel 850+ Fill',
      image: 'assets/images/jacket_orange.png',
      hex: '#ff6a2b'
    },
    {
      id: 'swift-black',
      name: 'Swift AeroShadow Ghost',
      colorName: 'Stealth Obsidian',
      themeClass: 'theme-black',
      price: 189,
      originalPrice: 249,
      discount: 'Save 24%',
      tag: 'STEALTH LABS EDITION',
      headline: 'Quiet power,',
      headlineLight: 'Unmatched warmth',
      tagline: 'Precision cut, engineered for stealth',
      description: "Matte obsidian finish with stormproof seam sealing and ergonomic baffle architecture. A subtle silhouette engineered to deflect freezing gusts while locking in natural body warmth.",
      tech: 'GORE Windstopper & 850 Down',
      image: 'assets/images/jacket_black.png',
      hex: '#2b2d35'
    },
    {
      id: 'swift-white',
      name: 'Swift Arctic Frost Luxe',
      colorName: 'Glacier Pearl',
      themeClass: 'theme-white',
      price: 169,
      originalPrice: 229,
      discount: 'Save 26%',
      tag: 'ALPINE GLACIER CAPSULE',
      headline: 'Pure elegance,',
      headlineLight: 'Effortless warmth',
      tagline: 'Luminous comfort in sub-zero calm',
      description: "High-sheen pearl finish reflecting winter radiance. Ultra-compressible 850 fill-power responsibly sourced down for cloud-like thermal comfort that transitions seamlessly from chalet to street.",
      tech: 'Hydrophobic Pearl Ripstop',
      image: 'assets/images/jacket_white.png',
      hex: '#cfdbe6'
    },
    {
      id: 'swift-red',
      name: 'Swift Velvet Blaze',
      colorName: 'Crimson Ruby',
      themeClass: 'theme-red',
      price: 159,
      originalPrice: 209,
      discount: 'Save 24%',
      tag: 'HIGH ROLLER LIMITED',
      headline: 'Bold presence,',
      headlineLight: 'Timeless comfort',
      tagline: 'Command attention in every room',
      description: "Vibrant high-contrast crimson with satin luster. Windproof micro-weave that stands out across city skylines while trapping vital core heat during rapid temperature drops.",
      tech: 'Thermal Core Micro-Weave',
      image: 'assets/images/jacket_red.png',
      hex: '#e11d48'
    }
  ];

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
  const collectionTag = document.getElementById('collectionTag');
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

  // CART DRAWER ELEMENTS
  const cartOverlay = document.getElementById('cartOverlay');
  const openCartDrawer = document.getElementById('openCartDrawer');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartCheckoutView = document.getElementById('cartCheckoutView');
  const orderStatusView = document.getElementById('orderStatusView');
  const cartItemImage = document.getElementById('cartItemImage');
  const cartItemTitle = document.getElementById('cartItemTitle');
  const cartItemPrice = document.getElementById('cartItemPrice');
  const cartItemColor = document.getElementById('cartItemColor');
  const cartItemSize = document.getElementById('cartItemSize');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const qtyValue = document.getElementById('qtyValue');
  const summarySubtotal = document.getElementById('summarySubtotal');
  const summaryTotal = document.getElementById('summaryTotal');
  const checkoutForm = document.getElementById('checkoutForm');
  const placeOrderBtn = document.getElementById('placeOrderBtn');
  const orderAnotherBtn = document.getElementById('orderAnotherBtn');
  const cartItemCard = document.getElementById('cartItemCard');
  const removeCartItemBtn = document.getElementById('removeCartItemBtn');
  const cartEmptyState = document.getElementById('cartEmptyState');
  const emptyExploreBtn = document.getElementById('emptyExploreBtn');

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

  // 4. INITIALIZE VISIBLE COLORWAY SWATCHES
  function initColorSwatches() {
    colorSwatchesContainer.innerHTML = '';
    products.forEach((p, idx) => {
      const btn = document.createElement('button');
      btn.className = `color-dot-btn ${idx === currentIndex ? 'active' : ''}`;
      btn.title = `${p.colorName} ($${p.price})`;
      btn.setAttribute('aria-label', p.colorName);

      // Distinct border styling for visibility
      const borderStyle = p.id === 'swift-black' ? 'border: 1px solid rgba(255,255,255,0.4);' : '';
      btn.innerHTML = `<span class="color-dot-fill" style="background: ${p.hex}; ${borderStyle}"></span>`;

      btn.addEventListener('click', () => {
        if (idx !== currentIndex && !isAnimating) {
          switchProduct(idx, idx > currentIndex ? 1 : -1, true);
        }
      });
      colorSwatchesContainer.appendChild(btn);
    });
    swatchActiveName.textContent = products[currentIndex].colorName;
  }

  // 5. CINEMATIC BOTTOM-RIGHT TO HERO TRANSITION & SWITCH LOGIC
  function switchProduct(newIndex, direction = 1, fromSwatch = false) {
    if (isAnimating) return;
    isAnimating = true;

    const currentProd = products[currentIndex];
    const nextProd = products[newIndex];
    currentIndex = newIndex;

    // A. Morph background theme
    body.className = nextProd.themeClass;
    swatchActiveName.textContent = nextProd.colorName;

    // B. Check if transition from bottom-right preview or directional arrow
    if (!fromSwatch && nextPreviewCard) {
      animateFromBottomRightToHero(nextProd);
    } else {
      animateDirectionalSlide(nextProd, direction);
    }
  }

  // ANIMATION TYPE 1: BOTTOM RIGHT THUMBNAIL ANIMATES INTO HERO CENTER
  function animateFromBottomRightToHero(nextProd) {
    const thumbRect = previewThumbImg.getBoundingClientRect();
    const heroRect = mainJacketImg.getBoundingClientRect();

    // Create a smooth flying thumbnail clone
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

    // Fade out current hero jacket
    tl.to(mainJacketImg, {
      scale: 0.8,
      y: -30,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in'
    }, 0);

    // Fade out text slightly
    tl.to([productDesc, heroTagline, currentPrice], {
      opacity: 0.3,
      y: -6,
      duration: 0.2
    }, 0);

    // Animate thumbnail up and into hero stage
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

    // Update editorial text mid-flight
    tl.add(() => {
      updateEditorialContent(nextProd);
    }, 0.25);

    // Restore text
    tl.to([productDesc, heroTagline, currentPrice], {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: 'power2.out'
    }, 0.35);

    // Shadow pulse
    tl.fromTo(jacketShadow, 
      { scale: 0.6, opacity: 0.3 }, 
      { scale: 1, opacity: 0.8, duration: 0.5, ease: 'power2.out' }, 
      0.3
    );
  }

  // ANIMATION TYPE 2: DIRECTION-AWARE SLIDE
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

  // HELPER: UPDATE EDITORIAL TEXT & PREVIEWS
  function updateEditorialContent(prod) {
    currentSlideNum.textContent = `0${currentIndex + 1}`;
    collectionTag.textContent = prod.tag;
    productDesc.textContent = prod.description;
    techTagText.textContent = prod.tech;
    heroTagline.innerHTML = `<span class="quote-line"></span><p>${prod.tagline}</p><span class="quote-line"></span>`;
    jacketColorName.textContent = prod.colorName;
    discountBadge.textContent = prod.discount;
    currentPrice.textContent = `$${prod.price}`;
    originalPrice.textContent = `$${prod.originalPrice}`;

    // Update active swatch dot
    const dots = colorSwatchesContainer.querySelectorAll('.color-dot-btn');
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));

    // Update bottom-right mini preview card (shows the next color in cycle)
    const upcomingIndex = (currentIndex + 1) % products.length;
    const upcomingProd = products[upcomingIndex];
    previewThumbImg.src = upcomingProd.image;
    previewColorTitle.textContent = upcomingProd.colorName;
    if (previewPriceTitle) {
      previewPriceTitle.textContent = `$${upcomingProd.price}`;
    }
  }

  // 6. CAROUSEL NAVIGATION ARROWS (Centered on sides of the jacket)
  nextBtn.addEventListener('click', () => {
    const nextIdx = (currentIndex + 1) % products.length;
    switchProduct(nextIdx, 1, false);
  });

  prevBtn.addEventListener('click', () => {
    const prevIdx = (currentIndex - 1 + products.length) % products.length;
    switchProduct(prevIdx, -1, false);
  });

  // Next Preview Card click (bottom right corner)
  nextPreviewCard.addEventListener('click', () => {
    const nextIdx = (currentIndex + 1) % products.length;
    switchProduct(nextIdx, 1, false);
  });

  // 7. FULL 3D DRAG-TO-ROTATE INTERACTIVE PREVIEW
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

    // Smoothly return to neutral floating position after 2.5s of inactivity
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

  // 8. SIZE SELECTION
  sizePills.forEach(pill => {
    pill.addEventListener('click', () => {
      sizePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedSize = pill.getAttribute('data-size');
      gsap.fromTo(pill, { scale: 0.85 }, { scale: 1.05, duration: 0.25, ease: 'back.out(2)' });
    });
  });

  // 9. ANIMATED FLYING "ADD TO CART" EFFECT & CART DRAWER
  addToCartBtn.addEventListener('click', () => {
    const currentProd = products[currentIndex];
    
    // Update Cart details
    cartItemImage.src = currentProd.image;
    cartItemTitle.textContent = currentProd.name;
    cartItemPrice.textContent = `$${currentProd.price}`;
    cartItemColor.textContent = currentProd.colorName;
    cartItemSize.textContent = selectedSize;
    cartQuantity = 1;
    qtyValue.textContent = cartQuantity;
    updateCartCalculations();

    // Reset view to checkout form and make sure cart card is visible
    cartCheckoutView.style.display = 'flex';
    cartItemCard.style.display = 'flex';
    checkoutForm.style.display = 'flex';
    cartEmptyState.style.display = 'none';
    orderStatusView.style.display = 'none';
    document.getElementById('cartHeaderSubtitle').textContent = 'Complete checkout below';

    // TRIGGER FLYING ANIMATION FROM BUTTON TO TOP RIGHT CART ICON
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

  // 10. CART QUANTITY & TOTAL CALCULATIONS
  function updateCartCalculations() {
    const p = products[currentIndex];
    const total = p.price * cartQuantity;
    if (summarySubtotal) summarySubtotal.textContent = `$${total}.00`;
    if (summaryTotal) summaryTotal.textContent = `$${total}.00`;
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

  // EXPLORE JACKETS FROM EMPTY STATE
  if (emptyExploreBtn) {
    emptyExploreBtn.addEventListener('click', () => {
      cartOverlay.classList.remove('active');
    });
  }

  openCartDrawer.addEventListener('click', () => {
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

  // 11. CHECKOUT FORM ORDER PLACEMENT & LIVE ORDER STATUS
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('custName').value.trim();
    const email = document.getElementById('custEmail').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const city = document.getElementById('custCity').value.trim();
    const house = document.getElementById('custHouse').value.trim();
    const street = document.getElementById('custStreet').value.trim();

    if (!name || !email || !phone || !city || !street) {
      alert('Please fill out all required delivery fields.');
      return;
    }

    const currentProd = products[currentIndex];
    const orderNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `#SJ-${orderNum}`;
    const fullAddress = `${house}, ${street}, ${city}`;
    const totalPrice = currentProd.price * cartQuantity;

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
      status: 'Processing'
    };

    // Save order in localStorage for Admin Panel
    ordersList.unshift(newOrder);
    localStorage.setItem('swift_jackets_orders', JSON.stringify(ordersList));

    // Update Live Status View in Cart
    placedOrderId.textContent = orderId;
    placedOrderStatus.textContent = 'Processing';
    placedOrderRecipient.textContent = name;
    placedOrderAddress.textContent = fullAddress;
    placedOrderContact.textContent = `Phone: ${phone} | ${email}`;
    placedOrderImg.src = currentProd.image;
    placedOrderTitle.textContent = currentProd.name;
    placedOrderDetails.textContent = `Color: ${currentProd.colorName} | Size: ${selectedSize} | Qty: ${cartQuantity}`;
    placedOrderPrice.textContent = `$${totalPrice}.00`;

    // Smooth transition
    gsap.to(cartCheckoutView, {
      opacity: 0,
      duration: 0.25,
      onComplete: () => {
        cartCheckoutView.style.display = 'none';
        orderStatusView.style.display = 'flex';
        orderStatusView.style.opacity = '0';
        document.getElementById('cartHeaderSubtitle').textContent = 'Order Placed & Live Tracking';

        gsap.to(orderStatusView, {
          opacity: 1,
          duration: 0.35
        });

        if (window.lucide) lucide.createIcons();
      }
    });
  });

  orderAnotherBtn.addEventListener('click', () => {
    cartCheckoutView.style.display = 'flex';
    cartCheckoutView.style.opacity = '1';
    orderStatusView.style.display = 'none';
    document.getElementById('cartHeaderSubtitle').textContent = 'Complete checkout below';
    cartOverlay.classList.remove('active');
  });

  // 12. ALL PRODUCTS MODAL / CATALOG
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
            <span class="catalog-card-price">$${p.price}</span>
            <span class="catalog-card-orig">$${p.originalPrice}</span>
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

  // 13. SIGN IN / AUTH MODAL
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

  // 14. ABOUT US MODAL
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

  // KEYBOARD NAVIGATION (Arrows & Escape)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextBtn.click();
    } else if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (e.key === 'Escape') {
      cartOverlay.classList.remove('active');
      authModal.classList.remove('active');
      aboutModal.classList.remove('active');
      allProductsModal.classList.remove('active');
    }
  });

  // INITIALIZE APP
  initColorSwatches();
  updateAuthModalState();
  if (window.lucide) {
    lucide.createIcons();
  }

});
