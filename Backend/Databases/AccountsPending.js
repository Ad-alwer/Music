const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const timestamp = require("mongoose-timestamp");
const jwt = require("jsonwebtoken");
const cron = require("cron");

require("dotenv").config();

const userDB = require("./Users");

mongoose.connect(process.env.DB_ADRESS).then(() => {
  console.log("conect");
  // cron.schedule("0 0 * * *", () => {
  //   deletepending();
  // });
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
  const link = `localhost:${process.env.PORT}/v/${token}`;
  const html = `    <h1 style="text-align: center">Hello , ${username}</h1>
  <p style="font-size:1.5rem;text-align: center;font-weight:bold;  text-transform: capitalize;">Your create account in our site,Click on above button to verify that or copy text in your browser</p>
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
      "
    >
      <a
        href="${link}"
        style="
        outline:none;
          text-decoration: none;
          color: white;
          font-size: 1.5rem;
          font-style:sans-serif;
          text-transform: capitalize;
          font-weight: bold;
        "
        >Verify</a
      >
    </button>
    
  </div>
  <p style="font-size:1.5rem;text-align: center;font-weight:bold;  text-transform: capitalize;text-wrap:wrap">${link}</p>
  <hr style="margin-top:30px;" />
  <footer style="margin-top:30px;">
    <p style="font-size:1.5rem;text-align: center;font-weight:bold;  text-transform: capitalize;"
      >If you arent sign up , please Dont send this email for other
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

  //TODO

}
async function deletepending() {
  await Account.findOneAndRemove({
    createdAt: {
      $lte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
    },
  });
}
async function verify(token) {
  const decoded = jwt.verify(token, process.env.PENDING_JWT);
  let user = await Account.findById(decoded.data._id);
  if (user.code === decoded.data.code) {
    const token = await userDB.register(...user);
    return token;
  } else {
    return "Verification Failed!";
  }
}

module.exports = {
  finalcheckusername,
  adduser,
  verify,
};
