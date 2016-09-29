
var models=require('./../models');
var config = require('./../config/dbconfig.json');




/**
 * add hotel is a function that add a hotel
 * to the database
 * @param req
 * @param res
 *
 */
var addhotel=function(hotel,idManager){
    hotel.owner_id=idManager;
    hotel.latitude= parseFloat( hotel.latitude);
    hotel.longitude= parseFloat( hotel.longitude);
    models.hotel.create(hotel).then(function(){
        console.log('add hotel succeed')
    });
};

/**
 * this function delete a hotel and take in parameter his id
 * @param data
 */
var deletehotel=function(idhotel,cb){

    models.hotel.findOne({where:{id:idhotel}}).then(function(hotel) {

        cb(hotel.destroy());
    });
};
/**
 * function that updates   a hotel
 * @param idhotel
 * @param hotel
 */
var updatehotel=function(idhotel,hotel,cb){
    console.log(idhotel)
    models.hotel.findOne({where:{
        id:idhotel
    }
    }).then(function(hotelToUpdate){
        console.log("**************"+hotelToUpdate)
        cb(hotelToUpdate.update(hotel).then(function(){}))
    });

}

/**
 * function that return all hotels
 * @param cb
 */
var getAllhotel=function(cb){

    models.hotel.findAll().then(function(rows){
        return cb(rows);
    })
}


/**
 * function that return a hotel by their id
 * @param idManager
 */
var gethotelById=function(idhotel,cb){

    models.hotel.findOne({where:{id: idhotel}}).then(function(hotelfound){

        return cb(hotelfound.dataValues);
    })

}


/**
 * function that return a hotel by their id
 * @param idManager
 */
var gethotelByIdManager=function(idManager,cb){

    models.hotel.findAll({where:{owner_id: idManager}}).then(function(hotelfound){

        return cb(hotelfound);
    })

}
exports.deletehotel=deletehotel;
exports.addhotel=addhotel;
exports.updatehotel=updatehotel;
exports.getAllhotel=getAllhotel;
exports.getoomById=gethotelById;
exports.gethotelByIdManager=gethotelByIdManager;


