var factories = require('../app.js').factories;

factories.factory('userFactory', function($http, $q) {
  var factory = {};

  //the 'option' parameter should be 'saved' or 'submitted'
  factory.getAllForUser = function(userID, option){
    var deferred = $q.defer();
    var requestURL =  '/_/users/' + userID + '/' + option;
    $http.get(requestURL).success(function(data){
      deferred.resolve(data);
    });
    return deferred.promise;
  };

  return factory;
});
