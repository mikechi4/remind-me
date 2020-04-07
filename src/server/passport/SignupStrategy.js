const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);
const localStrategy = new LocalStrategy({ passReqToCallback: true }, function (req, username, password, done) {
    const email = req.body.email;
    User.findOne({ username }, function (err, user) {
        if (err) { return done(err); }
        if (user) {
            return done("Username already exists", null);
        }

        const encryptedPassword = bcrypt.hashSync(password, salt);
        const newUser = new User({
            username,
            email,
            password: encryptedPassword
        })
        newUser.save((err, inserted) => {
            if (err) {
                return done(err, null)
            } else {
                done(null, "Successfully created an account!")
            }
        });
    });
})


module.exports = localStrategy;