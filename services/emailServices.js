var nodemailer = require("nodemailer");
var configMail = require("./../config/emailConfig.json").smtpTConfig;

var smtpTransport = nodemailer.createTransport("SMTP",configMail);

var sendMail=function(user,email,subject,text){
    var mailOptions={
        to : email,
        subject :subject,
        generateTextFromHTML: true,

      // html : '<h3> hello '+user.first_name+" "+user.last_name+' </h3><br> your booking is successfully taken in charge with the reference: <br>'+text+'<br> you can downoald our mobile application from : <br> and use our new features'
         html:"<html><head>    <title></title>    <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>    <style type='text/css'>    #outlook a {        padding: 0;    }    .ReadMsgBody {    width: 100%;    }    .ExternalClass {     width: 100%;   }    .ExternalClass * {    line-height: 100%;}body {    margin: 0;    padding: 0;   -webkit-text-size-adjust: 100%;    -ms-text-size-adjust: 100%;}table,    td {    border-collapse: collapse;    mso-table-lspace: 0pt;  mso-table-rspace: 0pt;}img {    border: 0;  height: auto;     line-height: 100%;     outline: none;     text-decoration: none;     -ms-interpolation-mode: bicubic; }  p {     display: block;     margin: 13px 0; } </style>  <style type='text/css'> @media only screen and (max-width:480px) { @-ms-viewport {         width: 320px;     }       @viewport {         width: 320px;     } } </style>  <link href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700' rel='stylesheet' type='text/css'> <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700' rel='stylesheet' type='text/css'> <link href='https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700' rel='stylesheet' type='text/css'> <style type='text/css'> @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700); @import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700); @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700); </style>  <style type='text/css'> @media only screen and (min-width:480px) { .mj-column-per-66, * [aria-labelledby='mj-column-per-66'] {         width: 66%!important;     } .mj-column-per-33, * [aria-labelledby='mj-column-per-33'] {         width: 33%!important;     } .mj-column-per-100, * [aria-labelledby='mj-column-per-100'] {         width: 100%!important;     } .mj-column-per-50, * [aria-labelledby='mj-column-per-50'] {         width: 50%!important;     } } </style> </head>  <body style='background: #fce7b4;'> <div style='background-color:#fce7b4;'>  <table role='presentation' style='font-size:0px;width:100%;' cellspacing='0' cellpadding='0' border='0'> <tbody> <tr> <td> <div style='margin:0 auto;max-width:600px;'> <table role='presentation' style='font-size:0px;width:100%;' cellspacing='0' cellpadding='0' border='0' align='center'> <tbody> <tr> <td style='text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-bottom:20px;padding-top:20px;'>  <div aria-labelledby='mj-column-per-66' class='mj-column-per-66' style='vertical-align:middle;display:inline-block;font-size:13px;text-align:left;width:100%;'> <table role='presentation' style='vertical-align:middle;' width='100%' cellspacing='0' cellpadding='0' border='0'> <tbody> <tr> <td style='word-break:break-word;font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;padding-right:25px;padding-left:25px;' align='left'> <div style='cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:22px;'> <span style='font-size: 11px'></span> </div> </td> </tr> </tbody> </table> </div>  <div aria-labelledby='mj-column-per-33' class='mj-column-per-33' style='vertical-align:middle;display:inline-block;font-size:13px;text-align:left;width:100%;'> <table role='presentation' style='vertical-align:middle;' width='100%' cellspacing='0' cellpadding='0' border='0'> <tbody> <tr> <td style='word-break:break-word;font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;padding-right:25px;padding-left:25px;' align='right'> <div style='cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:22px;'> <span style='font-size: 11px'><a href='https://mjml.io' target='_blank' style='text-decoration: none; color: inherit'></a></span> </div> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div> </td> </tr> </tbody> </table>  <div style='margin:0 auto;max-width:600px;background:#ffffff;'> <table role='presentation' style='font-size:0px;width:100%;background:#ffffff;' cellspacing='0' cellpadding='0' border='0' align='center'> <tbody> <tr> <td style='text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-bottom:20px;padding-top:20px;'>  <div aria-labelledby='mj-column-per-100' class='mj-column-per-100' style='vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;'> <table role='presentation' style='vertical-align:top;' width='100%' cellspacing='0' cellpadding='0' border='0'> <tbody> <tr> <td style='word-break:break-word;font-size:0px;padding:10px 25px;padding-top:10px;padding-bottom:10px;padding-right:0px;padding-left:0px;' align='center'> <table role='presentation' style='border-collapse:collapse;border-spacing:0px;' cellspacing='0' cellpadding='0' border='0' align='center'> <tbody> <tr> <td style='width:150px;'><img alt='' title='' src='http://z2mx.mjt.lu/img/z2mx/b/lhu/rwt.png' style='border:none;border-radius:;display:block;outline:none;text-decoration:none;width:100%;height:auto;' width='150' height='auto'></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  <div style='margin:0 auto;max-width:600px;background:#ffffff;'> <table role='presentation' style='font-size:0px;width:100%;background:#ffffff;' cellspacing='0' cellpadding='0' border='0' align='center'> <tbody> <tr> <td style='text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-bottom:0px;padding-top:0px;'>  <div aria-labelledby='mj-column-per-100' class='mj-column-per-100' style='vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;'> <table role='presentation' style='vertical-align:top;' width='100%' cellspacing='0' cellpadding='0' border='0'> <tbody> <tr> <td style='word-break:break-word;font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;' align='center'> <table role='presentation' style='border-collapse:collapse;border-spacing:0px;' cellspacing='0' cellpadding='0' border='0' align='center'> <tbody> <tr> <td style='width:600px;'><img alt='' title='' src='http://z2mx.mjt.lu/img/z2mx/b/lhu/rw6.png' style='border:none;border-radius:;display:block;outline:none;text-decoration:none;width:100%;height:auto;' width='600' height='auto'></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  <div style='margin:0 auto;max-width:600px;background:#356cc7;'> <table role='presentation' style='font-size:0px;width:100%;background:#356cc7;' cellspacing='0' cellpadding='0' border='0' align='center'> <tbody> <tr> <td style='text-align:center;vertical-align:middle;font-size:0px;padding:20px 0px;padding-bottom:0px;padding-top:0px;'>  <div aria-labelledby='mj-column-per-100' class='mj-column-per-100' style='vertical-align:middle;display:inline-block;font-size:13px;text-align:left;width:100%;'> <table role='presentation' style='vertical-align:middle;' width='100%' cellspacing='0' cellpadding='0' border='0'> <tbody> <tr> <td style='word-break:break-word;font-size:0px;padding:10px 25px;padding-top:10px;padding-bottom:10px;padding-right:25px;padding-left:25px;' align='center'> <div style='cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;'> <p><span style='color: rgb(255, 255, 255);'></span></p> <p style='line-height:1.38;margin-top:0pt;margin-bottom:0pt;'><span style='font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;'><span style='font-size: 25px;'><span style='font-family: 'Open Sans', Helvetica, Arial, sans-serif;'><span style='color: rgb(119, 170, 255);'><span style='font-size: 15px;'>HELLO "+user.first_name +" </span></span> </span> </span> </span> </p> <p style='margin-top: 0pt; margin-bottom: 0pt;'> <font color='#77aaff' face='Open Sans, Helvetica, Arial, sans-serif'><span style='font-size: 15px; line-height: 20.7px; white-space: pre-wrap;'><span style='font-size: 20px;'><span style='color: rgb(255, 253, 253);'></span></span> </span> </font> </p> <p></p> </div> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  <div style='margin:0 auto;max-width:600px;background:#356cc7;'> <table role='presentation' style='font-size:0px;width:100%;background:#356cc7;' cellspacing='0' cellpadding='0' border='0' align='center'> <tbody> <tr> <td style='text-align:center;vertical-align:middle;font-size:0px;padding:20px 0px;padding-bottom:5px;padding-top:0px;'>  <div aria-labelledby='mj-column-per-100' class='mj-column-per-100' style='vertical-align:middle;display:inline-block;font-size:13px;text-align:left;width:100%;'> <table role='presentation' style='vertical-align:middle;' width='100%' cellspacing='0' cellpadding='0' border='0'> <tbody> <tr> <td style='word-break:break-word;font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;'> <p style='font-size:1px;margin:0 auto;border-top:2px solid #ffffff;width:100%;'></p>  </td> </tr> <tr> <td style='word-break:break-word;font-size:0px;padding:10px 25px;padding-top:10px;padding-bottom:10px;padding-right:25px;padding-left:25px;' align='center'> <div style='cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;'> <p><span style='color: rgb(255, 255, 255);'></span></p> <p style='line-height:1.38;margin-top:0pt;margin-bottom:0pt;'><strong style='font-family: Roboto, Helvetica, Arial, sans-serif; font-size: 14.6667px; white-space: pre-wrap; line-height: 1.38; background-color: transparent;'><span style='font-size: 25px;'><span style='color: rgb(255, 255, 255);'>Thank you very much for your reservation.</span></span></strong></p> <p style='line-height:1.38;margin-top:0pt;margin-bottom:0pt;'><span style='font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;'><span style='font-family: Roboto, Helvetica, Arial, sans-serif;'><span style='color: rgb(255, 255, 255);'>Please find the receipt below.</span></span> </span> </p> <p></p> </div> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  <div style='margin:0 auto;max-width:600px;background:#568feb;'> <table role='presentation' style='font-size:0px;width:100%;background:#568feb;' cellspacing='0' cellpadding='0' border='0' align='center'> <tbody> <tr> <td style='text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-bottom:5px;padding-top:5px;'>  <div aria-labelledby='mj-column-per-33' class='mj-column-per-33' style='vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;'> <table role='presentation' style='vertical-align:top;' width='100%' cellspacing='0' cellpadding='0' border='0'> <tbody> <tr> <td style='word-break:break-word;font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;padding-right:25px;padding-left:25px;' align='center'> <div style='cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;'> <p><span style='font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;'><span style='font-family: Roboto, Helvetica, Arial, sans-serif;'><span style='color: rgb(255, 255, 255);'><strong>reservation Number</strong></span></span> </span> </p> </div> </td> </tr> <tr> <td style='word-break:break-word;font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;padding-right:25px;padding-left:25px;' align='center'> <div style='cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;'> <p><span style='font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;'><span style='color: rgb(247, 247, 247);'>"+ text+"</span></span> </p> </div> </td> </tr> </tbody> </table> </div>  <div aria-labelledby='mj-column-per-33' class='mj-column-per-33' style='vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;'> <table role='presentation' style='vertical-align:top;' width='100%' cellspacing='0' cellpadding='0' border='0'> <tbody> <tr> <td style='word-break:break-word;font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;padding-right:25px;padding-left:25px;' align='center'> <div style='cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;'> <p><span style='font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;'><span style='font-family: Roboto, Helvetica, Arial, sans-serif;'><span style='color: rgb(255, 255, 255);'><strong></strong></span></span> </span> </p> </div> </td> </tr> <tr> <td style='word-break:break-word;font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;padding-right:25px;padding-left:25px;' align='center'> <div style='cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;'> <p><span style='font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;'><span style='color: rgb(247, 247, 247);'></span></span> </p> </div> </td> </tr> </tbody> </table> </div>  <div aria-labelledby='mj-column-per-33' class='mj-column-per-33' style='vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;'> <table role='presentation' style='vertical-align:top;' width='100%' cellspacing='0' cellpadding='0' border='0'> <tbody> <tr> <td style='word-break:break-word;font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;padding-right:25px;padding-left:25px;' align='center'> <div style='cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;'> <p> <font color='#ffffff' face='Roboto, Helvetica, Arial, sans-serif'><span style='font-size: 14.6667px; white-space: pre-wrap;'><b></b></span></font> </p> </div> </td> </tr> <tr> <td style='word-break:break-word;font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;padding-right:25px;padding-left:25px;' align='center'> <div style='cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;'> <p><span style='font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;'><span style='color: rgb(247, 247, 247);'></span></span> </p> </div> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  <div style='margin:0 auto;max-width:600px;background:#356CC7;'> <table role='presentation' style='font-size:0px;width:100%;background:#356CC7;' cellspacing='0' cellpadding='0' border='0' align='center'> <tbody> <tr> <td style='text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-bottom:20px;padding-top:20px;'>  <div aria-labelledby='mj-column-per-50' class='mj-column-per-50' style='vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;'> <table role='presentation' style='vertical-align:top;' width='100%' cellspacing='0' cellpadding='0' border='0'> <tbody> <tr> <td style='word-break:break-word;background:transparent;font-size:0px;padding:15px 30px;padding-top:10px;padding-bottom:10px;padding-right:25px;padding-left:25px;' background='transparent' align='center'> <table role='presentation' style='border-collapse:separate;' cellspacing='0' cellpadding='0' border='0' align='center'> <tbody> <tr> <td style='border:none;border-radius:10px;color:#FFFFFF;cursor:auto;padding:10px 25px;' valign='top' bgcolor='#ffae00' align='center'> <a href='https://mjml.io' style='display:inline-block;text-decoration:none;background:#ffae00;color:#FFFFFF;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;margin:0px;' target='_blank'> <span style='font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;'><strong><span style='color: rgb(255, 255, 255);'>Download Mobile Access App</span></strong> </span> </a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  <div aria-labelledby='mj-column-per-50' class='mj-column-per-50' style='vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;'> <table role='presentation' style='vertical-align:top;' width='100%' cellspacing='0' cellpadding='0' border='0'> <tbody> <tr> <td style='word-break:break-word;background:transparent;font-size:0px;padding:15px 30px;padding-top:10px;padding-bottom:10px;padding-right:25px;padding-left:25px;' background='transparent' align='center'> <table role='presentation' style='border-collapse:separate;' cellspacing='0' cellpadding='0' border='0' align='center'> <tbody> <tr> <td style='border:none;border-radius:10px;color:#FFFFFF;cursor:auto;padding:10px 25px;' valign='top' bgcolor='#ffae00' align='center'> <a href='https://mjml.io' style='display:inline-block;text-decoration:none;background:#ffae00;color:#FFFFFF;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;margin:0px;' target='_blank'> <span style='font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;'><strong><span style='color: rgb(255, 255, 255);'></span></strong> <span style='color: rgb(255, 255, 255);'><span style='font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;'><span style='font-family: Roboto, Helvetica, Arial, sans-serif;'><strong><span style='color: rgb(255, 255, 255);'> Track my Order</span></strong> </span> </span> </span> </span> </a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  <div style='margin:0 auto;max-width:600px;background:#356CC7;'> <table role='presentation' style='font-size:0px;width:100%;background:#356CC7;' cellspacing='0' cellpadding='0' border='0' align='center'> <tbody> <tr> <td style='text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-bottom:0px;padding-top:0px;'>  <div aria-labelledby='mj-column-per-100' class='mj-column-per-100' style='vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;'> <table role='presentation' style='vertical-align:top;' width='100%' cellspacing='0' cellpadding='0' border='0'> <tbody> <tr> <td style='word-break:break-word;font-size:0px;padding:10px 25px;padding-top:10px;padding-bottom:10px;padding-right:25px;padding-left:25px;' align='center'> <div style='cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;'> <p></p> <p style='line-height:1.38;margin-top:0pt;margin-bottom:0pt;'><span style='font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;'><span style='font-family: Roboto, Helvetica, Arial, sans-serif;'><span style='color: rgb(255, 255, 255);'>Best,</span></span> </span> </p><span style='font-size:14.666666666666666px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;'><span style='font-family: Roboto, Helvetica, Arial, sans-serif;'><span style='color: rgb(255, 255, 255);'>The Mobile Pass Team</span></span> </span> <p></p> </div> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  <div style='margin:0 auto;max-width:600px;background:transparent;'> <table role='presentation' style='font-size:0px;width:100%;background:transparent;' cellspacing='0' cellpadding='0' border='0' align='center'> <tbody> <tr> <td style='text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-bottom:0px;padding-top:0px;'>  <div aria-labelledby='mj-column-per-100' class='mj-column-per-100' style='vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;'> <table role='presentation' style='vertical-align:top;' width='100%' cellspacing='0' cellpadding='0' border='0'> <tbody> <tr> <td style='word-break:break-word;background:transparent;font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;' background='transparent' align='center'> <table role='presentation' style='border-collapse:collapse;border-spacing:0px;' cellspacing='0' cellpadding='0' border='0' align='center'> <tbody> <tr> <td style='width:600px;'><img alt='' title='' src='http://z2mx.mjt.lu/img/z2mx/b/lhu/r07.png' style='border:none;border-radius:;display:block;outline:none;text-decoration:none;width:100%;height:auto;' width='600' height='auto'></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  <table role='presentation' style='font-size:0px;width:100%;' cellspacing='0' cellpadding='0' border='0'> <tbody> <tr> <td> <div style='margin:0 auto;max-width:600px;'> <table role='presentation' style='font-size:0px;width:100%;' cellspacing='0' cellpadding='0' border='0' align='center'> <tbody> <tr> <td style='text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-bottom:20px;padding-top:20px;'>  <div aria-labelledby='mj-column-per-100' class='mj-column-per-100' style='vertical-align:middle;display:inline-block;font-size:13px;text-align:left;width:100%;'> <table role='presentation' style='vertical-align:middle;' width='100%' cellspacing='0' cellpadding='0' border='0'> <tbody> <tr> <td style='word-break:break-word;font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;padding-right:25px;padding-left:25px;' align='center'> <div style='cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:22px;'> <p style='font-size: 11px'></p> </div> </td> </tr> <tr> <td style='word-break:break-word;font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;padding-right:25px;padding-left:25px;' align='center'> <div style='cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:22px;'> <p style='font-size: 11px'><span>   </span></p> </div> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div> </td> </tr> </tbody> </table>  </div>   </body></html>"
    }

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){

            console.log(error)
        }else{
            console.log("Message sent: " + response);
        }
    });

}


