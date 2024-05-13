require("dotenv").config();
const express = require("express");
const zod = require("zod");
const router = express.Router();
const { User } = require("../models/db");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

const signupSchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
    return;
  }
  const { username, firstName, lastName, password } = req.body;

  const existingUser = await User.findOne({
    username: username,
  });

  if (existingUser) {
    res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
    return;
  }

  const newUser = await User.create({
    username: username,
    firstName: firstName,
    lastName: lastName,
    password: password,
  });

  const newUserId = newUser._id;

  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET
  );

  res.status(200).json({
    message: "User created successfully",
    token: token,
  });
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

// signin route
router.post("/signin", async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (existingUser) {
    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET);

    res.status(200).json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

module.exports = router;
