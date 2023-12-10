// const chai = require("chai");
// const sinon = require("sinon");
// const chaiHttp = require("chai-http");
// const { expect } = chai;
// const { app } = require("../../app");
// const { UserModel, SwapEmailHashModel } = require("../../users/users.data");
// const { createToken, decryptToken } = require("../../utilities/jwt");

// chai.use(chaiHttp);

// describe("SWAP EMAIL", () => {
//   let findByIdStub, findOneStub, findByIdAndDeleteStub, saveStub;

//   beforeEach(() => {
//     findByIdStub = sinon.stub(UserModel, "findById");
//     findOneStub = sinon.stub(SwapEmailHashModel, "findOne");
//     findByIdAndDeleteStub = sinon.stub(SwapEmailHashModel, "findByIdAndDelete");
//     saveStub = sinon.stub(SwapEmailHashModel.prototype, "save");
//   });

//   afterEach(() => {
//     findByIdStub.restore();
//     findOneStub.restore();
//     findByIdAndDeleteStub.restore();
//     saveStub.restore();
//   });

//   it(`should initiate email swap successfully`, async () => {
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

//     findByIdStub.resolves(user);
//     findOneStub.resolves(null);

//     const newEmail = "newEmail@example.com";

//     const response = await chai
//       .request(app)
//       .post("/api/user/swapEmail")
//       .set("Authorization", `Bearer ${token}`)
//       .send({ newEmail });

//     expect(response).to.have.status(200);
//     expect(response.body).to.deep.equal({
//       status: 200,
//       message: "Please check your email for the link",
//     });

//     expect(findByIdStub).to.have.been.calledWith(user.id);
//     expect(findOneStub).to.have.been.calledWith({ userId: user._id });
//     expect(findByIdAndDeleteStub).not.to.have.been.called;
//     expect(saveStub).to.have.been.calledOnce;
//   });

//   it(`should delete existing email swap and initiate a new one`, async () => {
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

//     findByIdStub.resolves(user);
//     const existingEmailSwap = {
//       userId: user._id,
//       newEmail: "oldEmailSwap@example.com",
//       token: "existingToken",
//       expiresAt: Date.now() + 86400000,
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//     };
//     findOneStub.resolves(existingEmailSwap);

//     const newEmail = "newEmail@example.com";
//     const newSwapEmailToken = await createToken({ userId: user.id }, "5d");

//     const response = await chai
//       .request(app)
//       .post("/api/user/swapEmail")
//       .set("Authorization", `Bearer ${token}`)
//       .send({ newEmail });

//     expect(response).to.have.status(200);
//     expect(response.body).to.deep.equal({
//       status: 200,
//       message: "Please check your email for the link",
//     });

//     expect(findByIdStub).to.have.been.calledWith(user.id);
//     expect(findOneStub).to.have.been.calledWith({ userId: user._id });
//     expect(findByIdAndDeleteStub).to.have.been.calledWith(
//       existingEmailSwap._id
//     );
//     expect(saveStub).to.have.been.calledOnce;
//   });

//   it(`should return an error if user is not found`, async () => {
//     const token = await createToken({ userId: "nonexistentUserId" }, "7d");

//     findByIdStub.resolves(null);

//     const response = await chai
//       .request(app)
//       .post("/api/user/swapEmail")
//       .set("Authorization", `Bearer ${token}`)
//       .send({ newEmail: "newEmail@example.com" });

//     expect(response).to.have.status(500);
//     expect(response.body).to.deep.equal({
//       error: "User not found for email swap",
//       function: "swapEmail",
//     });

//     expect(findByIdStub).to.have.been.calledWith("nonexistentUserId");
//     expect(findOneStub).not.to.have.been.called;
//     expect(findByIdAndDeleteStub).not.to.have.been.called;
//     expect(saveStub).not.to.have.been.called;
//   });
// });
