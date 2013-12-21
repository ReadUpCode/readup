var controllers = require('../app.js').controllers;

controllers.controller('LoginController', ['$scope', '$http', '$location', 'loginFactory', function($scope, $http, $location, loginFactory){
  $scope.currentUser = loginFactory.getLoggedInUser();

  $scope.updateLocation = function(){
    $scope.urlHash = $location.url();
  };

  $scope.viewSaved = function(userName) {
    $location.path('/user/' + userName + '/saved/');
  };

  $scope.viewSubmitted = function(userName) {
    $location.path('/user/' + userName + '/submitted/');
  };
}]);
