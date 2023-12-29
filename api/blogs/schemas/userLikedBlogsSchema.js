const mongoose = require("mongoose");

const userLikedBlogsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

module.exports = { userLikedBlogsSchema };
