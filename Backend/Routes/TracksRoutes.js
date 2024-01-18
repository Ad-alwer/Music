const express = require("express");
const Router = express.Router();

require("dotenv").config();

const trackDB = require("../Databases/Tracks");
const userDB = require("../Databases/Users");

Router.put("/update/:trackid", (req, res) => {
  userDB.edittrack(req.headers.jwt, req.body.name).then((data) => {
    if (data) {
      trackDB
        .edittrack(req.params.trackid, ...Object.keys(req.body))
        .then((data) => res.send(data));
    }
  });
});

Router.delete("/delete/:trackid", (req, res) => {
  userDB.deletetrack(req.headers.jwt, req.params.id).then((data) => {
    if (data) {
      trackDB.deletetrack(req.params.id).then((data) => res.send(data));
    } else {
      res.send(false);
    }
  });
});

Router.put("/changestatus/:trackid&&:newstatus", (req, res) => {
  trackDB
    .changestatus(req.params.trackid, req.params.newstatus)
    .then((data) => res.send(data));
});

Router.put("/play/:trackid", (req, res) => {
  trackDB.playtrack(req.params.trackid).then((data) => {
    data ? trackDB.monthlyListener(req.params.trackid) : null;
  });

});

module.exports = Router;
