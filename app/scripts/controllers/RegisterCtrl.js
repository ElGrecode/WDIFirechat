/*global Firebase*/
(function(angular){
  'use strict';
  angular.module('ticTacTypeApp')
    .controller('RegisterCtrl', function($scope, $firebaseSimpleLogin, FBURL, $window){
      var fbRef = new Firebase(FBURL);

      $scope.errors = [];
      $scope.simpleLogin = $firebaseSimpleLogin(fbRef);
      $scope.registerUser = {
        email: '',
        password: '',
        confirmPassord: ''
      };

      $scope.register = function(){
        // validation check
        var errors = [],
            user = $scope.registerUser;
        if (user.email === ''){
          errors.push('Please enter an email');
        }

        if (user.password === ''){
          errors.push('Please enter a password');
        } else if (user.password !== user.confirmPassword){
          errors.push('Passwords must match');
        }

        if (errors.length > 0){
          $scope.errors = errors;
          return;
        }

        var promise = $scope.simpleLogin
          .$createUser(user.email, user.password);

        promise.then(function(user){
          console.log(user);
          $window.location.href = '#/home';
        }, function(error){
          console.log(error);
        });

      };

    });

}(window.angular));