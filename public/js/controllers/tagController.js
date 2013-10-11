var controllers = require('../app.js').controllers;

controllers.controller('TagController', ['$scope', '$routeParams', 'tagsFactory', '$http', function($scope, $routeParams, tagsFactory, $http) {
  if(tagsFactory.curTag !== $routeParams.tag) {
    $scope.tag = tagsFactory.setTagName($routeParams.tag);
  }else{
    $scope.tag = tagsFactory.curTag;
  }

  $scope.links = tagsFactory.getTagInfo($scope.tag);

  $scope.vote = function(value, link){
    link.score += value;
    console.log(link);
    link.value = value;
    $http.post('/_/votes', link).success(function(){
    });
  };
}]);