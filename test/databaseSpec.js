//spec/calculator-spec.js

var assert = require('assert'),
    database = require('../lib/database');

var mockgoose = require('mockgoose');
var mongoose = require('mongoose');
var nconf = require('nconf');

mockgoose(mongoose);

beforeEach(function (done){
        mockgoose.reset();
        database.config(nconf);
        done()
});

describe('database lib', function(){
    'use strict';

    describe('connection string', function(){
        it('should return localhost', function(){
            assert.equal(database.connectionString(),'mongodb://localhost:27017/innovatio');
        });
    });
});
