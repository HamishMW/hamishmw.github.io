(function(window, document, $) {
  "use strict";

  var observer = new FontFaceObserver('ars_maquette', {
    weight: 400
  });

  var observer2 = new FontFaceObserver('ars_maquette', {
    weight: 500
  });

  var observer3 = new FontFaceObserver('ars_maquette', {
    weight: 700
  });

  Promise.all([observer.check(), observer2.check(), observer3.check()]).then(function () {
    $('html').addClass('fonts-loaded');
  });

}(window, document, window.jQuery));