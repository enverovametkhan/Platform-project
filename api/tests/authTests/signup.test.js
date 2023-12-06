const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");
const { expect } = chai;
const { app } = require("../../app");
const { UserModel } = require("../../users/users.data");

chai.use(chaiHttp);

describe("SIGNUP", () => {
  let findOneStub, saveStub;

  before(() => {
    findOneStub = sinon.stub(UserModel, "findOne");

    saveStub = sinon.stub(UserModel.prototype, "save");
  });

  after(() => {
    findOneStub.restore();

    saveStub.restore();
  });

  it(`should sign up successfully and return user data`, async () => {
    const email = "test@example.com";
    const username = "user123";
    const password = "password";
    const confirmedPassword = "password";

    findOneStub.resolves(null);

    saveStub.resolves();

    const response = await chai
      .request(app)
      .post("/api/auth/signup")
      .send({ email, username, password, confirmedPassword });

    expect(response).to.have.status(200);
  });

  it(`should return an error if email already exists`, async () => {
    const email = "test@example.com";
    const username = "user123";
    const password = "password";
    const confirmedPassword = "password";

    findOneStub.resolves({ email });

    const response = await chai
      .request(app)
      .post("/api/auth/signup")
      .send({ email, username, password, confirmedPassword });

    expect(response).to.have.status(500);
  });

  it(`should return an error if passwords do not match`, async () => {
    const email = "test@example.com";
    const username = "user123";
    const password = "password";
    const confirmedPassword = "different_password";

    findOneStub.resolves(null);

    const response = await chai
      .request(app)
      .post("/api/auth/signup")
      .send({ email, username, password, confirmedPassword });

    expect(response).to.have.status(500);
  });
});
