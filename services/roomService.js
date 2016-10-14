
var models=require('./../models');
var config = require('./../config/dbconfig.json');




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

        cb(roomToUpdate.update(room).then(function(){}))
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




exports.deleteroom=deleteroom;
exports.addroom=addroom;
exports.updateroom=updateroom;
exports.getAllroom=getAllroom;
exports.getoomById=getroomById;
exports.getroomByIdHotel=getroomByIdHotel;
exports.affectRoomToReservation=affectRoomToReservation;
exports.setRoomAvailable=setRoomAvailable;



