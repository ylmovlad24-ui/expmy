/**
 * Animated SVG Icons
 * IntersectionObserver для запуска анимации иконок
 */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    document.querySelectorAll(".animated-icon").forEach((icon) => {
      icon.classList.add("revealed");
    });
    return;
  }

  const iconObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          iconObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".animated-icon").forEach(function (icon) {
    iconObserver.observe(icon);
  });
})();
