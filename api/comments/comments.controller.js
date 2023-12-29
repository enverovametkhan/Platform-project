const {
  getCommentService,
  createCommentService,
  updateCommentService,
  deleteCommentService,
} = require("./comments.services");

async function getComments(req, res, next) {
  try {
    const { id } = req.params;
    const response = await getCommentService(id);

    res.apiResponse = response;

    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "getCommentsController",
      errorMessage: `Something went wrong while processing getComments`,
    };

    next(errorMessage);
  }
}

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
async function updateComment(req, res, next) {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const updatedComment = {
      content,
    };

    const response = await updateCommentService(id, updatedComment);

    res.apiResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      function: "updateComment",
      errorMessage: `Something went wrong when updating a Comment`,
    };
    next(errorMessage);
  }
}
async function deleteComment(req, res, next) {
  try {
    const { id } = req.params;
    const response = await deleteCommentService(id);

    res.apiResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "deleteComment",
      errorMessage: `Something went wrong when deleting a Comment`,
    };
    next(errorMessage);
  }
}
module.exports = {
  getComments,
  createComment,
  updateComment,
  deleteComment,
};
