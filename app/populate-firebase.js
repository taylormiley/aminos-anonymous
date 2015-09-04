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
      controllerAs: 'protein'
    });
  }])




  .controller("addProteinCtrl", ['$firebaseArray',
    function($firebaseArray) {
      var ref = new Firebase("https://aminos-anonymous.firebaseio.com/");
      this.protein.sequence = $firebaseArray(ref);
      this.addProtein = function() {
        $scope.protein.sequence$add({
          aa1: $scope.newSequence.name,
          aa2: $scope.newSequence.name,
          aa3: $scope.newSequence.name,
          aa4: $scope.newSequence.name,
          aa5: $scope.newSequence.name,
          aa6: $scope.newSequence.name,
          aa7: $scope.newSequence.name,
          aa8: $scope.newSequence.name,
          aa9: $scope.newSequence.name,
          aa10: $scope.newSequence.name,
          aa11: $scope.newSequence.name,
          aa12: $scope.newSequence.name

        });
      };

    }
  ]);
});