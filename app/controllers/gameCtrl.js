define([
	"angular",
	"angularRoute",
	"firebase",
	"bootstrap"
], function(angular, angularRoute, firebase, bootstrap) {
		angular.module("AminoApp.game", ['ngRoute'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider
			.when('/', {
				templateUrl: '../templates/game.html',
				controller: 'gameCtrl'
			});
		}])
		.controller("gameCtrl", ["$firebaseArray",
			function($firebaseArray) {

				var ref = new Firebase("https://aminos-anonymous.firebaseio.com/game");

				var gameArray = $firebaseArray(ref);

				var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameTarget', { preload: preload, create: create, update: update });

				function preload () {

				}

				function create () {

				}

				function update () {
					
				}
			}]);
});