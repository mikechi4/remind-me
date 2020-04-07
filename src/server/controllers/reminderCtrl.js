const Reminder = require("../models/Reminder");
const nodemailer = require("nodemailer");


module.exports = {
    createReminder: (req, res) => {
        const userId = req.session.passport.user;
        var reminderObj = { ...req.body };
        console.log(req.session.passport.user)
        reminderObj.user_id = userId;
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
        const userId = req.session.passport.user;
        try {
            Reminder.find({ user_id: userId }, (err, response) => {
                if (err) {
                    console.log('ERRORRRR!!')
                    console.log(err);
                } else {
                    console.log(response)
                    res.status(200).send(response);
                }

            });
        } catch (e) {
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
                res.status(200).send({ success: true, message: "Succesfully deleted record" })
            })
        } catch (e) {
            res.status(500).send({ success: false, message: "There was an error with the request" })
        }
    },
    getExpiringReminders: async () => {
        const currentTime = new Date();
        try {
            let reminders = await Reminder.find({
                dueDate: {
                    $gte: currentTime,
                    $lte: new Date(currentTime.getTime() + 5 * 60000)
                }
            });
            return reminders
        } catch (e) {
            console.log(e)
        }
    }
}