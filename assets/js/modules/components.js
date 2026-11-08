/**
 * Компоненты шапки и подвала
 * Загружает header.html и footer.html на все страницы
 */
(function() {
  'use strict';

  // Определяем базовый путь в зависимости от глубины страницы
  function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/pages/services/')) return '../../../';
    if (path.includes('/pages/')) return '../';
    return '';
  }

  // Загрузка HTML-компонента
  async function loadComponent(filePath, containerId) {
    try {
      const basePath = getBasePath();
      const url = basePath + 'components/' + filePath;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to load ' + filePath);
      const html = await response.text();
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = html;
        // Инициализируем обработчики после вставки
        if (filePath === 'header.html') {
          initHeader();
        }
      }
    } catch (error) {
      console.warn('Component load error:', error);
    }
  }

  // Инициализация шапки (бургер-меню, дропдауны)
  function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    const burger = header.querySelector('.header__burger');
    const overlay = header.querySelector('.header__overlay');
    const panel = header.querySelector('.header__mobile-panel');

    // Бургер-меню
    if (burger && overlay && panel) {
      burger.addEventListener('click', function() {
        const isOpen = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', !isOpen);
        header.classList.toggle('header--menu-open', !isOpen);
      });

      overlay.addEventListener('click', function() {
        burger.setAttribute('aria-expanded', 'false');
        header.classList.remove('header--menu-open');
      });
    }

    // Мобильные дропдауны
    const mobileToggles = header.querySelectorAll('.header__mobile-toggle');
    mobileToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const menu = this.nextElementSibling;
        if (menu) {
          menu.classList.toggle('header__dropdown-menu--open');
        }
      });
    });

    // Десктопные дропдауны по ховеру
    const dropdowns = header.querySelectorAll('.header__dropdown');
    dropdowns.forEach(function(dropdown) {
      const toggle = dropdown.querySelector('.header__dropdown-toggle');
      const menu = dropdown.querySelector('.header__dropdown-menu');
      if (toggle && menu && !dropdown.classList.contains('header__dropdown--mobile')) {
        dropdown.addEventListener('mouseenter', function() {
          menu.style.display = 'block';
        });
        dropdown.addEventListener('mouseleave', function() {
          menu.style.display = 'none';
        });
      }
    });
  }

  // Загружаем header и footer при готовности DOM
  document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header.html', 'header-container');
    loadComponent('footer.html', 'footer-container');
  });

})();
