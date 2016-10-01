var myApp = angular.module("myApp", []);


myApp.controller('APPController', function($scope,$http) {

    console.log('APPController');

    $http.get('/owner/hotelList').then(function(res){
        console.log(res )
      $scope.hotelList=res.data;
    });
    $http.get('/owner/getListManager').then(function(res){

        $scope.managerList= JSON.parse(res.data);
    })

});



myApp.controller('APPController1', function($scope,$http) {

    console.log('hotel list');

    $http.get('/owner/hotelList').then(function(res){

        $scope.hotelList=res.data;
    });
    $http.get('/owner/getListManager').then(function(res){

        $scope.managerList= JSON.parse(res.data);
    })

    $scope.showMap= function(lat, long){

        console.log(lat+' '+long);
        $('#modal').modal('show');
        initMap(lat,long);
    }

});


myApp.controller('change', function($scope,$http) {


    $http.get('/manager/getUserConnected').then(function(user){

        $scope.user_info=user.data;
    });

    $http.get("http://ipinfo.io").then(function(response) {

        $scope.location= response.data.country;
    });


});


myApp.controller('profile', function($scope,$http) {


    $http.get('/manager/getUserConnected').then(function(user){

        $scope.user_info=user.data;
    });

    $http.get("http://ipinfo.io").then(function(response) {

        $scope.location= response.data.country;
    });

});

