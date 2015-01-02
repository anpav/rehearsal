var express = require('express'),
    mongoose = require('mongoose'),
    app = express(),
    mongoURI = process.env.mongoURI,
    Studio;

//configuration
mongoose.connect(mongoURI);
app.use(express.static(__dirname + '/src'));

// define model
Studio = mongoose.model('Studio', {
    name: "string"
});

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

// routes
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/src/index.html');
});

app.listen(8080);