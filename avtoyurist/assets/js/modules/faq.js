/**
 * FAQ Accordion module
 * Uses event delegation on .faq-group containers
 */
var FaqAccordion = (function() {
  'use strict';

  function init() {
    // Delegate to each .faq-group
    document.querySelectorAll('.faq-group').forEach(function(group) {
      group.addEventListener('click', function(e) {
        var btn = e.target.closest('.faq-item__question');
        if (!btn) return;

        var item = btn.closest('.faq-item');
        var isOpen = btn.getAttribute('aria-expanded') === 'true';

        // Close all siblings in this group
        group.querySelectorAll('.faq-item').forEach(function(el) {
          el.classList.remove('open');
          el.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
        });

        // Toggle current
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  return {
    init: init
  };
})();
