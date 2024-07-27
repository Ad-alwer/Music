const express = require("express");
const Router = express.Router();

const accountspendingDB = require("../Databases/AccountsPending");
const usersDB = require("../Databases/Users");
Router.get("/checkmail/:value", (req, res) => {
  usersDB.checkemail(req.params.value).then((data) => res.send(data));
});

Router.get("/checkusername/:value", (req, res) => {
  accountspendingDB
    .finalcheckusername(req.params.value)
    .then((data) => res.send(data));
});

Router.post("/register", (req, res) => {
  accountspendingDB
    .adduser(...Object.values(req.body))
    .then((data) => res.send(data));
});

Router.get("/verify", (req, res) => {
  accountspendingDB.verify(req.headers.jwt).then((data) => res.send(data));
});

module.exports = Router;
