(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-filter-collection]').forEach(function (collection) {
    var controls = collection.querySelector('[data-filter-controls]');
    var buttons = Array.from(collection.querySelectorAll('[data-filter-value]'));
    var entries = Array.from(collection.querySelectorAll('[data-filter-values]')).map(function (element) {
      return {element: element, values: JSON.parse(element.dataset.filterValues)};
    });
    var groups = Array.from(collection.querySelectorAll('[data-filter-group]'));
    var status = collection.querySelector('[data-filter-status]');
    var parameter = collection.dataset.filterParam;
    var active = null;
    var animations = [];

    function apply(value, animate) {
      if (!buttons.some(function (button) { return button.dataset.filterValue === value; })) value = '';
      if (value === active) return value;
      active = value;
      animations.forEach(function (animation) { animation.cancel(); });
      animations = [];
      var visible = 0;
      buttons.forEach(function (button) {
        button.setAttribute('aria-pressed', String(button.dataset.filterValue === value));
      });
      entries.forEach(function (entry) {
        entry.element.hidden = !!value && entry.values.indexOf(value) === -1;
        if (entry.element.hidden) return;
        visible++;
        if (animate && !reduced.matches && entry.element.animate) {
          animations.push(entry.element.animate(
            [{opacity: 0, translate: '0 12px'}, {opacity: 1, translate: '0 0'}],
            {duration: 280, delay: Math.min(visible - 1, 5) * 30, easing: 'cubic-bezier(.2,.7,.2,1)'}
          ));
        }
      });
      groups.forEach(function (group) {
        var count = group.querySelectorAll('[data-filter-values]:not([hidden])').length;
        group.hidden = count === 0;
        group.querySelector('[data-filter-group-count]').textContent = count + (count === 1 ? ' paper' : ' papers');
        var link = collection.querySelector('[data-filter-year="' + group.id + '"]');
        if (link) {
          link.hidden = count === 0;
          link.querySelector('.papers-year-count').textContent = count;
          link.setAttribute('aria-label', group.dataset.filterGroup + ': ' + count + (count === 1 ? ' paper' : ' papers'));
        }
      });
      var noun = visible === 1 ? collection.dataset.filterSingular : collection.dataset.filterPlural;
      status.textContent = value ? visible + ' of ' + entries.length + ' ' + collection.dataset.filterPlural : visible + ' ' + noun;
      return value;
    }

    controls.hidden = false;
    apply(new URL(window.location.href).searchParams.get(parameter) || '', false);
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var value = apply(button.dataset.filterValue, true);
        var url = new URL(window.location.href);
        if (value) url.searchParams.set(parameter, value);
        else url.searchParams.delete(parameter);
        // A filtered-out year must not remain the URL's scroll target.
        if (groups.some(function (group) { return url.hash === '#' + group.id && group.hidden; })) url.hash = '';
        if (url.href !== window.location.href) window.history.pushState(null, '', url);
      });
    });
    window.addEventListener('popstate', function () {
      apply(new URL(window.location.href).searchParams.get(parameter) || '', true);
    });
    reduced.addEventListener('change', function () {
      if (reduced.matches) animations.forEach(function (animation) { animation.cancel(); });
    });
  });
})();
