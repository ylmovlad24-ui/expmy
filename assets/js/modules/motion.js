/**
 * Motion Design - Premium Animations
 * Lenis + GSAP + ScrollTrigger
 */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal, .reveal-entrance, .reveal-exit, .reveal-stagger > *').forEach(function(el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.clipPath = 'none';
    });
    return;
  }

  var lenis;

  function init() {
    try {
      console.log('Motion: Starting initialization...');
      console.log('Motion: Hero exists:', !!document.querySelector('.vnesud-hero'));
      console.log('Motion: Title exists:', !!document.querySelector('.vnesud-hero__title'));
      
      // Hide elements first (before GSAP loads)
      hideAnimatedElements();
      console.log('Motion: Elements hidden, loading Lenis...');
      
      // Fallback: show all elements if GSAP fails to load within 3 seconds
      var fallbackTimeout = setTimeout(function() {
        console.warn('Motion: GSAP fallback triggered');
        showAllElements();
      }, 3000);
      
      // Load Lenis first (optional - page works without it)
      loadScript('https://unpkg.com/lenis@1.1.18/dist/lenis.min.js')
        .then(function() {
          console.log('Motion: Lenis loaded');
          return loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js');
        })
        .catch(function() {
          console.warn('Motion: Lenis failed, continuing without it');
          return loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js');
        })
        .then(function() {
          console.log('Motion: GSAP loaded');
          return loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js');
        })
        .then(function() {
          if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('Motion: GSAP not loaded');
            clearTimeout(fallbackTimeout);
            showAllElements();
            return;
          }
          clearTimeout(fallbackTimeout);
          console.log('Motion: Registering ScrollTrigger...');
          gsap.registerPlugin(ScrollTrigger);
          initLenis();
          initProgressBar();
          initHeroAnimation();
          initHeroUseCards();
          initStepsProgressLine();
          initMagneticButtons();
          initSectionReveal();
          initCardAnimations();
          initStepsAnimation();
          initPinningSection();
          initFooterReveal();
          initCustomCursor();
          console.log('Motion: All animations initialized');
        })
        .catch(function(err) {
          console.warn('Motion init error:', err);
          clearTimeout(fallbackTimeout);
          showAllElements();
        });
    } catch (e) {
      console.warn('Motion init error:', e);
    }
  }

  function showAllElements() {
    var all = document.querySelectorAll('.vnesud-hero, .vnesud-hero__title, .vnesud-hero__actions .btn--primary, .vnesud-hero-use, .vnesud-direction, .guarantee-card, .vnesud-case, .vnesud-step, section.reveal, .footer');
    all.forEach(function(el) {
      el.style.opacity = '1';
    });
  }

  function hideAnimatedElements() {
    // Hide hero entrance — только opacity, без transform (не ломает layout)
    var hero = document.querySelector('.vnesud-hero');
    if (hero) hero.style.opacity = '0';
    // Hide CTA button
    var btn = document.querySelector('.vnesud-hero__actions .btn--primary');
    if (btn) {
      btn.style.opacity = '0';
    }
    // Hide hero use cards
    var useCards = document.querySelectorAll('.vnesud-hero-use');
    useCards.forEach(function(c) { 
      c.style.opacity = '0';
    });
    // Hide direction cards
    var dirs = document.querySelectorAll('.vnesud-direction');
    dirs.forEach(function(c) {
      c.style.opacity = '0';
    });
    // Hide guarantee cards
    var guar = document.querySelectorAll('.guarantee-card');
    guar.forEach(function(c) {
      c.style.opacity = '0';
    });
    // Hide case cards
    var cases = document.querySelectorAll('.vnesud-case');
    cases.forEach(function(c) {
      c.style.opacity = '0';
    });
    // Hide steps
    var steps = document.querySelectorAll('.vnesud-step');
    steps.forEach(function(c) {
      c.style.opacity = '0';
    });
    // Footer
    var footer = document.querySelector('.footer');
    if (footer) {
      footer.style.opacity = '0';
    }
  }

  function loadScript(src) {
    return new Promise(function(resolve, reject) {
      if (document.querySelector('script[src="' + src + '"]')) {
        resolve();
        return;
      }
      var script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = function() { reject(new Error('Script load failed: ' + src)); };
      document.head.appendChild(script);
    });
  }

  function initLenis() {
    try {
      if (typeof Lenis === 'undefined') return;
      var isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1.0, touchMultiplier: isTouch ? 1 : 2, smoothWheel: !isTouch });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function(time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
      document.body.classList.add('lenis-active');
    } catch (e) { console.warn('Lenis error:', e); }
  }

  function initProgressBar() {
    try {
      var bar = document.querySelector('.progress-bar');
      if (!bar) return;
      if (!CSS.supports('animation-timeline', 'scroll()')) {
        window.addEventListener('scroll', function() {
          var st = window.pageYOffset || document.documentElement.scrollTop;
          var dh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          bar.style.width = ((st / dh) * 100) + '%';
        }, { passive: true });
      }
    } catch (e) { console.warn('Progress bar error:', e); }
  }

  function initHeroAnimation() {
    try {
      var hero = document.querySelector('.vnesud-hero');
      if (hero) {
        gsap.set(hero, { opacity: 1, y: 0 });
      }
      
      var title = document.querySelector('.vnesud-hero__title');
      if (!title) return;
      var words = title.textContent.trim().split(/\s+/);
      if (words.length <= 1) {
        gsap.set(title, { opacity: 1, y: 0 });
        return;
      }
      
      // Find keyword for handwritten stroke
      var keyword = 'внесудебная';
      var lowerText = title.textContent.toLowerCase();
      var keywordIndex = lowerText.indexOf(keyword);
      
      var html = '';
      for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var lowerWord = word.toLowerCase();
        
        // Check if this word is the keyword
        if (keywordIndex !== -1 && lowerWord === keyword) {
          // Wrap keyword in span with SVG underline
          html += '<span class="word keyword-wrap" style="display:inline-block;position:relative;">';
          html += word;
          html += '<span class="keyword-stroke" style="position:absolute;bottom:-4px;left:0;right:0;height:8px;overflow:visible;">';
          html += '<svg viewBox="0 0 100 12" preserveAspectRatio="none" style="width:100%;height:100%;display:block;">';
          html += '<path d="M 2 8 Q 25 2, 50 6 T 98 4" fill="none" stroke="#e8731a" stroke-width="2" stroke-linecap="round" class="stroke-path" style="stroke-dasharray: 120; stroke-dashoffset: 120;"/>';
          html += '</svg>';
          html += '</span>';
          html += '</span>';
          keywordIndex = -1; // Mark as handled
        } else {
          html += '<span class="word" style="display:inline-block">' + word + '</span>';
        }
        if (i < words.length - 1) html += ' ';
      }
      title.innerHTML = html;
      var spans = title.querySelectorAll('.word');
      gsap.set(spans, { opacity: 0, y: 60 });
      gsap.to(spans, { opacity: 1, y: 0, duration: 0.7, stagger: 0.075, ease: 'expo.out', delay: 0.3 });
      
      // Animate handwritten stroke after words appear
      var strokePath = title.querySelector('.stroke-path');
      if (strokePath) {
        var totalDelay = 0.3 + (words.length * 0.075) + 0.3;
        gsap.to(strokePath, {
          strokeDashoffset: 0,
          duration: 1,
          ease: 'power2.out',
          delay: totalDelay
        });
      }
      
      var btn = document.querySelector('.vnesud-hero__actions .btn--primary');
      if (btn) {
        gsap.set(btn, { opacity: 0, y: 20 });
        gsap.to(btn, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.3 + (words.length * 0.075) + 0.3 });
      }
    } catch (e) { console.warn('Hero animation error:', e); }
  }

  function initHeroUseCards() {
    try {
      var cards = document.querySelectorAll('.vnesud-hero-use');
      if (cards.length === 0) return;
      ScrollTrigger.create({ trigger: '.vnesud-hero-uses', start: 'top 80%', onEnter: function() {
        gsap.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' });
      }, once: true });
    } catch (e) { console.warn('Hero use cards error:', e); }
  }

  // 3.3 Вертикальная прогресс-линия scrub (растёт при скролле)
  function initStepsProgressLine() {
    try {
      var line = document.querySelector('.steps-progress-line');
      if (!line) return;
      
      var section = document.querySelector('#how-we-work');
      if (!section) return;
      
      // Начальное состояние — высота 0
      gsap.set(line, { height: 0 });
      
      // Scrub: линия растёт от 0 до 100% при скролле секции
      gsap.to(line, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: true
        }
      });
    } catch (e) { console.warn('Steps progress line error:', e); }
  }

  // 4.1 Магнитные кнопки (CTA притягивается к курсору)
  function initMagneticButtons() {
    try {
      if ('ontouchstart' in window) return;
      
      var buttons = document.querySelectorAll('.btn--primary');
      buttons.forEach(function(btn) {
        var radius = 70; // 60-80px по ТЗ
        var maxOffset = 10; // 8-10px по ТЗ
        
        btn.addEventListener('mousemove', function(e) {
          var rect = btn.getBoundingClientRect();
          var x = e.clientX - rect.left - rect.width / 2;
          var y = e.clientY - rect.top - rect.height / 2;
          var dist = Math.sqrt(x * x + y * y);
          
          if (dist < radius) {
            var factor = (1 - dist / radius) * maxOffset;
            var moveX = (x / (dist || 1)) * factor;
            var moveY = (y / (dist || 1)) * factor;
            gsap.to(btn, {
              x: moveX,
              y: moveY,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        });
        
        btn.addEventListener('mouseleave', function() {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.5)'
          });
        });
      });
    } catch (e) { console.warn('Magnetic buttons error:', e); }
  }

  function initSectionReveal() {
    try {
      var secs = document.querySelectorAll('section.reveal');
      secs.forEach(function(sec) {
        gsap.set(sec, { opacity: 0, y: 40 });
        ScrollTrigger.create({ 
          trigger: sec, 
          start: 'top 85%', 
          onEnter: function() {
            gsap.to(sec, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
          }, 
          once: true 
        });
      });
    } catch (e) { console.warn('Section reveal error:', e); }
  }

  function initCardAnimations() {
    try {
      var dirs = document.querySelector('.vnesud-directions');
      if (dirs) {
        var dc = dirs.querySelectorAll('.vnesud-direction');
        ScrollTrigger.create({ trigger: dirs, start: 'top 75%', onEnter: function() {
          gsap.to(dc, { opacity: 1, y: 0, duration: 0.6, stagger: 0.09, ease: 'power2.out' });
        }, once: true });
        for (var i = 0; i < dc.length; i++) {
          (function(card) {
            card.addEventListener('mouseenter', function() { gsap.to(dc, { opacity: 0.6, duration: 0.3, ease: 'power2.out', overwrite: true }); gsap.to(card, { opacity: 1, y: -6, boxShadow: '0 12px 40px rgba(0,0,0,0.1)', duration: 0.3, ease: 'power2.out', overwrite: true }); });
            card.addEventListener('mouseleave', function() { gsap.to(dc, { opacity: 1, y: 0, boxShadow: 'none', duration: 0.3, ease: 'power2.out', overwrite: true }); });
          })(dc[i]);
        }
      }
      var guar = document.querySelector('.guarantees-grid');
      if (guar) {
        var gc = guar.querySelectorAll('.guarantee-card');
        ScrollTrigger.create({ trigger: guar, start: 'top 75%', onEnter: function() {
          gsap.to(gc, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' });
        }, once: true });
      }
      var cases = document.querySelector('.vnesud-cases');
      if (cases) {
        var cc = cases.querySelectorAll('.vnesud-case');
        ScrollTrigger.create({ trigger: cases, start: 'top 75%', onEnter: function() {
          gsap.to(cc, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' });
        }, once: true });
      }
    } catch (e) { console.warn('Card animations error:', e); }
  }

  function initStepsAnimation() {
    try {
      var ss = document.querySelector('#how-we-work');
      if (!ss) return;
      
      // Параллакс номеров при скролле
      if (window.innerWidth >= 768) {
        var nums = ss.querySelectorAll('.vnesud-step__num');
        ScrollTrigger.create({ trigger: ss, start: 'top bottom', end: 'bottom top', scrub: true, onUpdate: function(self) {
          nums.forEach(function(n, i) { gsap.set(n, { y: -self.progress * 100 * (0.6 + i * 0.1) }); });
        } });
      }
      
      var steps = ss.querySelectorAll('.vnesud-step');
      steps.forEach(function(step) {
        ScrollTrigger.create({ trigger: step, start: 'top 65%', onEnter: function() {
          gsap.to(step, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' });
        }, once: true });
      });
    } catch (e) { console.warn('Steps animation error:', e); }
  }

  function initPinningSection() {
    try {
      if (window.innerWidth < 768) return;
      var ps = document.querySelector('#guarantees');
      if (!ps) return;
      var cards = ps.querySelectorAll('.guarantee-card');
      if (cards.length < 3) return;
      var tl = gsap.timeline({ scrollTrigger: { trigger: ps, start: 'top 20%', end: '+=200%', pin: true, scrub: true } });
      for (var i = 1; i < cards.length; i++) {
        tl.to(cards[i-1], { opacity: 0, y: -30, duration: 0.3, ease: 'power2.inOut' }, (i-1) * 0.5);
        tl.to(cards[i], { opacity: 1, y: 0, duration: 0.3, ease: 'power2.inOut' }, (i-1) * 0.5);
      }
      tl.to(cards[cards.length-1], { opacity: 0, y: 30, duration: 0.2, ease: 'power2.inOut' }, 1);
      var cardsArr = Array.prototype.slice.call(cards);
      gsap.set(cardsArr.slice(1), { opacity: 0, y: 30 });
    } catch (e) { console.warn('Pinning error:', e); }
  }

  function initFooterReveal() {
    try {
      var footer = document.querySelector('.footer');
      if (!footer) return;
      ScrollTrigger.create({ trigger: 'main', start: 'bottom 80%', onEnter: function() {
        gsap.to(footer, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      }, once: true });
    } catch (e) { console.warn('Footer reveal error:', e); }
  }

  function initCustomCursor() {
    try {
      if ('ontouchstart' in window) return;
      var cursor = document.createElement('div');
      cursor.style.cssText = 'position:fixed;width:10px;height:10px;background:#e8731a;border-radius:50%;pointer-events:none;z-index:99999;mix-blend-mode:difference;transform:translate(-50%,-50%)';
      document.body.appendChild(cursor);
      var ring = document.createElement('div');
      ring.style.cssText = 'position:fixed;width:40px;height:40px;border:2px solid rgba(232,115,26,0.5);border-radius:50%;pointer-events:none;z-index:99998;transform:translate(-50%,-50%)';
      document.body.appendChild(ring);
      var mx = 0, my = 0, rx = 0, ry = 0;
      document.addEventListener('mousemove', function(e) { mx = e.clientX; my = e.clientY; gsap.set(cursor, { x: mx, y: my }); });
      (function anim() { rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1; gsap.set(ring, { x: rx, y: ry }); requestAnimationFrame(anim); })();
      var targets = document.querySelectorAll('a, button, .vnesud-direction, .guarantee-card');
      for (var i = 0; i < targets.length; i++) {
        (function(t) {
          t.addEventListener('mouseenter', function() { gsap.to(ring, { width: 64, height: 64, borderColor: 'rgba(232,115,26,0.8)', duration: 0.3 }); });
          t.addEventListener('mouseleave', function() { gsap.to(ring, { width: 40, height: 40, borderColor: 'rgba(232,115,26,0.5)', duration: 0.3 }); });
        })(targets[i]);
      }
    } catch (e) { console.warn('Cursor error:', e); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
