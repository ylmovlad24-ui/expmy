/**
 * Form submission module
 * Unified form handler with validation and toast notifications
 * WCAG 3.3.1: Error identification with aria-invalid, aria-describedby
 * WCAG 4.1.3: Status messages via aria-live regions
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
    toast.style.background = type === 'error' ? 'var(--danger, #dc3545)' : 'var(--success, #28a745)';
    document.body.appendChild(toast);

    // Announce to screen readers via aria-live region
    var liveRegionId = type === 'error' ? 'aria-live-assertive' : 'aria-live-region';
    var liveRegion = document.getElementById(liveRegionId);
    if (liveRegion) {
      liveRegion.textContent = message;
      // Clear after toast disappears
      setTimeout(function() {
        liveRegion.textContent = '';
      }, 5000);
    }

    setTimeout(function() {
      toast.remove();
    }, 4000);
  }

  function validatePhone(phone) {
    return /^\+?[0-9\s\-]{10,18}$/.test(phone.trim());
  }

  // WCAG 3.3.1: Show error with aria-invalid and aria-describedby
  function showError(input, message) {
    // Remove previous error
    removeError(input);

    input.classList.add('error');
    input.setAttribute('aria-invalid', 'true');

    var errorId = input.id + '-error';
    var errorEl = document.getElementById(errorId);
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.id = errorId;
      errorEl.className = 'form-error';
      errorEl.setAttribute('role', 'alert');
      errorEl.setAttribute('aria-live', 'polite');
      // Insert after input
      input.parentNode.appendChild(errorEl);
    }
    errorEl.textContent = message;
    input.setAttribute('aria-describedby', errorId);
  }

  // Remove error state
  function removeError(input) {
    input.classList.remove('error');
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');

    var errorEl = input.querySelector('[role="alert"]') ||
                  input.parentNode.querySelector('.form-error');
    if (errorEl) {
      errorEl.remove();
    }
  }

  // Validate all required fields
  function validateForm(formEl) {
    var isValid = true;

    // Validate name
    var nameInput = formEl.querySelector('input[name="name"]');
    if (nameInput && nameInput.hasAttribute('required')) {
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Пожалуйста, введите ваше имя');
        isValid = false;
      } else {
        removeError(nameInput);
      }
    }

    // Validate phone
    var phoneInput = formEl.querySelector('input[name="phone"]');
    if (phoneInput && phoneInput.hasAttribute('required')) {
      if (!phoneInput.value.trim()) {
        showError(phoneInput, 'Пожалуйста, введите номер телефона');
        isValid = false;
      } else if (!validatePhone(phoneInput.value)) {
        showError(phoneInput, 'Пожалуйста, введите корректный номер телефона');
        isValid = false;
      } else {
        removeError(phoneInput);
      }
    }

    // Validate checkbox
    var agreeInput = formEl.querySelector('input[name="agree"]');
    if (agreeInput && agreeInput.hasAttribute('required')) {
      if (!agreeInput.checked) {
        showError(agreeInput, 'Необходимо дать согласие на обработку данных');
        isValid = false;
      } else {
        removeError(agreeInput);
      }
    }

    return isValid;
  }

  function sendToTelegram(data) {
    // ⚠️ БЕЗОПАСНОСТЬ: Отправка через серверный прокси
    // Никогда не храните BOT_TOKEN в клиентском JS!
    // Замените URL на ваш бэкенд (PHP/Node.js/Cloudflare Workers)
    var API_ENDPOINT = '/api/send-form.php'; // Серверный endpoint

    // Формируем сообщение
    var message = '📩 <b>Новая заявка с сайта</b>\n\n';
    if (data.name) message += '<b>Имя:</b> ' + data.name + '\n';
    if (data.phone) message += '<b>Телефон:</b> ' + data.phone + '\n';
    if (data.service) message += '<b>Услуга:</b> ' + data.service + '\n';
    if (data.message) message += '<b>Сообщение:</b> ' + data.message + '\n';
    if (data.level) message += '<b>Уровень:</b> ' + data.level + '\n';
    if (data.price) message += '<b>Цена:</b> ' + data.price + '\n';

    var now = new Date();
    message += '\n📅 ' + now.toLocaleString('ru-RU');

    // Отправка через серверный прокси (безопасно!)
    return fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        message: message
      })
    })
    .then(function(response) {
      if (!response.ok) {
        console.error('Server error:', response.status, response.statusText);
      }
      return response;
    })
    .catch(function(error) {
      console.error('Отправка не удалась:', error);
      // Fallback: показать пользователю
      showToast('Ошибка отправки. Позвоните нам: +7 (905) 983-09-69', 'error');
    });
  }

  function submitForm(formEl, isCalculator) {
    formEl.addEventListener('submit', function(e) {
      e.preventDefault();

      // Clear all previous errors
      formEl.querySelectorAll('.error').forEach(function(el) {
        removeError(el);
      });

      // Validate form
      if (!validateForm(formEl)) {
        showToast('Пожалуйста, заполните все обязательные поля', 'error');
        // Focus first error field
        var firstError = formEl.querySelector('[aria-invalid="true"]');
        if (firstError) firstError.focus();
        return;
      }

      var data = {};
      var formData = new FormData(formEl);
      formData.forEach(function(value, key) {
        data[key] = value;
      });

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

      // Отправка на Telegram
      sendToTelegram(data);

      showToast('Заявка отправлена! Мы перезвоним вам в течение 15 минут.', 'success');
      formEl.reset();

      // Clear all aria states after reset
      formEl.querySelectorAll('[aria-invalid]').forEach(function(el) {
        el.removeAttribute('aria-invalid');
      });
    });
  }

  return {
    submitForm: submitForm,
    validatePhone: validatePhone,
    showToast: showToast,
    sendToTelegram: sendToTelegram,
    showError: showError,
    removeError: removeError,
    validateForm: validateForm
  };
})();
