const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

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
  } catch (error) {
    console.error("Error updating field:", error);
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
  removesocialicon
};
