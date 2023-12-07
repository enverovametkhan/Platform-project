// const chai = require("chai");
// const sinon = require("sinon");
// const chaiHttp = require("chai-http");
// const { expect } = chai;
// const { app } = require("../../app");
// const { UserModel } = require("../../users/users.data");
// const { createToken } = require("../../utilities/jwt");
// chai.use(chaiHttp);

// describe("LOGOUT", () => {
//   let findByIdStub, saveStub;

//   before(() => {
//     findByIdStub = sinon.stub(UserModel, "findById");
//     saveStub = sinon.stub(UserModel.prototype, "save");
//   });

//   after(() => {
//     findByIdStub.restore();
//     saveStub.restore();
//   });

//   it(`should log out successfully`, async () => {
//     const userId = "655c92eebe63597606646e1f";
//     const userData = {
//       userId,
//       email: "1@11",
//       username: "user12sd22f11",
//     };

//     findByIdStub.resolves({
//       _id: userId,
//       accessToken: "sampleAccessToken",
//       refreshToken: "sampleRefreshToken",
//     });
//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const token = await createToken(userDataJwt, "7d");

//     const response = await chai
//       .request(app)
//       .get("/api/user/logout")
//       .set("Authorization", `Bearer ${token}`);

//     expect(response).to.have.status(200);
//   });

//   it(`should return an error if user is not found during logout`, async () => {
//     const nonExistentUserId = "nonexistentUserId";

//     findByIdStub.withArgs(nonExistentUserId).resolves(null);

//     const userDataJwt = {
//       userId: nonExistentUserId,
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const token = await createToken(userDataJwt, "7d");

//     const response = await chai
//       .request(app)
//       .get("/api/user/logout")
//       .set("Authorization", `Bearer ${token}`);

//     expect(response).to.have.status(500);
//   });
// });
