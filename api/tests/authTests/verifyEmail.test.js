// const chai = require("chai");
// const sinon = require("sinon");
// const chaiHttp = require("chai-http");
// const { expect } = chai;
// const { app } = require("../../app");
// const { UserModel } = require("../../users/users.data");
// const { createToken, decryptToken } = require("../../utilities/jwt");

// chai.use(chaiHttp);

// describe("VERIFY EMAIL", () => {
//   let findOneStub, saveStub;

//   before(() => {
//     findOneStub = sinon.stub(UserModel, "findOne");
//     saveStub = sinon.stub(UserModel.prototype, "save");
//   });

//   after(() => {
//     findOneStub.restore();
//     saveStub.restore();
//   });

//   it(`should verify email successfully`, async () => {
//     const email = "123@11";
//     const token = await createToken({ useremail: email }, "300d");
//     const userData = await decryptToken(token);

//     findOneStub.resolves({ email: userData.useremail });
//     saveStub.resolves();

//     const response = await chai
//       .request(app)
//       .get(`/api/user/verifyEmail/${token}`);

//     expect(response).to.have.status(200);
//   });

//   it(`should return an error if user is not found`, async () => {
//     const email = "nonexistent@user.com";
//     findOneStub.resolves(null);
//     const token = await createToken({ useremail: email }, "300d");
//     const response = await chai
//       .request(app)
//       .get(`/api/user/verifyEmail/${token}`);

//     expect(response).to.have.status(500);
//   });

//   it(`should return an error if token is invalid`, async () => {
//     const email = "123@11";
//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };

//     const token = await createToken(userDataJwt, "1h");

//     const response = await chai
//       .request(app)
//       .get(`/api/user/verifyEmail/${token}`);

//     expect(response).to.have.status(500);
//   });
// });
