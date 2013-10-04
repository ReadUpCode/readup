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