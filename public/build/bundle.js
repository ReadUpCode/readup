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

controllers.controller('FormController', ['$scope', '$http', '$modal', '$q', function($scope, $http, $modal, $q) {
  var modalPromise = $modal({template: '../partials/tags_modal.html', persist: true, show: false, backdrop: 'static', scope: $scope});
  $scope.item = {tags : {}};
  $scope.send = function(){
    $http.post('/items', $scope.item).success(function() {
      console.log('we added the link bitches!!!!');
    });
  };
  $scope.addTag = function(tag){
    var allTags = tag.split(',');
    for (var i = 0; i < allTags.length; i++) {
      var trimmed = allTags[i].trim();
      $scope.item.tags[trimmed] = trimmed;
    }
  };
  $scope.removeTag = function(tag){
    delete $scope.item.tags[tag];
  };

  $scope.showModal = function() {
    $q.when(modalPromise).then(function(modalEl) {
      modalEl.modal('show');
    });
  };
}]);
},{"../app.js":1}],3:[function(require,module,exports){
var controllers = require('../app.js').controllers;

controllers.controller('HomeController', ['$scope', '$http', '$location', 'tagsFactory', function($scope, $http, $location, tagsFactory){
	// this is probably going to cause some async issues
	tagsFactory.getAllTags();
  $scope.tags = tagsFactory.popularTags;
  $scope.changeView = function(tagName) {
    tagsFactory.setTagName(tagName);
    $location.path('/' + tagName);
  };
}]);
},{"../app.js":1}],4:[function(require,module,exports){
var controllers = require('../app.js').controllers;

controllers.controller('TagController', ['$scope', '$routeParams', 'tagsFactory', function($scope, $routeParams, tagsFactory) {
  if(tagsFactory.curTag !== $routeParams.tag) {
    $scope.tag = tagsFactory.setTagName($routeParams.tag);
  }else{
    $scope.tag = tagsFactory.curTag;
  }

  $scope.links = tagsFactory.getTagInfo($scope.tag);
  $scope.vote = function(value, link){
    link.score += value;
  };
}]);
},{"../app.js":1}],5:[function(require,module,exports){
var factories = require('../app.js').factories;

factories.factory('tagsFactory', function($http, $q) {
  var factory = {};
  factory.getAllTags = function(){
    $http.get('/tags').success(function(res){
      factory.popularTags = res;
    });
  };

  factory.setTagName = function(tagName) {
    factory.curTag = tagName;
    return tagName;
  };

  factory.getTagInfo = function(tagName){
    var deferred = $q.defer();
    var requestURL = '/tags/' + tagName + '/items';
    $http.get(requestURL).success(function(data){
      deferred.resolve(data.items);
    });
    return deferred.promise;
  };

  return factory;
});
},{"../app.js":1}]},{},[1,2,3,4,5])
;