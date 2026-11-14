/**
 * Clip-path Reveals
 * Показывает все элементы сразу — без анимации
 */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    document.querySelectorAll(".reveal-clip, .reveal-blur, .reveal-text").forEach((el) => {
      el.classList.add("revealed");
    });
    return;
  }

  // Показываем все элементы сразу — без задержек
  function showAllElements() {
    document.querySelectorAll(".reveal-clip, .reveal-blur, .reveal-text").forEach(function (el) {
      el.classList.add("revealed");
      // Принудительно сбросим стили с !important, чтобы переопределить CSS
      el.style.setProperty("opacity", "1", "important");
      el.style.setProperty("filter", "none", "important");
      el.style.setProperty("transform", "none", "important");
      el.style.setProperty("clip-path", "none", "important");
    });
  }

  // Ждём DOM ready и показываем элементы
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showAllElements);
  } else {
    showAllElements();
  }
})();
