var factories = require('../app.js').factories;

factories.factory('tagsFactory', function($http, $q) {
  var factory = {};
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

  return factory;
});