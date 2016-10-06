
var models=require('./../models');
var config = require('./../config/dbconfig.json');
var CryptoJS = require("crypto-js");
var cryptoConfig = require('./../config/cryptConf.json');
var pg = require('pg');
//pg.defaults.ssl= true;
var conString = config.App.dbConfig.conString;
var reservationService=require('./reservationService');

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
 * add account is a function that add a account
 * to the database
 * @param req
 * @param res
 *
 */
var addAccountFromWebInterface=function(account){

    //account.password = CryptoJS.AES.encrypt(account.password, cryptoConfig.cryptKey).toString();
    account.password = CryptoJS.AES.encrypt(account.first_name, cryptoConfig.cryptKey).toString();

    models.account.create(account).then(function(){
        console.log('user added succssfully !!!!!')
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

/**
 * function that return a account by their id
 * @param idaccount
 */
var getListAccountPerManagerId=function(idManager,cb){

    models.account.findAll({where:{managerId: idManager}}).then(function(accountFound){

        return cb(accountFound);
    })

}



/***
 * function that verify if the password entred by the account is really his password
 * @param idaccount
 * @param oldPassword
 * @param cb
 */
var verifiyPasswordMatch=function(idAccount,oldPassword,cb){

    pg.connect(conString,function (err,dbclient,ok) {

        if (err) {

            return console.error('could not connect to the database ' + err);
        }

        dbclient.query("SELECT * FROM accounts WHERE id = $1", [idAccount], function (err, rows) {

            if (( (CryptoJS.AES.decrypt(rows.rows[0].password.toString(), cryptoConfig.cryptKey).toString(CryptoJS.enc.Utf8)) == oldPassword)) {
                console.log('password matchs');
                return cb(true);

            }else{
                return cb(false);
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
var changePassword=function(idAccount,oldPassword,newPassword,cb){

   verifiyPasswordMatch(idAccount,oldPassword,function(res){
            if(res){
                models.account.findOne({where:{id:idAccount}}).then(function(accountToUpdate){

                    accountToUpdate.password=  CryptoJS.AES.encrypt(newPassword, cryptoConfig.cryptKey).toString();;
                    cb(accountToUpdate.update(accountToUpdate,{fields:['password']}));
                });

            }


        });



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
var getListAccountPerHotel= function(idHotel,cb) {

    var accountList = [];
    var j = 0;

    pg.connect(conString, function (err, dbclient, ok) {

        if (err) {

            return console.error('could not connect to the database ' + err);
        }

        dbclient.query('SELECT distinct "accountId" FROM reservations WHERE "hotel_id" = $1', [idHotel], function (err, rows) {

            if (err)
                console.log(err);
            else{
                for(i=0;i<rows.rows.length;i++){
                models.account.findOne({where:{id: rows.rows[i].accountId}}).then(function(reservationfound){

                    accountList = accountList.concat(reservationfound);

                    if(i == (rows.rows.length)){

                        j++;
                        if(j==i ){
                            cb(accountList)

                        }



                    }
                });

            }


            }



        });

    });
}


   /* models.reservation.findAll({where:{hotel_id:idHotel}}).then(function(reservation){

        for(i=0;i<reservation.length;i++){

            models.account.findAll({where:{accountId: reservation[i].accountId}}).then(function(reservationfound){

                reservationList = reservationList.concat(reservationfound);
                if(i == (accounts.length)){

                    j++;
                    if(j==i ){
                        cb(reservationList)
                    }



                }
            });


        }


    });*/




exports.changePassword=changePassword;
exports.getAccountById=getAccountById;
exports.getAllAccounts=getAllAccounts;
exports.updateAccount=updateAccount;
exports.deleteAccount=deleteAccount;
exports.addAccount=addAccount;
exports.checkInAccount=checkInAccount;
exports.checkOutAccount=checkOutAccount;
exports.getListAccountPerManagerId=getListAccountPerManagerId;
exports.addAccountFromWebInterface=addAccountFromWebInterface;
exports.getListAccountPerHotel=getListAccountPerHotel;
