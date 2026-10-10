(function () {
  'use strict';

  document.querySelectorAll('[data-dish-carousel]').forEach(function (carousel) {
    var track = carousel.querySelector('.dish-carousel__track');
    var slides = track ? track.querySelectorAll('.dish-slide') : [];
    var previous = carousel.querySelector('.dish-carousel__nav--prev');
    var next = carousel.querySelector('.dish-carousel__nav--next');
    if (!track || !slides.length || !previous || !next) {
      return;
    }

    function step() {
      var gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
      return slides[0].getBoundingClientRect().width + gap;
    }

    function go(direction) {
      track.scrollBy({ left: step() * direction, behavior: 'smooth' });
    }

    previous.addEventListener('click', function () { go(-1); });
    next.addEventListener('click', function () { go(1); });
    carousel.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        go(-1);
      }
      if (event.key === 'ArrowRight') {
        go(1);
      }
    });
  });
}());
