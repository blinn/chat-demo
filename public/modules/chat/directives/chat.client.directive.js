'use strict';

angular.module('chat').directive('blChatModule', function(){
  return {
    templateUrl: 'modules/chat/views/chat-module.client.view.html',
    restrict: 'AE',
    scope: true,
    controller: function($scope){
      $scope.currentUser = 'blinn';
      $scope.messages = [];
      $scope.message = '23';
      $scope.sendMessage = function(){
        var msg = {
          user: $scope.currentUser,
          message: $scope.message,
          avatar: 'http://lorempixel.com/300/300/cats/8'
        };
        console.log(msg);
        $scope.messages.push(msg);
        $scope.message = '';
    };
    }
  };
});