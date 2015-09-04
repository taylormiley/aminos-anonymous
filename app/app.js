define([
  "phaser",
  "angular",
  "bootstrap",
  "angularfire",
  "angularRoute",
  "angularFilter"
], function(phaser, angular, bootstrap, angularfire, angularRoute, filter) {
  return angular.module("AminoApp", [
    "ngRoute",
    "firebase",
    "angular.filter"
  ]).
  config(["$routeProvider", function($routeProvider) {
    $routeProvider.otherwise({redirectTo: "/"});
  }]);
});

