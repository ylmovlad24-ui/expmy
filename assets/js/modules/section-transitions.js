/* ============================================
   Section Transitions Module
   Gradient dividers, alternating backgrounds, wave effects
   ============================================ */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /**
   * Initialize section transition effects
   */
  function initSectionTransitions() {
    if (prefersReducedMotion) return;

    // Reveal animated backgrounds on scroll
    var revealElements = document.querySelectorAll(
      ".section-transition-alt, .section-fade-bg, .section-wave-bg"
    );

    if (!revealElements.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /**
   * Auto-insert gradient dividers between sections
   */
  function autoInsertDividers() {
    var sections = document.querySelectorAll(".section, .section-block, [class*='section']");
    if (!sections.length) return;

    sections.forEach(function (section, index) {
      if (index < sections.length - 1) {
        var divider = document.createElement("div");
        divider.className = "section-divider";
        section.after(divider);
      }
    });
  }

  /**
   * Public API
   */
  window.SectionTransitions = {
    init: function () {
      initSectionTransitions();
      // Optional: auto-insert dividers
      // autoInsertDividers();
    }
  };

  // Auto-init on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      window.SectionTransitions.init();
    });
  } else {
    window.SectionTransitions.init();
  }
})();
