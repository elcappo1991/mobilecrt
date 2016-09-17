
var models=require('./../models');
var config = require('./../config/dbconfig.json');
var CryptoJS = require("crypto-js");
var cryptoConfig = require('./../config/cryptConf.json');
var pg = require('pg');
pg.defaults.ssl= true;
var conString = config.App.dbConfig.conString;


/**
 * add account is a function that add a account
 * to the database
 * @param req
 * @param res
 *
 */
var addAccount=function(account){

    account.password = CryptoJS.AES.encrypt(account.password, cryptoConfig.cryptKey).toString();
    //account.password = CryptoJS.AES.encrypt(account.first_name, cryptoConfig.cryptKey).toString();

    models.account.create(account).then(function(){
    });
};

/**
 * this function delete a account and take in parameter his id
 * @param data
 */
var deleteAccount=function(account,cb){

    models.account.findOne({where:{id:account.id}}).then(function(account) {
        console.log('account to delete'+account.id);
        cb(account.destroy())

    });
};
/**
 *
 * function that update a account information
 * @param idaccount
 * @param account
 */
var updateAccount=function(idAccount,account){

    models.account.findOne({where:{id:idAccount}}).then(function(accountToUpdate){

        accountToUpdate.update(account);
    });

}


/***
 * get All accounts
 * @type {Function}
 */
var getAllAccounts=function(cb){

    models.account.findAll().then(function(rows){

        return cb(rows);
    })

}

/**
 * function that return a account by their id
 * @param idaccount
 */
var getAccountById=function(idAccount,cb){

    models.account.findOne({where:{id: idAccount}}).then(function(accountFound){

        return cb(accountFound);
    })

}


/***
 * function that verify if the password entred by the account is really his password
 * @param idaccount
 * @param oldPassword
 * @param cb
 */
var verifiyPasswordMatch=function(idAccount,oldPassword){

    pg.connect(conString,function (err,dbclient,ok) {

        if (err) {

            return console.error('could not connect to the database ' + err);
        }

        dbclient.query("SELECT * FROM accounts WHERE id = $1", [idAccount], function (err, rows) {

            if (( (CryptoJS.AES.decrypt(rows.rows[0].password.toString(), cryptoConfig.cryptKey).toString(CryptoJS.enc.Utf8)) == oldPassword)) {
                console.log('password matchs');
                return true;

            }else{
                return false;
            }
        })


    });

}


/***
 * function that change manager password
 * @param idManager
 * @param oldPassword
 * @param newPassword
 */
var changePassword=function(idAccount,oldPassword,newPassword){

    if(verifiyPasswordMatch(idAccount,oldPassword)){

        models.manager.findOne({where:{id:idManager}}).then(function(accountToUpdate){
            accountToUpdate.password=newPassword;
            accountToUpdate.update(accountToUpdate,{fields:['password']});
        });

    }else{
        return false;
    }


}

/***
 * function that set checkin value to true
 * @param idAccount
 */
var checkInAccount=function(idAccount){


    models.account.findOne({where:{id:idAccount}}).then(function(accountToUpdate){
        accountToUpdate.checkin=true;
        accountToUpdate.update(accountToUpdate,{fields:['chekin']});
    });

}

/***
 * function that set checkout value to true
 * @param idAccount
 */
var checkOutAccount=function(idAccount){


    models.account.findOne({where:{id:idAccount}}).then(function(accountToUpdate){
        accountToUpdate.checkout=true;
        accountToUpdate.update(accountToUpdate,{fields:['checkout']});
    });

}


exports.changePassword=changePassword;
exports.getAccountById=getAccountById;
exports.getAllAccounts=getAllAccounts;
exports.updateAccount=updateAccount;
exports.deleteAccount=deleteAccount;
exports.addAccount=addAccount;
exports.checkInAccount=checkInAccount;
exports.checkOutAccount=checkOutAccount;
