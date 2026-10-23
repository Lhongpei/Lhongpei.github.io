(function () {
  'use strict';

  var page = document.querySelector('.catalog-page');
  if (!page) return;
  var cards = Array.from(page.querySelectorAll('.catalog-card'));
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  var active = null;
  var frame = 0;
  var point = null;
  var bounds = null;

  function resetPointer() {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    if (active) {
      active.classList.remove('is-hovering');
      ['--tilt-x', '--tilt-y', '--art-x', '--art-y'].forEach(function (property) {
        active.style.removeProperty(property);
      });
    }
    active = null;
    bounds = null;
  }

  function renderPointer() {
    frame = 0;
    if (!active || !point || !bounds) return;
    var x = Math.max(0, Math.min(1, (point.x - bounds.left) / bounds.width));
    var y = Math.max(0, Math.min(1, (point.y - bounds.top) / bounds.height));
    var strength = active.classList.contains('software-card') ? 12 : 8;
    active.style.setProperty('--tilt-x', ((.5 - y) * strength).toFixed(2) + 'deg');
    active.style.setProperty('--tilt-y', ((x - .5) * strength).toFixed(2) + 'deg');
    active.style.setProperty('--pointer-x', (x * 100).toFixed(1) + '%');
    active.style.setProperty('--pointer-y', (y * 100).toFixed(1) + '%');
    active.style.setProperty('--art-x', ((x - .5) * 18).toFixed(1) + 'px');
    active.style.setProperty('--art-y', ((y - .5) * 12).toFixed(1) + 'px');
  }

  cards.forEach(function (card) {
    card.addEventListener('pointermove', function (event) {
      if (reduced.matches || !pointer.matches || event.pointerType === 'touch') return;
      if (active !== card) {
        resetPointer();
        // Capture before applying tilt, so transforms cannot feed back into geometry.
        bounds = card.getBoundingClientRect();
        active = card;
        card.classList.add('is-hovering');
      }
      point = {x: event.clientX, y: event.clientY};
      if (!frame) frame = window.requestAnimationFrame(renderPointer);
    });
    card.addEventListener('pointerleave', resetPointer);
    card.addEventListener('pointercancel', resetPointer);
    card.addEventListener('focusin', function () { card.classList.add('is-revealed'); });
  });

  function configure() {
    resetPointer();
    page.classList.toggle('catalog-motion', !reduced.matches);
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      var stagger = 0;
      entries.forEach(function (entry) {
        entry.target.classList.toggle('is-in-view', entry.isIntersecting);
        if (entry.isIntersecting && !entry.target.classList.contains('is-revealed')) {
          entry.target.style.setProperty('--enter-delay', (stagger++ * 100) + 'ms');
          entry.target.classList.add('is-revealed');
        }
      });
    }, {threshold: .08});
    cards.forEach(function (card) { observer.observe(card); });
  } else {
    cards.forEach(function (card) { card.classList.add('is-revealed', 'is-in-view'); });
  }

  window.addEventListener('scroll', resetPointer, {passive: true});
  window.addEventListener('resize', resetPointer, {passive: true});
  window.addEventListener('blur', resetPointer);
  window.addEventListener('pagehide', resetPointer);
  document.addEventListener('visibilitychange', function () {
    page.classList.toggle('is-page-hidden', document.hidden);
    if (document.hidden) resetPointer();
  });
  reduced.addEventListener('change', configure);
  pointer.addEventListener('change', resetPointer);
  configure();
})();
