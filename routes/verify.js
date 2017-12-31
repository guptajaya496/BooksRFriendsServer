
var User = require('../models/users');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config.js');

exports.getToken = function (user) {
    return jwt.sign({user}, config.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyOrdinaryUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    console.log(req.headers['x-access-token']);

    // decode token
    if (token) {
        // verifies secret and checks exp

        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                let err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        let err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

exports.verifyAdmin = function(req, res, next){

    if(!req.decoded){

        let err = new Error('You are not authorized to perform this perform!!');
        err.status = 403;
        return next(err);
    }
    else {
        let id = req.decoded._id;

        if (!req.decoded.admin) {

            let err = new Error('You are not authorized to perform this perform!!');
            err.status = 403;
            return next(err);
        } else
            next();
    }
};
