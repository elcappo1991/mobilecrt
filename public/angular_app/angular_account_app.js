var myApp = angular.module("myApp",[]);


myApp.controller('APPController', function($scope,$http) {

    console.log('APPController');

    /**
     * get list reservation for the user connected
     */
    $http.get('/account/getListReservation').then(function(resultat){
        $scope.listReservation=resultat.data;

    });

    $http.get('/account/getListHotel').then(function(hotel){

        $scope.hotels=hotel.data;
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

    $http.get('/account/getListHotel').then(function(hotel){

        $scope.hotels=hotel.data;
    });


    $scope.showMap= function(lat, long){

        console.log(lat+' '+long);
        $('#modal').modal('show');
        initMap(lat,long);
    }

    $scope.showOffers=function(idHotel,hotel){
        $scope.hotel=hotel;
        var parameters = {
            id: idHotel
        };
        var config = {
            params: parameters
        };
        $('#hotelList').hide();
       $http.get('/account/TypeRoomListByIdHotel',config).then(function(res){
           $scope.typeList=res.data;
       });
        $http.get('/account/optionListByIdHotel',config).then(function(res){

           $scope.optionList=res.data;
       });

        $http.get('/account/getRoomByIdHotel',config).then(function(res){
            console.log(res.data);
            $scope.roomList=res.data;
        });

  $http.get('/account/getAllRoomOption',config).then(function(res){
            console.log(res.data);
            $scope.allRoomOption=res.data;
        });


        $('#reservation').show();

    }

    $scope.return=function(){

        $('#hotelList').show();
        $('#reservation').hide();

    }
});
