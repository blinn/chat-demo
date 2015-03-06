'use strict';
 
angular.module('core')
.factory('mySocket', function(socketFactory) {
    return socketFactory();
})
.controller('HomeController', ['$scope', 'Authentication', 'mySocket',
    function($scope, Authentication, mySocket) {
        $scope.authentication = Authentication;
    }
]);