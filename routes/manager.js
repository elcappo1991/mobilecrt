var express = require('express');
var router = express.Router();
var managerService =require('./../services/managerService');
var pg = require('pg');
pg.defaults.ssl= true;;
var config = require('./../config/dbconfig.json');
var conString = config.App.dbConfig.conString;
/* GET users listing. */
router.get('/',isLoggedIn,requireRole('manager'), function(req, res, next) {
  res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
  res.render('manager/index');
});

router.get('/getUserConnected',isLoggedIn,requireRole('manager'),function(req,res){

  res.json(req.user);
});

router.get('/profile',isLoggedIn,requireRole('manager'), function(req, res, next) {
  res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
  res.render('manager/profile');
});

router.get('/changepwd',isLoggedIn,requireRole('manager'), function(req, res, next) {
  res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
  res.render('manager/changepwd');
});

router.post('/changepassword',isLoggedIn,requireRole('manager'), function(req, res, next) {
  managerService.changePassword(req.user.id,req.body['oldpassword'], req.body['newpassword'],function(){
    res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
    res.render('manager/changepwd');

  })


});


router.post('/register', function(req, res, next) {

  var user={
    first_name:req.body['register-firstname'],
    last_name:req.body['register-lastname'],
    email:req.body['register-email'],
    password:req.body['register-password']
  };

  pg.connect(conString,function (err,dbclient,ok) {

    if (err) {
      return console.error('could not connect to the database ' + err);
    }

    dbclient.query('select * from managers where email = $1',[req.body['register-email']],function(err,rows){

      if(rows.rows[0] != null){
        console.log('user duplicated');


      res.locals.message="Email already associated to an account";
        res.render('login')
      }else{

        managerService.addUser(user);
        res.locals.message=null;
        res.redirect('/login');


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

function requireRole(role) {
  return function(req, res, next) {
    if(req.user && req.user.role== role)
      next();
    else
      res.render('404');
  }
}


module.exports = router;
