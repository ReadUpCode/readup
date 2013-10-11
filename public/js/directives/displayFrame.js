var directives = require('../app.js').directives;

directives.directive("showFrame", function(){
 return function(scope, element) {
      element.bind("click", function(){
        var absolutePixels = $(element).offset();
        console.log(absolutePixels.top)
        $('#preview-pane').css({
          top: absolutePixels.top + 'px'
        }).children('img').replaceWith(
        $('<img>', {
            id: 'preview',
            src: '/item_images/' + scope.link.id + '.png'
        }).css({
        	position: 'relative',
        	right: 0,
        	width: '100%',
        	overflow: 'scroll'
        }))
        $('#preview-pane').slideDown(1000)
      })
      
      $('#close-preview').on('click', function(){
        $(this).parent().hide()
      })
    }
});