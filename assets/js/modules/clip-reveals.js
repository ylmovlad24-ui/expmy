/**
 * Clip-path Reveals
 * IntersectionObserver для clip-path, blur-in и split text анимаций
 */
(function() {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal-clip, .reveal-blur, .reveal-text').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  // Observe clip and blur reveals
  document.querySelectorAll('.reveal-clip, .reveal-blur').forEach(function(el) {
    revealObserver.observe(el);
  });

  // Split text for headings
  function splitTextForReveal() {
    document.querySelectorAll('.reveal-text').forEach(function(element) {
      if (element.dataset.split) return; // Already split
      const text = element.textContent;
      element.innerHTML = '';
      element.dataset.split = 'true';

      text.split('').forEach(function(char, index) {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.transitionDelay = (index * 0.03) + 's';
        element.appendChild(span);
      });

      revealObserver.observe(element);
    });
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', splitTextForReveal);
  } else {
    splitTextForReveal();
  }
})();
