const { getAccessToUserData } = require("@root/utilities/getUserData");
const mongoose = require("mongoose");
const redis = require("redis");
const { BlogModel, BlogCommentModel, BlogLikesModel } = require("./blogs.data");
const { customLogger } = require("../pack/mezmo");
const { redisClient } = require("../database/caching");
const { deleteBlogCache } = require("../comments/comments.services");

// async function getBlogService(id, userId) {
//   const blogs = await BlogModel.findById(id);
//   const comments = await BlogCommentModel.find({ blogId: id });

//   if (!blogs) {
//     customLogger.consoleError("No blog found", {
//       id,
//       function: "getBlogService",
//     });
//     throw new Error("No blog found");
//   }

//   const thisBlog = {
//     title: blogs.title,
//     comments: [comments],
//     _id: blogs._id,
//     content: blogs.content,
//     image: blogs.image,
//     category: blogs.category,
//     userId: blogs.userId,
//     views: blogs.views,
//     likes: blogs.likes,
//     visible: true,
//     createdAt: blogs.createdAt,
//     updatedAt: blogs.updatedAt,
//     __v: blogs.__v,
//   };

//   customLogger.consoleInfo("Blog retrieved successfully", { blogId: id });

//   return thisBlog;
// }

async function getBlogService(id) {
  const key = `blog:${id}`;
  const { userId } = await getAccessToUserData();
  let hasUserLikedBlog = false;

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
  if (userId !== "public") {
    const likedBlog = await BlogLikesModel.findOne({ blogId: id, userId });
    hasUserLikedBlog = !!likedBlog;
  }

  const allLikes = await BlogLikesModel.find({ blogId: id });
  const totalLikes = allLikes.map((like) => like.userId).length;

  const thisBlog = {
    title: blog.title,
    comments: comments,
    _id: blog._id,
    content: blog.content,
    image: blog.image,
    category: blog.category,
    userId: blog.userId,
    views: blog.views,
    likes: totalLikes,
    visible: true,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
    hasUserLikedBlog,
  };

  await redisClient.set(key, JSON.stringify(thisBlog), "EX", 86400);

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

  // if (!blogs || blogs.length === 0) {
  //   customLogger.consoleError("No blogs found in the category", {
  //     category,
  //     function: "getBlogInCategoryService",
  //   });
  //   throw new Error("No blogs found in the category");
  // }

  const top10Blogs = blogs.sort((a, b) => b.likes - a.likes).slice(0, 10);

  await redisClient.set(key, JSON.stringify(top10Blogs), "EX", 86400);

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

  // if (!blogs || blogs.length === 0) {
  //   customLogger.consoleError("No blogs found", {
  //     userId,
  //     category,
  //     function: "getUserBlogInCategoryService",
  //   });
  //   throw new Error("No blogs found");
  // }

  await redisClient.set(key, JSON.stringify(blogs), "EX", 86400);

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

  const blogCacheKey = `blog:${id}`;
  await redisClient.set(
    blogCacheKey,
    JSON.stringify(updatedBlogData),
    "EX",
    86400
  );

  const userBlogsCacheKey = `user:${updatedBlogData.userId}:category:${updatedBlogData.category}`;
  await redisClient.del(userBlogsCacheKey);

  const top10Blogs = await getBlogInCategoryService(updatedBlogData.category);

  const isUpdatedBlogInTop10 = top10Blogs.some(
    (blog) => blog._id.toString() === updatedBlogData._id.toString()
  );

  if (isUpdatedBlogInTop10) {
    const top10CacheKey = `category:${updatedBlogData.category}`;
    await redisClient.del(top10CacheKey);
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

  const blogCacheKey = `blog:${id}`;
  await redisClient.del(blogCacheKey);

  const userBlogsCacheKey = `user:${deletedBlog.userId}:category:${deletedBlog.category}`;
  await redisClient.del(userBlogsCacheKey);

  const top10Blogs = await getBlogInCategoryService(deletedBlog.category);

  const isDeletedBlogInTop10 = top10Blogs.some(
    (blog) => blog._id.toString() === deletedBlog._id.toString()
  );

  if (isDeletedBlogInTop10) {
    const top10CacheKey = `category:${deletedBlog.category}`;
    await redisClient.del(top10CacheKey);
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
    customLogger.consoleError("Missing required fields", {
      function: "createBlogService",
      userId: userData.userId,
    });
    throw new Error("Missing required fields");
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
  const userBlogsCacheKey = `user:${userData.userId}:category:${newBlog.category}`;
  await redisClient.del(userBlogsCacheKey);

  customLogger.consoleInfo("Blog created successfully", {
    blogId: savedBlog._id,
    userData,
  });

  return response;
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

// async function unlikeBlogService(blogId, userId) {
//   console.log(blogId, userId);
//   const userLikedBlog = await BlogLikesModel.findOneAndDelete({
//     blogId,
//     userId,
//   });

//   if (!userLikedBlog) {
//     throw new Error("You have not liked this blog.");
//   }

//   await deleteBlogCache(blogId);

//   const newLike = new BlogLikesModel({ blogId, userId, likes: 0 });
//   await newLike.save();

//   customLogger.consoleInfo("Blog unliked successfully", {
//     blogId,
//     userId,
//   });

//   return { message: "Blog unliked successfully" };
// }

async function blogLikeService(blogId, userId) {
  const userData = await getAccessToUserData();

  if (!userData) {
    throw new Error("Unauthorized access to user data");
  }
  const existingBlogLike = await BlogLikesModel.findOne({ blogId, userId });
  if (!existingBlogLike) {
    const newLike = new BlogLikesModel({ blogId, userId });
    await newLike.save();
    await deleteBlogCache(newLike.blogId);

    customLogger.consoleInfo("Blog liked successfully", {
      blogId,
      userId,
    });

    return { message: "Blog liked successfully" };
  }

  if (existingBlogLike) {
    await BlogLikesModel.findOneAndDelete({ blogId, userId });
    await deleteBlogCache(blogId);
    customLogger.consoleInfo("Blog unliked successfully", {
      blogId,
      userId,
    });
    return { message: "Blog unliked successfully" };
  }
}

async function blogViewsService(blogId) {
  let blogView = await BlogModel.findById(blogId);
  if (!blogView) {
    blogView = new BlogModel({ blogId });
  }

  blogView.views += 1;
  await blogView.save();
  await deleteBlogCache(blogId);

  customLogger.consoleInfo("Blog views updated successfully", {
    blogId,
  });

  return { message: "Blog views updated successfully" };
}

module.exports = {
  getBlogService,
  getBlogInCategoryService,
  getUserBlogInCategoryService,
  updateBlogService,
  deleteBlogService,
  createBlogService,
  // deleteUsersBlogs,

  blogLikeService,
  blogViewsService,
};
