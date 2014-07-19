/* global Firebase */
(function(angular){
  'use strict';

  angular.module('ticTacTypeApp').service('MessageService', function(FBURL){
    var messageRef = new Firebase(FBURL).child('messages');
    return {
      childAdded: function childAdded(cb){
        messageRef.on('child_added', function(snapshot){
                // we want to return just a the child added because we don't have access
                // to our local message array
                // This is different from  an API call because it's real time
                // We have an open connection though
                // So we use a callback function
                var val = snapshot.val();
                cb.call(this, {
                  user: val.user,
                  text: val.text,
                  name: snapshot.name()
                });         
        }); 
      }, 
      add: function addMessage(message){
        messageRef.push(message);
      },
      off: function turnMessageOff(){
        messageRef.off();
      }
    };

  });

})(window.angular);