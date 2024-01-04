// const chai = require("chai");
// const sinon = require("sinon");
// const chaiHttp = require("chai-http");
// const { expect } = chai;
// const { app } = require("../../app");
// const { UserModel } = require("../../users/users.data");
// const { createToken } = require("../../utilities/jwt");

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

//   it("should refresh access token successfully", async () => {
//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const token = await createToken(userDataJwt, "7d");

//     findByIdStub.resolves(userDataJwt);

//     const response = await chai
//       .request(app)
//       .get(`/api/user/refreshAccessToken/${token}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(response).to.have.status(200);
//     expect(response.body).to.be.an("object");
//   });

//   it("should return an error if user is not found", async () => {
//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const token = await createToken(userDataJwt, "7d");

//     findByIdStub.resolves(null);

//     const response = await chai
//       .request(app)
//       .get(`/api/user/refreshAccessToken/${token}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(response).to.have.status(500);
//   });

//   it("should return an error if access token is expired", async () => {
//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const token = await createToken(userDataJwt, "7d");
//     const accessJwtToken = await createToken(userDataJwt, "-1s");

//     const response = await chai
//       .request(app)
//       .get(`/api/user/refreshAccessToken/${token}`)
//       .set("Authorization", `Bearer ${accessJwtToken}`);

//     expect(response).to.have.status(500);
//   });

//   it("should return an error if refresh token is expired", async () => {
//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const token = await createToken(userDataJwt, "7d");
//     const refreshJwtToken = await createToken(userDataJwt, "-1s");

//     const response = await chai
//       .request(app)
//       .get(`/api/user/refreshAccessToken/${token}`)
//       .set("Authorization", `Bearer ${refreshJwtToken}`);

//     expect(response).to.have.status(500);
//   });

//   it("should return an error if both tokens are expired", async () => {
//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const token = await createToken(userDataJwt, "7d");
//     const accessJwtToken = await createToken(userDataJwt, "-1s");
//     const refreshJwtToken = await createToken(userDataJwt, "-1s");

//     const response = await chai
//       .request(app)
//       .get(`/api/user/refreshAccessToken/${token}`)
//       .set("Authorization", `Bearer ${accessJwtToken}`)
//       .set("Refresh-Token", `Bearer ${refreshJwtToken}`);

//     expect(response).to.have.status(500);
//   });
// });
