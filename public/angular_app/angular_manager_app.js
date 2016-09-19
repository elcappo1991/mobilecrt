var app = angular.module("app", []);


app.controller('homePage', function($scope,$http,$window) {
    console.log('home Page');

    $http.get('/manager/getUserConnected').then(function(user){

        $scope.user_info=user.data;
    })

});


