/**
 * Подгрузка общих компонентов (header, footer) через fetch.
 * Работает на всех .html-страницах без серверной части.
 * При переходе на Битрикс этот код можно будет заменить на PHP-include.
 */
(function () {
  'use strict';

  /**
   * Определяет относительный путь к components/ от текущей страницы.
   */
  function getComponentsPath() {
    var scripts = document.querySelectorAll('script[src*="components-loader"]');
    if (scripts.length === 0) return '../components/'; // fallback

    var src = scripts[0].getAttribute('src');
    var parts = src.split('/');
    parts.pop(); // убираем filename.js

    // Если скрипт лежит в js/, убираем ещё 'js'
    if (parts[parts.length - 1] === 'js') {
      parts.pop();
    }

    return parts.join('/') + '/components/';
  }

  var base = getComponentsPath();

  /**
   * Загружает HTML-фрагмент и вставляет в контейнер.
   */
  function loadComponent(containerId, componentFile) {
    var container = document.getElementById(containerId);
    if (!container) return;

    fetch(base + componentFile)
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.text();
      })
      .then(function (html) {
        container.innerHTML = html;
      })
      .catch(function (err) {
        console.warn('[components-loader] Не удалось загрузить ' + componentFile + ':', err);
      });
  }

  // Загружаем header и footer
  loadComponent('header-root', 'header.html');
  loadComponent('footer-root', 'footer.html');

})();
