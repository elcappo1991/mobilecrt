var config = require('./../config/dbconfig.json');
var conString = config.App.dbConfig.conString;
var pg = require('pg');
//



var client = null;
module.exports = function () {

    client = new pg.Client(conString);


        return client;



};