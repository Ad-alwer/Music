const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const timestamp = require("mongoose-timestamp");
const jwt = require("jsonwebtoken");
const schedule = require("node-schedule");

require("dotenv").config();

const userDB = require("./Users");

mongoose.connect(process.env.DB_ADRESS).then(() => {
  console.log("conect");

  schedule.scheduleJob("00 00 * * *", () => {
    deletepending();
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
  password: { type: String, required: true, required: true },
  code: { type: Number, required: true },
});
musicschema.plugin(timestamp);

const Account = mongoose.model("accountsPending", musicschema);

async function finalcheckusername(value) {
  const usercheck = await userDB.checkusername(value);
  const username = await Account.findOne({ username: value });
  if (!username && !usercheck) {
    return {
      msg: "Availabe",
    };
  } else {
    return {
      msg: "This username already exists",
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
  token = jwt.sign({ _id: account.id, code }, process.env.PENDING_JWT);
  const link = `http://localhost:${process.env.PORT}/v/${token}`;
  const html = `    <h1 style="text-align: center">Hello , ${username}</h1>
  <p style="font-size:1.5rem;text-align: center;font-weight:bold;  text-transform: capitalize;">You are create account in our site,Click on blow button to verify that or copy text in your browser</p>
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
        >Verify</a
      >
    </button>
    
  </div>
  <hr style="margin-top:30px;" />
  <footer style="margin-top:30px;">
    <p style="font-size:1.5rem;text-align: center;font-weight:bold;  text-transform: capitalize;"
      > if you arent sign up , please Dont send this email for other
      people.</p
    >
    <p style="font-size:1.5rem;text-align: center;font-weight:bold;  text-transform: capitalize;">This request was expride 30 day later</p>
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
async function deletepending() {
  let deletarr = [];
  const accounts = await Account.find({});
  let year = new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  for await (const e of accounts) {
    e.year = new Date(e.createdAt.toISOString().split("T")[0]);
    year = new Date(year);

    if (e.year < year) {
      deletarr.push(e);
    }
  }

  if (deletarr.length > 0) {
    for (const e of deletarr) {
      await Account.findByIdAndDelete(e._id);
    }
  }
}
async function verify(token) {
  try {
    const decode = jwt.verify(token, process.env.PENDING_JWT);

    let user = await Account.findById(decode._id);

    if (user.code === decode.code) {
      const token = await userDB.register(
        user.username,
        user.email,
        user.password
      );
      await deleteVerified(user.email);
      return token;
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
