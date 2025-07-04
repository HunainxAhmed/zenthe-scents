// Initialize Swiper with fade effect only if .hero-swiper exists
if (typeof Swiper !== 'undefined' && document.querySelector('.hero-swiper')) {
    const heroSwiperSlides = document.querySelectorAll('.hero-swiper .swiper-slide');
    const heroSwiper = new Swiper('.hero-swiper', {
        loop: heroSwiperSlides.length > 1,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });
}

if (typeof Swiper !== 'undefined' && document.querySelector('.retail-swiper')) {
    const retailSwiperSlides = document.querySelectorAll('.retail-swiper .swiper-slide');
    const retailSwiper = new Swiper('.retail-swiper', {
        loop: retailSwiperSlides.length > 1,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });
}

// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const menuContainer = document.querySelector('.menu-container');

hamburger.addEventListener('click', () => {
    menuContainer.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when scrolling
window.addEventListener('scroll', () => {
    if (menuContainer.classList.contains('active')) {
        menuContainer.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuContainer.contains(e.target) && !hamburger.contains(e.target)) {
        menuContainer.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-links li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuContainer.classList.contains('active')) {
            menuContainer.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Navigation links functionality
const navItems = document.querySelectorAll('.nav-links li');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const section = item.textContent.toLowerCase();
        // Add smooth scrolling to sections when implemented
        console.log(`Navigating to ${section} section`);
        // Close mobile menu after clicking
        hamburger.classList.remove('active');
        menuContainer.classList.remove('active');
    });
});

// CTA Buttons functionality
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.textContent.toLowerCase();
        switch(action) {
            case 'shop now':
                console.log('Redirecting to shop page');
                // Add shop page redirection when implemented
                break;
            case 'learn more':
                console.log('Redirecting to about page');
                // Add about page redirection when implemented
                break;
            case 'explore':
                console.log('Redirecting to collection page');
                // Add collection page redirection when implemented
                break;
        }
    });
});

// Search functionality
const searchForm = document.querySelector('.search-box');
if (searchForm) {
    const searchInput = searchForm.querySelector('input');
    const searchButton = searchForm.querySelector('button');

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        const searchQuery = searchInput.value.trim();
        if (searchQuery) {
            console.log(`Searching for: ${searchQuery}`);
            // Add search functionality when implemented
        }
    });

    // Handle search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchButton.click();
        }
    });
}

// Product Scroll Functionality
const productScrolls = document.querySelectorAll('.product-scroll');
productScrolls.forEach(productScroll => {
    let isDown = false;
    let startX;
    let scrollLeft;
    let startY;
    let isScrolling;

    // Prevent default drag behavior for images
    productScroll.querySelectorAll('.product-card img').forEach(img => {
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    });

    // Mouse events for desktop
    productScroll.addEventListener('mousedown', (e) => {
        isDown = true;
        productScroll.style.cursor = 'grabbing';
        startX = e.pageX - productScroll.offsetLeft;
        scrollLeft = productScroll.scrollLeft;
    });

    productScroll.addEventListener('mouseleave', () => {
        isDown = false;
        productScroll.style.cursor = 'grab';
    });

    productScroll.addEventListener('mouseup', () => {
        isDown = false;
        productScroll.style.cursor = 'grab';
    });

    productScroll.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - productScroll.offsetLeft;
        const walk = (x - startX);
        productScroll.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    productScroll.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
        isScrolling = false;
    }, { passive: true });

    productScroll.addEventListener('touchmove', (e) => {
        if (!startX || !startY) return;
        
        const currentX = e.touches[0].pageX;
        const currentY = e.touches[0].pageY;
        const diffX = Math.abs(currentX - startX);
        const diffY = Math.abs(currentY - startY);

        // Determine if we're scrolling horizontally or vertically
        if (!isScrolling) {
            if (diffX > diffY) {
                isScrolling = 'horizontal';
            } else {
                isScrolling = 'vertical';
            }
        }

        // If we're scrolling vertically, let the default behavior handle it
        if (isScrolling === 'vertical') {
            startX = null;
            startY = null;
        }
    }, { passive: true });

    productScroll.addEventListener('touchend', () => {
        startX = null;
        startY = null;
        isScrolling = false;
    });

    // Prevent default drag behavior
    productScroll.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});

