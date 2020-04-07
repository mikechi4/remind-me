const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

const localStrategy = new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username }, function (err, user) {
            if (err) { return done(err, null); }
            if (!user) {
                return done('Incorrect username or password', null);
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password)
            if (!isPasswordValid) {
                return done('Incorrect username or password', null);
            }
            return done(null, user);
        });
    }
)


module.exports = localStrategy;