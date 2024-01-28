const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
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
  isdeleteaccount: { type: Boolean, default: false },
  creator: mongoose.Schema.Types.ObjectId,
  visibility: { enum: ["private", "public"] },
  likes: { type: Number, default: 0 },
  plays: { type: Number, default: 0 },
  cover: String,
  tracks: [],
  releaseDate: Date,
});
musicschema.plugin(timestamp);

const Playlist = mongoose.model("playlist", musicschema);

async function checkplaylistname(userid, name) {
  const find = await Playlist.find({ creator: userid, name: name });
  return !find;
}

async function createdplaylist(
  name,
  visibility,
  cover,
  tracks,
  creator,
  releaseDate
) {
  try {
    const newplaylist = new Playlist({
      name,
      visibility,
      cover,
      tracks,
      creator,
      releaseDate,
    });
    await newplaylist.save();
    return newplaylist;
  } catch {
    return false;
  }
}

async function editplaylist(userid, name, visibility, cover, tracks) {
  try {
    await Playlist.findOneAndUpdate(
      { creator: userid, name: name },
      {
        $set: {
          visibility,
          cover,
          tracks,
        },
      }
    );
    return {
      status: true,
      msg: "Playlist edited successfully",
    };
  } catch {
    return {
      msg: "Please try again",
      status: false,
    };
  }
}

async function changeplayliststatus(userid, name, status) {
  try {
    await Playlist.findOneAndUpdate(
      { creator: userid, name: name },
      {
        $set: {
          status,
        },
      }
    );
    return {
      status: true,
      msg: "Playlist edited successfully",
    };
  } catch {
    return {
      msg: "Please try again",
      status: false,
    };
  }
}

async function addtracktoplaylist(userid, name, track) {
  try {
    await Playlist.findOneAndUpdate(
      { creator: userid, name: name },
      {
        $push: {
          tracks: track,
        },
      }
    );
    return {
      status: true,
      msg: "Track added successfully",
    };
  } catch {
    return {
      msg: "Please try again",
      status: false,
    };
  }
}

async function deletaccountplaylists(userid) {
  try {
    await Playlist.findByIdAndUpdate(
      { creator: userid },
      {
        $set: {
          isdeleteaccount: true,
        },
      }
    );
  } catch {
    return false;
  }
}

async function deletplaylist(id) {
  try {
    await Playlist.findByIdAndRemove(id);
    return {
      status:true,
      msg: "Deleted successfully",
    };
  } catch {
    return {
      msg: "Please try again",
      status: false,
    };
  }
}

module.exports = {
  checkplaylistname,
  createdplaylist,
  editplaylist,
  changeplayliststatus,
  addtracktoplaylist,
  deletaccountplaylists,
  deletplaylist
};
