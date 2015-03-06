'use strict';

angular.module('chat').directive('blChatModule', function(){
  return {
    templateUrl: 'modules/chat/views/chat-module.client.view.html',
    restrict: 'AE',
    scope: { username: '@' },
    controller: function($scope, mySocket){
      $scope.isOpen = true;
      $scope.messages = [];
      $scope.message = '';

      $scope.sendMessage = function(){
        var msg = {
          user: $scope.currentUser,
          message: $scope.message,
          avatar: 'http://lorempixel.com/300/300/cats/8'
        };
        console.log(msg);
        $scope.messages.push(msg);
        $scope.message = '';

        mySocket.emit('message', msg.message);
      };

      $scope.toggleChat = function(){
        $scope.isOpen = !$scope.isOpen;
      };

      $scope.closeChat = function(){

      };

      mySocket.on('broadcast', function(msg) {
        console.log('Server response', msg);
      });
    }
  };
});