;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = angular.module('readUp', ['readUp.factories', 'readUp.controllers','$strap.directives'], function($routeProvider) {
  $routeProvider.when('/', {
      controller: 'HomeController',
      templateUrl: '../partials/home_view.html'
    });
  $routeProvider.when('/:tag', {
      controller: 'TagController',
      templateUrl: '../partials/tag_view.html'
    });
});
var factories = angular.module('readUp.factories', []);
var controllers = angular.module('readUp.controllers', ['readUp.factories']);
// var directives = angular.module('readUp.directives', []);

module.exports.controllers = controllers;
// module.exports.directives = directives;
module.exports.factories = factories;

},{}],2:[function(require,module,exports){
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
},{"../app.js":1}],3:[function(require,module,exports){
var controllers = require('../app.js').controllers;

controllers.controller('HomeController', ['$scope', '$http', '$location', 'tagsFactory', function($scope, $http, $location, tagsFactory){
  $scope.tags = tagsFactory.getAllTags();
  console.log($scope.tags);
  $scope.changeView = function(tagName) {
    tagsFactory.setTagName(tagName);
    $location.path('/' + tagName);
  };
}]);
},{"../app.js":1}],4:[function(require,module,exports){
var controllers = require('../app.js').controllers;

controllers.controller('TagController', ['$scope', '$routeParams', 'tagsFactory', function($scope, $routeParams, tagsFactory) {
  if(tagsFactory.curTag !== $routeParams.tag) {
    $scope.tag = tagsFactory.setTagName($routeParams.tag);
  }else{
    $scope.tag = tagsFactory.curTag;
  }

  $scope.links = tagsFactory.getTagInfo($scope.tag);
  $scope.vote = function(value, link){
    link.score += value;
  };
}]);
},{"../app.js":1}],5:[function(require,module,exports){
module.exports=[
    {
      "name": "c#",
      "count": 526193,
      "fulfills_required": false
    },
    {
      "name": "java",
      "count": 489848,
      "fulfills_required": false
    },
    {
      "name": "javascript",
      "count": 456020,
      "fulfills_required": false
    },
    {
      "name": "php",
      "count": 452703,
      "fulfills_required": false
    },
    {
      "name": "android",
      "count": 394848,
      "fulfills_required": false
    },
    {
      "name": "jquery",
      "count": 372061,
      "fulfills_required": false
    },
    {
      "name": "c++",
      "count": 231003,
      "fulfills_required": false
    },
    {
      "name": "python",
      "count": 226684,
      "fulfills_required": false
    },
    {
      "name": "html",
      "count": 208883,
      "fulfills_required": false
    },
    {
      "name": "mysql",
      "count": 192245,
      "fulfills_required": false
    },
    {
      "name": "asp.net",
      "count": 188886,
      "fulfills_required": false
    },
    {
      "name": "iphone",
      "count": 181430,
      "fulfills_required": false
    },
    {
      "name": "ios",
      "count": 178692,
      "fulfills_required": false
    },
    {
      "name": ".net",
      "count": 166760,
      "fulfills_required": false
    },
    {
      "name": "css",
      "count": 162492,
      "fulfills_required": false
    },
    {
      "name": "sql",
      "count": 158764,
      "fulfills_required": false
    },
    {
      "name": "objective-c",
      "count": 151389,
      "fulfills_required": false
    },
    {
      "name": "ruby-on-rails",
      "count": 133523,
      "fulfills_required": false
    },
    {
      "name": "c",
      "count": 110159,
      "fulfills_required": false
    },
    {
      "name": "ruby",
      "count": 84073,
      "fulfills_required": false
    },
    {
      "name": "sql-server",
      "count": 77959,
      "fulfills_required": false
    },
    {
      "name": "xml",
      "count": 72564,
      "fulfills_required": false
    },
    {
      "name": "ajax",
      "count": 72418,
      "fulfills_required": false
    },
    {
      "name": "wpf",
      "count": 71967,
      "fulfills_required": false
    },
    {
      "name": "regex",
      "count": 69302,
      "fulfills_required": false
    },
    {
      "name": "asp.net-mvc",
      "count": 69005,
      "fulfills_required": false
    },
    {
      "name": "arrays",
      "count": 63570,
      "fulfills_required": false
    },
    {
      "name": "database",
      "count": 62408,
      "fulfills_required": false
    },
    {
      "name": "django",
      "count": 60111,
      "fulfills_required": false
    },
    {
      "name": "linux",
      "count": 59806,
      "fulfills_required": false
    },
    {
      "name": "xcode",
      "count": 57099,
      "fulfills_required": false
    },
    {
      "name": "json",
      "count": 56830,
      "fulfills_required": false
    },
    {
      "name": "windows",
      "count": 54647,
      "fulfills_required": false
    },
    {
      "name": "vb.net",
      "count": 54300,
      "fulfills_required": false
    },
    {
      "name": "eclipse",
      "count": 51464,
      "fulfills_required": false
    },
    {
      "name": "facebook",
      "count": 48202,
      "fulfills_required": false
    },
    {
      "name": "ruby-on-rails-3",
      "count": 47673,
      "fulfills_required": false
    },
    {
      "name": "string",
      "count": 45874,
      "fulfills_required": false
    },
    {
      "name": "multithreading",
      "count": 42726,
      "fulfills_required": false
    },
    {
      "name": "html5",
      "count": 42064,
      "fulfills_required": false
    },
    {
      "name": "winforms",
      "count": 41479,
      "fulfills_required": false
    },
    {
      "name": "r",
      "count": 38543,
      "fulfills_required": false
    },
    {
      "name": "image",
      "count": 37991,
      "fulfills_required": false
    },
    {
      "name": "wordpress",
      "count": 37291,
      "fulfills_required": false
    },
    {
      "name": "visual-studio-2010",
      "count": 37015,
      "fulfills_required": false
    },
    {
      "name": "performance",
      "count": 35834,
      "fulfills_required": false
    },
    {
      "name": "asp.net-mvc-3",
      "count": 35706,
      "fulfills_required": false
    },
    {
      "name": "forms",
      "count": 35494,
      "fulfills_required": false
    },
    {
      "name": "osx",
      "count": 34851,
      "fulfills_required": false
    },
    {
      "name": "spring",
      "count": 33622,
      "fulfills_required": false
    },
    {
      "name": "algorithm",
      "count": 33471,
      "fulfills_required": false
    },
    {
      "name": "linq",
      "count": 33213,
      "fulfills_required": false
    },
    {
      "name": "oracle",
      "count": 32862,
      "fulfills_required": false
    },
    {
      "name": "wcf",
      "count": 32487,
      "fulfills_required": false
    },
    {
      "name": "swing",
      "count": 32153,
      "fulfills_required": false
    },
    {
      "name": "git",
      "count": 32019,
      "fulfills_required": false
    },
    {
      "name": "web-services",
      "count": 31627,
      "fulfills_required": false
    },
    {
      "name": "excel",
      "count": 31310,
      "fulfills_required": false
    },
    {
      "name": "perl",
      "count": 31110,
      "fulfills_required": false
    },
    {
      "name": "sql-server-2008",
      "count": 30400,
      "fulfills_required": false
    },
    {
      "name": "visual-studio",
      "count": 30135,
      "fulfills_required": false
    },
    {
      "name": "node.js",
      "count": 29789,
      "fulfills_required": false
    },
    {
      "name": "apache",
      "count": 29511,
      "fulfills_required": false
    },
    {
      "name": "actionscript-3",
      "count": 29036,
      "fulfills_required": false
    },
    {
      "name": "entity-framework",
      "count": 29006,
      "fulfills_required": false
    },
    {
      "name": "hibernate",
      "count": 28288,
      "fulfills_required": false
    },
    {
      "name": "ipad",
      "count": 27802,
      "fulfills_required": false
    },
    {
      "name": "cocoa-touch",
      "count": 27202,
      "fulfills_required": false
    },
    {
      "name": "bash",
      "count": 26744,
      "fulfills_required": false
    },
    {
      "name": "cocoa",
      "count": 26740,
      "fulfills_required": false
    },
    {
      "name": "flash",
      "count": 25839,
      "fulfills_required": false
    },
    {
      "name": "silverlight",
      "count": 25241,
      "fulfills_required": false
    },
    {
      "name": "api",
      "count": 25089,
      "fulfills_required": false
    },
    {
      "name": "qt",
      "count": 24942,
      "fulfills_required": false
    },
    {
      "name": "jquery-ui",
      "count": 24468,
      "fulfills_required": false
    },
    {
      "name": "file",
      "count": 24462,
      "fulfills_required": false
    },
    {
      "name": "sqlite",
      "count": 24053,
      "fulfills_required": false
    },
    {
      "name": "list",
      "count": 23601,
      "fulfills_required": false
    },
    {
      "name": "matlab",
      "count": 23340,
      "fulfills_required": false
    },
    {
      "name": "tsql",
      "count": 23107,
      "fulfills_required": false
    },
    {
      "name": ".htaccess",
      "count": 23090,
      "fulfills_required": false
    },
    {
      "name": "delphi",
      "count": 23021,
      "fulfills_required": false
    },
    {
      "name": "codeigniter",
      "count": 22746,
      "fulfills_required": false
    },
    {
      "name": "security",
      "count": 22730,
      "fulfills_required": false
    },
    {
      "name": "function",
      "count": 22153,
      "fulfills_required": false
    },
    {
      "name": "class",
      "count": 21982,
      "fulfills_required": false
    },
    {
      "name": "internet-explorer",
      "count": 21660,
      "fulfills_required": false
    },
    {
      "name": "flex",
      "count": 21428,
      "fulfills_required": false
    },
    {
      "name": "google-app-engine",
      "count": 21105,
      "fulfills_required": false
    },
    {
      "name": "oop",
      "count": 21020,
      "fulfills_required": false
    },
    {
      "name": "mongodb",
      "count": 21018,
      "fulfills_required": false
    },
    {
      "name": "jsp",
      "count": 20695,
      "fulfills_required": false
    },
    {
      "name": "unit-testing",
      "count": 20471,
      "fulfills_required": false
    },
    {
      "name": "postgresql",
      "count": 20328,
      "fulfills_required": false
    },
    {
      "name": "google-maps",
      "count": 20272,
      "fulfills_required": false
    },
    {
      "name": "css3",
      "count": 20165,
      "fulfills_required": false
    },
    {
      "name": "validation",
      "count": 20038,
      "fulfills_required": false
    },
    {
      "name": "sockets",
      "count": 19859,
      "fulfills_required": false
    },
    {
      "name": "shell",
      "count": 19695,
      "fulfills_required": false
    },
    {
      "name": "parsing",
      "count": 19637,
      "fulfills_required": false
    },
    {
      "name": "debugging",
      "count": 19628,
      "fulfills_required": false
    },
    {
      "name": "http",
      "count": 19527,
      "fulfills_required": false
    },
    {
      "name": "scala",
      "count": 19164,
      "fulfills_required": false
    },
    {
      "name": "xaml",
      "count": 19027,
      "fulfills_required": false
    },
    {
      "name": "vba",
      "count": 18809,
      "fulfills_required": false
    },
    {
      "name": "magento",
      "count": 18686,
      "fulfills_required": false
    },
    {
      "name": "windows-phone-7",
      "count": 18430,
      "fulfills_required": false
    },
    {
      "name": "google-chrome",
      "count": 18136,
      "fulfills_required": false
    },
    {
      "name": "email",
      "count": 18133,
      "fulfills_required": false
    },
    {
      "name": "winapi",
      "count": 18048,
      "fulfills_required": false
    },
    {
      "name": "android-layout",
      "count": 18038,
      "fulfills_required": false
    },
    {
      "name": "uitableview",
      "count": 17924,
      "fulfills_required": false
    },
    {
      "name": "jquery-ajax",
      "count": 17661,
      "fulfills_required": false
    },
    {
      "name": "rest",
      "count": 17565,
      "fulfills_required": false
    },
    {
      "name": "jsf",
      "count": 17483,
      "fulfills_required": false
    },
    {
      "name": "templates",
      "count": 17340,
      "fulfills_required": false
    },
    {
      "name": "events",
      "count": 17136,
      "fulfills_required": false
    },
    {
      "name": "svn",
      "count": 17045,
      "fulfills_required": false
    },
    {
      "name": "maven",
      "count": 16635,
      "fulfills_required": false
    },
    {
      "name": "url",
      "count": 16528,
      "fulfills_required": false
    },
    {
      "name": "listview",
      "count": 16507,
      "fulfills_required": false
    },
    {
      "name": "c#-4.0",
      "count": 16507,
      "fulfills_required": false
    },
    {
      "name": "variables",
      "count": 16262,
      "fulfills_required": false
    },
    {
      "name": "session",
      "count": 16224,
      "fulfills_required": false
    },
    {
      "name": "sorting",
      "count": 16116,
      "fulfills_required": false
    },
    {
      "name": "table",
      "count": 16090,
      "fulfills_required": false
    },
    {
      "name": "asp.net-mvc-4",
      "count": 16070,
      "fulfills_required": false
    },
    {
      "name": "sql-server-2005",
      "count": 16056,
      "fulfills_required": false
    },
    {
      "name": "zend-framework",
      "count": 16043,
      "fulfills_required": false
    },
    {
      "name": "facebook-graph-api",
      "count": 16000,
      "fulfills_required": false
    },
    {
      "name": "date",
      "count": 15967,
      "fulfills_required": false
    },
    {
      "name": "cakephp",
      "count": 15884,
      "fulfills_required": false
    },
    {
      "name": "unix",
      "count": 15811,
      "fulfills_required": false
    },
    {
      "name": "firefox",
      "count": 15592,
      "fulfills_required": false
    },
    {
      "name": "exception",
      "count": 15230,
      "fulfills_required": false
    },
    {
      "name": "visual-c++",
      "count": 15211,
      "fulfills_required": false
    },
    {
      "name": "java-ee",
      "count": 15207,
      "fulfills_required": false
    },
    {
      "name": "jquery-mobile",
      "count": 14897,
      "fulfills_required": false
    },
    {
      "name": "ms-access",
      "count": 14894,
      "fulfills_required": false
    },
    {
      "name": "loops",
      "count": 14855,
      "fulfills_required": false
    },
    {
      "name": "nhibernate",
      "count": 14628,
      "fulfills_required": false
    },
    {
      "name": "dom",
      "count": 14484,
      "fulfills_required": false
    },
    {
      "name": "datetime",
      "count": 14457,
      "fulfills_required": false
    },
    {
      "name": "twitter-bootstrap",
      "count": 14429,
      "fulfills_required": false
    },
    {
      "name": "visual-studio-2008",
      "count": 14428,
      "fulfills_required": false
    },
    {
      "name": "search",
      "count": 14351,
      "fulfills_required": false
    },
    {
      "name": "tomcat",
      "count": 14336,
      "fulfills_required": false
    },
    {
      "name": "gwt",
      "count": 14276,
      "fulfills_required": false
    },
    {
      "name": "sharepoint",
      "count": 14247,
      "fulfills_required": false
    },
    {
      "name": "xslt",
      "count": 14241,
      "fulfills_required": false
    },
    {
      "name": "authentication",
      "count": 14224,
      "fulfills_required": false
    },
    {
      "name": "generics",
      "count": 14200,
      "fulfills_required": false
    },
    {
      "name": "object",
      "count": 14145,
      "fulfills_required": false
    },
    {
      "name": "angularjs",
      "count": 14121,
      "fulfills_required": false
    },
    {
      "name": "design-patterns",
      "count": 14058,
      "fulfills_required": false
    },
    {
      "name": "opengl",
      "count": 13867,
      "fulfills_required": false
    },
    {
      "name": "google",
      "count": 13860,
      "fulfills_required": false
    },
    {
      "name": "math",
      "count": 13827,
      "fulfills_required": false
    },
    {
      "name": "caching",
      "count": 13789,
      "fulfills_required": false
    },
    {
      "name": "pointers",
      "count": 13783,
      "fulfills_required": false
    },
    {
      "name": "iis",
      "count": 13691,
      "fulfills_required": false
    },
    {
      "name": "symfony2",
      "count": 13655,
      "fulfills_required": false
    },
    {
      "name": "servlets",
      "count": 13365,
      "fulfills_required": false
    },
    {
      "name": "testing",
      "count": 13280,
      "fulfills_required": false
    },
    {
      "name": "pdf",
      "count": 13210,
      "fulfills_required": false
    },
    {
      "name": "grails",
      "count": 13197,
      "fulfills_required": false
    },
    {
      "name": "animation",
      "count": 13192,
      "fulfills_required": false
    },
    {
      "name": "div",
      "count": 13183,
      "fulfills_required": false
    },
    {
      "name": "select",
      "count": 13154,
      "fulfills_required": false
    },
    {
      "name": "networking",
      "count": 13131,
      "fulfills_required": false
    },
    {
      "name": "opencv",
      "count": 13041,
      "fulfills_required": false
    },
    {
      "name": "spring-mvc",
      "count": 13014,
      "fulfills_required": false
    },
    {
      "name": "design",
      "count": 12896,
      "fulfills_required": false
    },
    {
      "name": "post",
      "count": 12874,
      "fulfills_required": false
    },
    {
      "name": "button",
      "count": 12856,
      "fulfills_required": false
    },
    {
      "name": "mod-rewrite",
      "count": 12794,
      "fulfills_required": false
    },
    {
      "name": "haskell",
      "count": 12787,
      "fulfills_required": false
    },
    {
      "name": "redirect",
      "count": 12729,
      "fulfills_required": false
    },
    {
      "name": "core-data",
      "count": 12709,
      "fulfills_required": false
    },
    {
      "name": "drupal",
      "count": 12698,
      "fulfills_required": false
    },
    {
      "name": "inheritance",
      "count": 12620,
      "fulfills_required": false
    },
    {
      "name": "web-applications",
      "count": 12484,
      "fulfills_required": false
    },
    {
      "name": "powershell",
      "count": 12408,
      "fulfills_required": false
    },
    {
      "name": "mobile",
      "count": 12382,
      "fulfills_required": false
    },
    {
      "name": "memory",
      "count": 12295,
      "fulfills_required": false
    },
    {
      "name": "phonegap",
      "count": 12250,
      "fulfills_required": false
    },
    {
      "name": "jpa",
      "count": 12203,
      "fulfills_required": false
    },
    {
      "name": "batch-file",
      "count": 12193,
      "fulfills_required": false
    },
    {
      "name": "optimization",
      "count": 12189,
      "fulfills_required": false
    },
    {
      "name": "mvc",
      "count": 12131,
      "fulfills_required": false
    },
    {
      "name": "activerecord",
      "count": 11995,
      "fulfills_required": false
    },
    {
      "name": "layout",
      "count": 11978,
      "fulfills_required": false
    },
    {
      "name": "ubuntu",
      "count": 11949,
      "fulfills_required": false
    },
    {
      "name": "database-design",
      "count": 11944,
      "fulfills_required": false
    },
    {
      "name": "ios5",
      "count": 11917,
      "fulfills_required": false
    },
    {
      "name": "audio",
      "count": 11864,
      "fulfills_required": false
    },
    {
      "name": "gcc",
      "count": 11806,
      "fulfills_required": false
    },
    {
      "name": "iframe",
      "count": 11662,
      "fulfills_required": false
    },
    {
      "name": "extjs",
      "count": 11590,
      "fulfills_required": false
    },
    {
      "name": "gridview",
      "count": 11579,
      "fulfills_required": false
    },
    {
      "name": "logging",
      "count": 11564,
      "fulfills_required": false
    },
    {
      "name": "stored-procedures",
      "count": 11442,
      "fulfills_required": false
    },
    {
      "name": "vim",
      "count": 11387,
      "fulfills_required": false
    },
    {
      "name": "backbone.js",
      "count": 11299,
      "fulfills_required": false
    },
    {
      "name": "video",
      "count": 11275,
      "fulfills_required": false
    },
    {
      "name": "join",
      "count": 11250,
      "fulfills_required": false
    },
    {
      "name": "linq-to-sql",
      "count": 11241,
      "fulfills_required": false
    },
    {
      "name": "serialization",
      "count": 11237,
      "fulfills_required": false
    },
    {
      "name": "gui",
      "count": 11216,
      "fulfills_required": false
    },
    {
      "name": "memory-management",
      "count": 11148,
      "fulfills_required": false
    },
    {
      "name": "image-processing",
      "count": 11143,
      "fulfills_required": false
    },
    {
      "name": "user-interface",
      "count": 11121,
      "fulfills_required": false
    },
    {
      "name": "csv",
      "count": 11051,
      "fulfills_required": false
    },
    {
      "name": "ios4",
      "count": 11017,
      "fulfills_required": false
    },
    {
      "name": "android-intent",
      "count": 10984,
      "fulfills_required": false
    },
    {
      "name": "python-2.7",
      "count": 10971,
      "fulfills_required": false
    },
    {
      "name": "dynamic",
      "count": 10931,
      "fulfills_required": false
    },
    {
      "name": "razor",
      "count": 10913,
      "fulfills_required": false
    },
    {
      "name": "visual-studio-2012",
      "count": 10913,
      "fulfills_required": false
    },
    {
      "name": "excel-vba",
      "count": 10821,
      "fulfills_required": false
    },
    {
      "name": "file-upload",
      "count": 10733,
      "fulfills_required": false
    },
    {
      "name": "data-binding",
      "count": 10694,
      "fulfills_required": false
    },
    {
      "name": "boost",
      "count": 10572,
      "fulfills_required": false
    },
    {
      "name": "cookies",
      "count": 10558,
      "fulfills_required": false
    },
    {
      "name": "soap",
      "count": 10454,
      "fulfills_required": false
    },
    {
      "name": "plugins",
      "count": 10403,
      "fulfills_required": false
    },
    {
      "name": "text",
      "count": 10273,
      "fulfills_required": false
    },
    {
      "name": "azure",
      "count": 10251,
      "fulfills_required": false
    },
    {
      "name": "curl",
      "count": 10239,
      "fulfills_required": false
    },
    {
      "name": "jsf-2",
      "count": 10139,
      "fulfills_required": false
    },
    {
      "name": "reflection",
      "count": 10091,
      "fulfills_required": false
    },
    {
      "name": "assembly",
      "count": 10064,
      "fulfills_required": false
    },
    {
      "name": "ssl",
      "count": 9985,
      "fulfills_required": false
    },
    {
      "name": "canvas",
      "count": 9958,
      "fulfills_required": false
    },
    {
      "name": "dll",
      "count": 9955,
      "fulfills_required": false
    },
    {
      "name": "jquery-plugins",
      "count": 9938,
      "fulfills_required": false
    },
    {
      "name": "google-maps-api-3",
      "count": 9934,
      "fulfills_required": false
    },
    {
      "name": "if-statement",
      "count": 9883,
      "fulfills_required": false
    },
    {
      "name": "netbeans",
      "count": 9864,
      "fulfills_required": false
    },
    {
      "name": "xpath",
      "count": 9763,
      "fulfills_required": false
    },
    {
      "name": "encryption",
      "count": 9690,
      "fulfills_required": false
    },
    {
      "name": "browser",
      "count": 9672,
      "fulfills_required": false
    },
    {
      "name": "heroku",
      "count": 9613,
      "fulfills_required": false
    },
    {
      "name": "mvvm",
      "count": 9601,
      "fulfills_required": false
    },
    {
      "name": "selenium",
      "count": 9491,
      "fulfills_required": false
    },
    {
      "name": "jdbc",
      "count": 9484,
      "fulfills_required": false
    },
    {
      "name": "twitter",
      "count": 9371,
      "fulfills_required": false
    },
    {
      "name": "deployment",
      "count": 9287,
      "fulfills_required": false
    },
    {
      "name": "javascript-events",
      "count": 9241,
      "fulfills_required": false
    },
    {
      "name": "script",
      "count": 9167,
      "fulfills_required": false
    },
    {
      "name": "asynchronous",
      "count": 9134,
      "fulfills_required": false
    },
    {
      "name": "data-structures",
      "count": 9089,
      "fulfills_required": false
    },
    {
      "name": "c++11",
      "count": 9073,
      "fulfills_required": false
    },
    {
      "name": "file-io",
      "count": 9002,
      "fulfills_required": false
    },
    {
      "name": "ios6",
      "count": 8921,
      "fulfills_required": false
    },
    {
      "name": "data",
      "count": 8907,
      "fulfills_required": false
    },
    {
      "name": "emacs",
      "count": 8865,
      "fulfills_required": false
    },
    {
      "name": "service",
      "count": 8864,
      "fulfills_required": false
    },
    {
      "name": "for-loop",
      "count": 8832,
      "fulfills_required": false
    },
    {
      "name": "graphics",
      "count": 8789,
      "fulfills_required": false
    },
    {
      "name": "drop-down-menu",
      "count": 8738,
      "fulfills_required": false
    },
    {
      "name": "view",
      "count": 8600,
      "fulfills_required": false
    },
    {
      "name": "asp.net-mvc-2",
      "count": 8581,
      "fulfills_required": false
    },
    {
      "name": "version-control",
      "count": 8519,
      "fulfills_required": false
    },
    {
      "name": "hadoop",
      "count": 8485,
      "fulfills_required": false
    },
    {
      "name": "windows-8",
      "count": 8448,
      "fulfills_required": false
    },
    {
      "name": "binding",
      "count": 8429,
      "fulfills_required": false
    },
    {
      "name": "methods",
      "count": 8423,
      "fulfills_required": false
    },
    {
      "name": "blackberry",
      "count": 8389,
      "fulfills_required": false
    },
    {
      "name": "web",
      "count": 8385,
      "fulfills_required": false
    },
    {
      "name": "unicode",
      "count": 8364,
      "fulfills_required": false
    },
    {
      "name": "encoding",
      "count": 8356,
      "fulfills_required": false
    },
    {
      "name": "ant",
      "count": 8354,
      "fulfills_required": false
    },
    {
      "name": "recursion",
      "count": 8346,
      "fulfills_required": false
    },
    {
      "name": "input",
      "count": 8298,
      "fulfills_required": false
    },
    {
      "name": "collections",
      "count": 8254,
      "fulfills_required": false
    },
    {
      "name": "joomla",
      "count": 8235,
      "fulfills_required": false
    },
    {
      "name": "uiview",
      "count": 8233,
      "fulfills_required": false
    },
    {
      "name": "random",
      "count": 8221,
      "fulfills_required": false
    },
    {
      "name": "checkbox",
      "count": 8154,
      "fulfills_required": false
    },
    {
      "name": "uitableviewcell",
      "count": 7968,
      "fulfills_required": false
    },
    {
      "name": "command-line",
      "count": 7924,
      "fulfills_required": false
    },
    {
      "name": "login",
      "count": 7900,
      "fulfills_required": false
    },
    {
      "name": "hash",
      "count": 7883,
      "fulfills_required": false
    },
    {
      "name": "time",
      "count": 7870,
      "fulfills_required": false
    },
    {
      "name": "printing",
      "count": 7869,
      "fulfills_required": false
    },
    {
      "name": "windows-7",
      "count": 7862,
      "fulfills_required": false
    },
    {
      "name": "opengl-es",
      "count": 7794,
      "fulfills_required": false
    },
    {
      "name": "dictionary",
      "count": 7789,
      "fulfills_required": false
    },
    {
      "name": "python-3.x",
      "count": 7780,
      "fulfills_required": false
    },
    {
      "name": "syntax",
      "count": 7770,
      "fulfills_required": false
    },
    {
      "name": "reporting-services",
      "count": 7713,
      "fulfills_required": false
    },
    {
      "name": "graph",
      "count": 7698,
      "fulfills_required": false
    },
    {
      "name": "orm",
      "count": 7651,
      "fulfills_required": false
    },
    {
      "name": "types",
      "count": 7624,
      "fulfills_required": false
    },
    {
      "name": "architecture",
      "count": 7617,
      "fulfills_required": false
    },
    {
      "name": "knockout.js",
      "count": 7587,
      "fulfills_required": false
    },
    {
      "name": "iis7",
      "count": 7557,
      "fulfills_required": false
    },
    {
      "name": "vector",
      "count": 7552,
      "fulfills_required": false
    },
    {
      "name": "compiler",
      "count": 7505,
      "fulfills_required": false
    },
    {
      "name": "django-models",
      "count": 7483,
      "fulfills_required": false
    },
    {
      "name": "numpy",
      "count": 7425,
      "fulfills_required": false
    },
    {
      "name": "actionscript",
      "count": 7381,
      "fulfills_required": false
    },
    {
      "name": "properties",
      "count": 7367,
      "fulfills_required": false
    },
    {
      "name": "solr",
      "count": 7205,
      "fulfills_required": false
    },
    {
      "name": "primefaces",
      "count": 7204,
      "fulfills_required": false
    },
    {
      "name": "configuration",
      "count": 7181,
      "fulfills_required": false
    },
    {
      "name": "utf-8",
      "count": 7169,
      "fulfills_required": false
    },
    {
      "name": ".net-4.0",
      "count": 7168,
      "fulfills_required": false
    },
    {
      "name": "github",
      "count": 7161,
      "fulfills_required": false
    },
    {
      "name": "concurrency",
      "count": 7109,
      "fulfills_required": false
    },
    {
      "name": "map",
      "count": 7023,
      "fulfills_required": false
    },
    {
      "name": "matrix",
      "count": 7015,
      "fulfills_required": false
    },
    {
      "name": "datagrid",
      "count": 7007,
      "fulfills_required": false
    },
    {
      "name": "datagridview",
      "count": 6990,
      "fulfills_required": false
    },
    {
      "name": "tcp",
      "count": 6983,
      "fulfills_required": false
    },
    {
      "name": "groovy",
      "count": 6964,
      "fulfills_required": false
    },
    {
      "name": "memory-leaks",
      "count": 6940,
      "fulfills_required": false
    },
    {
      "name": "multidimensional-array",
      "count": 6875,
      "fulfills_required": false
    },
    {
      "name": "entity-framework-4",
      "count": 6864,
      "fulfills_required": false
    },
    {
      "name": "menu",
      "count": 6839,
      "fulfills_required": false
    },
    {
      "name": "interface",
      "count": 6838,
      "fulfills_required": false
    },
    {
      "name": "sharepoint-2010",
      "count": 6815,
      "fulfills_required": false
    },
    {
      "name": "uiviewcontroller",
      "count": 6796,
      "fulfills_required": false
    },
    {
      "name": "parameters",
      "count": 6776,
      "fulfills_required": false
    },
    {
      "name": "com",
      "count": 6770,
      "fulfills_required": false
    },
    {
      "name": "asp-classic",
      "count": 6768,
      "fulfills_required": false
    },
    {
      "name": "activity",
      "count": 6762,
      "fulfills_required": false
    },
    {
      "name": "exception-handling",
      "count": 6756,
      "fulfills_required": false
    },
    {
      "name": "macros",
      "count": 6708,
      "fulfills_required": false
    },
    {
      "name": "jqgrid",
      "count": 6681,
      "fulfills_required": false
    },
    {
      "name": "svg",
      "count": 6674,
      "fulfills_required": false
    },
    {
      "name": "stl",
      "count": 6612,
      "fulfills_required": false
    },
    {
      "name": "coldfusion",
      "count": 6607,
      "fulfills_required": false
    },
    {
      "name": "vbscript",
      "count": 6585,
      "fulfills_required": false
    },
    {
      "name": "android-listview",
      "count": 6558,
      "fulfills_required": false
    },
    {
      "name": "oauth",
      "count": 6552,
      "fulfills_required": false
    },
    {
      "name": "yii",
      "count": 6541,
      "fulfills_required": false
    },
    {
      "name": "url-rewriting",
      "count": 6490,
      "fulfills_required": false
    },
    {
      "name": "google-chrome-extension",
      "count": 6486,
      "fulfills_required": false
    },
    {
      "name": "build",
      "count": 6476,
      "fulfills_required": false
    },
    {
      "name": "rspec",
      "count": 6450,
      "fulfills_required": false
    },
    {
      "name": "pdo",
      "count": 6449,
      "fulfills_required": false
    },
    {
      "name": "process",
      "count": 6443,
      "fulfills_required": false
    },
    {
      "name": "colors",
      "count": 6425,
      "fulfills_required": false
    },
    {
      "name": "language-agnostic",
      "count": 6419,
      "fulfills_required": false
    },
    {
      "name": "model",
      "count": 6410,
      "fulfills_required": false
    },
    {
      "name": "fonts",
      "count": 6406,
      "fulfills_required": false
    },
    {
      "name": "cordova",
      "count": 6376,
      "fulfills_required": false
    },
    {
      "name": "tfs",
      "count": 6369,
      "fulfills_required": false
    },
    {
      "name": "scripting",
      "count": 6359,
      "fulfills_required": false
    },
    {
      "name": "error-handling",
      "count": 6358,
      "fulfills_required": false
    },
    {
      "name": "paypal",
      "count": 6354,
      "fulfills_required": false
    },
    {
      "name": "struts2",
      "count": 6350,
      "fulfills_required": false
    },
    {
      "name": "internet-explorer-8",
      "count": 6338,
      "fulfills_required": false
    },
    {
      "name": "sdk",
      "count": 6334,
      "fulfills_required": false
    },
    {
      "name": "junit",
      "count": 6311,
      "fulfills_required": false
    },
    {
      "name": "casting",
      "count": 6295,
      "fulfills_required": false
    },
    {
      "name": "user-controls",
      "count": 6275,
      "fulfills_required": false
    },
    {
      "name": "character-encoding",
      "count": 6264,
      "fulfills_required": false
    },
    {
      "name": "amazon-web-services",
      "count": 6261,
      "fulfills_required": false
    },
    {
      "name": "https",
      "count": 6248,
      "fulfills_required": false
    },
    {
      "name": "arraylist",
      "count": 6245,
      "fulfills_required": false
    },
    {
      "name": "jar",
      "count": 6229,
      "fulfills_required": false
    },
    {
      "name": "reference",
      "count": 6219,
      "fulfills_required": false
    },
    {
      "name": "import",
      "count": 6201,
      "fulfills_required": false
    },
    {
      "name": "plsql",
      "count": 6190,
      "fulfills_required": false
    },
    {
      "name": "windows-phone-8",
      "count": 6180,
      "fulfills_required": false
    },
    {
      "name": "background",
      "count": 6142,
      "fulfills_required": false
    },
    {
      "name": "uiwebview",
      "count": 6118,
      "fulfills_required": false
    },
    {
      "name": "timer",
      "count": 6113,
      "fulfills_required": false
    },
    {
      "name": "upload",
      "count": 6112,
      "fulfills_required": false
    },
    {
      "name": "constructor",
      "count": 6106,
      "fulfills_required": false
    },
    {
      "name": "autocomplete",
      "count": 6105,
      "fulfills_required": false
    },
    {
      "name": "webforms",
      "count": 6094,
      "fulfills_required": false
    },
    {
      "name": "static",
      "count": 6078,
      "fulfills_required": false
    },
    {
      "name": "xml-parsing",
      "count": 6058,
      "fulfills_required": false
    },
    {
      "name": "frameworks",
      "count": 6049,
      "fulfills_required": false
    },
    {
      "name": "jboss",
      "count": 6047,
      "fulfills_required": false
    },
    {
      "name": "ssh",
      "count": 6038,
      "fulfills_required": false
    },
    {
      "name": "nginx",
      "count": 6032,
      "fulfills_required": false
    },
    {
      "name": "ember.js",
      "count": 6012,
      "fulfills_required": false
    },
    {
      "name": "struct",
      "count": 5996,
      "fulfills_required": false
    },
    {
      "name": "dependency-injection",
      "count": 5996,
      "fulfills_required": false
    },
    {
      "name": "clojure",
      "count": 5984,
      "fulfills_required": false
    },
    {
      "name": "combobox",
      "count": 5980,
      "fulfills_required": false
    },
    {
      "name": "filter",
      "count": 5966,
      "fulfills_required": false
    },
    {
      "name": "webview",
      "count": 5952,
      "fulfills_required": false
    },
    {
      "name": "replace",
      "count": 5931,
      "fulfills_required": false
    },
    {
      "name": "jquery-selectors",
      "count": 5915,
      "fulfills_required": false
    },
    {
      "name": "mfc",
      "count": 5911,
      "fulfills_required": false
    },
    {
      "name": "localization",
      "count": 5900,
      "fulfills_required": false
    },
    {
      "name": "module",
      "count": 5882,
      "fulfills_required": false
    },
    {
      "name": "foreach",
      "count": 5881,
      "fulfills_required": false
    },
    {
      "name": "hyperlink",
      "count": 5879,
      "fulfills_required": false
    },
    {
      "name": "charts",
      "count": 5831,
      "fulfills_required": false
    },
    {
      "name": "air",
      "count": 5821,
      "fulfills_required": false
    },
    {
      "name": "triggers",
      "count": 5820,
      "fulfills_required": false
    },
    {
      "name": "tabs",
      "count": 5809,
      "fulfills_required": false
    },
    {
      "name": "vb6",
      "count": 5796,
      "fulfills_required": false
    },
{
      "name": "insert",
      "count": 5784,
      "fulfills_required": false
    },
    {
      "name": "3d",
      "count": 5763,
      "fulfills_required": false
    },
    {
      "name": "sed",
      "count": 5763,
      "fulfills_required": false
    },
    {
      "name": "textbox",
      "count": 5756,
      "fulfills_required": false
    },
    {
      "name": "sqlite3",
      "count": 5741,
      "fulfills_required": false
    },
    {
      "name": "uiscrollview",
      "count": 5729,
      "fulfills_required": false
    },
    {
      "name": "dojo",
      "count": 5728,
      "fulfills_required": false
    },
    {
      "name": "bitmap",
      "count": 5709,
      "fulfills_required": false
    },
    {
      "name": "android-emulator",
      "count": 5701,
      "fulfills_required": false
    },
    {
      "name": "ado.net",
      "count": 5700,
      "fulfills_required": false
    },
    {
      "name": "permissions",
      "count": 5693,
      "fulfills_required": false
    },
    {
      "name": "xcode4",
      "count": 5657,
      "fulfills_required": false
    },
    {
      "name": "path",
      "count": 5649,
      "fulfills_required": false
    },
    {
      "name": "android-fragments",
      "count": 5625,
      "fulfills_required": false
    },
    {
      "name": "io",
      "count": 5614,
      "fulfills_required": false
    },
    {
      "name": "eclipse-plugin",
      "count": 5607,
      "fulfills_required": false
    },
    {
      "name": "java-me",
      "count": 5603,
      "fulfills_required": false
    },
    {
      "name": "cuda",
      "count": 5577,
      "fulfills_required": false
    },
    {
      "name": "delete",
      "count": 5577,
      "fulfills_required": false
    },
    {
      "name": "header",
      "count": 5561,
      "fulfills_required": false
    },
    {
      "name": "compilation",
      "count": 5555,
      "fulfills_required": false
    },
    {
      "name": "proxy",
      "count": 5550,
      "fulfills_required": false
    },
    {
      "name": "mercurial",
      "count": 5547,
      "fulfills_required": false
    },
    {
      "name": "awk",
      "count": 5525,
      "fulfills_required": false
    },
    {
      "name": "ssis",
      "count": 5508,
      "fulfills_required": false
    },
    {
      "name": "cross-browser",
      "count": 5497,
      "fulfills_required": false
    },
    {
      "name": "ruby-on-rails-3.2",
      "count": 5496,
      "fulfills_required": false
    },
    {
      "name": "transactions",
      "count": 5491,
      "fulfills_required": false
    },
    {
      "name": "crystal-reports",
      "count": 5471,
      "fulfills_required": false
    },
    {
      "name": "devise",
      "count": 5463,
      "fulfills_required": false
    },
    {
      "name": "express",
      "count": 5450,
      "fulfills_required": false
    },
    {
      "name": "ftp",
      "count": 5445,
      "fulfills_required": false
    },
    {
      "name": "safari",
      "count": 5438,
      "fulfills_required": false
    },
    {
      "name": "cocos2d-iphone",
      "count": 5432,
      "fulfills_required": false
    },
    {
      "name": "coding-style",
      "count": 5419,
      "fulfills_required": false
    },
    {
      "name": "enums",
      "count": 5418,
      "fulfills_required": false
    },
    {
      "name": "website",
      "count": 5410,
      "fulfills_required": false
    },
    {
      "name": "datatable",
      "count": 5385,
      "fulfills_required": false
    },
    {
      "name": "silverlight-4.0",
      "count": 5362,
      "fulfills_required": false
    },
    {
      "name": "youtube",
      "count": 5346,
      "fulfills_required": false
    },
    {
      "name": "dialog",
      "count": 5345,
      "fulfills_required": false
    },
    {
      "name": "mysqli",
      "count": 5327,
      "fulfills_required": false
    },
    {
      "name": "msbuild",
      "count": 5318,
      "fulfills_required": false
    },
    {
      "name": "attributes",
      "count": 5316,
      "fulfills_required": false
    },
    {
      "name": "lambda",
      "count": 5301,
      "fulfills_required": false
    },
    {
      "name": "dns",
      "count": 5285,
      "fulfills_required": false
    },
    {
      "name": "playframework",
      "count": 5267,
      "fulfills_required": false
    },
    {
      "name": "ruby-on-rails-3.1",
      "count": 5262,
      "fulfills_required": false
    },
    {
      "name": "internationalization",
      "count": 5261,
      "fulfills_required": false
    },
    {
      "name": "callback",
      "count": 5233,
      "fulfills_required": false
    },
    {
      "name": "amazon-s3",
      "count": 5216,
      "fulfills_required": false
    },
    {
      "name": "f#",
      "count": 5204,
      "fulfills_required": false
    },
    {
      "name": "delegates",
      "count": 5189,
      "fulfills_required": false
    },
    {
      "name": "intellij-idea",
      "count": 5182,
      "fulfills_required": false
    },
    {
      "name": "drag-and-drop",
      "count": 5170,
      "fulfills_required": false
    },
    {
      "name": "uinavigationcontroller",
      "count": 5148,
      "fulfills_required": false
    },
    {
      "name": "xna",
      "count": 5142,
      "fulfills_required": false
    },
    {
      "name": "event-handling",
      "count": 5131,
      "fulfills_required": false
    },
    {
      "name": "ide",
      "count": 5124,
      "fulfills_required": false
    },
    {
      "name": "matplotlib",
      "count": 5104,
      "fulfills_required": false
    },
    {
      "name": "xhtml",
      "count": 5093,
      "fulfills_required": false
    },
    {
      "name": "get",
      "count": 5089,
      "fulfills_required": false
    },
    {
      "name": "monotouch",
      "count": 5087,
      "fulfills_required": false
    },
    {
      "name": "merge",
      "count": 5078,
      "fulfills_required": false
    },
    {
      "name": "controller",
      "count": 5077,
      "fulfills_required": false
    },
    {
      "name": ".net-3.5",
      "count": 5076,
      "fulfills_required": false
    },
    {
      "name": "amazon-ec2",
      "count": 5073,
      "fulfills_required": false
    },
    {
      "name": "mono",
      "count": 5039,
      "fulfills_required": false
    },
    {
      "name": "linker",
      "count": 5037,
      "fulfills_required": false
    },
    {
      "name": "count",
      "count": 5030,
      "fulfills_required": false
    },
    {
      "name": "sql-server-2008-r2",
      "count": 4966,
      "fulfills_required": false
    },
    {
      "name": "resources",
      "count": 4959,
      "fulfills_required": false
    },
    {
      "name": "jenkins",
      "count": 4957,
      "fulfills_required": false
    },
    {
      "name": "doctrine2",
      "count": 4946,
      "fulfills_required": false
    },
    {
      "name": "compiler-errors",
      "count": 4938,
      "fulfills_required": false
    },
    {
      "name": "asp.net-web-api",
      "count": 4935,
      "fulfills_required": false
    },
    {
      "name": "tree",
      "count": 4915,
      "fulfills_required": false
    },
    {
      "name": "routing",
      "count": 4912,
      "fulfills_required": false
    },
    {
      "name": "crash",
      "count": 4900,
      "fulfills_required": false
    },
    {
      "name": "lucene",
      "count": 4894,
      "fulfills_required": false
    },
    {
      "name": "maven-2",
      "count": 4877,
      "fulfills_required": false
    },
    {
      "name": "stream",
      "count": 4877,
      "fulfills_required": false
    },
    {
      "name": "parallel-processing",
      "count": 4865,
      "fulfills_required": false
    },
    {
      "name": "namespaces",
      "count": 4856,
      "fulfills_required": false
    },
    {
      "name": "android-asynctask",
      "count": 4847,
      "fulfills_required": false
    },
    {
      "name": "drupal-7",
      "count": 4826,
      "fulfills_required": false
    },
    {
      "name": "spring-security",
      "count": 4807,
      "fulfills_required": false
    },
    {
      "name": "calendar",
      "count": 4788,
      "fulfills_required": false
    },
    {
      "name": "null",
      "count": 4781,
      "fulfills_required": false
    },
    {
      "name": "index",
      "count": 4777,
      "fulfills_required": false
    },
    {
      "name": "uiimageview",
      "count": 4755,
      "fulfills_required": false
    },
    {
      "name": "active-directory",
      "count": 4752,
      "fulfills_required": false
    },
    {
      "name": "floating-point",
      "count": 4745,
      "fulfills_required": false
    },
    {
      "name": "plot",
      "count": 4744,
      "fulfills_required": false
    },
    {
      "name": "listbox",
      "count": 4742,
      "fulfills_required": false
    },
    {
      "name": "navigation",
      "count": 4725,
      "fulfills_required": false
    },
    {
      "name": "android-ndk",
      "count": 4716,
      "fulfills_required": false
    },
    {
      "name": "windows-services",
      "count": 4703,
      "fulfills_required": false
    },
    {
      "name": "bluetooth",
      "count": 4679,
      "fulfills_required": false
    },
    {
      "name": "d3.js",
      "count": 4676,
      "fulfills_required": false
    },
    {
      "name": "highcharts",
      "count": 4668,
      "fulfills_required": false
    },
    {
      "name": "oracle11g",
      "count": 4653,
      "fulfills_required": false
    },
    {
      "name": "android-widget",
      "count": 4642,
      "fulfills_required": false
    },
    {
      "name": "camera",
      "count": 4641,
      "fulfills_required": false
    },
    {
      "name": "cocos2d",
      "count": 4640,
      "fulfills_required": false
    },
    {
      "name": "scroll",
      "count": 4636,
      "fulfills_required": false
    },
    {
      "name": "applet",
      "count": 4631,
      "fulfills_required": false
    },
    {
      "name": "lua",
      "count": 4615,
      "fulfills_required": false
    },
    {
      "name": "tags",
      "count": 4598,
      "fulfills_required": false
    },
    {
      "name": "download",
      "count": 4573,
      "fulfills_required": false
    },
    {
      "name": "onclick",
      "count": 4570,
      "fulfills_required": false
    },
    {
      "name": "webkit",
      "count": 4562,
      "fulfills_required": false
    },
    {
      "name": "nsstring",
      "count": 4554,
      "fulfills_required": false
    },
    {
      "name": "phpmyadmin",
      "count": 4553,
      "fulfills_required": false
    },
    {
      "name": "makefile",
      "count": 4534,
      "fulfills_required": false
    },
    {
      "name": "binary",
      "count": 4513,
      "fulfills_required": false
    },
    {
      "name": "network-programming",
      "count": 4512,
      "fulfills_required": false
    },
    {
      "name": "console",
      "count": 4504,
      "fulfills_required": false
    },
    {
      "name": "jaxb",
      "count": 4499,
      "fulfills_required": false
    },
    {
      "name": "google-analytics",
      "count": 4481,
      "fulfills_required": false
    },
    {
      "name": "linux-kernel",
      "count": 4479,
      "fulfills_required": false
    },
    {
      "name": "resize",
      "count": 4468,
      "fulfills_required": false
    },
    {
      "name": "split",
      "count": 4467,
      "fulfills_required": false
    },
    {
      "name": "rss",
      "count": 4466,
      "fulfills_required": false
    },
    {
      "name": "terminal",
      "count": 4444,
      "fulfills_required": false
    },
    {
      "name": "fluent-nhibernate",
      "count": 4437,
      "fulfills_required": false
    },
    {
      "name": "grid",
      "count": 4431,
      "fulfills_required": false
    },
    {
      "name": "include",
      "count": 4428,
      "fulfills_required": false
    },
    {
      "name": "geolocation",
      "count": 4421,
      "fulfills_required": false
    },
    {
      "name": "rotation",
      "count": 4418,
      "fulfills_required": false
    },
    {
      "name": "keyboard",
      "count": 4417,
      "fulfills_required": false
    },
    {
      "name": "web-config",
      "count": 4413,
      "fulfills_required": false
    },
    {
      "name": "xsd",
      "count": 4391,
      "fulfills_required": false
    },
    {
      "name": "garbage-collection",
      "count": 4373,
      "fulfills_required": false
    },
    {
      "name": "coffeescript",
      "count": 4372,
      "fulfills_required": false
    },
    {
      "name": "annotations",
      "count": 4370,
      "fulfills_required": false
    },
    {
      "name": "rubygems",
      "count": 4368,
      "fulfills_required": false
    },
    {
      "name": "gps",
      "count": 4365,
      "fulfills_required": false
    },
    {
      "name": "google-apps-script",
      "count": 4355,
      "fulfills_required": false
    },
    {
      "name": "uibutton",
      "count": 4352,
      "fulfills_required": false
    },
    {
      "name": "ffmpeg",
      "count": 4351,
      "fulfills_required": false
    },
    {
      "name": "formatting",
      "count": 4342,
      "fulfills_required": false
    },
    {
      "name": "group-by",
      "count": 4334,
      "fulfills_required": false
    },
    {
      "name": "telerik",
      "count": 4321,
      "fulfills_required": false
    },
    {
      "name": "popup",
      "count": 4308,
      "fulfills_required": false
    },
    {
      "name": "notifications",
      "count": 4303,
      "fulfills_required": false
    },
    {
      "name": "functional-programming",
      "count": 4297,
      "fulfills_required": false
    },
    {
      "name": "content-management-system",
      "count": 4295,
      "fulfills_required": false
    },
    {
      "name": "open-source",
      "count": 4287,
      "fulfills_required": false
    },
    {
      "name": "pagination",
      "count": 4271,
      "fulfills_required": false
    },
    {
      "name": "nullpointerexception",
      "count": 4245,
      "fulfills_required": false
    },
    {
      "name": "while-loop",
      "count": 4224,
      "fulfills_required": false
    },
    {
      "name": "django-forms",
      "count": 4212,
      "fulfills_required": false
    },
    {
      "name": "widget",
      "count": 4211,
      "fulfills_required": false
    },
    {
      "name": "windows-runtime",
      "count": 4196,
      "fulfills_required": false
    },
    {
      "name": "documentation",
      "count": 4194,
      "fulfills_required": false
    },
    {
      "name": "doctrine",
      "count": 4182,
      "fulfills_required": false
    },
    {
      "name": "wsdl",
      "count": 4155,
      "fulfills_required": false
    },
    {
      "name": "scope",
      "count": 4154,
      "fulfills_required": false
    },
    {
      "name": "automation",
      "count": 4148,
      "fulfills_required": false
    },
    {
      "name": "qt4",
      "count": 4111,
      "fulfills_required": false
    },
    {
      "name": "ms-word",
      "count": 4093,
      "fulfills_required": false
    },
    {
      "name": "linq-to-entities",
      "count": 4085,
      "fulfills_required": false
    },
    {
      "name": "cron",
      "count": 4075,
      "fulfills_required": false
    },
    {
      "name": "uiimage",
      "count": 4075,
      "fulfills_required": false
    },
    {
      "name": "django-templates",
      "count": 4067,
      "fulfills_required": false
    },
    {
      "name": "outlook",
      "count": 4064,
      "fulfills_required": false
    },
    {
      "name": "seo",
      "count": 4046,
      "fulfills_required": false
    },
    {
      "name": "routes",
      "count": 4032,
      "fulfills_required": false
    },
    {
      "name": "oracle10g",
      "count": 4015,
      "fulfills_required": false
    },
    {
      "name": "datepicker",
      "count": 4014,
      "fulfills_required": false
    },
    {
      "name": "styles",
      "count": 4013,
      "fulfills_required": false
    },
    {
      "name": "click",
      "count": 4006,
      "fulfills_required": false
    },
    {
      "name": "extjs4",
      "count": 3997,
      "fulfills_required": false
    },
    {
      "name": "passwords",
      "count": 3994,
      "fulfills_required": false
    },
    {
      "name": "synchronization",
      "count": 3993,
      "fulfills_required": false
    },
    {
      "name": "cmd",
      "count": 3981,
      "fulfills_required": false
    },
    {
      "name": "directory",
      "count": 3974,
      "fulfills_required": false
    },
    {
      "name": "iterator",
      "count": 3973,
      "fulfills_required": false
    },
    {
      "name": "ef-code-first",
      "count": 3964,
      "fulfills_required": false
    },
    {
      "name": "gem",
      "count": 3962,
      "fulfills_required": false
    },
    {
      "name": "hover",
      "count": 3960,
      "fulfills_required": false
    },
    {
      "name": "load",
      "count": 3932,
      "fulfills_required": false
    },
    {
      "name": "glassfish",
      "count": 3915,
      "fulfills_required": false
    },
    {
      "name": "cryptography",
      "count": 3903,
      "fulfills_required": false
    },
    {
      "name": "operating-system",
      "count": 3889,
      "fulfills_required": false
    },
    {
      "name": "http-headers",
      "count": 3887,
      "fulfills_required": false
    },
    {
      "name": "symfony1",
      "count": 3877,
      "fulfills_required": false
    },
    {
      "name": "wix",
      "count": 3872,
      "fulfills_required": false
    },
    {
      "name": "mapreduce",
      "count": 3855,
      "fulfills_required": false
    },
    {
      "name": "maps",
      "count": 3849,
      "fulfills_required": false
    },
    {
      "name": "kendo-ui",
      "count": 3811,
      "fulfills_required": false
    },
    {
      "name": "jvm",
      "count": 3809,
      "fulfills_required": false
    },
    {
      "name": "treeview",
      "count": 3801,
      "fulfills_required": false
    },
    {
      "name": "thread-safety",
      "count": 3793,
      "fulfills_required": false
    },
    {
      "name": "window",
      "count": 3777,
      "fulfills_required": false
    },
    {
      "name": "scrolling",
      "count": 3768,
      "fulfills_required": false
    },
    {
      "name": "serial-port",
      "count": 3759,
      "fulfills_required": false
    },
    {
      "name": "grep",
      "count": 3756,
      "fulfills_required": false
    },
    {
      "name": "laravel",
      "count": 3754,
      "fulfills_required": false
    },
    {
      "name": "connection",
      "count": 3753,
      "fulfills_required": false
    },
    {
      "name": "jquery-validate",
      "count": 3748,
      "fulfills_required": false
    },
    {
      "name": "websocket",
      "count": 3745,
      "fulfills_required": false
    },
    {
      "name": "slider",
      "count": 3743,
      "fulfills_required": false
    },
    {
      "name": "ggplot2",
      "count": 3742,
      "fulfills_required": false
    },
    {
      "name": "erlang",
      "count": 3738,
      "fulfills_required": false
    },
    {
      "name": "responsive-design",
      "count": 3736,
      "fulfills_required": false
    },
    {
      "name": "smtp",
      "count": 3728,
      "fulfills_required": false
    },
    {
      "name": "nosql",
      "count": 3722,
      "fulfills_required": false
    },
    {
      "name": "x86",
      "count": 3709,
      "fulfills_required": false
    },
    {
      "name": "indexing",
      "count": 3706,
      "fulfills_required": false
    },
    {
      "name": "programming-languages",
      "count": 3702,
      "fulfills_required": false
    },
    {
      "name": "timezone",
      "count": 3701,
      "fulfills_required": false
    },
    {
      "name": "textview",
      "count": 3701,
      "fulfills_required": false
    },
    {
      "name": "jquery-animate",
      "count": 3680,
      "fulfills_required": false
    },
    {
      "name": "apple",
      "count": 3668,
      "fulfills_required": false
    },
    {
      "name": "microsoft-metro",
      "count": 3667,
      "fulfills_required": false
    },
    {
      "name": "internet-explorer-7",
      "count": 3660,
      "fulfills_required": false
    },
    {
      "name": "twitter-api",
      "count": 3660,
      "fulfills_required": false
    },
    {
      "name": "flex4",
      "count": 3646,
      "fulfills_required": false
    },
    {
      "name": "apache2",
      "count": 3636,
      "fulfills_required": false
    },
    {
      "name": "uikit",
      "count": 3627,
      "fulfills_required": false
    },
    {
      "name": "mocking",
      "count": 3625,
      "fulfills_required": false
    },
    {
      "name": "installer",
      "count": 3616,
      "fulfills_required": false
    },
    {
      "name": "jni",
      "count": 3615,
      "fulfills_required": false
    },
    {
      "name": "filesystems",
      "count": 3602,
      "fulfills_required": false
    },
    {
      "name": "udp",
      "count": 3597,
      "fulfills_required": false
    },
    {
      "name": "jtable",
      "count": 3595,
      "fulfills_required": false
    },
    {
      "name": "drupal-6",
      "count": 3593,
      "fulfills_required": false
    },
    {
      "name": "django-admin",
      "count": 3590,
      "fulfills_required": false
    },
    {
      "name": "wordpress-plugin",
      "count": 3590,
      "fulfills_required": false
    },
    {
      "name": "numbers",
      "count": 3587,
      "fulfills_required": false
    },
    {
      "name": "refactoring",
      "count": 3582,
      "fulfills_required": false
    },
    {
      "name": "linked-list",
      "count": 3580,
      "fulfills_required": false
    },
    {
      "name": "cursor",
      "count": 3566,
      "fulfills_required": false
    },
    {
      "name": "fancybox",
      "count": 3561,
      "fulfills_required": false
    },
    {
      "name": "openssl",
      "count": 3558,
      "fulfills_required": false
    },
    {
      "name": "position",
      "count": 3547,
      "fulfills_required": false
    },
    {
      "name": "locking",
      "count": 3546,
      "fulfills_required": false
    },
    {
      "name": "gdb",
      "count": 3545,
      "fulfills_required": false
    },
    {
      "name": "xmlhttprequest",
      "count": 3542,
      "fulfills_required": false
    },
    {
      "name": "wpf-controls",
      "count": 3538,
      "fulfills_required": false
    },
    {
      "name": "installation",
      "count": 3535,
      "fulfills_required": false
    },
    {
      "name": "internet-explorer-9",
      "count": 3529,
      "fulfills_required": false
    },
    {
      "name": "tkinter",
      "count": 3520,
      "fulfills_required": false
    },
    {
      "name": "timeout",
      "count": 3516,
      "fulfills_required": false
    },
    {
      "name": "g++",
      "count": 3516,
      "fulfills_required": false
    },
    {
      "name": "make",
      "count": 3503,
      "fulfills_required": false
    },
    {
      "name": "sms",
      "count": 3495,
      "fulfills_required": false
    },
    {
      "name": "copy",
      "count": 3494,
      "fulfills_required": false
    },
    {
      "name": "tinymce",
      "count": 3490,
      "fulfills_required": false
    },
    {
      "name": "ldap",
      "count": 3473,
      "fulfills_required": false
    },
    {
      "name": "jasper-reports",
      "count": 3469,
      "fulfills_required": false
    },
    {
      "name": "sencha-touch",
      "count": 3461,
      "fulfills_required": false
    },
    {
      "name": "dataset",
      "count": 3460,
      "fulfills_required": false
    },
    {
      "name": "webserver",
      "count": 3458,
      "fulfills_required": false
    },
    {
      "name": "interface-builder",
      "count": 3452,
      "fulfills_required": false
    },
    {
      "name": "radio-button",
      "count": 3448,
      "fulfills_required": false
    },
    {
      "name": "user",
      "count": 3447,
      "fulfills_required": false
    },
    {
      "name": "log4j",
      "count": 3441,
      "fulfills_required": false
    },
    {
      "name": "firefox-addon",
      "count": 3431,
      "fulfills_required": false
    },
    {
      "name": "icons",
      "count": 3427,
      "fulfills_required": false
    },
    {
      "name": "foreign-keys",
      "count": 3424,
      "fulfills_required": false
    },
    {
      "name": "httpwebrequest",
      "count": 3415,
      "fulfills_required": false
    },
    {
      "name": "gtk",
      "count": 3409,
      "fulfills_required": false
    },
    {
      "name": "interop",
      "count": 3403,
      "fulfills_required": false
    },
    {
      "name": "nsmutablearray",
      "count": 3396,
      "fulfills_required": false
    },
    {
      "name": "android-activity",
      "count": 3390,
      "fulfills_required": false
    },
    {
      "name": "request",
      "count": 3384,
      "fulfills_required": false
    },
    {
      "name": "asp.net-ajax",
      "count": 3378,
      "fulfills_required": false
    },
    {
      "name": "escaping",
      "count": 3372,
      "fulfills_required": false
    },
    {
      "name": "char",
      "count": 3358,
      "fulfills_required": false
    },
    {
      "name": "integer",
      "count": 3357,
      "fulfills_required": false
    },
    {
      "name": "css-float",
      "count": 3355,
      "fulfills_required": false
    },
    {
      "name": "statistics",
      "count": 3353,
      "fulfills_required": false
    },
    {
      "name": "command",
      "count": 3351,
      "fulfills_required": false
    },
    {
      "name": "sqlalchemy",
      "count": 3350,
      "fulfills_required": false
    },
    {
      "name": "focus",
      "count": 3348,
      "fulfills_required": false
    },
    {
      "name": "redis",
      "count": 3348,
      "fulfills_required": false
    },
    {
      "name": "playframework-2.0",
      "count": 3347,
      "fulfills_required": false
    },
    {
      "name": "storyboard",
      "count": 3346,
      "fulfills_required": false
    },
    {
      "name": "hashmap",
      "count": 3328,
      "fulfills_required": false
    },
    {
      "name": "full-text-search",
      "count": 3318,
      "fulfills_required": false
    },
    {
      "name": "youtube-api",
      "count": 3309,
      "fulfills_required": false
    },
    {
      "name": "xml-serialization",
      "count": 3307,
      "fulfills_required": false
    },
    {
      "name": "initialization",
      "count": 3304,
      "fulfills_required": false
    },
    {
      "name": "webdriver",
      "count": 3282,
      "fulfills_required": false
    },
    {
      "name": "c++-cli",
      "count": 3258,
      "fulfills_required": false
    },
    {
      "name": "embedded",
      "count": 3246,
      "fulfills_required": false
    },
    {
      "name": "location",
      "count": 3232,
      "fulfills_required": false
    },
    {
      "name": "singleton",
      "count": 3224,
      "fulfills_required": false
    },
    {
      "name": "dependencies",
      "count": 3224,
      "fulfills_required": false
    },
    {
      "name": "gmail",
      "count": 3212,
      "fulfills_required": false
    },
    {
      "name": "uitextfield",
      "count": 3208,
      "fulfills_required": false
    },
    {
      "name": "compression",
      "count": 3207,
      "fulfills_required": false
    },
    {
      "name": "machine-learning",
      "count": 3206,
      "fulfills_required": false
    },
    {
      "name": "app-store",
      "count": 3199,
      "fulfills_required": false
    },
    {
      "name": "find",
      "count": 3185,
      "fulfills_required": false
    },
    {
      "name": "segmentation-fault",
      "count": 3184,
      "fulfills_required": false
    },
    {
      "name": "format",
      "count": 3180,
      "fulfills_required": false
    },
    {
      "name": "push-notification",
      "count": 3177,
      "fulfills_required": false
    },
    {
      "name": "migration",
      "count": 3173,
      "fulfills_required": false
    },
    {
      "name": "google-api",
      "count": 3171,
      "fulfills_required": false
    },
    {
      "name": "touch",
      "count": 3170,
      "fulfills_required": false
    },
    {
      "name": "streaming",
      "count": 3160,
      "fulfills_required": false
    },
    {
      "name": "comparison",
      "count": 3157,
      "fulfills_required": false
    },
    {
      "name": "drawing",
      "count": 3148,
      "fulfills_required": false
    },
    {
      "name": "wxpython",
      "count": 3142,
      "fulfills_required": false
    },
    {
      "name": "cygwin",
      "count": 3130,
      "fulfills_required": false
    },
    {
      "name": "zip",
      "count": 3129,
      "fulfills_required": false
    },
    {
      "name": "imageview",
      "count": 3127,
      "fulfills_required": false
    },
    {
      "name": "facebook-like",
      "count": 3117,
      "fulfills_required": false
    },
    {
      "name": "prolog",
      "count": 3104,
      "fulfills_required": false
    },
    {
      "name": "tfs2010",
      "count": 3104,
      "fulfills_required": false
    },
    {
      "name": "sencha-touch-2",
      "count": 3104,
      "fulfills_required": false
    },
    {
      "name": "editor",
      "count": 3099,
      "fulfills_required": false
    },
    {
      "name": "db2",
      "count": 3093,
      "fulfills_required": false
    },
    {
      "name": "usb",
      "count": 3088,
      "fulfills_required": false
    },
    {
      "name": "jframe",
      "count": 3087,
      "fulfills_required": false
    },
    {
      "name": "cassandra",
      "count": 3084,
      "fulfills_required": false
    },
    {
      "name": "comments",
      "count": 3078,
      "fulfills_required": false
    },
    {
      "name": "tdd",
      "count": 3072,
      "fulfills_required": false
    },
    {
      "name": "mapping",
      "count": 3069,
      "fulfills_required": false
    },
    {
      "name": "pthreads",
      "count": 3065,
      "fulfills_required": false
    },
    {
      "name": "sharepoint-2007",
      "count": 3060,
      "fulfills_required": false
    },
    {
      "name": "go",
      "count": 3060,
      "fulfills_required": false
    },
    {
      "name": "pyqt",
      "count": 3058,
      "fulfills_required": false
    },
    {
      "name": "timestamp",
      "count": 3057,
      "fulfills_required": false
    },
    {
      "name": "height",
      "count": 3046,
      "fulfills_required": false
    },
    {
      "name": "uitabbarcontroller",
      "count": 3041,
      "fulfills_required": false
    },
    {
      "name": "registry",
      "count": 3037,
      "fulfills_required": false
    },
    {
      "name": "cmake",
      "count": 3032,
      "fulfills_required": false
    },
    {
      "name": "size",
      "count": 3031,
      "fulfills_required": false
    },
    {
      "name": "memcached",
      "count": 3026,
      "fulfills_required": false
    },
    {
      "name": "continuous-integration",
      "count": 3019,
      "fulfills_required": false
    },
    {
      "name": "odbc",
      "count": 3007,
      "fulfills_required": false
    },
    {
      "name": "socket.io",
      "count": 3007,
      "fulfills_required": false
    },
    {
      "name": "nested",
      "count": 3006,
      "fulfills_required": false
    },
    {
      "name": "microsoft",
      "count": 3005,
      "fulfills_required": false
    },
    {
      "name": "install",
      "count": 3002,
      "fulfills_required": false
    },
    {
      "name": "jersey",
      "count": 3000,
      "fulfills_required": false
    },
    {
      "name": "nsarray",
      "count": 2999,
      "fulfills_required": false
    },
    {
      "name": "devexpress",
      "count": 2986,
      "fulfills_required": false
    },
    {
      "name": "ejb",
      "count": 2983,
      "fulfills_required": false
    },
    {
      "name": "imagemagick",
      "count": 2981,
      "fulfills_required": false
    },
    {
      "name": "save",
      "count": 2981,
      "fulfills_required": false
    },
    {
      "name": "licensing",
      "count": 2977,
      "fulfills_required": false
    },
    {
      "name": "oauth-2.0",
      "count": 2973,
      "fulfills_required": false
    },
    {
      "name": "geometry",
      "count": 2967,
      "fulfills_required": false
    },
    {
      "name": "arguments",
      "count": 2963,
      "fulfills_required": false
    },
    {
      "name": "client-server",
      "count": 2963,
      "fulfills_required": false
    },
    {
      "name": "stack",
      "count": 2959,
      "fulfills_required": false
    },
    {
      "name": "ip",
      "count": 2956,
      "fulfills_required": false
    },
    {
      "name": "entity-framework-4.1",
      "count": 2951,
      "fulfills_required": false
    },
    {
      "name": "cross-domain",
      "count": 2943,
      "fulfills_required": false
    },
    {
      "name": "repository",
      "count": 2933,
      "fulfills_required": false
    },
    {
      "name": "windows-mobile",
      "count": 2927,
      "fulfills_required": false
    },
    {
      "name": "android-actionbar",
      "count": 2921,
      "fulfills_required": false
    },
    {
      "name": "tortoisesvn",
      "count": 2920,
      "fulfills_required": false
    },
    {
      "name": "queue",
      "count": 2916,
      "fulfills_required": false
    },
    {
      "name": "css-selectors",
      "count": 2912,
      "fulfills_required": false
    },
    {
      "name": "windows-xp",
      "count": 2906,
      "fulfills_required": false
    },
    {
      "name": "themes",
      "count": 2905,
      "fulfills_required": false
    },
    {
      "name": "sql-update",
      "count": 2903,
      "fulfills_required": false
    },
    {
      "name": "runtime",
      "count": 2902,
      "fulfills_required": false
    },
    {
      "name": "adobe",
      "count": 2897,
      "fulfills_required": false
    },
    {
      "name": "iphone-sdk-3.0",
      "count": 2892,
      "fulfills_required": false
    },
    {
      "name": "centos",
      "count": 2890,
      "fulfills_required": false
    },
    {
      "name": "pandas",
      "count": 2886,
      "fulfills_required": false
    },
    {
      "name": "lisp",
      "count": 2882,
      "fulfills_required": false
    },
    {
      "name": "zend-framework2",
      "count": 2882,
      "fulfills_required": false
    },
    {
      "name": "visual-studio-2005",
      "count": 2881,
      "fulfills_required": false
    },
    {
      "name": "many-to-many",
      "count": 2880,
      "fulfills_required": false
    },
    {
      "name": "sinatra",
      "count": 2875,
      "fulfills_required": false
    },
    {
      "name": "struts",
      "count": 2874,
      "fulfills_required": false
    },
    {
      "name": "entity-framework-5",
      "count": 2871,
      "fulfills_required": false
    },
    {
      "name": "directx",
      "count": 2869,
      "fulfills_required": false
    },
    {
      "name": "web-browser",
      "count": 2868,
      "fulfills_required": false
    },
    {
      "name": "html5-canvas",
      "count": 2866,
      "fulfills_required": false
    },
    {
      "name": "kernel",
      "count": 2858,
      "fulfills_required": false
    },
    {
      "name": "client",
      "count": 2852,
      "fulfills_required": false
    },
    {
      "name": "key",
      "count": 2849,
      "fulfills_required": false
    },
    {
      "name": "actionbarsherlock",
      "count": 2849,
      "fulfills_required": false
    },
    {
      "name": "in-app-purchase",
      "count": 2836,
      "fulfills_required": false
    },
    {
      "name": "textarea",
      "count": 2835,
      "fulfills_required": false
    },
    {
      "name": "scheme",
      "count": 2833,
      "fulfills_required": false
    },
    {
      "name": "arm",
      "count": 2825,
      "fulfills_required": false
    },
    {
      "name": "int",
      "count": 2820,
      "fulfills_required": false
    },
    {
      "name": "richfaces",
      "count": 2820,
      "fulfills_required": false
    },
    {
      "name": "linq-to-xml",
      "count": 2819,
      "fulfills_required": false
    },
    {
      "name": "export",
      "count": 2812,
      "fulfills_required": false
    },
    {
      "name": "compare",
      "count": 2805,
      "fulfills_required": false
    },
    {
      "name": "jpanel",
      "count": 2804,
      "fulfills_required": false
    },
    {
      "name": "html-parsing",
      "count": 2803,
      "fulfills_required": false
    },
    {
      "name": "broadcastreceiver",
      "count": 2799,
      "fulfills_required": false
    },
    {
      "name": "boolean",
      "count": 2798,
      "fulfills_required": false
    },
    {
      "name": "nunit",
      "count": 2792,
      "fulfills_required": false
    },
    {
      "name": "width",
      "count": 2792,
      "fulfills_required": false
    },
    {
      "name": "swt",
      "count": 2788,
      "fulfills_required": false
    },
    {
      "name": "64bit",
      "count": 2787,
      "fulfills_required": false
    },
    {
      "name": "c#-3.0",
      "count": 2786,
      "fulfills_required": false
    },
    {
      "name": "ssrs-2008",
      "count": 2784,
      "fulfills_required": false
    },
    {
      "name": "latex",
      "count": 2783,
      "fulfills_required": false
    },
    {
      "name": "polymorphism",
      "count": 2774,
      "fulfills_required": false
    },
    {
      "name": "alignment",
      "count": 2774,
      "fulfills_required": false
    },
    {
      "name": "flash-builder",
      "count": 2773,
      "fulfills_required": false
    },
    {
      "name": "certificate",
      "count": 2767,
      "fulfills_required": false
    },
    {
      "name": "video-streaming",
      "count": 2765,
      "fulfills_required": false
    },
    {
      "name": "profiling",
      "count": 2763,
      "fulfills_required": false
    },
    {
      "name": "django-views",
      "count": 2758,
      "fulfills_required": false
    },
    {
      "name": "ckeditor",
      "count": 2758,
      "fulfills_required": false
    },
    {
      "name": "views",
      "count": 2757,
      "fulfills_required": false
    },
    {
      "name": "salesforce",
      "count": 2750,
      "fulfills_required": false
    },
    {
      "name": "mongoid",
      "count": 2744,
      "fulfills_required": false
    },
    {
      "name": "facebook-javascript-sdk",
      "count": 2744,
      "fulfills_required": false
    },
    {
      "name": "xampp",
      "count": 2743,
      "fulfills_required": false
    },
    {
      "name": "asp.net-membership",
      "count": 2743,
      "fulfills_required": false
    },
    {
      "name": "awt",
      "count": 2738,
      "fulfills_required": false
    },
    {
      "name": "applescript",
      "count": 2729,
      "fulfills_required": false
    },
    {
      "name": "three.js",
      "count": 2727,
      "fulfills_required": false
    },
    {
      "name": "meteor",
      "count": 2725,
      "fulfills_required": false
    },
    {
      "name": "pdf-generation",
      "count": 2724,
      "fulfills_required": false
    },
    {
      "name": "rewrite",
      "count": 2720,
      "fulfills_required": false
    },
    {
      "name": "flask",
      "count": 2715,
      "fulfills_required": false
    },
    {
      "name": "progress-bar",
      "count": 2715,
      "fulfills_required": false
    },
    {
      "name": "jetty",
      "count": 2713,
      "fulfills_required": false
    },
    {
      "name": "associations",
      "count": 2713,
      "fulfills_required": false
    },
    {
      "name": "phpunit",
      "count": 2712,
      "fulfills_required": false
    },
    {
      "name": "jms",
      "count": 2700,
      "fulfills_required": false
    },
    {
      "name": "flex3",
      "count": 2698,
      "fulfills_required": false
    },
    {
      "name": "titanium",
      "count": 2693,
      "fulfills_required": false
    },
    {
      "name": "png",
      "count": 2689,
      "fulfills_required": false
    },
    {
      "name": "report",
      "count": 2685,
      "fulfills_required": false
    },
    {
      "name": "cucumber",
      "count": 2678,
      "fulfills_required": false
    },
    {
      "name": "duplicates",
      "count": 2673,
      "fulfills_required": false
    },
    {
      "name": "core-graphics",
      "count": 2672,
      "fulfills_required": false
    },
    {
      "name": "mathematica",
      "count": 2671,
      "fulfills_required": false
    },
    {
      "name": "sum",
      "count": 2667,
      "fulfills_required": false
    },
    {
      "name": "set",
      "count": 2662,
      "fulfills_required": false
    },
    {
      "name": "xml-schema",
      "count": 2658,
      "fulfills_required": false
    },
    {
      "name": "schema",
      "count": 2653,
      "fulfills_required": false
    },
    {
      "name": "cross-platform",
      "count": 2644,
      "fulfills_required": false
    },
    {
      "name": "return",
      "count": 2644,
      "fulfills_required": false
    },
    {
      "name": "websphere",
      "count": 2643,
      "fulfills_required": false
    },
    {
      "name": "mkmapview",
      "count": 2641,
      "fulfills_required": false
    },
    {
      "name": "authorization",
      "count": 2639,
      "fulfills_required": false
    },
    {
      "name": "mongoose",
      "count": 2639,
      "fulfills_required": false
    },
    {
      "name": "controls",
      "count": 2638,
      "fulfills_required": false
    },
    {
      "name": "core-animation",
      "count": 2638,
      "fulfills_required": false
    },
    {
      "name": "windows-phone",
      "count": 2634,
      "fulfills_required": false
    },
    {
      "name": "html-lists",
      "count": 2631,
      "fulfills_required": false
    },
    {
      "name": "pattern-matching",
      "count": 2630,
      "fulfills_required": false
    },
    {
      "name": "jstl",
      "count": 2628,
      "fulfills_required": false
    },
    {
      "name": "operators",
      "count": 2623,
      "fulfills_required": false
    },
    {
      "name": "entity",
      "count": 2615,
      "fulfills_required": false
    },
    {
      "name": "append",
      "count": 2614,
      "fulfills_required": false
    },
    {
      "name": "uml",
      "count": 2608,
      "fulfills_required": false
    },
    {
      "name": "iis-7.5",
      "count": 2607,
      "fulfills_required": false
    },
    {
      "name": "selenium-webdriver",
      "count": 2606,
      "fulfills_required": false
    },
    {
      "name": "control",
      "count": 2599,
      "fulfills_required": false
    },
    {
      "name": "magento-1.7",
      "count": 2599,
      "fulfills_required": false
    },
    {
      "name": "operator-overloading",
      "count": 2597,
      "fulfills_required": false
    },
    {
      "name": "requirejs",
      "count": 2597,
      "fulfills_required": false
    },
    {
      "name": "xmpp",
      "count": 2595,
      "fulfills_required": false
    },
    {
      "name": "hex",
      "count": 2594,
      "fulfills_required": false
    },
    {
      "name": "label",
      "count": 2592,
      "fulfills_required": false
    },
    {
      "name": "arduino",
      "count": 2591,
      "fulfills_required": false
    },
    {
      "name": "sass",
      "count": 2588,
      "fulfills_required": false
    },
    {
      "name": "ios7",
      "count": 2588,
      "fulfills_required": false
    },
    {
      "name": "cgi",
      "count": 2585,
      "fulfills_required": false
    },
    {
      "name": "windows-installer",
      "count": 2584,
      "fulfills_required": false
    },
    {
      "name": "neo4j",
      "count": 2578,
      "fulfills_required": false
    },
    {
      "name": "javafx-2",
      "count": 2575,
      "fulfills_required": false
    },
    {
      "name": "submit",
      "count": 2571,
      "fulfills_required": false
    },
    {
      "name": "persistence",
      "count": 2569,
      "fulfills_required": false
    },
    {
      "name": "couchdb",
      "count": 2565,
      "fulfills_required": false
    },
    {
      "name": "sql-server-ce",
      "count": 2564,
      "fulfills_required": false
    },
    {
      "name": "windows-store-apps",
      "count": 2563,
      "fulfills_required": false
    },
    {
      "name": "iis6",
      "count": 2559,
      "fulfills_required": false
    },
    {
      "name": "edittext",
      "count": 2557,
      "fulfills_required": false
    },
    {
      "name": "uilabel",
      "count": 2555,
      "fulfills_required": false
    },
    {
      "name": "ms-access-2007",
      "count": 2552,
      "fulfills_required": false
    },
    {
      "name": "preg-replace",
      "count": 2551,
      "fulfills_required": false
    },
    {
      "name": "package",
      "count": 2551,
      "fulfills_required": false
    },
    {
      "name": "logic",
      "count": 2534,
      "fulfills_required": false
    },
    {
      "name": "global-variables",
      "count": 2532,
      "fulfills_required": false
    },
    {
      "name": "domain-driven-design",
      "count": 2529,
      "fulfills_required": false
    },
    {
      "name": "workflow",
      "count": 2522,
      "fulfills_required": false
    },
    {
      "name": "rake",
      "count": 2516,
      "fulfills_required": false
    },
    {
      "name": "order",
      "count": 2514,
      "fulfills_required": false
    },
    {
      "name": "dynamics-crm-2011",
      "count": 2508,
      "fulfills_required": false
    },
    {
      "name": "android-viewpager",
      "count": 2508,
      "fulfills_required": false
    },
    {
      "name": "scipy",
      "count": 2501,
      "fulfills_required": false
    },
    {
      "name": "android-webview",
      "count": 2501,
      "fulfills_required": false
    },
    {
      "name": "refresh",
      "count": 2483,
      "fulfills_required": false
    },
    {
      "name": "compact-framework",
      "count": 2477,
      "fulfills_required": false
    },
    {
      "name": "datatables",
      "count": 2476,
      "fulfills_required": false
    },
    {
      "name": "monodroid",
      "count": 2474,
      "fulfills_required": false
    },
    {
      "name": "custom-controls",
      "count": 2470,
      "fulfills_required": false
    },
    {
      "name": "unity3d",
      "count": 2470,
      "fulfills_required": false
    },
    {
      "name": "form-validation",
      "count": 2469,
      "fulfills_required": false
    },
    {
      "name": "components",
      "count": 2463,
      "fulfills_required": false
    },
    {
      "name": "type-conversion",
      "count": 2456,
      "fulfills_required": false
    },
    {
      "name": "javafx",
      "count": 2454,
      "fulfills_required": false
    },
    {
      "name": "osgi",
      "count": 2452,
      "fulfills_required": false
    },
    {
      "name": "malloc",
      "count": 2445,
      "fulfills_required": false
    },
    {
      "name": "double",
      "count": 2444,
      "fulfills_required": false
    },
    {
      "name": "scrollbar",
      "count": 2443,
      "fulfills_required": false
    },
    {
      "name": "cakephp-2.0",
      "count": 2443,
      "fulfills_required": false
    },
    {
      "name": "ios-simulator",
      "count": 2442,
      "fulfills_required": false
    },
    {
      "name": "e-commerce",
      "count": 2440,
      "fulfills_required": false
    },
    {
      "name": "base64",
      "count": 2437,
      "fulfills_required": false
    },
    {
      "name": "http-post",
      "count": 2432,
      "fulfills_required": false
    },
    {
      "name": "file-download",
      "count": 2430,
      "fulfills_required": false
    },
    {
      "name": "textures",
      "count": 2428,
      "fulfills_required": false
    },
    {
      "name": "wordpress-theming",
      "count": 2427,
      "fulfills_required": false
    },
    {
      "name": "subquery",
      "count": 2412,
      "fulfills_required": false
    },
    {
      "name": "activex",
      "count": 2410,
      "fulfills_required": false
    },
    {
      "name": "switch-statement",
      "count": 2401,
      "fulfills_required": false
    },
    {
      "name": "data.frame",
      "count": 2401,
      "fulfills_required": false
    },
    {
      "name": "jsonp",
      "count": 2398,
      "fulfills_required": false
    },
    {
      "name": "tooltip",
      "count": 2395,
      "fulfills_required": false
    },
    {
      "name": "fortran",
      "count": 2394,
      "fulfills_required": false
    },
    {
      "name": "automatic-ref-counting",
      "count": 2393,
      "fulfills_required": false
    },
    {
      "name": "localhost",
      "count": 2390,
      "fulfills_required": false
    },
    {
      "name": "mingw",
      "count": 2378,
      "fulfills_required": false
    },
    {
      "name": "gae-datastore",
      "count": 2377,
      "fulfills_required": false
    },
    {
      "name": "web-scraping",
      "count": 2376,
      "fulfills_required": false
    },
    {
      "name": "vsto",
      "count": 2373,
      "fulfills_required": false
    },
    {
      "name": "screen",
      "count": 2371,
      "fulfills_required": false
    },
    {
      "name": "liferay",
      "count": 2368,
      "fulfills_required": false
    },
    {
      "name": "database-connection",
      "count": 2367,
      "fulfills_required": false
    },
    {
      "name": "rvm",
      "count": 2358,
      "fulfills_required": false
    },
    {
      "name": "cloud",
      "count": 2356,
      "fulfills_required": false
    },
    {
      "name": "elasticsearch",
      "count": 2350,
      "fulfills_required": false
    },
    {
      "name": "updatepanel",
      "count": 2348,
      "fulfills_required": false
    },
    {
      "name": "weblogic",
      "count": 2347,
      "fulfills_required": false
    },
    {
      "name": "preg-match",
      "count": 2345,
      "fulfills_required": false
    },
    {
      "name": "closures",
      "count": 2343,
      "fulfills_required": false
    },
    {
      "name": "2d",
      "count": 2343,
      "fulfills_required": false
    },
    {
      "name": "sql-order-by",
      "count": 2341,
      "fulfills_required": false
    },
    {
      "name": "media-player",
      "count": 2341,
      "fulfills_required": false
    },
    {
      "name": "nlp",
      "count": 2320,
      "fulfills_required": false
    },
    {
      "name": "google-play",
      "count": 2320,
      "fulfills_required": false
    },
    {
      "name": "rendering",
      "count": 2314,
      "fulfills_required": false
    },
    {
      "name": "jax-ws",
      "count": 2312,
      "fulfills_required": false
    },
    {
      "name": "debian",
      "count": 2311,
      "fulfills_required": false
    },
    {
      "name": "prototypejs",
      "count": 2310,
      "fulfills_required": false
    },
    {
      "name": "hudson",
      "count": 2309,
      "fulfills_required": false
    },
    {
      "name": "override",
      "count": 2302,
      "fulfills_required": false
    },
    {
      "name": "shared-libraries",
      "count": 2300,
      "fulfills_required": false
    },
    {
      "name": "hosting",
      "count": 2295,
      "fulfills_required": false
    },
    {
      "name": ".net-2.0",
      "count": 2292,
      "fulfills_required": false
    },
    {
      "name": "html5-video",
      "count": 2277,
      "fulfills_required": false
    },
    {
      "name": "orientation",
      "count": 2274,
      "fulfills_required": false
    },
    {
      "name": "eclipse-rcp",
      "count": 2273,
      "fulfills_required": false
    },
    {
      "name": "mp3",
      "count": 2264,
      "fulfills_required": false
    },
    {
      "name": "mootools",
      "count": 2257,
      "fulfills_required": false
    },
    {
      "name": "computer-vision",
      "count": 2254,
      "fulfills_required": false
    },
    {
      "name": "backup",
      "count": 2251,
      "fulfills_required": false
    },
    {
      "name": "character",
      "count": 2248,
      "fulfills_required": false
    },
    {
      "name": "google-drive-sdk",
      "count": 2248,
      "fulfills_required": false
    },
    {
      "name": "query-optimization",
      "count": 2245,
      "fulfills_required": false
    },
    {
      "name": "nsdate",
      "count": 2242,
      "fulfills_required": false
    },
    {
      "name": "classpath",
      "count": 2240,
      "fulfills_required": false
    },
    {
      "name": "osx-lion",
      "count": 2232,
      "fulfills_required": false
    },
    {
      "name": "signals",
      "count": 2228,
      "fulfills_required": false
    },
    {
      "name": "toggle",
      "count": 2223,
      "fulfills_required": false
    },
    {
      "name": "forms-authentication",
      "count": 2222,
      "fulfills_required": false
    },
    {
      "name": "paperclip",
      "count": 2215,
      "fulfills_required": false
    },
    {
      "name": "sql-server-2012",
      "count": 2214,
      "fulfills_required": false
    },
    {
      "name": "ruby-on-rails-4",
      "count": 2214,
      "fulfills_required": false
    },
    {
      "name": "hide",
      "count": 2207,
      "fulfills_required": false
    },
    {
      "name": "tomcat7",
      "count": 2207,
      "fulfills_required": false
    },
    {
      "name": "row",
      "count": 2201,
      "fulfills_required": false
    },
    {
      "name": "gallery",
      "count": 2192,
      "fulfills_required": false
    },
    {
      "name": "openid",
      "count": 2187,
      "fulfills_required": false
    },
    {
      "name": "branch",
      "count": 2187,
      "fulfills_required": false
    },
    {
      "name": "mobile-safari",
      "count": 2186,
      "fulfills_required": false
    },
    {
      "name": "asp.net-mvc-routing",
      "count": 2180,
      "fulfills_required": false
    },
    {
      "name": "wifi",
      "count": 2180,
      "fulfills_required": false
    },
    {
      "name": "joomla2.5",
      "count": 2176,
      "fulfills_required": false
    },
    {
      "name": "version",
      "count": 2174,
      "fulfills_required": false
    },
    {
      "name": "sql-server-2000",
      "count": 2173,
      "fulfills_required": false
    },
    {
      "name": "swf",
      "count": 2172,
      "fulfills_required": false
    },
    {
      "name": "settings",
      "count": 2167,
      "fulfills_required": false
    },
    {
      "name": "byte",
      "count": 2157,
      "fulfills_required": false
    },
    {
      "name": "webbrowser-control",
      "count": 2155,
      "fulfills_required": false
    },
    {
      "name": "relational-database",
      "count": 2154,
      "fulfills_required": false
    },
    {
      "name": "overflow",
      "count": 2153,
      "fulfills_required": false
    },
    {
      "name": "excel-2007",
      "count": 2151,
      "fulfills_required": false
    },
    {
      "name": "cxf",
      "count": 2147,
      "fulfills_required": false
    },
    {
      "name": "http-status-code-404",
      "count": 2147,
      "fulfills_required": false
    },
    {
      "name": "zoom",
      "count": 2146,
      "fulfills_required": false
    },
    {
      "name": "simplexml",
      "count": 2146,
      "fulfills_required": false
    },
    {
      "name": "raphael",
      "count": 2146,
      "fulfills_required": false
    },
    {
      "name": "uitextview",
      "count": 2145,
      "fulfills_required": false
    },
    {
      "name": "jackson",
      "count": 2144,
      "fulfills_required": false
    },
    {
      "name": "try-catch",
      "count": 2143,
      "fulfills_required": false
    },
    {
      "name": "mouse",
      "count": 2140,
      "fulfills_required": false
    }
]
},{}],6:[function(require,module,exports){
var factories = require('../app.js').factories;
var suggestedTagsFile = require('./1000SuggestedTags.json');

factories.factory('tagsFactory', function($http, $q) {
  var factory = {};

  factory.getSuggestedTags = function() {
    return factory.suggestedTags = suggestedTagsFile;
  };

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
},{"../app.js":1,"./1000SuggestedTags.json":5}]},{},[1,2,3,4,6])
;