// const app = require("..");
// const db = app.get("db");
const mongoose = require("mongoose");
const User = require("../models/User");
console.log(User)

// const bcrypt = require("bcryptjs");

// const hashPassword = password => {
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(password, salt);
//   return hash;
// };

module.exports = {
    createUser: (req, res) => {
        console.log(req.body);
        var { username, email, password } = req.body;
        const user = new User({ username, email, password });
        user.save(err => {
            if (err) {
                // Duplicate username
                if (err.name === 'MongoError' && err.code === 11000) {
                    return res.status(422).send({ success: false, message: 'User already exist!' });
                }
                // Some other error
                return res.status(422).send(err);
            } else {
                res.status(200).send({ success: true, message: 'User created' })
            }
        });
    },
    getUser: (req, res) => {
        try {
            User.find({}, (err, response) => {
                if (err) {
                    console.log('ERRORRRR!!')
                    console.log(err);
                } else {
                    console.log(response)
                    res.status(200).send(response);
                }

            });
        } catch (e) {
            console.log('eeeeeee')
            console.log(e)
        }

    }

    //END OF EXPORT
};
