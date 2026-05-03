/* ============================================
   ANANSIA WEB — JavaScript
   Navbar scroll · Mobile menu · Scroll animations
   ============================================ */

(function () {
  'use strict';

  /* ── NAV: adiciona .scrolled ao rolar ── */
  var nav = document.getElementById('nav');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── MENU MOBILE ── */
  var navToggle     = document.getElementById('navToggle');
  var mobileMenu    = document.getElementById('mobileMenu');
  var mobileOverlay = document.getElementById('mobileOverlay');

  function openMenu() {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    var spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    var spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }

  navToggle.addEventListener('click', function () {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  mobileOverlay.addEventListener('click', closeMenu);

  document.querySelectorAll('.mobile-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── SMOOTH SCROLL para âncoras internas ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ── INTERSECTION OBSERVER: animações de entrada ── */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el    = entry.target;
      var delay = parseInt(el.dataset.delay) || 0;
      setTimeout(function () { el.classList.add('visible'); }, delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.dor-card, .cred-card').forEach(function (el) {
    observer.observe(el);
  });

  /* ── LOGO HERO: pausa animação quando fora da tela ── */
  var heroLogo = document.getElementById('heroLogo');
  if (heroLogo) {
    new IntersectionObserver(function (entries) {
      heroLogo.style.animationPlayState = entries[0].isIntersecting ? 'running' : 'paused';
    }, { threshold: 0 }).observe(heroLogo);
  }

})();