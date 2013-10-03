angular.module('readUp.controllers', []).controller('FormController', ['$scope', '$http', function($scope, $http) {
  $scope.send = function(item){
    $http.post('/items', item).success(function() {
      console.log('we added the link bitches!!!!');
    });
  };
}]);