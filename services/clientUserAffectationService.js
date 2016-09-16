
var models=require('./../models');
var config = require('./../config/dbconfig.json');




/**
 * add clientUserAffectation is a function that add a clientUserAffectation
 * to the database
 * @param req
 * @param res
 *
 */
var addClientUserAffectation=function(clientUserAffectation){

    models.clientUserAffectation.create(clientUserAffectation).then(function(){});
};

/**
 * this function delete a clientUserAffectation and take in parameter his id
 * @param data
 */
var deleteClientUserAffectation=function(idclientUserAffectation){

    models.clientUserAffectation.findOne(idclientUserAffectation).then(function(clientUserAffectation) {

        clientUserAffectation.destroy();
    });
};
/**
 *
 * function that update a clientUserAffectation information
 * @param idclientUserAffectation
 * @param clientUserAffectation
 */
var updateClientUserAffectation=function(idclientUserAffectation,clientUserAffectation){

    models.clientUserAffectation.findOne(idclientUserAffectation).then(function(clientUserAffectationToUpdate){

        clientUserAffectationToUpdate.update(clientUserAffectation);
    });

}

exports.addClientUserAffectation=addClientUserAffectation;
exports.deleteClientUserAffectation=deleteClientUserAffectation;
exports.updateClientUserAffectation=updateClientUserAffectation;


