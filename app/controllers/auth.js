define([
  "angular",
  "firebase",
  "angularRoute"
], function(angular, route, firebase) {
  angular
  .module("AminoApp.auth", ["ngRoute"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/", {
      templateUrl: "partials/auth.html",
      controller: "authCtrl",
      controllerAs: "auth"
    });
  }])
  .controller("authCtrl", ["$firebaseAuth", "$firebaseArray",
    function($firebaseAuth, $firebaseArray) {
      this.loginHidden = false;
      this.usernameHidden = true;
      this.welcomeHidden = true;
      var authRef = new Firebase("https://aminos-anonymous.firebaseio.com/");
      var userRef = new Firebase("https://aminos-anonymous.firebaseio.com/users/");
      var usersArr = $firebaseArray(userRef);
      var currentUID = "";

      this.signUp = function() {
        authRef.createUser({
          email: this.email,
          password : this.password
        }, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
            this.login();
          }
        });
      };


      this.logIn = function() {
        authRef.authWithPassword({
          email: this.email,
          password: this.password
        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
            this.email = "";
            this.password = "";
            currentUID = authData.uid;
            for (var i = 0; i < usersArr.length; i++) {
              if(usersArr[i].uid === currentUID) {
                this.username = usersArr[i].username;
                this.loginHidden = true;
                this.welcomeHidden = false;
                break;
              } else {
                this.loginHidden = true;
                this.usernameHidden = false;
              }
            }
          }
        }, {
          remember: "sessionOnly"
        });
      };
      
      this.serviceAuth = function(service) {
        authRef.authWithOAuthPopup(service, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
            currentUID = authData.uid;
            for (var j = 0; j < usersArr.length; j++) {
              if(usersArr[j].uid === currentUID) {
                this.username = usersArr[j].username;
                this.loginHidden = true;
                this.welcomeHidden = false;
                break;
              } else {
                this.loginHidden = true;
                this.usernameHidden = false;
              }
            }
          }
        }, {
          remember: "sessionOnly"
        });
      };

      this.checkAvail = function(choosing) {
        var usernameAvailable = false;
        for (var k = 0; k < usersArr.length; k++) {
          if(usersArr[k].username === this.username) {
            usernameAvailable = false;
            alert("I'm sorry, the username " + this.username + " is taken.");
            break;
          } else {
            usernameAvailable = true;
          }
        }
        if(usernameAvailable && choosing) {
          this.newUsername();
        } else if (usernameAvailable) {
          alert(this.username + " is available!");
        }
      };

      this.newUsername = function() {
        userRef.$add({
          uid: currentUID,
          username: this.username
        });
        this.usernameHidden = true;
        this.welcomeHidden = false;
      };

      this.play = function() {
        window.location = "#/game/";
      };

    }
  ]);
});