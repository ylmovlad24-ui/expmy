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
    if (path.indexOf('/vnesudebnaya/') !== -1) return '../';
    if (path.indexOf('/recenziya/') !== -1) return '../';
    if (path.indexOf('/sudebnaya/') !== -1) return '../';
    if (path.indexOf('/faq/') !== -1) return '../';
    if (path.indexOf('/avtotehnicheskaya/') !== -1) {
      var depth = (path.match(/\//g) || []).length;
      return depth >= 3 ? '../../' : '../';
    }
    if (path.indexOf('/avtotovarovedcheskaya/') !== -1) {
      var depth2 = (path.match(/\//g) || []).length;
      return depth2 >= 3 ? '../../' : '../';
    }
    if (path.indexOf('/ceny/') !== -1) return '../';
    if (path.indexOf('/diplomy/') !== -1) return '../';
    if (path.indexOf('/dosudebnye-dlya-yurfirmy/') !== -1) return '../';
    if (path.indexOf('/eksperty/') !== -1) return '../';
    if (path.indexOf('/keysy/') !== -1) return '../';
    if (path.indexOf('/kontakty/') !== -1) return '../';
    if (path.indexOf('/o-kompanii/') !== -1) return '../';
    if (path.indexOf('/oferta/') !== -1) return '../';
    if (path.indexOf('/partners/') !== -1) return '../';
    if (path.indexOf('/politika/') !== -1) return '../';
    if (path.indexOf('/recenzii-dlya-yuristov/') !== -1) return '../';
    if (path.indexOf('/spasibo/') !== -1) return '../';
    if (path.indexOf('/tovarovedcheskaya-b2b/') !== -1) return '../';
    if (path.indexOf('/uzly-i-agregaty/') !== -1) return '../';
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
          // Адаптируем абсолютные пути для GitHub Pages
          adaptPathsForGitHubPages(container);
          // Инициализируем обработчики после вставки
          if (filePath === 'header.html') {
            initHeader();
            // Инициализируем бургер после загрузки header
            if (typeof BurgerMenu !== 'undefined' && BurgerMenu.init) {
              setTimeout(function() { BurgerMenu.init(); }, 100);
            }
          }
        }
      })
      .catch(function(error) {
        console.warn('Component load error:', error);
      });
  }

  // Адаптируем абсолютные пути для GitHub Pages
  function adaptPathsForGitHubPages(container) {
    var host = window.location.host;
    // Проверяем, что это GitHub Pages (не основной домен)
    if (host.indexOf('github.io') === -1) return;
    
    // URL GitHub Pages: https://username.github.io/repo-name/...
    // pathname: /repo-name/... => split => ['', 'repo-name', ...]
    var pathParts = window.location.pathname.split('/');
    var repoName = pathParts[1];
    if (!repoName) return;
    
    var prefix = '/' + repoName + '/';
    var allLinks = container.querySelectorAll('a[href]');
    allLinks.forEach(function(link) {
      var href = link.getAttribute('href');
      // Пропускаем tel:, mailto:, #, http(s)://, javascript:
      if (!href || href.startsWith('tel:') || href.startsWith('mailto:') || 
          href.startsWith('#') || href.startsWith('http://') || 
          href.startsWith('https://') || href.startsWith('javascript:')) return;
      
      // Если ссылка абсолютная (начинается с /), добавляем префикс репо
      if (href.startsWith('/') && !href.startsWith('//')) {
        var newHref = prefix + href.substring(1);
        link.setAttribute('href', newHref);
      }
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
