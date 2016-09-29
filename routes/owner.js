var express = require('express');
var router = express.Router();
var passport = require('passport');
var pg = require('pg');
//pg.defaults.ssl= true;;
var config = require('./../config/dbconfig.json');
var conString = config.App.dbConfig.conString;
var hotelService = require('../services/hotelService');
var managerService = require('../services/managerService');

/* GET home page. */
router.get('/',isLoggedIn,requireRole('owner'),function(req, res, next) {

    res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
    res.render('owner/index');

});

router.get('/addHotel',isLoggedIn,requireRole('owner'),function(req,res){

    res.locals.user=req.user.first_name+ ' '+ req.user.last_name;
    res.render('owner/addHotel');

})

router.post('/addHotel',isLoggedIn,requireRole('owner'),function(req,res){

    hotelService.addhotel(req.body,req.user.id);
    res.redirect('/');

})

router.get('/hotelList',isLoggedIn,requireRole('owner'),function(req,res){

    hotelService.gethotelByIdManager(req.user.id,function(resultat){
        res.json(resultat);
    });


});
router.get('/hotel',isLoggedIn,requireRole('owner'),function(req,res){
    res.locals.user=req.user.first_name+ ' '+ req.user.last_name;
    res.render('owner/hotel');

});

router.get('/addManager',isLoggedIn,requireRole('owner'),function(req,res){
    res.locals.user=req.user.first_name+ ' '+ req.user.last_name;
    res.render('owner/addManager');

});

router.get('/listManager',isLoggedIn,requireRole('owner'),function(req,res){
    res.locals.user=req.user.first_name+ ' '+ req.user.last_name;
    res.render('owner/listManager');

});
router.get('/getListManager',isLoggedIn,requireRole('owner'),function(req,res){
    managerService.getListManagerByIdOwners(req.user.id,function(result){
        res.json(JSON.stringify(result));
    });

});



router.post('/addManager', function(req, res, next) {

    var user={
        first_name:req.body['register-firstname'],
        last_name:req.body['register-lastname'],
        email:req.body['register-email'],
        hotelId:req.body['hotelId'],
        role:'manager'
    };

    pg.connect(conString,function (err,dbclient,ok) {

        if (err) {
            return console.error('could not connect to the database ' + err);
        }

        dbclient.query('select * from managers where email = $1',[req.body['register-email']],function(err,rows){

            if(rows.rows[0] != null){
                console.log('user duplicated');


                res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
                res.redirect('/owner/addManager')
            }else{

                managerService.addUser(user);
                res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
                res.redirect('/owner/hotel')


            }
        });
        ok
    });
});


//logout function
router.get('/logout', function (req, res) {

    req.logout();
    res.redirect('/login');
});
//verifiy if user is connected or not
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    //   return next();

    res.redirect('/login');

}

function requireRole(role) {
    return function(req, res, next) {
        if(req.user && req.user.role== role)
            next();
        else
            res.render('404');
    }
}
module.exports = router;
