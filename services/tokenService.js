
var models=require('./../models');
var config = require('./../config/dbconfig.json');
var shortid=require('shortid');




/**
 * add token is a function that add a token
 * to the database
 * @param req
 * @param res
 *
 */
var addToken=function(token){
    token.key=generateToken();
    models.token.create(token).then(function(result){
        cb(result.dataValues)
    });
};

/**
 * this function delete a token and take in parameter his id
 * @param data
 */
var deleteToken=function(idtoken){

    models.token.findOne({where:{id:idtoken}}).then(function(token) {

        token.destroy();
    });
};
/**
 *
 * function that update a token information
 * @param idtoken
 * @param token
 */
var updateToken=function(idtoken,token){

    models.token.findOne({where:{id:idtoken}}).then(function(tokenToUpdate){

        tokenToUpdate.update(token);
    });

}


/**
 * function that return all tokens
 * @param cb
 */
var getAllToken=function(cb){

    models.token.findAll().then(function(rows){
        return cb(rows);
    })
}


/**
 * function that return a token by their id
 * @param idToken
 */
var getLockById=function(idToken,cb){

    models.manager.findOne({where:{id: idToken}}).then(function(tokenFound){

        return cb(tokenFound);
    })

}


var generateToken=function(){

    shortid.characters('0123456789abcdefghijk@mnopqrstuvwxyzABCDEFGH#JKLMN-PQRSTUVWXYZ*_');
    generatedPass=shortid.generate();
    return generatedPass;
}

exports.deleteToken=deleteToken;
exports.addToken=addToken;
exports.updateToken=updateToken;
exports.getAllToken=getAllToken;
exports.getLockById=getLockById;


