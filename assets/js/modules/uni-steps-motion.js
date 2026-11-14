/**
 * Unified Steps Component — GSAP ScrollTrigger анимации
 * Чистый код: модуль, без глобальных переменных, только GSAP
 */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  function init() {
    try {
      // Ждём загрузки GSAP от gsap-loader.js
      if (window.GSAPLoader && window.GSAPLoader.ready) {
        window.GSAPLoader.ready()
          .then(function () {
            if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
            gsap.registerPlugin(ScrollTrigger);
            initStepsAnimation();
          })
          .catch(function (err) {
            console.warn("Uni-steps motion init error:", err);
          });
      } else {
        // Fallback: GSAP уже загружен
        if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
          gsap.registerPlugin(ScrollTrigger);
          initStepsAnimation();
        }
      }
    } catch (e) {
      console.warn("Uni-steps motion init error:", e);
    }
  }

  function initStepsAnimation() {
    var steps = document.querySelectorAll(".uni-step");
    if (steps.length === 0) return;

    gsap.set(steps, { opacity: 0, y: 40 });
    ScrollTrigger.create({
      trigger: ".uni-steps",
      start: "top 80%",
      onEnter: function () {
        gsap.to(steps, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" });
      },
      once: true,
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
