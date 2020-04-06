"use strict";
const nodemailer = require("nodemailer");
// async..await is not allowed in global scope, must use a wrapper
module.exports = {
    sendGmail: (emailList) => {
        console.log(emailList)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'remind.me.proj@gmail.com',
                pass: '********'
            }
        });

        const mailOptions = {
            from: 'remind.me.proj@gmail.com', // sender address
            to: 'mike.chi4@gmail.com', // list of receivers
            subject: 'You have a reminder due in 5 minutes', // Subject line
            html: '<p>Your html here</p>'// plain text body
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                console.log(err)
            else
                console.log(info);
        });
    }
}
