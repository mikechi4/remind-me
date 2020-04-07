const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const cron = require('node-cron');
const port = 8080;

const userCtrl = require("./controllers/userCtrl");
const reminderCtrl = require("./controllers/reminderCtrl");
const emailCtrl = require("./email");
const cookieSession = require('cookie-session');


//======= MIDDLEWARE =======
app.use(bodyParser.json());
app.use(cors());
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

//======= PASSPORT =======
const passport = require("./passport/passport");
app.use(passport.initialize());
app.use(passport.session());
//======= Mongoose =======
mongoose.connect("=mongodb://localhost/remind-me", {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", error => {
  console.log(error)
});
db.once("open", () => {
  console.log("connected to mongoose");
});

// ======= Post Requests
app.post("/api/create", userCtrl.createUser);
app.post("/api/login", userCtrl.validateLogin);
app.post("/api/add", reminderCtrl.createReminder);

// ======= Put Requests
app.put("/api/edit", reminderCtrl.updateReminder);

// ======= Get Requests
app.get("/api/users", userCtrl.getUsers);
app.get("/api/reminders", reminderCtrl.getReminders);

// ======= Delete Requests
app.delete("/api/reminders/:reminderId", reminderCtrl.deleteReminder);

const sendEmailNotification = async () => {
  // grabbing any reminders that will expire in the next five minutes
  let reminders = await reminderCtrl.getExpiringReminders();
  if (reminders.length <= 0) {
    console.log('no jobs')
    return
  }
  // reminders model does not have user_email attached since it's PII.
  // going in to DB and grabbing all users for one call instead of iterating through reminders, grabbing id, then grabbing individual user emails
  const usersMap = await userCtrl.getAllUsers();
  emailCtrl.sendEmails(reminders, usersMap).then((response) => {
    return
  })
}


cron.schedule('* 5 * * *', () => {
  sendEmailNotification();
});

app.get("/api/reminders/cron", reminderCtrl.getExpiringReminders);
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});


