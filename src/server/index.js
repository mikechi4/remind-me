const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const cron = require('node-cron');
const port = 8080;

const userCtrl = require("./controllers/userCtrl");
const reminderCtrl = require("./controllers/reminderCtrl");
const email = require("./email");

//======= MIDDLEWARE =======
app.use(bodyParser.json());
app.use(cors());
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
app.get("/api/users", userCtrl.getUser);
app.get("/api/reminders", reminderCtrl.getReminders);

// ======= Delete Requests
app.delete("/api/reminders/:reminderId", reminderCtrl.deleteReminder);

// email.sendEmail();
// email.sendGmail();
cron.schedule('* * * * *', () => {
  console.log('running a task every 5 minutes');

  const grabAllExpiringReminders = async () => {
    let reminders = await reminderCtrl.getExpiringReminders();
    const usersWithExpiringReminders = await userCtrl.getUserEmail(reminders);
    console.log('usersWithExpiringReminders')
    console.log(usersWithExpiringReminders)
  }



  grabAllExpiringReminders();


  // return email.sendGmail(records);
});
app.get("/api/reminders/cron", reminderCtrl.getExpiringReminders);
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});


