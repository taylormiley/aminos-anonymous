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
      var ref = new Firebase("https://aminos-anonymous.firebaseio.com/protein");
      this.protein = $firebaseArray(ref);
      this.addProtein = function() {
        this.protein.$add({
          insulin: {
            aa1: this.aminoAcid.aa1 || null,
            aa2: this.aminoAcid.aa3 || null,
            aa3: this.aminoAcid.aa3 || null,
            aa4: this.aminoAcid.aa4 || null,
            aa5: this.aminoAcid.aa5 || null,
            aa6: this.aminoAcid.aa6 || null,
            aa7: this.aminoAcid.aa7 || null,
            aa8: this.aminoAcid.aa8 || null,
            aa9: this.aminoAcid.aa9 || null,
            aa10: this.aminoAcid.aa10 || null,
            aa11: this.aminoAcid.aa11 || null,
            aa12: this.aminoAcid.aa12 || null,
            aa13: this.aminoAcid.aa13 || null,
            aa14: this.aminoAcid.aa14 || null,
            aa15: this.aminoAcid.aa15 || null,
            aa16: this.aminoAcid.aa16 || null,
            aa17: this.aminoAcid.aa17 || null,
            aa18: this.aminoAcid.aa18 || null,
            aa19: this.aminoAcid.aa19 || null,
            aa20: this.aminoAcid.aa20 || null,
            aa21: this.aminoAcid.aa21 || null,
            aa22: this.aminoAcid.aa22 || null,
            aa23: this.aminoAcid.aa23 || null,
            aa24: this.aminoAcid.aa24 || null,
            aa25: this.aminoAcid.aa25 || null,
            aa26: this.aminoAcid.aa26 || null,
            aa27: this.aminoAcid.aa27 || null,
            aa28: this.aminoAcid.aa28 || null,
            aa29: this.aminoAcid.aa29 || null,
            aa30: this.aminoAcid.aa30 || null,
            aa31: this.aminoAcid.aa31 || null,
            aa32: this.aminoAcid.aa32 || null,
            aa33: this.aminoAcid.aa33 || null,
            aa34: this.aminoAcid.aa34 || null,
            aa35: this.aminoAcid.aa35 || null,
            aa36: this.aminoAcid.aa36 || null,
            aa37: this.aminoAcid.aa37 || null,
            aa38: this.aminoAcid.aa38 || null,
            aa39: this.aminoAcid.aa39 || null,
            aa40: this.aminoAcid.aa40 || null,
            aa41: this.aminoAcid.aa41 || null,
            aa42: this.aminoAcid.aa42 || null,
            aa43: this.aminoAcid.aa43 || null,
            aa44: this.aminoAcid.aa44 || null,
            aa45: this.aminoAcid.aa45 || null,
            aa46: this.aminoAcid.aa46 || null,
            aa47: this.aminoAcid.aa47 || null,
            aa48: this.aminoAcid.aa48 || null,
            aa49: this.aminoAcid.aa49 || null,
            aa50: this.aminoAcid.aa50 || null,
            aa51: this.aminoAcid.aa51 || null,
            aa52: this.aminoAcid.aa52 || null,
            aa53: this.aminoAcid.aa53 || null,
            aa54: this.aminoAcid.aa54 || null,
            aa55: this.aminoAcid.aa55 || null,
            aa56: this.aminoAcid.aa56 || null,
            aa57: this.aminoAcid.aa57 || null,
            aa58: this.aminoAcid.aa58 || null,
            aa59: this.aminoAcid.aa59 || null,
            aa60: this.aminoAcid.aa60 || null,
            aa61: this.aminoAcid.aa61 || null,
            aa62: this.aminoAcid.aa62 || null,
            aa63: this.aminoAcid.aa63 || null,
            aa64: this.aminoAcid.aa64 || null,
            aa65: this.aminoAcid.aa65 || null,
            aa66: this.aminoAcid.aa66 || null,
            aa67: this.aminoAcid.aa67 || null,
            aa68: this.aminoAcid.aa68 || null,
            aa69: this.aminoAcid.aa69 || null,
            aa70: this.aminoAcid.aa70 || null,
            aa71: this.aminoAcid.aa71 || null,
            aa72: this.aminoAcid.aa72 || null,
            aa73: this.aminoAcid.aa73 || null,
            aa74: this.aminoAcid.aa74 || null,
            aa75: this.aminoAcid.aa75 || null
          }
        });
      };
    }
  ]);
});