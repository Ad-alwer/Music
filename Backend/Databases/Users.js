const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const trackDB = require("./Tracks");
require("dotenv").config();

mongoose.connect(process.env.DB_ADRESS).then(() => console.log("conect"));

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
  lastplays: {},
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
    };
  } else {
    return {
      msg: "This email already exists",
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
      return {
        status: true,
        msg: "Login successfully",
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
      return {
        status: true,
        msg: "Login successfully",
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

async function checktrackname(token, name) {
  const decode = jwt.verify(token, process.env.REGISTER_JWT);
  const user = User.findById(decode._id);
  const search = user.tracks.find((e) => e.name == name);

  return search.lenght > 0 ? false : true;
}

async function checkalbumname(token, name) {
  const decode = jwt.verify(token, process.env.REGISTER_JWT);
  const user = User.findById(decode._id);
  const search = user.albuns.find((e) => e.name == name);

  return search.lenght > 0 ? false : true;
}

async function addrequesttrack(
  id,
  name,
  type,
  genre,
  description,
  lyric,
  schdule,
  feat,
  cover,
  track,
  visibility
) {
  const user = await User.findById(id);
  if (user.isverify) {
    await trackDB
      .addtrack(
        name,
        type,
        genre,
        id,
        description,
        album,
        lyric,
        cover,
        feat,
        track,
        schdule,
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
              artistid: id,
              track,
              name,
              type,
              genre,
              description,
              lyric,
              schdule,
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
      return user;
    } catch {
      return false;
    }
  }
}

async function addrequestalbum(id, name, tracks, cover, description, schdule) {
  const user = await User.findById(id);
  if (user.isverify) {
    //TODO after music routes
  } else {
    try {
      const decode = jwt.verify(token, process.env.REGISTER_JWT);
      const user = await User.findOneAndUpdate(
        { _id: decode._id },
        {
          $push: {
            requests: {
              artistid: id,
              name,
              tracks,
              status: "pending",
              cover,
              description,
              schdule,
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
  await User.findOneAndUpdate(
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
          status: undefined,
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
    await trackDB.addtrack(...Object.values(updatedRequests)).then((res) => {
      return res;
    });
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
    return true;
  } catch {
    return false;
  }
}

async function searchbyusername(name) {
  return await User.find({ username: name });
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
  checktrackname,
  checkalbumname,
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
  favourite
};
