'use strict';

/**
 * @ngdoc function
 * @name browserActionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the browserActionApp
 */
angular.module('browserActionApp')
  .controller('MainCtrl', function ($scope,extension) {
    $scope.console = function(){
        extension.sendMessage(function(response){
            console.log(response);
        });
    }
  });