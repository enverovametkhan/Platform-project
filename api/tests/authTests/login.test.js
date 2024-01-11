const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");
const { expect } = chai;
const { app } = require("../../app");
const { createToken } = require("../../utilities/jwt");
const { UserModel } = require("../../users/users.data");
const bcrypt = require("bcrypt");

chai.use(chaiHttp);

describe("LOGIN", () => {
  let findOneStub, compareStub, saveStub;

  before(() => {
    findOneStub = sinon.stub(UserModel, "findOne");
    compareStub = sinon.stub(bcrypt, "compare");
    saveStub = sinon.stub(UserModel.prototype, "save");
  });

  after(() => {
    findOneStub.restore();
    compareStub.restore();
    saveStub.restore();
  });

  it(`should log in successfully and return tokens`, async () => {
    const email = "123@11";
    const password = "123";
    const userData = {
      userId: "65642e237dbd947479a14ed8",
      email: "123@11",
      username: "u1se3r12sd22f11",
    };

    findOneStub.resolves(userData);
    compareStub.resolves(true);
    saveStub.resolves();

    const response = await chai
      .request(app)
      .post("/api/auth/login")
      .send({ email, password });

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
    expect(response.body)
      .to.have.property("processedResponse")
      .to.have.property("email")
      .to.equal(userData.email);
  });

  it(`should return an error if email is not provided`, async () => {
    const response = await chai
      .request(app)
      .post("/api/auth/login")
      .send({ password: "123" });

    expect(response).to.have.status(500);
  });

  it(`should return an error if password is not provided`, async () => {
    const response = await chai
      .request(app)
      .post("/api/auth/login")
      .send({ email: "123@11" });

    expect(response).to.have.status(500);
  });

  it(`should return an error if user is not found`, async () => {
    findOneStub.withArgs({ email: "nonexistent@user.com" }).resolves(null);

    const response = await chai
      .request(app)
      .post("/api/auth/login")
      .send({ email: "nonexistent@user.com", password: "password" });

    expect(response).to.have.status(500);
  });

  it(`should return an error if password is incorrect`, async () => {
    const email = "123@11";
    const password = "incorrectPassword";
    const userData = {
      _id: "65642e237dbd947479a14ed8",
      email: "123@11",
      username: "u1se3r12sd22f11",
      password: await bcrypt.hash("correctPassword", 10),
    };

    findOneStub.withArgs({ email }).resolves(userData);
    compareStub.withArgs(password, userData.password).resolves(false);

    const response = await chai
      .request(app)
      .post("/api/auth/login")
      .send({ email, password });

    expect(response).to.have.status(500);
  });
});
