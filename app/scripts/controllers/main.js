'use strict';

/**
 * @ngdoc function
 * @name ticTacTypeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ticTacTypeApp
 */
angular.module('ticTacTypeApp')
  .controller('MainCtrl', function ($scope, $timeout) {
  	// $scope is a special object that makes
	// its properties available to the view as
	// variables. Here we set some default values:
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var rootRef = new Firebase('https://shining-fire-6606.firebaseio.com/');
    var childRef = rootRef.child('message');

    // Every time the value is update on the child reference, the on
    // reference will fire
    childRef.on('value', function(snapshot){
        // We have to rap our function within a timeout so it goes up on the
        // call stack
        $timeout(function(){
            var snapshotVal = snapshot.val();
            console.log(snapshotVal); 
            $scope.message = snapshotVal;
        });
        
    });

    $scope.$watch('message.text', function(newVal){
        if (!newVal){
            return;
        }
        childRef.update({
            text: newVal
        })
    });

    // CRUD operations
    $scope.setMessage = function(){
    	childRef.set({
    		user: 'Bob',
    		text: 'Hi'
    	});
    };

    $scope.updateMessage = function(){
    	childRef.update({
    		lastname: 'Smith'
    	});
    };

    $scope.deleteMessage = function(){
    	childRef.remove();
    };


  });
