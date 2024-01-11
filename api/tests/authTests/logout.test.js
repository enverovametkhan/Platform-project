const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");
const { expect } = chai;
const { app } = require("../../app");
const { UserModel } = require("../../users/users.data");
const { createToken } = require("../../utilities/jwt");

chai.use(chaiHttp);

describe("LOGOUT", () => {
  let findByIdStub, saveStub;

  before(() => {
    findByIdStub = sinon.stub(UserModel, "findById");
    saveStub = sinon.stub(UserModel.prototype, "save");
  });

  after(() => {
    findByIdStub.restore();
    saveStub.restore();
  });

  it("should log out successfully", async () => {
    const userId = "655c92eebe63597606646e1f";

    findByIdStub.resolves({
      _id: userId,
      accessToken: "accessJwtToken",
      refreshToken: "refreshJwtToken",
    });
    const userDataJwt = {
      userId: "655c92eebe63597606646e1f",
      email: "1@11",
      username: "user12sd22f11",
    };
    const token = await createToken(userDataJwt, "7d");

    const response = await chai
      .request(app)
      .get("/api/user/logout")
      .set("Authorization", `Bearer ${token}`);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
    expect(response.body)
      .to.have.property("processedResponse")
      .to.have.property("message");
  });

  it("should return an error if user is not found during logout", async () => {
    const userId = "655c92eebe63597606646e1f";

    findByIdStub.resolves(null);

    const userDataJwt = {
      userId,
      email: "1@11",
      username: "user12sd22f11",
    };
    const token = await createToken(userDataJwt, "7d");

    const response = await chai
      .request(app)
      .get("/api/user/logout")
      .set("Authorization", `Bearer ${token}`);

    expect(response).to.have.status(500);
  });

  it("should return an error if access token is expired", async () => {
    const userId = "655c92eebe63597606646e1f";
    const userDataJwt = {
      userId: "655c92eebe63597606646e1f",
      email: "1@11",
      username: "user12sd22f11",
    };

    const accessJwtToken = await createToken(userDataJwt, "-1s");

    findByIdStub.resolves({
      _id: userId,
      accessToken: accessJwtToken,
      refreshToken: "refreshJwtToken",
    });

    const response = await chai
      .request(app)
      .get("/api/user/logout")
      .set("Authorization", `Bearer ${accessJwtToken}`);

    expect(response).to.have.status(500);
  });

  it("should return an error if refresh token is expired", async () => {
    const userId = "655c92eebe63597606646e1f";
    const userDataJwt = {
      userId: "655c92eebe63597606646e1f",
      email: "1@11",
      username: "user12sd22f11",
    };
    const refreshJwtToken = await createToken(userDataJwt, "-1s");

    findByIdStub.resolves({
      _id: userId,
      accessToken: "accessJwtToken",
      refreshToken: refreshJwtToken,
    });

    const response = await chai
      .request(app)
      .get("/api/user/logout")
      .set("Authorization", `Bearer ${refreshJwtToken}`);

    expect(response).to.have.status(500);
  });

  it("should return an error if both tokens are expired", async () => {
    const userId = "655c92eebe63597606646e1f";
    const userDataJwt = {
      userId: "655c92eebe63597606646e1f",
      email: "1@11",
      username: "user12sd22f11",
    };
    const accessJwtToken = await createToken(userDataJwt, "-1s");
    const refreshJwtToken = await createToken(userDataJwt, "-1s");

    findByIdStub.resolves({
      _id: userId,
      accessToken: accessJwtToken,
      refreshToken: refreshJwtToken,
    });

    const response = await chai
      .request(app)
      .get("/api/user/logout")
      .set("Authorization", `Bearer ${accessJwtToken}`)
      .set("Refresh-Token", refreshJwtToken);

    expect(response).to.have.status(500);
  });
});
