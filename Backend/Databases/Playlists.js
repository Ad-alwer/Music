const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const jwt = require("jsonwebtoken");

const trackDB = require("./Tracks");
const AlbumDB = require("./Albums");

require("dotenv").config();

mongoose.connect(process.env.DB_ADRESS).then(() => console.log("conect"));

const musicschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  isdeleteaccount: { type: Boolean, default: false },
  creator: mongoose.Schema.Types.ObjectId,
  visibility: String,
  likes: { type: Number, default: 0 },
  plays: { type: Number, default: 0 },
  cover: {},
  tracks: [],
});
musicschema.plugin(timestamp);

const Playlist = mongoose.model("playlist", musicschema);

async function createdplaylist(name, visibility, cover, tracks, creatorid) {
  try {
    let creator = new mongoose.Types.ObjectId(creatorid);
    const newplaylist = new Playlist({
      name,
      visibility,
      cover,
      tracks,
      creator,
    });
    await newplaylist.save();
    return newplaylist._id;
  } catch {
    return false;
  }
}

async function editplaylist(id, name, visibility, cover, tracks) {
  try {
    if (cover) {
      await Playlist.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name,
            visibility,
            tracks,
            cover,
          },
        }
      );
    } else {
      await Playlist.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name,
            visibility,
            tracks,
          },
        }
      );
    }

    return {
      status: true,
      msg: "Playlist edited successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      msg: "Please try again",
    };
  }
}

async function changeplayliststatus(id, visibility) {
  try {
    await Playlist.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          visibility,
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
      status: true,
      msg: "Deleted successfully",
    };
  } catch {
    return {
      msg: "Please try again",
      status: false,
    };
  }
}

async function checkplaylistname(name) {
  try {
    const playlist = await Playlist.findOne({ name });
    return playlist ? false : true;
  } catch {
    return false;
  }
}

async function getuserplaylist(token) {
  const decode = jwt.verify(token, process.env.REGISTER_JWT);

  let library = await trackDB.getalltracks();

  let albums = await AlbumDB.getallalbums();
  albums.forEach((album) => {
    album.tracks.forEach((track) => {
      track.cover = album.cover;
      library.push(track);
    });
  });

  const playlists = await Playlist.find({ creator: decode._id });

  playlists.forEach((playlist) => {
    playlist.tracks.forEach((track, index) => {
      const foundItem = library.find((item) => item._id.toString() == track);
      if (foundItem) {
        playlist.tracks[index] = foundItem;
      }
    });
  });

  return playlists;
}

async function getallplaylists() {
  return await Playlist.find({});
}

async function findplaylistbyid(id) {
  return await Playlist.findById(id);
}
async function topplaylist() {
  let playlists = await getallplaylists();

  playlists.sort((a, b) => b.plays - a.plays);

  let resault = playlists.slice(0, 20);
  return resault;
}

module.exports = {
  checkplaylistname,
  createdplaylist,
  editplaylist,
  changeplayliststatus,
  addtracktoplaylist,
  deletaccountplaylists,
  deletplaylist,
  getuserplaylist,
  getallplaylists,
  findplaylistbyid,
  topplaylist,
};
