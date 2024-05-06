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
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.log(err);
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

module.exports = {
  addalbum,
  editalbum,
  deletealbum,
  changestatus,
  findalbum,
  play,
  monthlyListener,
};
