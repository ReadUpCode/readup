var controllers = require('../app.js').controllers;

controllers.controller('HomeController', ['$scope', '$http', '$location', 'tagsFactory', function($scope, $http, $location, tagsFactory){
  $scope.tags = tagsFactory.popularTags;
  $scope.changeView = function(tag) {
    tagsFactory.getTagInfo(tag);
    $location.path('/' + tag);
  };
}]);