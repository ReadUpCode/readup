var controllers = require('../app.js').controllers;

controllers.controller('HomeController', ['$scope', '$http', '$location', 'tagsFactory', 'searchFactory', function($scope, $http, $location, tagsFactory, searchFactory){

  $scope.tags = tagsFactory.getAllTags();
  $scope.changeView = function(tagName) {
    // tagsFactory.setTagName(tagName);
    $location.path('/' + tagName);
  };

  $scope.$on('searchValueChanged', function(event, searchValue) {
    $scope.changeView(searchValue);
  });
}]);