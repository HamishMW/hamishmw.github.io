function loadFont(fontName, woffUrl, woff2Url) {
  var loSto = {};
  try {
    loSto = localStorage || {};
  } catch(ex) {}

  var localStoragePrefix = 'x-font-' + fontName;
  var localStorageUrlKey = localStoragePrefix + 'url';
  var localStorageCssKey = localStoragePrefix + 'css';
  var storedFontUrl = loSto[localStorageUrlKey];
  var storedFontCss = loSto[localStorageCssKey];

  var styleElement = document.createElement('style');
  styleElement.rel = 'stylesheet';
  document.head.appendChild(styleElement);

  if (storedFontCss && (storedFontUrl === woffUrl || storedFontUrl === woff2Url)) {
    styleElement.textContent = storedFontCss;
  } else {
    var url = (woff2Url && supportsWoff2())
      ? woff2Url
      : woffUrl;

    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        loSto[localStorageUrlKey] = url;
        loSto[localStorageCssKey] = styleElement.textContent = request.responseText;
      }
    };
    request.send();
  }

  function supportsWoff2() {
    if (!window.FontFace) {
      return false;
    }
    var f = new FontFace('t', 'url("data:application/font-woff2,") format("woff2")', {});
    f.load();
    return f.status === 'loading';
  }
}
loadFont('sourceSansPro', '/dist/css/fonts-woff2.css', '/dist/css/fonts-woff2.css');
