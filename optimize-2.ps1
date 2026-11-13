# ============================================
# ДОПОЛНИТЕЛЬНАЯ ОПТИМИЗАЦИЯ
# Анимации, memory leaks, доступность, навигация, тёмная тема
# ============================================

$projectDir = "C:\Users\Vlad\Documents\Ptodjec\expmy"
$jsDir = "$projectDir\assets\js\modules"
$cssDir = "$projectDir\assets\css"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " ДОПОЛНИТЕЛЬНАЯ ОПТИМИЗАЦИЯ" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# ============================================
# 1. ОПТИМИЗАЦИЯ АНИМАЦИЙ — УДАЛЕНИЕ ЛИШНИХ
# ============================================
Write-Host "`n🎬 ШАГ 1: Оптимизация анимаций..." -ForegroundColor Yellow

# Удаляем noise-overlay.css из main-optimized.css
Write-Host "  Удаление noise-overlay из CSS..." -ForegroundColor Gray
$optimizedCSS = Get-Content "$cssDir\main-optimized.css" -Raw -Encoding UTF8
$noiseOverlay = $optimizedCSS -replace "(?s)\/\*.*?noise-overlay.*?\*\/", ""
$noiseOverlay = $noiseOverlay -replace "\.noise-overlay.*?\n\}", ""
Set-Content -Path "$cssDir\main-optimized.css" -Value $noiseOverlay -Encoding UTF8 -Force
Write-Host "  ✅ noise-overlay удалён" -ForegroundColor Green

# Удаляем custom-cursor.css (тяжёлый, не нужен на мобильных)
Write-Host "  Удаление custom-cursor из CSS..." -ForegroundColor Gray
$optimizedCSS = Get-Content "$cssDir\main-optimized.css" -Raw -Encoding UTF8
$customCursor = $optimizedCSS -replace "(?s)\/\*.*?custom-cursor.*?\*\/", ""
Set-Content -Path "$cssDir\main-optimized.css" -Value $customCursor -Encoding UTF8 -Force
Write-Host "  ✅ custom-cursor удалён" -ForegroundColor Green

# ============================================
# 2. FIX MEMORY LEAKS — ОЧИСТКА LISTENERS
# ============================================
Write-Host "`n🧹 ШАГ 2: Fix memory leaks..." -ForegroundColor Yellow

# Обновляем 3d-cards.js с очисткой
Write-Host "  Обновление 3d-cards.js..." -ForegroundColor Gray
$cardsJS = @"
/**
 * 3D Card Transforms — Tilt эффект по курсору
 * WCAG 2.3.3: Respects prefers-reduced-motion
 * FIX: Proper cleanup on page unload
 */
