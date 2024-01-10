// const chai = require("chai");
// const sinon = require("sinon");
// const chaiHttp = require("chai-http");
// const { expect } = chai;
// const { app } = require("../../app");
// const { UserModel, SwapEmailHashModel } = require("../../users/users.data");
// const { createToken, decryptToken } = require("../../utilities/jwt");

// chai.use(chaiHttp);

// describe("CONFIRM EMAIL SWAP", () => {
//   let findOneStubUser, findOneStubSwapHash;

//   beforeEach(() => {
//     findOneStubUser = sinon.stub(UserModel, "findOne");
//     findOneStubSwapHash = sinon.stub(SwapEmailHashModel, "findOne");
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   it("should confirm email swap successfully", async () => {
//     const userDataJwt = {
//       userId: "659cc3b08b2f7ede852dd521",
//       email: "1@mail.com",
//       username: "n1223e233",
//     };
//     const token = await createToken(userDataJwt, "7d");

//     findOneStubUser.resolves({
//       _id: userDataJwt.userId,
//       email: userDataJwt.email,
//     });

//     const swapEmailData = {
//       userId: userDataJwt.userId,
//       newEmail: "123@mail.ru",
//       token,
//     };

//     findOneStubSwapHash.resolves(swapEmailData);

//     const res = await chai
//       .request(app)
//       .get(`/api/user/confirmEmailSwap/${token}`)
//       .send();

//     expect(res.body).to.be.an("object");
//     expect(res.body).to.have.property("processedResponse").that.is.an("object");

//     expect(res.body.processedResponse)
//       .to.have.property("message")
//       .to.equal("Swapped email from 1@mail.com to 123@mail.ru");
//   });

//   it("should return an error if no user found", async () => {
//     const token = await createToken({ userId: "nonexistentUserId" }, "7d");

//     findOneStubUser.resolves(null);

//     const response = await chai
//       .request(app)
//       .get(`/api/user/confirmEmailSwap/${token}`)
//       .send();

//     expect(response).to.have.status(500);
//   });
// });
