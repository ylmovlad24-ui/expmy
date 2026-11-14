/**
 * Custom Cursor — Контекстный курсор с текстом
 */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  if ("ontouchstart" in window) return;

  var cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  var ring = document.createElement("div");
  ring.className = "custom-cursor-ring";
  document.body.appendChild(ring);

  var text = document.createElement("div");
  text.className = "custom-cursor-text";
  text.textContent = "Подробнее";
  document.body.appendChild(text);

  var mouseX = 0,
    mouseY = 0;
  var ringX = 0,
    ringY = 0;
  var isHoveringLink = false;
  var isHoveringCard = false;
  var rafId = null;
  var needsUpdate = false;

  // Throttled mousemove via rAF
  document.addEventListener(
    "mousemove",
    function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      needsUpdate = true;
      if (!rafId) rafId = requestAnimationFrame(updateCursor);
    },
    { passive: true }
  );

  function updateCursor() {
    if (!needsUpdate) {
      rafId = null;
      return;
    }
    needsUpdate = false;

    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";

    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";

    text.style.left = mouseX + "px";
    text.style.top = mouseY + 20 + "px";

    rafId = requestAnimationFrame(updateCursor);
  }

  // Hover targets — use delegation instead of individual listeners
  document.addEventListener(
    "mouseenter",
    function (e) {
      var target = e.target;
      if (target.tagName === "A" || target.tagName === "BUTTON") {
        isHoveringLink = true;
        if (!isHoveringCard) {
          ring.classList.add("link-hover");
        }
      }
      var isCard =
        target.classList &&
        (target.classList.contains("service-card") ||
          target.classList.contains("vnesud-direction") ||
          target.classList.contains("sudeb-direction") ||
          target.classList.contains("recz-direction") ||
          target.classList.contains("category-card") ||
          target.classList.contains("guarantee-card") ||
          target.classList.contains("card"));
      if (isCard) {
        isHoveringCard = true;
        ring.classList.add("card-hover");
        text.classList.add("visible");
      }
    },
    true
  );

  document.addEventListener(
    "mouseleave",
    function (e) {
      var target = e.target;
      if (target.tagName === "A" || target.tagName === "BUTTON") {
        isHoveringLink = false;
        if (!isHoveringCard) {
          ring.classList.remove("link-hover");
        }
      }
      var isCard =
        target.classList &&
        (target.classList.contains("service-card") ||
          target.classList.contains("vnesud-direction") ||
          target.classList.contains("sudeb-direction") ||
          target.classList.contains("recz-direction") ||
          target.classList.contains("category-card") ||
          target.classList.contains("guarantee-card") ||
          target.classList.contains("card"));
      if (isCard) {
        isHoveringCard = false;
        ring.classList.remove("card-hover");
        text.classList.remove("visible");
      }
    },
    true
  );

  // Cleanup
  function cleanup() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    document.body.removeChild(cursor);
    document.body.removeChild(ring);
    document.body.removeChild(text);
  }

  window.CustomCursor = {
    cleanup: cleanup,
  };
})();
