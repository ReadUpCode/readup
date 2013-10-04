angular.module('readUp', ['ngRoute','readUp.factories', 'readUp.controllers','$strap.directives']);
var factories = angular.module('readUp.factories', []);
var controllers = angular.module('readUp.controllers', ['readUp.factories']);
var directives = angular.module('readUp.directives', []);

module.exports.controllers = controllers;
module.exports.directives = directives;
module.exports.factories = factories;
