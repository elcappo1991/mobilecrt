var express = require('express');
var router = express.Router();
var userservice =require('./../services/managerService');
var pg = require('pg');
pg.defaults.ssl= true;;
var config = require('./../config/dbconfig.json');
var conString = config.App.dbConfig.conString;
/* GET users listing. */
router.get('/',isLoggedIn,requireRole('manager'), function(req, res, next) {
  res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
  res.render('manager/index');
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
