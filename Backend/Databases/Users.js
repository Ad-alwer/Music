const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");

const trackDB = require("./Tracks");
const albumDB = require("./Albums");
const deleteaccountDB = require("./DeletedAccounts");
const { deletaccountplaylists } = require("./Playlists");

require("dotenv").config();

mongoose.connect(process.env.DB_ADRESS).then(() => {
  console.log("conect");
  schedule.scheduleJob("0 0 1 * *", async () => {
    let query = {
      "user.tracks": {
        $exists: true,
        $not: {
          $size: 0,
        },
      },
    };
    await notification(
      query,
      "/profile/monthlylistener",
      `Your monthlylistener report is available nowimg/profile`
    );
  });
});

const musicschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    uniqe: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    uniqe: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  status: {
    type: String,
    enum: ["active", "deleted"],
    default: "active",
  },
  tracks: [],
  isadmin: { type: Boolean, default: false },
  ismaster: { type: Boolean, default: false },
  isverify: { type: Boolean, default: false },
  banupload: { type: Boolean, default: false },
  requests: [],
  bio: { type: String, maxlength: 500, trim: true },
  socialmedia: [],
  subscribe: [],
  artists: [],
  saveAlbums: [],
  saveTracks: [],
  lastplay: {},
  notification: [],
  profile: { type: String, default: null },
  favouriteGenre: { type: String, default: null },
  recommendUser: [],
  albums: [],
});
musicschema.plugin(timestamp);

const User = mongoose.models.Users || mongoose.model("Users", musicschema);

async function checkusername(value) {
  const username = await User.findOne({ username: value });
  if (!username) {
    return true;
  } else {
    return false;
  }
}
async function checkemail(value) {
  const email = await User.findOne({ email: value });

  if (!email) {
    return {
      msg: "Availabe",
      status: true,
    };
  } else {
    return {
      msg: "This email already exists",
      status: false,
    };
  }
}
async function register(username, email, password) {
  let token;
  const user = new User({
    username,
    email,
    password,
  });
  await user.save();
  token = jwt.sign({ _id: user.id }, process.env.REGISTER_JWT);
  return {
    token: token,
  };
}

async function login(user, password) {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

  if (emailRegex.test(user)) {
    const foundUser = await User.findOne({ email: user });

    if (foundUser && foundUser.password === password) {
      let token = jwt.sign({ _id: foundUser._id }, process.env.REGISTER_JWT);

      return {
        status: true,
        msg: "Login successfully",
        token,
        userid: foundUser._id,
      };
    } else {
      return {
        status: false,
        msg: "Username or Password was wrong",
      };
    }
  } else {
    const foundUser = await User.findOne({ username: user });
    if (foundUser && foundUser.password === password) {
      let token = jwt.sign({ _id: foundUser._id }, process.env.REGISTER_JWT);

      return {
        status: true,
        msg: "Login successfully",
        token,
        userid: foundUser._id,
      };
    } else {
      return {
        status: false,
        msg: "Username or Password was wrong",
      };
    }
  }
}

