/**
 * Calculator module
 * Handles both full (prices/) and compact (index) calculators
 * Uses shared PRICING data and utils.calculatePrice
 */
var Calculator = (function() {
  'use strict';

  var PRICING = {
    services: {
      'avtotexnicheskaya': {
        name: 'Автотехническая экспертиза',
        levels: { base: 15000, medium: 25000, advanced: 40000 }
      },
      'avto-tovarisvedcheskaya': {
        name: 'Автотовароведческая экспертиза',
        levels: { base: 12000, medium: 20000, advanced: 35000 }
      },
      'uzlov-i-agregatov': {
        name: 'Экспертиза узлов и агрегатов',
        levels: { base: 10000, medium: 18000, advanced: 30000 }
      }
    },
    extras: {
      court: 5000,
      review: 10000,
      urgent: 1.3
    }
  };

  function initFull() {
    var calcPriceEl = document.getElementById('calcPrice');
    if (!calcPriceEl) return;

    var serviceGroup = document.querySelector('fieldset[name="service"]') || document.querySelector('.calculator__fieldset');
    var levelGroup = document.querySelector('fieldset[name="level"]') || document.querySelector('.calculator__levels');

    if (!serviceGroup || !levelGroup) return;

    function updatePrice() {
      var serviceKey = AutoExpertUtils.getCheckedValue('service');
      var levelKey = AutoExpertUtils.getCheckedValue('level');

      if (!serviceKey || !levelKey) {
        calcPriceEl.textContent = '—';
        return;
      }

      var extras = [];
      document.querySelectorAll('input[name="extra"]:checked').forEach(function(cb) {
        extras.push(cb.value);
      });

      var price = AutoExpertUtils.calculatePrice(PRICING, serviceKey, levelKey, extras);
      calcPriceEl.textContent = AutoExpertUtils.formatPrice(price);
    }

    // Delegate changes to fieldsets
    serviceGroup.addEventListener('change', function(e) {
      if (e.target.matches('input[name="service"]')) updatePrice();
    });
    levelGroup.addEventListener('change', function(e) {
      if (e.target.matches('input[name="level"]')) updatePrice();
    });

    var extrasGroup = document.querySelector('fieldset[name="extras"]') || document.querySelector('.calculator__extras');
    if (extrasGroup) {
      extrasGroup.addEventListener('change', function(e) {
        if (e.target.matches('input[name="extra"]')) updatePrice();
      });
    }

    updatePrice();
  }

  function initCompact() {
    var serviceEl = document.getElementById('calcServiceCompact');
    var levelEl = document.getElementById('calcLevelCompact');
    var priceEl = document.getElementById('calcPriceCompact');

    if (!serviceEl || !levelEl || !priceEl) return;

    function updatePrice() {
      var serviceKey = serviceEl.value;
      var levelKey = levelEl.value;

      var service = PRICING.services[serviceKey];
      if (!service) {
        priceEl.textContent = '—';
        return;
      }

      var price = service.levels[levelKey] || 0;
      priceEl.textContent = 'от ' + AutoExpertUtils.formatPrice(price);
    }

    serviceEl.addEventListener('change', updatePrice);
    levelEl.addEventListener('change', updatePrice);

    updatePrice();
  }

  return {
    initFull: initFull,
    initCompact: initCompact
  };
})();
