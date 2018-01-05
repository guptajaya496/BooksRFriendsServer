var express = require('express');

let router = express.Router();

var passport = require('passport');

var User = require('../models/users');
var Verify = require('./verify');

router.route('/')
    .get(function(req, res, next) {

        User.find({}, function(err, user){
            if(err)
            {
                throw err;
            }
            res.json(user);
        });
    });

router.route('/register')
    .post(function(req, res) {
        User.register(new User({
                username : req.body.username,
                password: req.body.password,
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                emailId:req.body.emailId,
                confirmPassword:req.body.confirmPassword
            }),
            req.body.password, function(err, user) {
                if (err) {
                    return res.status(500).json({err: err});
                }

                if(req.body.firstName){
                    user.firstName = req.body.firstName;
                }

                if(req.body.lastName){
                    user.lastName = req.body.lastName;
                }

                if(req.body.emailId){
                    user.emailId = req.body.emailId;
                }

                if(req.body.username){
                    user.username = req.body.username;
                }

                if(req.body.password){
                    user.password = req.body.password;
                }

                if(req.body.confirmPassword){
                    user.confirmPassword = req.body.confirmPassword;
                }
                user.save(function(err, user){
                    passport.authenticate('local')(req, res, function () {
                        return res.status(200).json({status: 'Registration Successful!'});
                    });
                });
            }
        );
    });

router.route('/login')
    .post(function(req, res, next) {

        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.status(401).json({
                    err: info
                });
            }

            req.logIn(user, function(err) {

                if (err) {
                    return res.status(500).json({
                        err: 'Could not log in user'
                    });
                }

                var token = Verify.getToken({"username":user.userName, "_id":user._id, "admin":user.admin});

                res.status(200).json({
                    status: 'Login successful!',
                    success: true,
                    token: token
                });
            });

        })(req,res,next);
    });

router.route('/logout')
    .get(function(req, res) {
        req.logout();
        res.status(200).json({
            status: 'Bye!'
        });
    });

module.exports = router;
