/* ============================================================
   FAIKA KHAN PORTFOLIO — SHARED JS (nav, scroll, animations)
   ============================================================ */

'use strict';

/* ---- PAGE LOADER ---- */
window.addEventListener('load', () => {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hide'), 400);
  }
});

/* ---- NAVBAR: scroll class + hamburger ---- */
(function initNav() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
      // animate hamburger lines
      const lines = hamburger.querySelectorAll('span');
      if (open) {
        lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        lines[0].style.transform = '';
        lines[1].style.opacity = '';
        lines[2].style.transform = '';
      }
    });

    // close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity = '';
        });
      });
    });
  }

  // Active link highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
  allLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const hrefFile = href.split('/').pop();
    if (hrefFile === currentPath || (currentPath === '' && hrefFile === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ---- CURSOR GLOW ---- */
(function initCursorGlow() {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  let mx = 0, my = 0;
  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  let rafId;
  function animateGlow() {
    glow.style.left = mx + 'px';
    glow.style.top = my + 'px';
    rafId = requestAnimationFrame(animateGlow);
  }
  animateGlow();
})();

/* ---- SCROLL REVEAL ---- */
(function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!targets.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => io.observe(el));
})();

/* ---- SKILL BARS ---- */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.dataset.width + '%';
        io.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => io.observe(bar));
}

/* ---- SKILL CIRCLES ---- */
function initSkillCircles() {
  const circles = document.querySelectorAll('.skill-circle[data-pct]');
  if (!circles.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const pct = parseInt(el.dataset.pct);
        const pctEl = el.querySelector('.skill-circle-pct');
        let current = 0;

        const interval = setInterval(() => {
          current++;
          if (pctEl) pctEl.textContent = current + '%';
          el.style.background = `conic-gradient(#b44a6d 0%, #7b35c4 ${current}%, rgba(255,255,255,0.05) ${current}%)`;
          if (current >= pct) clearInterval(interval);
        }, 20);

        io.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  circles.forEach(c => io.observe(c));
}

/* ---- PROJECT FILTER ---- */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const matches = filter === 'all' || card.dataset.category === filter;
        card.style.display = matches ? '' : 'none';
        if (matches) {
          card.style.animation = 'fadeIn 0.4s ease';
        }
      });
    });
  });
}

/* ---- CONTACT FORM VALIDATION ---- */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  function validateField(input) {
    const group = input.closest('.form-group');
    if (!group) return true;

    const val = input.value.trim();
    const type = input.type;
    let valid = true;
    let msg = '';

    if (input.required && !val) {
      valid = false;
      msg = 'This field is required';
    } else if (type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      valid = false;
      msg = 'Please enter a valid email address';
    } else if (input.name === 'phone' && val && !/^[0-9+\-\s()]{7,15}$/.test(val)) {
      valid = false;
      msg = 'Please enter a valid phone number';
    }

    const errEl = group.querySelector('.form-error');
    if (errEl) errEl.textContent = msg;
    group.classList.toggle('error', !valid);
    return valid;
  }

  // Live validation
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.closest('.form-group').classList.contains('error')) {
        validateField(input);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let allValid = true;

    form.querySelectorAll('input[required], textarea[required]').forEach(input => {
      if (!validateField(input)) allValid = false;
    });

    if (allValid) {
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        const success = document.querySelector('.form-success');
        if (success) success.style.display = 'block';
        form.reset();
        btn.textContent = 'Send Message';
        btn.disabled = false;
        setTimeout(() => { if (success) success.style.display = 'none'; }, 5000);
      }, 1500);
    }
  });
}

/* ---- COUNTER ANIMATION ---- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.ceil(target / 60);
        const interval = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current >= target) clearInterval(interval);
        }, 25);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => io.observe(c));
}

/* ---- TYPEWRITER ---- */
function initTypewriter() {
  const el = document.querySelector('[data-typewrite]');
  if (!el) return;

  const words = JSON.parse(el.dataset.typewrite);
  let wordIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const word = words[wordIdx];
    if (deleting) {
      el.textContent = word.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = word.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = deleting ? 60 : 100;

    if (!deleting && charIdx === word.length) {
      delay = 2000;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      delay = 400;
    }

    setTimeout(tick, delay);
  }

  tick();
}

/* ---- INIT ALL ---- */
document.addEventListener('DOMContentLoaded', () => {
  initSkillBars();
  initSkillCircles();
  initProjectFilter();
  initContactForm();
  initCounters();
  initTypewriter();
});
