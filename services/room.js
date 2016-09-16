
var models=require('./../models');
var config = require('./../config/dbconfig.json');




/**
 *  is a function that add a room
 * to the database
 * @param req
 * @param res
 *
 */
var addRoom=function(room){

    models.room.create(room).then(function(){});
};

/**
 * this function delete a user and take in parameter his id
 * @param data
 */
var deleteRoom=function(idRoom){

    models.room.findOne(idRoom).then(function(room) {

        room.destroy();
    });
};
/**
 * this function update room information
 * @param idRoom
 * @param room
 */
var updateRoom=function(idRoom,room){

    models.room.findOne(idRoom).then(function(roomToUpdate){

        roomToUpdate.update(room);
    });

}

exports.addRoom=addRoom;
exports.deleteRoom=deleteRoom;
exports.updateRoom=updateRoom;


