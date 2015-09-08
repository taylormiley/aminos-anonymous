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

      console.log(usersArr);
      for(var i = 0; i < usersArr.length; i++) {
        console.log("Ding");
        if(usersArr[i].uid === currentUID) {
          this.username = usersArr[i].username;
        } 
      }

      this.play = function() {
        window.location = "#/game/";
      };

    }
  ]);
});