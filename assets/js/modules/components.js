/**
 * Компоненты шапки и подвала
 * Загружает header.html и footer.html на все страницы
 */
(function() {
  'use strict';

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
          adaptPathsForGitHubPages(container);
          if (filePath === 'header.html') {
            initHeader();
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

  function adaptPathsForGitHubPages(container) {
    var host = window.location.host;
    if (host.indexOf('github.io') === -1) return;
    
    var pathParts = window.location.pathname.split('/');
    var repoName = pathParts[1];
    if (!repoName) return;
    
    var prefix = '/' + repoName + '/';
    var allLinks = container.querySelectorAll('a[href]');
    allLinks.forEach(function(link) {
      var href = link.getAttribute('href');
      if (!href || href.startsWith('tel:') || href.startsWith('mailto:') || 
          href.startsWith('#') || href.startsWith('http://') || 
          href.startsWith('https://') || href.startsWith('javascript:')) return;
      
      if (href.startsWith('/') && !href.startsWith('//')) {
        var newHref = prefix + href.substring(1);
        link.setAttribute('href', newHref);
      }
    });
  }

  function initHeader() {
    var header = document.querySelector('.header');
    if (!header) return;

    // Desktop dropdowns — click to toggle
    var desktopToggles = header.querySelectorAll('.header__dropdown-toggle');
    desktopToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var dropdown = this.closest('.header__dropdown');
        if (!dropdown) return;
        var menu = dropdown.querySelector('.header__dropdown-menu');
        var isExpanded = this.getAttribute('aria-expanded') === 'true';

        // Close all other dropdowns
        header.querySelectorAll('.header__dropdown').forEach(function(d) {
          if (d !== dropdown) {
            var btn = d.querySelector('.header__dropdown-toggle');
            var m = d.querySelector('.header__dropdown-menu');
            if (btn) btn.setAttribute('aria-expanded', 'false');
            if (m) m.classList.remove('open');
          }
        });

        // Toggle current
        this.setAttribute('aria-expanded', String(!isExpanded));
        menu.classList.toggle('open', !isExpanded);
      });

      // Keyboard support
      toggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
        if (e.key === 'Escape') {
          var dropdown = this.closest('.header__dropdown');
          var menu = dropdown.querySelector('.header__dropdown-menu');
          this.setAttribute('aria-expanded', 'false');
          menu.classList.remove('open');
          this.blur();
        }
      });
    });

    // Close desktop dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (!header.contains(e.target)) {
        header.querySelectorAll('.header__dropdown').forEach(function(d) {
          var btn = d.querySelector('.header__dropdown-toggle');
          var m = d.querySelector('.header__dropdown-menu');
          if (btn) btn.setAttribute('aria-expanded', 'false');
          if (m) m.classList.remove('open');
        });
      }
    });

    // Mobile dropdowns
    var mobileToggles = header.querySelectorAll('.header__menu-dropdown-toggle');
    mobileToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var dropdown = this.closest('.header__menu-dropdown');
        if (!dropdown) return;
        var menu = dropdown.querySelector('.header__menu-dropdown-menu');
        var isExpanded = this.getAttribute('aria-expanded') === 'true';

        this.setAttribute('aria-expanded', String(!isExpanded));
        dropdown.classList.toggle('open', !isExpanded);
        if (menu) menu.style.display = !isExpanded ? 'block' : 'none';
      });

      // Keyboard support
      toggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
        if (e.key === 'Escape') {
          var dropdown = this.closest('.header__menu-dropdown');
          var menu = dropdown.querySelector('.header__menu-dropdown-menu');
          this.setAttribute('aria-expanded', 'false');
          dropdown.classList.remove('open');
          if (menu) menu.style.display = 'none';
          this.blur();
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header.html', 'header-container');
    loadComponent('footer.html', 'footer-container');
  });

})();
