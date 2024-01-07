const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const jwt = require("jsonwebtoken");
require("dotenv").config();

mongoose.connect(process.env.DB_ADRESS).then(() => console.log("conect"));

const musicschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    uniqe: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    uniqe: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  status:{enum:['active','deleted']},
  isadmin: { type: Boolean, default: false },
  ismaster: { type: Boolean, default: false },
  Requests: [],
  Description:[],
  Socialmedia:[],
  subscribe: [],
  artists: [],
  saveAlbums: [],
  saveTracks: [],
  lastplays: {},
  notification: [],
  profile: { type: String, default: null },
  favouriteGenre: { type: String ,default:null},
  recommendUser:[],
});
musicschema.plugin(timestamp);

const User = mongoose.model("user", musicschema);
