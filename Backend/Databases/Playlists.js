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
  creator: mongoose.Schema.Types.ObjectId,
  visibility: { enum: ["private", "public"] },
  likes: Number,
  plays: Number,
  cover: String,
  tracks: [],
  time:Number,
  releaseDate: Date,
});
musicschema.plugin(timestamp);

const playlist = mongoose.model("playlist", musicschema);
