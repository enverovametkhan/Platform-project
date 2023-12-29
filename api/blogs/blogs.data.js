const mongoose = require("mongoose");
const { blogsSchema } = require("./schemas/blogsSchema");
const { blogCommentsSchema } = require("./schemas/blogCommentsSchema");
const { userLikedBlogsSchema } = require("./schemas/userLikedBlogsSchema");

let BlogModel = mongoose.model("Blogs", blogsSchema, "Blogs");
let BlogCommentModel = mongoose.model(
  "BlogComments",
  blogCommentsSchema,
  "BlogComments"
);
let BlogLikesModel = mongoose.model(
  "BlogLikes",
  userLikedBlogsSchema,
  "BlogLikes"
);
module.exports = {
  BlogModel,
  BlogCommentModel,
  BlogLikesModel,
};
