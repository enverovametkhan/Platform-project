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
});

module.exports = { userLikedBlogsSchema };
