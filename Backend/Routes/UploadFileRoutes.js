const AWS = require("aws-sdk");
const multer = require("multer");
const express = require("express");
const multerS3 = require("multer-s3");

require("dotenv").config();

const usersDB = require("../Databases/users");
const playlistDB = require("../Databases/Playlists");
const { addbanner, addresbanner, addsocialicon } = require("../Databases/Base");
const trackDB = require('../Databases/Tracks')

const ffmpeg = require("fluent-ffmpeg");
const { default: mongoose } = require("mongoose");
const { editalbum } = require("../Databases/Albums");
const ffprobePath = require("ffprobe-static").path;
ffmpeg.setFfprobePath(ffprobePath);

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
      const uniqueKey = Date.now().toString() + "-&-" + file.originalname;
      if (file.mimetype == "audio/mpeg") {
        cb(null, `tracks/${uniqueKey}`);
      } else if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/jpg"
      ) {
        cb(null, `covers/${uniqueKey}`);
      }
    },
  }),
});

const uploadbanner = multer({
  storage: multerS3({
    s3,
    bucket: process.env.LIARA_BUCKET_NAME,
    key: function (req, file, cb) {
      const uniqueKey = Date.now().toString() + "-&-" + file.originalname;
      if (file.mimetype == "audio/mpeg") {
        cb(null, `tracks/${uniqueKey}`);
      } else if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/jpg"
      ) {
        cb(null, `banner/${uniqueKey}`);
      }
    },
  }),
});

const uploadprofile = multer({
  storage: multerS3({
    s3,
    bucket: process.env.LIARA_BUCKET_NAME,
    key: function (req, file, cb) {
      const uniqueKey = Date.now().toString() + "-&-" + file.originalname;
      cb(null, `profile/${uniqueKey}`);
    },
  }),
});

const uploadsociamedia = multer({
  storage: multerS3({
    s3,
    bucket: process.env.LIARA_BUCKET_NAME,
    key: function (req, file, cb) {
      const uniqueKey = Date.now().toString() + "-&-" + file.originalname;
      cb(null, `socialicn/${uniqueKey}`);
    },
  }),
});

Router.post(
  "/album",
  uploadtracks.array("objectKey"),
  async function (req, res) {
    let files = [];
    let thumbnail;
    let totalduration = 0;
    let duration;
    await Promise.all(
      req.files.map(async (file) => {
        if (file.mimetype === "audio/mpeg") {
          const metadata = await new Promise((resolve, reject) => {
            ffmpeg.ffprobe(file.location, (err, metadata) => {
              if (err) {
                reject(err);
              } else {
                resolve(metadata);
              }
            });
          });
          duration = metadata.format.duration;
          totalduration += duration;
          const track = {
            url: file.location,
            name: file.key.split("-&-")[1],
            duration: Math.floor(duration),
          };
          const trackDetails = JSON.parse(req.body.trackdetail);
          const updatedTrack = trackDetails.find(
            (data) => data.trackname === track.name
          );
          if (updatedTrack) {
            track._id = new mongoose.Types.ObjectId();
            track.name = updatedTrack.name;
            track.lyrics = updatedTrack.lyrics;
            track.feat = updatedTrack.feat;
            track.status = req.body.visibility;
            track.plays = 0;
            track.like = 0;
            track.genre = req.body.genre;
            track.monthlyListener = [];
          }
          files.push(track);
        } else {
          thumbnail = { url: file.location, name: file.key };
        }
      })
    );
    usersDB
      .addrequestalbum(
        req.headers.jwt,
        req.body.name,
        req.body.visibility,
        req.body.genre,
        files,
        thumbnail,
        req.body.description,
        Math.ceil(totalduration)
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
    let cover;
    let track = {};
    let duration;

    await Promise.all(
      req.files.map(async (file) => {
        if (file.mimetype === "audio/mpeg") {
          const duration = await new Promise((resolve, reject) => {
            ffmpeg.ffprobe(file.location, (err, metadata) => {
              if (err) {
                console.error("Error while getting metadata:", err);
                reject(err);
              } else {
                resolve(metadata.format.duration);
              }
            });
          });

          track = {
            url: file.location,
            name: file.key,
            duration: Math.ceil(duration),
          };
        } else {
          cover = { url: file.location, name: file.key };
        }
      })
    );

    usersDB
      .addrequesttrack(
        req.headers.jwt,
        req.body.name,
        req.body.type,
        req.body.genre,
        req.body.description,
        req.body.lyrics,
        JSON.parse(req.body.feat),
        cover,
        track,
        req.body.visibility
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
          msg: "Profile Changed",
        });
      }
    });
  }
);

