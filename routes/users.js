var express = require('express');
var router = express.Router();
var userservice =require('./../services/userService');
var pg = require('pg');
pg.defaults.ssl= true;;
var config = require('./../config/dbconfig.json');
var conString = config.App.dbConfig.conString;
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add',function(req,res){
  console.log("*/*//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/**/*/*/*/*/*/"+req.body.email)
  pg.connect(conString,function (err,dbclient,ok) {

    if (err) {
      return console.error('could not connect to the database ' + err);
    }

    dbclient.query('select * from managers where email = $1',[req.body.email],function(err,rows){

      if(rows[0] != null){
        console.log('user duplicated');


        res.json('erreur');
      }else{

        userservice.addUser(req.body);
        res.json('added');


      }
    });
  });




});

router.post('/delete',function(req,res){

   userservice.deleteUser(req.body,function(userDeleted){
     console.log('user deleted :D '+userDeleted.id)
     res.json('deleted');
   });




});
router.get('/getAll',function(req,res){

  userservice.getAllUsers(function(result){

    res.json(result);
  });
});

module.exports = router;
