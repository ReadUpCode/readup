var controllers = require('../app.js').controllers;

controllers.controller('TagController', ['$scope', '$routeParams', 'tagsFactory', '$http', 'loginFactory', '$location', function($scope, $routeParams, tagsFactory, $http, loginFactory, $location) {
  if(tagsFactory.curTag !== $routeParams.tag) {
    $scope.tag = tagsFactory.setTagName($routeParams.tag);
  }else{
    $scope.tag = tagsFactory.curTag;
  }

  $scope.urlHash = $location.url();
  $scope.links = tagsFactory.getTagInfo($scope.tag);
  $scope.relatedTags = tagsFactory.getRelatedTags($scope.tag);
  $scope.stackOverflowSummary = tagsFactory.getStackOverflow($scope.tag);
  $scope.cats = ['All', 'Op/Ed', 'Tutorial', 'Reference', 'Tool'];

  $scope.currentUser = loginFactory.getLoggedInUser();


  $scope.saveLinkToFavorites = function(link){
      var fav = {
        userid: $scope.currentUser.$$v.id,
        linkid: link.id
      }
    debugger;
    $http.post('/_/favorites', fav).success(function(){
      console.log('saved to favorites')
    });
  }

  $scope.assignClassUpvote = function(link){
    if(link.curUserVote !== 1){
      return 'up-vote-this';
    } else {
      return 'up-vote-this-after';
    }
  };

  $scope.assignClassDownvote = function(link){
    if(link.curUserVote !== -1){
      return 'down-vote-this';
    } else {
      return 'down-vote-this-after';
    }
  };

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

  $scope.getIconURL = function(link, index) {
    return '/partials/icon-' + link.categories[index].name + '.html';
  };

  $scope.switchCat = function(category, index){
    if(category === 'All'){
      $scope.curCat = '';
    } else {
      $scope.curCat = category;
    }
    $scope.selectedCategory = index;
  };

  $scope.updateLocation = function(){
    $scope.urlHash = $location.url();
  };

}]);
