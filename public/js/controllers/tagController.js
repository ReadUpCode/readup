var controllers = require('../app.js').controllers;

controllers.controller('TagController', ['$scope', '$routeParams', function($scope, $routeParams) {
  $scope.tag = $routeParams.tag;
  $scope.links = ['www.awesomeblog.com/' + $scope.tag, 'www.docs.com/' + $scope.tag];
}]);