const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const jwt = require("jsonwebtoken");
require("dotenv").config();

mongoose.connect(process.env.DB_ADRESS).then(() => console.log("conect"));

const musicschema = new mongoose.Schema({
  userid:mongoose.Schema.Types.ObjectId,
  trackid:mongoose.Schema.Types.ObjectId
});

musicschema.plugin(timestamp);

const Track = mongoose.model("Deletusertracks", musicschema);


