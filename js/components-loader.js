/**
 * Подгрузка общих компонентов (header, footer, form) через fetch.
 * Работает на всех .html-страницах без серверной части.
 * При переходе на Битрикс этот код можно будет заменить на PHP-include.
 */
(function () {
  'use strict';

  /**
   * Определяет относительный путь к components/ от текущей страницы.
   * Корень: components/
   * from root/: components/
   * from subpage/: ../components/
   * from deep/page/: ../../components/
   */
  function getComponentsPath() {
    // Берём путь до текущего файла (из <script src="...">)
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
   * Если контейнер не найден — ничего не делает (без ошибок).
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
        // Оставляем контейнер пустым — страница будет работать без компонента
      });
  }

  // Загружаем header и footer на каждой странице
  loadComponent('header-root', 'header.html');
  loadComponent('footer-root', 'footer.html');
  // form-root загружаем только на страницах, где есть такой контейнер (если нужно)

})();
