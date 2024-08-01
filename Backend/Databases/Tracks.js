const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const jwt = require("jsonwebtoken");

const userDB = require("../Databases/Users.js");
const albumDB = require("../Databases/Albums.js");

const { getusernamebyid } = require("../Databases/Users.js");
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
  type: String,
  genre: String,
  artist: {},
  status: String,
  isdeletaccount: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  plays: { type: Number, default: 0 },
  description: {
    type: String,
    maxlength: 4000,
    trim: true,
  },
  album: { type: mongoose.Schema.Types.ObjectId, default: null },
  lyric: String,
  cover: {},
  feat: [],
  track: {},
  monthlyListener: [],
});
musicschema.plugin(timestamp);

const Track = mongoose.models.Track || mongoose.model("Track", musicschema);

async function addtrack(
  name,
  type,
  genre,
  artist,
  description,
  lyric,
  cover,
  feat,
  track,
  status
) {
  try {
    artist = new mongoose.Types.ObjectId(artist);
    const usertrack = new Track({
      name,
      type,
      genre,
      artist,
      description,
      album: null,
      lyric,
      cover,
      feat,
      track,
      status,
    });
    await usertrack.save();
    return usertrack;
  } catch {
    return false;
  }
}

async function like(token, id, status) {
  try {
    if (status === "add") {
      await Track.findByIdAndUpdate(
        id,
        {
          $inc: {
            likes: 1,
          },
        },
        { new: true }
      );

      return true;
    } else if (status === "remove") {
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

async function edittrack(
  id,
  name,
  type,
  genre,
  status,
  description,
  lyric,
  cover
) {
  try {
    if (cover) {
      await Track.findByIdAndUpdate(id, {
        $set: {
          name,
          type,
          genre,
          status,
          description,
          lyric,
          cover,
        },
      });
    } else {
      await Track.findByIdAndUpdate(id, {
        $set: {
          name,
          type,
          genre,
          status,
          description,
          lyric,
        },
      });
    }

    return {
      msg: "Edited successfully",
      status: true,
    };
  } catch {
    return {
      msg: "Please try again",
      status: false,
    };
  }
}

async function deletetrack(id) {
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
    await Track.findByIdAndUpdate(id, {
      $set: {
        status: newstatus,
      },
    });
    return {
      msg: "Track status changed",
      status: true,
    };
  } catch {
    return false;
  }
}

async function playtrack(id) {
  try {
    await Track.findByIdAndUpdate(id, {
      $inc: {
        plays: +1,
      },
    });
    return true;
  } catch {
    return false;
  }
}
async function monthlyListener(id) {
  const track = await Track.findById(id);
  if (track) {
    let monthlylisteners = track.monthlyListener;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const today = `${currentYear} - ${currentMonth}`;
    const search = monthlylisteners.find((e) => {
      return e.date === today;
    });
    if (search) {
      search.view++;
    } else {
      monthlylisteners.push({
        date: today,
        view: 1,
      });
    }

    await Track.findByIdAndUpdate(id, {
      $set: {
        monthlyListener: monthlylisteners,
      },
    });
  } else {
    let library = [];
    let albums = await albumDB.getallalbums();
    albums.forEach((album) => {
      album.tracks.forEach((track) => {
        track.albumid = album._id;
        library.push(track);
      });
    });

    let search = library.findIndex((e) => {
      return e._id.toString() === id.toString();
    });
    await albumDB.play(library[search].albumid, library[search]._id);
    albumDB.monthlyListener(library[search].albumid, library[search]._id);
  }
}

async function changealbum(trackid, albumid) {
  try {
    await Track.findByIdAndUpdate(trackid, {
      $set: {
        album: albumid,
      },
    });
    return {
      msg: "Edited successfully",
      status: true,
    };
  } catch {
    return {
      msg: "Please try again",
      status: false,
    };
  }
}

async function deletedaccounttracks(id) {
  try {
    const tracks = await Track.find({ artist: id });
    for (const track of tracks) {
      await Track.findByIdAndUpdate(track._id, {
        $set: {
          isdeletaccount: true,
        },
      });
    }
    return true;
  } catch {
    return false;
  }
}
async function loginback() {
  try {
    const tracks = await Track.find({ artist: id });

    for (const track of tracks) {
      await Track.findByIdAndUpdate(track._id, {
        $set: {
          isdeletaccount: false,
        },
      });
    }
    return true;
  } catch {
    return false;
  }
}

async function findtrackbyid(id) {
  const track = await Track.findById(id);
  return track;
}

async function search(name) {
  try {
    let library = [];
    const tracks = await Track.find();
    tracks.forEach(async (track) => {
      if (track.status.toLowerCase() == "public") {
        library.push(track);
      }
    });

    const albums = await albumDB.getallalbums();
    albums.forEach((album) => {
      album.tracks.forEach(async (e) => {
        if (e.status.toLowerCase() == "public") {
          e.cover = album.cover;
          library.push(e);
        }
      });
    });

    const regex = new RegExp(name, "i");
    const searchResults = library.filter((e) => regex.test(e.name));
    return searchResults;
  } catch {
    return false;
  }
}
async function getalltracks() {
  const tracks = await Track.find({});
  return tracks;
}

async function toptrack(type) {
  let tracks = await Track.find({});
  let resault;
  if (type === "podcast") {
    let podcast = tracks.filter((e) => e.type.toLowerCase() === "podcast");
    podcast.sort((a, b) => b.plays - a.plays);
    resault = podcast.slice(0, 20);
  } else {
    let library = tracks.filter((e) => {
      return e.type.toLowerCase() === "music";
    });

    let albums = await albumDB.getallalbums();
    for (let album of albums) {
      for (let track of album.tracks) {
        track.cover = album.cover;
        library.push(track);
      }
    }
    library.sort((a, b) => b.plays - a.plays);

    resault = library.slice(0, 20);
  }
  return resault;
}

async function getusertrack(token) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const artist = new mongoose.Types.ObjectId(decode._id);
    const resault = await Track.find({ artist });
    return resault;
  } catch {
    return false;
  }
}

module.exports = {
  addtrack,
  like,
  edittrack,
  deletetrack,
  changestatus,
  playtrack,
  monthlyListener,
  changealbum,
  deletedaccounttracks,
  loginback,
  findtrackbyid,
  search,
  getalltracks,
  toptrack,
  getusertrack,
};
