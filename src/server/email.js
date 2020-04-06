"use strict";
const nodemailer = require("nodemailer");
// async..await is not allowed in global scope, must use a wrapper

const generateBody = (reminder) => {
    return `<p>Your reminder, ${reminder}, is due in the next five minutes.</p>`
}

module.exports = {
    sendEmails: async (remindersList, userMap) => {

        const subjectLine = 'You have a reminder due in 5 minutes';

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.HOST_EMAIL,
                pass: process.env.HOST_EMAIL_PW
            }
        });

        remindersList.forEach((reminder) => {
            const mailOptions = {
                from: process.env.HOST_EMAIL, // sender address
                to: userMap[reminder.user_id], // list of receivers
                subject: subjectLine, // Subject line
                html: generateBody(reminder.reminder)// plain text body
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    console.log(err)
                else
                    console.log(info);
            });
        })


    }
}
