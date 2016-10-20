
var models=require('./../models');
var config = require('./../config/dbconfig.json');
var pg = require('pg');
//pg.defaults.ssl= true;
var conString = config.App.dbConfig.conString;



/**
 * add room is a function that add a room
 * to the database
 * @param req
 * @param res
 *
 */
var addroom=function(room,idHotel,cb){
    room.hotelId=idHotel;
    models.room.create(room).then(function(r){

        cb(r.dataValues);
    });
};

/**
 * this function delete a room and take in parameter his id
 * @param data
 */
var deleteroom=function(idroom,cb){

    models.room.findOne({where:{id:idroom}}).then(function(room) {

        cb(room.destroy());
    });
};
/**
 * function that updates   a room
 * @param idroom
 * @param room
 */
var updateroom=function(idroom,room,cb){
        console.log(idroom)
    models.room.findOne({where:{
        id:idroom
                                }
                        }).then(function(roomToUpdate){
                console.log("**************"+roomToUpdate)
        cb(roomToUpdate.update(room).then(function(){}))
    });

}
var affectRoomToReservation=function(resId,roomId,cb){

    models.room.findOne({where:{
        id:roomId
                                }
                        }).then(function(roomToUpdate){
          roomToUpdate.reservationId = resId;
        roomToUpdate.disponibility= false;

        cb(roomToUpdate.update(roomToUpdate.dataValues).then(function(){}))
});

}

var setRoomAvailable=function(roomId,cb){

    models.room.findOne({where:{
        id:roomId
                                }
                        }).then(function(roomToUpdate){
          roomToUpdate.reservationId = null;
        roomToUpdate.disponibility= true;

        cb(roomToUpdate.update(roomToUpdate.dataValues).then(function(){}))
    });

}

/**
 * function that return all rooms
 * @param cb
 */
var getAllroom=function(cb){

    models.room.findAll().then(function(rows){
        return cb(rows);
    })
}


/**
 * function that return a room by their id
 * @param idManager
 */
var getroomById=function(idroom,cb){

    models.room.findOne({where:{id: idroom}}).then(function(roomfound){

        return cb(roomfound.dataValues);
    })

}


/**
 * function that return a room by their id
 * @param idManager
 */
var getroomByIdHotel=function(idhotel,cb){

    models.room.findAll({where:{hotelId: idhotel}}).then(function(roomfound){

        return cb(roomfound);
    })

}

/**
 * this function return all affected room and their user
 */
var getAffectionRoom=function(hotelId,cb) {

    pg.connect(conString, function (err, dbclient, ok) {

        if (err) {

            return console.error('could not connect to the database ' + err);
        }

        dbclient.query('SELECT * FROM rooms where disponibility = false and "hotelId"=$1' ,[hotelId], function (err, rows) {
                if(err){console.log(err)}
            else{
                    var tab=[];

                    rows.rows.forEach(function(res){
                        models.reservation.findOne({where:{id: res.reservationId}}).then(function(reservationfound){

                           res.reservationFound=reservationfound.dataValues;
                            models.account.findOne({where:{id:reservationfound.dataValues.accountId }}).then(function(accountFound){
                                res.accountFound=accountFound.dataValues;
                               tab.push(res)

                            })

                        })

                    })
                    setTimeout(function(){ cb(tab)},500)


                }



        });


    })
}


/**
 * this function return all affected room and their user
 */
var getAvailableRoomByIdHotel=function(hotelId,cb) {

    pg.connect(conString, function (err, dbclient, ok) {

        if (err) {

            return console.error('could not connect to the database ' + err);
        }

        dbclient.query('SELECT * FROM rooms where disponibility = true and "hotelId"=$1' ,[hotelId], function (err, rows) {
            if(err){console.log(err)}
            else{
                 cb(rows.rows)

                }







        });


    })
}
/***
 * for cron job
 *
 * @param cb
 */
var getNonAvailableRoomForCronJob=function(cb) {

    pg.connect(conString, function (err, dbclient, ok) {

        if (err) {

            return console.error('could not connect to the database ' + err);
        }

        dbclient.query('SELECT * FROM rooms where disponibility = false ' , function (err, rows) {
            if(err){console.log(err)}
            else{
                 cb(rows.rows)

                }







        });


    })
}



exports.deleteroom=deleteroom;
exports.addroom=addroom;
exports.updateroom=updateroom;
exports.getAllroom=getAllroom;
exports.getoomById=getroomById;
exports.getroomByIdHotel=getroomByIdHotel;
exports.affectRoomToReservation=affectRoomToReservation;
exports.setRoomAvailable=setRoomAvailable;
exports.getAffectionRoom=getAffectionRoom;
exports.getAvailableRoomByIdHotel=getAvailableRoomByIdHotel;
exports.getNonAvailableRoomForCronJob=getNonAvailableRoomForCronJob;



