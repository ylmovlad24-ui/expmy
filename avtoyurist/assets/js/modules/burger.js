/**
 * Burger menu module
 * Uses event delegation on header for efficiency
 */
var BurgerMenu = (function() {
  'use strict';

  var header = null;
  var burger = null;
  var nav = null;

  function init() {
    header = document.querySelector('.header');
    if (!header) return;

    burger = header.querySelector('.header__burger');
    nav = header.querySelector('.header__nav');

    if (!burger || !nav) return;

    // Single delegated handler on nav
    nav.addEventListener('click', function(e) {
      var link = e.target.closest('.header__link');
      if (link) {
        closeMenu();
      }
    });

    burger.addEventListener('click', function() {
      toggleMenu();
    });
  }

  function toggleMenu() {
    burger.classList.toggle('active');
    nav.classList.toggle('open');
  }

  function closeMenu() {
    burger.classList.remove('active');
    nav.classList.remove('open');
  }

  function isOpen() {
    return nav && nav.classList.contains('open');
  }

  return {
    init: init,
    closeMenu: closeMenu,
    isOpen: isOpen
  };
})();
