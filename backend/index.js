// backend/index.js
const express = require("express");

// importing router from backend/routes/index.js
const rootRouter = require("./routes/index");

// initialize express app instance
const app = express();

// using the routes of rootRouter
app.use("/api/v1", rootRouter);
