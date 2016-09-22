
var models=require('./../models');
var config = require('./../config/dbconfig.json');
var CryptoJS = require("crypto-js");
var cryptoConfig = require('./../config/cryptConf.json');
var pg = require('pg');
//pg.defaults.ssl= true;
var conString = config.App.dbConfig.conString;


/**
 * add user is a function that add a user
 * to the database
 * @param req
 * @param res
 *
 */
var addUser=function(user){

    //user.password = CryptoJS.AES.encrypt(user.password, cryptoConfig.cryptKey).toString();
    if(user.password ==null){
        user.password = CryptoJS.AES.encrypt(user.first_name, cryptoConfig.cryptKey).toString();

    }
    else{
        user.password = CryptoJS.AES.encrypt(user.password, cryptoConfig.cryptKey).toString();
    }

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

    models.manager.findOne({where:{id:idUser}}).then(function(userToUpdate){

        userToUpdate.update(user);
    });

}


/***
 * get All managers
 * @type {Function}
 */
var getAllManagers=function(cb){

    models.manager.findAll({where:{role:'manager'}}).then(function(rows){

        return cb(rows);
    })

}

/**
 * function that return a manager by their id
 * @param idManager
 */
var getManagerById=function(idManager,cb){

    models.manager.findOne({where:{id: idManager}}).then(function(managerfound){

        return cb(managerfound);
    })

}
/***
 * function that change manager password
 * @param idManager
 * @param oldPassword
 * @param newPassword
 */
var changePassword=function(idManager,oldPassword,newPassword,cb){
        console.log('inside chande password function in managerService.js file');
    verifiyPasswordMatch(idManager,oldPassword,function(res){
        console.log(res+"********")
        if(res){
            models.manager.findOne({where:{id:idManager}}).then(function(managerToUpdate){
                console.log(managerToUpdate)
                managerToUpdate.password=  CryptoJS.AES.encrypt(newPassword, cryptoConfig.cryptKey).toString();;
                cb(managerToUpdate.update(managerToUpdate,{fields:['password']}));
            });

        }

    });



}


/***
 * function that verify if the password entred by the manager is really his password
 * @param idMAnager
 * @param oldPassword
 * @param cb
 */
var verifiyPasswordMatch=function(idMAnager,oldPassword,cb){

    pg.connect(conString,function (err,dbclient,ok) {

        if (err) {

            return console.error('could not connect to the database ' + err);
        }

        dbclient.query("SELECT * FROM managers WHERE id = $1", [idMAnager], function (err, rows) {

            if (( (CryptoJS.AES.decrypt(rows.rows[0].password.toString(), cryptoConfig.cryptKey).toString(CryptoJS.enc.Utf8)) == oldPassword)) {
                console.log('password matchs');
           return cb(true);

            }else{
                return cb(false);
            }
        });


    });

}


/***
 * function that return the list account reserved to a specific manager
 * @param idManager
 * @param cb
 */
var getListAccountByIdManager=function(idManager,cb){

    pg.connect(conString,function (err,dbclient,ok) {

        if (err) {

            return console.error('could not connect to the database ' + err);
        }

        dbclient.query("SELECT * FROM accounts WHERE managerId = $1", [idManager], function (err, rows) {

            return cb(rows);

        });


    });

}

/***
 * function that return lock list owned by the manager
 * @param idManager
 */
var getListLockByIdManager=function(idManager){

    pg.connect(conString,function (err,dbclient,ok) {

        if (err) {

            return console.error('could not connect to the database ' + err);
        }

        dbclient.query("SELECT * FROM locks WHERE managerId = $1", [idManager], function (err, rows) {

            return cb(rows);

        });


    });


}



exports.deleteUser=deleteUser;
exports.addUser=addUser;
exports.updateUser=updateUser;
exports.getAllManagers=getAllManagers;
exports.getManagerById=getManagerById;
exports.changePassword=changePassword;
exports.getListAccountByIdManager=getListAccountByIdManager;
exports.getListLockByIdManager=getListLockByIdManager;


