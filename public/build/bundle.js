;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module('readUp', ['ngRoute','readUp.factories', 'readUp.controllers','$strap.directives']);
var factories = angular.module('readUp.factories', []);
var controllers = angular.module('readUp.controllers', ['readUp.factories']);
var directives = angular.module('readUp.directives', []);

module.exports.controllers = controllers;
module.exports.directives = directives;
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

controllers.controller('HomeController', ['$scope', '$http', 'tagsFactory', function($scope, $http, tagsFactory){
  $scope.tags = tagsFactory.tags;
}]);
},{"../app.js":1}],4:[function(require,module,exports){
var factories = require('../app.js').factories;

factories.factory('tagsFactory', function() {
  var factory = {};
  factory.tags = ['js', 'backbone.js', 'python', 'c', 'angular.js', 'arrays', 'fangular', 'ruby', 'yourMom.js', 'rails', 'gems', 'package managers', 'npm', 'node.js', 'batman.js'];
  return factory;
});
},{"../app.js":1}]},{},[1,2,3,4])
;