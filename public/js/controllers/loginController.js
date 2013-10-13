var controllers = require('../app.js').controllers;

controllers.controller('LoginController', ['$scope', '$http', '$location', 'loginFactory', function($scope, $http, $location, loginFactory){
	$scope.currentUser = loginFactory.getLoggedInUser();

	$scope.settings = [
	{
	    "text": "user profile",
	    "href": "/"
	  },
	  {
	    "text": "logout",
	    "href": '_/logout'
	  }];
}]);