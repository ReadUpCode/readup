var directives = require('../app.js').directives;

directives.directive("showFrame", function(){
 return function(scope, element) {
      element.bind("mouseenter", function(){
      element.append('<div>hello</div>');
      })
    }
});