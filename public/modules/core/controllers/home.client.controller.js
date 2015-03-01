'use strict';
 
angular.module('core')
.factory('mySocket', function(socketFactory) {
    return socketFactory();
})
.controller('HomeController', ['$scope', 'Authentication', 'mySocket', '$http',
    function($scope, Authentication, mySocket, $http) {
        $scope.authentication = Authentication;
        $scope.friendsList = [];
        $scope.newFriend = '';

        $scope.addFriend = function(){
            $http.get('/addFriend/', {
                params: { name: $scope.newFriend}}
            ).success(function(res) {
                if(res.data){
                    $scope.friendsList.push(res.data);
                    $scope.newFriend = '';
                } else {
                    console.log(res.message);
                }
            }).error(function(err) {
                console.log(err.message);
            });
        };

        // (function getFriends(){
        //     $http.get('/getFriends/').success(function(res) {
        //         console.log(res.data || null)
        //         $scope.friendsList = res.data;
        //     });
        // })();

        mySocket.emit('message', 'Hello World !');
        mySocket.on('broadcast', function(msg) {
            console.log('Server response', msg);
        });
    }
]);