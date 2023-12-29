const mongoose = require("mongoose");

const userLikedBlogsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blogs",
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

module.exports = { userLikedBlogsSchema };
