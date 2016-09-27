
var models=require('./../models');
var config = require('./../config/dbconfig.json');
var emailService=require('./emailServices');
var accountService=require('./accountService');
var roomService=require('./roomService');
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
    models.reservation.create(reservation).then(function(addedReservation){
        for (i=0;i<reservation.room_id.length;i++){
            console.log(reservation.room_id[i]);
            roomService.getoomById(reservation.room_id[i],function(room){


         var    roomToUpdate={
                 id:room.id,
                 type:room.type,
                 description:room.description,
                 bed_number: room.bed_number,
                 lock_id: room.lock_id,
                 createdAt: room.createdAt,
                 managerId: room.managerId,
                 reservationId: addedReservation.id
             };

                roomService.updateroom(room.id,roomToUpdate,function(updated){
                    console.log('room u+room updated' +updated)
                });

            })

        }
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

/**
 * function that return a reservation by their id
 * @param idManager
 */
var getreservationForTheManager=function(userConnected,cb){
    var reservationList = [];
        var j =0;
        models.account.findAll({where:{managerId:userConnected}}).then(function(accounts){

            for(i=0;i<accounts.length;i++){

                models.reservation.findAll({where:{accountId: accounts[i].id}}).then(function(reservationfound){

                    reservationList = reservationList.concat(reservationfound);
                    if(i == (accounts.length)){

                        j++;
                        if(j==i ){
                            cb(reservationList)
                        }



                    }
                });

                console.log('cacacacacac')
        }


        });

    console.log('terminer')
}
exports.deletereservation=deletereservation;
exports.addreservation=addreservation;
exports.updatereservation=updatereservation;
exports.getAllreservation=getAllreservation;
exports.getreservationByIdAccount=getreservationByIdAccount;
exports.getreservationForTheManager=getreservationForTheManager;


