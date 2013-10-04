var factories = require('../app.js').factories;

factories.factory('tagsFactory', function() {
  var factory = {};
  factory.popularTags =  ['js', 'backbone.js', 'python', 'c', 'package managers', 'yourmom.js', 'batman.js', 'fangular'];
  factory.getTagInfo = function(tag) {
    factory.curTag = tag;
    factory.curLinks = [{score: 45, url: 'www.awesome.com/' + factory.curTag},
                        {score: 3, url: 'www.greattechblog.com/' + factory.curTag},
                        {score: 6, url: 'www.thisissweet.com/' + factory.curTag}];
  };

  return factory;
});