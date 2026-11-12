/**
 * Custom Cursor — Контекстный курсор с текстом
 * Улучшенная версия из motion.js
 */
(function() {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Only on non-touch devices
  if ('ontouchstart' in window) return;

  // Create cursor elements
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  const ring = document.createElement('div');
  ring.className = 'custom-cursor-ring';
  document.body.appendChild(ring);

  const text = document.createElement('div');
  text.className = 'custom-cursor-text';
  text.textContent = 'Подробнее';
  document.body.appendChild(text);

  // State
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let isHoveringLink = false;
  let isHoveringCard = false;

  // Mouse move
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update cursor immediately
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';

    // Smooth ring follow
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';

    // Update text position
    text.style.left = mouseX + 'px';
    text.style.top = (mouseY + 20) + 'px';
  });

  // Hover targets
  const linkTargets = document.querySelectorAll('a, button');
  const cardTargets = document.querySelectorAll('.service-card, .vnesud-direction, .sudeb-direction, .recz-direction, .category-card, .guarantee-card, .card');

  linkTargets.forEach(function(target) {
    target.addEventListener('mouseenter', function() {
      isHoveringLink = true;
      if (!isHoveringCard) {
        ring.classList.add('link-hover');
      }
    });
    target.addEventListener('mouseleave', function() {
      isHoveringLink = false;
      if (!isHoveringCard) {
        ring.classList.remove('link-hover');
      }
    });
  });

  cardTargets.forEach(function(target) {
    target.addEventListener('mouseenter', function() {
      isHoveringCard = true;
      ring.classList.add('card-hover');
      text.classList.add('visible');
    });
    target.addEventListener('mouseleave', function() {
      isHoveringCard = false;
      ring.classList.remove('card-hover');
      text.classList.remove('visible');
    });
  });

  console.log('Motion: Custom cursor initialized');
})();
