var myApp = angular.module("myApp",[]);


myApp.controller('APPController', function($scope,$http,$window) {

    console.log('APPController');

    /**
     * get list reservation for the user connected
     */
    $http.get('/account/getListReservation').then(function(resultat){
        $scope.listReservation=resultat.data;


        $scope.nbCheckedIn=0;
        for(var i=0;i< resultat.data.length;i++){
            if(resultat.data[i].checkin == false){
                $scope.nbCheckedIn++;
            }
            console.log(  $scope.nbCheckedIn)
        }
        $scope.nbAlready=0;

        for(var i=0;i< resultat.data.length;i++){
            if(resultat.data[i].checkin_date != null){
                $scope.nbAlready++;
            }
            console.log(  $scope.nbAlready)
        }

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

    $scope.mfstDate = new Date().toISOString()  ;

    $scope.show=function(reservation){
        console.log(reservation);
        $window.localStorage.setItem('reservation',JSON.stringify(reservation))
console.log(JSON.parse($window.localStorage.getItem('reservation')))
$window.location.href='/account/checkInPage'
}

        $scope.details=function(reservation){
        console.log(reservation);
        $window.localStorage.setItem('details',JSON.stringify(reservation))
        console.log(JSON.parse($window.localStorage.getItem('reservation')))
        $window.location.href='/account/details'
}


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



        $('#listRoom').show();

    }

    $scope.return=function(){

        $('#hotelList').show();
        $('#reservation').hide();

    }


    $scope.view = function(data){



        //console.log(data);
        console.log($('#type'+data.id).text());
        console.log($('#option'+data.id).text().match(/\S+/gi));
        $scope.type=$('#type'+data.id).text();
        $scope.option=$('#option'+data.id).text().match(/\S+/gi);
        $('#reservation').show();
        $('#listRoom').hide();

    }
});

myApp.controller('details', function($scope,$http,$window) {

    $scope.reservation= JSON.parse($window.localStorage.getItem('details'))
    console.log($scope.reservation);
    $http.get('/account/getListHotel').then(function(hotel){

        $scope.hotels=hotel.data;
    });

    $http.post('/account/getListCompanionPerReservation',$scope.reservation).then(function(data){
        $scope.companionList=data.data
        console.log(data.data)
    })
     $http.post('/account/getroomTypeByName',$scope.reservation).then(function(data){
        $scope.picture=data.data.picture_url;

    })


});






var Appl = angular.module("Appl",["ngWizard"]);
Appl.controller('checkInPage', function($scope,$http,$window){


    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };


    $scope.reservation= JSON.parse($window.localStorage.getItem('reservation'))
    console.log($scope.reservation);
    $http.get('/account/getListHotel').then(function(hotel){

        $scope.hotels=hotel.data;
    });

    $scope.submit=function(hola){
        console.log($scope.reservation)
        var nb =$scope.reservation.companion_nb;
        console.log(nb+' nb')
        for(var i=1;i <= nb;i++){
            console.log(i+ " iiiii")
            var first_name = document.getElementById('first_name'+i).value;
            var last_name = document.getElementById('last_name'+i).value;
            var email = document.getElementById('email'+i).value;
          //  var room = document.getElementById('room'+i).value;
            var data={};
            data.first_name=first_name;
            data.last_name=last_name;
            data.email=email;
          //  data.room=room;
            data.reservation=$scope.reservation.id,


            $http.post('/account/addCompanion',data).then(function(fata){})



        }
        $http.post('/account/checkIn',$scope.reservation).then(function(fata){

            $window.location.href='/account';
        })

    }

});