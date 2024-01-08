const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

const accountpendeingRoutes = require("./Routes/AccountspendingRoutes");

app.use(express.json());
app.use(cors());


app.use("/api/accountpending", accountpendeingRoutes);

app.listen(process.env.PORT, () => console.log("listen"));
