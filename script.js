// Initialize hero swiper
const heroSwiper = new Swiper('.hero-swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }
});

// Initialize retail swiper
const retailSwiper = new Swiper('.retail-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        769: {
            enabled: false,
        }
    }
});

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
const navLinks = document.querySelectorAll('.nav-links li');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuContainer.classList.remove('active');
        hamburger.classList.remove('active');
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

// Product Scroll Functionality
const productScroll = document.querySelector('.product-scroll');
let isDown = false;
let startX;
let scrollLeft;
let startY;
let isScrolling;

// Prevent default drag behavior for images
document.querySelectorAll('.product-card img').forEach(img => {
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
});

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
});

productScroll.addEventListener('touchend', () => {
    startX = null;
    startY = null;
    isScrolling = false;
});

// Prevent default drag behavior
productScroll.addEventListener('dragstart', (e) => {
    e.preventDefault();
});