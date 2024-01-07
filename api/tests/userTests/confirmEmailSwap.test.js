// const chai = require("chai");
// const sinon = require("sinon");
// const chaiHttp = require("chai-http");
// const { expect } = chai;
// const { app } = require("../../app");
// const { UserModel, SwapEmailHashModel } = require("../../users/users.data");
// const { createToken, decryptToken } = require("../../utilities/jwt");

// chai.use(chaiHttp);

// describe("CONFIRM EMAIL SWAP", () => {
//   let findOneStub, findByIdAndDeleteStub;

//   beforeEach(() => {
//     findOneStub = sinon.stub(UserModel, "findOne");
//     findByIdAndDeleteStub = sinon.stub(SwapEmailHashModel, "findByIdAndDelete");
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   it("should confirm email swap successfully", async () => {
//     const userDataJwt = {
//       userId: "6577d5504e1f9dd56aa2628d",
//       email: "adidas@mail.com",
//       username: "Adidas",
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
//     expect(response.body).to.be.an("object");
//     expect(response.body)
//       .to.have.property("message")
//       .that.includes("Swapped email");
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
