'use strict';
var database =require('./lib/database');
var baucis = require('baucis');
    

var kraken = require('kraken-js'),
    app = {};


app.configure = function configure(nconf, next) {
    // Async method run on startup.

    database.config(nconf);

    require('./models/innovation');
    require('./models/user');
    
    //var us = baucis.rest('user');



    next(null);
};


app.requestStart = function requestStart(server) {
    // Run before most express middleware has been registered.
    var ino = baucis.rest('innovation');
    server.use('/api/innovations',baucis());
};


app.requestBeforeRoute = function requestBeforeRoute(server) {
    // Run before any routes have been added.

    
    
};


app.requestAfterRoute = function requestAfterRoute(server) {
    // Run after all routes have been added.

    
};


if (require.main === module) {
    kraken.create(app).listen(function (err) {
        //startup
        console.log('Kraken app started in mode ' + process.env.NODE_ENV);
        if (err) {
            console.error(err.stack);
        }
    });
}


module.exports = app;
