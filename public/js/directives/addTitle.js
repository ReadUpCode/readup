var directives = require('../app.js').directives;

directives.directive('addTitle', function() {
  return function(scope, element) {
    element.on('keypress', function(event) {
      var title = angular.element('#link-form-title')
      if (event.keyCode === 13) {
        title.replaceWith('<h1 id="set-title">' + title.val() + '</h1>')
      }
    });
  };
});