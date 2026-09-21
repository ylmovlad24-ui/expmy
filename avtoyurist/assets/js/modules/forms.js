/**
 * Form submission module
 * Unified form handler with validation and toast notifications
 */
var FormHandler = (function() {
  'use strict';

  function showToast(message, type) {
    // Remove existing toast
    var existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'toast-notification toast-' + (type || 'success');
    toast.textContent = message;
    toast.style.cssText = 'position:fixed;bottom:24px;right:24px;padding:16px 24px;border-radius:8px;color:#fff;font-weight:600;z-index:99999;animation:fadeIn 0.3s;';
    toast.style.background = type === 'error' ? 'var(--danger, #dc3545)' : 'var(--success, #28a745)';
    document.body.appendChild(toast);

    setTimeout(function() {
      toast.remove();
    }, 4000);
  }

  function validatePhone(phone) {
    return /^\+?[0-9\s\-]{10,18}$/.test(phone.trim());
  }

  function submitForm(formEl, isCalculator) {
    formEl.addEventListener('submit', function(e) {
      e.preventDefault();

      var data = {};
      var formData = new FormData(formEl);
      formData.forEach(function(value, key) {
        data[key] = value;
      });

      // Phone validation
      var phone = formEl.querySelector('input[name="phone"]');
      if (phone) {
        data.phone = phone.value;
        if (!validatePhone(phone.value)) {
          showToast('Пожалуйста, введите корректный номер телефона', 'error');
          return;
        }
      }

      // Materials for contact form
      if (!isCalculator) {
        var materials = [];
        formEl.querySelectorAll('input[name="materials"]:checked').forEach(function(cb) {
          materials.push(cb.value);
        });
        if (materials.length > 0) data.materials = materials;
      }

      // Calculator data
      if (isCalculator) {
        var service = document.querySelector('input[name="service"]:checked');
        var level = document.querySelector('input[name="level"]:checked');
        data.service = service ? service.value : '';
        data.level = level ? level.value : '';
        data.price = document.getElementById('calcPrice')?.textContent || '';
      }

      // TODO: Replace with actual fetch() to backend
      console.log('Form submitted:', data);

      showToast('Заявка отправлена! Мы перезвоним вам в течение 15 минут.', 'success');
      formEl.reset();
    });
  }

  return {
    submitForm: submitForm,
    validatePhone: validatePhone,
    showToast: showToast
  };
})();
