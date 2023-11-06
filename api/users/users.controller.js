const {
  getUser,
  deleteUser,
  updateUser,
  // swapEmail,
  confirmEmailSwap,
} = require("./users.service");

async function getUserController(req, res, next) {
  try {
    const response = await getUser();
    res.apiResponse = response;

    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "getUserController",
      errorMessage: error.message || "Internal Server Error",
    };

    next(errorMessage);
  }
}

async function deleteUserController(req, res, next) {
  try {
    const response = await deleteUser();
    res.apiResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "deleteUserController",
      errorMessage: error.message || "Internal Server Error",
    };
    next(errorMessage);
  }
}

async function updateUserController(req, res, next) {
  try {
    const updatedUserData = req.body;
    const response = await updateUser(updatedUserData);
    res.apiResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "updateUserController",
      errorMessage: error.message,
    };
    next(errorMessage);
  }
}

// async function swapEmailController(req, res) {
//   try {
//     const { newEmail } = req.body;
//     await swapEmail(newEmail);
//     res.json({ message: "Please check your email for the link" });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(error.message === "User not found" ? 404 : 500)
//       .json({ message: error.message });
//   }
// }

async function confirmEmailSwapController(req, res, next) {
  try {
    const { token } = req.params;
    const response = await confirmEmailSwap(token);
    res.apiResponse = response;
    next();
  } catch (error) {
    console.error(error);
    const errorMessage = {
      error: error.message,
      function: "confirmEmailSwapController",
      errorMessage: error.message,
    };

    next(errorMessage);
  }
}

module.exports = {
  getUserController,
  deleteUserController,
  updateUserController,

  // swapEmailController,
  confirmEmailSwapController,
};
