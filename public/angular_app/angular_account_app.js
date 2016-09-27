var myApp = angular.module("myApp",[]);


myApp.controller('APPController', function($scope,$http) {

    console.log('APPController');

    /**
     * get list reservation for the user connected
     */
    $http.get('/account/getListReservation').then(function(resultat){
        $scope.listReservation=resultat.data;

    });


    /**
     * get  the user connected
     */
    $http.get('/account/getUserConnected').then(function(resultat){
        $scope.user_info=resultat.data;

    });

    /***
     * get the country name from the ip adress
     */
    $http.get("http://ipinfo.io").then(function(response) {

        $scope.location= response.data.country;
    });
});
myApp.controller('APPController1', function($scope,$http) {

    $http.get('/account/roomList').then(function(room){
        console.log(room.data)
        $scope.roomList=room.data;
    });
});



