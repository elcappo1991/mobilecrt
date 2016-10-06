
var LocalStrategy   = require('passport-local').Strategy;

var cryptoConfig = require('./cryptConf.json')
var pg = require('pg');
//pg.defaults.ssl= true;
var config = require('./dbconfig.json');
var conString = config.App.dbConfig.conString;
var models=require('./../models');
//var passport = require('passport');



var CryptoJS = require("crypto-js");




// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {


        done(null,user);//for admn auth
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
        pg.connect(conString,function (err,dbclient,ok){

            if(err){
                return console.error('could not connect to the database '+ err);
            }

                if(user.role){
            dbclient.query("select * from managers where id = $1",[user.id],function(err,rows){//for admn auth

            done(err, rows.rows[0]);

        });}
            else{

                    dbclient.query("select * from accounts where id = $1",[user.id],function(err,rows){//for admn auth

                        done(err, rows.rows[0]);

                    });
                }
            ok(); //release to the pool
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form

            process.nextTick(function() {

                verify(email,function(role){
                    console.log('*************role*****************'+role)
                pg.connect(conString, function (err, dbclient, ok) {

                    if (err) {

                        return console.error('could not connect to the database ' + err);
                    }

                        console.log("email user to connect : "+email)
                    dbclient.query('SELECT * FROM '+role+' WHERE email = $1', [email], function (err, rows) {

                            console.log(rows)
                        if (err) {
                            console.log('erreir' + err);
                            return done(err);
                        }
                        if (!rows.rows.length) {
                            console.log('user does not exsist');
                            return done(null, false);
                        }


                        if (!( (CryptoJS.AES.decrypt(rows.rows[0].password.toString(), cryptoConfig.cryptKey).toString(CryptoJS.enc.Utf8)) == password)) {
                            console.log('password mismatch');
                            return done(null, false);

                        }

                        console.log(rows.rows[0]);
                        return done(null, rows.rows[0]);


                    });
                    ok();
                });


            });
            });



        }));

};


var verify =function(email,cb){

var res = '';

    pg.connect(conString,function (err,dbclient,ok) {

        if (err) {

            return console.error('could not connect to the database ' + err);
        }


        dbclient.query("SELECT * FROM accounts WHERE email = $1", [email], function (err, rows) {


            if (!rows.rows.length){
                console.log('dans la fonction verify'+res)
                return cb(res= 'managers')

            }else {
                console.log('dans la fonction verify'+res)
                return cb(res= 'accounts')
            }




    });

});


}