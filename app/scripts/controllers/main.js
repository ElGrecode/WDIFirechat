'use strict';

/**
 * @ngdoc function
 * @name ticTacTypeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ticTacTypeApp
 */
angular.module('ticTacTypeApp')
    .controller('MainCtrl', function($scope, $timeout) {
        var rootRef = new Firebase('https://tictactypeapp.firebaseio.com/');
        var messagesRef = rootRef.child('messages');
        var titleRef = rootRef.child('title');
        // $scope is a special object that makes
        // its properties available to the view as
        // variables. Here we set some default values:
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.title = null;
        $scope.currentUser = null;
        $scope.currentText = null;
        $scope.messages = [];

        titleRef.once('value', function(snapshot){
            $scope.title = snapshot.val();
        });

        // Every time the value is update on the child reference, the on
        // reference will fire
        messagesRef.on('child_added', function(snapshot) {
            // We have to rap our function within a timeout so it goes up on the
            // call stack
            $timeout(function() {
                var snapshotVal = snapshot.val();
                console.log(snapshotVal);
                $scope.messages.push({
                    text: snapshotVal.text,
                    user: snapshotVal.user,
                    name: snapshot.name()
                });
            });
        });

        messagesRef.on('child_changed', function(snapshot) {
            // We have to rap our function within a timeout so it goes up on the
            // call stack
            $timeout(function() {
                var snapshotVal = snapshot.val();
                var message = findMessageByName(snapshot.name());
                message.user = snapshotVal.user;
                message.text = snapshotVal.text;
            });
        });

        messagesRef.on('child_removed', function(snapshot) {
            // We have to rap our function within a timeout so it goes up on the
            // call stack
            $timeout(function() {
                deleteMessageByName(snapshot.name());
            });
        });

        function deleteMessageByName(name){
            for(var i = 0; i < $scope.messages.length; i++){
                var currentMessage = $scope.messages[i];
                if (currentMessage.name === name){
                    $scope.messages.splice(i, 1);
                    break;
                }
            }
        }

        function findMessageByName(name){
            var messageFound = null;
            for(var i = 0; i < $scope.messages.length; i++){
                var currentMessage = $scope.messages[i];
                if (currentMessage.name === name){
                    messageFound = currentMessage;
                    break;
                }
            }

            return messageFound;
        }

        $scope.sendMessage = function(){
            var newMessage = {
                user : $scope.currentUser,
                text : $scope.currentText
            };
            // Push gives us a unique name
            messagesRef.push(newMessage);
        };

        $scope.turnFeedOff = function(){
            // We want to turn the feed off so we use off function on Firebase node
            messagesRef.off();
        };

    });
