var directives = require('../app.js').directives;

directives.directive("showFrame", function(){
 return function(scope, element) {
      element.bind("click", function(){
        $('#preview-pane').html(
        $('<img>', {
            id: 'preview',
            src: '/item_images/' + scope.link.id + '.png',

        }).css({
        	position: 'relative',
        	right: 0,
        	width: '100%',
        	// height: '400px',
        	overflow: 'scroll'
        	// background: 'url(/item_images/' + scope.link.id + '.png) no-repeat'
        })).slideDown()
      })
    }
});