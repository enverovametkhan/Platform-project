const {
  getBlogService,
  getBlogInCategoryService,
  getUserBlogInCategoryService,
  updateBlogService,
  deleteBlogService,
  createBlogService,
  // likeBlogService,
  // unlikeBlogService,
  blogLikeService,
  blogViewsService,
} = require("./blogs.services");

async function getBlog(req, res, next) {
  try {
    const { id, userId } = req.params;
    const response = await getBlogService(id, userId);

    res.apiResponse = response;

    next();
  } catch (error) {
    const { id } = req.params;
    const errorMessage = {
      error: error.message,
      function: "getBlog",
      errorMessage: `Something went wrong while processing getBlog controller with ID ${id}`,
    };

    next(errorMessage);
  }
}

async function getBlogsInCategory(req, res, next) {
  try {
    const { category } = req.params;
    const response = await getBlogInCategoryService(category);

    res.apiResponse = response;
    next();
  } catch (error) {
    const { category } = req.params;
    const errorMessage = {
      error: error.message,
      function: "getBlogsInCategory",
      errorMessage: `Something went wrong when trying to get Blogs in category ${category}`,
      category,
    };

    next(errorMessage);
  }
}

async function getUserBlogsInCategory(req, res, next) {
  try {
    const { userId, category } = req.params;
    const response = await getUserBlogInCategoryService(userId, category);

    res.apiResponse = response;
    next();
  } catch (error) {
    const { userId, category } = req.params;
    const errorMessage = {
      error: error.message,
      function: "getUserBlogsInCategory",
      errorMessage: `Something went wrong when trying to get User Blogs in category`,
      metaData: { userId, category },
    };

    next(errorMessage);
  }
}

async function updateBlog(req, res, next) {
  try {
    const { id } = req.params;
    const { title, content, image, visible, categories } = req.body;

    const updatedBlog = {
      title,
      content,
      image,
      visible,
      categories,
    };

    const response = await updateBlogService(id, updatedBlog);

    res.apiResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      function: "updateBlog",
      errorMessage: `Something went wrong when updating a Blog`,
    };
    next(errorMessage);
  }
}

async function deleteBlog(req, res, next) {
  try {
    const { id } = req.params;
    const response = await deleteBlogService(id);

    res.apiResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "deleteBlog",
      errorMessage: `Something went wrong when deleting a Blog`,
    };
    next(errorMessage);
  }
}

async function createBlog(req, res, next) {
  try {
    const { title, content, image, category, visible } = req.body;

    const newBlog = {
      title,
      content,
      image,
      category,
      visible,
    };

    const response = await createBlogService(newBlog);

    res.apiResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "createBlog",
      errorMessage: `Something went wrong when creating a Blog`,
    };
    next(errorMessage);
  }
}

async function blogLike(req, res, next) {
  try {
    const { blogId, userId } = req.params;

    const response = await blogLikeService(blogId, userId);
    res.apiResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "blogLike",
      errorMessage: `Something went wrong when liking a Blog`,
    };
    next(errorMessage);
  }
}

async function blogView(req, res, next) {
  try {
    const { blogId } = req.params;
    const response = await blogViewsService(blogId);
    res.apiResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "blogView",
      errorMessage: `Something went wrong when viewing a Blog`,
    };
    next(errorMessage);
  }
}
module.exports = {
  getBlog,
  getBlogsInCategory,
  getUserBlogsInCategory,
  updateBlog,
  createBlog,
  deleteBlog,
  blogLike,
  blogView,
};
