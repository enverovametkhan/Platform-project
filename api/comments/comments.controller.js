const { createCommentService } = require("./comments.services");

async function createComment(req, res, next) {
  try {
    const { content, blogId } = req.body;

    const newComment = {
      content,
      blogId,
    };
    const response = await createCommentService(newComment);

    res.apiResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "createComment",
      errorMessage: `Something went wrong when creating a Comment`,
    };
    next(errorMessage);
  }
}

module.exports = {
  createComment,
};
