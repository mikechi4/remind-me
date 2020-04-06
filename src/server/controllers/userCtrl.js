const mongoose = require("mongoose");
const User = require("../models/User");

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

    },
    validateLogin: (req, res) => {
        const { username, password } = req.body;
        try {
            User.findOne({
                username
            }, (err, response) => {
                if (err) {
                    res.status(401).send({ success: false, message: err })
                } else if (response) {
                    const user = response;
                    if (user.password === password) {
                        res.status(200).send({ success: true })
                    } else {
                        console.log('no pw matchs')
                        res.status(401).send({ success: false, message: "Username or password is incorrect" })
                    }
                } else {
                    console.log('no username')
                    res.status(401).send({ success: false, message: "Username or password is incorrect" })
                }
            });
        } catch (e) {
            console.log(e)
        }
    },
    getUserEmail: async (remindersList) => {
        // adding the user email to the reminder object. I didn't want to add the email prop on the reminders object since it's PII. So i'll iterate through the list of expiring reminders, grab users email by ID
        let updateReminderData = remindersList.slice();
        for (const reminder of remindersList) {
            reminder.userEmail = await module.exports.getUserEmailById(reminder.user_id);
        }
        console.log('updated list')
        console.log(updateReminderData)
        return updateReminderData;
    },
    generateUserMap: async (remindersList) => {
        try {
            let user = await User.findById(id);
            console.log(user.email)
            return user.email;
        } catch (e) {
            console.log(e)
        }
    }

    //END OF EXPORT
};
