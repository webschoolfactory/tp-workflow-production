'use strict';


var IndexModel = require('../models/index'),
innovation = require('../models/innovation');


module.exports = function (app) {

    var model = new IndexModel();


    app.get('/', function (req, res, next) {
        
        innovation.find(function(err,innovations){
            if(err){
                next(err);
                return;
            }
            console.log('found', innovations.length,'innovations');
            model.innovations = innovations;
            res.render('index', model);

        });




    });

};
