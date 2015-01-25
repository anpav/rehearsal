/*jslint node: true */

// set up

var express = require('express');
var app = express();
var port = process.env.PORT || '8080';
var sessionSecret = process.env.SECRET || 'secret';
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

// configuration

mongoose.connect(configDB.url);

require('./config/passport.js')(passport);

// express application configuration

/*jslint nomen: true*/
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

/*jslint nomen: false*/

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

// required for passport

app.use(session({ secret: sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes

require('./controllers/routes.js')(app, passport);

// launch

app.listen(port);
console.log("Server was launched!");