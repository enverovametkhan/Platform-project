const { miniDatabase } = require("@root/database/miniDatabase");
const { getAccessToUserData } = require("@root/utilities/getUserData");

const blogsModel = miniDatabase.Blogs;
const blogsCommentModel = miniDatabase.BlogComments;

async function getBlogService(id) {
  const blog = blogsModel.find((blog) => blog.id === id);
  const comments = blogsCommentModel.find((comment) => comment.blog_id === id);

  if (!blog) {
    const error = new Error("No blog found");
    error.function = "getBlogService";
    throw error;
  }

  return {
    ...blog,
    comments: [comments],
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

async function getUserBlogInCategoryService(userId, category) {
  if (!userId || !category) throw new Error("Missing required fields");
  const userData = await getAccessToUserData();
  console.log(userData);
  if (userData.userId !== userId) {
    throw new Error("Unauthorized");
  }

  let blogs = blogsModel.filter(
    (blog) => blog.category === category && blog.userId === userId
  );

  if (!blogs) {
    throw new Error("No blogs found");
  }
  return blogs;
}

async function updateBlogService(id, updatedBlog) {
  const blogIndex = blogsModel.findIndex((blog) => blog.id === id);

  if (blogIndex === -1) {
    const error = new Error("No blog found");
    error.function = "updateBlogService";
    throw error;
  }

  blogsModel[blogIndex] = {
    ...blogsModel[blogIndex],
    ...updatedBlog,
  };

  const userData = await getAccessToUserData();
  console.log(userData);

  return {
    message: "Blog post updated successfully",

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

async function createBlogService(newBlog) {
  if (
    !newBlog.title ||
    !newBlog.content ||
    !newBlog.category ||
    newBlog.visible === undefined ||
    newBlog.visible === ""
  ) {
    throw new Error("Missing required fields");
  }
  const userData = await getAccessToUserData();

  const createdBlog = {
    id: Date.now().toString(),
    title: newBlog.title,
    content: newBlog.content,
    image: newBlog.image,
    userId: userData.userId,
    category: newBlog.category,
    views: 0,
    likes: 0,
    visible: newBlog.visible,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: "",
  };

  blogsModel.push(createdBlog);

  return createdBlog;
}

async function deleteUsersBlogs(userId) {
  const deleteIdBlogs = blogsModel.filter((blog) => blog.userId === userId);

  if (deleteIdBlogs.length === 0) {
    return { message: "No blogs to delete" };
  }

  let deletedBlogsNumber = 0;
  let deletedCommentsNumber = 0;

  deleteIdBlogs.forEach((deleteIdBlog) => {
    const index = blogsModel.indexOf(deleteIdBlog);

    if (index !== -1) {
      blogsModel.splice(index, 1);
      deletedBlogsNumber++;

      const deleteIdComments = blogsCommentModel.filter(
        (comment) => comment.blogId === deleteIdBlog.id
      );
      deleteIdComments.forEach((deleteIdComment) => {
        const commentIndex = blogsCommentModel.indexOf(deleteIdComment);

        if (commentIndex !== -1) {
          blogsCommentModel.splice(commentIndex, 1);
          deletedCommentsNumber++;
        }
      });
    }
  });

  return {
    deletedBlogs: deletedBlogsNumber,
    deletedComments: deletedCommentsNumber,
  };
}

module.exports = {
  getBlogService,
  getBlogInCategoryService,
  getUserBlogInCategoryService,
  updateBlogService,
  deleteBlogService,
  createBlogService,
  deleteUsersBlogs,
};
