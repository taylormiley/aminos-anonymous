define([
  "phaser",
  "angular",
  "bootstrap",
  "angularfire",
  "angularRoute",
  "angularFilter",
  "controllers/auth",
  "controllers/gameCtrl",
  "controllers/populate-firebase"
], function(phaser, angular, bootstrap, angularfire, angularRoute, filter, auth, gameCtrl, addProtein) {
  return angular.module("AminoApp", [
    "ngRoute",
    "firebase",
    "AminoApp.auth",
    "AminoApp.game",
    "angular.filter",
    "AminoApp.addProtein"
  ]).
  config(["$routeProvider", function($routeProvider) {
    $routeProvider.otherwise({redirectTo: "/"});
  }]);
});