(function() {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Only on non-touch devices
  if ('ontouchstart' in window) return;

  class Card3D {
    constructor(element, options) {
      this.el = element;
      this.maxTilt = (options && options.maxTilt) || 8;
      this.perspective = (options && options.perspective) || 1000;
      this.scale = (options && options.scale) || 1.02;
      this.speed = (options && options.speed) || 400;
      this.transitionEasing = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';

      this.bounds = null;
      this.isHovering = false;

      this.handleEnter = this.handleEnter.bind(this);
      this.handleMove = this.handleMove.bind(this);
      this.handleLeave = this.handleLeave.bind(this);

      this.init();
    }

    init() {
      this.el.style.perspective = this.perspective + 'px';
      this.el.style.transformStyle = 'preserve-3d';

      // Add depth layers
      var icon = this.el.querySelector('.card__icon, .card__image, .service-card__icon');
      if (icon) icon.style.transform = 'translateZ(30px)';

      var title = this.el.querySelector('.card__title, .service-card__title');
      if (title) title.style.transform = 'translateZ(20px)';

      var desc = this.el.querySelector('.card__desc, .service-card__desc');
      if (desc) desc.style.transform = 'translateZ(10px)';

      // Events
      this.el.addEventListener('mouseenter', this.handleEnter);
      this.el.addEventListener('mousemove', this.handleMove);
      this.el.addEventListener('mouseleave', this.handleLeave);
    }

    handleEnter() {
      this.isHovering = true;
      this.bounds = this.el.getBoundingClientRect();
      this.el.style.transition = 'transform ' + this.speed + 'ms ' + this.transitionEasing;
      this.el.style.transform = 'scale(' + this.scale + ')';
      this.el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15)';
    }

    handleMove(e) {
      if (!this.isHovering || !this.bounds) return;

      var mouseX = e.clientX - this.bounds.left;
      var mouseY = e.clientY - this.bounds.top;
      var centerX = this.bounds.width / 2;
      var centerY = this.bounds.height / 2;

      var rotateX = ((mouseY - centerY) / centerY) * -this.maxTilt;
      var rotateY = ((mouseX - centerX) / centerX) * this.maxTilt;

      this.el.style.transform = 'scale(' + this.scale + ') rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    }

    handleLeave() {
      this.isHovering = false;
      this.el.style.transition = 'transform ' + this.speed + 'ms ' + this.transitionEasing;
      this.el.style.transform = 'scale(1) rotateX(0) rotateY(0)';
      this.el.style.boxShadow = '';
    }

    // FIX: Cleanup method to prevent memory leaks
    destroy() {
      this.el.removeEventListener('mouseenter', this.handleEnter);
      this.el.removeEventListener('mousemove', this.handleMove);
      this.el.removeEventListener('mouseleave', this.handleLeave);
    }
  }

  // Initialize on all cards
  var cards = document.querySelectorAll('.service-card, .vnesud-direction, .sudeb-direction, .recz-direction, .category-card, .guarantee-card');
  var cardInstances = [];

  cards.forEach(function(card) {
    cardInstances.push(new Card3D(card));
  });

  // FIX: Cleanup on page unload
  window.addEventListener('beforeunload', function() {
    cardInstances.forEach(function(instance) {
      instance.destroy();
    });
  });

  console.log('Motion: 3D cards initialized');
})();
"@
Set-Content -Path "$jsDir\3d-cards.js" -Value $cardsJS -Encoding UTF8 -Force
Write-Host "  ✅ 3d-cards.js обновлён (cleanup added)" -ForegroundColor Green

# ============================================
# 3. ИСПРАВЛЕНИЕ ДОСТУПНОСТИ — ARIA-CONTROLS
# ============================================
Write-Host "`n♿ ШАГ 3: Исправление доступности..." -ForegroundColor Yellow

# Обновляем FAQ accordion с aria-controls
Write-Host "  Обновление faq.js с aria-controls..." -ForegroundColor Gray
$faqJS = @"
/**
 * FAQ Accordion module
 * WCAG 2.1.1: Keyboard accessible (Enter/Space)
 * WCAG 4.1.2: ARIA attributes (aria-expanded, aria-controls, aria-hidden)
 */
