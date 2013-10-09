var factories = require('../app.js').factories;
var suggestedTagsFile = require('./1000SuggestedTags.json');

factories.factory('tagsFactory', function($http, $q) {
  var factory = {};

  factory.getSuggestedTags = function() {
    return factory.suggestedTags = suggestedTagsFile;
  };

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
      deferred.resolve(data);
    });
    return deferred.promise;
  };

  return factory;
});