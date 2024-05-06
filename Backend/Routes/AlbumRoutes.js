const express = require("express");
const Router = express.Router();

const albumDB = require("../Databases/Albums");
const { editalbum, deletealbum } = require("../Databases/Users");

Router.put("/update/:albumid", (req, res) => {
  editalbum(req.headers.jwt, req.params.albumid, req.body.name).then((data) => {
    if (data) {
      albumDB
        .editalbum(req.params.albumid, ...Object.keys(req.body))
        .then((data) => res.send(data));
    } else {
      res.send(false);
    }
  });
});

Router.delete("/delete/:albumid", (req, res) => {
  deletealbum(req.headers.jwt, req.params.id).then((data) => {
    if (data) {
      trackDB.deletealbum(req.params.id).then((data) => res.send(data));
    } else {
      res.send(false);
    }
  });
});

Router.put("/changestatus/:albumid&&:newstatus", (req, res) => {
  trackDB;
  albumDB
    .changestatus(req.params.albumid, req.params.newstatus)
    .then((data) => res.send(data));
});

Router.get("/:id", (req, res) => {
  albumDB.findalbum(req.params.id).then((data) => {
    res.send(data);
  });
});

Router.put("/play/:albumid/:trackid", (req, res) => {
  albumDB.play(req.params.albumid, req.params.trackid).then((data) => {
    data
      ? albumDB.monthlyListener(req.params.albumid, req.params.trackid).then((data) =>
          res.send(data)
        )
      : res.send(data);
  });
});

module.exports = Router;
