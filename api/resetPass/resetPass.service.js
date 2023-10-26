const bcrypt = require("bcrypt");
const { miniDatabase } = require("@root/database/miniDatabase");
const { createToken, decryptToken } = require("@root/utilities/jwt");
let userModel = miniDatabase.Users;
let resetPasswordHashModel = miniDatabase.ResetPasswordHash;
const saltRounds = 10;

async function resetPasswordReq(email) {
  const userData = userModel.find((eachUser) => eachUser.email === email);

  const checkExistingResetPasswordHash = resetPasswordHashModel.find(
    (each) => each.userId === userData.userId
  );

  if (checkExistingResetPasswordHash) {
    const index = resetPasswordHashModel.findIndex(
      (each) => each.id === checkExistingResetPasswordHash.id
    );
    resetPasswordHashModel.splice(index, 1)[0];

    console.log("Password reset link already used, removing it.");
  }
  const token = await createToken({ userId: userData.userId }, "7d");
  const resetPasswordHash = {
    id: "",
    userId: userData.id,
    token: token,
    expiresAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  resetPasswordHashModel.push(resetPasswordHash);

  return {
    status: 200,
    message: "Check your email for the link",
  };
}

async function checkResetPasswordToken(token) {
  const userData = await decryptToken(token);
  const checkExistingResetPasswordHash = resetPasswordHashModel.find(
    (each) => each.userId === userData.userId
  );
  if (!checkExistingResetPasswordHash) {
    throw new Error("Invalid token");
  }

  return {
    status: 200,
  };
}

// async function changePassword(token, password, confirmedPassword) {
//   if (!resetPasswordHashModel) {
//     throw new Error("resetPasswordHashModel is undefined");
//   }

//   const userData = await decryptToken(token);

//   if (!userData) {
//     throw new Error("User data not found in the token");
//   }

//   const resetToken = resetPasswordHashModel.find(
//     (each) => each.token === token
//   );

//   if (!resetToken) {
//     throw new Error("Invalid token");
//   }

//   if (password !== confirmedPassword) {
//     throw new Error("Passwords do not match");
//   }

//   if (!userModel) {
//     throw new Error("userModel is undefined");
//   }

//   const user = userModel.find((eachUser) => eachUser.id === resetToken.userId);

//   if (!user) {
//     throw Error("User not found");
//   }

//   const newPassword = await bcrypt.hash(password, saltRounds);

//   user.password = newPassword;

//   const index = userModel.findIndex((eachUser) => eachUser.id === user.id);

//   if (index !== -1) {
//     userModel[index] = user;
//   }

//   return {
//     status: 200,
//     message: "Password changed successfully",
//   };
// }
async function resetPassword(token, password, confirmedPassword) {
  let userData = await decryptToken(token);
  let checkExistingResetPasswordHashIndex = resetPasswordHashModel.findIndex(
    (each) => each.userId === userData.userId
  );
  let checkExistingResetPasswordHash =
    resetPasswordHashModel[checkExistingResetPasswordHashIndex];

  if (!checkExistingResetPasswordHash) {
    throw new Error("Invalid token");
  }
  if (password !== confirmedPassword) {
    throw new Error("Password dont match");
  }
  let userIndex = userModel.findIndex(
    (eachUser) => eachUser.id === checkExistingResetPasswordHash.userId
  );
  let user = userModel[userIndex];
  let salt = await bcrypt.genSalt();
  let newPassword = await bcrypt.hash(password, salt);
  user.password = newPassword;

  resetPasswordHashModel.splice(checkExistingResetPasswordHashIndex, 1)[0];
  return {
    status: 200,
    message: "Have successfuly changed your password",
  };
}

module.exports = {
  resetPasswordReq,
  checkResetPasswordToken,
  resetPassword,
};
