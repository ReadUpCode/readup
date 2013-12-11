var factories = require('../app.js').factories;

factories.factory('searchFactory', ['$rootScope', function($rootScope) {
  return {
    searchDatabase: function(searchValue) {
      $rootScope.$broadcast('searchValueChanged', searchValue);
    }
  };
}]);
