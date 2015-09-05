define([
  "phaser",
  "angular",
  "bootstrap",
  "angularfire",
  "angularRoute",
  "angularFilter",
  "controllers/add",
  "controllers/gameCtrl",
  "controllers/populate-firebase"
], function(phaser, angular, bootstrap, angularfire, angularRoute, filter, add, gameCtrl, addProtein) {
  return angular.module("AminoApp", [
    "ngRoute",
    "firebase",
    "AminoApp.add",
    "AminoApp.game",
    "angular.filter",
    "AminoApp.addProtein"
  ]).
  config(["$routeProvider", function($routeProvider) {
    $routeProvider.otherwise({redirectTo: "/"});
  }]);
});

