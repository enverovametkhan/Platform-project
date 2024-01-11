const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const { expect } = chai;
const { BlogModel } = require("../../blogs/blogs.data");
const { app } = require("../../app");
const { createToken } = require("../../utilities/jwt");
const { redisClient } = require("../../database/caching");

chai.use(chaiHttp);

describe("GET USER BLOGS IN CATEGORY", () => {
  let findStub, redisGetStub, redisSetStub;

  before(() => {
    (resolve) => {
      redisClient.on("connect", resolve);
    };
    findStub = sinon.stub(BlogModel, "find");
    redisGetStub = sinon.stub(redisClient, "get");
    redisSetStub = sinon.stub(redisClient, "set");
  });

  after(() => {
    findStub.restore();
    redisGetStub.restore();
    redisSetStub.restore();
  });

  it(`should successfully retrieve user blogs in a category`, async () => {
    const userId = "655c92eebe63597606646e1f";
    const category = "IT";
    const userData = {
      userId,
      email: "1@11",
      username: "user12sd22f11",
    };

    const token = await createToken(userData, "7d");

    const blogData = {
      _id: "6562e22d365a633b118c3b3d",
      title: "User Blog Title",
      content: "User Blog Content",
      image: "User Image URL",
      category: "IT",
      userId,
      views: 0,
      likes: 0,
      visible: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      __v: 0,
    };
    redisGetStub.resolves(null);

    redisSetStub.resolves("OK");
    findStub.withArgs({ category, userId }).resolves([blogData]);

    const res = await chai
      .request(app)
      .get(`/api/blog/user/${userId}/category/${category}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("processedResponse").that.is.an("array");
  });

  it(`should return an error if access token is expired and no refresh token provided`, async () => {
    const userId = "655c92eebe63597606646e1f";
    const category = "Nature";
    const userDataJwt = {
      userId: "655c92eebe63597606646e1f",
      email: "1@11",
      username: "user12sd22f11",
    };
    const accessJwtToken = await createToken(userDataJwt, "-1s");

    const res = await chai
      .request(app)
      .get(`/api/blog/user/${userId}/category/${category}`)
      .set("Authorization", `Bearer ${accessJwtToken}`);

    expect(res).to.have.status(500);
  });

  it(`should return an error if the refresh token is expired`, async () => {
    const userId = "655c92eebe63597606646e1f";
    const category = "Nature";
    const userDataJwt = {
      userId: "655c92eebe63597606646e1f",
      email: "1@11",
      username: "user12sd22f11",
    };
    const refreshJwtToken = await createToken(userDataJwt, "-1s");

    const res = await chai
      .request(app)
      .get(`/api/blog/user/${userId}/category/${category}`)
      .set("Authorization", `Bearer ${refreshJwtToken}`);

    expect(res).to.have.status(500);
  });

  it(`should return an error if both tokens are expired`, async () => {
    const userId = "655c92eebe63597606646e1f";
    const category = "Nature";
    const userDataJwt = {
      userId: "655c92eebe63597606646e1f",
      email: "1@11",
      username: "user12sd22f11",
    };
    const accessJwtToken = await createToken(userDataJwt, "-1s");
    const refreshJwtToken = await createToken(userDataJwt, "-1s");

    const res = await chai
      .request(app)
      .get(`/api/blog/user/${userId}/category/${category}`)
      .set("Authorization", `Bearer ${accessJwtToken}`)
      .set("refreshtoken", `Bearer ${refreshJwtToken}`);

    expect(res).to.have.status(500);
  });

  it(`should return an error if an unauthorized user attempts to access user blogs`, async () => {
    const authorizedUserId = "655c92eebe63597606646e1f";
    const unauthorizedUserId = "differentUserId";
    const authorizedUserData = {
      userId: authorizedUserId,
      email: "1@11",
      username: "user12sd22f11",
    };

    const token = await createToken(authorizedUserData, "7d");

    const res = await chai
      .request(app)
      .get(`/api/blog/user/${unauthorizedUserId}/category/Nature`)
      .set("Authorization", `Bearer ${token}`);

    expect(res).to.have.status(500);
  });
  it(`should return an error if no tokens are provided`, async () => {
    const userId = "655c92eebe63597606646e1f";
    const category = "Nature";

    const res = await chai
      .request(app)
      .get(`/api/blog/user/${userId}/category/${category}`);

    expect(res).to.have.status(500);
  });
});
