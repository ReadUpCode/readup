var controllers = require('../app.js').controllers;

controllers.controller('LoginController', ['$scope', '$http', '$location', 'loginFactory', function($scope, $http, $location, loginFactory){
  $scope.currentUser = loginFactory.getLoggedInUser();

  $scope.updateLocation = function(){
    $scope.urlHash = $location.url();
  }

  $scope.settings = [
  {
      "text": $scope.currentUser.karma || 0 + " Karma"
    },
    {
      "text": "logout",
      "href": '_/logout'
    }];
}]);