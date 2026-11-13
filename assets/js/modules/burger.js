/**
 * Burger Menu Module - Полностью переписанная версия
 * WCAG 2.4.3: Focus trap and focus restoration
 * WCAG 4.1.2: aria-expanded on burger button
 * WCAG 2.1.1: Keyboard navigation within menu
 */
(function() {
  'use strict';

  var burger = null;
  var menuPanel = null;
  var menuOverlay = null;
  var isOpen = false;
  var previousFocus = null;

  // Trap focus within menu
  function trapFocus(e) {
    if (!isOpen) return;

    var focusableElements = menuPanel.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    var firstFocusable = focusableElements[0];
    var lastFocusable = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift+Tab — if on first element, wrap to last
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab — if on last element, wrap to first
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  }

  // Announce to screen readers
  function announceToScreenReader(message) {
    var announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(function() {
      document.body.removeChild(announcement);
    }, 1000);
  }

  function init() {
    burger = document.querySelector('.header__burger');
    menuPanel = document.querySelector('.header__menu-panel');
    menuOverlay = document.querySelector('.header__menu-overlay');

    if (!burger || !menuPanel || !menuOverlay) {
      console.warn('Burger menu elements not found');
      return;
    }

    // Initialize aria-expanded
    burger.setAttribute('aria-expanded', 'false');
    menuPanel.setAttribute('aria-hidden', 'true');

    // Click on burger to toggle
    burger.addEventListener('click', function(e) {
      e.preventDefault();
      toggleMenu();
    });

    // Click on overlay to close
    menuOverlay.addEventListener('click', function() {
      closeMenu();
    });

    // Close on link click
    var menuLinks = menuPanel.querySelectorAll('.header__link');
    menuLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        closeMenu();
      }
    });

    // Focus trap
    document.addEventListener('keydown', trapFocus);

    // Close on window resize to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 1024 && isOpen) {
        closeMenu();
      }
    });
  }

  function openMenu() {
    isOpen = true;
    previousFocus = document.activeElement;
    
    burger.classList.add('active');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Закрыть меню');
    menuPanel.classList.add('active');
    menuOverlay.classList.add('active');
    menuPanel.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus trap — move focus to first link/button in menu
    var firstLink = menuPanel.querySelector('a, button, [tabindex]');
    if (firstLink) {
      setTimeout(function() {
        firstLink.focus();
      }, 100);
    }
    
    // Announcement for screen readers
    announceToScreenReader('Меню навигации открыто');
  }

  function closeMenu() {
    isOpen = false;
    
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Открыть меню');
    menuPanel.classList.remove('active');
    menuOverlay.classList.remove('active');
    menuPanel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Restore focus to burger button
    if (burger) {
      burger.focus();
    }
    
    // Close all dropdowns
    var openDropdowns = menuPanel.querySelectorAll('.header__menu-dropdown.open');
    openDropdowns.forEach(function(dropdown) {
      dropdown.classList.remove('open');
      var toggle = dropdown.querySelector('.header__menu-dropdown-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
    
    // Announcement for screen readers
    announceToScreenReader('Меню навигации закрыто');
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
