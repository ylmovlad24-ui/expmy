/**
 * Компоненты шапки и подвала
 * Загружает header.html и footer.html на все страницы
 */
(function() {
  'use strict';

  // Определяем базовый путь в зависимости от глубины страницы
  function getBasePath() {
    var path = window.location.pathname;
    if (path.indexOf('/pages/services/') !== -1) return '../../../';
    if (path.indexOf('/pages/') !== -1) return '../';
    return '';
  }

  // Загрузка HTML-компонента
  function loadComponent(filePath, containerId) {
    var basePath = getBasePath();
    var url = basePath + 'components/' + filePath;
    
    fetch(url)
      .then(function(response) {
        if (!response.ok) throw new Error('Failed to load ' + filePath);
        return response.text();
      })
      .then(function(html) {
        var container = document.getElementById(containerId);
        if (container) {
          container.innerHTML = html;
          // Инициализируем обработчики после вставки
          if (filePath === 'header.html') {
            initHeader();
          }
        }
      })
      .catch(function(error) {
        console.warn('Component load error:', error);
      });
  }

  // Инициализация шапки (бургер-меню, дропдауны)
  function initHeader() {
    var header = document.querySelector('.header');
    if (!header) return;

    var burger = header.querySelector('.header__burger');
    var overlay = header.querySelector('.header__menu-overlay');
    var panel = header.querySelector('.header__menu-panel');

    // Бургер-меню
    if (burger && overlay && panel) {
      burger.addEventListener('click', function() {
        var isOpen = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', !isOpen);
        
        if (!isOpen) {
          // Открываем меню
          burger.classList.add('active');
          overlay.style.display = 'block';
          panel.style.display = 'block';
          
          // Анимация
          setTimeout(function() {
            overlay.classList.add('active');
            panel.classList.add('active');
          }, 10);
        } else {
          // Закрываем меню
          burger.classList.remove('active');
          overlay.classList.remove('active');
          panel.classList.remove('active');
          
          setTimeout(function() {
            overlay.style.display = 'none';
            panel.style.display = 'none';
          }, 300);
        }
      });

      // Закрытие по клику на overlay
      overlay.addEventListener('click', function() {
        burger.setAttribute('aria-expanded', 'false');
        burger.classList.remove('active');
        overlay.classList.remove('active');
        panel.classList.remove('active');
        
        setTimeout(function() {
          overlay.style.display = 'none';
          panel.style.display = 'none';
        }, 300);
      });
    }

    // Мобильные дропдауны
    var mobileToggles = header.querySelectorAll('.header__menu-dropdown-toggle');
    mobileToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var dropdown = this.parentElement;
        if (dropdown) {
          dropdown.classList.toggle('open');
        }
      });
    });
  }

  // Загружаем header и footer при готовности DOM
  document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header.html', 'header-container');
    loadComponent('footer.html', 'footer-container');
  });

})();
