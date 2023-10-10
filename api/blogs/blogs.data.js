const { miniDatabase } = require("@root/database/miniDatabase");

let blogsModel = miniDatabase.Blogs;
let blogsCommentModel = miniDatabase.BlogComments;

module.exports = {
  blogsModel,
  blogsCommentModel,
};
