const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

const accountpendeingRoutes = require("./Routes/AccountspendingRoutes");
const usersRoutes = require("./Routes/UsersRoutes");
const uploadRoutes =require('./Routes/UploadFile')


app.use(express.json());
app.use(cors());


app.use("/api/accountpending", accountpendeingRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/upload", uploadRoutes);


app.listen(process.env.PORT, () => console.log("listen"));
