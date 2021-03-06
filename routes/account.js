var express = require('express');
var router = express.Router();
var reservationService =require('./../services/reservationService');
var accountServices =require('./../services/accountService');
var roomService =require('./../services/roomService');


var accountService =require('./../services/accountService');
var managerService =require('./../services/managerService');
var hotelService =require('./../services/hotelService');
var roomTypeService =require('./../services/roomTypeService');
var optionService =require('./../services/optionService');
var roomOptionService =require('./../services/roomOptionService');
var companionService =require('./../services/companionService');
var pg = require('pg');
//pg.defaults.ssl= true;;
var config = require('./../config/dbconfig.json');
var conString = config.App.dbConfig.conString;
/* GET users listing. */
router.get('/', isLoggedIn,function(req, res, next) {
    res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
    res.render('account/index');
});

/**
 * return reservation add page
 */
router.get('/getAddReservation',isLoggedIn, function(req, res, next) {
    res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
    res.render('account/addReservation');
});

/**
 * return profile page
 */
router.get('/profile',isLoggedIn, function(req, res, next) {
    res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
    res.render('account/profile');
});
/**
 * return change password page
 */
router.get('/changepwd',isLoggedIn, function(req, res, next) {
    res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
    res.render('account/changepwd');
});
/**
 * return ChekIn page
 */
router.get('/checkInPage',isLoggedIn, function(req, res, next) {
    res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
    res.render('account/checkInPage');
});

/**
 * return details reservation page
 */
router.get('/details',isLoggedIn, function(req, res, next) {
    res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
    res.render('account/DetailsPage');
});


/**
 * return change password page
 */
router.post('/changepassword',isLoggedIn, function(req, res, next) {
    accountServices.changePassword(req.user.id,req.body['oldpassword'], req.body['newpassword'],function(){
        res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
        res.render('account/changepwd');

    })

});



/**
 * get list Reservation done by the connected user
 */
router.get('/getListReservation',isLoggedIn, function(req, res, next) {
  reservationService.getreservationByIdAccount(req.user.id,function(list){
      res.json(list);
  })
});

/**
 * web service that add a reservation
 */
router.post('/addReservation',isLoggedIn,function(req,res){
    var res_option= JSON.parse(req.body.option_room)
    var val= " ";
    res_option.forEach(function(r){
        val=val+' '+r;
    })

    req.body.option_room=val;
    console.log(req.body)
  reservationService.addreservationHotel(req.body,req.user.id);
    res.redirect('/')

});
/**
 *web service that return the hotel list available
 */
router.get('/getListHotel',isLoggedIn,function(req,res){

    hotelService.getAllhotel(function(list){
        res.json(list);
    })
})
/**
 * web service that return type room by hotel id
 */
router.get('/TypeRoomListByIdHotel',isLoggedIn, function(req, res, next) {

   roomTypeService.getroomTypeByIdHotel(req.query.id,function(result){
       res.json(result)
   })

});
router.get('/optionListByIdHotel',isLoggedIn, function(req, res, next) {

    optionService.getoptionByIdHotel(req.query.id,function(result){
        res.json(result)
    })

});

router.get('/getRoomByIdHotel',isLoggedIn, function(req, res, next) {

    roomService.getroomByIdHotel(req.query.id,function(result){
        res.json(result)
    })

});

router.get('/getAllRoomOption',isLoggedIn, function(req, res, next) {

    roomOptionService.getAllroomOption(function(result){
        res.json(result)
    })

});


/**
 * web service that add get the user connectted
 */
router.get('/getUserConnected',isLoggedIn,function(req,res){

res.json(req.user)

})


/**
 * web service that add get the user connectted
 */
router.post('/addCompanion',isLoggedIn,function(req,res){

        accountService.addCompanionAccountFromWebInterface(req.body,function(companion){
            var user={};
            user.id_account=req.user.id;
            user.id_companion=companion.id;
            user.room= req.body.room;
            user.reservation_id=req.body.reservation;

            companionService.addcompanion(user)

        })
res.json('success')


})

/**
 * web service that modify reservation
 * */
router.post('/checkIn',isLoggedIn,function(req,res){

    req.body.checkin=true;
    req.body.checkin_date=new Date();
    console.log(req.body)

reservationService.updatereservation(req.body,function(data){

    res.json(data);
})

})
/**
 * return list companion per reservation
 */
router.post('/getListCompanionPerReservation',isLoggedIn,function(req,res){



    companionService.getcompanionByIdReservation(req.body.id,function(data){

        res.json(data)

    })

})


/**
 * return  room type by type
 */
router.post('/getroomTypeByName',isLoggedIn,function(req,res){



    roomTypeService.getroomTypeByName(req.body.type_room,function(data){

        res.json(data)

    })

})




/**
 * register web service
 */
router.post('/register', function(req, res, next) {

    var user={
        first_name:req.body['register-firstname'],
        last_name:req.body['register-lastname'],
        email:req.body['register-email'],
        password:req.body['register-password'],
        managerId : 2
    };

    pg.connect(conString,function (err,dbclient,ok) {

        if (err) {
            return console.error('could not connect to the database ' + err);
        }

        dbclient.query('select * from accounts where email = $1',[req.body['register-email']],function(err,rows){

            if(rows.rows[0] != null){
                console.log('user duplicated');


                res.locals.message="Email already associated to an account";
                res.render('login')
            }else{

                accountServices.addAccount(user);
                res.locals.message="Try to connect now ! ";
                res.render('login');


            }
        });
        ok
    });
});
//verifiy if user is connected or not
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    //   return next();

    res.redirect('/error');

}

module.exports = router;
