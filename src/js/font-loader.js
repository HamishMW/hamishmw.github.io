(function(window, document, $) {
  "use strict";

  var observer = new FontFaceObserver('ars_maquette', {});

  observer.check().then(function () {
    $('html').addClass('fonts-loaded');
  }, function () {
    console.log('Font is not available');
  });

}(window, document, window.jQuery));