const express = require("express");

const { authMiddleware } = require("../middleware");
const accountRouter = express.Router();

module.exports = accountRouter;