async function forgetpassword(user) {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
  if (emailRegex.test(user)) {
    const foundUser = await User.findOne({ email: user });
    if (foundUser) {
      token = jwt.sign({ _id: foundUser.id }, process.env.PENDING_JWT);
      const link = `http://localhost:${process.env.PORT}/f/${token}`;
      const html = `    <h1 style="text-align: center">Hello , ${foundUser.username}</h1>
      <p style="font-size:1.5rem;text-align: center;font-weight:bold;  text-transform: capitalize;">To restore your password please Click on blow button</p>
      <div style="display: flex; justify-content: center">
        <button
          style="
          margin-top: 10px;
          margin-left: 40%;
            border-radius: 20px;
            background-color: blue;
            color: white;
            padding: 20px 10px;
            width: 220px;
            text-transform: bold;
            outline:none;
            border:2px solid darkblue;
          "
        >
          <a
            href="${link}"
            style="
              text-decoration: none;
              color: white;
              font-size: 1.5rem;
              font-style:sans-serif;
              text-transform: capitalize;
              font-weight: bold;
              cursor:pointer;
            "
            >Restore Your Password</a
          >
        </button>
        
      </div>
      <hr style="margin-top:30px;" />
      <footer style="margin-top:30px;">
        <p style="font-size:1.5rem;text-align: center;font-weight:bold;  text-transform: capitalize;"
          > if you arent sign up , please Dont send this email for other
          people.</p
        >
      </footer>`;
      const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      const info = await transport.sendMail({
        from: process.env.MAIL_USER,
        to: foundUser.email,
        subject: "Restore Your Password",
        html: html,
      });

      if (!info.rejected[0]) {
        return {
          status: true,
          msg: "Email send to your inbox",
        };
      } else {
        return {
          status: false,
          msg: "Please try again later",
        };
      }
    } else {
      return {
        status: false,
        msg: "User not found",
      };
    }
  } else {
    const foundUser = await User.findOne({ username: user });
    if (foundUser) {
      token = jwt.sign({ _id: foundUser.id }, process.env.PENDING_JWT);
      const link = `http://localhost:${process.env.PORT}/f/${token}`;
      const html = `    <h1 style="text-align: center">Hello , ${foundUser.username}</h1>
      <p style="font-size:1.5rem;text-align: center;font-weight:bold;  text-transform: capitalize;">To restore your password please Click on blow button</p>
      <div style="display: flex; justify-content: center">
        <button
          style="
          margin-top: 10px;
          margin-left: 40%;
            border-radius: 20px;
            background-color: blue;
            color: white;
            padding: 20px 10px;
            width: 220px;
            text-transform: bold;
            outline:none;
            border:2px solid darkblue;
          "
        >
          <a
            href="${link}"
            style="
              text-decoration: none;
              color: white;
              font-size: 1.5rem;
              font-style:sans-serif;
              text-transform: capitalize;
              font-weight: bold;
              cursor:pointer;
            "
            >Restore Your Password</a
          >
        </button>
        
      </div>
      <hr style="margin-top:30px;" />
      <footer style="margin-top:30px;">
        <p style="font-size:1.5rem;text-align: center;font-weight:bold;  text-transform: capitalize;"
          > if you arent sign up , please Dont send this email for other
          people.</p
        >
      </footer>`;
      const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      const info = await transport.sendMail({
        from: process.env.MAIL_USER,
        to: foundUser.email,
        subject: "Restore Your Password",
        html: html,
      });

      if (!info.rejected[0]) {
        return {
          status: true,
          msg: "Email send to your inbox",
        };
      } else {
        return {
          status: false,
          msg: "Please try again later",
        };
      }
    } else {
      return {
        status: false,
        msg: "User not found",
      };
    }
  }
}

async function verify(token) {
  try {
    const decode = jwt.verify(token, process.env.PENDING_JWT);
    let user = await User.findById(decode._id);
    return user ? user : false;
  } catch (err) {
    return false;
  }
}

async function changepasswordbylink(id, password) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password: password },
      { new: true }
    );

    if (updatedUser) {
      return {
        status: true,
        msg: "Password successfully changed",
      };
    } else {
      return {
        status: false,
        msg: "Please try again later",
      };
    }
  } catch {
    return {
      status: false,
      msg: "Please try again later",
    };
  }
}

async function getuser(token) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const user = await User.findById(decode._id);
    return user;
  } catch {
    return false;
  }
}
async function changeusername(token, newusername) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const updatedUser = await User.findByIdAndUpdate(
      decode._id,
      { usename: newusername },
      { new: true }
    );
    return updatedUser ? true : false;
  } catch {
    return false;
  }
}

async function getallusers() {
  const users = await User.find({ ismaster: false });
  return users;
}
async function verifyusers() {
  const users = await User.find({ isverify: true });
  return users;
}

async function changeadmin(userid) {
  try {
    const user = await User.findById(userid);

    const updatedUser = await User.findByIdAndUpdate(
      userid,
      { isadmin: !user.isadmin },
      { new: true }
    );
    return updatedUser ? true : false;
  } catch {
    return false;
  }
}

async function changeverify(userid) {
  try {
    const user = await User.findById(userid);

    const updatedUser = await User.findByIdAndUpdate(
      userid,
      { isverify: !user.isverify },
      { new: true }
    );
    return updatedUser ? true : false;
  } catch {
    return false;
  }
}
async function changebanupload(userid) {
  try {
    const user = await User.findById(userid);

    const updatedUser = await User.findByIdAndUpdate(
      userid,
      { banupload: !user.banupload },
      { new: true }
    );
    return updatedUser ? true : false;
  } catch {
    return false;
  }
}

