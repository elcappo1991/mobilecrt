var myApp = angular.module("myApp", []);


myApp.controller('APPController', function($scope,$http,$window) {

    console.log('APPController');
    $http.get('/admin/getAll').then(function(res){

        $scope.listUser=res.data;

    })

    $scope.delete = function(user){
        console.log(user.id)
        $http.post('/admin/delete',user).then(function(res){
            $window.location='/admin'

        })

    }

});



myApp.controller('APPController1', function($scope,$http,$window) {

    console.log('APPController1');
    $scope.add = function(user){
        $http.post('/admin/add',user).then(function(res){
            console.log('suusces '+res )
            $window.location='/admin'
        })

    }

});