// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const sinon = require("sinon");
// const bcrypt = require("bcrypt");
// const { expect } = chai;
// const { UserModel } = require("../../users/users.data");
// const { app } = require("../../app");
// const { createToken } = require("../../utilities/jwt");

// chai.use(chaiHttp);

// describe("LOGIN", () => {
//   let findOneStub, compareStub, saveStub;

//   before(() => {
//     findOneStub = sinon.stub(UserModel, "findOne");
//     compareStub = sinon.stub(bcrypt, "compare");
//     saveStub = sinon.stub(UserModel.prototype, "save");
//   });

//   after(() => {
//     findOneStub.restore();
//     compareStub.restore();
//     saveStub.restore();
//   });

//   it(`should log in successfully and return tokens`, async () => {
//     const email = "test@example.com";
//     const password = "password123";
//     const userData = {
//       id: "655c92eebe63597606646e1f",
//       email,
//       username: "user12sd22f11",
//     };

//     const hashedPassword = await bcrypt.hash(password, 10);

//     findOneStub.withArgs({ email }).resolves(userData);
//     compareStub.withArgs(password, hashedPassword).resolves(true);
//     saveStub.resolves();

//     const response = await chai
//       .request(app)
//       .post("/api/login")
//       .send({ email, password });

//     expect(response).to.have.status(200);
//     expect(response.body.message).to.equal("Login successful");
//     expect(response.body.accessToken).to.be.a("string");
//     expect(response.body.refreshToken).to.be.a("string");
//     expect(response.body.userId).to.equal(userData.id);
//     expect(response.body.email).to.equal(userData.email);
//     expect(response.body.username).to.equal(userData.username);
//   });

//   //   it(`should return an error if email is missing`, async () => {
//   //     const response = await chai
//   //       .request(app)
//   //       .post("/api/login")
//   //       .send({ password: "password123" });

//   //     expect(response).to.have.status(500);
//   //     expect(response.body.error).to.equal("Email is required");
//   //   });

//   //   it(`should return an error if password is missing`, async () => {
//   //     const response = await chai
//   //       .request(app)
//   //       .post("/api/login")
//   //       .send({ email: "test@example.com" });

//   //     expect(response).to.have.status(500);
//   //     expect(response.body.error).to.equal("Password is required");
//   //   });

//   //   it(`should return an error if login credentials are incorrect`, async () => {
//   //     findOneStub.resolves(null);

//   //     const response = await chai
//   //       .request(app)
//   //       .post("/api/login")
//   //       .send({ email: "test@example.com", password: "wrongpassword" });

//   //     expect(response).to.have.status(500);
//   //     expect(response.body.error).to.equal("Incorrect login credentials");
//   //   });

//   //   it(`should return an error if password is incorrect`, async () => {
//   //     const email = "test@example.com";
//   //     const password = "password123";
//   //     const userData = {
//   //       id: "655c92eebe63597606646e1f",
//   //       email,
//   //       username: "user12sd22f11",
//   //     };

//   //     findOneStub.withArgs({ email }).resolves(userData);
//   //     compareStub.resolves(false);

//   //     const response = await chai
//   //       .request(app)
//   //       .post("/api/login")
//   //       .send({ email, password: "wrongpassword" });

//   //     expect(response).to.have.status(500);
//   //     expect(response.body.error).to.equal("Incorrect login credentials");
//   //   });
// });
