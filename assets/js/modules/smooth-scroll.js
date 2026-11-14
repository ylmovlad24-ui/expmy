/**
 * Smooth scroll and header shadow module
 * WCAG 2.1.1: Keyboard accessible smooth scroll
 * WCAG 2.3.3: Respects prefers-reduced-motion
 */
var SmoothScroll = (function () {
  "use strict";

  // Check if user prefers reduced motion
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function init() {
    // Smooth scroll for anchor links — click
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var targetId = this.getAttribute("href");
        if (targetId === "#") return;

        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var headerOffset = 80;
          var elementPosition = target.getBoundingClientRect().top;
          var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          // Respect prefers-reduced-motion
          var scrollBehavior = prefersReducedMotion ? "auto" : "smooth";

          window.scrollTo({
            top: offsetPosition,
            behavior: scrollBehavior,
          });

          // Move focus to target for screen readers
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        }
      });

      // Keyboard support — Enter/Space
      anchor.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          if (this.getAttribute("href") && this.getAttribute("href").startsWith("#")) {
            e.preventDefault();
            this.click();
          }
        }
      });
    });

    // Header shadow on scroll
    var header = document.querySelector(".header");
    if (header) {
      window.addEventListener(
        "scroll",
        function () {
          if (window.scrollY > 10) {
            header.classList.add("header--scrolled");
          } else {
            header.classList.remove("header--scrolled");
          }
        },
        { passive: true }
      );
    }
  }

  return {
    init: init,
  };
})();
