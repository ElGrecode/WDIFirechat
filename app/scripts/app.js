'use strict';

/**
 * @ngdoc overview
 * @name ticTacTypeApp
 * @description
 * # ticTacTypeApp
 *
 * Main module of the application.
 */
angular
  .module('ticTacTypeApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('FBURL', 'https://tictactypeapp.firebaseio.com/');
