var app = angular.module("app", ["iso-3166-country-codes"]);



app.controller('homePage', function($scope,$http,$window) {
    console.log('home Page');

    $http.get('/manager/getUserConnected').then(function(user){

        $scope.user_info=user.data;
    });
    $http.get('/manager/getreservationForTheManager').then(function(res){

        $scope.reservation=res.data;
        console.log(res.data)
    });
    $http.get('/manager/getHistoricReservation').then(function(res){

        $scope.Oldreservation=res.data;
        console.log(res.data)
    });
    $http.get('/manager/getHotelById').then(function(hotel){

        $scope.hotel_info=hotel.data;
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


    $scope.show=function(reservation){
        console.log(reservation);
        $window.localStorage.setItem('details',JSON.stringify(reservation))
        console.log(JSON.parse($window.localStorage.getItem('details')))
        $window.location.href='/manager/details'
    }


});



app.controller('TypePage', function($scope,$http,$window) {
    console.log('TypePage');


    $http.get('/manager/getRoomType').then(function(hotel){

        $scope.roomType=hotel.data;
    });


});


app.controller('addRoomPage', function($scope,$http,$window) {
    console.log('addRoomPage');


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
    $http.get('/manager/getOption').then(function(option){

        $scope.options=option.data;
    });

    $http.get('/manager/getAllRoomOption').then(function(option){
        console.log(option)
        $scope.allRoomOption=option.data;
    });


});


app.directive('chosen', function() {
    var linker = function(scope, element, attr) {
        // update the select when data is loaded
        scope.$watch('options', function(oldVal, newVal) {
            element.trigger('chosen:updated');
        });

        // update the select when the model changes
        scope.$watch('options', function() {

            element.trigger('chosen:updated');
        });

        element.chosen();
    };

    return {
        restrict: 'A',
        link: linker
    };
})

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
    $http.get('/manager/getOption').then(function(option){

        $scope.options=option.data;
    });

    $http.get('/manager/getAllRoomOption').then(function(option){
        console.log(option)
        $scope.allRoomOption=option.data;
    });




});
Myapp.controller('account', function($scope,$http) {
    console.log('account List Page');


    $http.get('/manager/getUserConnected').then(function(user){

        $scope.user_info=user.data;
    });

    $http.get("/manager/getListAccountPerHotel").then(function(accountList){


        $scope.accountList=  accountList.data;

    });


});


Myapp.controller('option', function($scope,$http) {
    console.log('option List Page');


    $http.get('/manager/getUserConnected').then(function(user){

        $scope.user_info=user.data;
    });


    $http.get('/manager/getOption').then(function(option){

        $scope.options=option.data;
    });




});



Myapp.controller('details', function($scope,$http,$window) {

    $scope.reservation= JSON.parse($window.localStorage.getItem('details'))
    console.log($scope.reservation);
    $http.get('/account/getListHotel').then(function(hotel){
        console.log(hotel.data)
        $scope.hotels=hotel.data;
    });

    $http.post('/account/getListCompanionPerReservation',$scope.reservation).then(function(data){
        $scope.companionList=data.data
        console.log(data.data)
    })
    $http.post('/account/getroomTypeByName',$scope.reservation).then(function(data){
        $scope.picture=data.data.picture_url;

    })

    $http.post('/manager/getAccountbyId',$scope.reservation).then(function(data){
        console.log(data)
        $scope.account=data.data;

    })


});

