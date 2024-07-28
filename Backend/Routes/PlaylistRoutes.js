const express = require("express");
const Router = express.Router();

const playlistDB = ("../Databases/Playlists.js");
const userDB = require("../Databases/Users.js");

require("dotenv").config();

Router.get("/checkname/:name", async (req, res) => {
  playlistDB.checkplaylistname(req.params.name).then((data) => res.send(data));
});

Router.post("/add", async (req, res) => {
  const user = await userDB.getuser(req.headers.jwt);

  const date = new Date();
  date;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}/${month}/${day}`;

  playlistDB
    .createdplaylist(...Object.keys(req.body), user._id, formattedDate)
    .then((data) => res.send(data));
});

Router.put("/edit", async (req, res) => {
  const user = await userDB.getuser(req.headers.jwt);
  playlistDB
    .editplaylist(user._id, ...Object.keys(req.params))
    .then((data) => res.send(data));
});

Router.put("/changeplayliststatus/:id&&:status", async (req, res) => {
  playlistDB
    .changeplayliststatus(req.params.id, req.params.status)
    .then((data) => res.send(data));
});

Router.put("/addtrack/:name&&:track", async (req, res) => {
  const user = await userDB.getuser(req.headers.jwt);
  playlistDB
    .addtracktoplaylist(user._id, req.params.name, req.params.track)
    .then((data) => res.send(data));
});

Router.delete("/delete/:playlistid", (req, res) => {
  userDB.deleteplaylist(req.headers.jwt, req.params.playlistid).then((data) => {
    if (data) {
      playlistDB
        .deletplaylist(req.params.playlistid)
        .then((data) => res.send(data));
    } else {
      return {
        msg: "Please try again",
        status: false,
      };
    }
  });
});

Router.get("/getplaylists", (req, res) => {
  playlistDB.getuserplaylist(req.headers.jwt).then((data) => res.send(data));
});

Router.get("/topplaylist", (req, res) => {
  playlistDB.topplaylist(req.headers.jwt).then(async (data) => res.send(data));
});

Router.put("/play/:playlistid/", (req, res) => {
  playlistDB
    .playplaylist(req.params.playlistid)
    .then((data) => res.send(data));
});

module.exports = Router;
