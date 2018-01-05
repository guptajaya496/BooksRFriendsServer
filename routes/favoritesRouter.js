
var express = require('express');

var bodyParser  = require('body-parser');
let Books = require('../models/books');
var Favorites = require('../models/favorites.js');

var Verify = require('./verify.js');

let favoritesRouter = express.Router();

favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')

    .get(Verify.verifyOrdinaryUser, function (req, res, next) {

        var userId = req.decoded.user._id;

        Favorites.findOne({"postedBy":userId})
                 .populate('postedBy')
                 .populate('Books')
                 .exec(function (err,favorites) {
                     if(err) throw err;

                     console.log(favorites);
                     res.json(favorites);
                 });
    })
    .post(Verify.verifyOrdinaryUser , function (req,res,next) {

        var userId = req.decoded.user._id;
        var bookId = req.body.bookId;

        Books.findById(bookId,function (err, book) {

            if(err) throw err;

            //console.log(book);

            Favorites.findOne({'postedBy':userId},function (err, favorites) {
                if(err) throw err;

                console.log(favorites);

                if(favorites){

                    console.log("index : ", favorites.books.indexOf(bookId));


                    if(favorites.books.indexOf(bookId) === -1){

                        console.log("I am in Add favrouter")

                        favorites.books.push(bookId);

                        favorites.save(function (err, favorite) {

                            if(err) throw err;

                            console.log("Book added to the Favorites");
                        })
                    }
                    else{
                        console.log("Book is already added to the Favorites");
                    }

                    console.log(favorites);
                    res.json(favorites);
                }
                else{

                    req.body.postedBy = userId;
                    req.body.books = [];
                    req.body.books.push(bookId);

                    Favorites.create(req.body, function(err, newFavorite){
                        if(err) throw err;

                        console.log(newFavorite);
                        console.log("Favorite list created !!!");
                        res.json(newFavorite);
                    })
                }
            })

        })
    })
    .delete(Verify.verifyOrdinaryUser ,function (req,res,next) {

        console.log(req.decoded.user._id);
        console.log(req.body.bookId);

        var userId = req.decoded.user._id;
        var bookId = req.body.bookId;


        Favorites.findOne({'postedBy':userId},function (err, favorites) {
            if(err) throw err;

            console.log("favorites :", favorites);

            if(favorites){

                console.log(favorites.books.indexOf(bookId));

                if(favorites.books.indexOf(bookId) > -1){

                    console.log("book in favorite found in the list.");

                    favorites.books.pop(bookId);

                    favorites.save(function (err, favorite) {

                        if(err) throw err;

                        console.log("Book removed from the Favorites");
                    })
                }

                console.log(favorites);
                res.json(favorites);
            }

        })
    });

module.exports = favoritesRouter;