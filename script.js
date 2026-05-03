/* ============================================
   ANANSIA WEB — JavaScript
   Navbar scroll · Mobile menu · Scroll animations
   ============================================ */

(function () {
  'use strict';

  /* ── NAV: adiciona classe .scrolled ao rolar ── */
  const nav = document.getElementById('nav');

  function onScroll() {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // estado inicial

  /* ── MENU MOBILE ── */
  const navToggle    = document.getElementById('navToggle');
  const mobileMenu   = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function openMenu() {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    // animação do ícone hambúrguer → X
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }

  function toggleMenu() {
    if (mobileMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  navToggle.addEventListener('click', toggleMenu);
  mobileOverlay.addEventListener('click', closeMenu);

  // Fechar menu ao clicar em um link
  document.querySelectorAll('.mobile-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Fechar menu com Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── SMOOTH SCROLL para links internos ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ── INTERSECTION OBSERVER: animações de entrada ── */
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
        setTimeout(function () {
          el.classList.add('visible');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  // Observar cards de dores e credenciais
  document.querySelectorAll('.dor-card, .cred-card').forEach(function (el) {
    observer.observe(el);
  });

  /* ── LOGO HERO: parar animação quando fora da tela ── */
  const heroLogo = document.getElementById('heroLogo');
  if (heroLogo) {
    const logoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        heroLogo.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
      });
    }, { threshold: 0 });
    logoObserver.observe(heroLogo);
  }

})();