var controllers = require('../app.js').controllers;
var suggestedTagsFile = require('../factories/1000SuggestedTags.json');

controllers.controller('FormController', ['$scope', '$http', '$modal', '$q', 'tagsFactory', 'searchFactory', 'loginFactory', '$timeout', "$location", function($scope, $http, $modal, $q, tagsFactory, searchFactory, loginFactory, $timeout, $location) {
  var urlRegEx = /(http|https|ftp):\/\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?$&\/\/=]*)?/gi;

  $scope.doneLoading = true;
  $scope.types = [
    {
      name: 'Tool',
      chosen: false,
      order: 'd'
    },
    {
      name: 'Op/Ed',
      chosen: false,
      order: 'c'
    },
    {
      name: 'Reference',
      chosen: false,
      order: 'b'
    },
    {
      name: 'Tutorial',
      chosen: false,
      order: 'a'
    }
  ];
  $scope.item = { tags : {}, categories: {} , yourTags: {}, title: ''};
  $scope.typeaheadObj = {};
  $scope.suggestedData = {};

  $scope.currentUser = loginFactory.getLoggedInUser();
  $scope.linkForm = {
    tag: '',
    noTagsOnSubmit: false,
    newTag: false,
    hasLink: false,
    editMode: false
  };

  $scope.urlHash = $location.url();

  //SHOULD CHANGE SCOPE.CATEGORIES THING TO TYPES ON THE SERVER SIDE TOO!!!

  $scope.send = function(){
    //Set title from element
    $scope.item.title = $scope.suggestedData.title;

    //Title Validity Check
    if ($scope.item.title.length === 0){
      $scope.item.noTitleOnSubmit = true;
      return;
    }

    //Tag Validity Checks
    if (!Object.keys($scope.item.tags).length) {
      $scope.linkForm.noTagsOnSubmit = true;
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
        tags: {}
      };
      $scope.item.link = '';
      $scope.item.yourTags = {};
      $scope.item.tags = {};
      for (var each in $scope.types){
        $scope.types[each].chosen = false;
      }
    });
  };

  $scope.addTag = function(tag, newTag){
    newTag = newTag === 'newTag' ? true : false;
    if (($scope.typeahead.indexOf(tag) === -1) && !newTag) {
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
    var urlRegEx = /(http|https|ftp):\/\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?$&\/\/=]*)?/gi;

    //If entered data doesn't match the URL regex, then return error data, and don't actually make the AJAX request.
    if (!urlRegEx.test(link)) {
      var badURL = {warning: "Snap! That link came back with nothing. How about pasting it in?", tags: []};
      $scope.suggestedData = badURL;
      return;
    }

    //Starts loading spinner
    $scope.doneLoading = false;

    $http.post('/_/preview', {url: link}).success(function(data) {
      $scope.suggestedData = data;
      $scope.doneLoading = true;
    });
  };

  // Autocomplete for adding tags

  $scope.typeaheadFn = function(query, callback) {
    if(!$scope.suggestedTags){
      var cleanTags = suggestedTagsFile;
      $http.get('/_/tags').success(function(data){
        for(var i = 0; i < data.length; i++){
          cleanTags[data[i].name] = data[i].name;
        }
        console.log(cleanTags);
        var results = [];
        for (var key in cleanTags){
          results.push(key);
        }
        console.log(results);
        $scope.typeahead = results;
        callback(results);
      });
    } else {
      callback($scope.typeahead);
    }
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

  $scope.changeEditMode = function() {
    $scope.linkForm.editMode = !$scope.linkForm.editMode;
  };

  $scope.updateLocation = function(){
    $scope.urlHash = $location.url();
  };
}]);
