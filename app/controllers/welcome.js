define([
  "angular",
  "firebase",
  "angularRoute"
], function(angular, firebase, route) {
  angular
  .module("AminoApp.welcome", ["ngRoute"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/welcome", {
      templateUrl: "partials/welcome.html",
      controller: "welcomeCtrl",
      controllerAs: "welcome"
    });
  }])
  .controller("welcomeCtrl", ["$firebaseAuth", "$firebaseArray", "uid",
    function($firebaseAuth, $firebaseArray, uid) {
      var userRef = new Firebase("https://aminos-anonymous.firebaseio.com/users/");
      var usersArr = $firebaseArray(userRef);
      var currentUID = uid.getUid();

      usersArr.$loaded().then(angular.bind(this, function(data){
        for(var i = 0; i < data.length; i++) {
          console.log("Ding");
          if(data[i].uid === currentUID) {
            this.username = data[i].username;
          } 
        }
      }));

      this.play = function() {
        window.location = "#/game/";
      };

    }
  ]);
});