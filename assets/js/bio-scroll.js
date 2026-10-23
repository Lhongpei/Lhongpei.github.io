(function () {
  'use strict';

  var home = document.querySelector('.bio-home');
  if (!home) return;
  var intro = home.querySelector('.bio-intro-scene');
  var research = home.querySelector('.bio-research');
  if (!intro || !research) return;

  var reveals = Array.from(research.querySelectorAll('[data-bio-reveal]'));
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mobile = window.matchMedia('(max-width: 640px)');
  var frame = 0;
  var active = true;
  var clamp = function (value) { return Math.max(0, Math.min(1, value)); };

  function render() {
    frame = 0;
    if (reduced.matches) return;

    var height = window.innerHeight;
    var introBox = intro.getBoundingClientRect();
    var researchBox = research.getBoundingClientRect();
    var progress = clamp((height - researchBox.top) / (height * .9));
    var compact = mobile.matches;
    // Start fully closed even when the section peeks into the initial viewport.
    // A single vertical edge travels from the very left to the very right.
    var sweepStart = Math.max(48, researchBox.top + window.scrollY - height * .84);
    var sweepDistance = Math.max(180, height * (compact ? .24 : .28));
    var sweep = clamp((window.scrollY - sweepStart) / sweepDistance);
    var sweepEased = sweep * sweep * (3 - 2 * sweep);
    var afterSweep = window.scrollY - sweepStart - sweepDistance;
    var introProgress = clamp(window.scrollY / (introBox.height * .85));
    // Read geometry before writing styles so scrolling does not force layouts.
    var amounts = reveals.map(function (element, index) {
      // offsetTop is unaffected by the reveal's own transform.
      var top = researchBox.top + element.offsetTop;
      var stagger = index === 0 ? 0 : (compact ? 12 : 24);
      var viewportAmount = clamp((height * .94 - top - stagger) / (height * (compact ? .18 : .22)));
      // Let the background finish before revealing pale copy over it.
      var entranceAmount = clamp((afterSweep - index * (compact ? 18 : 26)) / (compact ? 96 : 140));
      var amount = Math.min(viewportAmount, entranceAmount);
      return amount * amount * (3 - 2 * amount);
    });

    intro.style.setProperty('--intro-drift', (introProgress * (compact ? 20 : 112)).toFixed(1) + 'px');
    intro.style.setProperty('--intro-scale', (1 + introProgress * (compact ? .025 : .09)).toFixed(3));
    intro.style.setProperty('--intro-cut-top', ((compact ? 55 : 82) - introProgress * (compact ? 9 : 6)).toFixed(2) + '%');
    intro.style.setProperty('--intro-cut-bottom', ((compact ? 100 : 72) - introProgress * (compact ? 5 : 2.5)).toFixed(2) + '%');
    intro.style.setProperty('--portrait-drift', (introProgress * (compact ? 10 : 52)).toFixed(1) + 'px');
    intro.style.setProperty('--portrait-scale', (1 - introProgress * (compact ? .01 : .025)).toFixed(3));
    research.style.setProperty('--research-sweep', (sweepEased * 100).toFixed(2) + '%');
    research.style.setProperty('--landscape-drift', ((1 - progress) * (compact ? 12 : 60)).toFixed(1) + 'px');
    reveals.forEach(function (element, index) {
      var distance = compact ? (index === 0 ? 40 : 28) : (index === 0 ? 96 : 64);
      element.style.setProperty('--reveal-opacity', amounts[index].toFixed(3));
      element.style.setProperty('--reveal-x', (-(1 - amounts[index]) * distance).toFixed(1) + 'px');
    });
  }

  function schedule() {
    if (!frame && active && !reduced.matches && !document.hidden) {
      frame = window.requestAnimationFrame(render);
    }
  }

  function configure() {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    home.classList.toggle('bio-motion', !reduced.matches);
    if (reduced.matches) {
      ['--intro-drift', '--intro-scale', '--intro-cut-top', '--intro-cut-bottom', '--portrait-drift', '--portrait-scale'].forEach(function (property) {
        intro.style.removeProperty(property);
      });
      ['--research-sweep', '--landscape-drift'].forEach(function (property) {
        research.style.removeProperty(property);
      });
      reveals.forEach(function (element) {
        element.style.removeProperty('--reveal-opacity');
        element.style.removeProperty('--reveal-x');
      });
    } else {
      render();
    }
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      active = entries[0].isIntersecting;
      if (active) schedule();
    }, {rootMargin: '100px'}).observe(home);
  }
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', schedule, {passive: true});
  window.addEventListener('pageshow', schedule);
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', configure);
  mobile.addEventListener('change', configure);
  configure();
})();
