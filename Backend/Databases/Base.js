const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

require("dotenv").config();

mongoose.connect(process.env.DB_ADRESS).then(() => console.log("conect"));

const musicschema = new mongoose.Schema({
  genres: [],
  banners: [],
  responsivebanners: [],
  icn: String,
  newMusic: { type: Boolean, default: false },
  trendMusic: { type: Boolean, default: false },
  trendpodcast: { type: Boolean, default: false },
  trendPodcast: { type: Boolean, default: false },
  trendArtists: { type: Boolean, default: false },
  topArtists: { type: Boolean, default: false },
  topPlaylist: { type: Boolean, default: false },
});

musicschema.plugin(timestamp);

const Base = mongoose.model("base", musicschema);

isempty();

async function isempty() {
  const data = Base.find({});
  if (data.lenght < 1) {
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
          [field]: !val,
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

async function addgenre(genre) {
  try {
    await Base.findOneAndUpdate(
      {},
      {
        $push: {
          genres: genre,
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

async function addbanner(banner) {
  try {
    await Base.findOneAndUpdate(
      {},
      {
        $push: {
          banners: banner,
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

async function removebanner(name,link) {
  try {
    await Base.findOneAndUpdate(
      {},
      {
        $pull: {
          banners: { name, link },
        },
      }
    );
    return {
      status: true,
      msg: "Deleted successfully",
    };
  } catch {
    return {
      status: false,
      msg: "please try again",
    };
  }
}

async function addresbanner(banner) {
  try {
    await Base.findOneAndUpdate(
      {},
      {
        $push: {
          responsivebanners: banner,
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

async function removeresbanner(name,link) {
  try {
    await Base.findOneAndUpdate(
      {},
      {
        $pull: {
          responsivebanners: { name, link },
        },
      }
    );
    return {
      status: true,
      msg: "Deleted successfully",
    };
  } catch {
    return {
      status: false,
      msg: "Please try again",
    };
  }
}

module.exports = {
  change,
  addgenre,
  addbanner,
  removebanner,
  addresbanner,
  removeresbanner
};
