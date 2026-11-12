/**
 * Form Micro-interactions
 * Добавляет структуру полей для анимаций
 */
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.form__input, .form__textarea').forEach(function(input) {
      // Skip if already wrapped
      if (input.parentElement.classList.contains('form-field')) return;

      var wrapper = document.createElement('div');
      wrapper.className = 'form-field';

      var label = document.createElement('label');
      label.className = 'form-field__label';
      label.textContent = input.getAttribute('placeholder') || '';

      var underline = document.createElement('div');
      underline.className = 'form-field__underline';

      // Move input into wrapper
      input.removeAttribute('placeholder');
      input.setAttribute('aria-label', label.textContent);

      wrapper.appendChild(input);
      wrapper.appendChild(label);
      wrapper.appendChild(underline);

      input.parentNode.insertBefore(wrapper, input);
    });
  });
})();
