/**
 * Page Transitions — Плавные переходы между страницами
 * Только overlay для переходов. Content reveal — в motion.js для подстраниц.
 */
(function () {
  "use strict";

  const TRANSITION_CONFIG = {
    duration: 400,
    easing: "cubic-bezier(0.65, 0, 0.35, 1)",
    overlayColor: "#1a202c",
  };

  // Create overlay (hidden by default, shown only during page transitions)
  const overlay = document.createElement("div");
  overlay.className = "page-transition-overlay";
  overlay.style.display = "none";
  document.body.appendChild(overlay);

  // Apply to all links (но НЕ на главной — там переходы мгновенные)
  const path = window.location.pathname;
  const isMainPage = path === "/" || path === "/index.html" || path === "";

  if (!isMainPage) {
    // Только для подстраниц — на главной переходы мгновенные
    document.querySelectorAll("a[href]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        const href = link.getAttribute("href");

        // Skip external, anchor, tel, mailto links
        if (href.startsWith("http") || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:"))
          return;

        // Skip if has data-no-transition attribute
        if (link.hasAttribute("data-no-transition")) return;

        e.preventDefault();

        // Show overlay and animate
        overlay.style.display = "block";
        // Force reflow
        overlay.offsetHeight;
        overlay.style.transition = "transform " + TRANSITION_CONFIG.duration + "ms " + TRANSITION_CONFIG.easing;
        overlay.style.transform = "scaleY(1)";
        overlay.style.transformOrigin = "bottom";

        // Load new page after transition
        setTimeout(function () {
          window.location.href = href;
        }, TRANSITION_CONFIG.duration);
      });
    });
  }

  // Fallback для главной страницы (где motion.js не загружается)
  // Проверка: если на странице нет классов GSAP-анимаций — показать элементы
  const isSubpage =
    path.indexOf("/sudebnaya/") !== -1 ||
    path.indexOf("/vnesudebnaya/") !== -1 ||
    path.indexOf("/recenziya/") !== -1 ||
    path.indexOf("/avtotehnicheskaya/") !== -1 ||
    path.indexOf("/avtotovarovedcheskaya/") !== -1 ||
    path.indexOf("/uzly-i-agregaty/") !== -1 ||
    path.indexOf("/tovarovedcheskaya-b2b/") !== -1;

  if (!isSubpage) {
    // Главная страница — GSAP не загружается, элементы должны быть видны сразу
    setTimeout(function () {
      var all = document.querySelectorAll("main > *");
      all.forEach(function (el) {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    }, 100);
  }

  console.log("Motion: Page transitions initialized");
})();
