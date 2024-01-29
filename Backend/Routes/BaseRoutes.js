const express = require("express");
const Router = express.Router();

const baseDB = require("../Databases/Base");

require("dotenv").config();

Router.put("/change/:field&&:fieldval", (req, res) => {
  baseDB
    .change(req.params.field, req.param.fieldval)
    .then((data) => res.send(data));
});

Router.put("/addgenre/:genre", (req, res) => {
  baseDB.addgenre(req.params.genre).then((data) => res.send(data));
});

Router.delete("/banner/:name&&:link",(req,res)=>{
  baseDB.removebanner(req.params.name,req.params.link).then((data) => res.send(data));
})

Router.delete("/resbanner/:name&&:link",(req,res)=>{
  baseDB.removeresbanner(req.params.name,req.params.link).then((data) => res.send(data));
})



module.exports = Router;
