var directives = require('../app.js').directives;

directives.directive('linkForm', function($timeout){
  return function(scope, element) {
    var $body = angular.element('body');

    element.on('focus', function() {
      scope.linkForm.hasLink = true;
      scope.$apply();
    });

    element.on('keyup paste', function() {
      $timeout.cancel(window.timeoutID);
      scope.linkForm.hasLink = true;
      window.timeoutID = $timeout(function() {
        scope.getSuggestedData(scope.item.link);
      }, 500);
    });

    $body.on('click', function() {
      scope.linkForm.hasLink = false;
      scope.$apply();
    });
  };
});