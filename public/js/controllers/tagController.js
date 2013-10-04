var controllers = require('../app.js').controllers;

controllers.controller('TagController', ['$scope', '$routeParams', 'tagsFactory', function($scope, $routeParams, tagsFactory) {
  $scope.tag = tagsFactory.curTag;
  $scope.links = tagsFactory.curLinks;
}]);