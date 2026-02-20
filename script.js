/**
 * AmberCrest Portfolio — script.js
 * Handles: mobile nav, smooth scroll, navbar scroll effect, fade-in animations
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

    const target  = document.querySelector(href);
    const navbar  = document.querySelector('#navbar');
    const navH    = navbar ? navbar.offsetHeight : 0;

    if (target) {
      window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });

      // Close mobile menu after navigating
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
      observer.unobserve(entry.target); // only animate once
    }
  });
}, {
  threshold:  0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Observe all animated elements
document.querySelectorAll('.approach-card, .tech-category, .contact-card')
  .forEach(el => observer.observe(el));

// ================================
// SERVICES ACCORDION
// ================================
document.querySelectorAll('.service-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.service-item');
    const body = item.querySelector('.service-body');
    const isOpen = !body.hidden;

    // Close all open items first
    document.querySelectorAll('.service-item').forEach(i => {
      i.querySelector('.service-body').hidden = true;
      i.querySelector('.service-toggle').setAttribute('aria-expanded', 'false');
      i.classList.remove('is-open');
    });

    // If it wasn't open, open it now
    if (!isOpen) {
      body.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      item.classList.add('is-open');
    }
  });
});
