const { miniDatabase } = require("@root/database/miniDatabase");
const mongoose = require("mongoose");
const { blogSchema } = require("@root/migrations/blogSchema");
const { blogCommentsSchema } = require("@root/migrations/blogSchema");

let blogsModel = mongoose.model("Blogs", blogSchema, "Blogs");
let blogsCommentModel = mongoose.model(
  "BlogComments",
  blogCommentsSchema,
  "BlogComments"
);

module.exports = {
  blogsModel,
  blogsCommentModel,
};
