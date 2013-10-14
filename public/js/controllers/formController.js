var controllers = require('../app.js').controllers;

controllers.controller('FormController', ['$scope', '$http', '$modal', '$q', 'tagsFactory', 'searchFactory', 'loginFactory', function($scope, $http, $modal, $q, tagsFactory, searchFactory, loginFactory) {
  var modalPromise = $modal({template: '../partials/tags_modal.html', persist: true, show: false, backdrop: 'static', scope: $scope});
  var modalPromiseLogin = $modal({template: '../partials/tags_modal_login.html', persist: true, show: false, backdrop: 'static', scope: $scope});
  $scope.doneLoading = false;
  $scope.checkbox = {};
  $scope.currentUser = loginFactory.getLoggedInUser();
  var $paste = angular.element('#paste-link');
  $scope.hasLink = false;
  var _this = this;
  $paste.on('paste', function() {
    //TO DO : trigger link things.
    setTimeout(function() {
      $scope.hasLink = true;
      $scope.getSuggestedData($scope.item.link);
    }, 20);
  });

  $scope.item = {tags : {}, categories: {}};
  $scope.send = function(){
    var suggestedTags = $scope.suggestedData.$$v.tags;
    for (var each in suggestedTags) {
      $scope.item.tags[suggestedTags[each]] = suggestedTags[each];
    }
    for (var category in $scope.checkbox) {
      if($scope.checkbox[category]) {
        $scope.item.categories[category] = category;
      }
    }
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
  $scope.removeTag = function(tag, suggested){
    if (suggested === 'suggested') {
      delete $scope.item.suggestedData.tags[tag];
    }else {
      delete $scope.item.tags[tag];
    }
  };

  $scope.getSearchResults = function() {
    searchFactory.searchDatabase($scope.searchValue);
  };

  $scope.showModal = function() {
    $q.when(modalPromise).then(function(modalEl) {
      modalEl.modal('show');
    });
    $scope.getSuggestedData($scope.item.link);
  };

  $scope.showLoginModal = function() {
    $q.when(modalPromiseLogin).then(function(modalEl) {
      modalEl.modal('show');
    });
  };

  $scope.getSuggestedData = function(link) {
    $scope.doneLoading = false;
    var deferred = $q.defer();
    $http.post('/_/preview', {url: link}).success(function(data) {
      deferred.resolve(data);
    });
    $scope.suggestedData = deferred.promise;
    deferred.promise.then(function() {
      $scope.doneLoading = true;
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