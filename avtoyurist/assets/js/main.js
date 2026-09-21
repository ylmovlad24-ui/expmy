/**
 * АвтоЭксперт — Main entry point (объединённый avtoyurist + dianomi)
 * Loads all modules in order
 */
document.addEventListener('DOMContentLoaded', function () {

  // 1. Burger menu
  BurgerMenu.init();

  // 3. FAQ Accordion
  FaqAccordion.init();

  // 4. Tab switching
  TabSwitcher.init();

  // 5. Calculators
  Calculator.initFull();
  Calculator.initCompact();

  // 6. Form handlers
  var contactForm = document.getElementById('contactForm');
  if (contactForm) FormHandler.submitForm(contactForm, false);

  var calcForm = document.getElementById('calcForm');
  if (calcForm) FormHandler.submitForm(calcForm, true);

  var calcFormCompact = document.getElementById('calcFormCompact');
  if (calcFormCompact) FormHandler.submitForm(calcFormCompact, true);

  // 8. Smooth scroll & header shadow
  SmoothScroll.init();

  // 9. Scroll progress bar (из dianomi)
  var scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', function() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = scrollPercent + '%';
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
