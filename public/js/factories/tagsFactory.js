var factories = require('../app.js').factories;

factories.factory('tagsFactory', function() {
  var factory = {};
  factory.popularTags =  ['js', 'backbone.js', 'python', 'c', 'package managers', 'yourmom.js', 'batman.js', 'fangular'];
  factory.getTagInfo = function(tag) {
    factory.curTag = tag;
    factory.curLinks = ['www.awesome.com/' + factory.curTag, 'www.greattechblog.com/' + factory.curTag];
  };

  return factory;
});