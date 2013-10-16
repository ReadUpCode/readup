var directives = require('../app.js').directives;

directives.directive('addTag', function() {
  return function(scope, element) {
    element.on('keypress', function(event) {
      if (event.keyCode === 13) {
        scope.addTag(event.currentTarget.value);
      }
    });
  };
});