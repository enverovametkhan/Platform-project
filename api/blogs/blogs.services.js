const { getAccessToUserData } = require("@root/utilities/getUserData");
const mongoose = require("mongoose");

const { client } = require("../app");
const redis = require("redis");
// const { redisClient } = require("@root/app");

const { BlogModel, BlogCommentModel } = require("./blogs.data");
const { customLogger } = require("../pack/mezmo");

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
let redisClient;

(async () => {
  redisClient = redis.createClient({
    url: "redis://default:I2cVxjQXj4v07UAWPjQcfVrJND4lfDKh@redis-13093.c302.asia-northeast1-1.gce.cloud.redislabs.com:13093",
  });

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();
const blogCache = {};
async function getBlogService(id) {
  const key = `blog:${id}`;

  if (blogCache[key]) {
    customLogger.consoleInfo("Blog retrieved from cache", { blogId: id });
    return blogCache[key];
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

  blogCache[key] = thisBlog;

  customLogger.consoleInfo("Blog retrieved successfully", { blogId: id });

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

  if (blogCache[key]) {
    customLogger.consoleInfo("Top 10 blogs retrieved from cache", {
      category,
      numberOfBlogs: blogCache[key].length,
    });
    return blogCache[key];
  }

  const blogs = await BlogModel.find({ category, visible: true });

  if (!blogs || blogs.length === 0) {
    console.log("no blogs");
    customLogger.consoleError("No blogs found in the category", {
      category,
      function: "getBlogInCategoryService",
    });
    throw new Error("No blogs found in the category");
  }

  blogs.sort((a, b) => b.likes - a.likes);
  const top10Blogs = blogs.slice(0, 10);

  blogCache[key] = top10Blogs;

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
const userBlogCache = {};
async function getUserBlogInCategoryService(userId, category) {
  const key = `user:${userId}:category:${category}`;

  if (userBlogCache[key]) {
    customLogger.consoleInfo("User blogs retrieved from cache", {
      userId,
      category,
      numberOfBlogs: userBlogCache[key].length,
    });
    return userBlogCache[key];
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

  userBlogCache[key] = blogs;

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

  const key = `blog:${id}`;
  delete blogCache[key];

  const categoryKey = `category:${updatedBlogData.category}`;
  delete blogCache[categoryKey];

  const userBlogKey = `user:${userData.userId}:category:${updatedBlogData.category}`;
  delete userBlogCache[userBlogKey];

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
