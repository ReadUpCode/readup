var app = angular.module('readUp', ['readUp.factories', 'readUp.controllers', 'readUp.directives', '$strap.directives', 'angularSpinner', 'infinite-scroll'], function($routeProvider) {
  $routeProvider.when('/', {
      controller: 'HomeController',
      templateUrl: '../partials/home_view.html'
    });
  $routeProvider.when('/:tag', {
      controller: 'TagController',
      templateUrl: '../partials/tag_view.html'
    });
  $routeProvider.when('/user/:id/:option', {
      controller: 'UserController',
      templateUrl: '../partials/user_view.html'
    });
});
var factories = angular.module('readUp.factories', []);
var controllers = angular.module('readUp.controllers', ['readUp.factories']);
var directives = angular.module('readUp.directives', []);

module.exports.controllers = controllers;
module.exports.directives = directives;
module.exports.factories = factories;
