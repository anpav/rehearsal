/*jslint node: true */

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');

module.exports = function (passport) {
    "use strict";
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        process.nextTick(function () {
            User.findOne({ 'local.email': email }, function (err, user) {

                if (err) {
                    return done(err);
                }

                if (user) {
                    req.flash(); // clear messages
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.')); // set message
                }

                var newUser = new User();

                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);

                newUser.save(function (err) {
                    if (err) {
                        throw err;
                    }

                    return done(null, newUser);
                });
            });
        });
    }));

    passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        User.findOne({ 'local.email': email }, function (err, user) {

            if (err) {
                return done(err);
            }

            if (!user) {
                req.flash(); // clear messages
                return done(null, false, req.flash('signinMessage', 'No user found.')); // set message
            }

            if (!user.validPassword(password)) {
                req.flash(); // clear messages
                return done(null, false, req.flash('signinMessage', 'Oops! Wrong password.')); // set message
            }

            return done(null, user);
        });
    }));
};