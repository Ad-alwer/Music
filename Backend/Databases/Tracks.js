const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const schedule = require("node-schedule");
const { notification, getuser } = require("./Users");

require("dotenv").config();

mongoose.connect(process.env.DB_ADRESS).then(() => {
  console.log("conect");
  schedule.scheduleJob("00 02 * * *", () => {
    schduletrack();
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
  type: { enum: ["music", "podcast"] },
  genre: String,
  artist: mongoose.Schema.Types.ObjectId,
  status: { enum: ["public", "private", "pending"] },
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
  releaseDate: Date,
});
musicschema.plugin(timestamp);

const Track = mongoose.models.Track || mongoose.model("Track", musicschema);

async function schduletrack() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;

  const pendingtracks = await Track.find({ releaseDate: { $ne: null } });
  pendingtracks.forEach(async (e) => {
    const date = new Date(e.createdAt);
    const extractedDate = date.toISOString().split("T")[0];
    if (today.getTime() >= extractedDate.getTime()) {
      await Track.findByIdAndUpdate(e.id, {
        $set: {
          status: "public",
          releaseDate: currentDate,
          schedule: null,
        },
      });
    }
  });
}

async function addtrack(
  name,
  type,
  genre,
  artist,
  description,
  album,
  lyric,
  cover,
  feat,
  track,
  status
) {
  try {
    const currentDate = new Date();
    const usertrack = new Track({
      name,
      type,
      genre,
      artist,
      description,
      album,
      lyric,
      cover,
      feat,
      track,
      status,
      releaseDate: currentDate,
    });
    await usertrack.save();
    return usertrack;
  } catch {
    return false;
  }
}

async function like(token, id, status) {
  try {
    if (status == "add") {
      const updatedtrack = await Track.findByIdAndUpdate(
        id,
        {
          $inc: {
            likes: +1,
          },
        },
        { new: true }
      );

      const user = await getuser(token);
      await notification(
        { _id: user.id },
        TODO,
        `${user.username} like ${updatedtrack.name}`,
        updatedtrack.cover
      );
      return true;
    } else if (status == "remove") {
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
  album,
  lyric,
  cover,
  feat
) {
  try {
    await Track.findByIdAndUpdate(id, {
      $set: {
        name,
        type,
        genre,
        status,
        description,
        album,
        lyric,
        cover,
        feat,
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

async function playtrack() {
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
  let monthlylistners = track.monthlyListener;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const today = `${currentYear} - ${currentMonth}`;
  const search = monthlylistners.find((e) => {
    return e.date === today;
  });
  if (search) {
    search.view++;
  } else {
    monthlyListener.push({
      date: today,
      view: 1,
    });
  }

  await Track.findByIdAndUpdate(id, {
    $set: {
      monthlyListener: monthlyListener,
    },
  });
}

async function changealbum(trackid, albumid) {
  try {
    await Track.findByIdAndUpdate(trackid, {
      $set: {
        album: albumid,
      },
    });
    return true;
  } catch {
    return false;
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
};
