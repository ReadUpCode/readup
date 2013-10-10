var controllers = require('../app.js').controllers;

controllers.controller('LoginController', ['$scope', '$http', 'loginFactory', function($scope, $http, loginFactory){
	$scope.currentUser = loginFactory.getLoggedInUser();
}]);