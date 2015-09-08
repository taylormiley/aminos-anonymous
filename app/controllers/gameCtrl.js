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
				controller: 'gameCtrl',
				controllerAs: 'game'
			});
		}])
		.controller("gameCtrl", ["$firebaseArray",
			function($firebaseArray) {

				var ref = new Firebase("https://aminos-anonymous.firebaseio.com/game");

				var gameArray = $firebaseArray(ref);

				var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

        function preload() {

          game.load.image('sky', 'images/sky.png');
          //game.load.image('ground', 'images/platform.png');
          game.load.image('star', 'images/star.png');
			    game.load.spritesheet('dude', 'images/dude.png', 32, 48);
			    game.load.image('diamond', 'images/diamond.png');

        }

					var player;
					var platforms;
					var cursors;
					var lives;
					var frenemies;
					var score = 0;
					var scoreText;
					var sidebar;
					var sidebarArray = new Array("star", "diamond", "star")
					var sidebarIcons;

				function create() {

			    game.add.tileSprite(0, 0, 1920, 1920, 'sky');

			    game.world.setBounds(0, 0, 1200, 1200);

			    //  We're going to be using physics, so enable the Arcade Physics system
			    game.physics.startSystem(Phaser.Physics.ARCADE);

			    //  A simple background for our game
			    game.add.sprite(game.world.centerX, game.world.centerY, 'sky');

			    //  The platforms group contains the ground and the 2 ledges we can jump on
			    //platforms = game.add.group();

			    //  We will enable physics for any object that is created in this group
			    //platforms.enableBody = true;

			    // Here we create the ground.
			    //var ground = platforms.create(0, game.world.centerY - 64, 'ground');

			    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
			    //ground.scale.setTo(2, 2);

			    //  This stops it from falling away when you jump on it
			    //ground.body.immovable = true;

			    //  Now let's create two ledges
			    //var ledge = platforms.create(400, 400, 'ground');
			    //ledge.body.immovable = true;

			    // ledge = platforms.create(-150, 250, 'ground');
			    // ledge.body.immovable = true;

			    // The player and its settings
			    player = game.add.sprite(game.world.centerX, game.world.centerY, 'dude');

			    //  We need to enable physics on the player
			    game.physics.arcade.enable(player);

			    //  Player physics properties. Give the little guy a slight bounce. 
			    player.body.collideWorldBounds = true;
			    //  Our two animations, walking left and right.
			    player.animations.add('left', [0, 1, 2, 3], 10, true);
			    player.animations.add('right', [5, 6, 7, 8], 10, true);

			    //  Finally some frenemies to collect
			    frenemies = game.add.group();

			    diamonds = game.add.group();

			    sidebarIcons = game.add.group();




			    //  We will enable physics for any star that is created in this group
			    frenemies.enableBody = true;

			    diamonds.enableBody = true;

			    //  Here we'll create 12 of them evenly spaced apart
			    for (var i = 0; i < 10; i++) {

		        //  Create a star inside of the 'frenemies' group
		        var star = frenemies.create(i * 70, 0, 'star');
		        star.friendly = true;

		        star.body.velocity.set(game.rnd.integerInRange(-400, 400), game.rnd.integerInRange(-200, 200), 'spinner');

		        star.body.collideWorldBounds = true;

		        //star.body.velocity.x = 0.7 + Math.random() * 100;
		        //star.body.velocity.y = 0.7 + Math.random() * 100;

		        //  Let gravity do its thing
		        //star.body.gravity.y = 300;

		        //  This just gives each star a slightly random bounce value
		        star.body.bounce.y = 0.7 + Math.random() * 0.5;
		        star.body.bounce.x = 0.7 + Math.random() * 0.5;
		        console.log(star);

			    }

			    for (var i = 0; i < 10; i++) {
			      var diamond = frenemies.create(i * 80, 0, 'diamond');

			      diamond.body.velocity.set(game.rnd.integerInRange(-300, 300), game.rnd.integerInRange(-200, 200), 'spinner');

			      diamond.body.collideWorldBounds = true;

			      //diamond.body.velocity.x = 0.7 + Math.random() * 0.5;
			      //diamond.body.velocity.y = 0.7 + Math.random() * 0.5;
			      //diamond.body.gravity.y = 300;
			      diamond.body.bounce.y = 0.7 + Math.random() * 0.5;
			      diamond.body.bounce.x = 0.7 + Math.random() * 0.5;
			    }

			    //  The score
			    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

			    //  Our controls.
			    cursors = game.input.keyboard.createCursorKeys();

			    game.camera.follow(player);

          for (var i = 0; i < 3; i++) {
				    var sidebarIcon = sidebarIcons.create(10 + (30 * i), 10, sidebarArray[i]);
				    sidebarIcons.fixedToCamera = true;
				  }
				  console.log(sidebarIcons);

			 //    for (var i = 0; i < 3; i++) 
    // {
    //     var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
    //     ship.anchor.setTo(0.5, 0.5);
    //     ship.angle = 90;
    //     ship.alpha = 0.4;
    // }
			    
			  }

				function update() {
			    //  Collide the player and the frenemies with the platforms
			    //game.physics.arcade.collide(player, platforms);
			    //game.physics.arcade.collide(frenemies, platforms);
			    //game.physics.arcade.collide(diamonds, platforms);
			    game.physics.arcade.collide(frenemies, frenemies);

			    //  Checks to see if the player overlaps with any of the frenemies, if he does call the collectStar function
			    game.physics.arcade.overlap(player, frenemies, checkFrenemy, null, this);
			    //  Reset the players velocity (movement)
			    player.body.velocity.x = 0;
			    player.body.velocity.y = 0;

			    
			    if (cursors.left.isDown) {
			      player.body.velocity.x = -300;
			      player.animations.play('left');
			    } 
			    else if (cursors.right.isDown) {
			      player.body.velocity.x = 300;
			      player.animations.play('right');
			    }
			    else {
			      //  Stand still
			      player.animations.stop();

			      player.frame = 4;
			    } 

			    if (cursors.up.isDown) {
			      player.body.velocity.y = -150;
			    }
			    else if (cursors.down.isDown)
			    {
			      player.body.velocity.y = 150;
			    }
				    
				}

        function checkFrenemy (player, frenemy) {
			    // Removes the star from the screen
			    if (sidebarArray[0] === frenemy.key) {
            goodFrenemy(player, frenemy);
			    } else {
			    	badFrenemy(player, frenemy);
			    }
        }

        function goodFrenemy (player, frenemy) {
          sidebarArray.splice(0, 1);
          console.log(sidebarArray);
          frenemy.kill();
		      sidebarIcons.remove(sidebarIcons.children[0], true, true);
        }

        function badFrenemy (player, frenemy) {
          player.kill();
        }


        function render() {
			    game.debug.cameraInfo(game.camera, 32, 32);
			    game.debug.spriteCoords(player, 32, 500);

        }

			}]);
});