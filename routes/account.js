var express = require('express');
var router = express.Router();
var reservationService =require('./../services/reservationService');
var accountServices =require('./../services/accountService');
var roomService =require('./../services/roomService');
var pg = require('pg');
//pg.defaults.ssl= true;;
var config = require('./../config/dbconfig.json');
var conString = config.App.dbConfig.conString;
/* GET users listing. */
router.get('/', function(req, res, next) {
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
    console.log(req.body)
    reservationService.addreservation(req.body,req.user.id);
    res.redirect('/')

})

router.get('/roomList',isLoggedIn, function(req, res, next) {
    roomService.getroomByIdManager(req.user.managerId,function(rows){
        res.json(rows);
    })
});


/**
 * web service that add get the user connectted
 */
router.get('/getUserConnected',isLoggedIn,function(req,res){

res.json(req.user)

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
