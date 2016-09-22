
var models=require('./../models');
var config = require('./../config/dbconfig.json');




/**
 * add room is a function that add a room
 * to the database
 * @param req
 * @param res
 *
 */
var addroom=function(room){

    models.room.create(room).then(function(){});
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
var updateroom=function(idroom,room){

    models.room.findOne({where:{id:idroom}}).then(function(roomToUpdate){

        roomToUpdate.update(room);
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

    models.manager.findOne({where:{id: idroom}}).then(function(roomfound){

        return cb(roomfound);
    })

}
exports.deleteroom=deleteroom;
exports.addroom=addroom;
exports.updateroom=updateroom;
exports.getAllroom=getAllroom;
exports.getoomById=getroomById;


