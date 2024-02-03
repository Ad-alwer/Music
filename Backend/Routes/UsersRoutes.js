const express = require("express");
const Router = express.Router();

require("dotenv").config();

const usersDB = require("../Databases/users");
const trackDB = require("../Databases/Tracks");
const { loginback } = require("../Databases/DeletedAccounts");

Router.post("/login", (req, res) => {
  usersDB.login(...Object.values(req.body)).then(async (data) => {
    data ? await loginback(data.userid) : null;
    res.send(data);
  });
});

Router.get("/forgetpassword/:username", (req, res) => {
  usersDB.forgetpassword(req.params.username).then((data) => res.send(data));
});

Router.get("/verifyforgetlink", (req, res) => {
  usersDB.verify(req.headers.jwt).then((data) => res.send(data));
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

Router.get("/changeadmin/:userid", (req, res) => {
  usersDB.changeadmin(req.params.userid).then((data) => res.send(data));
});

Router.get("/subscribe/:id", (req, res) => {
  usersDB
    .subscribe(req.headers.jwt, req.body.id)
    .then((data) => res.send(data));
});

Router.get("/checktrackname/:name", (req, res) => {
  usersDB
    .checktrackname(req.headers.jwt, req.params.name)
    .then((data) => res.send(data));
});

Router.get("/checkalbumname/:name", (req, res) => {
  usersDB
    .checkalbumname(req.headers.jwt, req.params.name)
    .then((data) => res.send(data));
});

Router.put("/savealbum/:albumid", (req, res) => {
  usersDB
    .savealbum(req.headers.jwt, req.params.albumidid)
    .then((data) => res.send(data));
});

Router.put("/savetrack/:trackid", (req, res) => {
  usersDB
    .savetrack(req.headers.jwt, req.params.trackidid)
    .then((data) => res.send(data));
});

Router.put("/favouritegenre/:genre", (req, res) => {
  usersDB
    .changefavouritegenre(req.headers.jwt, req.params.genre)
    .then((data) => res.send(data));
});

Router.put("/bio", (req, res) => {
  usersDB
    .changebio(req.headers.jwt, req.body.params)
    .then((data) => res.send(data));
});

Router.delete("/deletesocial/:name", async (req, res) => {
  usersDB
    .deletsocial(req.headers.jwt, req.params.name)
    .then((data) => res.send(data));
});

Router.put("/verifytrack/:name", (res, req) => {
  usersDB
    .verifytrack(req.headers.jwt, req.params.name)
    .then((data) => res.send(data));
});

Router.put("/rejectrack/:name", (res, req) => {
  usersDB
    .rejectrack(req.headers.jwt, req.params.name, req.body.msg)
    .then((data) => res.send(data));
});

Router.get("/search/:username", (req, res) => {
  usersDB.searchbyusername(req.params.username).then((data) => res.send(data));
});

Router.put("/addrecommanduser/:id", (res, req) => {
  usersDB
    .addrecomendeuser(req.headers.jwt, req.params.id)
    .then((data) => res.send(data));
});

Router.put("/removerecommanduser/:id", (res, req) => {
  usersDB
    .removerecommandeuser(req.headers.jwt, req.params.id)
    .then((data) => res.send(data));
});

Router.put("/like/:tackid", (res, req) => {
  usersDB.favourite(req.headers.jwt, req.params.trackidid).then((data) => {
    trackDB.like(req.headers.jwt, trackid, data).then((data) => res.send(data));
  });
});

Router.put("/lastplay", (req, res) => {
  usersDB
    .lastplay(req.headers.jwt, req.body.data)
    .then((data) => res.send(data));
});

Router.put("/verifyalbum/:name", (req, res) => {
  usersDB
    .verifyalbum(req.headers.jwt, req.params.name)
    .then((data) => res.send(data));
});

Router.put("/rejectalbum/:name", (req, res) => {
  usersDB
    .rejectalbum(req.headers.jwt, req.params.name, req.body, msg)
    .then((data) => res.send(data));
});

module.exports = Router;
