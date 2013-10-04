var controllers = require('../app.js').controllers;

controllers.controller('HomeController', ['$scope', '$http', 'tagsFactory', function($scope, $http, tagsFactory){
  $scope.tags = tagsFactory.tags;
}]);