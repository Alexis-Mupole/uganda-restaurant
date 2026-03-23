/* ========================================
   uganda RESTAURANT - Global JavaScript
   ======================================== */

// Mobile Menu Toggle
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!mobileMenuBtn || !mobileMenu) return;
  
  const menuOpen = mobileMenuBtn.querySelector('.menu-open');
  const menuClose = mobileMenuBtn.querySelector('.menu-close');
  
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('active');
    menuOpen.classList.toggle('hidden');
    menuClose.classList.toggle('hidden');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close menu when clicking on links
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('active');
      menuOpen.classList.remove('hidden');
      menuClose.classList.add('hidden');
      document.body.style.overflow = '';
    });
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('active');
      menuOpen.classList.remove('hidden');
      menuClose.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });
}

// Scroll to Section
function scrollToSection(href, offset = 80) {
  const element = document.querySelector(href);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        scrollToSection(href);
      }
    });
  });
}

// Navbar Scroll Effect
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
}

// Form Handling
function initForms() {
  // Reservation Form
  const reservationForm = document.getElementById('reservationForm');
  if (reservationForm) {
    reservationForm.addEventListener('submit', handleReservationSubmit);
    
    // Set minimum date to today
    const dateInput = reservationForm.querySelector('input[name="date"]');
    if (dateInput) {
      dateInput.min = new Date().toISOString().split('T')[0];
    }
  }
  
  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
}

function handleReservationSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const successMessage = document.getElementById('reservationSuccess');
  
  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Confirming...';
  submitBtn.disabled = true;
  
  // Simulate API call
  setTimeout(() => {
    form.classList.add('hidden');
    successMessage.classList.remove('hidden');
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
}

function handleContactSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const successMessage = document.getElementById('contactSuccess');
  
  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = 'Sending...';
  submitBtn.disabled = true;
  
  // Simulate API call
  setTimeout(() => {
    form.classList.add('hidden');
    successMessage.classList.remove('hidden');
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 1500);
}

// Reset Reservation Form
function resetReservationForm() {
  const form = document.getElementById('reservationForm');
  const successMessage = document.getElementById('reservationSuccess');
  
  if (form && successMessage) {
    form.classList.remove('hidden');
    form.reset();
    successMessage.classList.add('hidden');
  }
}

// Reset Contact Form
function resetContactForm() {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('contactSuccess');
  
  if (form && successMessage) {
    form.classList.remove('hidden');
    form.reset();
    successMessage.classList.add('hidden');
  }
}

// Intersection Observer for Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements with data-animate attribute
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
}

// Lightbox for Gallery
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item[data-lightbox]');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        openLightbox(img.src, img.alt);
      }
    });
  });
}

function openLightbox(src, alt) {
  // Create lightbox overlay
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    cursor: pointer;
  `;
  
  // Create image
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.style.cssText = `
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
  `;
  
  overlay.appendChild(img);
  document.body.appendChild(overlay);
  
  // Close on click
  overlay.addEventListener('click', () => {
    document.body.removeChild(overlay);
  });
  
  // Close on escape
  const closeOnEscape = (e) => {
    if (e.key === 'Escape') {
      document.body.removeChild(overlay);
      document.removeEventListener('keydown', closeOnEscape);
    }
  };
  document.addEventListener('keydown', closeOnEscape);
}

// Newsletter Form
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = form.querySelector('input[type="email"]').value;
      const successEl = form.parentElement.querySelector('.newsletter-success');
      
      if (email) {
        // Show success message
        if (successEl) {
          successEl.classList.remove('hidden');
          form.querySelector('input').value = '';
          
          setTimeout(() => {
            successEl.classList.add('hidden');
          }, 3000);
        }
      }
    });
  });
}

// Lazy Load Images
function initLazyLoad() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Tabs for Menu
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      btn.classList.add('active');
      const targetContent = document.getElementById(tabId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSmoothScroll();
  initNavbarScroll();
  initForms();
  initScrollAnimations();
  initNewsletter();
  initLazyLoad();
  initTabs();
  
  // Add loaded class to body for CSS transitions
  document.body.classList.add('loaded');
});

// Export functions for global access
window.ugandaRestaurant = {
  scrollToSection,
  resetReservationForm,
  resetContactForm,
  openLightbox
};
