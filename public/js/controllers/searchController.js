var controllers = require('../app.js').controllers;

controllers.controller('SearchController', ['$scope', '$http', function($scope, $http) {
  $http.get('/_/tags').success(function(data){
    $scope.typeahead = data;
  });
  
  $scope.typeaheadFn = function() {
    return $.map($scope.typeahead, function(tag) {
      return tag.name;
    });
  };
}]);
