const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");

require("dotenv").config();

const usersDB = require("../Databases/users");
const trackDB = require("../Databases/Tracks");
const { loginback } = require("../Databases/DeletedAccounts");

Router.post("/login", (req, res) => {
  usersDB.login(...Object.values(req.body)).then(async (data) => {
    data.status ? await loginback(data.userid) : null;
    res.send(data);
  });
});

Router.get("/forgetpassword/:username", (req, res) => {
  console.log('in');
  usersDB.forgetpassword(req.params.username).then((data) => res.send(data));
});

Router.get("/verifyforgetlink", (req, res) => {
  usersDB.verify(req.headers.token).then((data) => res.send(data));
});

Router.put("/changepasswordbylink", (req, res) => {
  usersDB
    .changepasswordbylink(...Object.values(req.body))
    .then((data) => res.send(data));
});

Router.get("/user", (req, res) => {
  usersDB.getuser(req.headers.jwt).then((data) => res.send(data));
});

Router.put("/changeusername/:newusername", (req, res) => {
  usersDB
    .changeusername(req.headers.jwt, req.params.newusername)
    .then((data) => res.send(data));
});

Router.get("/users", (req, res) => {
  usersDB.getallusers().then((data) => res.send(data));
});
Router.get("/verifyusers", (req, res) => {
  usersDB.verifyusers().then((data) => res.send(data));
});

Router.get("/changeadmin/:userid", (req, res) => {
  usersDB.changeadmin(req.params.userid).then((data) => res.send(data));
});

Router.get("/changeverify/:userid", (req, res) => {
  usersDB.changeverify(req.params.userid).then((data) => res.send(data));
});

Router.get("/changebanupload/:userid", (req, res) => {
  usersDB.changebanupload(req.params.userid).then((data) => res.send(data));
});

Router.get("/getrequests", (req, res) => {
  usersDB.getrequests().then((data) => res.send(data));
});

Router.get("/subscribe/:id", (req, res) => {
  usersDB
    .subscribe(req.headers.jwt, req.params.id)
    .then((data) => res.send(data));
});
Router.get("/unsubscribe/:id", (req, res) => {
  usersDB
    .unsubscribe(req.headers.jwt, req.params.id)
    .then((data) => res.send(data));
});

Router.get("/checktrackandalbumname/:name&&:edit", (req, res) => {
  usersDB
    .checktrackandalbumname( req.params.name,req.params.edit)
    .then((data) => res.send(data));
});

Router.put("/savealbum/:albumid", (req, res) => {
  usersDB
    .savealbum(req.headers.jwt, req.params.albumidid)
    .then((data) => res.send(data));
});

Router.put("/savetrack/:trackid", (req, res) => {
  usersDB
    .savetrack(req.headers.jwt, req.params.trackid)
    .then((data) => res.send(data));
});

Router.put("/favouritegenre/:genre", (req, res) => {
  usersDB
    .changefavouritegenre(req.headers.jwt, req.params.genre)
    .then((data) => res.send(data));
});

Router.put("/bio", (req, res) => {
  usersDB
    .changebio(req.headers.jwt, req.body.text)
    .then((data) => res.send(data));
});

Router.put("/addsocial", async (req, res) => {
  usersDB
    .addsocialmedia(
      req.headers.jwt,
      req.body.title,
      req.body.icon,
      req.body.link
    )
    .then((data) => res.send(data));
});

Router.delete("/deletesocial/:name", async (req, res) => {
  usersDB
    .deletsocial(req.headers.jwt, req.params.name)
    .then((data) => res.send(data));
});

Router.put("/editsocial", async (req, res) => {
  usersDB
    .editsocialmedia(
      req.headers.jwt,
      req.body.data,
    )
    .then((data) => res.send(data));
});

Router.put("/verifytrack/:jwt/:name", (req, res) => {
  usersDB
    .verifytrack(req.params.jwt, req.params.name)
    .then((data) => res.send(data));
});

Router.put("/rejectrack/:jwt/:name", (req, res) => {
  usersDB
    .rejectrack(req.params.jwt, req.params.name, req.body.msg)
    .then((data) => res.send(data));
});

Router.get("/search/:username", (req, res) => {
  usersDB.searchbyusername(req.params.username).then((data) => res.send(data));
});

Router.put("/addrecommanduser/:id", (req, res) => {
  usersDB
    .addrecomendeuser(req.headers.jwt, req.params.id)
    .then((data) => res.send(data));
});

Router.put("/removerecommanduser/:id", (req, res) => {
  usersDB
    .removerecommandeuser(req.headers.jwt, req.params.id)
    .then((data) => res.send(data));
});

Router.put("/like/:tackid", (req, res) => {
  usersDB.favourite(req.headers.jwt, req.params.trackidid).then((data) => {
    trackDB.like(req.headers.jwt, trackid, data).then((data) => res.send(data));
  });
});

Router.put("/lastplay", (req, res) => {
  usersDB
    .lastplay(req.headers.jwt, req.body.data)
    .then((data) => res.send(data));
});
Router.get("/lastplay", (req, res) => {
  usersDB.getlastplay(req.headers.jwt).then((data) => res.send(data));
});

Router.put("/verifyalbum/:name", (req, res) => {
  usersDB
    .verifyalbum(req.headers.jwt, req.params.name)
    .then((data) => res.send(data));
});

Router.put("/rejectalbum/:name", (req, res) => {
  usersDB
    .rejectalbum(req.headers.jwt, req.params.name, req.body.msg)
    .then((data) => res.send(data));
});

Router.get("/getuserbyidorusername/:data", async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.data)) {
    await usersDB.getuserbyid(req.params.data).then((data) => res.send(data));
  } else {
    await usersDB
      .getuserbyusername(req.params.data)
      .then((data) => res.send(data));
  }
});

Router.get("/getusertracks/:type/:id", (req, res) => {
  usersDB
    .gettracks(req.params.type, req.params.id)
    .then((data) => res.send(data));
});

module.exports = Router;
