var controllers = require('../app.js').controllers;

controllers.controller('FormController', ['$scope', '$http', '$modal', '$q', 'tagsFactory', function($scope, $http, $modal, $q, tagsFactory) {
  var modalPromise = $modal({template: '../partials/tags_modal.html', persist: true, show: false, backdrop: 'static', scope: $scope});

  $scope.typeahead = tagsFactory.getSuggestedTags();

  $scope.typeaheadFn = function() {
    return $.map($scope.typeahead, function(tag) {
      return tag.name;
    });
  };

  $scope.item = {tags : {}};
  $scope.send = function(){
    $http.post('/items', $scope.item).success(function() {
      console.log('we added the link bitches!!!!');
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

  $scope.showModal = function() {
    $q.when(modalPromise).then(function(modalEl) {
      modalEl.modal('show');
    });
  };
}]);