/*global describe:false, it:false, before:false, after:false, afterEach:false*/
/* Start */ 

'use strict';


var app = require('../index'),
    kraken = require('kraken-js'),
    request = require('supertest'),
    assert = require('assert');

var mockgoose = require('mockgoose');
var mongoose = require('mongoose');

mockgoose(mongoose);

beforeEach(function (){
        mockgoose.reset();
});

xdescribe('index', function () {

    var mock;


    beforeEach(function (done) {
        kraken.create(app).listen(function (err, server) {
            mock = server;
            done(err);
        });
    });


    afterEach(function (done) {
        mock.close(done);
    });


    it('should say "hello"', function (done) {
        request(mock)
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/)
            .expect(/Hello, /)
            .end(function(err, res){
                done(err);
            });
    });

});