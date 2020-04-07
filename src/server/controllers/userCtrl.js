const User = require("../models/User");
const passport = require('../passport/passport');


module.exports = {
    createUser: (req, res, next) => {
        passport.authenticate('local-signup', function (error, user, info) {
            if (error) {
                return res.status(500).send({
                    message: error,
                    error: "Internal server error"
                })
            }

            req.logIn(user, (error, data) => {
                if (error) {
                    return res.status(500).send({
                        message: error,
                        error: "Internal server error"
                    });
                }

                return res.status(200).send({
                    message: "FOUND A USER"
                })
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
        passport.authenticate('local-signin', function (error, user, info) {
            if (error) {
                return res.status(401).send({
                    message: error,
                    error: "Internal server error"
                })
            }

            req.logIn(user, (error, data) => {
                if (error) {
                    return res.status(500).send({
                        message: error,
                        error: "Internal server error"
                    });
                }

                return res.status(200).send(user)
            });
        })(req, res, next)
    }
    //END OF EXPORT
};
