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

  customLogger.consoleInfo("Comment retrieved successfully", {
    commentData: thisComment,
  });

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

async function updateCommentService(id, updatedComment) {
  const commentToUpdate = await BlogCommentModel.findById(id);

  if (!commentToUpdate) {
    customLogger.consoleError("No comment found", {
      function: "updateBlogService",
    });
    throw new Error("No comment found");
  }

  const userData = await getAccessToUserData();

  if (commentToUpdate.userId.toString() !== userData.userId) {
    customLogger.consoleError("Unauthorized update attempt", {
      userId: userData.userId,
      requestedUserId: commentToUpdate.userId.toString(),
      function: "updateBlogService",
    });
    throw new Error("Unauthorized update attempt");
  }

  const updatedCommentData = await BlogCommentModel.findByIdAndUpdate(
    id,
    updatedComment,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedCommentData) {
    customLogger.consoleError("Error updating comment", {
      function: "updateCommentService",
    });
    throw new Error("Error updating comment");
  }
  customLogger.consoleInfo("Comment updated successfully", {
    id,
    updatedCommentData,
  });
  return {
    message: "Comment updated successfully",
    updatedCommentData,
  };
}

async function deleteCommentService(id) {
  const deletedComment = await BlogCommentModel.findById(id);

  if (!deletedComment) {
    customLogger.consoleError("No comments found for deletion", {
      blogId: id,
      function: "deleteCommentService",
    });
    throw new Error("No comments found for deletion");
  }

  const userData = await getAccessToUserData();

  if (deletedComment.userId.toString() !== userData.userId) {
    customLogger.consoleError("Unauthorized deletion attempt", {
      userId: userData.userId,
      requestedUserId: deletedComment.userId.toString(),
      function: "deleteCommentService",
    });
    throw new Error("Unauthorized deletion attempt");
  }

  const deletionComment = await BlogCommentModel.deleteOne({ _id: id });

  if (deletionComment.deletedCount !== 1) {
    customLogger.consoleError("Error deleting comment", {
      blogId: id,
      function: "deleteCommentService",
    });
    throw new Error("Error deleting comment");
  }

  customLogger.consoleInfo("Comment deleted successfully", {
    blogId: id,
    userData,
    comment: deletedComment,
  });

  return {
    message: "Comment deleted successfully",
    userData,
    comment: deletedComment,
  };
}
module.exports = {
  getCommentService,
  createCommentService,
  deleteBlogCache,
  updateCommentService,
  deleteCommentService,
};
