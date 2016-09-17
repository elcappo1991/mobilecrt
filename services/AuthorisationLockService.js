
var models=require('./../models');
var config = require('./../config/dbconfig.json');
var CryptoJS = require("crypto-js");
var cryptoConfig = require('./../config/cryptConf.json');
var pg = require('pg');
pg.defaults.ssl= true;
var conString = config.App.dbConfig.conString;


/**
 * add authorisationLock is a function that add a authorisationLock
 * to the database
 * @param req
 * @param res
 *
 */
var addAuthorisationLock=function(authorisationLock){

    // authorisationLock.password = CryptoJS.AES.encrypt(authorisationLock.password, cryptoConfig.cryptKey).toString();
    //authorisationLock.password = CryptoJS.AES.encrypt(authorisationLock.first_name, cryptoConfig.cryptKey).toString();

    models.authorisationLock.create(authorisationLock).then(function(){
    });
};

/**
 * this function delete a authorisationLock and take in parameter his id
 * @param data
 */
var deleteAuthorisationLock=function(authorisationLock,cb){

    models.authorisationLock.findOne({where:{id:authorisationLock.id}}).then(function(authorisationLock) {
        console.log('authorisationLock to delete'+authorisationLock.id);
        cb(authorisationLock.destroy())

    });
};
/**
 *
 * function that update a authorisationLock information
 * @param idauthorisationLock
 * @param authorisationLock
 */
var updateAuthorisationLock=function(idAuthorisationLock,authorisationLock){

    models.authorisationLock.findOne({where:{id:idAuthorisationLock}}).then(function(authorisationLockToUpdate){

        authorisationLockToUpdate.update(authorisationLock);
    });

}


/***
 * get All authorisationLocks
 * @type {Function}
 */
var getAllAuthorisationLocks=function(cb){

    models.authorisationLock.findAll().then(function(rows){

        return cb(rows);
    })

}

/**
 * function that return a authorisationLock by their id
 * @param idauthorisationLock
 */
var getAuthorisationLockById=function(idAuthorisationLock,cb){

    models.authorisationLock.findOne({where:{id: idAuthorisationLock}}).then(function(authorisationLockFound){

        return cb(authorisationLockFound);
    })

}



addAuthorisationLock.exports=addAuthorisationLock;
deleteAuthorisationLock.expors=deleteAuthorisationLock;
updateAuthorisationLock.expors=updateAuthorisationLock;
getAuthorisationLockById.expors=getAuthorisationLockById;
getAllAuthorisationLocks.expors=getAllAuthorisationLocks;
