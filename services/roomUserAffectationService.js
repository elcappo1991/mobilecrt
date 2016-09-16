
var models=require('./../models');
var config = require('./../config/dbconfig.json');




/**
 * add roomUserAffectation is a function that add a roomUserAffectation
 * to the database
 * @param req
 * @param res
 *
 */
var addRoomUserAffectation=function(roomUserAffectation){

    models.roomUserAffectation.create(roomUserAffectation).then(function(){});
};

/**
 * this function delete a roomUserAffectation and take in parameter his id
 * @param data
 */
var deleteRoomUserAffectation=function(idroomUserAffectation){

    models.roomUserAffectation.findOne(idroomUserAffectation).then(function(roomUserAffectation) {

        roomUserAffectation.destroy();
    });
};
/**
 *
 * function that update a roomUserAffectation information
 * @param idroomUserAffectation
 * @param roomUserAffectation
 */
var updateRoomUserAffectation=function(idroomUserAffectation,roomUserAffectation){

    models.roomUserAffectation.findOne(idroomUserAffectation).then(function(roomUserAffectationToUpdate){

        roomUserAffectationToUpdate.update(roomUserAffectation);
    });

}

exports.addRoomUserAffectation=addRoomUserAffectation;
exports.deleteRoomUserAffectation=deleteRoomUserAffectation;
exports.updateRoomUserAffectation=updateRoomUserAffectation;