Router.post(
  "/playlist",
  uploadbanner.single("objectKey"),
  async function (req, res) {
    cover = { url: req.file.location, name: req.file.key };
    playlistDB
      .createdplaylist(
        req.body.name,
        req.body.status,
        cover,
        JSON.parse(req.body.tracks),
        req.body.creator
      )
      .then((data) => {
        if (data) {
          usersDB
            .addplaylist(req.body.creator, data)
            .then((data) => res.send(data));
        } else {
          return res.send({ status: false, msg: "Please try again" });
        }
      });
  }
);

Router.put(
  "/addsocial",
  uploadsociamedia.single("objectKey"),
  async function (req, res) {
    let file = {
      url: req.file.location,
      name: req.file.key,
    };
    addsocialicon(req.body.name, file).then((data) => res.send(data));
  }
);

Router.put(
  "/changecover",
  uploadtracks.single("objectKey"),
  async function (req, res) {
    let file = {
      url: req.file.location,
      name: req.file.key,
    };
    return file;
  }
);

Router.put(
  "/addbanner",
  uploadbanner.single("objectKey"),
  async function (req, res) {
    let file = {
      url: req.file.location,
      name: req.file.key,
      link: req.body.link,
    };
    addbanner(file).then((data) => res.send(data));
  }
);

Router.put(
  "/addresbanner",
  uploadtracks.single("objectKey"),
  async function (req, res) {
    let file = {
      url: req.file.location,
      name: req.file.key,
      link: req.body.link,
    };
    addresbanner(file).then((data) => res.send(data));
  }
);

Router.put(
  "/playlist",
  uploadbanner.single("objectKey"),
  async function (req, res) {
    cover = req.file
      ? (cover = { url: req.file.location, name: req.file.key })
      : null;

    playlistDB
      .editplaylist(
        req.body.id,
        req.body.name,
        req.body.status,
        cover,
        JSON.parse(req.body.tracks)
      )
      .then((data) => res.send(data));
  }
);

Router.put(
  "/updatealbum",
  uploadtracks.array("objectKey"),
  async function (req, res) {
    let files = [];
    let thumbnail;

    let totalduration = 0;
    let duration;

    await Promise.all(
      req.files.map(async (file) => {
        if (file.mimetype === "audio/mpeg") {
          const metadata = await new Promise((resolve, reject) => {
            ffmpeg.ffprobe(file.location, (err, metadata) => {
              if (err) {
                reject(err);
              } else {
                resolve(metadata);
              }
            });
          });
          duration = metadata.format.duration;

          const track = {
            url: file.location,
            name: file.key.split("-&-")[1],
            duration: Math.floor(duration),
          };
          const trackDetails = JSON.parse(req.body.trackdetail);
          const updatedTrack = trackDetails.find(
            (data) => data.trackname === track.name
          );
          if (updatedTrack) {
            track._id = new mongoose.Types.ObjectId();
            track.name = updatedTrack.name;
            track.lyrics = updatedTrack.lyrics;
            track.feat = updatedTrack.feat;
            track.status = req.body.visibility;
            track.plays = 0;
            track.like = 0;
            track.genre = req.body.genre;
            track.monthlyListener = [];
          }
          files.push(track);
        } else {
          thumbnail = { url: file.location, name: file.key };
        }
      })
    );
    let lasttrack = JSON.parse(req.body.lasttracks);
    let finaltracks = lasttrack.concat(files);

    finaltracks.forEach((e) => {
      totalduration = totalduration + e.duration;
    });

    thumbnail ? thumbnail : null;

    editalbum(
      req.body.id,
      req.body.name,
      req.body.genre,
      req.body.visibility,
      req.body.description,
      thumbnail,
      finaltracks,
      totalduration
    ).then((data) => {
      res.send(data);
    });
  }
);



Router.put(
  "/track",
  uploadbanner.single("objectKey"),
  async function (req, res) {
    cover = req.file
      ? (cover = { url: req.file.location, name: req.file.key })
      : null;

    trackDB
      .edittrack(
        req.body.id,
        req.body.name,
        req.body.type,
        req.body.genre,
        req.body.status,
        req.body.description,
        req.body.lyric,
        cover,
        
      )
      .then((data) => res.send(data));
  }
);






module.exports = Router;
