/**
 * Page Transitions — Плавные переходы между страницами
 */
(function() {
  'use strict';

  const TRANSITION_CONFIG = {
    duration: 400,
    easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
    overlayColor: '#1a202c'
  };

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'page-transition-overlay';
  document.body.appendChild(overlay);

  // Apply to all links
  document.querySelectorAll('a[href]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');

      // Skip external, anchor, tel, mailto links
      if (href.startsWith('http') || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) return;

      // Skip if has data-no-transition attribute
      if (link.hasAttribute('data-no-transition')) return;

      e.preventDefault();

      // Animate overlay in
      overlay.style.transition = 'transform ' + TRANSITION_CONFIG.duration + 'ms ' + TRANSITION_CONFIG.easing;
      overlay.style.transform = 'scaleY(1)';
      overlay.style.transformOrigin = 'bottom';

      // Load new page after transition
      setTimeout(function() {
        window.location.href = href;
      }, TRANSITION_CONFIG.duration);
    });
  });

  // Content reveal on page load
  function revealContent() {
    const content = document.querySelectorAll('main > *');
    content.forEach(function(el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease ' + (i * 0.05) + 's, transform 0.6s ease ' + (i * 0.05) + 's';

      requestAnimationFrame(function() {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealContent);
  } else {
    revealContent();
  }

  console.log('Motion: Page transitions initialized');
})();
