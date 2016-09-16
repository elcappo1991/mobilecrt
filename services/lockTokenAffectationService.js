
var models=require('./../models');
var config = require('./../config/dbconfig.json');




/**
 * add lockTokenAffectation is a function that add a lockTokenAffectation
 * to the database
 * @param req
 * @param res
 *
 */
var addLockTokenAffectation=function(lockTokenAffectation){

    models.lockTokenAffectation.create(lockTokenAffectation).then(function(){});
};

/**
 * this function delete a lockTokenAffectation and take in parameter his id
 * @param data
 */
var deleteLockTokenAffectation=function(idlockTokenAffectation){

    models.lockTokenAffectation.findOne(idlockTokenAffectation).then(function(lockTokenAffectation) {

        lockTokenAffectation.destroy();
    });
};
/**
 *
 * function that update a lockTokenAffectation information
 * @param idlockTokenAffectation
 * @param lockTokenAffectation
 */
var updateLockTokenAffectation=function(idlockTokenAffectation,lockTokenAffectation){

    models.lockTokenAffectation.findOne(idlockTokenAffectation).then(function(lockTokenAffectationToUpdate){

        lockTokenAffectationToUpdate.update(lockTokenAffectation);
    });

}

exports.addLockTokenAffectation=addLockTokenAffectation;
exports.deleteLockTokenAffectation=deleteLockTokenAffectation;
exports.updateLockTokenAffectation=updateLockTokenAffectation;


