// set up

var express = require('express');
var app = express();
var port = process.env.PORT || '8080';
var mongoose = require('mongoose');

var morgan = require('morgan');
var bodyParser = require('body-parser');

var configDB = require('./config/database.js');

// configuration

mongoose.connect(configDB.url);

// express application configuration

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());

// routes

require('./controllers/routes.js')(app);

// launch

app.listen(port);
console.log("Server was launched!");