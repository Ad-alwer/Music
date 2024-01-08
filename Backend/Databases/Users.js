const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const jwt = require("jsonwebtoken");
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
    default: "active"
  },
  isadmin: { type: Boolean, default: false },
  ismaster: { type: Boolean, default: false },
  Requests: [],
  Description: [],
  Socialmedia: [],
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

const User =  mongoose.models.Users || mongoose.model('Users', musicschema);

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

module.exports = {
  checkusername,
  checkemail,
  register
};
