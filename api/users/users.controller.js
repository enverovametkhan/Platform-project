const {
  getUser,
  deleteUser,
  updateUser,
  // swapEmail,
  confirmEmailSwap,
} = require("./users.service");

async function getUserController(req, res, next) {
  try {
    let response = await getUser();
    res.send(response);
    next();
  } catch (error) {
    const errorMessage = {
      error: { ...error },
      function: "getUserController",
      errorMessage: error.message || "Internal Server Error",
    };

    next(errorMessage);
  }
}

async function deleteUserController(req, res, next) {
  try {
    const { userId } = req.params;
    await deleteUser(userId);
    res.json({ message: "User deleted successfully" });
    next();
  } catch (error) {
    const errorMessage = {
      error: { ...error },
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

    if (!response) {
      throw new Error("No valid updates provided");
    } else {
      res.json(response);
      next();
    }
  } catch (error) {
    const errorMessage = {
      error: { ...error },
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

    await confirmEmailSwap(token);

    res.json({ message: "Email swapped successfully" });
    next();
  } catch (error) {
    console.error(error);

    const errorMessage = {
      error: { ...error },
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
