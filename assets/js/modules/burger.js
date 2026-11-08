/**
 * Burger Menu Module - Полностью переписанная версия
 * Работает на планшетах и мобильных устройствах (≤1024px)
 */
(function() {
  'use strict';

  var burger = null;
  var menuPanel = null;
  var menuOverlay = null;
  var isOpen = false;

  function init() {
    burger = document.querySelector('.header__burger');
    menuPanel = document.querySelector('.header__menu-panel');
    menuOverlay = document.querySelector('.header__menu-overlay');

    if (!burger || !menuPanel || !menuOverlay) {
      console.warn('Burger menu elements not found');
      return;
    }

    // Click on burger to toggle
    burger.addEventListener('click', function(e) {
      e.preventDefault();
      toggleMenu();
    });

    // Click on overlay to close
    menuOverlay.addEventListener('click', function() {
      closeMenu();
    });

    // Click on dropdown toggle to expand/collapse
    var dropdownToggles = menuPanel.querySelectorAll('.header__menu-dropdown-toggle');
    dropdownToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var dropdown = toggle.closest('.header__menu-dropdown');
        if (dropdown) {
          dropdown.classList.toggle('open');
        }
      });
    });

    // Close on link click
    var menuLinks = menuPanel.querySelectorAll('.header__menu-dropdown-item a, .header__menu-nav > .header__link');
    menuLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    });

    // Close on window resize to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 1024 && isOpen) {
        closeMenu();
      }
    });
  }

  function openMenu() {
    isOpen = true;
    burger.classList.add('active');
    burger.setAttribute('aria-label', 'Закрыть меню');
    menuPanel.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    isOpen = false;
    burger.classList.remove('active');
    burger.setAttribute('aria-label', 'Открыть меню');
    menuPanel.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Close all dropdowns
    var openDropdowns = menuPanel.querySelectorAll('.header__menu-dropdown.open');
    openDropdowns.forEach(function(dropdown) {
      dropdown.classList.remove('open');
    });
  }

  function toggleMenu() {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Export to global
  if (typeof window.BurgerMenu !== 'undefined') {
    console.warn('BurgerMenu module already loaded');
  } else {
    window.BurgerMenu = {
      init: init,
      openMenu: openMenu,
      closeMenu: closeMenu,
      toggleMenu: toggleMenu,
      isOpen: function() { return isOpen; }
    };
  }
})();
