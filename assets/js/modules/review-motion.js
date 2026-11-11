/**
 * Рецензия на экспертизу — GSAP ScrollTrigger анимации
 * Чистый код: модуль, без глобальных переменных, только GSAP
 */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  function init() {
    try {
      loadScript('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js')
        .then(function () {
          return loadScript('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js');
        })
        .then(function () {
          if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
          gsap.registerPlugin(ScrollTrigger);

          initHeroAnimation();
          initHeroUseCards();
          initDirectionsAnimation();
          initGuaranteesAnimation();
          initMagnetAnimation();
          initCasesAnimation();
          initReviewsAnimation();
          initLegalAnimation();
          initFAQAnimation();
          initCTAAnimation();
        })
        .catch(function (err) {
          console.warn('Review motion init error:', err);
        });
    } catch (e) {
      console.warn('Review motion init error:', e);
    }
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (document.querySelector('script[src="' + src + '"]')) {
        resolve();
        return;
      }
      var script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = function () { reject(new Error('Script load failed: ' + src)); };
      document.head.appendChild(script);
    });
  }

  function initHeroAnimation() {
    var hero = document.querySelector('.rev-hero');
    if (!hero) return;
    var title = hero.querySelector('.rev-hero__title');
    if (!title) return;

    var words = title.textContent.trim().split(/\s+/);
    if (words.length <= 1) {
      gsap.set(title, { opacity: 1, y: 0 });
      return;
    }

    var html = '';
    for (var i = 0; i < words.length; i++) {
      html += '<span class="word" style="display:inline-block">' + words[i] + '</span>';
      if (i < words.length - 1) html += ' ';
    }
    title.innerHTML = html;
    var spans = title.querySelectorAll('.word');
    gsap.set(spans, { opacity: 0, y: 60 });
    gsap.to(spans, { opacity: 1, y: 0, duration: 0.7, stagger: 0.075, ease: 'expo.out', delay: 0.3 });

    var badges = hero.querySelector('.rev-hero__badges');
    if (badges) {
      gsap.set(badges, { opacity: 0, y: 20 });
      gsap.to(badges, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.3 + (words.length * 0.075) + 0.2 });
    }
  }

  function initHeroUseCards() {
    var cards = document.querySelectorAll('.rev-hero-use');
    if (cards.length === 0) return;

    gsap.set(cards, { opacity: 0, y: 30 });
    ScrollTrigger.create({
      trigger: '.rev-hero-uses',
      start: 'top 80%',
      onEnter: function () {
        gsap.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' });
      },
      once: true
    });
  }

  function initDirectionsAnimation() {
    var dirs = document.querySelectorAll('.rev-direction');
    if (dirs.length === 0) return;

    gsap.set(dirs, { opacity: 0, y: 30 });
    ScrollTrigger.create({
      trigger: '.rev-directions',
      start: 'top 80%',
      onEnter: function () {
        gsap.to(dirs, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' });
      },
      once: true
    });
  }

  function initGuaranteesAnimation() {
    var guarantees = document.querySelectorAll('.rev-guarantee');
    if (guarantees.length === 0) return;

    gsap.set(guarantees, { opacity: 0, y: 30 });
    ScrollTrigger.create({
      trigger: '.rev-guarantees',
      start: 'top 80%',
      onEnter: function () {
        gsap.to(guarantees, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' });
      },
      once: true
    });
  }

  function initMagnetAnimation() {
    var magnet = document.querySelector('.rev-magnet');
    if (!magnet) return;

    gsap.set(magnet, { opacity: 0, y: 30 });
    ScrollTrigger.create({
      trigger: magnet,
      start: 'top 85%',
      onEnter: function () {
        gsap.to(magnet, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
      },
      once: true
    });
  }

  function initCasesAnimation() {
    var cases = document.querySelectorAll('.rev-case');
    if (cases.length === 0) return;

    gsap.set(cases, { opacity: 0, y: 30 });
    ScrollTrigger.create({
      trigger: '.rev-cases',
      start: 'top 80%',
      onEnter: function () {
        gsap.to(cases, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' });
      },
      once: true
    });
  }

  function initReviewsAnimation() {
    var reviews = document.querySelectorAll('.rev-review');
    if (reviews.length === 0) return;

    gsap.set(reviews, { opacity: 0, y: 30 });
    ScrollTrigger.create({
      trigger: '.rev-reviews',
      start: 'top 80%',
      onEnter: function () {
        gsap.to(reviews, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' });
      },
      once: true
    });
  }

  function initLegalAnimation() {
    var legal = document.querySelector('.rev-legal');
    if (!legal) return;

    gsap.set(legal, { opacity: 0, y: 30 });
    ScrollTrigger.create({
      trigger: legal,
      start: 'top 85%',
      onEnter: function () {
        gsap.to(legal, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
      },
      once: true
    });
  }

  function initFAQAnimation() {
    var faqItems = document.querySelectorAll('.rev-faq-item');
    if (faqItems.length === 0) return;

    gsap.set(faqItems, { opacity: 0, y: 20 });
    ScrollTrigger.create({
      trigger: '.rev-faq',
      start: 'top 80%',
      onEnter: function () {
        gsap.to(faqItems, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' });
      },
      once: true
    });
  }

  function initCTAAnimation() {
    var cta = document.querySelector('.rev-cta__inner');
    if (!cta) return;

    gsap.set(cta, { opacity: 0, y: 40 });
    ScrollTrigger.create({
      trigger: '.rev-cta-section',
      start: 'top 80%',
      onEnter: function () {
        gsap.to(cta, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
      },
      once: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
