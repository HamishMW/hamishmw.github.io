(function(window, document, $) {
  "use strict";

  $(function(){

    var ticking = false;
    var lastScrollY = 0;
    var lastClientY = 0;
    var navHidePosition = 300;
    var navShowPosition = 200;

    var body = $('body');
    var nav = $('.site-header--nav');
    var title = $('.intro-hero--title');
    var mainSlash1 = $('.main-slash.one');
    var mainSlash2 = $('.main-slash.two');

    mainSlash2.addClass('is-animating');

    function onScroll(e) {

      if(!ticking) {
        ticking = true;
        requestAnimationFrame(updateElements);
        lastScrollY = window.pageYOffset;
      }
    }

    function onMouseMove(evt) {
      lastClientY = evt.clientY;

      if (lastClientY < navShowPosition) {
        nav.removeClass('is-hidden');
      } else if(lastScrollY > navHidePosition) {
        nav.addClass('is-hidden');
      }
    }

    function updateElements() {

      var relativeY = lastScrollY / 3000;
      showHideNav();
      introParallax(relativeY);
      
      ticking = false;
    }

    function introParallax(relativeY) {
      mainSlash1.css("Transform", "translate3d(0," + pos(0, -1200, relativeY, 0) + 'px, 0)');
      mainSlash2.css("Transform", "translate3d(0," + pos(0, -1200, relativeY, 0) + 'px, 0)');
    }

    function showHideNav() {
      if (lastScrollY > navHidePosition && lastClientY > navShowPosition) {
        nav.addClass('is-hidden');
      } else {
        nav.removeClass('is-hidden');
      }
    }

    function pos(base, range, relY, offset) {
      return base + limit(0, 1, relY - offset) * range;
    }

    function limit(min, max, value) {
      return Math.max(min, Math.min(max, value));
    }

    function initialize() {
      onScroll();
      window.addEventListener('scroll', onScroll, false);
      body.on('mousemove', onMouseMove);
    }

    initialize();
  });

}(window, document, window.jQuery));