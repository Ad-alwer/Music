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
  status: { enum: ["public", "deleted", "private", "pending"] },
  likes: { type: String, default: 0 },
  plays: { type: String, default: 0 },
  description: {
    type: String,
    maxlength: 4000,
    trim: true,
  },
  album: { type: mongoose.Schema.Types.ObjectId, default: null },
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

async function addtrack(
  name,
  type,
  genre,
  artist,
  description,
  album,
  lyric,
  cover,
  feat,
  track,
  schdule,
  status
) {
  try {
    const currentDate = new Date();
    const scheduledDate = new Date(schdule);
    if (scheduledDate <= currentDate) {
      const track = new Track({
        name,
        type,
        genre,
        artist,
        description,
        album,
        lyric,
        cover,
        feat,
        track,
        status,
        releaseDate: currentDate,
      });
      await track.save();
      return track;
    } else {
      const track = new Track({
        name,
        type,
        genre,
        artist,
        description,
        album,
        lyric,
        cover,
        feat,
        track,
        status,
        schdule,
        releaseDate: null,
      });
      await track.save();
      return track;
    }
  } catch {
    return false;
  }
}

async function like(id, status) {
  try {
    if (status == "add") {
      await Track.findByIdAndUpdate(id, {
        $inc: {
          likes: -1,
        },
      });
      return true;
    } else if (status == "remove") {
      await Track.findByIdAndUpdate(id, {
        $inc: {
          likes: -1,
        },
      });
      return true;
    }
  } catch {
    return false;
  }
}

module.exports = {
  addtrack,
  like
};
