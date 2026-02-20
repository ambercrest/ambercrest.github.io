/**
 * AmberCrest Portfolio — script.js
 * Handles: mobile nav, smooth scroll, navbar scroll effect, fade-in animations, accordion
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
// SMOOTH SCROLLING (anchor links)
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();

    const target = document.querySelector(href);
    const navbar = document.querySelector('#navbar');
    const navH   = navbar ? navbar.offsetHeight : 0;

    if (target) {
      window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
      navMenu?.classList.remove('active');
      mobileToggle?.classList.remove('active');
    }
  });
});

// ================================
// NAVBAR — add shadow on scroll
// ================================
const navbar = document.querySelector('#navbar');

window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.pageYOffset > 50);
}, { passive: true });

// ================================
// INTERSECTION OBSERVER — fade-in cards
// ================================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold:  0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.approach-card, .tech-category, .contact-card')
  .forEach(el => observer.observe(el));

// ================================
// SERVICES ACCORDION
// ================================

// Wait for DOM to be fully ready before wiring up accordion
document.addEventListener('DOMContentLoaded', () => {
  const serviceItems = document.querySelectorAll('.service-item');

  serviceItems.forEach(item => {
    const btn  = item.querySelector('.service-toggle');
    const body = item.querySelector('.service-body');

    if (!btn || !body) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all panels
      serviceItems.forEach(i => {
        i.classList.remove('is-open');
        i.querySelector('.service-toggle').setAttribute('aria-expanded', 'false');
        i.querySelector('.service-body').setAttribute('hidden', '');
      });

      // If this one was closed, open it
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        body.removeAttribute('hidden');
      }
    });
  });
});
