/**
 * Utility functions shared across modules
 */
var AutoExpertUtils = (function() {
  'use strict';

  function formatPrice(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
  }

  function getCheckedValue(groupName) {
    var el = document.querySelector('input[name="' + groupName + '"]:checked');
    return el ? el.value : null;
  }

  /**
   * Calculate price based on service, level and extras
   */
  function calculatePrice(pricing, serviceKey, levelKey, extraValues) {
    var service = pricing.services[serviceKey];
    if (!service) return null;

    var basePrice = service.levels[levelKey] || 0;
    var total = basePrice;
    var hasExtra = false;

    (extraValues || []).forEach(function (val) {
      hasExtra = true;
      if (val === 'urgent') {
        total *= pricing.extras.urgent;
      } else {
        total += pricing.extras[val] || 0;
      }
    });

    return hasExtra ? Math.round(total) : basePrice;
  }

  return {
    formatPrice: formatPrice,
    getCheckedValue: getCheckedValue,
    calculatePrice: calculatePrice
  };
})();
