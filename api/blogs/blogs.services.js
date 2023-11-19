const { miniDatabase } = require("@root/database/miniDatabase");
const { getAccessToUserData } = require("@root/utilities/getUserData");
const mongoose = require("mongoose");
// const blogsModel = miniDatabase.Blogs;
// const blogsCommentModel = miniDatabase.BlogComments;
const { BlogModel, BlogCommentModel } = require("./blogs.data");

async function getBlogService(id) {
  const blog = await BlogModel.findById(id);
  const comments = await BlogCommentModel.find({ blogId: id });

  if (!blog) {
    const error = new Error("No blog found");
    error.function = "getBlogService";
    throw error;
  }
  const thisBlog = {
    ...blog._doc,
    comments: [comments],
  };

  return {
    thisBlog,
  };
}

async function getBlogInCategoryService(category) {
  const blogs = await BlogModel.find({ category, visible: true });

  if (!blogs || blogs.length === 0) {
    return;
  }

  blogs.sort((a, b) => b.likes - a.likes);
  const top10Blogs = blogs.slice(0, 10);

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

  let blogs = await blogsModel.find({ category, userId });

  if (!blogs) {
    throw new Error("No blogs found");
  }
  return blogs;
}

async function updateBlogService(id, updatedBlog) {
  const updateBlog = await BlogModel.findById(id);

  if (!updateBlog) {
    const error = new Error("No blog found");
    error.function = "updateBlogService";
    throw error;
  }

  const userData = await getAccessToUserData();
  console.log(userData);

  const updatedBlogData = await BlogModel.findByIdAndUpdate(id, updatedBlog, {
    new: true,
    runValidators: true,
  });

  return {
    message: "Blog post updated successfully",

    updatedBlogData,
  };
}

async function deleteBlogService(id) {
  const deletedBlog = await BlogModel.findById(id);

  if (!deletedBlog) {
    throw new Error("No blogs found for deletion");
  }

  const userData = await getAccessToUserData();

  if (deletedBlog.userId.toString() !== userData.userId) {
    throw new Error("Unauthorized");
  }

  const deletionResult = await BlogModel.deleteOne({ _id: id });

  if (deletionResult.deletedCount !== 1) {
    throw new Error("Error deleting blog");
  }

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

  const createNewBlog = await new BlogModel({
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
    blog: savedBlog.toObject(),
  };

  return response;
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
