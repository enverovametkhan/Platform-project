const { getAccessToUserData } = require("@root/utilities/getUserData");
const mongoose = require("mongoose");

const { BlogModel, BlogCommentModel } = require("./blogs.data");
const { customLogger } = require("../pack/mezmo");

async function getBlogService(id) {
  const blog = await BlogModel.findById(id);
  const comments = await BlogCommentModel.find({ blogId: id });

  if (!blog) {
    customLogger.consoleError("No blog found", { function: "getBlogService" });
    return {
      message: "No blog found",
    };
  }

  const thisBlog = {
    ...blog._doc,
    comments: [comments],
  };

  customLogger.consoleInfo("Blog retrieved successfully", { blogId: id });

  return {
    thisBlog,
  };
}

async function getBlogInCategoryService(category) {
  const blogs = await BlogModel.find({ category, visible: true });

  if (!blogs || blogs.length === 0) {
    customLogger.consoleError("No blogs found in the category", { category });
    return {
      message: "No blogs found in the category",
    };
  }

  blogs.sort((a, b) => b.likes - a.likes);
  const top10Blogs = blogs.slice(0, 10);

  customLogger.consoleInfo("Top 10 blogs retrieved successfully", {
    category,
    numberOfBlogs: top10Blogs.length,
  });

  return {
    message: "Here are the top 10 blogs in the category.",
    blogs: top10Blogs,
  };
}

async function getUserBlogInCategoryService(userId, category) {
  if (!userId || !category) {
    customLogger.consoleError("Missing required fields");
    return {
      error: "Missing required fields",
    };
  }

  const userData = await getAccessToUserData();
  customLogger.consoleInfo("User data retrieved successfully", { userData });

  if (userData.userId !== userId) {
    customLogger.consoleError("Unauthorized", {
      userId,
      requestedUserId: userData.userId,
    });
    return {
      error: "Unauthorized",
    };
  }

  let blogs = await BlogModel.find({ category, userId });

  if (!blogs || blogs.length === 0) {
    customLogger.consoleError("No blogs found", { userId, category });
    return {
      error: "No blogs found",
    };
  }

  customLogger.consoleInfo("User blogs retrieved successfully", {
    userId,
    category,
    numberOfBlogs: blogs.length,
  });
  return blogs;
}

async function updateBlogService(id, updatedBlog) {
  const blogToUpdate = await BlogModel.findById(id);

  if (!blogToUpdate) {
    customLogger.consoleError("No blog found", {
      function: "updateBlogService",
    });
    return {
      error: "No blog found",
    };
  }

  const userData = await getAccessToUserData();

  const updatedBlogData = await BlogModel.findByIdAndUpdate(id, updatedBlog, {
    new: true,
    runValidators: true,
  });

  if (!updatedBlogData) {
    customLogger.consoleError("Error updating blog post", {
      function: "updateBlogService",
    });
    return {
      error: "Error updating blog post",
    };
  }

  customLogger.consoleInfo("Blog post updated successfully", {
    blogId: id,
    updatedBlogData,
  });

  return {
    message: "Blog post updated successfully",
    updatedBlogData,
  };
}

async function deleteBlogService(id) {
  const deletedBlog = await BlogModel.findById(id);

  if (!deletedBlog) {
    customLogger.consoleError("No blogs found for deletion", { blogId: id });
    return {
      error: "No blogs found for deletion",
    };
  }

  const userData = await getAccessToUserData();

  if (deletedBlog.userId.toString() !== userData.userId) {
    customLogger.consoleError("Unauthorized deletion attempt", {
      userId: userData.userId,
      requestedUserId: deletedBlog.userId.toString(),
    });
    return {
      error: "Unauthorized",
    };
  }

  const deletionBlog = await BlogModel.deleteOne({ _id: id });

  if (deletionBlog.deletedCount !== 1) {
    customLogger.consoleError("Error deleting blog", { blogId: id });
    return {
      error: "Error deleting blog",
    };
  }

  customLogger.consoleInfo("Blog deleted successfully", {
    blogId: id,
    userData,
    blog: deletedBlog,
  });

  return {
    message: "Blog deleted successfully",
    userData,
    blog: deletedBlog,
  };
}

async function createBlogService(newBlog) {
  if (
    !newBlog.title ||
    !newBlog.content ||
    !newBlog.category ||
    newBlog.visible === undefined ||
    newBlog.visible === ""
  ) {
    customLogger.consoleError("Missing required fields");
    return {
      error: "Missing required fields",
    };
  }

  const userData = await getAccessToUserData();

  const createNewBlog = new BlogModel({
    title: newBlog.title,
    content: newBlog.content,
    image: newBlog.image,
    userId: userData.userId,
    category: newBlog.category,
    views: 0,
    likes: 0,
    visible: newBlog.visible,
  });

  const savedBlog = await createNewBlog.save();

  customLogger.consoleInfo("Blog created successfully", {
    blogId: savedBlog.id,
    userData,
  });

  return {
    message: "Blog created successfully",
    blog: savedBlog.toObject(),
  };
}

// async function deleteUsersBlogs(userId) {
//   const deleteIdBlogs = blogsModel.filter((blog) => blog.userId === userId);

//   if (deleteIdBlogs.length === 0) {
//     return { message: "No blogs to delete" };
//   }

//   let deletedBlogsNumber = 0;
//   let deletedCommentsNumber = 0;

//   deleteIdBlogs.forEach((deleteIdBlog) => {
//     const index = blogsModel.indexOf(deleteIdBlog);

//     if (index !== -1) {
//       blogsModel.splice(index, 1);
//       deletedBlogsNumber++;

//       const deleteIdComments = blogsCommentModel.filter(
//         (comment) => comment.blogId === deleteIdBlog.id
//       );
//       deleteIdComments.forEach((deleteIdComment) => {
//         const commentIndex = blogsCommentModel.indexOf(deleteIdComment);

//         if (commentIndex !== -1) {
//           blogsCommentModel.splice(commentIndex, 1);
//           deletedCommentsNumber++;
//         }
//       });
//     }
//   });

//   return {
//     deletedBlogs: deletedBlogsNumber,
//     deletedComments: deletedCommentsNumber,
//   };
// }

module.exports = {
  getBlogService,
  getBlogInCategoryService,
  getUserBlogInCategoryService,
  updateBlogService,
  deleteBlogService,
  createBlogService,
  // deleteUsersBlogs,
};
