/* ============================================
   Parallax Module
   GSAP ScrollTrigger-based parallax with CSS fallback for mobile
   ============================================ */

(function () {
  "use strict";

  var isTouch = "ontouchstart" in window;
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isLowEnd = (navigator.deviceMemory && navigator.deviceMemory <= 2) ||
                 (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

  /**
   * Desktop: GSAP ScrollTrigger parallax
   */
  function initDesktopParallax() {
    if (isTouch || prefersReducedMotion || isLowEnd) return;
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    var scrollTriggers = [];

    // Regular parallax elements
    var parallaxElements = document.querySelectorAll(".parallax-element");
    parallaxElements.forEach(function (el) {
      var speed = parseFloat(el.dataset.parallaxSpeed) || 0.3;
      var distance = parseFloat(el.dataset.parallaxDistance) || 100;
      var axis = el.dataset.parallaxAxis || "y";

      gsap.set(el, { willChange: "transform" });

      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: function (self) {
            var offset = self.progress * distance * speed * 10;
            if (axis === "x") {
              gsap.set(el, { x: offset });
            } else {
              gsap.set(el, { y: -offset });
            }
          }
        })
      );
    });

    // Parallax backgrounds
    var parallaxBgs = document.querySelectorAll(".parallax-bg");
    parallaxBgs.forEach(function (bg) {
      var inner = bg.querySelector("*");
      if (!inner) return;

      var speed = parseFloat(bg.dataset.parallaxSpeed) || 0.3;
      var distance = parseFloat(bg.dataset.parallaxDistance) || 200;

      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: bg,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: function (self) {
            var offset = self.progress * distance * speed;
            gsap.set(inner, { y: -offset });
          }
        })
      );
    });

    // Parallax decorations
    var decorations = document.querySelectorAll(".parallax-decoration");
    decorations.forEach(function (el) {
      var speed = parseFloat(el.dataset.parallaxSpeed) || 0.15;
      var distance = parseFloat(el.dataset.parallaxDistance) || 80;

      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: function (self) {
            var offset = self.progress * distance * speed;
            gsap.set(el, { y: -offset });
          }
        })
      );
    });

    // Cleanup
    window.addEventListener("beforeunload", function () {
      scrollTriggers.forEach(function (st) { st.kill(); });
      ScrollTrigger.refresh();
    });
  }

  /**
   * Mobile: CSS-only parallax with IntersectionObserver
   */
  function initMobileParallax() {
    if (!isTouch || prefersReducedMotion || isLowEnd) return;

    var parallaxElements = document.querySelectorAll(".parallax-element");
    if (!parallaxElements.length) return;

    parallaxElements.forEach(function (el) {
      var speed = parseFloat(el.dataset.parallaxSpeed) || 0.3;
      var distance = parseFloat(el.dataset.parallaxDistance) || 100;

      // Set CSS custom properties for the effect
      el.style.setProperty("--parallax-speed", speed);
      el.style.setProperty("--parallax-distance", distance);
      el.classList.add("parallax-active");
    });
  }

  /**
   * Parallax text (words move at different speeds)
   */
  function initParallaxText() {
    if (isTouch || prefersReducedMotion || isLowEnd) return;
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    var scrollTriggers = [];

    var parallaxTexts = document.querySelectorAll(".parallax-text");
    parallaxTexts.forEach(function (container) {
      var words = container.querySelectorAll(".parallax-word");
      words.forEach(function (word) {
        var speed = parseFloat(word.dataset.parallaxSpeed) || 0.2;
        var distance = parseFloat(word.dataset.parallaxDistance) || 60;

        scrollTriggers.push(
          ScrollTrigger.create({
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: function (self) {
              var offset = self.progress * distance * speed;
              gsap.set(word, { y: -offset });
            }
          })
        );
      });
    });

    // Cleanup
    window.addEventListener("beforeunload", function () {
      scrollTriggers.forEach(function (st) { st.kill(); });
      ScrollTrigger.refresh();
    });
  }

  /**
   * Public API
   */
  window.Parallax = {
    init: function () {
      initDesktopParallax();
      initMobileParallax();
      initParallaxText();
    }
  };

  // Auto-init on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      window.Parallax.init();
    });
  } else {
    window.Parallax.init();
  }
})();
