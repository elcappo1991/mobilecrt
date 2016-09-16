
var models=require('./../models');
var config = require('./../config/dbconfig.json');




/**
 * add userTokenAffectation is a function that add a userTokenAffectation
 * to the database
 * @param req
 * @param res
 *
 */
var addUserTokenAffectation=function(userTokenAffectation){

    models.userTokenAffectation.create(userTokenAffectation).then(function(){});
};

/**
 * this function delete a userTokenAffectation and take in parameter his id
 * @param data
 */
var deleteUserTokenAffectation=function(iduserTokenAffectation){

    models.userTokenAffectation.findOne(iduserTokenAffectation).then(function(userTokenAffectation) {

        userTokenAffectation.destroy();
    });
};
/**
 *
 * function that update a userTokenAffectation information
 * @param iduserTokenAffectation
 * @param userTokenAffectation
 */
var updateUserTokenAffectation=function(iduserTokenAffectation,userTokenAffectation){

    models.userTokenAffectation.findOne(iduserTokenAffectation).then(function(userTokenAffectationToUpdate){

        userTokenAffectationToUpdate.update(userTokenAffectation);
    });

}

exports.addUserTokenAffectation=addUserTokenAffectation;
exports.deleteUserTokenAffectation=deleteUserTokenAffectation;
exports.updateUserTokenAffectation=updateUserTokenAffectation;


