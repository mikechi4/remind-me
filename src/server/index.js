const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const port = 8080;

const userCtrl = require("./controllers/userCtrl");
const reminderCtrl = require("./controllers/reminderCtrl");

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

app.get("/api/test", (req, res, next) => {
  console.log("HELLOO");
  return res.status(200).send({
    hello: "HI!!!"
  });
});

app.post("/api/create", userCtrl.createUser);
app.post("/api/login", userCtrl.validateLogin);
app.post("/api/add", reminderCtrl.createReminder)

app.get("/api/users", userCtrl.getUser);
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});


