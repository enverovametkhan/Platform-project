const {
  getBlogService,
  getBlogInCategoryService,
  getUserBlogInCategoryService,
  updateBlogService,
  deleteBlogService,
  createBlogService,
} = require("./blogs.services");

async function getBlog(req, res, next) {
  try {
    const { id } = req.params;
    const response = await getBlogService(id);

    res.ourResponse = response;

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

    res.ourResponse = response;
    next();
  } catch (error) {
    const { category } = req.params;
    const errorMessage = {
      error: error.message,
      function: "getBlogsInCategory",
      errorMessage: "Internal Server Error",
      category,
    };

    next(errorMessage);
  }
}

async function getUserBlogsInCategory(req, res, next) {
  try {
    const { userId, category } = req.params;
    const response = await getUserBlogInCategoryService(userId, category);

    res.ourResponse = response;
    next();
  } catch (error) {
    const { userId, category } = req.params;
    const errorMessage = {
      error: error.message,
      function: "getUserBlogsInCategory",
      errorMessage: "An error occurred while fetching blogs",
      metaData: { userId, category },
    };

    next(errorMessage);
  }
}

async function updateBlog(req, res, next) {
  try {
    const { id } = req.params;
    const { title, content, img, visible, category } = req.body;

    let updatedBlogObject = {
      title,
      content,
      img,
      visible,
      category,
    };
    const response = await updateBlogService(id, updatedBlogObject);

    res.ourResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "updateBlog",
      errorMessage: "Internal Server Error",
    };
    next(errorMessage);
  }
}

async function deleteBlog(req, res, next) {
  try {
    const { id } = req.params;
    const response = await deleteBlogService(id);

    res.ourResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "deleteBlog",
      errorMessage: "Internal Server Error",
    };
    next(errorMessage);
  }
}

async function createBlog(req, res, next) {
  try {
    const { title, content, image, category, visible } = req.body;

    let newBlog = {
      title,
      content,
      image,
      category,
      visible,
    };
    const response = await createBlogService(newBlog);

    res.ourResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "createBlog",
      errorMessage: "Internal Server Error",
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
};
