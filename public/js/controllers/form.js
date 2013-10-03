angular.module('readUp.controllers', []).controller('FormController', ['$scope', '$http', '$modal', function($scope, $http, $modal) {
  $scope.modal = {content: $scope.item}
  $scope.send = function(item){
    $http.post('/items', item).success(function() {
      console.log('we added the link bitches!!!!');
    });
  };
}]);