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
