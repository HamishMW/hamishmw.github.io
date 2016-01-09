(function(window, document, $) {
  "use strict";

  $(function(){
    window.onbeforeunload = function() {
      $('body').addClass("unloading unloading--start");
    }
  });
}(window, document, window.jQuery));
