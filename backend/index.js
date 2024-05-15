// backend/index.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// importing router from backend/routes/index.js
const rootRouter = require("./routes/index");

// initialize express app instance
const app = express();

app.use(cors());
app.use(express.json());

// using the routes of rootRouter which further has routers for /user and /account
app.use("/api/v1", rootRouter);

// listen for requests
app.listen(process.env.PORT, () => {
  console.log("server started on port:", process.env.PORT);
});
