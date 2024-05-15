const express = require("express");
const { User, Account } = require("../models/db");
const zod = require("zod");
const mongoose = require("mongoose");

const { authMiddleware } = require("../middleware");
const router = require(".");
const accountRouter = express.Router();

/////// get balance of any user
router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const account = await Account.findOne({ userId: userId });

  return res.status(200).json({
    balance: account.balance,
  });
});

// const transferSchema = zod.object({
//   to: {
//     type: zod.string(),
//     required: true,
//   },
//   amount: {
//     type: zod.number().positive(),
//     required: true,
//   },
// });

/////// transfer money from user1 acc --> user2 acc
router.post("/transfer", authMiddleware, async (req, res) => {
  //   const { success } = transferSchema.safeParse(req.body);
  //   if (!success) {
  //     return res.status(400).json({
  //       message: "transfer unsuccessful",
  //     });
  //   }

  const session = await mongoose.startSession();
  const { amount, to } = req.body;

  console.log("starting transaction!");
  session.startTransaction();

  // fetch sender account
  const account = await Account.findOne({ userId: req.userId }).session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  // fetch reciever account
  const toAccount = await Account.findOne({ userId: to });
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  // transfer
  await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
  await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

  await session.commitTransaction();
  console.log("transfer transaction completed");

  res.status(200).json({
    message: "Transfer successful",
  });
});

module.exports = accountRouter;