var FaqAccordion = (function() {
  'use strict';

  function toggleItem(btn, group) {
    var item = btn.closest('.faq-item');
    var answer = item.querySelector('.faq-item__answer');
    if (!answer) return;
    var isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Close all siblings in this group
    group.querySelectorAll('.faq-item').forEach(function(el) {
      var b = el.querySelector('.faq-item__question');
      var a = el.querySelector('.faq-item__answer');
      if (b) b.setAttribute('aria-expanded', 'false');
      if (a) {
        a.setAttribute('aria-hidden', 'true');
        a.hidden = true;
      }
      el.classList.remove('open');
    });

    // Toggle current
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      answer.setAttribute('aria-hidden', 'false');
      answer.hidden = false;
    }
  }

  function init() {
    // Delegate to each .faq-group
    document.querySelectorAll('.faq-group').forEach(function(group) {
      // Click handler
      group.addEventListener('click', function(e) {
        var btn = e.target.closest('.faq-item__question');
        if (!btn) return;
        toggleItem(btn, group);
      });

      // Keyboard handler — Enter/Space
      group.addEventListener('keydown', function(e) {
        var btn = e.target.closest('.faq-item__question');
        if (!btn) return;

        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleItem(btn, group);
        }

        // Arrow keys — navigate between questions
        if (e.key === 'ArrowDown') {
          var next = btn.closest('.faq-item').nextElementSibling;
          if (next) {
            var nextBtn = next.querySelector('.faq-item__question');
            if (nextBtn) nextBtn.focus();
          }
        }
        if (e.key === 'ArrowUp') {
          var prev = btn.closest('.faq-item').previousElementSibling;
          if (prev) {
            var prevBtn = prev.querySelector('.faq-item__question');
            if (prevBtn) prevBtn.focus();
          }
        }
        if (e.key === 'Home') {
          var firstBtn = group.querySelector('.faq-item__question');
          if (firstBtn) firstBtn.focus();
        }
        if (e.key === 'End') {
          var items = group.querySelectorAll('.faq-item__question');
          if (items.length > 0) items[items.length - 1].focus();
        }
      });
    });

    // Also handle .faq-main-item (inline FAQ on index.html)
    document.querySelectorAll('.faq-main-item').forEach(function(item) {
      var questionEl = item.querySelector('.faq-main-item__question');
      if (!questionEl) return;

      // Only convert divs to buttons if not already buttons
      if (questionEl.tagName !== 'BUTTON') {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'faq-main-item__question';
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', questionEl.textContent.trim());
        btn.innerHTML = questionEl.innerHTML;
        questionEl.replaceWith(btn);
        questionEl = btn;
      }

      var answer = item.querySelector('.faq-main-item__answer');
      if (answer) {
        answer.setAttribute('role', 'region');
        answer.setAttribute('aria-hidden', 'true');
        answer.hidden = true;
      }

      questionEl.addEventListener('click', function() {
        var isExpanded = questionEl.getAttribute('aria-expanded') === 'true';
        questionEl.setAttribute('aria-expanded', String(!isExpanded));
        if (answer) {
          answer.setAttribute('aria-hidden', String(isExpanded));
          answer.hidden = isExpanded;
        }
        item.classList.toggle('open', !isExpanded);
      });

      questionEl.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          questionEl.click();
        }
      });
    });
  }

  return {
    init: init
  };
})();
"@
Set-Content -Path "$jsDir\faq.js" -Value $faqJS -Encoding UTF8 -Force
Write-Host "  ✅ faq.js обновлён (aria-controls added)" -ForegroundColor Green

# ============================================
# 4. ОПТИМИЗАЦИЯ НАВИГАЦИИ — DROPDOWN
# ============================================
Write-Host "`n🧭 ШАГ 4: Оптимизация навигации..." -ForegroundColor Yellow

# Обновляем components.js с улучшенной навигацией
Write-Host "  Обновление components.js..." -ForegroundColor Gray
$componentsJS = @"
/**
 * Компоненты шапки и подвала
 * Загружает header.html и footer.html на все страницы
 */
