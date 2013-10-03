angular.module('readUp.controllers', []).controller('FormController', ['$scope', '$http', '$modal', function($scope, $http, $modal) {
  $scope.tags = [];
  $scope.send = function(item){
    $http.post('/items', item).success(function() {
      console.log('we added the link bitches!!!!');
    });
  };
  $scope.addTag = function(tag){
    $scope.tags.push(tag);
  };
}]);