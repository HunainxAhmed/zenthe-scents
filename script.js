// Initialize Swiper
const heroSwiper = new Swiper('.hero-swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    }
});

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
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
        navLinks.classList.remove('active');
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