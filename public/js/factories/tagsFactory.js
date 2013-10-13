var factories = require('../app.js').factories;
var suggestedTagsFile = require('./1000SuggestedTags.json');

factories.factory('tagsFactory', function($http, $q) {
  var factory = {};

  factory.getSuggestedTags = function() {
    return factory.suggestedTags = suggestedTagsFile;
  };

  factory.getAllTags = function(){

    var deferred = $q.defer();
    $http.get('/_/tags').success(function(data){
      deferred.resolve(data);
    });
    return deferred.promise;
  };

  factory.setTagName = function(tagName) {
    factory.curTag = tagName;
    return tagName;
  };

  factory.getTagInfo = function(tagName){
    var deferred = $q.defer();
    var requestURL = '/_/tags/' + tagName + '/items';
    $http.get(requestURL).success(function(data){
      deferred.resolve(data);
    });
    return deferred.promise;
  };

  factory.getRelatedTags = function(tagName){
    var deferred = $q.defer();
    var requestURL = '/_/tags/' + tagName + '/items';
    $http.get(requestURL).success(function(data){
      var results = {};
      for(var i = 0; i < data.length; i++){
        for(var j = 0; j < data[i].tags.length; j++){
          if(data[i].tags[j].name !== tagName){
            results[data[i].tags[j].name] = data[i].tags[j].name;
          }
        }
      }
      deferred.resolve(results);
    });
    return deferred.promise;
  };

  return factory;
});