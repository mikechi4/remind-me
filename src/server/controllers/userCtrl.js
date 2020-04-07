const User = require("../models/User");
const passport = require('../passport/passport');

// const bcrypt = require("bcryptjs");

// const hashPassword = password => {
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(password, salt);
//   return hash;
// };

module.exports = {
    createUser: (req, res, next) => {
        passport.authenticate('local-signup', function (error, user, info) {
            if (error) {
                return res.status(500).send({
                    message: error,
                    error: "Internal server error"
                })
            }

            return res.status(200).send({
                message: "FOUND A USER"
            })
        })(req, res, next)
    },
    getAllUsers: (req, res) => {
        try {
            return User.find({}).exec().then((response) => {
                const userMapper = {};
                response.forEach((user) => {
                    userMapper[user._id] = user.email
                })

                return userMapper
            });
        } catch (e) {
            console.log(e)
            return e
        }

    },
    validateLogin: (req, res, next) => {
        passport.authenticate('local-signin', (error, user, info) => {
            if (error) {
                return res.status(401).send({
                    message: error,
                    error: "Internal server error"
                })
            }

            return res.status(200).send({
                message: "FOUND A USER"
            })
        })(req, res, next)
    }
    //END OF EXPORT
};
