const {
  getCommentService,
  createCommentService,
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

// async function deleteCommentsController(req, res, next) {
//   try {
//     const { blogId } = req.params;
//     await deleteComments(blogId);

//     res.apiResponse = { message: "Comments deleted successfully" };

//     next();
//   } catch (error) {
//     const { blogId } = req.params;
//     const errorMessage = {
//       error: error.message,
//       function: "deleteCommentsController",
//       errorMessage: `Something went wrong while processing deleteCommentsController with Blog ID ${blogId}`,
//     };

//     next(errorMessage);
//   }
// }

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
  getComments,
  //   deleteCommentsController,
  createComment,
};
