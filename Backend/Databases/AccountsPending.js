const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const timestamp = require("mongoose-timestamp");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userDB = require("./Users.js");

mongoose.connect(process.env.DB_ADRESS).then(() => {
  console.log("conect");})


const musicschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  code: { type: Number, required: true },
});
musicschema.plugin(timestamp);
const Account = mongoose.model("accountsPending", musicschema);

async function finalcheckusername(value) {
  const usercheck = await userDB.checkusername(value);
  const username = await Account.findOne({ username: value });
  if (!username && usercheck) {
    return {
      msg: "Available",
      status: true,
    };
  } else {
    return {
      msg: "This username already exists",
      status: false,
    };
  }
}

async function adduser(username, email, password) {
  const code = Math.floor(Math.random() * 1000000000);
  const account = new Account({
    username,
    email,
    password,
    code,
  });
  
  await account.save();
  const token = jwt.sign({ _id: account.id, code }, process.env.PENDING_JWT);
  const link = `${process.env.Site_Adress}v/${token}`;
  
  const html = `
    <h1 style="text-align: center">Hello , ${username}</h1>
    <p style="font-size:1.5rem;text-align: center;font-weight:bold;  text-transform: capitalize;">You have created an account in our site. Click on the button below to verify that or copy the text in your browser</p>
    <div style="display: flex; justify-content: center">
      <button style="
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
      ">
        <a href="${link}" style="
          text-decoration: none;
          color: white;
          font-size: 1.5rem;
          font-style:sans-serif;
          text-transform: capitalize;
          font-weight: bold;
          cursor:pointer;
        ">Verify</a>
      </button>
    </div>
    <hr style="margin-top:30px;" />
    <footer style="margin-top:30px;">
      <p style="font-size:1.5rem;text-align: center;font-weight:bold;  text-transform: capitalize;"
        > If you haven't signed up, please don't send this email to other people.</p
      >
      <p style="font-size:1.5rem;text-align: center;font-weight:bold;  text-transform: capitalize;">This request will expire 30 days later</p>
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
    to: email,
    subject: "Verify your account",
    html: html,
  });
  
  if (!info.rejected[0]) {
    return true;
  } else {
    return false;
  }
}

async function verify(token) {
  try {
    const decode = jwt.verify(token, process.env.PENDING_JWT);
    let user = await Account.findById(decode._id);
    
    if (user.code === decode.code) {
      const newuser = await userDB.register(
        user.username,
        user.email,
        user.password
      );
      
      await deleteVerified(user.email);
      let newToken = jwt.sign({ _id: newuser._id }, process.env.REGISTER_JWT);
      return newToken;
    } else {
      return "Verification Failed!";
    }
  } catch (err) {
    return false;
  }
}

async function deleteVerified(mail) {
  const sameEmails = await Account.find({ email: mail });
  for (const email of sameEmails) {
    await Account.findByIdAndDelete(email._id);
  }
}

module.exports = {
  finalcheckusername,
  adduser,
  verify,
};