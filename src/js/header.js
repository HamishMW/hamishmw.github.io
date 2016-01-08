(function(window, document, $) {
  "use strict";

  var home = $('.home');
  var scrollTo = $('.scroll-to');

  scrollTo.on("click", function(e) {

    if(home.length > 0) {

      e.preventDefault();
      var linkHash = this.hash;
      var jLinkHash = $(linkHash);
      var scrollOffset = jLinkHash.offset().top;

      $("html, body").stop().animate({
          scrollTop: scrollOffset
      }, 360, "swing", function() {
          window.location.hash = linkHash
      });
    }
  });

}(window, document, window.jQuery));