// async function getBlogService(id) {
//   const blog = dummyBlogs.find((blog) => blog.id === id);

//   if (!blog) {
//     const error = new Error("No blog found");
//     error.function = "getBlogService";
//     throw error;
//   }

//   return {
//     message: "Here is the content for Blog Service",
//     blog,
//   };
// }

// function getBlogInCategoryService(category) {
//   const blogsInCategory = dummyBlogs.filter((blog) =>
//     blog.categories.includes(category)
//   );

//   if (blogsInCategory.length === 0) {
//     return {
//       error: "No blogs found in the specified category.",
//     };
//   }

//   const sortedBlogs = blogsInCategory.sort((a, b) => b.likes - a.likes);

//   const top10Blogs = sortedBlogs.slice(0, 10);

//   return {
//     message: "Here are the top 10 blogs in the category.",
//     blogs: top10Blogs,
//   };
// }

// async function getUserBlogInCategoryService(category) {
//   const blogsInCategory = dummyBlogs.filter(
//     (blog) => blog.categories.includes(category) && blog.user_id === userId
//   );

//   const userData = await getAccessToUserData();

//   return {
//     message: "List of blogs successfully loaded",
//     userData,
//     blogs: blogsInCategory,
//   };
// }

// async function updateBlogService({ id, title, content, image, categories }) {
//   const blogIndex = dummyBlogs.findIndex((blog) => blog.id === id);

//   if (blogIndex === -1) {
//     const error = new Error("No blog found");
//     error.function = "updateBlogService";
//     throw error;
//   }

//   dummyBlogs[blogIndex] = {
//     ...dummyBlogs[blogIndex],
//     title,
//     content,
//     image,
//     categories,
//   };

//   const userData = await getAccessToUserData();

//   return {
//     message: "Blog post updated successfully",
//     userData,
//     blog: dummyBlogs[blogIndex],
//   };
// }

// async function deleteBlogService(id) {
//   const index = dummyBlogs.findIndex((blog) => blog.id === id);

//   if (index === -1) {
//     throw new Error("No blogs found for deletion");
//   }

//   const deletedBlog = dummyBlogs.splice(index, 1)[0];
//   const userData = await getAccessToUserData();

//   return {
//     message: "Blog deleted successfully",
//     userData,
//     blog: deletedBlog,
//   };
// }

// async function createBlogService({ title, content, image, categories }) {
//   const newBlog = {
//     title,
//     content,
//     image,
//     categories,
//   };

//   dummyBlogs.push(newBlog);
//   const userData = await getAccessToUserData();

//   return {
//     message: "Blog created successfully",
//     userData,
//     blog: newBlog,
//   };
// }

// module.exports = {
//   getBlogService,
//   getBlogInCategoryService,
//   getUserBlogInCategoryService,
//   updateBlogService,
//   deleteBlogService,
//   createBlogService,
// };
const { miniDatabase } = require("@root/database/miniDatabase");
const { getAccessToUserData } = require("@root/utilities/getUserData");

const blogsModel = miniDatabase.Blogs;
const blogsCommentModel = miniDatabase.BlogComments;

async function getBlogService(id) {
  const blog = blogsModel.find((blog) => blog.id === id);

  if (!blog) {
    const error = new Error("No blog found");
    error.function = "getBlogService";
    throw error;
  }

  return {
    message: "Here is the content for Blog Service",
    blog,
  };
}

function getBlogInCategoryService(category) {
  const blogsInCategory = blogsModel.filter(
    (blog) => blog.category === category
  );

  if (blogsInCategory.length === 0) {
    return {
      error: "No blogs found in the specified category.",
    };
  }

  const sortedBlogs = blogsInCategory.sort((a, b) => b.likes - a.likes);
  const top10Blogs = sortedBlogs.slice(0, 10);

  return {
    message: "Here are the top 10 blogs in the category.",
    blogs: top10Blogs,
  };
}

async function getUserBlogInCategoryService(category) {
  const blogsInCategory = blogsModel.filter(
    (blog) => blog.category === category && blog.userId === userId
  );

  const userData = await getAccessToUserData();

  return {
    message: "List of blogs successfully loaded",
    userData,
    blogs: blogsInCategory,
  };
}

async function updateBlogService({ id, title, content, image, categories }) {
  const blogIndex = blogsModel.findIndex((blog) => blog.id === id);

  if (blogIndex === -1) {
    const error = new Error("No blog found");
    error.function = "updateBlogService";
    throw error;
  }

  blogsModel[blogIndex] = {
    ...blogsModel[blogIndex],
    title,
    content,
    image,
    category: categories,
  };

  const userData = await getAccessToUserData();

  return {
    message: "Blog post updated successfully",
    userData,
    blog: blogsModel[blogIndex],
  };
}

async function deleteBlogService(id) {
  const index = blogsModel.findIndex((blog) => blog.id === id);

  if (index === -1) {
    throw new Error("No blogs found for deletion");
  }

  const deletedBlog = blogsModel.splice(index, 1)[0];
  const userData = await getAccessToUserData();

  return {
    message: "Blog deleted successfully",
    userData,
    blog: deletedBlog,
  };
}

// async function createBlogService({ title, content, image, categories }) {
//   const newBlog = {
//     title,
//     content,
//     image,
//     userId,
//     views: 0,
//     likes: 0,
//     visible: true,
//     category: categories,
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//   };

//   blogsModel.push(newBlog);
//   const userData = await getAccessToUserData();

//   return {
//     message: "Blog created successfully",
//     userData,
//     blog: newBlog,
//   };
async function createBlogService({ title, content, image, categories }) {
  const newBlog = {
    title,
    content,
    image,
    categories,
  };

  blogsModel.push(newBlog);
  const userData = await getAccessToUserData();

  return {
    message: "Blog created successfully",
    userData,
    blog: newBlog,
  };
}

module.exports = {
  getBlogService,
  getBlogInCategoryService,
  getUserBlogInCategoryService,
  updateBlogService,
  deleteBlogService,
  createBlogService,
};
