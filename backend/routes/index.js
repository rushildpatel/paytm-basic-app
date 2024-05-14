// backend/routes/index.js

const express = require("express");
// importing router from backend/routes/user.js for user routes
const userRouter = require("./user");
const { authMiddleware } = require("../middleware");

const router = express.Router();

router.use("/user", userRouter);

module.exports = router;
