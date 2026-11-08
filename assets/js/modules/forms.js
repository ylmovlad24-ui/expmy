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
    toast.style.background = type === 'error' ? 'var(--danger, #dc3545)' : 'var(--success, #28a745)';
    document.body.appendChild(toast);

    setTimeout(function() {
      toast.remove();
    }, 4000);
  }

  function validatePhone(phone) {
    return /^\+?[0-9\s\-]{10,18}$/.test(phone.trim());
  }

  function sendToTelegram(data) {
    // КОНФИГУРАЦИЯ — замените на свои данные
    var BOT_TOKEN = '7940926360:AAE43PSqLXyREqkpF0O6_TvI8hH7ovXlN60';
    var CHAT_ID = '-4803799516';

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

    var url = 'https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage';

    return fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    })
    .then(function(response) {
      if (!response.ok) {
        console.error('Telegram error:', response.status, response.statusText);
      }
      return response;
    })
    .catch(function(error) {
      console.error('Отправка в Telegram не удалась:', error);
    });
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

      // Отправка на Telegram
      var sendSuccess = sendToTelegram(data);

      showToast('Заявка отправлена! Мы перезвоним вам в течение 15 минут.', 'success');
      formEl.reset();
    });
  }

  return {
    submitForm: submitForm,
    validatePhone: validatePhone,
    showToast: showToast,
    sendToTelegram: sendToTelegram
  };
})();
