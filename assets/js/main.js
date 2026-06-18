/**
 * Drone Light Show - Main JS Controllers
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initScrollSnap();
  initFormValidation();
  initBackToTop();
});

/* Theme Switcher */
function initTheme() {
  const body = document.body;
  
  // Set default theme to dark if not set
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'dark');
  }
  
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
  } else {
    body.classList.remove('dark-theme');
  }

  // Bind to any theme switcher button/icon
  const togglers = document.querySelectorAll('.theme-toggle');
  togglers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      }
      updateThemeButtons();
    });
  });
  updateThemeButtons();
}

function updateThemeButtons() {
  const isDark = document.body.classList.contains('dark-theme');
  const togglers = document.querySelectorAll('.theme-toggle');
  togglers.forEach(btn => {
    btn.innerHTML = isDark 
      ? '<i class="bi bi-sun-fill"></i>' 
      : '<i class="bi bi-moon-stars-fill"></i>';
  });
}


/* RTL Layout Toggler */
function initRTL() {
  const htmlEl = document.documentElement;
  
  if (!localStorage.getItem('rtl')) {
    localStorage.setItem('rtl', 'ltr');
  }

  const currentRTL = localStorage.getItem('rtl');
  if (currentRTL === 'rtl') {
    htmlEl.setAttribute('dir', 'rtl');
    htmlEl.setAttribute('lang', 'ar');
  } else {
    htmlEl.setAttribute('dir', 'ltr');
    htmlEl.setAttribute('lang', 'en');
  }

  const togglers = document.querySelectorAll('.rtl-toggle');
  togglers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (htmlEl.getAttribute('dir') === 'rtl') {
        htmlEl.setAttribute('dir', 'ltr');
        htmlEl.setAttribute('lang', 'en');
        localStorage.setItem('rtl', 'ltr');
      } else {
        htmlEl.setAttribute('dir', 'rtl');
        htmlEl.setAttribute('lang', 'ar');
        localStorage.setItem('rtl', 'rtl');
      }
      updateRTLButtons();
    });
  });
  updateRTLButtons();
}

function updateRTLButtons() {
  const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  const togglers = document.querySelectorAll('.rtl-toggle');
  togglers.forEach(btn => {
    btn.innerHTML = isRTL ? 'LTR' : 'RTL';
  });
}




/* Scroll Snap Slide Dots Indicator (Version E) */
function initScrollSnap() {
  const sections = document.querySelectorAll('.snap-section');
  const dotsContainer = document.getElementById('slideDots');
  if (!sections.length || !dotsContainer) return;
  
  // Clear any existing dots
  dotsContainer.innerHTML = '';
  
  // Create dots dynamically
  sections.forEach((section, idx) => {
    const dot = document.createElement('div');
    dot.className = `slide-dot ${idx === 0 ? 'active' : ''}`;
    dot.dataset.targetIndex = idx;
    dot.title = `Scroll to section ${idx + 1}`;
    
    dot.addEventListener('click', () => {
      section.scrollIntoView({ behavior: 'smooth' });
    });
    
    dotsContainer.appendChild(dot);
  });
  
  // Track scroll position to update dots
  const snapWrapper = window;
  let scrollTimeout;
  
  snapWrapper.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      let currentIdx = 0;
      let minDistance = Infinity;
      
      sections.forEach((section, idx) => {
        const rect = section.getBoundingClientRect();
        const dist = Math.abs(rect.top);
        if (dist < minDistance) {
          minDistance = dist;
          currentIdx = idx;
        }
      });
      
      // Update dots UI
      const dots = dotsContainer.querySelectorAll('.slide-dot');
      dots.forEach((dot, idx) => {
        if (idx === currentIdx) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
      
      // Update numeric index indicator if it exists
      const numericIndicator = document.getElementById('slideIndex');
      if (numericIndicator) {
        numericIndicator.innerText = `0${currentIdx + 1} / 0${sections.length}`;
      }
    }, 50);
  });
}

/* Client Side Form Validation with Tooltips */
function initFormValidation() {
  const forms = document.querySelectorAll('.needs-validation-custom');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
    
    // Add real-time feedback
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.validity.valid) {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
        } else {
          input.classList.remove('is-valid');
          input.classList.add('is-invalid');
        }
      });
    });
  });
}

/* Back to Top Controller */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  const scrollContainer = window;

  scrollContainer.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    if (scrollPos > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
