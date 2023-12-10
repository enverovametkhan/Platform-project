// const chai = require("chai");
// const sinon = require("sinon");
// const chaiHttp = require("chai-http");
// const { expect } = chai;
// const { app } = require("../../app");
// const { UserModel, SwapEmailHashModel } = require("../../users/users.data");
// const { ResetPasswordHashModel } = require("../../resetPass/resetPass.data");
// const { createToken, decryptToken } = require("../../utilities/jwt");

// chai.use(chaiHttp);

// describe("resetPasswordReq", () => {
//   let findOneStub, findExistingHashStub, findByIdAndDeleteStub, saveHashStub;

//   before(() => {
//     findOneStub = sinon.stub(UserModel, "findOne");
//     findExistingHashStub = sinon.stub(ResetPasswordHashModel, "findOne");
//     findByIdAndDeleteStub = sinon.stub(
//       ResetPasswordHashModel,
//       "findByIdAndDelete"
//     );
//     saveHashStub = sinon.stub(ResetPasswordHashModel.prototype, "save");
//   });

//   after(() => {
//     sinon.restore();
//   });

//   it("should send a reset password link successfully", async () => {
//     const userDataJwt = {
//       email: "1@11",
//     };

//     const email = userDataJwt.email;

//     findOneStub.resolves({ email });
//     findExistingHashStub.resolves(null);

//     findByIdAndDeleteStub.resolves();
//     saveHashStub.resolves();

//     const response = await chai
//       .request(app)
//       .get(`/api/user/resetPasswordReq/${email}`)
//       .send();

//     expect(response).to.have.status(200);
//   });

//   it("should handle the case when user is not found", async () => {
//     const email = "nonexistent@example.com";

//     findOneStub.resolves(null);

//     const response = await chai
//       .request(app)
//       .get(`/api/user/resetPasswordReq/${email}`)
//       .send();

//     expect(response).to.have.status(500);
//   });
// });
