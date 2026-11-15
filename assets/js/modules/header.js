/**
 * Header Mega Menu Module
 * Handles desktop mega-menu hover/click and mobile accordion
 */
(function () {
  'use strict';

  // Desktop mega-menu
  var dropdowns = document.querySelectorAll('.header__nav-dropdown');
  var navLinks = document.querySelectorAll('.header__nav-link');

  // Mobile
  var burger = document.querySelector('.header__burger');
  var menuPanel = document.querySelector('.header__menu-panel');
  var menuOverlay = document.querySelector('.header__menu-overlay');
  var accordions = document.querySelectorAll('.header__menu-accordion');
  var menuLinks = document.querySelectorAll('.header__menu-link');

  // ===== DESKTOP MEGA MENU =====

  // Close all dropdowns
  function closeAllDropdowns() {
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

  // Hover events for desktop
  dropdowns.forEach(function (dropdown) {
    var toggle = dropdown.querySelector('.header__nav-link--dropdown');

    // Hover to open
    dropdown.addEventListener('mouseenter', function () {
      openDropdown(dropdown);
    });

    // Click to toggle
    if (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        if (dropdown.classList.contains('is-open')) {
          closeAllDropdowns();
        } else {
          openDropdown(dropdown);
        }
      });
    }

    // Close on mouse leave
    dropdown.addEventListener('mouseleave', function () {
      closeAllDropdowns();
    });
  });

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

  // ===== MOBILE BURGER MENU =====

  if (burger && menuPanel && menuOverlay) {
    var isOpen = false;
    var previousFocus = null;

    function openMenu() {
      isOpen = true;
      previousFocus = document.activeElement;

      burger.classList.add('active');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Закрыть меню');
      menuPanel.classList.add('active');
      menuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Focus first link
      setTimeout(function () {
        var firstLink = menuPanel.querySelector('a, button');
        if (firstLink) firstLink.focus();
      }, 100);
    }

    function closeMenu() {
      isOpen = false;

      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Открыть меню');
      menuPanel.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';

      if (burger) burger.focus();
    }

    function toggleMenu() {
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    // Burger click
    burger.addEventListener('click', function (e) {
      e.preventDefault();
      toggleMenu();
    });

    // Overlay click
    menuOverlay.addEventListener('click', function () {
      closeMenu();
    });

    // Menu links close menu
    menuLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });
  }

  // ===== MOBILE ACCORDION =====

  accordions.forEach(function (accordion) {
    var toggle = accordion.querySelector('.header__menu-accordion__toggle');

    if (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();

        // Close other accordions
        accordions.forEach(function (other) {
          if (other !== accordion) {
            other.classList.remove('open');
            var otherToggle = other.querySelector('.header__menu-accordion__toggle');
            if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current
        var isOpen = accordion.classList.contains('open');
        if (isOpen) {
          accordion.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        } else {
          accordion.classList.add('open');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // ===== ACTIVE STATE =====

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
      openMenu: openMenu,
      closeMenu: closeMenu,
      toggleMenu: toggleMenu,
    };
  }
})();
