angular.module('readUp.controllers', []).controller('FormController', ['$scope', function($scope) {
  $scope.print = function(post){
    console.log(post);
  };
}]);