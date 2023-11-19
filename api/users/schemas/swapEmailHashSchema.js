const mongoose = require("mongoose");

const swapEmailHashSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  newEmail: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = { swapEmailHashSchema };
