
var models=require('./../models');
var config = require('./../config/dbconfig.json');
var CryptoJS = require("crypto-js");
var cryptoConfig = require('./../config/cryptConf.json');
var connection= require('./../dbconnector/dbconnector')


/**
 * add user is a function that add a user
 * to the database
 * @param req
 * @param res
 *
 */
var addUser=function(user){

    //user.password = CryptoJS.AES.encrypt(user.password, cryptoConfig.cryptKey).toString();
    user.password = CryptoJS.AES.encrypt('admin', cryptoConfig.cryptKey).toString();
    console.log(user)
    models.manager.create(user).then(function(){
    });
};

/**
 * this function delete a user and take in parameter his id
 * @param data
 */
var deleteUser=function(User,cb){

    models.manager.findOne({where:{id:User.id}}).then(function(user) {
        console.log('user to delete'+user.id);
        cb(user.destroy())

    });
};
/**
 *
 * function that update a user information
 * @param idUser
 * @param user
 */
var updateUser=function(idUser,user){

    models.manager.findOne(idUser).then(function(userToUpdate){

        userToUpdate.update(user);
    });

}


/***
 * get All
 * @type {Function}
 */
var getAllUsers=function(cb){

    models.manager.findAll().then(function(rows){

        return cb(rows);
    })

}
exports.deleteUser=deleteUser;
exports.addUser=addUser;
exports.updateUser=updateUser;
exports.getAllUsers=getAllUsers;


