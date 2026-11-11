/**
 * АвтоЭксперт — Main entry point (объединённый avtoyurist + dianomi)
 * Loads all modules in order
 */
document.addEventListener('DOMContentLoaded', function () {

  // Favicon — создаём SVG favicon динамически, чтобы убрать 404
  if (!document.querySelector('link[rel="icon"]')) {
    var faviconSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#e8731a"/><text x="16" y="22" font-size="16" font-weight="bold" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif">Э</text></svg>';
    var blob = new Blob([faviconSVG], { type: 'image/svg+xml' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = url;
    document.head.appendChild(link);
  }

  // 1. Burger menu — инициализируется в components.js после загрузки header

  // 3. FAQ Accordion
  if (typeof FaqAccordion !== 'undefined' && FaqAccordion.init) FaqAccordion.init();

  // 4. Tab switching
  if (typeof TabSwitcher !== 'undefined' && TabSwitcher.init) TabSwitcher.init();

  // 5. Calculators
  if (typeof Calculator !== 'undefined') {
    if (Calculator.initFull) Calculator.initFull();
    if (Calculator.initCompact) Calculator.initCompact();
  }

  // 6. Form handlers
  if (typeof FormHandler !== 'undefined') {
    var contactForm = document.getElementById('contactForm');
    if (contactForm) FormHandler.submitForm(contactForm, false);

    var calcForm = document.getElementById('calcForm');
    if (calcForm) FormHandler.submitForm(calcForm, true);

    var calcFormCompact = document.getElementById('calcFormCompact');
    if (calcFormCompact) FormHandler.submitForm(calcFormCompact, true);
  }

  // 8. Smooth scroll & header shadow
  if (typeof SmoothScroll !== 'undefined' && SmoothScroll.init) SmoothScroll.init();

  // 9. Scroll progress bar (из dianomi)
  var scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', function() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.setProperty('--scroll-width', scrollPercent + '%');
    });
  }

  // 10. Back to top button
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
