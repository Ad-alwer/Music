const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const jwt = require("jsonwebtoken");
require("dotenv").config();

mongoose.connect(process.env.DB_ADRESS).then(() => console.log("conect"));

const musicschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uniqe: true,
    lowercase: true,
    trim: true,
  },
  type: { enum: ["music", "podcast"] },
  genre: String,
  artist: mongoose.Schema.Types.ObjectId,
  status: { enum: ["active", "deleted", "private", "pending"] },
  likes: Number,
  plays: Number,
  description: {
    type: String,
    maxlength: 4000,
    trim: true,
    
  },
  album: mongoose.Schema.Types.ObjectId,
  lyric: String,
  cover: String,
  feat: [],
  track: String,
  monthlyListener: [],
  schedule: Date,
  releaseDate: Date,
});
musicschema.plugin(timestamp);

const Track = mongoose.model("track", musicschema);