async function checktrackandalbumname(token, name) {
  const decode = jwt.verify(token, process.env.REGISTER_JWT);
  const user = await User.findById(decode._id);
  let library = user.tracks.slice();

  user.albums.forEach((album) => {
    album.tracks.forEach((track) => {
      library.push(track);
    });
  });

  user.requests.forEach((request) => {
    if (request.track.length === 1) {
      library.push(request.track);
    } else {
      request.track.lenght > 0
        ? request.track.forEach((track) => {
            library.push(track);
          })
        : null;
    }
  });
console.log(library);
  const search = library.find((e) => e.name == name);
  return search ? false : true;
}

async function addrequesttrack(
  token,
  name,
  type,
  genre,
  description,
  lyric,
  feat,
  cover,
  track,
  visibility
) {
  const decode = jwt.verify(token, process.env.REGISTER_JWT);
  const user = await User.findById(decode._id);
  if (user.isverify) {
    await trackDB
      .addtrack(
        name,
        type,
        genre,
        decode._id,
        description,
        album,
        lyric,
        cover,
        feat,
        track,
        visibility
      )
      .then((res) => {
        return res;
      });
  } else {
    try {
      const decode = jwt.verify(token, process.env.REGISTER_JWT);

      const user = await User.findOneAndUpdate(
        { _id: decode._id },
        {
          $push: {
            requests: {
              artistid: decode._id,
              track,
              name,
              type,
              genre,
              description,
              lyric,
              feat,
              cover,
              status: "pending",
              visibility,
              msg: "",
            },
          },
        },
        { new: true }
      );
      console.log("in");
      return user;
    } catch (errr) {
      console.log(errr);
    }
  }
}

async function addrequestalbum(
  token,
  name,
  status,
  genre,
  tracks,
  cover,
  description,
  totalduaration
) {
  const decode = jwt.verify(token, process.env.REGISTER_JWT);
  const user = await User.findById(decode._id);
  if (user.isverify) {
    await albumDB
      .addalbum(name, id, description, cover, status, genre, totalduaration)
      .then(async (res) => {
        await User.findByIdAndUpdate(userId, {
          $push: {
            albums: {
              name,
              id: res._id,
            },
          },
        });
        return res;
      });
  } else {
    try {
      const decode = jwt.verify(token, process.env.REGISTER_JWT);
      const user = await User.findOneAndUpdate(
        { _id: decode._id },
        {
          $push: {
            requests: {
              artistid: decode._id,
              name,
              tracks,
              status: "pending",
              cover,
              description,
              msg: "",
            },
          },
        },
        { new: true }
      );
      return user;
    } catch {
      return false;
    }
  }
}

async function addprofile(id, url) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { profile: url },
      { new: true }
    );
    return updatedUser;
  } catch {
    return false;
  }
}

async function subscribe(token, id) {
  const decode = jwt.verify(token, process.env.REGISTER_JWT);
  const subscriber = await User.findOneAndUpdate(
    { _id: decode._id },
    {
      $push: {
        artists: {
          id,
        },
      },
    },
    { new: true }
  );

  await User.findOneAndUpdate(
    { _id: id },
    {
      $push: {
        subsribe: {
          decode_id,
        },
      },
    },
    { new: true }
  );

  await notification(
    { _id: id },
    `/profile`,
    `${subscriber.username} subscribe you`,
    subscriber.profile
  );
  return true;
}

async function changebio(token, text) {
  const decode = jwt.verify(token, process.env.REGISTER_JWT);
  try {
    await User.findByIdAndUpdate(decode._id, {
      $set: {
        bio: text,
      },
    });
    return {
      msg: "Bio changed successfully",
      status: true,
    };
  } catch {
    return {
      status: false,
      msg: "Please try again later",
    };
  }
}

async function savealbum(token, albumid) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    await User.findByIdAndUpdate(decode._id, {
      $push: {
        saveAlbums: albumid,
      },
    });
    return true;
  } catch {
    return false;
  }
}

