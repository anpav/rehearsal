var Studio = require('../models/studio');

module.exports = function (app) {

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

    app.get('/', function (req, res) {
        res.render('index');
    });
};
