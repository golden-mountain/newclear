// FULLSCREEN
// -----------------------------------

function initScreenfull() {

  if (typeof screenfull === 'undefined') return;

  var $doc = $(document);
  var $fsToggler = $(this);

  // Not supported under IE
  var ua = window.navigator.userAgent;
  if (ua.indexOf('MSIE ') > 0 || !!ua.match(/Trident.*rv\:11\./)) {
    $fsToggler.addClass('hide');
  }

  if (!$fsToggler.is(':visible')) // hidden on mobiles or IE
    return;

  $fsToggler.on('click', function (e) {
    e.preventDefault();

    if (screenfull.enabled) { //eslint-disable-line

      screenfull.toggle(); //eslint-disable-line

      // Switch icon indicator
      toggleFSIcon($fsToggler);

    } else {
      console.log('Fullscreen not enabled');
    }
  });

  if (screenfull.raw && screenfull.raw.fullscreenchange) //eslint-disable-line
    $doc.on(screenfull.raw.fullscreenchange, function() { //eslint-disable-line
      toggleFSIcon($fsToggler);
    });

  function toggleFSIcon($element) {
    if (screenfull.isFullscreen) //eslint-disable-line
      $element.children('em').removeClass('fa-expand').addClass('fa-compress');
    else
      $element.children('em').removeClass('fa-compress').addClass('fa-expand');
  }

}

export default () => {

  $('[data-toggle-fullscreen]').each(initScreenfull);

};
