const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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
  isadmin: { type: Boolean, default: false },
  ismaster: { type: Boolean, default: false },
  banupload: { type: Boolean, default: false },
  requests: [],
  description: [],
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
      decode_id,
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

async function addrequesttrack(id, url) {
try {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $push: { requests: { url, status: "pending" } } },
    { new: true }
  );
  return user
} catch {
  return false
}
}

async function addrequestalbum(id, url,tumbnail) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { $push: { requests: { url, status: "pending",tumbnail } } },
      { new: true }
    );
    return user
  } catch {
    return false
  }
  }

async function addprofile(id,url){
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { profile: url },
      { new: true }
    );
    return updatedUser
  } catch {
    return false
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
  addprofile
};
