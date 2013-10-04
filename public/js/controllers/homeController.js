var controllers = require('../app.js').controllers;

controllers.controller('HomeController', ['$scope', '$http', '$location', 'tagsFactory', function($scope, $http, $location, tagsFactory){
  $scope.tags = tagsFactory.tags;
  $scope.cur = {};
  $scope.changeView = function(tag) {
    $scope.cur.tag = tag;
    console.log($scope.cur.tag);
    $scope.cur.tagLinks = ['www.awesomeblog.com/' + tag, 'www.everydocs.com/' + tag];
    console.log($scope.cur.tagLinks);
    $location.path('/' + tag);
  };
}]);