define([
  "phaser",
  "angular",
  "bootstrap",
  "angularfire",
  "angularRoute",
  "angularFilter",
  "factories/uid",
  "controllers/auth",
  "controllers/welcome",
  "controllers/username",
  "controllers/gameCtrl",
  "controllers/populate-firebase"
], function(phaser, angular, bootstrap, angularfire, angularRoute, filter, uid, auth, welcome, username, gameCtrl, addProtein) {
  return angular.module("AminoApp", [
    "ngRoute",
    "firebase",
    "AminoApp.uid",
    "AminoApp.auth",
    "AminoApp.game",
    "angular.filter",
    "AminoApp.welcome",
    "AminoApp.username",
    "AminoApp.addProtein"
  ]).
  config(["$routeProvider", function($routeProvider) {
    $routeProvider.otherwise({redirectTo: "/"});
  }]);
});

