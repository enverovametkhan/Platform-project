const express = require("express");
const router = express.Router();
const { authMiddleware } = require("@root/utilities/auth.middleware");

const {
  getBlog,
  getBlogsInCategory,
  getUserBlogsInCategory,
  updateBlog,
  deleteBlog,
  createBlog,
} = require("@root/blogs/blogs.controller");

const {
  loginController,
  signupController,
  verifyEmailController,
  logoutController,
  getUserController,
  deleteUserController,
  updateUserController,
  refreshAuthTokenController,
  resetPasswordController,
  checkResetPasswordTokenController,
  changePasswordController,
  // swapEmailController,
  confirmEmailSwapController,
} = require("@root/users/users.controller");

module.exports = (app) => {
  // Blog Routes
  app.get("/api/blog/:id", getBlog);
  app.get("/api/blog/category/:category", getBlogsInCategory);
  app.get(
    "/api/blog/:userId/:category",
    authMiddleware,
    getUserBlogsInCategory
  );
  app.put("/api/blog/:id", authMiddleware, updateBlog);
  app.delete("/api/blog/:id", authMiddleware, deleteBlog);
  app.post("/api/blog", authMiddleware, createBlog);

  // User Routes
  app.post("/api/user/login", loginController);
  app.post("/api/user/signup", signupController);
  app.get("/api/user/verifyEmail/:hash", verifyEmailController);
  app.get("/api/user/logout", authMiddleware, logoutController);
  app.get("/api/user", authMiddleware, getUserController);
  app.delete("/api/user/delete", authMiddleware, deleteUserController);
  app.put("/api/user/update", authMiddleware, updateUserController);
  app.get(
    "/api/user/refreshAuthToken",
    authMiddleware,
    refreshAuthTokenController
  );
  app.get("/api/user/resetPassword/:email", resetPasswordController);
  app.get(
    "/api/user/checkResetPasswordToken/:token",
    checkResetPasswordTokenController
  );
  app.put("/api/user/changePassword", changePasswordController);
  // router.post("/api/user/swapEmail/", swapEmailController);
  app.get("/api/user/confirmEmailSwap/:hash", confirmEmailSwapController);
};
