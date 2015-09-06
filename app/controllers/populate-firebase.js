define([
  'angular',
  'angularRoute',
  'firebase'

], function(angular, route, firebase) {

  angular
  .module('AminoApp.addProtein', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/addProtein', {
      templateUrl: 'partials/addProtein.html',
      controller: 'addProteinCtrl',
      controllerAs: 'proteinCtrl'
    });
  }])

  .controller("addProteinCtrl", ['$firebaseArray',
    function($firebaseArray) {
      this.aminoAcid = {};
      this.sequence = "";
      var ref = new Firebase("https://aminos-anonymous.firebaseio.com/protein");
      this.protein = $firebaseArray(ref);
      this.addProtein = function() {
        arrayOfSequence = this.sequence.split("-");
        console.log("array", arrayOfSequence);
        monkey = "";
        console.log("name", this.monkey);
        this.protein.$add({
          monkey: arrayOfSequence,
        });
      };
    }
  ]);
});