async function savetrack(token, trackid) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    await User.findByIdAndUpdate(decode._id, {
      $push: {
        saveTracks: trackid,
      },
    });
    return true;
  } catch {
    return false;
  }
}

async function changefavouritegenre(token, text) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    await User.findByIdAndUpdate(decode._id, {
      $set: {
        favouriteGenre: text,
      },
    });
    return true;
  } catch {
    return false;
  }
}

async function addsocialmedia(token, file, name, link) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    await User.findByIdAndUpdate(decode._id, {
      $push: {
        socialmedia: {
          file,
          name,
          link,
        },
      },
    });
    return true;
  } catch {
    return false;
  }
}

async function deletsocial(token, name) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const user = await User.findByIdAndRemove(decode._id);
    await User.findByIdAndUpdate(decode._id, {
      $pull: {
        socialmedia: { "file.name": name },
      },
    });
  } catch {
    return false;
  }
}

async function verifytrack(token, name) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const userId = decode._id;

    const user = await User.findById(userId);
    const requests = user.requests;

    const updatedRequests = requests.map((request) => {
      if (request.name === name) {
        return {
          ...request,
          msg: undefined,
        };
      }
      return request;
    });

    await User.findByIdAndUpdate(userId, {
      $set: {
        requests: updatedRequests,
      },
    });
    await trackDB
      .addtrack(...Object.values(updatedRequests))
      .then(async (res) => {
        await User.findByIdAndUpdate(userId, {
          $push: {
            tracks: {
              name,
              id: res._id,
            },
          },
        });
        return res;
      });

    await notification(
      { _id: userId },
      "/profile/request",
      `${name} was been verified`,
      updatedRequests.cover
    );

    return true;
  } catch {
    return false;
  }
}

async function rejectrack(token, name, msg) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const userId = decode._id;

    const user = await User.findById(userId);
    const requests = user.requests;

    const updatedRequests = requests.map((request) => {
      if (request.name === name) {
        return {
          ...request,
          status: "reject",
          msg,
        };
      }
    });

    await User.findByIdAndUpdate(userId, {
      $set: {
        requests: updatedRequests,
      },
    });
    await notification(
      { _id: userId },
      "/profile/request",
      `${name} was been rejected`,
      updatedRequests.cover
    );
    return true;
  } catch {
    return false;
  }
}

async function searchbyusername(name) {
  return await User.find({ username: { $regex: name, $options: "i" } });
}

async function addrecomendeuser(token, id) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const user = await User.findOneAndUpdate(
      { _id: decode._id },
      {
        $push: {
          recommendUser: id,
        },
      },
      { new: true }
    );
    return user;
  } catch {
    return false;
  }
}

async function removerecommandeuser(token, id) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const user = await User.findOneAndUpdate(
      { _id: decode._id },
      {
        $pull: {
          recommendUser: id,
        },
      },
      { new: true }
    );
    return user;
  } catch {
    return false;
  }
}

async function favourite(token, trackid) {
  const decode = jwt.verify(token, process.env.REGISTER_JWT);
  const user = await User.findById(decode._id);
  let userlikes = user.favourite;
  let index = userlikes.findindex((e) => e === trackid);
  if (index) {
    userlikes.splite(index, 1);
    await User.findByIdAndUpdate(decode_id, {
      $set: {
        favourite: userlikes,
      },
    });
    return "add";
  } else {
    await User.findByIdAndUpdate(decode_id, {
      $push: {
        favourite: userlikes,
      },
    });
    return "remove";
  }
}

async function checknameandrequest(token, name) {
  const decode = jwt.verify(token, process.env.REGISTER_JWT);
  const trackname = await checktrackandalbumname(token, name);
  const user = await User.findById(decode._id);
  const requestname = user.requests.find((e) => {
    return e.name == name;
  });

  return trackname && !requestname ? true : false;
}

async function edittrack(token, id, newname) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const user = await User.findById(decode._id);
    const usertracks = user.tracks;
    usertracks.map((e) => {
      if (e.id === id) {
        e.name = newname;
      }
    });
    await User.findByIdAndUpdate(decode._id, {
      $set: {
        tracks: usertracks,
      },
    });
    return true;
  } catch {
    return false;
  }
}

async function deletetrack(token, id) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    await User.findByIdAndUpdate(decode._id, {
      $pull: {
        tracks: id,
      },
    });
    return true;
  } catch {
    return false;
  }
}

