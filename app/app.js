define([
  "phaser",
  "angular",
  "bootstrap",
  "angularfire",
  "angularRoute",
  "angularFilter",
  "controllers/gameCtrl",
  "controllers/populate-firebase"
], function(phaser, angular, bootstrap, angularfire, angularRoute, filter, gameCtrl, addProtein) {
  return angular.module("AminoApp", [
    "ngRoute",
    "firebase",
    "angular.filter",
    "AminoApp.game",
    "AminoApp.addProtein"
  ]).
  config(["$routeProvider", function($routeProvider) {
    $routeProvider.otherwise({redirectTo: "/"});
  }]);
});

