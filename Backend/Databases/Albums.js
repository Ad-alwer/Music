const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const jwt = require("jsonwebtoken");

const userDB = require("./Users");

require("dotenv").config();

mongoose.connect(process.env.DB_ADRESS);

const musicschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uniqe: true,
    lowercase: true,
    trim: true,
  },
  artist: mongoose.Types.ObjectId,
  status: String,
  likes: { type: Number, default: 0 },
  plays: { type: Number, default: 0 },
  description: {
    type: String,
    maxlength: 4000,
    trim: true,
  },
  cover: {},
  tracks: [],
  totalduaration: Number,
  genre: String,
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
  totalduaration,
  tracks
) {
  try {
    tracks.forEach((track) => {
      track._id = artist;
    });
    status = status.toLowerCase();
    artist = new mongoose.Types.ObjectId(artist);
    const useralbum = new Album({
      name,
      artist,
      status,
      description,
      cover,
      status,
      genre,
      tracks,
      totalduaration,
    });
    useralbum.save();
    return useralbum;
  } catch {
    return false;
  }
}
async function editalbum(
  id,
  name,
  genre,
  status,
  description,
  cover,
  tracks,
  totalduaration
) {
  try {
    if (cover) {
      await Album.findByIdAndUpdate(id, {
        $set: {
          name,
          genre,
          status,
          description,
          cover,
          tracks,
          totalduaration,
        },
      });
    } else {
      await Album.findByIdAndUpdate(id, {
        $set: {
          name,
          genre,
          status,
          description,
          tracks,
          totalduaration,
        },
      });
    }
    return {
      status: true,
      msg: "Album edited successfully",
    };
  } catch {
    return {
      status: false,
      msg: "Please try again",
    };
  }
}

async function deletealbum(id) {
  try {
    await Album.findByIdAndRemove(id);
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
    return {
      msg: "Please try again",
      status: false,
    };
  }
}
async function findalbum(id) {
  const album = await Album.findById(id);
  return album;
}

async function play(albumid, trackid) {
  try {
    const album = await Album.findById(albumid);

    let tracks = album.tracks;
    const index = tracks.findIndex((track) => track._id == trackid);
    tracks[index].plays += 1;

    let albumplays = (album.plays += 1);

    await Album.findByIdAndUpdate(albumid, {
      $set: {
        tracks,
        plays: albumplays,
      },
    });
    return true;
  } catch {
    return false;
  }
}

async function monthlyListener(albumid, trackid) {
  const album = await Album.findById(albumid);
  let tracks = album.tracks;
  const index = tracks.findIndex((track) => track._id == trackid);

  let monthlylisteners = tracks[index].monthlyListener;
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

  await Album.findByIdAndUpdate(albumid, {
    $set: {
      tracks,
    },
  });
}

async function getallalbums() {
  return await Album.find({});
}

async function getuseralbum(token) {
  const decode = jwt.verify(token, process.env.REGISTER_JWT);
  const albums = await Album.find({});
  const search = albums.filter(
    (album) => album.tracks[0].artistid === decode._id
  );
  return search;
}

async function gettopalbum() {
  let albums = await getallalbums();

  albums.sort((a, b) => b.plays - a.plays);

  let resault = albums.slice(0, 20);
  return resault;
}

async function searchbyusername(name) {
  const albums = await Album.find({
    name: { $regex: name, $options: "i" },
  });
  return albums.filter((e) => e.status.toLowerCase() === "public");
}

module.exports = {
  addalbum,
  editalbum,
  deletealbum,
  changestatus,
  findalbum,
  play,
  monthlyListener,
  getallalbums,
  getuseralbum,
  gettopalbum,
  searchbyusername,
};
