/*jslint node: true */

var Studio = require('../models/studio');

module.exports = function (app, passport) {
    "use strict";

    // Middleware helper for authentication

    function isLoggedIn(givePermit) {
        return function (req, res, next) {
            if (givePermit) {
                if (!req.isAuthenticated()) {
                    next();
                } else {
                    res.redirect('/');
                }
            } else {
                if (req.isAuthenticated()) {
                    res.redirect('/');
                } else {
                    next();
                }
            }
        };
    }

    // API

    app.get('/api/studios', function (req, res) {
        Studio.find(function (err, studios) {
            if (err) {
                res.send(err);
            } else {
                res.json(studios);
            }
        });
    });

    app.post('/api/studios', function (req, res) {
        Studio.create(req.body, function (err) {
            if (err) {
                res.send(err);
            } else {
                Studio.find(function (err, studios) {
                    if (err) {
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
        }, function (err) {
            if (err) {
                res.send(err);
            } else {
                Studio.find(function (err, studios) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json(studios);
                    }
                });
            }
        });
    });

    app.get('/api/messages', function (req, res) {
        res.json(req.flash());
    });

    app.get('/api/is-signed-in', function (req, res) {
        res.json(req.isAuthenticated());
    });

    app.get('/api/user-info', function (req, res) {
        if (req.isAuthenticated()) {
            res.json({
                email: req.user.local.email
            });
        } else {
            res.send(401);
        }
    });

    // UI Routes

    app.get('/', function (req, res) {
        if (req.isAuthenticated()) {
            res.sendFile(require('path').resolve(__dirname + '/../views/main.html'));
        } else {
            res.sendFile(require('path').resolve(__dirname + '/../views/index.html'));
        }
    });

    app.get('/sign-up', isLoggedIn(false), function (req, res) {
        res.sendFile(require('path').resolve(__dirname + '/../views/sign-up.html'));
    });

    app.get('/sign-in', isLoggedIn(false), function (req, res) {
        res.sendFile(require('path').resolve(__dirname + '/../views/sign-in.html'));
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/sign-up', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/sign-up',
        failureFlash: true
    }));

    app.post('/sign-in', passport.authenticate('local-signin', {
        successRedirect: '/',
        failureRedirect: '/sign-in',
        failureFlash: true
    }));
};