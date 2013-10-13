var factories = require('../app.js').factories;

factories.factory('loginFactory', function($http, $q) {
  var factory = {};

  factory.getLoggedInUser = function(){
    var deferred = $q.defer();
    $http.get('/_/loggedin/user').success(function(data){
      factory.currentUser = data;
      deferred.resolve(data);
    });
    return deferred.promise;
  };
  return factory;
});