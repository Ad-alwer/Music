const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();


const accountpendeingRoutes = require("./Routes/AccountspendingRoutes.js");
const usersRoutes = require("./Routes/UsersRoutes.js");
const uploadRoutes = require("./Routes/UploadFileRoutes.js");
const trackRoutes = require("./Routes/TracksRoutes.js");
const albumRoutes = require("./Routes/AlbumRoutes.js");
const deletedaccountRoutes = require("./Routes/DeleteaccountRoutes.js");
const playlistRoutes = require("./Routes/PlaylistRoutes.js");
const baseRoutes = require("./Routes/BaseRoutes.js")

app.use(express.json());
app.use(cors());

app.use("/api/accountpending", accountpendeingRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/track", trackRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/deletacccount", deletedaccountRoutes);
app.use("/api/playlist", playlistRoutes);
app.use("/api/base", baseRoutes);


app.listen(process.env.PORT, () => console.log("listen"));
