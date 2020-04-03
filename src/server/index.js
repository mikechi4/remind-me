const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { MongoClient } = require("mongodb");

const port = process.env.PORT || 8080;

//======= MIDDLEWARE =======
app.use(bodyParser.json());
app.use(cors());

app.get("/api/test", (req, res, next) => {
  console.log("HELLOO");
  return res.status(200).send({
    hello: "HI!!!"
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
