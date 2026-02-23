/* ============================================================
   HONEYTWO — Main JavaScript
   Mobile menu · Scroll header · Fade-in · Counters · Filter · Form
   ============================================================ */

(function () {
  'use strict';

  /* ── Mobile Hamburger Menu ────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on nav link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (
        mobileNav.classList.contains('open') &&
        !mobileNav.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Scroll-aware Header ──────────────────────────────── */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ── Fade-in on Scroll (IntersectionObserver) ─────────── */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach((el) => io.observe(el));
  } else {
    // Fallback: make everything visible immediately
    fadeEls.forEach((el) => el.classList.add('visible'));
  }

  /* ── Animated Counters ────────────────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;
    const duration = 1600;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll('.count[data-target]');
  if (counters.length && 'IntersectionObserver' in window) {
    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => counterIO.observe(c));
  } else {
    counters.forEach((c) => {
      c.textContent = c.dataset.target;
    });
  }

  /* ── Brand Portfolio Filter (brands.html) ─────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  const brandCards = document.querySelectorAll('.brand-card[data-category]');

  if (filterBtns.length && brandCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active state
        filterBtns.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Show / hide cards
        brandCards.forEach((card) => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ── Contact Form Validation ──────────────────────────── */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const fields = {
      company: {
        el: document.getElementById('company'),
        err: document.getElementById('company-error'),
        validate: (v) => v.trim().length >= 2,
      },
      country: {
        el: document.getElementById('country'),
        err: document.getElementById('country-error'),
        validate: (v) => v !== '',
      },
      name: {
        el: document.getElementById('name'),
        err: document.getElementById('name-error'),
        validate: (v) => v.trim().length >= 2,
      },
      email: {
        el: document.getElementById('email'),
        err: document.getElementById('email-error'),
        validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      },
      message: {
        el: document.getElementById('message'),
        err: document.getElementById('message-error'),
        validate: (v) => v.trim().length >= 10,
      },
    };

    function setFieldState(field, valid) {
      if (!field.el || !field.err) return;
      if (valid) {
        field.el.classList.remove('error');
        field.err.classList.remove('visible');
      } else {
        field.el.classList.add('error');
        field.err.classList.add('visible');
      }
    }

    // Live validation on blur
    Object.values(fields).forEach((field) => {
      if (!field.el) return;
      field.el.addEventListener('blur', () => {
        setFieldState(field, field.validate(field.el.value));
      });
      field.el.addEventListener('input', () => {
        if (field.el.classList.contains('error')) {
          setFieldState(field, field.validate(field.el.value));
        }
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let allValid = true;
      Object.values(fields).forEach((field) => {
        if (!field.el) return;
        const valid = field.validate(field.el.value);
        setFieldState(field, valid);
        if (!valid) allValid = false;
      });

      if (!allValid) {
        // Scroll to first error
        const firstError = contactForm.querySelector('.form-input.error, .form-select.error, .form-textarea.error');
        if (firstError) firstError.focus();
        return;
      }

      // Success state (static site — no backend)
      const submitBtn = contactForm.querySelector('.form-submit');
      const successMsg = document.getElementById('form-success');

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Inquiry';
        if (successMsg) {
          successMsg.classList.add('visible');
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        // Hide success after 8 seconds
        setTimeout(() => {
          if (successMsg) successMsg.classList.remove('visible');
        }, 8000);
      }, 800);
    });
  }

  /* ── Smooth scroll for anchor links ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ═════════════════════════════════════════════════════════
     NEW MODULES FOR REDESIGN (K-Beauty)
     ═════════════════════════════════════════════════════════ */

  /* ── Carousel Pause on Hover/Focus ──────────────────────– */
  const carouselTrack = document.getElementById('marquee-track');
  if (carouselTrack) {
    const wrapper = carouselTrack.closest('.carousel-wrapper');
    if (wrapper) {
      wrapper.addEventListener('mouseenter', () => {
        carouselTrack.style.animationPlayState = 'paused';
      });
      wrapper.addEventListener('mouseleave', () => {
        carouselTrack.style.animationPlayState = 'running';
      });
      wrapper.addEventListener('focusin', () => {
        carouselTrack.style.animationPlayState = 'paused';
      });
      wrapper.addEventListener('focusout', () => {
        carouselTrack.style.animationPlayState = 'running';
      });
    }
  }

  /* ── Showcase Pill Filter ──────────────────────────────– */
  const showcasePills = document.querySelectorAll('.pill[data-filter]');
  const showcaseTiles = document.querySelectorAll('.showcase-tile[data-cat]');
  if (showcasePills.length) {
    showcasePills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const filter = pill.dataset.filter;

        // Update active state
        showcasePills.forEach((p) => {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');

        // Show/hide tiles using opacity
        showcaseTiles.forEach((tile) => {
          const match = filter === 'all' || tile.dataset.cat === filter;
          tile.style.opacity = match ? '1' : '0.25';
          tile.style.pointerEvents = match ? '' : 'none';
        });
      });
    });
  }

})();
