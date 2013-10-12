var controllers = require('../app.js').controllers;

controllers.controller('FormController', ['$scope', '$http', '$modal', '$q', 'tagsFactory', 'searchFactory', function($scope, $http, $modal, $q, tagsFactory, searchFactory) {
  var modalPromise = $modal({template: '../partials/tags_modal.html', persist: true, show: false, backdrop: 'static', scope: $scope});

  $scope.item = {tags : {}};
  $scope.send = function(){
    $http.post('/_/items', $scope.item).success(function() {
    });
  };
  $scope.addTag = function(tag){
    var allTags = tag.split(',');
    for (var i = 0; i < allTags.length; i++) {
      var trimmed = allTags[i].trim();
      $scope.item.tags[trimmed] = trimmed;
    }
  };
  $scope.removeTag = function(tag){
    delete $scope.item.tags[tag];
  };

  $scope.getSearchResults = function() {
    searchFactory.searchDatabase($scope.searchValue);
  };

  $scope.showModal = function() {
    $q.when(modalPromise).then(function(modalEl) {
      modalEl.modal('show');
    });
  };

  // autocomplete for adding tags
  $scope.typeahead = tagsFactory.getSuggestedTags();

  $scope.typeaheadFn = function() {
    return $.map($scope.typeahead, function(tag) {
      return tag.name;
    });
  };

  // autocomplete for the search
  $http.get('/_/tags').success(function(data){
    $scope.typeaheadSearch = data;
  });

  $scope.typeaheadSearchFn = function() {
    return $.map($scope.typeaheadSearch, function(tag) {
      return tag.name;
    });
  };
}]);