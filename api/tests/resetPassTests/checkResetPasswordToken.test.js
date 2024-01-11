const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");
const { expect } = chai;
const { app } = require("../../app");
const { ResetPasswordHashModel } = require("../../resetPass/resetPass.data");
const { createToken, decryptToken } = require("../../utilities/jwt");

chai.use(chaiHttp);

describe("checkResetPasswordToken", () => {
  let findResetPasswordHashStub;

  before(() => {
    findResetPasswordHashStub = sinon.stub(ResetPasswordHashModel, "findOne");
  });

  after(() => {
    sinon.restore();
  });

  it("should validate reset password token successfully", async () => {
    const userDataJwt = {
      userId: "655c92eebe63597606646e1f",
      email: "1@11",
      username: "user12sd22f11",
    };

    const token = await createToken(userDataJwt, "7d");
    findResetPasswordHashStub.resolves({ userId: "userId" });

    const response = await chai
      .request(app)
      .get(`/api/user/checkResetPasswordToken/${token}`)
      .send();

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
  });

  it("should handle the case when reset password token is invalid", async () => {
    const token = await createToken({ userId: "userId" }, "5d");
    findResetPasswordHashStub.resolves(null);

    const response = await chai
      .request(app)
      .get(`/api/user/checkResetPasswordToken/${token}`)
      .send();

    expect(response).to.have.status(500);
  });
});
