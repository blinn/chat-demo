'use strict';


angular.module('chat')
.factory('mySocket', function(socketFactory) {
    return socketFactory();
})
.directive('blFriendList', function($compile, mySocket){
	return {
		templateUrl: 'modules/chat/views/friend-list.client.view.html',
		restrict: 'AE',
		controller: function($scope, $http){
			$scope.friendsList = [];
			$scope.newFriend = '';
			$scope.addErrorMessage = '';
			$scope.chatInstances = [];

			$scope.chatFriend = function(friend){
				for(var i = 0; i < $scope.chatInstances.length; i++){
					if(friend.username === $scope.chatInstances[i].username){
						return false;
					}
				};
				$scope.chatInstances.push(friend);
				var el = $compile("<span bl-chat-module username='"+friend.username+"'></span>")($scope);
				$('.chat-container').append(el);
			};

			$scope.addFriend = function(){
				$http.get('/addFriend/', {
					params: { name: $scope.newFriend}}
					).success(function(res) {
						if(res.data){
							$scope.friendsList.push(res.data);
							$scope.newFriend = '';
							$scope.messageResponse = '';
						} else {
							$scope.messageResponse = res.message;
							console.log(res.message);
						}
					}).error(function(err) {
						console.log(err.message);
					});
				};

				(function getFriends(){
					$http.get('/getFriends/').success(function(res) {
						console.log(res.data || null)
						$scope.friendsList = res.data;
					});
				})();

			}
		};
	});