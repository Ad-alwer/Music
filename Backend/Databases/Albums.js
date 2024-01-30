const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const schedule = require("node-schedule");

require("dotenv").config();

mongoose.connect(process.env.DB_ADRESS).then(() => {
  console.log("conect");
  schedule.scheduleJob("00 01 * * *", () => {
    schdulealbum();
  });
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
  schedule: Date,
  releaseDate: Date,
});
musicschema.plugin(timestamp);

const Album = mongoose.model("album", musicschema);

async function schdulealbum() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;

  const pendeingalbum = await Album.find({ releaseDate: { $ne: null } });
  pendeingalbum.forEach(async (e) => {
    const date = new Date(e.createdAt);
    const extractedDate = date.toISOString().split("T")[0];
    if (today.getTime() >= extractedDate.getTime()) {
      await Album.findByIdAndUpdate(e.id, {
        $set: {
          status: "public",
          releaseDate: currentDate,
          schedule: null,
        },
      });
    }
  });
}

async function addalbum(
  name,
  artist,
  description,
  cover,
  status,
  genre,
  schdule
) {
  try {
    const currentDate = new Date();
    const scheduledDate = new Date(schdule);
    if (scheduledDate <= currentDate) {
      const useralbum = new Album({
        name,
        artist,
        status,
        description,
        cover,
        tracks,
        schdule: null,
        releaseDate: currentDate,
        genre,
      });
      return useralbum;
    } else {
      const useralbum = new Album({
        name,
        artist,
        status,
        description,
        cover,
        tracks,
        schdule,
        releaseDate: null,
        genre,
      });
      return useralbum;
    }
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
