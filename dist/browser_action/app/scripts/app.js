'use strict';

/**
 * @ngdoc overview
 * @name browserActionApp
 * @description
 * # browserActionApp
 *
 * Main module of the application.
 */
angular
  .module('browserActionApp', [
    'ngAnimate',
    'ngSanitize'
  ]).factory('extension', function extension() {

        function sendMessage (args,cb){
            chrome.runtime.sendMessage(args, function(response) {
               cb(response)
            });
        }

        function getFeed(){
            sendMessage({action:'getFeed'},function(response){
                console.log(response);
            });
        }

        return {
            sendMessage:sendMessage,
            getFeed:getFeed
        }
    });
