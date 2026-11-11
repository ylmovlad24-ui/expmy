/**
 * Unified Steps Component — GSAP ScrollTrigger анимации
 * Чистый код: модуль, без глобальных переменных, только GSAP
 */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  function init() {
    try {
      loadScript('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js')
        .then(function () {
          return loadScript('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js');
        })
        .then(function () {
          if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
          gsap.registerPlugin(ScrollTrigger);
          initStepsAnimation();
        })
        .catch(function (err) {
          console.warn('Uni-steps motion init error:', err);
        });
    } catch (e) {
      console.warn('Uni-steps motion init error:', e);
    }
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (document.querySelector('script[src="' + src + '"]')) {
        resolve();
        return;
      }
      var script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = function () { reject(new Error('Script load failed: ' + src)); };
      document.head.appendChild(script);
    });
  }

  function initStepsAnimation() {
    var steps = document.querySelectorAll('.uni-step');
    if (steps.length === 0) return;

    gsap.set(steps, { opacity: 0, y: 40 });
    ScrollTrigger.create({
      trigger: '.uni-steps',
      start: 'top 80%',
      onEnter: function () {
        gsap.to(steps, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' });
      },
      once: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
