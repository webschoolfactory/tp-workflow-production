'use strict';
var mongoose = require('mongoose'),
connectionString;

module.exports.config = function (nconf) {
    console.log('***');
    // 27017 is mandatory to socket.io-mongo to avoid localhost:Nan error on startup
    connectionString = 'mongodb://localhost:27017/innovatio';
    mongoose.connect(connectionString);
    var db = mongoose.connection;
    
    // set dynamix databse connection to store conf for resuse in connect-mongo session store
    nconf.set('middleware:session:config:mongoose_connection',db);


    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
        console.log('db connection open');
    });
};

module.exports.connectionString = function(){
    return connectionString;
};