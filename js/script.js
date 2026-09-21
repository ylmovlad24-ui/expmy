{"text": "// Плавная прокрутка к якорям\ndocument.addEventListener('DOMContentLoaded', () => {\n\n  // ─── Burger menu ───\n  (function initBurgerMenu() {\n    const burger = document.querySelector('.header__burger');\n    const nav = document.querySelector('.header__nav');\n    if (!burger || !nav) return;\n\n    function toggleMenu() {\n      const isExpanded = burger.getAttribute('aria-expanded') === 'true';\n      burger.setAttribute('aria-expanded', String(!isExpanded));\n      nav.classList.toggle('is-open');\n      document.body.style.overflow = isExpanded ? '' : 'hidden';\n    }\n\n    function closeMenu() {\n      burger.setAttribute('aria-expanded', 'false');\n      nav.classList.remove('is-open');\n      document.body.style.overflow = '';\n    }\n\n    burger.addEventListener('click', toggleMenu);\n\n    nav.querySelectorAll('.header__link').forEach(link => {\n      link.addEventListener('click', closeMenu);\n    });\n\n    document.addEventListener('click', (e) => {\n      if (nav.classList.contains('is-open') && !nav.contains(e.target) && !burger.contains(e.target)) {\n        closeMenu();\n      }\n    });\n\n    document.addEventListener('keydown', (e) => {\n      if (e.key === 'Escape' && nav.classList.contains('is-open')) {\n        closeMenu();\n        burger.focus();\n      }\n    });\n  })();\n\n  document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {"}
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Обработка отправки формы
  document.querySelectorAll('.form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('.form__submit');
      if (btn) {
        btn.textContent = 'Отправка...';
        btn.disabled = true;
        btn.style.opacity = '0.7';
      }
      setTimeout(() => {
        alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
        this.reset();
        if (btn) {
          btn.textContent = 'Отправить заявку';
          btn.disabled = false;
          btn.style.opacity = '1';
        }
      }, 800);
    });
  });

  // Staggered scroll-reveal анимация
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Если секция содержит элементы для stagger-анимации
        const children = entry.target.querySelectorAll('.rc-card, .checklist__item, .trust__item, .partnership__item, .faq__item');
        if (children.length > 1) {
          children.forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            setTimeout(() => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, 50);
          });
        } else {
          entry.target.classList.add('fade-in');
        }
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Scroll progress bar
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      scrollProgress.style.width = scrolled + '%';
    }, { passive: true });
  }

  // Back-to-top кнопка
  let backToTop = document.querySelector('.back-to-top');
  if (!backToTop) {
    backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Наверх');
    document.body.appendChild(backToTop);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Haptic feedback на мобильных (если поддерживается)
  if (navigator.vibrate) {
    document.querySelectorAll('.form__submit, .hero__cta, .header__cta, .header__call').forEach(btn => {
      btn.addEventListener('click', () => {
        navigator.vibrate(15);
      });
    });
  }

  const quizSteps = document.querySelectorAll('.quiz-calc__step');
  const quizProgressFill = document.getElementById('quiz-progress-fill');
  const quizDots = document.querySelectorAll('.quiz-calc__step-dot');
  const quizSlider = document.getElementById('quiz-damage-count');
  const quizSliderValue = document.getElementById('quiz-slider-value');
  const quizSliderFill = document.getElementById('quiz-slider-fill');
  const quizResultPriceFinal = document.getElementById('quiz-result-price-final');
  const quizPhoneForm = document.getElementById('quiz-phone-form');
  const quizPhoneInput = document.getElementById('quiz-phone-input');

  const TOTAL_STEPS = 4;
  let currentStep = 1;

  const basePrices = [5000, 5000, 5000, 5000, 5000,
                      7000, 7000, 7000, 7000, 7000,
                      10000, 10000, 10000, 10000, 10000];

  const expertiseLabels = {
    autotech: 'Видеоаналитика',
    dtp: 'Обстоятельства ДТП',
    technical: 'Техническое состояние',
    trace: 'Трасологическая',
    autotrade: 'Оценка стоимости',
    commodity: 'Товароведческая'
  };

  function showStep(step) {
    currentStep = step;
    quizSteps.forEach(s => s.classList.remove('quiz-calc__step--active'));
    const target = document.getElementById('quiz-step-' + step);
    if (target) target.classList.add('quiz-calc__step--active');
    const pct = ((step - 1) / (TOTAL_STEPS - 1)) * 100;
    if (quizProgressFill) quizProgressFill.style.width = pct + '%';
    quizDots.forEach(dot => {
      const dotStep = parseInt(dot.getAttribute('data-step'), 10);
      dot.classList.remove('active', 'completed');
      if (dotStep === step) dot.classList.add('active');
      else if (dotStep < step) dot.classList.add('completed');
    });
    if (step === 2) updateQuizSlider();
    if (step === 3) showPricePreview();
  }

  function showPricePreview() {
    const typeRadio = document.querySelector('input[name="expertise"]:checked');
    const typeMultiplier = typeRadio ? parseFloat(typeRadio.closest('.quiz-calc__option').getAttribute('data-multiplier')) || 1.0 : 1.0;
    const quantity = quizSlider ? parseInt(quizSlider.value, 10) : 1;
    const basePrice = basePrices[quantity - 1] || 5000;
    const raw = Math.round(basePrice * typeMultiplier);
    const rounded = Math.round(raw / 500) * 500;
    const previewEl = document.getElementById('quiz-price-preview');
    if (previewEl) {
      previewEl.textContent = 'Ориентировочно: ' + formatPrice(rounded);
      previewEl.style.display = 'block';
    }
  }

  function updateQuizSlider() {
    if (!quizSlider || !quizSliderValue || !quizSliderFill) return;
    const val = parseInt(quizSlider.value, 10);
    quizSliderValue.textContent = val;
    quizSliderValue.classList.remove('bump');
    void quizSliderValue.offsetWidth;
    quizSliderValue.classList.add('bump');
    quizSlider.setAttribute('aria-valuenow', val);
    const min = parseInt(quizSlider.min, 10) || 1;
    const max = parseInt(quizSlider.max, 10) || 15;
    const pct = ((val - min) / (max - min)) * 100;
    quizSliderFill.style.width = Math.max(pct, 5) + '%';
  }

  function calculatePrice() {
    const typeRadio = document.querySelector('input[name="expertise"]:checked');
    const typeMultiplier = typeRadio ? parseFloat(typeRadio.closest('.quiz-calc__option').getAttribute('data-multiplier')) || 1.0 : 1.0;
    const quantity = quizSlider ? parseInt(quizSlider.value, 10) : 1;
    const basePrice = basePrices[quantity - 1] || 5000;
    const timingRadio = document.querySelector('input[name="timing"]:checked');
    const timingMultiplier = timingRadio ? parseFloat(timingRadio.closest('.quiz-calc__option').getAttribute('data-multiplier')) || 1.0 : 1.0;
    const raw = Math.round(basePrice * typeMultiplier * timingMultiplier);
    const rounded = Math.round(raw / 500) * 500;
    return { price: rounded, quantity, typeMultiplier, timingMultiplier, basePrice };
  }

  function formatPrice(num) {
    return num.toLocaleString('ru-RU') + ' ₽';
  }

  // Кнопки «Далее» / «Рассчитать» / «Назад»
  document.querySelectorAll('.quiz-calc__next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = btn.getAttribute('data-next');
      if (next === '4') {
        // Шаг 3: рассчитать и показать результат, затем перейти на шаг 4
        const result = calculatePrice();
        if (quizResultPriceFinal) {
          quizResultPriceFinal.textContent = formatPrice(result.price);
        }
        showStep(4);
      } else {
        showStep(parseInt(next, 10));
      }
    });
  });

  document.querySelectorAll('.quiz-calc__back').forEach(btn => {
    btn.addEventListener('click', () => {
      const back = parseInt(btn.getAttribute('data-back'), 10);
      showStep(back);
    });
  });

  if (quizSlider) {
    quizSlider.addEventListener('input', updateQuizSlider);
    updateQuizSlider();
  }

  document.querySelectorAll('.quiz-calc__option').forEach(card => {
    card.addEventListener('click', () => {
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // Форма телефона на шаге 4
  if (quizPhoneForm) {
    quizPhoneForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = quizPhoneInput ? quizPhoneInput.value : '';
      if (!phone) return;
      const submitBtn = quizPhoneForm.querySelector('.quiz-calc__form-submit');
      submitBtn.textContent = 'Отправляю...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      setTimeout(() => {
        alert('Спасибо! Мы перезвоним на ' + phone + ' в ближайшее время.');
        quizPhoneForm.reset();
        submitBtn.textContent = 'Получить оценку';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }, 800);
    });

    if (quizPhoneInput) {
      quizPhoneInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length === 0) { e.target.value = ''; return; }
        if (val[0] === '8') val = '7' + val.slice(1);
        if (val[0] !== '7') val = '7' + val;
        let formatted = '+7';
        if (val.length > 1) formatted += ' (' + val.slice(1, 4);
        if (val.length > 4) formatted += ') ' + val.slice(4, 7);
        if (val.length > 7) formatted += '-' + val.slice(7, 9);
        if (val.length > 9) formatted += '-' + val.slice(9, 11);
        e.target.value = formatted;
      });
    }
  }
});
