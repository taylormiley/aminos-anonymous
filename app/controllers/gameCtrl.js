define([
	"angular",
	"angularRoute",
	"firebase",
	"bootstrap"
], function(angular, angularRoute, firebase, bootstrap) {
	angular.module("AminoApp.game", ["ngRoute"])
	.config(["$routeProvider", function($routeProvider) {
		$routeProvider.when("/game", {
			templateUrl: "../partials/game.html",
			controller: "gameCtrl",
			controllerAs: "game"
		});
	}])
	.controller("gameCtrl", ["$firebaseArray", function($firebaseArray) {

		// var ref = new Firebase("https://aminos-anonymous.firebaseio.com/game");

		// var gameArray = $firebaseArray(ref);

		var game = new Phaser.Game(800, 600, Phaser.AUTO, "gameTarget", { preload: preload, create: create, update: update });

		function preload() {

			game.load.audio('titletrk', ['assets/titleTrack.wav']);
			game.load.audio('hitReact', ['assets/hitReaction.wav']);
			game.load.image("background", "images/Cell_bg.png");
			game.load.image("player", "images/Ribosome.png");
			game.load.spritesheet("alanine", "images/Alanine.png", 60, 59);
			game.load.spritesheet("arginine", "images/Arginine.png", 60, 52);
			game.load.spritesheet("asparagine", "images/Asparagine.png", 26, 60);
			game.load.spritesheet("aspartic_acid", "images/Aspartic_acid.png", 60, 58);
			game.load.spritesheet("cysteine", "images/Cysteine.png", 60, 59);
			game.load.spritesheet("glutamic_acid", "images/Glutamic_acid.png", 30, 60);
			game.load.spritesheet("glutamine", "images/Glutamine.png", 60, 44);
			game.load.spritesheet("glycine", "images/Glycine.png", 60, 57);
			game.load.spritesheet("histidine", "images/Histidine.png", 59, 60);
			game.load.spritesheet("isoleucine", "images/Isoleucine.png", 60, 59);
			game.load.spritesheet("leucine", "images/Leucine.png", 59, 60);
			game.load.spritesheet("lysine", "images/Lysine.png", 60, 44);
			game.load.spritesheet("methionine", "images/Methionine.png", 43, 60);
			game.load.spritesheet("phenylalanine", "images/Phenylalanine.png", 60, 60);
			game.load.spritesheet("proline", "images/Proline.png", 60, 48);
			game.load.spritesheet("serine", "images/Serine.png", 39, 60);
			game.load.spritesheet("threonine", "images/Threonine.png", 56, 60);
			game.load.spritesheet("tryptophan", "images/Tryptophan.png", 60, 31);
			game.load.spritesheet("tyrosine", "images/Tyrosine.png", 60, 38);
			game.load.spritesheet("valine", "images/Valine.png", 60, 60);

		}

		var player;
		var cursors;
		var music;
		var hitReact;
		var frenemies;
		var baddies;
		var score = 0;
		var sidebar;
		var sidebarIcons;
		var sidebarArray = ["proline", "lysine", "glycine", "leucine", "valine", "glutamine"];
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
			"lysine",
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

	    music = game.add.audio('titletrk');
	    music.loop = true;
	    music.play();
	    
			hitReact = game.add.audio('hitReact');

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

			//  Finally some frenemies to collect
			frenemies = game.add.group();

			sidebarIcons = game.add.group();


			//  We will enable physics for any frenemy that is created in this group
			frenemies.enableBody = true;


			for (var i = 0; i < 20; i++) {
				var theAmino = game.rnd.pick(sidebarArray);

				//  Create a frenemy inside of the "frenemies" group
				var frenemyX = 201;
				var frenemyY = 301;
				while((frenemyX > 200 && frenemyX < 1000) && (frenemyY > 300 && frenemyY < 900)) {
					frenemyX = game.rnd.integerInRange(0, 1200);
					frenemyY = game.rnd.integerInRange(0, 1200);
				}
				var frenemy = frenemies.create(frenemyX, frenemyY, theAmino);
				frenemy.anchor.setTo(0.5, 0.5); //so it flips around its middle
				frenemy.rotation = game.rnd.realInRange(-0.2, 0.2);

				frenemy.body.velocity.set(game.rnd.integerInRange(-300, 300), game.rnd.integerInRange(-300, 300), "spinner");

				frenemy.body.collideWorldBounds = true;

				frenemy.body.bounce.y = 0.6 + Math.random() * 0.35;
				frenemy.body.bounce.x = 0.6 + Math.random() * 0.35;

			}

			//  Our controls.
			cursors = game.input.keyboard.createCursorKeys();

			game.camera.follow(player);

			for (var k = 0; k < sidebarArray.length; k++) {
				var sidebar = sidebarIcons.create(10 + (65 * k), 10, sidebarArray[k]);
				sidebar.fixedToCamera = true;
				console.log(sidebarIcons);
				if (k > 1) {
            sidebarIcons.children[k].alpha = 0;
				}
				if (k === 1) {
					sidebarIcons.children[k].scale.x = 0.7;
					sidebarIcons.children[k].scale.y = 0.7;
				}
				console.log(sidebarIcons.children[k]);
				console.log(sidebarIcons.children[k].alpha);
			}
			console.log(sidebarIcons);

		}

		function update() {
			game.physics.arcade.collide(frenemies, frenemies, rotateBoth, null, this);

			//  Checks to see if the player overlaps with any of the frenemies, if he does call the collectGoodie function
			game.physics.arcade.overlap(player, frenemies, checkFrenemy, null, this);

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

      function checkFrenemy (player, frenemy) {
		    // if (sidebarArray[sidebarArray.length] === frenemy.key) { // right-to-left sidebar
		    if (sidebarArray[0] === frenemy.key) { // left-to-right sidebar
          goodFrenemy(player, frenemy);
		    } else {
		    	badFrenemy(player, frenemy);
		    	hitReact.play();
		    }
      }

      function goodFrenemy (player, frenemy) {
        // sidebarArray.splice(sidebarArray.length-1, 1); // right-to-left sidebar
        sidebarArray.splice(0, 1); // left-to-right sidebar
        console.log(sidebarArray);
        frenemy.kill();
	      // sidebarIcons.remove(sidebarIcons.children[sidebarArray.length], true, true); // right-to-left sidebar
	      sidebarIcons.removeAll(); // left-to-right sidebar
	      for (var m = 0; m < sidebarArray.length; m++) {
				  var sidebar = sidebarIcons.create(10 + (65 * m), 10, sidebarArray[m]);
				  sidebar.fixedToCamera = true;
				  if (m > 1) {
            sidebarIcons.children[m].alpha = 0;
				  }
				  if (m === 1) {
					sidebarIcons.children[m].scale.x = 0.7;
					sidebarIcons.children[m].scale.y = 0.7;
				}
				  console.log(sidebarIcons);
			  }
			  
      }

      function badFrenemy (player, frenemy) {
        player.kill();
        
      }

			function rotateBoth(item1, item2) {
				item1.rotation = game.rnd.realInRange(-0.2, 0.2);
				item2.rotation = game.rnd.realInRange(-0.2, 0.2);
			}

			for (var l = 0; l < frenemies.children.length; l++) {
				if(Math.abs(frenemies.children[l].body.velocity.x) < 40 || Math.abs(frenemies.children[l].body.velocity.y) < 40) {
					frenemies.children[l].body.velocity.set(game.rnd.integerInRange(-300, 300), game.rnd.integerInRange(-300, 300), "spinner");
				}
				if(frenemies.children[l].body.velocity.x > 0) {
					frenemies.children[l].frame = 1;
				} else if(frenemies.children[l].body.velocity.x < 0) { 
					frenemies.children[l].frame = 0;
				}
			}
			
			function render() {
				game.debug.cameraInfo(game.camera, 32, 32);
				game.debug.spriteCoords(player, 32, 500);
			}

		}
	}]);
});