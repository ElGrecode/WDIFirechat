/*global Firebase*/
(function(angular){
  'use strict';
  angular.module('ticTacTypeApp')
    .controller('LoginCtrl', function($scope, $firebaseSimpleLogin, FBURL, $window, $rootScope){
        var fbRef = new Firebase(FBURL);
        $scope.errors = [];
        $scope.simpleLogin = $firebaseSimpleLogin(fbRef);
        $scope.user = {
          email: '',
          password: ''
        };

        $scope.login = function() {
          $scope.errors = [];

          // check for errors
          if ($scope.user.email === ''){
            $scope.errors.push('Please enter your email');
          }

          if ($scope.user.password === ''){
            $scope.errors.push('Please enter your password'); 
          }

          if ($scope.errors.length > 0){
            return;
          }

          var promise = $scope.simpleLogin.$login('password', {
            email: $scope.user.email,
            password: $scope.user.password
          });

          promise.then(function(user){
            // might want to store in a cookie here.
            console.log(user);
            $rootScope.user = user;
            $window.location.href = '/#/main';
          }, function(error){
            console.log(error);
            if (error.code === 'INVALID_EMAIL' || error.code === 'INVALID_PASSWORD'){
              $scope.errors.push('The email and password combination do not exist');
            }
          });
        };
    });

}(window.angular));