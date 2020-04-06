const Reminder = require("../models/Reminder");

// const bcrypt = require("bcryptjs");

// const hashPassword = password => {
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(password, salt);
//   return hash;
// };

module.exports = {
    createReminder: (req, res) => {
        var reminderObj = { ...req.body };
        const reminder = new Reminder(reminderObj)
        reminder.save(err => {
            if (err) {
                console.log(err)
                return res.status(422).send(err);
            } else {
                console.log('successss!')
                res.status(200).send({ success: true, message: 'User created' })
            }
        });
    },
    getReminders: (req, res) => {
        try {
            Reminder.find({}, (err, response) => {
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
    updateReminder: (req, res) => {
        const { _id, reminder, dueDate } = req.body;
        try {
            Reminder.updateOne({ _id: _id }, { $set: { reminder, dueDate } }).then((response) => {
                if (response.ok === 1) {
                    res.status(200).send({ success: true, message: "Sucesfully updated record." })
                }
            })
        } catch (e) {
            res.status(500).send({ success: false, message: "There was an error with the request" })
        }
        //END OF EXPORT
    },
    deleteReminder: (req, res) => {
        try {
            Reminder.findByIdAndDelete(req.params.reminderId, (response) => {
                console.log(response)
                res.status(200).send({ success: true, message: "Succesfully deleted record" })
            })
        } catch (e) {
            res.status(500).send({ success: false, message: "There was an error with the request" })
        }
    }
}
