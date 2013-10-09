var controllers = require('../app.js').controllers;

controllers.controller('HomeController', ['$scope', '$http', '$location', 'tagsFactory', function($scope, $http, $location, tagsFactory){
  $scope.tags = tagsFactory.getAllTags();
  $scope.changeView = function(tagName) {
    tagsFactory.setTagName(tagName);
    $location.path('/' + tagName);
  };
}]);