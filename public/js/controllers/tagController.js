var controllers = require('../app.js').controllers;

controllers.controller('TagController', ['$scope', '$routeParams', 'tagsFactory', function($scope, $routeParams, tagsFactory) {
  console.log(tagsFactory.curTag);
  console.log($routeParams.tag);
  if(tagsFactory.curTag !== $routeParams.tag) {
    tagsFactory.getTagInfo($routeParams.tag);
  }
  $scope.tag = tagsFactory.curTag;
  $scope.links = tagsFactory.curLinks;
  console.log($scope);
  $scope.vote = function(value, link){
    link.score += value;
  };
}]);