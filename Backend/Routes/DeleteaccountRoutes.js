const express = require("express");

const { getuser, deletacccount } = require("../Databases/Users.js");
const Router = express.Router();

const deletacccountDB = require("../Databases/DeletedAccounts.js");

Router.post("/", async (req, res) => {
  const user = await getuser(req.headers.jwt);
  deletacccount(user._id).then((data) => {
    if (data) {
      deletacccountDB
        .deletacccount(req.headers.jwt)
        .then((data) => res.send(data));
    } else {
      res.send(false);
    }
  });
});



module.exports = Router;
