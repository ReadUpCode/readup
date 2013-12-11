var directives = require('../app.js').directives;

directives.directive('addTitle', function() {
  return function(scope, element) {
    element.on('keypress', function(event) {
      var title = angular.element('#link-form-title');
      if (event.keyCode === 13 && title.val().length > 0) {
        // title.replaceWith('<h1 id="set-title">' + title.val() + '</h1>')
        scope.item.noTitleOnSubmit = false;
        scope.suggestedData.title = title.val();
        scope.changeEditMode();
        scope.$apply();
      }
    });
  };
});