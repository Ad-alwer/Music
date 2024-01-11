const AWS = require("aws-sdk");
const multer = require("multer");
const express = require("express");
const multerS3 = require("multer-s3");
require("dotenv").config();

const usersDB = require("../Databases/users");

const config = {
  endpoint: process.env.LIARA_ENDPOINT,
  accessKeyId: process.env.LIARA_ACCESS_KEY,
  secretAccessKey: process.env.LIARA_SECRET_KEY,
  region: "default",
};

const Router = express.Router();
const s3 = new AWS.S3(config);

const uploadtracks = multer({
  storage: multerS3({
    s3,
    bucket: process.env.LIARA_BUCKET_NAME,
    key: function (req, file, cb) {
      const uniqueKey = Date.now().toString() + "-" + file.originalname;
      if (file.mimetype == "audio/mpeg") {
        cb(null, `request/${uniqueKey}`);
      } else if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/jpg"
      ) {
        cb(null, `tumbnails/${uniqueKey}`);
      }
    },
  }),
});

const uploadprofile = multer({
  storage: multerS3({
    s3,
    bucket: process.env.LIARA_BUCKET_NAME,
    key: function (req, file, cb) {
      const uniqueKey = Date.now().toString() + "-" + file.originalname;
      cb(null, `profile/${uniqueKey}`);
    },
  }),
});



Router.post(
  "/album",
  uploadtracks.array("objectKey"),
  async function (req, res) {
    let files = [];
    let thumbnail;

    await Promise.all(
      req.files.map(async (file) => {
        if (file.mimetype === "audio/mpeg") {
          files.push(file.location);
        } else {
          thumbnail = file.location;
        }
      })
    );

    usersDB
      .addrequestalbum(
        req.body.id,
        req.body.name,
        files,
        thumbnail,
        req.body.description,
        req.body.schdule
      )
      .then((data) => {
        if (data) {
          return res.send({
            status: "success",
            message: "file uploaded!",
          });
        }
      });
  }
);

Router.post(
  "/track",
  uploadtracks.array("objectKey"),
  async function (req, res) {
    let coverurl;
    let trackurl;

    await Promise.all(
      req.files.map(async (file) => {
        if (file.mimetype === "audio/mpeg") {
          trackurl = file.location;
          console.log(trackurl);
        } else {
          coverurl = file.location;
          console.log(coverurl);
        }
      })
    );

    usersDB
      .addrequesttrack(
        req.body.id,
        req.body.name,
        req.body.type,
        req.body.genre,
        req.body.description,
        req.body.lyrics,
        req.body.schdule,
        req.body.feat,
        coverurl,
        trackurl
      )
      .then((data) => {
        if (data) {
          return res.send({
            status: "success",
            message: "file uploaded!",
          });
        }
      });
  }
);

Router.post(
  "/profile",
  uploadprofile.single("objectKey"),
  async function (req, res) {
    usersDB.addprofile(req.body.id, req.file.location).then((data) => {
      if (data) {
        return res.send({
          status: "success",
          message: "file uploaded!",
        });
      }
    });
  }
);

module.exports = Router;
