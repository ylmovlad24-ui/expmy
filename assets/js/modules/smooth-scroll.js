/**
 * Smooth scroll and header shadow module
 */
var SmoothScroll = (function() {
  'use strict';

  function init() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var headerOffset = 80;
          var elementPosition = target.getBoundingClientRect().top;
          var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Header shadow on scroll
    var header = document.querySelector('.header');
    if (header) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
          header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
        } else {
          header.style.boxShadow = 'none';
        }
      }, { passive: true });
    }
  }

  return {
    init: init
  };
})();
