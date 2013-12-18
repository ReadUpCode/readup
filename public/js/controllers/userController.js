var controllers = require('../app.js').controllers;

controllers.controller('UserController', ['$scope','$routeParams', 'userFactory', '$http', 'loginFactory', '$location', function($scope, $routeParams, $userFactory, $http, $loginFactory, $location){

  $scope.urlHash = $location.url();
  //option should be 'saved' or 'submitted'
  $scope.links =  userFactory.getAllForUser(userId, option);
  $scope.cats = ['All', 'Op/Ed', 'Tutorial', 'Reference', 'Tool'];
  $scope.currentUser = loginFactory.getLoggedInUser();


}])
