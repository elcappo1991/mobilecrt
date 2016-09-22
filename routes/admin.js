var express = require('express');
var router = express.Router();
var managerService =require('./../services/managerService');
var pg = require('pg');
//pg.defaults.ssl= true;;
var config = require('./../config/dbconfig.json');
var conString = config.App.dbConfig.conString;
/* GET users listing. */
router.get('/', isLoggedIn, requireRole('admin'),function(req, res, next) {
    res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
    res.render('admin/index');
});

router.post('/add', isLoggedIn, requireRole('admin'),function(req,res){


    pg.connect(conString,function (err,dbclient,ok) {

        if (err) {
            return console.error('could not connect to the database ' + err);
        }

        dbclient.query('select * from managers where email = $1',[req.body.email],function(err,rows){

            if(rows[0] != null){
                console.log('user duplicated');


                res.json('erreur');
            }else{

                managerService.addUser(req.body);
                res.json('added');


            }
        });
    });




});

router.post('/delete', isLoggedIn, requireRole('admin'),function(req,res){

    managerService.deleteUser(req.body,function(userDeleted){
        console.log('user deleted :D '+userDeleted.id)
        res.json('deleted');
    });




});

router.get('/getAll', isLoggedIn, requireRole('admin'),function(req,res){

    managerService.getAllManagers(function(result){

        res.json(result);
    });
});




//get the add  page function
router.get('/add', isLoggedIn, requireRole('admin'),isLoggedIn, function (req, res) {

    res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
    res.render('admin/addClient');
});

//logout function
router.get('/logout', function (req, res) {

    req.logout();
    res.redirect('/');
});

//verifiy if user is connected or not
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    //   return next();

    res.redirect('/error');

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
