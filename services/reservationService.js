
var models=require('./../models');
var config = require('./../config/dbconfig.json');
var emailService=require('./emailServices');
var accountService=require('./accountService');
var shortid=require('shortid');




/**
 * add reservation is a function that add a reservation
 * to the database
 * @param req
 * @param res
 *
 */
var addreservation=function(reservation,idAccount){
    shortid.characters('0123456789abcdefghijk@mnopqrstuvwxyzABCDEFGH#JKLMN-PQRSTUVWXYZ*_');
   var start_date  = new Date( reservation.start_date.toString() );
  var end_date  = new Date( reservation.end_date.toString() );

    reservation.start_date =start_date;
    reservation.end_date = end_date;
    reservation.accountId = idAccount;
    reservation.ref = shortid.generate();
    models.reservation.create(reservation).then(function(){
        accountService.getAccountById(idAccount,function(account){

            emailService.senMail(account,account.email,"Congratulation",reservation.ref);
        });

    });
};

/**
 * this function delete a reservation and take in parameter his id
 * @param data
 */
var deletereservation=function(idreservation,cb){

    models.reservation.findOne({where:{id:idreservation}}).then(function(reservation) {

        cb(reservation.destroy());
    });
};
/**
 * function that updates   a reservation
 * @param idreservation
 * @param reservation
 */
var updatereservation=function(idreservation,reservation){

    models.reservation.findOne({where:{id:idreservation}}).then(function(reservationToUpdate){

        reservationToUpdate.update(reservation);
    });

}

/**
 * function that return all reservations
 * @param cb
 */
var getAllreservation=function(cb){

    models.reservation.findAll().then(function(rows){
        return cb(rows);
    })
}


/**
 * function that return a reservation by their id
 * @param idManager
 */
var getreservationByIdAccount=function(idAccount,cb){

    models.reservation.findAll({where:{accountId: idAccount}}).then(function(reservationfound){

        return cb(reservationfound);
    })

}
exports.deletereservation=deletereservation;
exports.addreservation=addreservation;
exports.updatereservation=updatereservation;
exports.getAllreservation=getAllreservation;
exports.getreservationByIdAccount=getreservationByIdAccount;


