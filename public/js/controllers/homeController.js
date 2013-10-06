var controllers = require('../app.js').controllers;

controllers.controller('HomeController', ['$scope', '$http', '$location', 'tagsFactory', function($scope, $http, $location, tagsFactory){
	// this is probably going to cause some async issues
	tagsFactory.getAllTags();
  $scope.tags = tagsFactory.popularTags;
  $scope.changeView = function(tagName) {
    tagsFactory.setTagName(tagName);
    $location.path('/' + tagName);
  };
}]);