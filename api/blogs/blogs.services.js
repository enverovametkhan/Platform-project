const { getAccessToUserData } = require("@root/utilities/getUserData");
const mongoose = require("mongoose");
const redis = require("redis");
const { BlogModel, BlogCommentModel } = require("./blogs.data");
const { customLogger } = require("../pack/mezmo");
const { redisClient } = require("../database/caching");
const { getComments } = require("../comments/comments.services");

// async function getBlogService(id) {
//   const blog = await BlogModel.findById(id);
//   const comments = await BlogCommentModel.find({ blogId: id });

//   if (!blog) {
//     customLogger.consoleError("No blog found", { function: "getBlogService" });
//     throw new Error("No blog found");
//   }

//   const thisBlog = {
//     title: blog.title,
//     comments: [comments],
//     _id: blog._id,
//     content: blog.content,
//     image: blog.image,
//     category: blog.category,
//     userId: blog.userId,
//     views: blog.views,
//     likes: blog.likes,
//     visible: true,
//     createdAt: blog.createdAt,
//     updatedAt: blog.updatedAt,
//     __v: blog.__v,
//   };

//   customLogger.consoleInfo("Blog retrieved successfully", { blogId: id });

//   return thisBlog;
// }

async function getBlogService(id) {
  const key = `blog:${id}`;

  const cacheResults = await redisClient.get(key);

  if (cacheResults) {
    const cachedBlog = JSON.parse(cacheResults);
    customLogger.consoleInfo("Blog retrieved from cache", { blogId: id });
    return cachedBlog;
  }

  const blog = await BlogModel.findById(id);
  const comments = await BlogCommentModel.find({ blogId: id });

  if (!blog) {
    customLogger.consoleError("No blog found", { function: "getBlogService" });
    throw new Error("No blog found");
  }

  const thisBlog = {
    title: blog.title,
    comments: comments,
    _id: blog._id,
    content: blog.content,
    image: blog.image,
    category: blog.category,
    userId: blog.userId,
    views: blog.views,
    likes: blog.likes,
    visible: true,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
    __v: blog.__v,
  };

  await redisClient.set(key, JSON.stringify(thisBlog));

  customLogger.consoleInfo("Blog retrieved successfully from the database", {
    blogId: id,
  });

  return thisBlog;
}

// async function getBlogInCategoryService(category) {
//   const blogs = await BlogModel.find({ category, visible: true });

//   if (!blogs || blogs.length === 0) {
//     console.log("no blogs");
//     customLogger.consoleError("No blogs found in the category", {
//       category,
//       function: " getBlogInCategoryService",
//     });
//     throw new Error("No blogs found in the category");
//   }

//   blogs.sort((a, b) => b.likes - a.likes);
//   const top10Blogs = blogs.slice(0, 10);

//   customLogger.consoleInfo("Top 10 blogs retrieved successfully", {
//     category,
//     numberOfBlogs: top10Blogs.length,
//   });

//   return top10Blogs;
// }

async function getBlogInCategoryService(category) {
  const key = `category:${category}`;

  const cacheResults = await redisClient.get(key);

  if (cacheResults) {
    const cachedData = JSON.parse(cacheResults);
    customLogger.consoleInfo("Top 10 blogs retrieved from cache", {
      category,
      numberOfBlogs: cachedData.length,
    });
    return cachedData;
  }

  const blogs = await BlogModel.find({ category, visible: true });

  if (!blogs || blogs.length === 0) {
    customLogger.consoleError("No blogs found in the category", {
      category,
      function: "getBlogInCategoryService",
    });
    throw new Error("No blogs found in the category");
  }

  const top10Blogs = blogs.sort((a, b) => b.likes - a.likes).slice(0, 10);

  await redisClient.set(key, JSON.stringify(top10Blogs));

  customLogger.consoleInfo(
    "Top 10 blogs retrieved successfully from the database",
    {
      category,
      numberOfBlogs: top10Blogs.length,
    }
  );

  return top10Blogs;
}

// async function getUserBlogInCategoryService(userId, category) {
//   if (!userId || !category) {
//     customLogger.consoleError("Missing required fields", {
//       function: "getUserBlogInCategoryService",
//     });
//     throw new Error("Missing required fields");
//   }

//   const userData = await getAccessToUserData();
//   customLogger.consoleInfo("User data retrieved successfully", { userData });

//   if (userData.userId !== userId) {
//     customLogger.consoleError("Unauthorized", {
//       userId,
//       requestedUserId: userData.userId,
//       function: "getUserBlogInCategoryService",
//     });
//     throw new Error("Unauthorized");
//   }

//   let blogs = await BlogModel.find({ category, userId });

//   if (!blogs || blogs.length === 0) {
//     customLogger.consoleError("No blogs found", {
//       userId,
//       category,
//       function: " getUserBlogInCategoryService",
//     });
//     throw new Error("No blogs found");
//   }

