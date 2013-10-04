var controllers = require('../app.js').controllers;

controllers.controller('HomeController', ['$scope', '$http', '$location', 'tagsFactory', function($scope, $http, $location, tagsFactory){
  $scope.tags = tagsFactory.tags;
  $scope.cur = {};
  $scope.changeView = function(tag) {
    $location.path('/' + tag);
  };
}]);