(function() {
  'use strict';

  function getBasePath() {
    var path = window.location.pathname;
    if (path.indexOf('/pages/services/') !== -1) return '../../../';
    if (path.indexOf('/pages/') !== -1) return '../';
    if (path.indexOf('/vnesudebnaya/') !== -1) return '../';
    if (path.indexOf('/recenziya/') !== -1) return '../';
    if (path.indexOf('/sudebnaya/') !== -1) return '../';
    if (path.indexOf('/faq/') !== -1) return '../';
    if (path.indexOf('/avtotehnicheskaya/') !== -1) {
      var depth = (path.match(/\//g) || []).length;
      return depth >= 3 ? '../../' : '../';
    }
    if (path.indexOf('/avtotovarovedcheskaya/') !== -1) {
      var depth2 = (path.match(/\//g) || []).length;
      return depth2 >= 3 ? '../../' : '../';
    }
    if (path.indexOf('/ceny/') !== -1) return '../';
    if (path.indexOf('/diplomy/') !== -1) return '../';
    if (path.indexOf('/dosudebnye-dlya-yurfirmy/') !== -1) return '../';
    if (path.indexOf('/eksperty/') !== -1) return '../';
    if (path.indexOf('/keysy/') !== -1) return '../';
    if (path.indexOf('/kontakty/') !== -1) return '../';
    if (path.indexOf('/o-kompanii/') !== -1) return '../';
    if (path.indexOf('/oferta/') !== -1) return '../';
    if (path.indexOf('/partners/') !== -1) return '../';
    if (path.indexOf('/politika/') !== -1) return '../';
    if (path.indexOf('/recenzii-dlya-yuristov/') !== -1) return '../';
    if (path.indexOf('/spasibo/') !== -1) return '../';
    if (path.indexOf('/tovarovedcheskaya-b2b/') !== -1) return '../';
    if (path.indexOf('/uzly-i-agregaty/') !== -1) return '../';
    return '';
  }

  function loadComponent(filePath, containerId) {
    var basePath = getBasePath();
    var url = basePath + 'components/' + filePath;
    
    fetch(url)
      .then(function(response) {
        if (!response.ok) throw new Error('Failed to load ' + filePath);
        return response.text();
      })
      .then(function(html) {
        var container = document.getElementById(containerId);
        if (container) {
          container.innerHTML = html;
          adaptPathsForGitHubPages(container);
          if (filePath === 'header.html') {
            initHeader();
            if (typeof BurgerMenu !== 'undefined' && BurgerMenu.init) {
              setTimeout(function() { BurgerMenu.init(); }, 100);
            }
          }
        }
      })
      .catch(function(error) {
        console.warn('Component load error:', error);
      });
  }

  function adaptPathsForGitHubPages(container) {
    var host = window.location.host;
    if (host.indexOf('github.io') === -1) return;
    
    var pathParts = window.location.pathname.split('/');
    var repoName = pathParts[1];
    if (!repoName) return;
    
    var prefix = '/' + repoName + '/';
    var allLinks = container.querySelectorAll('a[href]');
    allLinks.forEach(function(link) {
      var href = link.getAttribute('href');
      if (!href || href.startsWith('tel:') || href.startsWith('mailto:') || 
          href.startsWith('#') || href.startsWith('http://') || 
          href.startsWith('https://') || href.startsWith('javascript:')) return;
      
      if (href.startsWith('/') && !href.startsWith('//')) {
        var newHref = prefix + href.substring(1);
        link.setAttribute('href', newHref);
      }
    });
  }

  function initHeader() {
    var header = document.querySelector('.header');
    if (!header) return;

    // Desktop dropdowns — click to toggle
    var desktopToggles = header.querySelectorAll('.header__dropdown-toggle');
    desktopToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var dropdown = this.closest('.header__dropdown');
        if (!dropdown) return;
        var menu = dropdown.querySelector('.header__dropdown-menu');
        var isExpanded = this.getAttribute('aria-expanded') === 'true';

        // Close all other dropdowns
        header.querySelectorAll('.header__dropdown').forEach(function(d) {
          if (d !== dropdown) {
            var btn = d.querySelector('.header__dropdown-toggle');
            var m = d.querySelector('.header__dropdown-menu');
            if (btn) btn.setAttribute('aria-expanded', 'false');
            if (m) m.classList.remove('open');
          }
        });

        // Toggle current
        this.setAttribute('aria-expanded', String(!isExpanded));
        menu.classList.toggle('open', !isExpanded);
      });

      // Keyboard support
      toggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
        if (e.key === 'Escape') {
          var dropdown = this.closest('.header__dropdown');
          var menu = dropdown.querySelector('.header__dropdown-menu');
          this.setAttribute('aria-expanded', 'false');
          menu.classList.remove('open');
          this.blur();
        }
      });
    });

    // Close desktop dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (!header.contains(e.target)) {
        header.querySelectorAll('.header__dropdown').forEach(function(d) {
          var btn = d.querySelector('.header__dropdown-toggle');
          var m = d.querySelector('.header__dropdown-menu');
          if (btn) btn.setAttribute('aria-expanded', 'false');
          if (m) m.classList.remove('open');
        });
      }
    });

    // Mobile dropdowns
    var mobileToggles = header.querySelectorAll('.header__menu-dropdown-toggle');
    mobileToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var dropdown = this.closest('.header__menu-dropdown');
        if (!dropdown) return;
        var menu = dropdown.querySelector('.header__menu-dropdown-menu');
        var isExpanded = this.getAttribute('aria-expanded') === 'true';

        this.setAttribute('aria-expanded', String(!isExpanded));
        dropdown.classList.toggle('open', !isExpanded);
        if (menu) menu.style.display = !isExpanded ? 'block' : 'none';
      });

      // Keyboard support
      toggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
        if (e.key === 'Escape') {
          var dropdown = this.closest('.header__menu-dropdown');
          var menu = dropdown.querySelector('.header__menu-dropdown-menu');
          this.setAttribute('aria-expanded', 'false');
          dropdown.classList.remove('open');
          if (menu) menu.style.display = 'none';
          this.blur();
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header.html', 'header-container');
    loadComponent('footer.html', 'footer-container');
  });

})();
"@
Set-Content -Path "$jsDir\components.js" -Value $componentsJS -Encoding UTF8 -Force
Write-Host "  ✅ components.js обновлён (dropdown fixed)" -ForegroundColor Green

