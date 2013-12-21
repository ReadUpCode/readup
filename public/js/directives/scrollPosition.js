var directives = require('../app.js').directives;
directives.directive('scrollPosition', function($window) {

  return function(scope, element, attrs) {
    var windowEl = angular.element($window);
    var previewPane = angular.element('#preview-pane');
    var origTopDist = +previewPane.css('top').replace('px', '');
    var setUpScrolling = function(){
    windowEl.on('scroll', function() {
      scope.$apply(function() {
        topDist = previewPane.offset().top;
        scrollDist = windowEl.scrollTop();
        // console.log('origTopDist', origTopDist, 'topDist', topDist, 'scrollDist', scrollDist);
        if(scrollDist < origTopDist){
          previewPane.css({top: origTopDist});
        } else if(scrollDist >= origTopDist){
          previewPane.css({top: windowEl.scrollTop() + 'px'});
        }
      });
    });
  };

    var onResize = function(){
      var displayed = previewPane.css('display');
      previewPane.removeAttr('style');
      if (displayed !== 'none'){
        origTopDist = +previewPane.css('top').replace('px', '');
        previewPane.show();
      } else {
        origTopDist = +previewPane.css('top').replace('px', '');
      }
    };

    var timer;
    $(window).bind('resize', function(){
       clearTimeout(timer);
       timer = setTimeout(onResize, 100);
    });

    setUpScrolling();
  };
});