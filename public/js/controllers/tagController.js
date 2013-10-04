var controllers = require('../app.js').controllers;

controllers.controller('TagController', ['$scope', '$routeParams', 'tagsFactory', function($scope, $routeParams, tagsFactory) {
  if(tagsFactory.curTag !== $routeParams.tag) {
    tagsFactory.getTagInfo($routeParams.tag);
  }
  $scope.tag = tagsFactory.curTag;
  $scope.links = tagsFactory.curLinks;
  $scope.vote = function(value, link){
    link.score += value;
  };
}]);