const express = require("express");
const Router = express.Router();

const playlistDB = require("../Databases/Playlists");
const { getuser } = require("../Databases/Users");

require("dotenv").config();

Router.get("/chackname/:name", async (req, res) => {
  const user = await getuser(req.headers.jwt);
  playlistDB.checkplaylistname(user._id).then((data) => res.send(data));
});

Router.post("/add", async (req, res) => {
  const user = await getuser(req.headers.jwt);

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


Router.put("/edit", async(req,res)=>{
    const user = await getuser(req.headers.jwt);
    playlistDB.editplaylist(user._id,...Object.keys(req.params)).then(data=>res.send(data))
})

Router.put("/changeplayliststatus/:playlistname&&:status", async(req,res)=>{
    const user = await getuser(req.headers.jwt);
    playlistDB.changeplayliststatus(user._id,req.paramsplaylistname,req.params.status).then(data=>res.send(data))
})


Router.put("/addtrack/:name&&:track", async (req,res)=>{
    const user = await getuser(req.headers.jwt);
    playlistDB.addtracktoplaylist(user._id,req.params.name,req.params.track).then(data=>res.send(data))
})

Router.delete("/delete/:trackid",(req,res)=>{
playlistDB.deletplaylist(req.params.trackid).then(data =>
  res.send(data))
})





module.exports = Router;
