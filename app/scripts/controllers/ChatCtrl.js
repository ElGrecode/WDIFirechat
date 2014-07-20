(function(angular){
  'use strict';
  angular.module('wdifirechat')
    .controller('ChatCtrl', function($scope, $timeout, MessageService) {
        // $scope is a special object that makes
        // its properties available to the view as
        // variables. Here we set some default values:
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.currentUser = null;
        $scope.currentText = null;
        $scope.messages = [];

        MessageService.childAdded(function(addedChild){
            $scope.messages.push(addedChild);
        });

        // The code below will check Firebase for the child being changed or removed
        // And update the view accordingly

        // messagesRef.on('child_changed', function(snapshot) {
        //     // We have to rap our function within a timeout so it goes up on the
        //     // call stack
        //     $timeout(function() {
        //         var snapshotVal = snapshot.val();
        //         var message = findMessageByName(snapshot.name());
        //         message.user = snapshotVal.user;
        //         message.text = snapshotVal.text;
        //     });
        // });

        // messagesRef.on('child_removed', function(snapshot) {
        //     // We have to rap our function within a timeout so it goes up on the
        //     // call stack
        //     $timeout(function() {
        //         deleteMessageByName(snapshot.name());
        //     });
        // });

        // function deleteMessageByName(name){
        //     for(var i = 0; i < $scope.messages.length; i++){
        //         var currentMessage = $scope.messages[i];
        //         if (currentMessage.name === name){
        //             $scope.messages.splice(i, 1);
        //             break;
        //         }
        //     }
        // }

        // function findMessageByName(name){
        //     var messageFound = null;
        //     for(var i = 0; i < $scope.messages.length; i++){
        //         var currentMessage = $scope.messages[i];
        //         if (currentMessage.name === name){
        //             messageFound = currentMessage;
        //             break;
        //         }
        //     }

        //     return messageFound;
        // }

        $scope.sendMessage = function(){
            var newMessage = {
                user : $scope.currentUser,
                text : $scope.currentText,
                email : $scope.user.email,
                uid: $scope.user.uid
            };
            // $add pushes and then returns us a unique name
            var promise = MessageService.add(newMessage);

            // Since we have a promise we can call the then() function on it
            promise.then(function(data){
                console.log(data.name());
            });
        };

        $scope.turnFeedOff = function(){
            // We want to turn the feed off so we use off function on Firebase node
            MessageService.off();
        };

    });

}(window.angular));