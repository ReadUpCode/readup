var factories = require('../app.js').factories;

factories.factory('tagsFactory', function() {
  var factory = {};
  factory.tags = ['js', 'backbone.js', 'python', 'c', 'angular.js', 'arrays', 'fangular', 'ruby', 'yourMom.js', 'rails', 'gems', 'package managers', 'npm', 'node.js', 'batman.js'];
  return factory;
});