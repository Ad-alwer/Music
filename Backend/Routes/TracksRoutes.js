const express = require("express");
const Router = express.Router();

require("dotenv").config();

const trackDB = require("../Databases/Tracks");
const userDB = require("../Databases/Users");

Router.put("/update/:trackid", (req, res) => {
  userDB.edittrack(req.headers.jwt, req.body.id, req.body.name).then((data) => {
    if (data) {
      trackDB
        .edittrack(req.params.trackid, ...Object.keys(req.body))
        .then((data) => res.send(data));
    } else {
      res.send(false);
    }
  });
});

Router.delete("/delete/:trackid", (req, res) => {
  userDB.deletetrack(req.headers.jwt, req.params.trackid).then((data) => {
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

Router.put("/changealbum/:trackid&&:albumid", (req, res) => {
  trackDB
    .changealbum(req.params.trackid, req.params.albumid)
    .then((data) => res.send(data));
});

Router.put("/like/:id", (req, res) => {
  userDB.like(req.headers.jwt, req.params.id).then((data) => {
    if (data) {
      trackDB.like(req.headers.jwt, req.params.id, "add").then((data) => {
        return res.send(data);
      });
    } else {
      res.send(data);
    }
  });
});

Router.put("/unlike/:id", (req, res) => {
  userDB.unlike(req.headers.jwt, req.params.id).then((data) => {
    if (data) {
      trackDB.like(req.headers.jwt, req.params.id, "remove").then((data) => {
        return res.send(data);
      });
    } else {
      res.send(data);
    }
  });
});

Router.put("/savetrack/:id", (req, res) => {
  userDB
    .savetrack(req.headers.jwt, req.params.id)
    .then((data) => res.send(data));
});

Router.put("/removesavetrack/:id", (req, res) => {
  userDB
    .removesavetrack(req.headers.jwt, req.params.id)
    .then((data) => res.send(data));
});

Router.get("/search/:name", (req, res) => {
  trackDB.search(req.params.name).then((data) => {
    res.send(data);
  });
});

Router.get("/toptracks/:type", (req, res) => {
  trackDB.toptrack(req.params.type).then((data) => {
    if (data) {
      userDB.changeidtouser(data).then((data) => {
        res.send(data);
      });
    } else {
      return false;
    }
  });
});

module.exports = Router;
