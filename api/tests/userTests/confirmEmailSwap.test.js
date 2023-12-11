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
//     sinon.restore();
//   });

//   it("should confirm email swap successfully", async () => {
//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };

//     const token = await createToken(userDataJwt, "7d");

//     findOneStub.resolves({ _id: userDataJwt.userId, email: userDataJwt.email });

//     const swapEmailData = {
//       userId: userDataJwt.userId,
//     };

//     findByIdAndDeleteStub.resolves(swapEmailData);

//     const response = await chai
//       .request(app)
//       .get(`/api/user/confirmEmailSwap/${token}`)
//       .send();

//     expect(response).to.have.status(200);
//   });

//   it("should return an error if no user found", async () => {
//     const token = await createToken({ userId: "nonexistentUserId" }, "7d");

//     findOneStub.resolves(null);

//     const response = await chai
//       .request(app)
//       .get(`/api/user/confirmEmailSwap/${token}`)
//       .send();

//     expect(response).to.have.status(500);
//   });
// });
