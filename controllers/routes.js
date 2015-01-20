var Studio = require('../models/studio');

module.exports = function (app, passport) {

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

    app.get('/main', isLoggedIn, function (req, res) {
        res.sendFile(require('path').resolve(__dirname + '/../views/main.html'));
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/messages', function (req, res) {
        res.json(req.flash());
    });

    app.get('/sign-in', function (req, res) {
        res.sendFile(require('path').resolve(__dirname + '/../views/sign-in.html'));
    });

    app.get('/sign-up', function (req, res) {
        res.sendFile(require('path').resolve(__dirname + '/../views/sign-up.html'));
    });

    app.get('/', function (req, res) {
        res.sendFile(require('path').resolve(__dirname + '/../views/index.html'));
    });

    app.post('/sign-up', passport.authenticate('local-signup', {
        successRedirect: '/main',
        failureRedirect: '/sign-up',
        failureFlash: true
    }));

    app.post('/sign-in', passport.authenticate('local-signin', {
        successRedirect: '/main',
        failureRedirect: '/sign-in',
        failureFlash: true
    }));

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/');
    }
};