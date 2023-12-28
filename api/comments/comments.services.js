const { BlogModel, BlogCommentModel } = require("../blogs/blogs.data");
const { customLogger } = require("../pack/mezmo");
const { getAccessToUserData } = require("@root/utilities/getUserData");
const mongoose = require("mongoose");
const { redisClient } = require("../database/caching");

async function getCommentService(id) {
  const comment = await BlogCommentModel.findById(id);

  if (!comment) {
    customLogger.consoleError("No comments found", {
      function: "getCommentService",
    });
    throw new Error("No comments found");
  }

  const thisComment = {
    _id: comment._id,
    blogId: comment.blogId,
    content: comment.content,
    userId: comment.userId,
    likes: comment.likes,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  };

  customLogger.consoleInfo("Comment retrieved successfully");

  return thisComment;
}

async function createCommentService(newComment) {
  const userData = await getAccessToUserData();

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
  await deleteBlogCache(newComment.blogId);
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

async function deleteBlogCache(blogId) {
  const key = `blog:${blogId}`;
  await redisClient.del(key);
  customLogger.consoleInfo("Cache deleted for blog", { blogId });
}

module.exports = {
  getCommentService,
  createCommentService,
  deleteBlogCache,
};
