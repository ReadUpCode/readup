var controllers = require('../app.js').controllers;

controllers.controller('TagController', ['$scope', '$routeParams', 'tagsFactory', '$http', function($scope, $routeParams, tagsFactory, $http) {
  if(tagsFactory.curTag !== $routeParams.tag) {
    $scope.tag = tagsFactory.setTagName($routeParams.tag);
  }else{
    $scope.tag = tagsFactory.curTag;
  }

  $scope.links = tagsFactory.getTagInfo($scope.tag);

  $scope.vote = function(value, link){
    if(link.curUserVote === value){
      console.log('you already voted!');
    } else {
      link.score += value;
      link.curUserVote += value;
      link.value = value;
      $http.post('/_/votes', link).success(function(){
      });
    }
  };
}]);
