;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = angular.module('readUp', ['readUp.factories', 'readUp.controllers','$strap.directives'], function($routeProvider) {
  $routeProvider.when('/', {
      controller: 'HomeController',
      templateUrl: '../partials/home_view.html'
    });
  $routeProvider.when('/:tag', {
      controller: 'TagController',
      templateUrl: '../partials/tag_view.html'
    });
});
var factories = angular.module('readUp.factories', []);
var controllers = angular.module('readUp.controllers', ['readUp.factories']);
// var directives = angular.module('readUp.directives', []);

module.exports.controllers = controllers;
// module.exports.directives = directives;
module.exports.factories = factories;

},{}],2:[function(require,module,exports){
var controllers = require('../app.js').controllers;

controllers.controller('FormController', ['$scope', '$http', '$modal', function($scope, $http, $modal) {
  $scope.item = {tags : {}};
  $scope.send = function(){
    $http.post('/items', $scope.item).success(function() {
      console.log('we added the link bitches!!!!');
    });
  };
  $scope.addTag = function(tag){
    $scope.item.tags[tag] = tag;
  };
}]);
},{"../app.js":1}],3:[function(require,module,exports){
var controllers = require('../app.js').controllers;

controllers.controller('HomeController', ['$scope', '$http', '$location', 'tagsFactory', function($scope, $http, $location, tagsFactory){
	// this is probably going to cause some async issues
	tagsFactory.getAllTags();
  $scope.tags = tagsFactory.popularTags;
  $scope.changeView = function(tag) {
    tagsFactory.getTagInfo(tag);
    $location.path('/' + tag.name);
  };
}]);
},{"../app.js":1}],4:[function(require,module,exports){
var controllers = require('../app.js').controllers;

controllers.controller('TagController', ['$scope', '$routeParams', 'tagsFactory', function($scope, $routeParams, tagsFactory) {
  if(tagsFactory.curTag !== $routeParams.tag) {
    tagsFactory.getTagInfo($routeParams.tag);
  }
  $scope.tag = tagsFactory.curTag;
  $scope.links = tagsFactory.curLinks;
  $scope.vote = function(value, link){
    link.score += value;
  };
}]);
},{"../app.js":1}],5:[function(require,module,exports){
var factories = require('../app.js').factories;

factories.factory('tagsFactory', function($http) {
  var factory = {};
  factory.getAllTags = function(){
    $http.get('/tags').success(function(res){
      factory.popularTags = res;
    });
  };
  //factory.popularTags =  ['js', 'backbone.js', 'python', 'c', 'package managers', 'yourmom.js', 'batman.js', 'fangular'];
  factory.getTagInfo = function(tag) {
    // we're most likely going to need to also pass in the item id to this function
    var requestURL = '/tags/' + tag.id + '/items';
    factory.curTag = tag.name;
    $http.get(requestURL).success(function(res){
      factory.curLinks = res;
    });
    // factory.curLinks = [{score: 45, url: 'www.awesome.com/' + factory.curTag},
    //                     {score: 3, url: 'www.greattechblog.com/' + factory.curTag},
    //                     {score: 6, url: 'www.thisissweet.com/' + factory.curTag}];
  };

  return factory;
});
},{"../app.js":1}]},{},[1,2,3,4,5])
;