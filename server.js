const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
(bodyParser = require("body-parser")), (jsonParser = bodyParser.json());
const v1Routes = require("./v1/routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", v1Routes);

app.use(async (err, req, res, next) => {
  let message = typeof err.message == "undefined" ? err : err.message;
  return res.status(400).send({
    status: "RXERROR",
    message: message,
  });
});

module.exports = app;