// === CART FUNCTIONALITY (shared across pages) ===
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function updateCartCount() {
  const cart = getCart();
  const cartCount = document.getElementById('cart-count');
  if (cartCount) cartCount.innerText = cart.length;
}
function renderCartOverlay() {
  const cart = getCart();
  const cartItemsDiv = document.getElementById('cart-items');
  if (!cartItemsDiv) return;
  cartItemsDiv.innerHTML = '';
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p style="text-align:center;color:#888;margin-top:2rem;">Your cart is empty.</p>';
  } else {
    cart.forEach((item, idx) => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.image}" class="cart-item-img" alt="${item.name}">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">${item.price}</div>
          <div class="cart-item-qty">
            <button class="qty-btn qty-decrease" data-idx="${idx}" title="Decrease">-</button>
            <span class="qty-value">${item.quantity || 1}</span>
            <button class="qty-btn qty-increase" data-idx="${idx}" title="Increase">+</button>
          </div>
        </div>
        <button class="remove-cart-item" data-idx="${idx}" title="Remove">&times;</button>
      `;
      cartItemsDiv.appendChild(div);
    });
  }
}
function openCart() {
  renderCartOverlay();
  const overlay = document.getElementById('cart-overlay');
  if (overlay) overlay.classList.add('open');
}
function closeCart() {
  const overlay = document.getElementById('cart-overlay');
  if (overlay) overlay.classList.remove('open');
}
function setupCartEvents() {
  const cartBasket = document.getElementById('cart-basket');
  const closeCartBtn = document.getElementById('close-cart');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartItemsDiv = document.getElementById('cart-items');
  if (cartBasket) cartBasket.onclick = openCart;
  if (closeCartBtn) closeCartBtn.onclick = closeCart;
  if (cartOverlay) {
    cartOverlay.addEventListener('click', function(e) {
      if (e.target === this) closeCart();
    });
  }
  if (cartItemsDiv) {
    cartItemsDiv.onclick = function(e) {
      if (e.target.classList.contains('remove-cart-item')) {
        const idx = +e.target.getAttribute('data-idx');
        const cart = getCart();
        cart.splice(idx, 1);
        setCart(cart);
        renderCartOverlay();
        updateCartCount();
      }
      // Handle quantity increase
      if (e.target.classList.contains('qty-increase')) {
        const idx = +e.target.getAttribute('data-idx');
        const cart = getCart();
        cart[idx].quantity = (cart[idx].quantity || 1) + 1;
        setCart(cart);
        renderCartOverlay();
        updateCartCount();
      }
      // Handle quantity decrease
      if (e.target.classList.contains('qty-decrease')) {
        const idx = +e.target.getAttribute('data-idx');
        const cart = getCart();
        if ((cart[idx].quantity || 1) > 1) {
          cart[idx].quantity -= 1;
          setCart(cart);
          renderCartOverlay();
          updateCartCount();
        } else {
          // Stylish SweetAlert2 confirmation before removing the last item
          Swal.fire({
            title: `Remove from cart?`,
            html: `<b>${cart[idx].name}</b> will be removed from your cart.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d4af37',
            cancelButtonColor: '#888',
            confirmButtonText: 'Yes, remove it',
            cancelButtonText: 'Cancel',
            customClass: {
              popup: 'swal2-cart-popup',
              confirmButton: 'swal2-cart-confirm',
              cancelButton: 'swal2-cart-cancel'
            }
          }).then((result) => {
            if (result.isConfirmed) {
              cart.splice(idx, 1);
              setCart(cart);
              renderCartOverlay();
              updateCartCount();
            }
          });
        }
      }
    };
  }
}
function setupAddToCartButtons() {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.onclick = function() {
      const card = btn.closest('.product-card');
      if (!card) return;
      const name = card.querySelector('h3').innerText;
      const price = card.querySelector('.price').innerText;
      const image = card.querySelector('img').src;
      let cart = getCart();
      // Check if already in cart (by name)
      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }
      setCart(cart);
      updateCartCount();
      renderCartOverlay();
      // Show Toastify notification instead of opening cart
      Toastify({
        text: `<b>${name}</b> added to cart!`,
        duration: 2500,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(90deg, #d4af37 0%, #fffbe6 100%)",
        stopOnFocus: true,
        escapeMarkup: false,
        style: {
          color: "#1a1a1a",
          fontWeight: "600",
          borderRadius: "12px",
          boxShadow: "0 4px 24px rgba(212,175,55,0.18)",
          fontFamily: "'Poppins', 'Serena', sans-serif",
          fontSize: "1.05rem",
          padding: "1.1rem 2rem",
          maxWidth: "90vw",
          minWidth: "220px",
          textAlign: "center"
        },
        avatar: image
      }).showToast();
      // Do NOT openCart();
    };
  });
}
// Initialize cart logic on DOMContentLoaded
function initCart() {
  updateCartCount();
  setupCartEvents();
  setupAddToCartButtons();
}
document.addEventListener('DOMContentLoaded', initCart);

// HAMBURGER MENU

document.querySelectorAll('.details').forEach(btn => {
  btn.onclick = function() {
    window.location.href = 'product-detail.html';
  };
});

