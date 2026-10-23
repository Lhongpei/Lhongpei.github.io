(function () {
  'use strict';

  var scenes = Array.from(document.querySelectorAll('[data-scroll-hero]')).map(function (hero) {
    return {hero: hero, photo: hero.querySelector('[data-hero-photo]'), active: true, top: 0, height: 1};
  }).filter(function (scene) { return scene.photo; });
  if (!scenes.length) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var compact = window.matchMedia('(max-width: 640px)');
  var properties = ['--hero-pan-x', '--hero-pan-y', '--hero-zoom', '--hero-cut-top', '--hero-cut-bottom'];
  var frame = 0;
  var measure = true;

  function render() {
    frame = 0;
    if (reduced.matches || document.hidden) return;
    var small = compact.matches;
    // Read all geometry before applying transforms; the photo's overscan and
    // changing clip never affect the hero's layout or the scroll progress.
    var updates = scenes.filter(function (scene) { return measure || scene.active; }).map(function (scene) {
      var box = scene.hero.getBoundingClientRect();
      if (measure) {
        scene.top = box.top + window.scrollY;
        scene.height = Math.max(1, scene.photo.offsetHeight);
      }
      var progress = Math.max(0, Math.min(1, (scene.top - box.top) / scene.height));
      return {scene: scene, progress: progress};
    });
    measure = false;

    updates.forEach(function (update) {
      var hero = update.scene.hero;
      var progress = update.progress;
      var eased = progress * progress * (3 - 2 * progress);
      hero.style.setProperty('--hero-pan-x', (-progress * (small ? 2 : 8)).toFixed(2) + 'px');
      hero.style.setProperty('--hero-pan-y', (progress * (small ? 14 : 56)).toFixed(2) + 'px');
      hero.style.setProperty('--hero-zoom', (1.04 + progress * (small ? .025 : .065)).toFixed(4));
      hero.style.setProperty('--hero-cut-top', (24 - eased * (small ? 12 : 18)).toFixed(2) + '%');
      hero.style.setProperty('--hero-cut-bottom', (eased * (small ? 2 : 4)).toFixed(2) + '%');
    });
  }

  function schedule() {
    if (!frame && !reduced.matches && !document.hidden && (measure || scenes.some(function (scene) { return scene.active; }))) {
      frame = window.requestAnimationFrame(render);
    }
  }

  function resize() {
    measure = true;
    schedule();
  }

  function configure() {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    scenes.forEach(function (scene) {
      scene.hero.classList.toggle('hero-scroll-enabled', !reduced.matches);
      if (reduced.matches) properties.forEach(function (property) { scene.hero.style.removeProperty(property); });
    });
    measure = true;
    render();
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var scene = scenes.find(function (scene) { return scene.photo === entry.target; });
        scene.active = entry.isIntersecting;
      });
      schedule();
    }, {rootMargin: '80px'});
    scenes.forEach(function (scene) { observer.observe(scene.photo); });
  }
  if ('ResizeObserver' in window) {
    var sizes = new ResizeObserver(resize);
    scenes.forEach(function (scene) { sizes.observe(scene.hero); });
  }
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', resize, {passive: true});
  window.addEventListener('pageshow', resize);
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', configure);
  compact.addEventListener('change', resize);
  configure();
})();
