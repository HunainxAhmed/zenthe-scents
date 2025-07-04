// Register ScrollTrigger plugin
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Subtle scroll animations
  function initScrollAnimations() {
      // Promote section - alternating slide in
      gsap.utils.toArray('.promote-item').forEach((item, i) => {
          gsap.from(item, {
              scrollTrigger: {
                  trigger: item,
                  start: 'top 80%',
                  toggleActions: 'play none none none'
              },
              x: i % 2 === 0 ? -50 : 50,
              opacity: 0,
              duration: 1.2,
              ease: "power2.out"
          });
      });

      // Badges - fade in with slight upward movement
      gsap.from('.badge-item', {
          scrollTrigger: {
              trigger: '.badges',
              start: 'top 80%',
              toggleActions: 'play none none none'
          },
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out"
      });

      // Product cards - subtle fade in
      gsap.from('.product-card', {
          scrollTrigger: {
              trigger: '.product-section',
              start: 'top 80%',
              toggleActions: 'play none none none'
          },
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out"
      });

      // Retail items - fade in
      gsap.from('.retail-item', {
          scrollTrigger: {
              trigger: '.retail',
              start: 'top 80%',
              toggleActions: 'play none none none'
          },
          opacity: 0,
          duration: 1,
          ease: "power2.out"
      });
  }

  // Initialize animations when DOM is loaded
  document.addEventListener('DOMContentLoaded', initScrollAnimations);

  // Loading screen fade out for index.html
  window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      gsap.to(loadingScreen, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          loadingScreen.style.display = 'none';
          document.body.classList.remove('no-scroll');
        }
      });
    }
  });
}
