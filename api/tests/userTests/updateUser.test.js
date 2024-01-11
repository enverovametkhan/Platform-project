const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");
const { expect } = chai;
const { app } = require("../../app");
const { UserModel } = require("../../users/users.data");
const { createToken } = require("../../utilities/jwt");

chai.use(chaiHttp);

describe("UPDATE USER", () => {
  let findByIdStub, findByIdAndUpdateStub;

  beforeEach(() => {
    findByIdStub = sinon.stub(UserModel, "findById");
    findByIdAndUpdateStub = sinon.stub(UserModel, "findByIdAndUpdate");
  });

  afterEach(() => {
    findByIdStub.restore();
    findByIdAndUpdateStub.restore();
  });

  it(`should update user successfully with username`, async () => {
    const userDataJwt = {
      userId: "655c92eebe63597606646e1f",
      email: "1@11",
      username: "user12sd22f11",
    };
    const user = {
      _id: userDataJwt.userId,
      username: userDataJwt.username,
      email: userDataJwt.email,
    };
    const token = await createToken(userDataJwt, "7d");

    const updatedUserData = {
      username: "newUsername",
    };

    findByIdStub.resolves(user);

    const response = await chai
      .request(app)
      .put("/api/user/update")
      .set("Authorization", `Bearer ${token}`)
      .send(updatedUserData);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
  });

  it(`should update user successfully with email`, async () => {
    const userDataJwt = {
      userId: "655c92eebe63597606646e1f",
      email: "1@11",
      username: "user12sd22f11",
    };
    const user = {
      _id: userDataJwt.userId,
      username: userDataJwt.username,
      email: userDataJwt.email,
    };
    const token = await createToken(userDataJwt, "7d");

    const updatedUserData = {
      email: "123321@mail1.com",
    };

    findByIdStub.resolves(user);

    const response = await chai
      .request(app)
      .put("/api/user/update")
      .set("Authorization", `Bearer ${token}`)
      .send(updatedUserData);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
  });

  it(`should return an error if user is not found`, async () => {
    const userDataJwt = {
      userId: "655c92eebe63597606646e1f",
      email: "1@11",
      username: "user12sd22f11",
    };
    const token = await createToken(userDataJwt, "7d");

    findByIdStub.resolves(null);

    const response = await chai
      .request(app)
      .put("/api/user/update")
      .set("Authorization", `Bearer ${token}`);

    expect(response).to.have.status(500);
  });

  it("should return an error if access token is expired", async () => {
    const userDataJwt = {
      userId: "655c92eebe63597606646e1f",
      email: "1@11",
      username: "user12sd22f11",
    };
    const accessJwtToken = await createToken(userDataJwt, "-1s");

    const response = await chai
      .request(app)
      .put("/api/user/update")
      .set("Authorization", `Bearer ${accessJwtToken}`);

    expect(response).to.have.status(500);
  });

  it("should return an error if refresh token is expired", async () => {
    const userDataJwt = {
      userId: "655c92eebe63597606646e1f",
      email: "1@11",
      username: "user12sd22f11",
    };
    const refreshJwtToken = await createToken(userDataJwt, "-1s");

    const response = await chai
      .request(app)
      .put("/api/user/update")
      .set("Authorization", `Bearer ${refreshJwtToken}`);

    expect(response).to.have.status(500);
  });

  it("should return an error if both tokens are expired", async () => {
    const userDataJwt = {
      userId: "655c92eebe63597606646e1f",
      email: "1@11",
      username: "user12sd22f11",
    };
    const accessJwtToken = await createToken(userDataJwt, "-1s");
    const refreshJwtToken = await createToken(userDataJwt, "-1s");

    const response = await chai
      .request(app)
      .put("/api/user/update")
      .set("Authorization", `Bearer ${accessJwtToken}`)
      .set("Refresh-Token", refreshJwtToken);

    expect(response).to.have.status(500);
  });
});
