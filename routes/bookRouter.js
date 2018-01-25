
let express  =  require('express');
let bodyParser = require('body-parser');

let Books = require('../models/books');
var Verify = require('./verify.js');

let bookRouter = express.Router();
bookRouter.use(bodyParser.json());

bookRouter.route('/')
    .get(function (req,res,next) {

        Books.find({},function (err,book) {

            if (err) throw err;

            res.set({
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS, GET, POST, DELETE, PUT",
                'Access-Control-Allow-Headers': 'Content-Type'
            });

            console.log(book);

            res.json(book);
        });
    })
    .post(function (req,res,next) {
        Books.create(req.body,function(err, book){
            if(err) throw err;

            let id = book._id;

            res.set({"Access-Control-Allow-Origin": "*",
                     "Access-Control-Allow-Methods": "OPTIONS, GET, POST, DELETE, PUT",
                     'Access-Control-Allow-Headers':'Content-Type'
            });

            res.end('Added favorite with Id : '+ id );

        });
    })
    .delete(function (req,res,next) {

        Books.remove({}, function (err, resp) {

            if(err) throw err;

            res.set({"Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS, GET, POST, DELETE, PUT",
                'Access-Control-Allow-Headers':'Content-Type'
            });

           res.end('Added favorite with Id : '+ id );
        });
    });

module.exports = bookRouter;