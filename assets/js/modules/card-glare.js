/* ============================================
   Card Glare Module
   Mouse-follow glare effect on cards
   ============================================ */

(function () {
  "use strict";

  var isTouch = "ontouchstart" in window;
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /**
   * Initialize glare effect on cards
   */
  function initGlare() {
    if (isTouch || prefersReducedMotion) return;

    var cards = document.querySelectorAll("[data-glare], [data-glare='true']");
    if (!cards.length) return;

    cards.forEach(function (card) {
      card.style.position = card.style.position || "relative";
      card.style.overflow = "hidden";

      card.addEventListener("mouseenter", function () {
        card.classList.add("glare-active");
      });

      card.addEventListener("mouseleave", function () {
        card.classList.remove("glare-active");
        resetGlare(card);
      });

      card.addEventListener("mousemove", throttle(function (e) {
        updateGlare(card, e);
      }, 16));
    });
  }

  /**
   * Update glare position based on mouse
   */
  function updateGlare(card, e) {
    var rect = card.getBoundingClientRect();
    var x = ((e.clientX - rect.left) / rect.width) * 100;
    var y = ((e.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty("--glare-x", x + "%");
    card.style.setProperty("--glare-y", y + "%");
  }

  /**
   * Reset glare to center
   */
  function resetGlare(card) {
    card.style.setProperty("--glare-x", "50%");
    card.style.setProperty("--glare-y", "50%");
  }

  /**
   * Mobile: static glare on scroll reveal
   */
  function initMobileGlare() {
    if (!isTouch || prefersReducedMotion) return;

    var cards = document.querySelectorAll("[data-glare]");
    if (!cards.length) return;

    if (typeof GSAPLoader !== "undefined" && GSAPLoader.ready) {
      GSAPLoader.ready().then(function () {
        initMobileGlareObserver(cards);
      });
    } else {
      initMobileGlareObserver(cards);
    }
  }

  function initMobileGlareObserver(cards) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("glare-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    cards.forEach(function (card) {
      observer.observe(card);
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
   * Auto-init: apply to known card classes
   */
  function autoApplyGlare() {
    var cardSelectors = [
      ".situation-card",
      ".direction-card",
      ".expert-card",
      ".guarantee-card",
      ".vnesud-direction",
      ".sudeb-direction",
      ".recz-direction",
      ".vnesud-case",
      ".sudeb-case",
      ".recz-case"
    ];

    cardSelectors.forEach(function (selector) {
      var elements = document.querySelectorAll(selector);
      elements.forEach(function (el) {
        if (!el.hasAttribute("data-glare")) {
          el.setAttribute("data-glare", "true");
        }
      });
    });
  }

  /**
   * Public API
   */
  window.CardGlare = {
    init: function () {
      autoApplyGlare();
      initGlare();
      initMobileGlare();
    },
    update: function (card, e) {
      updateGlare(card, e);
    }
  };

  // Auto-init on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      window.CardGlare.init();
    });
  } else {
    window.CardGlare.init();
  }
})();
