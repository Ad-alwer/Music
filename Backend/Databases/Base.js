const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const trackDB = require("./Tracks");
const albumDB = require("./Albums");

require("dotenv").config();
mongoose.connect(process.env.DB_ADRESS).then(() => console.log("conect"));

const musicschema = new mongoose.Schema({
  genres: [],
  banners: [],
  responsivebanners: [],
  socialicon: [],
  icn: String,
  newMusic: { type: Boolean, default: false },
  trendMusic: { type: Boolean, default: false },
  trendpodcast: { type: Boolean, default: false },
  topArtists: { type: Boolean, default: false },
  topPlaylist: { type: Boolean, default: false },
});

musicschema.plugin(timestamp);

const Base = mongoose.model("base", musicschema);
isempty();

async function getdata() {
  const newbase = await Base.findOne({});
  return newbase;
}

async function isempty() {
  const data = await Base.find({});
  if (data.length == 0) {
    const newbase = new Base({});
    newbase.save();
  }
}

async function change(field, val) {
  try {
    await Base.findOneAndUpdate(
      {},
      {
        $set: {
          [field]: val,
        },
      }
    );

    return {
      status: true,
      msg: "Saved successfully",
    };
  } catch {
    return {
      status: false,
      msg: "Please try again",
    };
  }
}

async function addgenre(name, color) {
  try {
    const newObjectId = new mongoose.Types.ObjectId();
    await Base.findOneAndUpdate(
      {},
      {
        $push: {
          genres: {
            _id: newObjectId,
            name,
            color,
          },
        },
      }
    );
    return {
      status: true,
      msg: "Saved successfully",
    };
  } catch {
    return {
      status: false,
      msg: "please try again",
    };
  }
}
async function removegenre(id) {
  try {
    await Base.findOneAndUpdate(
      {},
      {
        $pull: {
          genres: { _id: new mongoose.Types.ObjectId(id) },
        },
      }
    );

    return {
      status: true,
      msg: "Deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      msg: "Please try again",
    };
  }
}
async function addsocialicon(name, file) {
  const newObjectId = new mongoose.Types.ObjectId();
  try {
    await Base.findOneAndUpdate(
      {},
      {
        $push: {
          socialicon: {
            _id: newObjectId,
            name,
            file,
          },
        },
      }
    );
    return {
      status: true,
      msg: "Saved successfully",
    };
  } catch {
    return {
      status: false,
      msg: "please try again",
    };
  }
}
async function removesocialicon(id) {
  try {
    await Base.findOneAndUpdate(
      {},
      {
        $pull: {
          socialicon: { _id: new mongoose.Types.ObjectId(id) },
        },
      }
    );

    return {
      status: true,
      msg: "Deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      msg: "Please try again",
    };
  }
}

async function findsocialmedia(name) {
  const base = await Base.findOne({});
  const socilamedia = base.socialicon;

  const search = socilamedia.find((e) => e.name === name);
  if (search) {
    return search.file.url;
  } else {
    return false;
  }
}

async function addbanner(banner) {
  try {
    const newObjectId = new mongoose.Types.ObjectId();

    await Base.findOneAndUpdate(
      {},
      {
        $push: {
          banners: { _id: newObjectId, banner },
        },
      }
    );
    return {
      status: true,
      msg: "Saved successfully",
    };
  } catch {
    return {
      status: false,
      msg: "Please try again",
    };
  }
}

async function removebanner(id) {
  try {
    await Base.findOneAndUpdate(
      {},
      {
        $pull: {
          banners: { _id: new mongoose.Types.ObjectId(id) },
        },
      }
    );

    return {
      status: true,
      msg: "Deleted successfully",
    };
  } catch (error) {
    return {
      status: false,
      msg: "Please try again",
    };
  }
}

async function addresbanner(banner) {
  const newObjectId = new mongoose.Types.ObjectId();
  try {
    await Base.findOneAndUpdate(
      {},
      {
        $push: {
          responsivebanners: { _id: newObjectId, banner },
        },
      }
    );
    return {
      status: true,
      msg: "Saved successfully",
    };
  } catch {
    return {
      status: false,
      msg: "Please try again",
    };
  }
}

async function removeresbanner(id) {
  try {
    await Base.findOneAndUpdate(
      {},
      {
        $pull: {
          responsivebanners: { _id: new mongoose.Types.ObjectId(id) },
        },
      }
    );
    return {
      status: true,
      msg: "Deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      msg: "Please try again",
    };
  }
}

async function getgenre() {
  const base = await Base.find({});
  const genre = base[0].genres;
  return genre;
}

async function getbanner() {
  const base = await Base.find({});
  const banners = base[0].banners;
  return banners;
}

async function getresbanner() {
  const base = await Base.find({});
  const responsivebanners = base[0].responsivebanners;
  return responsivebanners;
}

async function gettopgenre() {
try {
  let tracks = await trackDB.getalltracks();

  const albums = await albumDB.getallalbums();
  albums.forEach((album) => {
    album.tracks.forEach((track) => {
      tracks.push(track);
    });
  });

  let resault = [];

  tracks.forEach((track) => {
    const find = resault.findIndex(
      (e) => e.genre.toLowerCase() === track.genre.toLowerCase()
    );

    if (find >= 0) {
      resault[find].count++;
    } else {
      resault.push({
        genre: track.genre,
        count: 1,
      });
    }
  });

  const genres = await getgenre();
  
  resault.forEach((e) => {
    genres.forEach((genre) => {
      
        if (genre.name.toLowerCase() === e.genre.toLowerCase()) {
            e.color = genre.color;
        }
    });
});
  return resault; 
} catch (err)  {
  console.log(err);
}
}

module.exports = {
  change,
  addgenre,
  addbanner,
  removebanner,
  addresbanner,
  removeresbanner,
  addsocialicon,
  getdata,
  removegenre,
  removesocialicon,
  getgenre,
  findsocialmedia,
  getbanner,
  getresbanner,
  gettopgenre,
};
