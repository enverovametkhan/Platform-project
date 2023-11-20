const express = require("express");
const router = express.Router();
const { authMiddleware } = require("@root/middleware/auth.middleware");

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
  refreshAccessTokenController,
  // swapEmailController,
} = require("@root/auth/auth.controller");

const {
  getUserController,
  deleteUserController,
  updateUserController,
  confirmEmailSwapController,
} = require("@root/users/users.controller");

const {
  resetPasswordReqController,
  checkResetPasswordTokenController,
  resetPasswordController,
} = require("@root/resetPass/resetPass.controller");

module.exports = (app) => {
  // Blog Routes
  app.get("/api/blog/:id", getBlog);
  app.get("/api/blog/category/:category", getBlogsInCategory);
  app.get(
    "/api/blog/user/:userId/category/:category",
    authMiddleware,
    getUserBlogsInCategory
  );
  app.put("/api/blog/:id", authMiddleware, updateBlog);
  app.delete("/api/blog/:id", authMiddleware, deleteBlog);
  app.post("/api/blog", authMiddleware, createBlog);

  // User Routes
  app.post("/api/auth/login", loginController);
  app.post("/api/auth/signup", signupController);
  app.get("/api/user/verifyEmail/:token", verifyEmailController);
  app.get("/api/user/logout", authMiddleware, logoutController);
  app.get("/api/user", authMiddleware, getUserController);
  app.delete("/api/user/delete", authMiddleware, deleteUserController);
  app.put("/api/user/update", authMiddleware, updateUserController);
  app.get(
    "/api/user/refreshAccessToken/:token",
    authMiddleware,
    refreshAccessTokenController
  );
  app.get("/api/user/resetPasswordReq/:email", resetPasswordReqController);
  app.get(
    "/api/user/checkResetPasswordToken/:token",
    checkResetPasswordTokenController
  );
  app.put("/api/user/resetPassword/:token", resetPasswordController);
  // app.post("/api/user/swapEmail/", swapEmailController);
  app.get("/api/user/confirmEmailSwap/:token", confirmEmailSwapController);
};
