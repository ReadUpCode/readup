var controllers = require('../app.js').controllers;

controllers.controller('FormController', ['$scope', '$http', '$modal', '$q', 'tagsFactory', 'searchFactory', 'loginFactory', function($scope, $http, $modal, $q, tagsFactory, searchFactory, loginFactory) {
  var modalPromise = $modal({template: '../partials/tags_modal.html', persist: true, show: false, backdrop: 'static', scope: $scope});
  var modalPromiseLogin = $modal({template: '../partials/tags_modal_login.html', persist: true, show: false, backdrop: 'static', scope: $scope});
  $scope.doneLoading = true;
  $scope.types = {'Tutorial': {name: 'Tutorial', chosen: false},
                  'Op/Ed': {name: 'Op/Ed', chosen: false},
                  'Reference': {name: 'Reference', chosen: false},
                  'Intro': {name: 'Intro', chosen: false}
                 };
  $scope.currentUser = loginFactory.getLoggedInUser();
  var $paste = angular.element('#paste-link');
  $scope.hasLink = false;

  $paste.on('keyup paste', function() {
    clearTimeout(window.timeoutID);
    window.timeoutID = setTimeout(function() {
      $scope.hasLink = true;
      $scope.getSuggestedData($scope.item.link);
    }, 500);
  });

  // $paste.on('focusout', function() {
  //   console.log('blur event called');
  //   $scope.hasLink = false;
  // });

  //SHOULD CHANGE SCOPE.CATEGORIES THING TO TYPES ON THE SERVER SIDE TOO!!!

  $scope.item = { tags : {}, categories: {} };
  $scope.send = function(){
    var suggestedTags = $scope.suggestedData.$$v.tags;
    for (var each in suggestedTags) {
      $scope.item.tags[suggestedTags[each]] = suggestedTags[each];
    }
    for (var category in $scope.types) {
      if($scope.types[category].chosen) {
        $scope.item.categories[category.name] = category.name;
      }
    }

    $scope.item.title = $('#title-input').val();

    $http.post('/_/items', $scope.item).success(function() {
    });
  };
  $scope.addTag = function(tag){
    var allTags = tag.split(',');
    for (var i = 0; i < allTags.length; i++) {
      var trimmed = allTags[i].trim();
      $scope.item.tags[trimmed] = trimmed;
      // $scope.suggestedData.$$v.tags[trimmed] = trimmed;
    }
  };
  $scope.toggleTag = function(tag, suggested){
    // if (suggested === 'suggested') {
    //   delete $scope.suggestedData.$$v.tags[tag];
    // }else {
    //   delete $scope.item.tags[tag];
    // }
    if ($scope.item.tags[tag] === tag) {
      delete $scope.item.tags[tag];
    }else {
      $scope.item.tags[tag] = tag;
    }
  };

  $scope.toggleClass = function(thing, type) {
    if (type === 'type') {
      return thing.chosen ? 'selected' : '';
    }else {
      return thing in $scope.item.tags ? 'selected' : '';
    }
  };

  $scope.getSearchResults = function() {
    searchFactory.searchDatabase($scope.searchValue);
  };

  $scope.toggleType = function(type) {
    if (type.chosen) {
      type.chosen = false;
    }else {
      type.chosen = true;
    }
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
    var urlRegEx = /^(http(?:s)?\:\/\/[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*\.[a-zA-Z]{2,6}(?:\/?|(?:\/[\w\-]+)*)(?:\/?|\/\w+\.[a-zA-Z]{2,4}(?:\?[\w]+\=[\w\-]+)?)?(?:\&[\w]+\=[\w\-]+)*)$/;
    var deferred = $q.defer();
    
    //If entered data doesn't match the URL regex, then return error data, and don't actually make the AJAX request.
    if (!urlRegEx.test(link)) {
      deferred.resolve({title: "Snap! That link came back with nothing. How about pasting it in?", tags: []});
      $scope.suggestedData = deferred.promise;
      return;
    }
    $scope.doneLoading = false;

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