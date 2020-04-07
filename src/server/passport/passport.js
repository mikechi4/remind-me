const passport = require('passport');
const User = require('../models/User');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// why is this not being called T_T 
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

const SigninStrategy = require("./SigninStrategy");
const SignupStrategy = require("./SignupStrategy");

passport.use('local-signin', SigninStrategy);
passport.use('local-signup', SignupStrategy);

module.exports = passport;