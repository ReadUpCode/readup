var controllers = require('../app.js').controllers;

controllers.controller('TagController', ['$scope', '$routeParams', 'tagsFactory', '$http', 'loginFactory', '$location', function($scope, $routeParams, tagsFactory, $http, loginFactory, $location) {
  if(tagsFactory.curTag !== $routeParams.tag) {
    $scope.tag = tagsFactory.setTagName($routeParams.tag);
    $scope.links = tagsFactory.links = [];
    tagsFactory.page = 0;
    tagsFactory.nextPage($scope.tag);
  }else{
    $scope.tag = tagsFactory.curTag;
  }

  $scope.urlHash = $location.url();
  // $scope.links = tagsFactory.getTagInfo($scope.tag);

  $scope.links = tagsFactory.links;
  $scope.disableScroll = tagsFactory.disableScroll;

  // // version 1
  // tagsFactory.getNextPage($scope.links);


  // // version 2
  // var newPage = tagsFactory.getNextPage(index);
  // $scope.links = $scope.links.concat($scope.links, newPage)

  // // version 3
  // $scope.links = [];
  // tagsFactory.getTagInfo($scope.last, function(data) {
  //   for (var i = 0; i < data.length; i++) {
  //     $scope.links.push(data[i]);
  //   }
  //   $scope.last = data[i].id;
  // });

  $scope.relatedTags = tagsFactory.getRelatedTags($scope.tag);
  $scope.stackOverflowSummary = tagsFactory.getStackOverflow($scope.tag);
  $scope.cats = ['All', 'Op/Ed', 'Tutorial', 'Reference', 'Tool'];

  $scope.currentUser = loginFactory.getLoggedInUser();


  $scope.saveLinkToFavorites = function(link){
      var fav = {
        userid: $scope.currentUser.$$v.id,
        linkid: link.id
      }
    $http.post('/_/favorites', fav);
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
    if(link.curUserVote !== value){
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

  $scope.fetchLinks = function() {
    tagsFactory.nextPage($scope.tag);
  };

}]);
