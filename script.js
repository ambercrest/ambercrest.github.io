/**
 * AmberCrest Services — script.js
 * Handles: mobile nav, navbar scroll effect, FAQ accordion
 */

// ================================
// MOBILE NAVIGATION TOGGLE
// ================================
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu      = document.querySelector('.nav-menu');

if (mobileToggle && navMenu) {
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
  });
}

// ================================
// CLOSE MOBILE MENU ON LINK CLICK
// ================================
if (navMenu) {
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileToggle?.classList.remove('active');
    });
  });
}

// ================================
// NAVBAR SCROLL EFFECT
// ================================
const navbar = document.querySelector('#navbar');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.pageYOffset > 50);
}, { passive: true });

// ================================
// FAQ ACCORDION
// ================================
document.addEventListener('DOMContentLoaded', () => {
  const faqToggles = document.querySelectorAll('.faq-toggle');

  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const faqItem = toggle.parentElement;

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('open');
        }
      });

      // Toggle current item
      faqItem.classList.toggle('open');
    });
  });
});