async function lastplay(token, value) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    await User.findByIdAndUpdate(decode._id, {
      $set: {
        lastpaly: value,
      },
    });
    return true;
  } catch {
    return false;
  }
}

async function notification(query, link, text, img) {
  let users = await User.find(query);
  for (const user of users) {
    await User.findByIdAndUpdate(user._id, {
      $push: {
        notification: {
          text,
          link,
          img,
          seen: false,
        },
      },
    });
  }
}

async function verifyalbum(token, name) {
  try {
    const user = await User.findById(userId);
    const requests = user.requests;

    const updatedRequests = requests.map((request) => {
      if (request.name === name) {
        return {
          ...request,
          msg: undefined,
        };
      }
      return request;
    });
    await User.findByIdAndUpdate(userId, {
      $set: {
        requests: updatedRequests,
      },
    });
    await albumDB
      .addalbum(...Object.values(updatedRequests))
      .then(async (res) => {
        await User.findByIdAndUpdate(userId, {
          $push: {
            albums: {
              name,
              id: res._id,
            },
          },
        });
        return res;
      });

    await notification(
      { _id: userId },
      "/profile/request",
      `${name} was been verified`,
      updatedRequests.cover
    );
    return true;
  } catch {
    return false;
  }
}
async function rejectalbum(token, name, msg) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const userId = decode._id;

    const user = await User.findById(userId);
    const requests = user.requests;

    const updatedRequests = requests.map((request) => {
      if (request.name === name) {
        return {
          ...request,
          status: "reject",
          msg,
        };
      }
    });

    await User.findByIdAndUpdate(userId, {
      $set: {
        requests: updatedRequests,
      },
    });

    await notification(
      { _id: userId },
      "/profile/request",
      `${name} was been rejected`,
      updatedRequests.cover
    );
    return true;
  } catch {
    return false;
  }
}

async function editalbum(token, id, newname) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const user = await User.findById(decode._id);
    const useralbums = user.albums;
    useralbums.map((e) => {
      if (e.id === id) {
        e.name = newname;
      }
    });
    await User.findByIdAndUpdate(decode._id, {
      $set: {
        albums: useralbums,
      },
    });
    return true;
  } catch {
    return false;
  }
}

async function deletealbum(token, id) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    await User.findByIdAndUpdate(decode._id, {
      $pull: {
        albums: id,
      },
    });
    return true;
  } catch {
    return false;
  }
}

async function deletacccount(id) {
  try {
    await trackDB.deletedaccounttracks(id);
    await deletaccountplaylists(id);
    await User.findByIdAndUpdate(id, {
      $set: {
        status: "deleted",
      },
    });
    return true;
  } catch {
    return false;
  }
}

async function loginback(id) {
  try {
    await Users.findByIdAndUpdate(id, {
      $set: {
        status: "active",
      },
    });
    await trackDB.loginback(id);
    await deletacccount.loginback(id);

    return true;
  } catch {
    return false;
  }
}

async function getrequests() {
  try {
    const users = await getallusers();
    const pendingRequests = users.reduce((acc, user) => {
      const userPendingRequests = user.requests.filter(
        (request) => request.status === "pending"
      );
      return [...acc, ...userPendingRequests];
    }, []);
    return pendingRequests;
  } catch {
    return false;
  }
}

module.exports = {
  checkusername,
  checkemail,
  register,
  login,
  forgetpassword,
  verify,
  changepasswordbylink,
  getuser,
  changeusername,
  getallusers,
  changeadmin,
  addrequesttrack,
  addrequestalbum,
  addprofile,
  subscribe,
  changebio,
  checktrackandalbumname,
  savealbum,
  savetrack,
  changefavouritegenre,
  addsocialmedia,
  deletsocial,
  verifytrack,
  rejectrack,
  addrecomendeuser,
  removerecommandeuser,
  searchbyusername,
  favourite,
  checknameandrequest,
  deletetrack,
  edittrack,
  lastplay,
  notification,
  verifyalbum,
  rejectalbum,
  editalbum,
  deletealbum,
  deletacccount,
  loginback,
  changeverify,
  changebanupload,
  getrequests,
  verifyusers,
};
