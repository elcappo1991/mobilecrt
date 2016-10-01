var app = angular.module("app", ["iso-3166-country-codes"]);


app.controller('homePage', function($scope,$http,$window) {
    console.log('home Page');

    $http.get('/manager/getUserConnected').then(function(user){

        $scope.user_info=user.data;
    });
    $http.get('/manager/getHotelById').then(function(hotel){
            console.log(hotel)
        $scope.hotel_info=hotel.data;
    });
    $http.get('/manager/getRoomType').then(function(hotel){

        $scope.roomType=hotel.data;
    });



    $http.get("http://ipinfo.io").then(function(response) {

       $scope.location= response.data.country;
    });

    /*$http.get("/manager/getReservationListByIdAccount").then(function(reservationList){


        $scope.reservationList=  JSON.parse(reservationList.data);
        console.log($scope.reservationList[0].start_date)

    });
    $http.get("/manager/getListAccountPerManagerId").then(function(accountList){


        $scope.accountList=  accountList.data;

    });
    $scope.mfstDate = new Date().toISOString()  ;
    console.log($scope.mfstDate)
*/



});

var Myapp = angular.module("Myapp",['datatables']);

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



Myapp.controller('room', function($scope,$http) {
    console.log('room Page');

    $http.get('/manager/getUserConnected').then(function(user){

        $scope.user_info=user.data;
    });

    $http.get('/manager/getRoomList').then(function(room){
        console.log(room.data)
        $scope.roomList=room.data;
    });
    $http.get('/manager/getRoomType').then(function(hotel){

        $scope.roomType=hotel.data;
    });



});
Myapp.controller('account', function($scope,$http) {
    console.log('account List Page');


    $http.get('/manager/getUserConnected').then(function(user){

        $scope.user_info=user.data;
    });

    $http.get("/manager/getListAccountPerManagerId").then(function(accountList){


        $scope.accountList=  accountList.data;

    });


});




