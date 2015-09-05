define([
	"angular",
	"angularRoute",
	"firebase",
	"bootstrap"
], function(angular, angularRoute, firebase, bootstrap) {
	angular.module("AminoApp.game", ["ngRoute"])
	.config(["$routeProvider", function($routeProvider) {
		$routeProvider.when("/", {
			templateUrl: "../templates/game.html",
			controller: "gameCtrl",
			controllerAs: "game"
		});
	}])
	.controller("gameCtrl", ["$firebaseArray", function($firebaseArray) {

		var ref = new Firebase("https://aminos-anonymous.firebaseio.com/game");

		var gameArray = $firebaseArray(ref);

		var game = new Phaser.Game(800, 600, Phaser.AUTO, "", { preload: preload, create: create, update: update });

		function preload() {

			game.load.image("background", "images/Cell_bg.png");
			game.load.image("player", "images/Ribosome.png");
			game.load.image("alanine", "images/Alanine.png");
			game.load.image("arginine", "images/Arginine.png");
			game.load.image("aspartic_acid", "images/Aspartic_acid.png");
			game.load.image("cysteine", "images/Cysteine.png");
			game.load.image("glutamic_acid", "images/Glutamic_acid.png");
			game.load.image("glutamine", "images/Glutamine.png");
			game.load.image("glycine", "images/Glycine.png");
			game.load.image("histidine", "images/Histidine.png");
			game.load.image("isoleucine", "images/Isoleucine.png");
			game.load.image("leucine", "images/Leucine.png");
			game.load.image("lysine", "images/Lysine.png");
			game.load.image("methionine", "images/Methionine.png");
			game.load.image("phenylalanine", "images/Phenylalanine.png");
			game.load.image("proline", "images/Proline.png");
			game.load.image("serine", "images/Serine.png");
			game.load.image("threonine", "images/Threonine.png");
			game.load.image("tryptophan", "images/Tryptophan.png");
			game.load.image("tyrosine", "images/Tyrosine.png");
			game.load.image("valine", "images/Valine.png");

		}

		var player;
		var cursors;
		var lives;
		var goodies;
		var baddies;
		var score = 0;
		var scoreText;
		var sidebar;
		var sidebarGroup;
		var sidebarArray = ["proline", "lysine", "proline"];
		var aminoArray = [
			"alanine",
			"arginine",
			"aspartic_acid",
			"cysteine",
			"glutamic_acid",
			"glutamine",
			"glycine",
			"histidine",
			"isoleucine",
			"leucine",
			"methionine",
			"phenylalanine",
			"proline",
			"serine",
			"threonine",
			"tryptophan",
			"tyrosine",
			"valine"
		];

		function create() {

			game.add.tileSprite(0, 0, 1200, 1200, "background");

			game.world.setBounds(0, 0, 1200, 1200);

			//  We"re going to be using physics, so enable the Arcade Physics system
			game.physics.startSystem(Phaser.Physics.ARCADE);


			// The player and its settings
			player = game.add.sprite(game.world.centerX, game.world.centerY, "player");
			player.anchor.setTo(0.5, 1); //so it flips around its middle

			//  We need to enable physics on the player
			game.physics.arcade.enable(player);

			//  Player physics properties. Give the little guy a slight bounce. 
			player.body.collideWorldBounds = true;
			//  Our two animations, walking left and right.

			//  Finally some goodies to collect
			goodies = game.add.group();

			baddies = game.add.group();

			sidebarGroup = game.add.group();


			//  We will enable physics for any goody that is created in this group
			goodies.enableBody = true;

			baddies.enableBody = true;

			//  Here we"ll create 12 of them evenly spaced apart
			for (var i = 0; i < 15; i++) {
				var randAmino = game.rnd.integerInRange(0, aminoArray.length);
				var theAmino = aminoArray[randAmino];

				//  Create a goody inside of the "goodies" group
				var goody = goodies.create(i * 70, 0, theAmino);
				goody.anchor.setTo(0.5, 1); //so it flips around its middle

				goody.body.velocity.set(game.rnd.integerInRange(-400, 400), game.rnd.integerInRange(-400, 400), "spinner");

				goody.body.collideWorldBounds = true;

				goody.body.bounce.y = 0.5 + Math.random() * 0.6;
				goody.body.bounce.x = 0.6 + Math.random() * 0.6;

			}

			for (var j = 0; j < 5; j++) {

				var baddy = baddies.create(j * 80, 0, "lysine");
				baddy.anchor.setTo(0.5, 1); //so it flips around its middle

				baddy.body.velocity.set(game.rnd.integerInRange(-400, 400), game.rnd.integerInRange(-400, 400), "spinner");

				baddy.body.collideWorldBounds = true;

				baddy.body.bounce.y = 0.6 + Math.random() * 0.6;
				baddy.body.bounce.x = 0.6 + Math.random() * 0.6;
			}

			//  The score
			scoreText = game.add.text(16, 16, "score: 0", { fontSize: "32px", fill: "#000" });

			//  Our controls.
			cursors = game.input.keyboard.createCursorKeys();

			game.camera.follow(player);

			for (var k = 0; k < 3; k++) {
				var sidebar = sidebarGroup.create(10 + (30 * k), 10, sidebarArray[k]);
				sidebar.fixedToCamera = true;
			}

		}

		function update() {
			game.physics.arcade.collide(goodies, goodies);
			game.physics.arcade.collide(baddies, baddies);
			game.physics.arcade.collide(goodies, baddies);

			//  Checks to see if the player overlaps with any of the goodies, if he does call the collectGoodie function
			game.physics.arcade.overlap(player, goodies, collectGoodie, null, this);
			game.physics.arcade.overlap(player, baddies, collectBaddie, null, this);

			//  Reset the players velocity (movement)
			player.body.velocity.x = 0;
			player.body.velocity.y = 0;


			if (cursors.left.isDown) {
				player.body.velocity.x = -300;
				player.scale.x = -1;
			} else if (cursors.right.isDown) {
				player.body.velocity.x = 300;
				player.scale.x = 1;
			}

			if (cursors.up.isDown) {
				player.body.velocity.y = -300;
			} else if (cursors.down.isDown) {
				player.body.velocity.y = 300;
			}

			for (var m = 0; m < goodies.children.length; m++) {
				if(goodies.children[m].body.velocity.x > 0) {
					goodies.children[m].scale.x = 1;
				} else if(goodies.children[m].body.velocity.x < 0) { 
					goodies.children[m].scale.x = -1;
				}
			}

			for (var l = 0; l < baddies.children.length; l++) {
				if(baddies.children[l].body.velocity.x > 0) {
					baddies.children[l].scale.x = 1;
				} else if(baddies.children[l].body.velocity.x < 0) { 
					baddies.children[l].scale.x = -1;
				}
			}

		}

		function collectGoodie (player, item) {
			// Removes the item from the screen
			item.kill();
			if (sidebarArray[0] === "proline") {
				sidebarArray.splice(0, 1);
				console.log(sidebarArray);
			}
		}

		function collectBaddie (player, item) {
			item.kill();
			player.kill();
		}

		function render() {
			game.debug.cameraInfo(game.camera, 32, 32);
			game.debug.spriteCoords(player, 32, 500);
		}

	}]);
});