const { BlogModel, BlogCommentModel } = require("../blogs/blogs.data");
const { customLogger } = require("../pack/mezmo");
const { getAccessToUserData } = require("@root/utilities/getUserData");
const mongoose = require("mongoose");

async function createCommentService(newComment) {
  const userData = await getAccessToUserData();
  console.log("newComment:", newComment);
  if (!newComment.content) {
    customLogger.consoleError("Missing required fields");
    throw new Error("Missing required fields", {
      function: "createCommentService",
    });
  }
  if (newComment.userId && newComment.userId.toString() !== userData.userId) {
    customLogger.consoleError("Unauthorized comment creation attempt", {
      userId: userData.userId,
      requestedUserId: newComment.userId.toString(),
      function: "createCommentService",
    });
    throw new Error("Unauthorized comment creation attempt");
  }

  const createNewComment = new BlogCommentModel({
    content: newComment.content,
    userId: userData.userId,
    blogId: newComment.blogId,
    likes: 0,
  });

  const savedComment = await createNewComment.save();
  const response = {
    _id: savedComment._id,
  };

  customLogger.consoleInfo("Comment created successfully", {
    blogId: savedComment._id,
    userData,
  });

  return {
    message: "Comment created successfully",
    response,
  };
}

module.exports = {
  createCommentService,
};
