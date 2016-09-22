var nodemailer = require("nodemailer");
var configMail = require("./../config/emailConfig.json").smtpTConfig;

var smtpTransport = nodemailer.createTransport("SMTP",configMail);

var sendMail=function(user,email,subject,text){
    var mailOptions={
        to : email,
        subject :subject,
        generateTextFromHTML: true,
        html : '<h3> hello '+user.first_name+" "+user.last_name+' </h3><br> your booking is successfully taken in charge with the reference: <br>'+text+'<br> you can downoald our mobile application from : <br> and use our new features'
    }

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){

            console.log(error)
        }else{
            console.log("Message sent: " + response);
        }
    });

}


exports.senMail=sendMail;