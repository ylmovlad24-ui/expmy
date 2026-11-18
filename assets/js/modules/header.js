/**
 * Header Mega Menu Module
 * Handles desktop mega-menu hover/click and mobile accordion
 */
(function () {
  'use strict';

  // ===== DESKTOP MEGA MENU =====

  // Close all dropdowns
  function closeAllDropdowns() {
    var dropdowns = document.querySelectorAll('.header__nav-dropdown');
    dropdowns.forEach(function (dropdown) {
      dropdown.classList.remove('is-open');
      var toggle = dropdown.querySelector('.header__nav-link--dropdown');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  }

  // Open dropdown
  function openDropdown(dropdown) {
    closeAllDropdowns();
    dropdown.classList.add('is-open');
    var toggle = dropdown.querySelector('.header__nav-link--dropdown');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.header__nav-dropdown')) {
      closeAllDropdowns();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAllDropdowns();
    }
  });

  // ===== ACTIVE STATE =====

  var navLinks = document.querySelectorAll('.header__nav-link');
  function setActiveLink() {
    var currentPath = window.location.pathname;
    // Remove trailing slash
    currentPath = currentPath.replace(/\/$/, '');
    if (currentPath === '') currentPath = '/';

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href !== '#' && href !== 'tel:+79059830969') {
        // Normalize href
        var normalizedHref = href.replace(/\/$/, '');
        if (normalizedHref === '') normalizedHref = '/';

        if (normalizedHref === currentPath || currentPath.indexOf(normalizedHref) === 0) {
          link.classList.add('header__nav-link--active');
        }
      }
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setActiveLink);
  } else {
    setActiveLink();
  }

  // ===== HEADER SCROLL EFFECT =====

  var header = document.querySelector('.header');
  if (header) {
    var lastScroll = 0;

    window.addEventListener('scroll', function () {
      var currentScroll = window.pageYOffset;

      if (currentScroll > 10) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ===== EXPORT =====
  if (typeof window.HeaderMenu === 'undefined') {
    window.HeaderMenu = {
      openDropdown: openDropdown,
      closeAllDropdowns: closeAllDropdowns,
    };
  }
})();
