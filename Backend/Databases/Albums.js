const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

require("dotenv").config();

mongoose.connect(process.env.DB_ADRESS).then(() => {
  console.log("conect");
});

const musicschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uniqe: true,
    lowercase: true,
    trim: true,
  },
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
  cover: String,
  tracks: [],
  monthlyListener: [],
  totalduaration: 0,
  releaseDate: Date,
});
musicschema.plugin(timestamp);

const Album = mongoose.model("album", musicschema);

async function addalbum(
  name,
  artist,
  description,
  cover,
  status,
  genre,
  totalduaration
) {
  try {
    const currentDate = new Date();
    const useralbum = new Album({
      name,
      artist,
      status,
      description,
      cover,
      tracks,
      totalduaration,
      releaseDate: currentDate,
      genre,
    });
    return useralbum;
  } catch {
    return false;
  }
}
async function editalbum(
  id,
  name,
  type,
  genre,
  status,
  description,
  cover,
  tracks
) {
  try {
    await Album.findByIdAndUpdate(id, {
      $set: {
        name,
        type,
        genre,
        status,
        description,
        cover,
        tracks,
      },
    });
    return true;
  } catch {
    return false;
  }
}

async function deletealbum(id) {
  try {
    await Track.findByIdAndRemove(id);
    return {
      msg: "Deleted successfully",
      status: true,
    };
  } catch {
    return {
      msg: "Please try again",
      status: false,
    };
  }
}

async function changestatus(id, newstatus) {
  try {
    await Album.findByIdAndUpdate(id, {
      $set: {
        status: newstatus,
      },
    });
    return {
      msg: "Album status changed",
      status: true,
    };
  } catch {
    return false;
  }
}

module.exports = {
  addalbum,
  editalbum,
  deletealbum,
  changestatus,
};
