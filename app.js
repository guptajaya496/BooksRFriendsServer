
var express = require('express');
var path = require( 'path');
var logger =require('morgan');
var cookieParser =require('cookie-parser');
var bodyParser =require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require ('passport-local').Strategy;

var config = require('./config');

mongoose.connect(config.mongoUrl);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function () {
    // we are connected!
    console.log("Connected correctly to Server");
});

let bookRouter = require("./routes/bookRouter");
let favoritesRouter = require("./routes/favoritesRouter");

let index = require('./routes/index');
let users = require('./routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

let User = require('./models/users');

app.use(passport.initialize());

exports.local = passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/books', bookRouter);
app.use('/favorites', favoritesRouter);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
      message:err.message,
      error:err
  });
});

module.exports = app;