//   customLogger.consoleInfo("User blogs retrieved successfully", {
//     userId,
//     category,
//     numberOfBlogs: blogs.length,
//   });
//   return blogs;
// }
async function getUserBlogInCategoryService(userId, category) {
  const key = `user:${userId}:category:${category}`;

  const cacheResults = await redisClient.get(key);

  if (cacheResults) {
    const cachedData = JSON.parse(cacheResults);
    customLogger.consoleInfo("User blogs retrieved from cache", {
      userId,
      category,
      numberOfBlogs: cachedData.length,
    });
    return cachedData;
  }

  const userData = await getAccessToUserData();

  if (userData.userId !== userId) {
    customLogger.consoleError("Unauthorized", {
      userId,
      requestedUserId: userData.userId,
      function: "getUserBlogInCategoryService",
    });
    throw new Error("Unauthorized");
  }

  let blogs = await BlogModel.find({ category, userId });

  if (!blogs || blogs.length === 0) {
    customLogger.consoleError("No blogs found", {
      userId,
      category,
      function: "getUserBlogInCategoryService",
    });
    throw new Error("No blogs found");
  }

  await redisClient.set(key, JSON.stringify(blogs));

  customLogger.consoleInfo(
    "User blogs retrieved successfully from the database",
    {
      userId,
      category,
      numberOfBlogs: blogs.length,
    }
  );

  return blogs;
}
async function updateBlogService(id, updatedBlog) {
  const blogToUpdate = await BlogModel.findById(id);

  if (!blogToUpdate) {
    customLogger.consoleError("No blog found", {
      function: "updateBlogService",
    });
    throw new Error("No blog found");
  }

  const userData = await getAccessToUserData();

  if (blogToUpdate.userId.toString() !== userData.userId) {
    customLogger.consoleError("Unauthorized update attempt", {
      userId: userData.userId,
      requestedUserId: blogToUpdate.userId.toString(),
      function: "updateBlogService",
    });
    throw new Error("Unauthorized update attempt");
  }

  const updatedBlogData = await BlogModel.findByIdAndUpdate(id, updatedBlog, {
    new: true,
    runValidators: true,
  });

  if (!updatedBlogData) {
    customLogger.consoleError("Error updating blog post", {
      function: "updateBlogService",
    });
    throw new Error("Error updating blog post");
  }

  const top10Blogs = await getBlogInCategoryService(updatedBlogData.category);

  if (
    top10Blogs.some(
      (blog) => blog._id.toString() === updatedBlogData._id.toString()
    )
  ) {
    const cacheKeys = [
      `blog:${id}`,
      `category:${updatedBlogData.category}`,
      `user:${updatedBlogData.userId}:category:${updatedBlogData.category}`,
    ];

    cacheKeys.forEach(async (key) => {
      await redisClient.del(key);
    });
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
    customLogger.consoleError("No blogs found for deletion", {
      blogId: id,
      function: "deleteBlogService",
    });
    throw new Error("No blogs found for deletion");
  }

  const userData = await getAccessToUserData();

  if (deletedBlog.userId.toString() !== userData.userId) {
    customLogger.consoleError("Unauthorized deletion attempt", {
      userId: userData.userId,
      requestedUserId: deletedBlog.userId.toString(),
      function: "deleteBlogService",
    });
    throw new Error("Unauthorized deletion attempt");
  }

  const deletionBlog = await BlogModel.deleteOne({ _id: id });

  if (deletionBlog.deletedCount !== 1) {
    customLogger.consoleError("Error deleting blog", {
      blogId: id,
      function: "deleteBlogService",
    });
    throw new Error("Error deleting blog");
  }
  const cacheKeys = [
    `blog:${id}`,
    `category:${deletedBlog.category}`,
    `user:${deletedBlog.userId}:category:${deletedBlog.category}`,
  ];

  cacheKeys.forEach(async (key) => {
    await redisClient.del(key);
  });

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
    throw new Error("Missing required fields", {
      function: "createBlogService",
    });
  }

  const userData = await getAccessToUserData();
  if (newBlog.userId && newBlog.userId.toString() !== userData.userId) {
    customLogger.consoleError("Unauthorized blog creation attempt", {
      userId: userData.userId,
      requestedUserId: newBlog.userId.toString(),
      function: "createBlogSerivice",
    });
    throw new Error("Unauthorized blog creation attempt");
  }

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
  const response = {
    _id: savedBlog._id,
  };

  customLogger.consoleInfo("Blog created successfully", {
    blogId: savedBlog._id,
    userData,
  });

  return {
    message: "Blog created successfully",
    response,
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

// return {
//   deletedBlogs: deletedBlogsNumber,
//   deletedComments: deletedCommentsNumber,
// };
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
