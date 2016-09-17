var express = require('express');
var router = express.Router();
var userservice =require('./../services/managerService');
var pg = require('pg');
pg.defaults.ssl= true;;
var config = require('./../config/dbconfig.json');
var conString = config.App.dbConfig.conString;
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('welcome');
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
