const express = require("express");
const Router = express.Router();

const baseDB = require("../Databases/Base");

require("dotenv").config();

Router.get("/", (req, res) => {
  baseDB.getdata().then((data) => res.send(data));
});

Router.put("/change/:field&&:fieldval", (req, res) => {
  baseDB
    .change(req.params.field, req.params.fieldval)
    .then((data) => res.send(data));
});

Router.put("/addgenre", (req, res) => {
  baseDB.addgenre(req.body.name, req.body.color).then((data) => res.send(data));
});

Router.delete("/banner/:id", (req, res) => {
  baseDB
    .removebanner(req.params.id)
    .then((data) => res.send(data));
});

Router.delete("/resbanner/:id", (req, res) => {
  baseDB
    .removeresbanner(req.params.id)
    .then((data) => res.send(data));
});

Router.delete("/genre/:id", (req, res) => {
  baseDB
    .removegenre(req.params.id)
    .then((data) => res.send(data));
});

Router.delete("/socialicon/:id", (req, res) => {
  baseDB
    .removesocialicon(req.params.id)
    .then((data) => res.send(data));
});

module.exports = Router;
