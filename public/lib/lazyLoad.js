// Lazy loading of Twitter share button
var timeout;
$(document).ready(function() {
  var elements,
      i = 0;

  $("#main-container").bind("DOMSubtreeModified", function(e) {
    if (e.target.id === "links") {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        elements = $('.social-buttons');
        CheckForDisplay();
      }, 50);
    }
  });

  function CheckForDisplay() {
    if (elements) {
      while ( elements.length && (i < elements.length) && elementInViewport(elements[i]) ) {
        Socialite.load(elements[i]);
        i++;
      }
    }
  }
  function elementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return ( rect.bottom <= window.innerHeight );
  }
  $(window).on('resize', CheckForDisplay).on('scroll', CheckForDisplay);
});
