const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const jwt = require("jsonwebtoken");
require("dotenv").config();

mongoose.connect(process.env.DB_ADRESS).then(() => console.log("conect"));

const musicschema = new mongoose.Schema({
  genres:[],
  banners:[],
  responsiveBanners:[],
  icn:String,
  newMusic:Boolean,
  trendMusic:Boolean,
  trendpodcast:Boolean,
  trendPodcast:Boolean,
  trendArtists:Boolean,
  topArtists:Boolean,
  topPlaylist:Boolean,
});

musicschema.plugin(timestamp);

const Base = mongoose.model("base", musicschema);

//TODO this default func