// backend/routes/index.js

const express = require("express");
// importing router from backend/routes/user.js for user routes
const userRouter = require("./user");
const accountRouter = require("./accounts");
const { authMiddleware } = require("../middleware");

const router = express.Router();

router.use((req, res, next) => {
  console.log("/api/v1" + req.path, req.method);
  next();
});

//route to different routers further
router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;
