// const chai = require("chai");
// const sinon = require("sinon");
// const chaiHttp = require("chai-http");
// const { expect } = chai;
// const { app } = require("../../app");
// const { UserModel } = require("../../users/users.data");
// const { createToken, decryptToken } = require("../../utilities/jwt");

// chai.use(chaiHttp);

// describe("REFRESH ACCESS TOKEN", () => {
//   let findByIdStub, saveStub;

//   beforeEach(() => {
//     findByIdStub = sinon.stub(UserModel, "findById");
//     saveStub = sinon.stub(UserModel.prototype, "save");
//   });

//   afterEach(() => {
//     findByIdStub.restore();
//     saveStub.restore();
//   });

//   it(`should refresh access token successfully`, async () => {
//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const user = {
//       _id: userDataJwt.userId,
//       username: userDataJwt.username,
//       email: userDataJwt.email,
//     };
//     const userId = "655c92eebe63597606646e1f";
//     const userData = {
//       userId,
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     findByIdStub.resolves(user);
//     const token = await createToken(userData, "7d");
//     const accessJwtToken = await createToken(userDataJwt, "300h");

//     const response = await chai
//       .request(app)
//       .set("Authorization", `Bearer ${accessJwtToken}`)
//       .get(`/api/user/refreshAccessToken/${token}`);

//     expect(response).to.have.status(200);
//   });

//   it(`should return an error if user is not found during token refresh`, async () => {
//     const token = await createToken({ userId: "nonexistentUserId" }, "1h");

//     findByIdStub.withArgs("nonexistentUserId").resolves(null);

//     const response = await chai
//       .request(app)
//       .get(`/api/user/refreshAccessToken/${token}`);

//     expect(response).to.have.status(500);
//   });

//   it(`should return an error if token is invalid during token refresh`, async () => {
//     const token = "invalidToken";

//     const response = await chai
//       .request(app)
//       .get(`/api/user/refreshAccessToken/${token}`);

//     expect(response).to.have.status(500);
//   });
// });
