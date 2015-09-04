define([
  "phaser",
  "angular",
  "bootstrap",
  "angularfire",
  "angularRoute",
  "angularFilter",
  "controllers/gameCtrl"
], function(phaser, angular, bootstrap, angularfire, angularRoute, filter, gameCtrl) {
  return angular.module("AminoApp", [
    "ngRoute",
    "firebase",
    "angular.filter",
    "AminoApp.game"
  ]).
  config(["$routeProvider", function($routeProvider) {
    $routeProvider.otherwise({redirectTo: "/"});
  }]);
});

