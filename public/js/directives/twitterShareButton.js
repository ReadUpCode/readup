var directives = require('../app.js').directives;

directives.directive('twitter', [
  function() {
    return {
      link: function(scope, element, attr) {
        // setTimeout(function() {
        //   twttr.widgets.createShareButton(
        //     attr.url,
        //     element[0],
        //     function(el) {}, {
        //       text: attr.text,
        //       via: attr.via
        //     }
        //   );
        // });
      }
    }
  }
]);