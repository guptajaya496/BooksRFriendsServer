
let express  =  require('express');
let bodyParser = require('body-parser');

let Books = require('../models/books');
var Verify = require('./verify.js');

let bookRouter = express.Router();
bookRouter.use(bodyParser.json());

bookRouter.route('/')
    .get(function (req,res,next) {

        if(req.query.filterValue != undefined){

            let fieldValue = req.query.filterValue;

            let arr = [];

            let regexValue= fieldValue.replace(/'/g,'') +'.*';

            // console.log("\""+ regexValue +"\"");

            let regExp = {};

            regExp["$regex"] = '"'+ regexValue + '"';
            regExp["$options"] = "i";

            let f1 = JSON.parse(JSON.stringify( {"title" : regExp}));
            let f2 = JSON.stringify( {"author" : regExp}).replace(/'/g,'');
            let f3 = JSON.stringify( {"publication" : regExp}).replace(/'/g,'');

            arr.push(f1);
            arr.push(f2);
            arr.push(f3);

            console.log(f1);

            let query = {};

            query["$or"] = arr;

            console.log(query);

            //let tempQuery = query;

            //console.log(temp);

            Books.find(query,function (err,book) {

                if (err) throw err;

                res.set({
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS, GET, POST, DELETE, PUT",
                    'Access-Control-Allow-Headers': 'Content-Type'
                });

                    console.log(book);
                    res.json(book);
            });
        }
        else{
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
        }

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