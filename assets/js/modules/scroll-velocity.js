/**
 * Scroll Velocity Effects — Реакция на скорость скролла
 */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const velocityElements = document.querySelectorAll(".velocity-blur");
  if (velocityElements.length === 0) return;

  let lastScrollY = window.scrollY;
  let velocity = 0;
  let rafId = null;
  let currentBlur = 0;

  // Track scroll velocity
  window.addEventListener(
    "scroll",
    function () {
      const scrollY = window.scrollY;
      const delta = Math.abs(scrollY - lastScrollY);
      velocity = Math.min(delta * 2, 15);
      lastScrollY = scrollY;
    },
    { passive: true }
  );

  // Smooth decay + apply
  function updateVelocity() {
    velocity *= 0.9;

    const blurAmount = Math.min(velocity / 5, 3);
    const scaleAmount = 1 + Math.min(velocity / 500, 0.02);

    currentBlur += (blurAmount - currentBlur) * 0.1;

    velocityElements.forEach(function (el) {
      var scaleAmount = 1 + currentBlur * 0.002;
      var opacityAmount = 1 - currentBlur * 0.03;
      el.style.transform = "scale(" + scaleAmount + ")";
      el.style.opacity = Math.max(opacityAmount, 0.7);
    });

    rafId = requestAnimationFrame(updateVelocity);
  }

  // Start loop
  updateVelocity();

  // Cleanup
  window.addEventListener("beforeunload", function () {
    if (rafId) cancelAnimationFrame(rafId);
  });

  console.log("Motion: Scroll velocity initialized");
})();
