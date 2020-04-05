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


    //END OF EXPORT
};
