var directives = require('../app.js').directives;


directives.directive("showFrame", function(){
 return function(scope, element) {
    element.bind("click", function(){
      var absolutePixels = $(element).offset();
      $('#preview-pane').slideDown(1000);

      $.get('https://s3-us-west-2.amazonaws.com/readupimages/' + scope.link.id)
      .done(function(){

        $('#preview-pane').children('img').replaceWith(
            $('<img>', {
                id: 'preview',
                src: 'https://s3-us-west-2.amazonaws.com/readupimages/' + scope.link.id

            }).css({
                right: 0,
                width: '100%',
                overflow: 'scroll'
            }));

      }).fail(function(){

        $('#preview-pane').children('img').replaceWith(
          $('<img>', {
              id: 'preview',
              src: '/item_images/no_preview.png'
          }).css({
              right: 0,
              width: '100%',
              overflow: 'scroll'
        }));

      });
    });

    $('#close-preview').on('click', function(){
      $(this).parent().hide();
    });

    angular.element('body').on('click', function(event){
      if(event.target.id !== 'preview-pane' && event.target.id !== 'preview' && !$(event.target).hasClass('preview-logo')){
        $('#preview-pane').hide();
      }
    });
  };
});