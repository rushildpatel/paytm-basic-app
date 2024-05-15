require("dotenv").config();
const express = require("express");
const zod = require("zod");
const router = express.Router();
const { User, Account } = require("../models/db");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");
// const bcrypt = require("bcrypt");

const signupSchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

///// signup route
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

  const userId = newUser._id;

  const newUserAccount = await Account.create({
    userId: userId,
    balance: Math.floor(Math.random() * 10000) + 1,
  });

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

/////// signin route
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

const updateSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

//////// updateUser info route
router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Error while updating information",
    });
  }

  await User.update({ _id: req.userId }, req.body);
  res.status(200).json({
    message: "Updated successfully",
  });
});

/////// search for user via firsName/lastName
router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }],
  });

  res.status(200).json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