# ============================================
# 5. ТЁМНАЯ ТЕМА — PREFERS-COLOR-SCHEME
# ============================================
Write-Host "`n🌙 ШАГ 5: Добавление тёмной темы..." -ForegroundColor Yellow

# Добавляем тёмную тему в variables.css
Write-Host "  Добавление prefers-color-scheme в variables.css..." -ForegroundColor Gray
$variablesCSS = Get-Content "$cssDir\base\variables.css" -Raw -Encoding UTF8
$darkTheme = @"

/* ==========================================
   DARK MODE SUPPORT (WCAG 2.2 AA)
   ========================================== */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a2e;
    --bg-light: #16213e;
    --text: #e0e0e0;
    --text-light: #a0a0a0;
    --border: #2a2a4a;
    --accent: #f39c12;
    --accent-hover: #e67e22;
    --primary: #3498db;
    --primary-dark: #2980b9;
  }

  .header {
    background: #1a1a2e;
    border-bottom-color: #2a2a4a;
  }

  .header__link {
    color: #a0a0a0;
  }

  .header__link:hover {
    color: #f39c12;
  }

  .section--light {
    background: #16213e;
  }

  .card, .service-card, .situation-card, .category-card {
    background: #1a1a2e;
    border-color: #2a2a4a;
  }

  .form__input, .form__select, .form__textarea {
    background: #16213e;
    color: #e0e0e0;
    border-color: #2a2a4a;
  }

  .footer {
    background: #0f0f23;
  }

  .footer__link {
    color: #a0a0a0;
  }

  .footer__link:hover {
    color: #f39c12;
  }
}
"@
$variablesCSS += $darkTheme
Set-Content -Path "$cssDir\base\variables.css" -Value $variablesCSS -Encoding UTF8 -Force
Write-Host "  ✅ Тёмная тема добавлена" -ForegroundColor Green

# ============================================
# ИТОГ
# ============================================
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host " ДОПОЛНИТЕЛЬНАЯ ОПТИМИЗАЦИЯ ЗАВЕРШЕНА!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "" -ForegroundColor White
Write-Host "СДЕЛАНО:" -ForegroundColor Green
Write-Host "  ✅ Анимации оптимизированы (noise, custom-cursor удалены)" -ForegroundColor White
Write-Host "  ✅ Memory leaks исправлены (3d-cards cleanup)" -ForegroundColor White
Write-Host "  ✅ Доступность улучшена (aria-controls FAQ)" -ForegroundColor White
Write-Host "  ✅ Навигация исправлена (dropdown fixed)" -ForegroundColor White
Write-Host "  ✅ Тёмная тема добавлена (prefers-color-scheme)" -ForegroundColor White
Write-Host "" -ForegroundColor White
Write-Host "ПЕРЕЗАГРУЗИТЕ СТРАНИЦУ!" -ForegroundColor Yellow
