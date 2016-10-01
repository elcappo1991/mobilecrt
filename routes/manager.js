var express = require('express');
var router = express.Router();
var roomService =require('./../services/roomService');
var reservationService =require('./../services/reservationService');
var accountService =require('./../services/accountService');
var managerService =require('./../services/managerService');
var hotelService =require('./../services/hotelService');
var roomTypeService =require('./../services/roomTypeService');
var pg = require('pg');
//pg.defaults.ssl= true;;
var config = require('./../config/dbconfig.json');
var conString = config.App.dbConfig.conString;
/* GET users listing. */
router.get('/',isLoggedIn,requireRole('manager'), function(req, res, next) {
  res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
  res.render('manager/index');
});

router.get('/getUserConnected',isLoggedIn,function(req,res){

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


router.get('/room',isLoggedIn,requireRole('manager'), function(req, res, next) {
  res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
  res.render('manager/room');
});


router.get('/roomList',isLoggedIn,requireRole('manager'), function(req, res, next) {
  res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
  res.render('manager/roomList');
});
router.get('/accountList',isLoggedIn,requireRole('manager'), function(req, res, next) {
  res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
  res.render('manager/account');
});
router.get('/addAccount',isLoggedIn,requireRole('manager'), function(req, res, next) {
  res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
  res.render('manager/addAccount');
});


router.get('/roomType',isLoggedIn,requireRole('manager'), function(req, res, next) {
  res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
  res.render('manager/roomType');
});

router.post('/addRoom',isLoggedIn,requireRole('manager'), function(req, res, next) {

  roomService.addroom(req.body,req.user.hotelId);
  res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
  res.render('manager/index')
});


router.get('/getRoomList',isLoggedIn,requireRole('manager'), function(req, res, next) {
roomService.getroomByIdHotel(req.user.hotelId,function(rows){
  res.json(rows);
})
});

router.get('/getReservationListByIdAccount',isLoggedIn,requireRole('manager'), function(req, res, next) {

  reservationService.getreservationForTheManager(req.user.id,function(rows){
  // var ress=JSON.stringify(rows)
  /// var a= ress.replace("[","");
  //  var b=a.replace("]","");

  //  console.log("result is "+ JSON.stringify(rows))
    res.json(JSON.stringify(rows));
  })
});

router.get('/getHotelById',requireRole('manager'),isLoggedIn, function(req,res){
  hotelService.gethotelById(req.user.hotelId, function(hotel){
    res.json(hotel);
  })

});

router.get('/getListAccountPerManagerId',isLoggedIn,requireRole('manager'), function(req, res, next) {

accountService.getListAccountPerManagerId(req.user.id,function(rows){
  res.json(rows);
})
});
router.post('/addAccount', function(req, res, next) {

  var user={
    first_name:req.body['register-firstname'],
    last_name:req.body['register-lastname'],
    email:req.body['register-email'],
    address:req.body['register-address'],
    managerId :req.user.id
  };

  pg.connect(conString,function (err,dbclient,ok) {

    if (err) {
      return console.error('could not connect to the database ' + err);
    }

    dbclient.query('select * from managers where email = $1',[req.body['register-email']],function(err,rows){

      if(rows.rows[0] != null){
        console.log('user duplicated');



        res.render('/manager/addAccount')
      }else{

        accountService.addAccountFromWebInterface(user);

        res.redirect('/manager/accountList');


      }
    });
    ok
  });
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

/***
 *
 * upload image section
 * @type {exports}
 */
var  cloudinary = require('cloudinary');
var fs = require('fs');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' });
cloudinary.config({ cloud_name: 'dvsfc8qz2', api_key: '835615685611319', api_secret: '2DzasRC3aTVDTOoZq13IcgEx0iY' });

router.post('/upload',upload.single('image'), function(req, res){
  if(req.file != undefined){
  var imageStream = fs.createReadStream(req.file.path);

  var cloudStream = cloudinary.uploader.upload_stream(function(result) {
    req.body.picture_url=result.url;
    roomTypeService.addroomType(req.body,req.user.hotelId)
    res.redirect('/manager/roomType');
  });

  imageStream.on('data', cloudStream.write).on('end', cloudStream.end);
  }else{
    req.body.picture_url="http://res.cloudinary.com/dvsfc8qz2/image/upload/v1475316049/gblgablh9etjq45kiefm.jpg"
    roomTypeService.addroomType(req.body,req.user.hotelId);
    res.redirect('/manager/roomType');  }
});


router.post('/addRoomWithImage',upload.single('image'), function(req, res){
  if(req.file != undefined) {
    var imageStream = fs.createReadStream(req.file.path);

    var cloudStream = cloudinary.uploader.upload_stream(function (result) {
      req.body.picture_url = result.url;
      roomService.addroom(req.body, req.user.hotelId);
      res.redirect('/manager/roomList');
    });

    imageStream.on('data', cloudStream.write).on('end', cloudStream.end);
  }else{
    roomService.addroom(req.body, req.user.hotelId);
    res.redirect('/manager/roomList')
  }
});

router.get('/getRoomType',requireRole('manager'),isLoggedIn,function(req,res){
  roomTypeService.getroomTypeByIdHotel(req.user.hotelId,function(result){

    res.json(result)
  })
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
