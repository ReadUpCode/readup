var directives = require('../app.js').directives;


directives.directive("showFrame", function(){
 return function(scope, element) {
      element.bind("click", function(){
        var absolutePixels = $(element).offset();
        console.log($(window).scrollTop())
        $('#preview-pane').slideDown(1000)
        $.get('/item_images/' + scope.link.id + '.png')
    .done(function() { 
        $('#preview-pane').css({
          // top: absolutePixels.top + 'px'
        }).children('img').replaceWith(
            $('<img>', {
                id: 'preview',
                src: '/item_images/' + scope.link.id + '.png'
            }).css({
                right: 0,
                width: '100%',
                overflow: 'scroll'
            }))
    }).fail(function() { 
        $('#preview-pane').css({
          // top: absolutePixels.top + 'px'
        }).children('img').replaceWith(
            $('<img>', {
                id: 'preview',
                src: '/item_images/no_preview.png'
            }).css({
                right: 0,
                width: '100%',
                overflow: 'scroll'
            }))
    })
      })
      
      $('#close-preview').on('click', function(){
        $(this).parent().hide()
      })

      angular.element('body').on('click', function(event){
        console.log(!$(event.target).hasClass('preview-logo'))
        console.log(event.target.id)
        if(event.target.id !== 'preview-pane' && event.target.id !== 'preview' && !$(event.target).hasClass('preview-logo')){    

          $('#preview-pane').hide()
        }
      })

      // var el = $('#preview-pane'),
      // pos = el.position().top;
      // console.log(pos)
      // $(window).scroll(function() {
      //   el.toggleClass('fixed', $(this).scrollTop() >= pos);
      // });

    
    }
});