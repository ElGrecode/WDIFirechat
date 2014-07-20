/* global Firebase */
(function(angular){
  'use strict';

  angular.module('wdifirechat').service('MessageService', function(FBURL, $firebase){
    var messageRef = new Firebase(FBURL).child('messages');
    var fireMessage = $firebase(messageRef);
    return {
      childAdded: function childAdded(cb){
        fireMessage.$on('child_added', function(data){
          console.log(data.snapshot);
                // we want to return just a the child added because we don't have access
                // to our local message array
                // This is different from  an API call because it's real time
                // We have an open connection though
                // So we use a callback function
                var val = data.snapshot.value;
                cb.call(this, {
                  text: val.text,
                  name: data.snapshot.name,
                  email: val.email
                });         
        }); 
      }, 
      add: function addMessage(message){
        return fireMessage.$add(message);
      },
      off: function turnMessageOff(){
        fireMessage.$off();
      }
    };

  });

})(window.angular);