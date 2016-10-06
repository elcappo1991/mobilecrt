
var models=require('./../models');
var config = require('./../config/dbconfig.json');




/**
 * add roomOption is a function that add a roomOption
 * to the database
 * @param req
 * @param res
 *
 */
var addroomOption=function(idRoom,idOption){
    var roomOption={};
    roomOption.roomId=idRoom;
    roomOption.optionId=idOption;

    models.roomOption.create(roomOption).then(function(){
        console.log('add roomOption succeed')
    });
};

/**
 * this function delete a roomOption and take in parameter his id
 * @param data
 */
var deleteroomOption=function(idroomOption,cb){

    models.roomOption.findOne({where:{id:idroomOption}}).then(function(roomOption) {

        cb(roomOption.destroy());
    });
};
/**
 * function that updates   a roomOption
 * @param idroomOption
 * @param roomOption
 */
var updateroomOption=function(idroomOption,roomOption,cb){
    console.log(idroomOption)
    models.roomOption.findOne({where:{
        id:idroomOption
    }
    }).then(function(roomOptionToUpdate){
        console.log("**************"+roomOptionToUpdate)
        cb(roomOptionToUpdate.update(roomOption).then(function(){}))
    });

}

/**
 * function that return all roomOptions
 * @param cb
 */
var getAllroomOption=function(cb){

    models.roomOption.findAll().then(function(rows){
        return cb(rows);
    })
}


/**
 * function that return a roomOption by their id
 * @param idManager
 */
var getroomOptionById=function(idroomOption,cb){

    models.roomOption.findOne({where:{id: idroomOption}}).then(function(roomOptionfound){

        return cb(roomOptionfound.dataValues);
    })

}


/**
 * function that return a roomOption by their id
 * @param idManager
 */
var getroomOptionByIdRoom=function(idRoom,cb){

    models.roomOption.findAll({where:{roomId: idRoom}}).then(function(roomOptionfound){

        return cb(roomOptionfound);
    })

}
exports.deleteroomOption=deleteroomOption;
exports.addroomOption=addroomOption;
exports.updateroomOption=updateroomOption;
exports.getAllroomOption=getAllroomOption;
exports.getroomOptionById=getroomOptionById;

exports.getroomOptionByIdRoom=getroomOptionByIdRoom;


