// const chai = require("chai");
// const sinon = require("sinon");
// const chaiHttp = require("chai-http");
// const { expect } = chai;
// const { app } = require("../../app");
// const { UserModel } = require("../../users/users.data");
// const { ResetPasswordHashModel } = require("../../resetPass/resetPass.data");
// const {
//   hashPassword,
//   createToken,
//   decryptToken,
// } = require("../../utilities/jwt");

// chai.use(chaiHttp);

// describe("resetPassword", () => {
//   let findResetPasswordHashStub,
//     findByIdStub,
//     hashPasswordStub,
//     saveStub,
//     findByIdAndDeleteStub;

//   before(() => {
//     findResetPasswordHashStub = sinon.stub(ResetPasswordHashModel, "findOne");
//     findByIdStub = sinon.stub(UserModel, "findById");
//     hashPasswordStub = sinon.stub().resolves("hashedPassword");
//     saveStub = sinon.stub(UserModel.prototype, "save");
//     findByIdAndDeleteStub = sinon.stub(
//       ResetPasswordHashModel,
//       "findByIdAndDelete"
//     );
//   });

//   after(() => {
//     sinon.restore();
//   });

//   it("should reset password successfully", async () => {
//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };

//     const token = await createToken(userDataJwt, "7d");
//     const password = "newPassword";
//     const confirmedPassword = "newPassword";

//     const resetPasswordHash = {
//       userId: "userId",
//       _id: "resetPasswordHashId",
//     };

//     findResetPasswordHashStub.resolves(resetPasswordHash);
//     findByIdStub.resolves(userDataJwt.userId);

//     const response = await chai
//       .request(app)
//       .put(`/api/user/resetPassword/${token}`)
//       .send({
//         token,
//         password,
//         confirmedPassword,
//       });

//     expect(response).to.have.status(200);
//     expect(response.body).to.be.an("object");
//   });

//   it("should handle the case when passwords do not match", async () => {
//     const token = await createToken({ userId: "userId" }, "5d");
//     const password = "newPassword";
//     const confirmedPassword = "differentPassword";

//     const response = await chai
//       .request(app)
//       .put(`/api/user/resetPassword/${token}`)
//       .send({
//         token,
//         password,
//         confirmedPassword,
//       });

//     expect(response).to.have.status(500);
//   });

//   it("should handle the case when reset password token is invalid", async () => {
//     const token = await createToken({ userId: "userId" }, "5d");
//     const password = "newPassword";
//     const confirmedPassword = "newPassword";

//     findResetPasswordHashStub.resolves(null);

//     const response = await chai
//       .request(app)
//       .put(`/api/user/resetPassword/${token}`)
//       .send({
//         token,
//         password,
//         confirmedPassword,
//       });

//     expect(response).to.have.status(500);
//   });

//   it("should handle the case when user is not found", async () => {
//     const token = await createToken({ userId: "userId" }, "5d");
//     const password = "newPassword";
//     const confirmedPassword = "newPassword";

//     const resetPasswordHash = {
//       userId: "userId",
//       _id: "resetPasswordHashId",
//     };

//     findResetPasswordHashStub.resolves(resetPasswordHash);
//     findByIdStub.resolves(null);

//     const response = await chai
//       .request(app)
//       .put(`/api/user/resetPassword/${token}`)
//       .send({
//         token,
//         password,
//         confirmedPassword,
//       });

//     expect(response).to.have.status(500);
//   });
// });