var sendMailToManager=function(user,subject){
    var mailOptions={
        to : user.email,
        subject :subject,
        generateTextFromHTML: true,
        html : '<h3> hello '+user.first_name+" "+user.last_name+' </h3><br> your account have been created successfully You can now log using your email address  <br> Your password is :'+user.first_name+' <br> '+'Please perform to change your password in your first connection'
    }

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){

            console.log(error)
        }else{
            console.log("Message sent: " + response);
        }
    });

}


var sendConfirmationMailToAccount=function(email,reservation,subject){
    var mailOptions={
        to : email,
        subject :subject,
        generateTextFromHTML: true,
       // html : '<h3> hello '+user.first_name+" "+user.last_name+' </h3><br> your account have been created successfully You can now log using your email address  <br> Your password is :'+user.first_name+' <br> '+'Please perform to change your password in your first connection'
        html: 'Your reservaation '+reservation.ref +' is confirmed for the periode '+reservation.start_date.toUTCString()+' till '+reservation.end_date.toUTCString()
    }

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){

            console.log(error)
        }else{
            console.log("Message sent: " + response);
        }
    });

}
var sendMailToManager=function(user,subject){
    var mailOptions={
        to : user.email,
        subject :subject,
        generateTextFromHTML: true,
        html : '<h3> hello '+user.first_name+" "+user.last_name+' </h3><br> your account have been created successfully You can now log using your email address  <br> Your password is :'+user.first_name+' <br> '+'Please perform to change your password in your first connection'
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
exports.sendMailToManager=sendMailToManager;
exports.sendConfirmationMailToAccount=sendConfirmationMailToAccount;