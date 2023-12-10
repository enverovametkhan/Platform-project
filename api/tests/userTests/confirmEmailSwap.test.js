// const chai = require("chai");
// const sinon = require("sinon");
// const chaiHttp = require("chai-http");
// const { expect } = chai;
// const { app } = require("../../app");
// const { UserModel, SwapEmailHashModel } = require("../../users/users.data");
// const { createToken, decryptToken } = require("../../utilities/jwt");

// chai.use(chaiHttp);

// describe("CONFIRM EMAIL SWAP", () => {
//   let findOneStub, findByIdAndDeleteStub, findByIdAndUpdateStub;

//   beforeEach(() => {
//     findOneStub = sinon.stub(UserModel, "findOne");
//     findByIdAndDeleteStub = sinon.stub(SwapEmailHashModel, "findByIdAndDelete");
//     findByIdAndUpdateStub = sinon.stub(UserModel, "findByIdAndUpdate");
//   });

//   afterEach(() => {
//     findOneStub.restore();
//     findByIdAndDeleteStub.restore();
//     findByIdAndUpdateStub.restore();
//   });

//   it("should confirm email swap successfully", async () => {
//     const userId = "655c92eebe63597606646e1f";
//     const _id = userId;

//     const token = await createToken({ userId: _id }, "300d");
//     const userData = await decryptToken(token);

//     findOneStub.resolves({ _id: userId });

//     const swapEmailData = {
//       userId: userData.userId,
//       newEmail: "newEmail@example.com",
//       token: "swapToken",
//     };

//     findByIdAndDeleteStub.resolves(swapEmailData);

//     const response = await chai
//       .request(app)
//       .get(`/api/user/confirmEmailSwap/${token}`)
//       .send();

//     expect(response).to.have.status(200);
//   });

//   it("should return an error if no new user found", async () => {
//     const token = await createToken({ userId: "nonexistentUserId" }, "7d");

//     findOneStub.resolves(null);

//     const response = await chai
//       .request(app)
//       .get(`/api/user/confirmEmailSwap/${token}`)

//       .send();

//     expect(response).to.have.status(500);
//   });

//   it("should return an error if no email swap data found", async () => {
//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "oldEmail@example.com",
//       username: "user12sd22f11",
//     };
//     const user = {
//       _id: userDataJwt.userId,
//       username: userDataJwt.username,
//       email: userDataJwt.email,
//     };
//     const token = await createToken(userDataJwt, "7d");

//     findOneStub.resolves(user);
//     findByIdAndDeleteStub.resolves(null);

//     const response = await chai
//       .request(app)
//       .get(`/api/user/confirmEmailSwap/${token}`)

//       .send();

//     expect(response).to.have.status(500);
//   });
// });
