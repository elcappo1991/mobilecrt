var app = angular.module("app", ["iso-3166-country-codes"]);


app.controller('homePage', function($scope,$http,$window) {
    console.log('home Page');

    $http.get('/manager/getUserConnected').then(function(user){

        $scope.user_info=user.data;
    });

    $http.get("http://ipinfo.io").then(function(response) {
        console.log(response)
       $scope.location= response.data.country;
    });

});
var Myapp = angular.module("Myapp", ["iso-3166-country-codes"]);

Myapp.controller('change', function($scope,$http,$window) {
    console.log('change Page');

    $http.get('/manager/getUserConnected').then(function(user){

        $scope.user_info=user.data;
    });

    $http.get("http://ipinfo.io").then(function(response) {
        console.log(response)
        $scope.location= response.data.country;
    });

});


Myapp.controller('profile', function($scope,$http,$window) {
    console.log('profile Page');

    $http.get('/manager/getUserConnected').then(function(user){

        $scope.user_info=user.data;
    });

    $http.get("http://ipinfo.io").then(function(response) {
        console.log(response)
        $scope.location= response.data.country;
    });

});




