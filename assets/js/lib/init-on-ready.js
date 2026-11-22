/**
 * InitOnReady — утилита безопасной инициализации
 * Используется вместо document.addEventListener("DOMContentLoaded", ...)
 * для скриптов, загруженных с defer.
 *
 * Пример использования:
 *   InitOnReady(function() { ... });
 */
(function () {
  "use strict";

  window.InitOnReady = function (callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  };
})();
