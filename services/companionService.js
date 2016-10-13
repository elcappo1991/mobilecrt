
var models=require('./../models');
var config = require('./../config/dbconfig.json');
var accountService=require('./accountService');
var pg = require('pg');
//pg.defaults.ssl= true;
var conString = config.App.dbConfig.conString;


/**
 * add companion is a function that add a companion
 * to the database
 * @param req
 * @param res
 *
 */
var addcompanion=function(companion){


    models.companion.create(companion).then(function(){
        console.log('add companion succeed')
    });
};

/**
 * this function delete a companion and take in parameter his id
 * @param data
 */
var deletecompanion=function(idcompanion,cb){

    models.companion.findOne({where:{id:idcompanion}}).then(function(companion) {

        cb(companion.destroy());
    });
};
/**
 * function that updates   a companion
 * @param idcompanion
 * @param companion
 */
var updatecompanion=function(idcompanion,companion,cb){
    console.log(idcompanion)
    models.companion.findOne({where:{
        id:idcompanion
    }
    }).then(function(companionToUpdate){
        console.log("**************"+companionToUpdate)
        cb(companionToUpdate.update(companion).then(function(){}))
    });

}

/**
 * function that return all companions
 * @param cb
 */
var getAllcompanion=function(cb){

    models.companion.findAll().then(function(rows){
        return cb(rows);
    })
}


/**
 * function that return a companion by their id
 * @param idManager
 */
var getcompanionById=function(idcompanion,cb){

    models.companion.findOne({where:{id: idcompanion}}).then(function(companionfound){

        return cb(companionfound.dataValues);
    })

}


/**
 * function that return a companion by their id
 * @param idManager
 */
var getcompanionByIdReservation=function(idReservation,cb){

    var accountList = [];
    var j = 0;

    pg.connect(conString, function (err, dbclient, ok) {

        if (err) {

            return console.error('could not connect to the database ' + err);
        }

        dbclient.query('SELECT  "id_companion" FROM companions WHERE "reservation_id" = $1', [idReservation], function (err, rows) {

            if (err)
                console.log(err);
            else{
                console.log(rows)
                for(i=0;i<rows.rows.length;i++){
                    models.account.findOne({where:{id: rows.rows[i].id_companion}}).then(function(accountFound){

                        accountList = accountList.concat(accountFound);

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



};

exports.deletecompanion=deletecompanion;
exports.addcompanion=addcompanion;
exports.updatecompanion=updatecompanion;
exports.getAllcompanion=getAllcompanion;
exports.getcompanionById=getcompanionById;
exports.getcompanionByIdReservation=getcompanionByIdReservation;


