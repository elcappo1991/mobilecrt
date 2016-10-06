
var models=require('./../models');
var config = require('./../config/dbconfig.json');




/**
 * add option is a function that add a option
 * to the database
 * @param req
 * @param res
 *
 */
var addoption=function(option,idHotel){
    option.hotelId=idHotel;

    models.option.create(option).then(function(){
        console.log('add option succeed')
    });
};

/**
 * this function delete a option and take in parameter his id
 * @param data
 */
var deleteoption=function(idoption,cb){

    models.option.findOne({where:{id:idoption}}).then(function(option) {

        cb(option.destroy());
    });
};
/**
 * function that updates   a option
 * @param idoption
 * @param option
 */
var updateoption=function(idoption,option,cb){
    console.log(idoption)
    models.option.findOne({where:{
        id:idoption
    }
    }).then(function(optionToUpdate){
        console.log("**************"+optionToUpdate)
        cb(optionToUpdate.update(option).then(function(){}))
    });

}

/**
 * function that return all options
 * @param cb
 */
var getAlloption=function(cb){

    models.option.findAll().then(function(rows){
        return cb(rows);
    })
}


/**
 * function that return a option by their id
 * @param idManager
 */
var getoptionById=function(idoption,cb){

    models.option.findOne({where:{id: idoption}}).then(function(optionfound){

        return cb(optionfound.dataValues);
    })

}


/**
 * function that return a option by their id
 * @param idManager
 */
var getoptionByIdHotel=function(idHotel,cb){

    models.option.findAll({where:{hotelId: idHotel}}).then(function(optionfound){

        return cb(optionfound);
    })

}
exports.deleteoption=deleteoption;
exports.addoption=addoption;
exports.updateoption=updateoption;
exports.getAlloption=getAlloption;
exports.getoptionById=getoptionById;
exports.getoptionByIdHotel=getoptionByIdHotel;


