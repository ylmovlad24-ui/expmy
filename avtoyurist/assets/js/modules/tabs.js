/**
 * Tab switching module
 * Uses event delegation on .tabs containers
 */
var TabSwitcher = (function() {
  'use strict';

  function init() {
    document.querySelectorAll('.tabs').forEach(function(container) {
      container.addEventListener('click', function(e) {
        var btn = e.target.closest('.tabs__button');
        if (!btn) return;

        var tabId = btn.getAttribute('data-tab');
        if (!tabId) return;

        // Deactivate all
        container.querySelectorAll('.tabs__button').forEach(function(b) {
          b.classList.remove('active');
        });
        container.querySelectorAll('.tabs__panel').forEach(function(p) {
          p.classList.remove('active');
        });

        // Activate selected
        btn.classList.add('active');
        var panel = container.querySelector('#tab-' + tabId);
        if (panel) panel.classList.add('active');
      });
    });
  }

  return {
    init: init
  };
})();
