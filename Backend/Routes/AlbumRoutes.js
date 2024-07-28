const express = require("express");
const Router = express.Router();

const albumDB = require("../Databases/Albums.js");
const userDB = require("../Databases/Users.js");

Router.delete("/delete/:albumid", (req, res) => {
  userDB.deletealbum(req.headers.jwt, req.params.albumid).then((data) => {
    if (data) {
      albumDB.deletealbum(req.params.albumid).then((data) => res.send(data));
    } else {
      return {
        msg: "Please try again",
        status: false,
      };
    }
  });
});

Router.put("/changestatus/:albumid&&:newstatus", (req, res) => {
  albumDB
    .changestatus(req.params.albumid, req.params.newstatus)
    .then((data) => res.send(data));
});

Router.put("/play/:albumid/:trackid", (req, res) => {
  albumDB.play(req.params.albumid, req.params.trackid).then((data) => {
    data
      ? albumDB
          .monthlyListener(req.params.albumid, req.params.trackid)
          .then((data) => res.send(data))
      : res.send(data);
  });
});

Router.get("/finduseralbum", (req, res) => {
  albumDB.getuseralbum(req.headers.jwt).then((data) => {
    res.send(data);
  });
});

Router.get("/topalbum", (req, res) => {
  albumDB.gettopalbum().then((data) => {
    if (data) {
      userDB.changeidtouser(data,'album').then(data=>res.send(data))
    }else{
      return false
    }
  });
});

module.exports = Router;
