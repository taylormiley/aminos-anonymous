// define([
//   'angular',
//   'angularRoute',
//   'firebase'

// ], function(angular, route, firebase) {

//   angular
//   .module('AminoApp.addProtein', ['ngRoute'])
//   .config(['$routeProvider', function($routeProvider) {
//     $routeProvider.when('/addProtein', {
//       templateUrl: 'partials/addProtein.html',
//       controller: 'addProteinCtrl',
//       controllerAs: 'proteinCtrl'
//     });
//   }])

//   .controller("addProteinCtrl", ['$firebaseArray', "$routeParams",
//     function($firebaseArray, $routeParams) {
//       this.gameProtein = [];
//       this. = "";
//       this.gameProtein = function() {
//         console.log("click");
//         var ref = new Firebase("https://aminos-anonymous.firebaseio.com/protein");
//         this.gameProtein = $firebaseArray(ref);
//         console.log("this.protein", this.gameProtein);
//         });
//       };
//     }
//   ]);
// });