'use strict';

/**
 * @ngdoc overview
 * @name wdifirechat
 * @description
 * # wdifirechat
 *
 * Main module of the application.
 */
angular
  .module('wdifirechat', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'firebase',
    'routeSecurity',
    'simpleLoginTools'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/chat', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl',
        // we can use an attribute for authentication and control access to chat
        authRequired: true
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl'
      })
      .when('/about', {
        templateUrl: 'Logging out...',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('FBURL', 'https://wdifirechat.firebaseio.com/')
  .constant('loginRedirectPath', '/login');
