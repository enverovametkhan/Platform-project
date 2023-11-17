const { miniDatabase } = require("@root/database/miniDatabase");
const mongoose = require("mongoose");
const { blogsSchema } = require("./schemas/blogsSchema");

const { blogCommentsSchema } = require("./schemas/blogCommentsSchema");

let BlogModel = mongoose.model("Blogs", blogsSchema, "Blogs");
let BlogCommentModel = mongoose.model(
  "BlogComments",
  blogCommentsSchema,
  "BlogComments"
);

module.exports = {
  BlogModel,
  BlogCommentModel,
};
