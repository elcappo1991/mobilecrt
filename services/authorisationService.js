
var models=require('./../models');
var config = require('./../config/dbconfig.json');
var CryptoJS = require("crypto-js");
var cryptoConfig = require('./../config/cryptConf.json');
var pg = require('pg');
//pg.defaults.ssl= true;
var conString = config.App.dbConfig.conString;


/**
 * add authorisation is a function that add a authorisation
 * to the database
 * @param req
 * @param res
 *
 */
var addAuthorisation=function(authorisation){

   // authorisation.password = CryptoJS.AES.encrypt(authorisation.password, cryptoConfig.cryptKey).toString();
    //authorisation.password = CryptoJS.AES.encrypt(authorisation.first_name, cryptoConfig.cryptKey).toString();

    models.authorisation.create(authorisation).then(function(){
    });
};

/**
 * this function delete a authorisation and take in parameter his id
 * @param data
 */
var deleteAuthorisation=function(authorisation,cb){

    models.authorisation.findOne({where:{id:authorisation.id}}).then(function(authorisation) {
        console.log('authorisation to delete'+authorisation.id);
        cb(authorisation.destroy())

    });
};
/**
 *
 * function that update a authorisation information
 * @param idauthorisation
 * @param authorisation
 */
var updateAuthorisation=function(idAuthorisation,authorisation){

    models.authorisation.findOne({where:{id:idAuthorisation}}).then(function(authorisationToUpdate){

        authorisationToUpdate.update(authorisation);
    });

}


/***
 * get All authorisations
 * @type {Function}
 */
var getAllAuthorisations=function(cb){

    models.authorisation.findAll().then(function(rows){

        return cb(rows);
    })

}

/**
 * function that return a authorisation by their id
 * @param idauthorisation
 */
var getAuthorisationById=function(idAuthorisation,cb){

    models.authorisation.findOne({where:{id: idAuthorisation}}).then(function(authorisationFound){

        return cb(authorisationFound);
    })

}



addAuthorisation.exports=addAuthorisation;
deleteAuthorisation.expors=deleteAuthorisation;
updateAuthorisation.expors=updateAuthorisation;
getAuthorisationById.expors=getAuthorisationById;
getAllAuthorisations.expors=getAllAuthorisations;
