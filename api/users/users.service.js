const bcrypt = require("bcrypt");
const { deleteUsersBlogs } = require("@root/blogs/blogs.services");
const { miniDatabase } = require("@root/database/miniDatabase");
const { createToken, decryptToken } = require("@root/utilities/jwt");
const { getAccessToUserData } = require("@root/utilities/getUserData");
const mongoose = require("mongoose");
const { UserModel, SwapEmailHashModel } = require("./users.data");
const { customLogger } = require("../pack/mezmo");
const { GoogleTemplate } = require("../pack/sendEmail");
const { googleEmailer } = require("../pack/sendEmail");

const saltRounds = 10;

// async function hashPassword(password) {
//   return await bcrypt.hash(password, saltRounds);
// }

async function getUser() {
  const userData = await getAccessToUserData();
  console.log(userData);
  const user = await UserModel.findOne({ _id: userData.userId });

  if (!user) {
    customLogger.consoleError("User has not been found", {
      function: "getUser",
    });
    throw new Error("User has not been found");
  }

  customLogger.consoleInfo("User data retrieved successfully", {
    userData,
    userId: user._id,
    username: user.username,
    email: user.email,
  });

  return {
    id: user._id,
    username: user.username,
    email: user.email,
  };
}

async function deleteUser() {
  const userData = await getAccessToUserData();
  const user = await UserModel.findById(userData.userId);

  if (!user) {
    customLogger.consoleError("User not found", {
      function: "deleteUser",
    });
    throw new Error("User not found");
  }

  // const { deletedBlogs, deletedComments } = await deleteUsersBlogs(user.id);

  user.password = "";
  user.refreshToken = "";
  user.accessToken = "";
  user.deletedAt = Date.now();

  await UserModel.findByIdAndUpdate(user._id, {
    new: true,
    runValidators: true,
  });

  customLogger.consoleInfo("User deleted successfully", {
    userData,

    // deletedBlogs,
    // deletedComments,
  });

  // console.log(`Deleted ${deletedBlogs} blogs and ${deletedComments} comments`);

  return {
    message: "User deleted successfully",
  };
}

async function updateUser(updatedUserData) {
  const userData = await getAccessToUserData();
  const user = await UserModel.findById(userData.userId);

  if (!user) {
    customLogger.consoleError("User not found", {
      function: "updateUser",
    });
    throw new Error("User not found");
  }

  let response;

  if (!updatedUserData.username && !updatedUserData.email) {
    customLogger.consoleError("Either username or email should be provided", {
      function: "updateUser",
    });
    throw new Error("Either username or email should be provided");
  }

  if (updatedUserData.email && updatedUserData.email !== user.email) {
    await swapEmail(updatedUserData.email);

    response = {
      email: "Check your email",
    };
  }

  if (updatedUserData.username) {
    user.username = updatedUserData.username;
  }

  user.updatedAt = Date.now();

  await UserModel.findByIdAndUpdate(user._id, user, {
    new: true,
    runValidators: true,
  });
  const token = await createToken({ userId: userData.userId }, "7d");
  customLogger.consoleInfo("User updated successfully", {
    updatedUserData,
    emailVerificationLink: `https://123myblog.work/confirmEmailSwap/${token}`,
  });

  return {
    username: "Updated username",
    userData: user,
    ...response,
  };
}

async function swapEmail(newEmail) {
  const userData = await getAccessToUserData();
  const user = await UserModel.findById(userData.userId);

  if (!user) {
    customLogger.consoleError("User not found for email swap", {
      function: "swapEmail",
    });
    throw new Error("User not found for email swap");
  }

  const existEmailSwap = await SwapEmailHashModel.findOne({ userId: user._id });

  if (existEmailSwap) {
    await SwapEmailHashModel.findByIdAndDelete(existEmailSwap._id);
  }

  const token = await createToken({ userId: user.id }, "5d");

  const swapEmailData = new SwapEmailHashModel({
    userId: user._id,
    newEmail: newEmail,
    token: token,
    expiresAt: Date.now(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  await swapEmailData.save();

  const payload = {
    swapEmailData: {
      oldEmail: user.email,
      newEmail,
    },
    url: `https://123myblog.work/swapemail/${token}`,
  };

  await googleEmailer.sendEmail(user.email, GoogleTemplate.EMAIL_SWAP, payload);

  customLogger.consoleInfo("Email swap initiated successfully", {
    userId: user._id,
    newEmail,
  });

  return {
    status: 200,
    message: "Please check your email for the link",
  };
}

async function confirmEmailSwap(token) {
  const userData = await decryptToken(token);
  const user = await UserModel.findById(userData.userId);

  if (!user) {
    customLogger.consoleError("No user found", {
      function: "confirmEmailSwap",
    });
    throw new Error("No user found");
  }

  const checkEmailSwap = await SwapEmailHashModel.findOne({ userId: user._id });

  if (!checkEmailSwap) {
    customLogger.consoleError(
      "Something went wrong when trying to swap emails",
      {
        function: "confirmEmailSwap",
      }
    );
    throw new Error("Something went wrong when trying to swap emails");
  }

  const message = `Swapped email from ${user.email} to ${checkEmailSwap.newEmail}`;
  customLogger.consoleInfo("Email swap confirmed successfully", {
    userId: user._id,
    newEmail: checkEmailSwap.newEmail,
  });
  console.log(message);
  const updateEmail = {
    email: checkEmailSwap.newEmail,
  };
  await UserModel.findByIdAndUpdate(user._id, updateEmail, {
    new: true,
    runValidators: true,
  });

  await SwapEmailHashModel.findByIdAndDelete(checkEmailSwap._id);

  return {
    status: 200,
    message,
  };
}

module.exports = {
  getUser,
  deleteUser,
  updateUser,
  swapEmail,
  confirmEmailSwap,
};
