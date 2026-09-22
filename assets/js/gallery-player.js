(function () {
  var player = document.querySelector('.photo-player');
  var links = Array.from(document.querySelectorAll('.photo-select'));
  if (!player || !links.length) return;
  var stage = player.querySelector('.photo-stage');
  var image = stage.querySelector('img');
  var caption = player.querySelector('.photo-caption');
  var count = player.querySelector('.photo-count');
  var play = player.querySelector('[data-action="play"]');
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var index = 0;
  var playing = !motion.matches && links.length > 1;
  var timer;
  var progressAnimation;
  var imageAnimation;
  var request = 0;
  var pointerInside = false;
  var keyboardFocus = false;
  var revealTap = false;
  var lightbox = document.querySelector('.photo-lightbox');
  var lightboxIndex = 0;
  var lightboxRequest = 0;
  var zoom = 1;
  var returnFocus;
  var previousOverflow;
  var progress = player.querySelector('.photo-progress');
  var steps = links.map(function (_, i) {
    var button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', 'Go to photo ' + (i + 1));
    button.innerHTML = '<span><i></i></span>';
    button.onclick = function () { manual(i); };
    progress.appendChild(button);
    return button;
  });

  function show(next) {
    var target = (next + links.length) % links.length;
    var token = ++request;
    clearInterval(timer);
    if (progressAnimation) progressAnimation.cancel();
    var source = links[target].querySelector('img');
    var preload = new Image();
    preload.onload = function () {
      if (token !== request) return;
      index = target;
      image.src = source.src;
      player.querySelector('.photo-ambient').src = source.src;
      image.alt = source.alt;
      if (imageAnimation) imageAnimation.cancel();
      if (!motion.matches && image.animate) {
        imageAnimation = image.animate([{opacity: 0, transform: 'translateY(6px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 450, easing: 'ease-out'});
      }
      stage.href = links[index].href;
      player.querySelector('.photo-original').href = stage.href;
      count.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(links.length).padStart(2, '0');
      var text = links[index].parentElement.querySelector('figcaption');
      caption.textContent = text ? text.textContent : '';
      caption.hidden = !caption.textContent;
      links.forEach(function (link, i) {
        if (i === index) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
      steps.forEach(function (step, i) {
        if (i === index) step.setAttribute('aria-current', 'true');
        else step.removeAttribute('aria-current');
        step.querySelector('i').style.transform = i < index ? 'scaleX(1)' : 'scaleX(0)';
      });
      player.hidden = false;
      schedule();
    };
    preload.onerror = function () {
      if (token !== request) return;
      playing = false;
      schedule();
    };
    preload.src = source.src;
  }
  function schedule() {
    clearInterval(timer);
    if (progressAnimation) progressAnimation.cancel();
    player.dataset.playing = String(playing);
    play.setAttribute('aria-label', playing ? 'Pause slideshow' : 'Play slideshow');
    if (playing && !document.hidden) {
      var bar = steps[index].querySelector('i');
      if (!motion.matches && bar.animate) progressAnimation = bar.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}], {duration:5000, fill:'forwards'});
      timer = setInterval(function () { show(index + 1); }, 5000);
    }
  }
  function revealControls() {
    player.dataset.controlsVisible = 'true';
  }
  player.addEventListener('pointerenter', function (event) {
    if (event.pointerType === 'touch') return;
    pointerInside = true;
    revealControls();
  });
  player.addEventListener('pointerleave', function (event) {
    if (event.pointerType === 'touch') return;
    pointerInside = false;
    if (!keyboardFocus) player.dataset.controlsVisible = 'false';
  });
  player.addEventListener('pointerdown', function (event) {
    revealTap = event.pointerType === 'touch' && player.dataset.controlsVisible !== 'true';
    keyboardFocus = false;
    revealControls();
  });
  player.addEventListener('focusin', function (event) {
    keyboardFocus = event.target.matches(':focus-visible');
    if (keyboardFocus || pointerInside) revealControls();
  });
  player.addEventListener('focusout', function (event) {
    if (!player.contains(event.relatedTarget)) {
      keyboardFocus = false;
      if (!pointerInside) player.dataset.controlsVisible = 'false';
    }
  });
  document.addEventListener('pointerdown', function (event) {
    if (!player.contains(event.target)) {
      keyboardFocus = false;
      player.dataset.controlsVisible = 'false';
    }
  });
  function manual(next) {
    playing = false;
    show(next);
    schedule();
  }
  player.querySelector('[data-action="prev"]').onclick = function () { manual(index - 1); };
  player.querySelector('[data-action="next"]').onclick = function () { manual(index + 1); };
  play.onclick = function () { playing = !playing; schedule(); };
  player.addEventListener('keydown', function (event) {
    keyboardFocus = true;
    revealControls();
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      manual(index + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  // Stop rotation when keyboard users enter the player.
  player.addEventListener('focusin', function (event) {
    if (!player.contains(event.relatedTarget) && event.target.matches(':focus-visible')) { playing = false; schedule(); }
  });
  links.forEach(function (link, i) {
    if (!lightbox || !lightbox.showModal) return;
    link.setAttribute('aria-label', 'Open photo ' + (i + 1) + ' in photo viewer');
    link.addEventListener('click', function (event) {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      openLightbox(i, link);
    });
  });
  stage.addEventListener('click', function (event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !lightbox || !lightbox.showModal) return;
    event.preventDefault();
    if (revealTap) { revealTap = false; return; }
    openLightbox(index, stage);
  });
  if (lightbox && lightbox.showModal) {
    stage.setAttribute('aria-label', 'Open current photo in photo viewer');
    var viewport = lightbox.querySelector('.lightbox-viewport');
    var canvas = lightbox.querySelector('.lightbox-canvas');
    var largeImage = canvas.querySelector('img');
    function setZoom(value) {
      zoom = Math.max(1, Math.min(3, value));
      canvas.style.width = (zoom * 100) + '%';
      canvas.style.height = (zoom * 100) + '%';
      lightbox.querySelector('[data-lightbox="reset"]').textContent = zoom === 1 ? 'Fit' : Math.round(zoom * 100) + '%';
      lightbox.querySelector('[data-lightbox="in"]').disabled = zoom === 3;
      lightbox.querySelector('[data-lightbox="out"]').disabled = zoom === 1;
      viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2;
      viewport.scrollTop = (viewport.scrollHeight - viewport.clientHeight) / 2;
    }
    function renderLightbox(next) {
      lightboxIndex = (next + links.length) % links.length;
      var token = ++lightboxRequest;
      var link = links[lightboxIndex];
      var thumb = link.querySelector('img');
      // Display the cached preview immediately; upgrade only the selected photo.
      largeImage.src = thumb.src;
      largeImage.alt = thumb.alt;
      lightbox.querySelector('.lightbox-count').textContent = String(lightboxIndex + 1).padStart(2, '0') + ' / ' + String(links.length).padStart(2, '0');
      lightbox.querySelector('.lightbox-download').href = link.href;
      var text = link.parentElement.querySelector('figcaption');
      var label = lightbox.querySelector('.lightbox-caption');
      label.textContent = text ? text.textContent : '';
      label.hidden = !label.textContent;
      setZoom(1);
      var original = new Image();
      original.onload = function () {
        if (token === lightboxRequest && lightbox.open) largeImage.src = link.href;
      };
      original.src = link.href;
    }
    lightbox.querySelector('[data-lightbox="close"]').onclick = function () { lightbox.close(); };
    lightbox.querySelector('[data-lightbox="prev"]').onclick = function () { renderLightbox(lightboxIndex - 1); };
    lightbox.querySelector('[data-lightbox="next"]').onclick = function () { renderLightbox(lightboxIndex + 1); };
    lightbox.querySelector('[data-lightbox="in"]').onclick = function () { setZoom(zoom + .5); };
    lightbox.querySelector('[data-lightbox="out"]').onclick = function () { setZoom(zoom - .5); };
    lightbox.querySelector('[data-lightbox="reset"]').onclick = function () { setZoom(1); };
    largeImage.ondblclick = function () { setZoom(zoom === 1 ? 2 : 1); };
    lightbox.addEventListener('keydown', function (event) {
      if (event.key === 'Tab') {
        var focusable = Array.from(lightbox.querySelectorAll('button:not(:disabled), a[href], [tabindex="0"]'));
        var first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        if (zoom > 1 && event.target === viewport) return;
        event.preventDefault();
        renderLightbox(lightboxIndex + (event.key === 'ArrowLeft' ? -1 : 1));
      }
      if (event.key === '+' || event.key === '=') { event.preventDefault(); setZoom(zoom + .5); }
      if (event.key === '-') { event.preventDefault(); setZoom(zoom - .5); }
    });
    lightbox.addEventListener('close', function () {
      ++lightboxRequest;
      document.body.style.overflow = previousOverflow;
      if (returnFocus) returnFocus.focus({preventScroll: true});
      manual(lightboxIndex);
    });
    var startX, startY;
    viewport.addEventListener('touchstart', function (event) {
      if (event.touches.length !== 1 || zoom !== 1) { startX = null; return; }
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    }, {passive: true});
    viewport.addEventListener('touchend', function (event) {
      if (startX === null || zoom !== 1) return;
      var dx = event.changedTouches[0].clientX - startX;
      var dy = event.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        event.preventDefault();
        renderLightbox(lightboxIndex + (dx < 0 ? 1 : -1));
      }
      startX = null;
    }, {passive: false});
  }
  function openLightbox(next, opener) {
    playing = false;
    schedule();
    returnFocus = opener;
    function open() {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      lightbox.showModal();
      renderLightbox(next);
    }
    if (document.fullscreenElement) document.exitFullscreen().then(open).catch(function () {});
    else open();
  }
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', function () {
    if (motion.matches) { playing = false; if (imageAnimation) imageAnimation.cancel(); schedule(); }
  });
  var fullscreen = player.querySelector('[data-action="fullscreen"]');
  if (!player.requestFullscreen) fullscreen.hidden = true;
  fullscreen.onclick = function () {
    var action = document.fullscreenElement ? document.exitFullscreen() : player.requestFullscreen();
    if (action && action.catch) action.catch(function () { fullscreen.hidden = true; });
  };
  document.addEventListener('fullscreenchange', function () {
    fullscreen.setAttribute('aria-label', document.fullscreenElement === player ? 'Exit fullscreen' : 'Enter fullscreen');
  });
  var touchX;
  var touchY;
  stage.addEventListener('touchstart', function (event) {
    touchX = event.changedTouches[0].clientX;
    touchY = event.changedTouches[0].clientY;
  }, {passive:true});
  stage.addEventListener('touchend', function (event) {
    var dx = event.changedTouches[0].clientX - touchX;
    var dy = event.changedTouches[0].clientY - touchY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      event.preventDefault();
      manual(index + (dx < 0 ? 1 : -1));
    }
  }, {passive:false});
  if (links.length === 1) {
    player.querySelectorAll('[data-action="prev"], [data-action="next"], [data-action="play"]').forEach(function (button) { button.disabled = true; });
  }
  show(0);
})();
