/* ============================================
   Section Spotlight Module
   Mouse-follow spotlight on sections (desktop)
   Static spotlight on scroll (mobile)
   ============================================ */

(function () {
  "use strict";

  var isTouch = "ontouchstart" in window;
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /**
   * Desktop: mouse-follow spotlight
   */
  function initDesktopSpotlight() {
    if (isTouch || prefersReducedMotion) return;

    var sections = document.querySelectorAll(".spotlight-section");
    if (!sections.length) return;

    sections.forEach(function (section) {
      section.addEventListener("mousemove", throttle(function (e) {
        var rect = section.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;

        section.style.setProperty("--spotlight-x", x + "%");
        section.style.setProperty("--spotlight-y", y + "%");
      }, 16));
    });
  }

  /**
   * Mobile: static spotlight on scroll reveal
   */
  function initMobileSpotlight() {
    if (!isTouch || prefersReducedMotion) return;

    var sections = document.querySelectorAll(".spotlight-section");
    if (!sections.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("spotlight-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /**
   * Throttle utility
   */
  function throttle(fn, delay) {
    var lastTime = 0;
    return function (e) {
      var now = Date.now();
      if (now - lastTime >= delay) {
        lastTime = now;
        fn(e);
      }
    };
  }

  /**
   * Public API
   */
  window.SectionSpotlight = {
    init: function () {
      initDesktopSpotlight();
      initMobileSpotlight();
    }
  };

  // Auto-init on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      window.SectionSpotlight.init();
    });
  } else {
    window.SectionSpotlight.init();
  }
})();
