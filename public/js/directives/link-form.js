var directives = require('../app.js').directives;

directives.directive('linkForm', function($timeout){
  return function(scope, element) {
    var $body = angular.element('body');

    element.on('focus', function() {
      console.log('getting focus')
      scope.hasLink = true;
      scope.$apply();
    });

    element.on('keyup paste', function() {
      $timeout.cancel(window.timeoutID);
      scope.hasLink = true;
      window.timeoutID = $timeout(function() {
        scope.getSuggestedData(scope.item.link);
      }, 500);
    });

    $body.on('click', function() {
      scope.hasLink = false;
      scope.$apply();
      console.log(scope.hasLink);
    });
  };
});