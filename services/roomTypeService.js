
var models=require('./../models');
var config = require('./../config/dbconfig.json');




/**
 * add roomType is a function that add a roomType
 * to the database
 * @param req
 * @param res
 *
 */
var addroomType=function(roomType,idhotel){
    roomType.hotelId=idhotel;
    models.roomType.create(roomType).then(function(result){
    console.log(result)
    });
};

/**
 * this function delete a roomType and take in parameter his id
 * @param data
 */
var deleteroomType=function(idroomType,cb){

    models.roomType.findOne({where:{id:idroomType}}).then(function(roomType) {

        cb(roomType.destroy());
    });
};
/**
 * function that updates   a roomType
 * @param idroomType
 * @param roomType
 */
var updateroomType=function(idroomType,roomType,cb){
    console.log(idroomType)
    models.roomType.findOne({where:{
        id:idroomType
    }
    }).then(function(roomTypeToUpdate){
        console.log("**************"+roomTypeToUpdate)
        cb(roomTypeToUpdate.update(roomType).then(function(){}))
    });

}

/**
 * function that return all roomTypes
 * @param cb
 */
var getAllroomType=function(cb){

    models.roomType.findAll().then(function(rows){
        return cb(rows);
    })
}


/**
 * function that return a roomType by their id
 * @param idManager
 */
var getroomTypeById=function(idroomType,cb){

    models.roomType.findOne({where:{id: idroomType}}).then(function(roomTypefound){

        return cb(roomTypefound.dataValues);
    })

}


/**
 * function that return a roomType by their id
 * @param idManager
 */
var getroomTypeByIdHotel=function(idHotel,cb){

    models.roomType.findAll({where:{hotelId: idHotel}}).then(function(roomTypefound){

        return cb(roomTypefound);
    })

}
exports.deleteroomType=deleteroomType;
exports.addroomType=addroomType;
exports.updateroomType=updateroomType;
exports.getAllroomType=getAllroomType;
exports.getoomById=getroomTypeById;
exports.getroomTypeByIdHotel=getroomTypeByIdHotel;


