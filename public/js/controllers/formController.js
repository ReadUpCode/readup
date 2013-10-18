var controllers = require('../app.js').controllers;

controllers.controller('FormController', ['$scope', '$http', '$modal', '$q', 'tagsFactory', 'searchFactory', 'loginFactory', '$timeout', function($scope, $http, $modal, $q, tagsFactory, searchFactory, loginFactory, $timeout) {
  var urlRegEx = /^(http(?:s)?\:\/\/[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*\.[a-zA-Z]{2,6}(?:\/?|(?:\/[\w\-]+)*)(?:\/?|\/\w+\.[a-zA-Z]{2,4}(?:\?[\w]+\=[\w\-]+)?)?(?:\&[\w]+\=[\w\-]+)*)$/;

  $scope.doneLoading = true;
  $scope.types = {
    'Tutorial': {
      name: 'Tutorial',
      chosen: false
    },
    'Op/Ed': {
      name: 'Op/Ed',
      chosen: false
    },
    'Reference': {
      name: 'Reference',
      chosen: false
    },
    'Intro': {
      name: 'Intro',
      chosen: false
    }
  };
  $scope.item = { tags : {}, categories: {} , yourTags: {}, title: ''};
  $scope.typeaheadObj = {};
  $scope.suggestedData = {};

  $scope.currentUser = loginFactory.getLoggedInUser();
  $scope.linkForm = {
    tag: '',
    noTagsOnSubmit: false,
    newTag: false,
    hasLink: false,
  };

  $scope.item.noTitleOnSubmit = false;


  //SHOULD CHANGE SCOPE.CATEGORIES THING TO TYPES ON THE SERVER SIDE TOO!!!

  $scope.send = function(){
    $scope.item.title = $('#set-title').text();

    //Title Validity Check
    if ($scope.item.title.length === 0){
      $scope.item.noTitleOnSubmit = true;
      return
    }

    //Tag Validity Checks
    if (!Object.keys($scope.item.tags).length) {
      $scope.linkForm.noTagsOnSubmit = true;
      return;
    }

    //URL Validity Check
    if (!urlRegEx.test($scope.item.link)) {
      $scope.suggestedData.warning = 'Snap! That link came back with nothing. How about pasting it in?';
      return;
    }
    for (var category in $scope.types) {
      var categoryObj = $scope.types[category];
      if(categoryObj.chosen) {
        $scope.item.categories[categoryObj.name] = categoryObj.name;
      }
    }


    //Start spinner as we know we're actually sending the link up to the server.
    $scope.doneLoading = false;

    $http.post('/_/items', $scope.item).success(function() {
      $scope.doneLoading = true;
      $scope.suggestedData = {
        warning: 'Success! Developers everywhere thank you for your link.',
        tags: []
      };
      $scope.item.link = '';
    });
  };

  $scope.addTag = function(tag, newTag){
    newTag = newTag === 'newTag' ? true : false;
    if ((!(tag in $scope.typeaheadObj)) && !newTag) {
      $scope.linkForm.newTag = true;
      $scope.$apply();
      return;
    }
    var allTags = tag.split(',');
    for (var i = 0; i < allTags.length; i++) {
      var trimmed = allTags[i].trim();
      $scope.item.tags[trimmed] = trimmed;
      $scope.item.yourTags[trimmed] = trimmed;
      $scope.linkForm.noTagsOnSubmit = false;
    }
    $scope.linkForm.tag = '';
    if(!newTag) $scope.$apply();
  };

  $scope.hideNewTag = function() {
    $scope.linkForm.newTag = false;
  };

  $scope.toggleTag = function(tag, suggested){
    if ($scope.item.tags[tag] === tag) {
      delete $scope.item.tags[tag];
    }else {
      $scope.item.tags[tag] = tag;
      $scope.linkForm.noTagsOnSubmit = false;
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
    event.srcElement[0].value = '';
  };

  $scope.toggleType = function(type) {
    if (type.chosen) {
      type.chosen = false;
    }else {
      type.chosen = true;
    }
  };

  $scope.getSuggestedData = function(link) {
    var urlRegEx = /^(http(?:s)?\:\/\/[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*\.[a-zA-Z]{2,6}(?:\/?|(?:\/[\w\-]+)*)(?:\/?|\/\w+\.[a-zA-Z]{2,4}(?:\?[\w]+\=[\w\-]+)?)?(?:\&[\w]+\=[\w\-]+)*)$/;
    var deferred = $q.defer();

    //If entered data doesn't match the URL regex, then return error data, and don't actually make the AJAX request.
    if (!urlRegEx.test(link)) {
      var badURL = {warning: "Snap! That link came back with nothing. How about pasting it in?", tags: []};
      $scope.suggestedData = badURL;
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

  // Autocomplete for adding tags
  $scope.typeahead = tagsFactory.getSuggestedTags();

  $scope.typeaheadFn = function() {
    return $.map($scope.typeahead, function(tag) {
      $scope.typeaheadObj[tag.name] = tag.name;
      return tag.name;
    });
  };

  // Autocomplete for the search
  $http.get('/_/tags').success(function(data){
    $scope.typeaheadSearch = data;
  });

  $scope.typeaheadSearchFn = function() {
    return $.map($scope.typeaheadSearch, function(tag) {
      return tag.name;
    });
  };
}]);