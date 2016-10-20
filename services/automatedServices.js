var cron = require('node-cron');
/*
 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
 */
var roomService =require('./roomService')
var reservationService=require('./reservationService');
console.log("Cron Job launched ");
cron.schedule('0 */30 * * * *', function(){
//cron.schedule('* * * * * *', function(){

 roomService.getNonAvailableRoomForCronJob(function(rows){
   if(rows.length !=0){
   rows.forEach(function(room){

      reservationService.getreservationById(room.reservationId,function(reservation){


       if(reservation[0].dataValues.end_date>new Date()==false){

        roomService.setRoomAvailable(room.id,function(){console.log("room set to available")})
       }

      })

   })

   }else{
    console.log("Cron Job :nothing to do ");
   }

 })

});



