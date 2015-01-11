var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    app = express(),
    mongoURI = process.env.mongoURI,
    Studio;

//configuration
mongoose.connect(mongoURI);
app.use(express.static(__dirname + '/src'));
app.use(bodyParser.json());

//define Schema
var studioSchema = mongoose.Schema({
    name: String,
    fullAddress: {
        city: String,
        district: String,
        undergroundStation: String,
        address: String
    },
    phones: String,
    email: String,
    website: String,
    description: String
});

// define model
Studio = mongoose.model('Studio', studioSchema);

// API routes
app.get('/api/studios', function (req, res) {
    Studio.find(function(err, studios) {
        if(err) {
            res.send(err);
        } else {
            res.json(studios);
        }
    });
});

app.post('/api/studios', function (req, res) {
    Studio.create(req.body, function (err) {
        if(err) {
            res.send(err);
        } else {
            Studio.find(function (err, studios) {
                if(err) {
                    res.send(err);
                } else {
                    res.json(studios);
                }
            });
        }
    });
});

app.delete('/api/studios/:studio_id', function (req, res) {
    Studio.remove({
        _id: req.params.studio_id
    }, function(err) {
        if(err) {
            res.send(err);
        } else {
            Studio.find(function (err, studios) {
                if(err) {
                    res.send(err);
                } else {
                    res.json(studios);
                }
            })
        }
    });
});

// routes
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/src/main.html');
});

app.listen(8080);