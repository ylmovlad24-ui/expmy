/**
 * Lenis Smooth Scroll
 * Плавный скролл с инерцией — стандарт 2026
 */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  var lenisInstance = null;
  var rafId = null;
  var gsapTickerId = null;

  var lenisScript = document.createElement("script");
  lenisScript.src = "https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js";
  lenisScript.onload = function () {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      if (lenisInstance) {
        lenisInstance.raf(time);
        rafId = requestAnimationFrame(raf);
      }
    }
    rafId = requestAnimationFrame(raf);

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      lenisInstance.on("scroll", ScrollTrigger.update);
      gsapTickerId = gsap.ticker.add(function (time) {
        if (lenisInstance) {
          lenisInstance.raf(time * 1000);
        }
      });
      gsap.ticker.lagSmoothing(0);
    }
  };

  lenisScript.onerror = function () {
    console.warn("Motion: Lenis failed to load, using native scroll");
  };

  document.head.appendChild(lenisScript);

  // Cleanup function
  function cleanup() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (gsapTickerId && typeof gsap !== "undefined" && gsap.ticker.remove) {
      gsap.ticker.remove(gsapTickerId);
      gsapTickerId = null;
    }
    if (lenisInstance && lenisInstance.destroy) {
      lenisInstance.destroy();
    }
    lenisInstance = null;
  }

  window.LenisScroll = {
    cleanup: cleanup,
  };
})();
