
var models=require('./../models');
var config = require('./../config/dbconfig.json');




/**
 * add token is a function that add a token
 * to the database
 * @param req
 * @param res
 *
 */
var addToken=function(token){

    models.token.create(token).then(function(){});
};

/**
 * this function delete a token and take in parameter his id
 * @param data
 */
var deleteToken=function(idtoken){

    models.token.findOne(idtoken).then(function(token) {

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

    models.token.findOne(idtoken).then(function(tokenToUpdate){

        tokenToUpdate.update(token);
    });

}

exports.deleteToken=deleteToken;
exports.addToken=addToken;
exports.updateToken=updateToken;


