const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");
const { expect } = chai;
const { app } = require("../../app");
const { createToken } = require("../../utilities/jwt");
const { BlogModel } = require("../../blogs/blogs.data");
const { redisClient } = require("../../database/caching");

chai.use(chaiHttp);

describe("UPDATE BLOG", () => {
  let findByIdStub, findByIdAndUpdateStub, redisDelStub, redisSetStub;

  before(() => {
    findByIdStub = sinon.stub(BlogModel, "findById");
    findByIdAndUpdateStub = sinon.stub(BlogModel, "findByIdAndUpdate");
    redisSetStub = sinon.stub(redisClient, "set");
    redisDelStub = sinon.stub(redisClient, "del");
  });

  after(() => {
    findByIdStub.restore();
    findByIdAndUpdateStub.restore();
    redisSetStub.restore();
    redisDelStub.restore();
  });

  it("should update a blog successfully", async () => {
    const userId = "655c92eebe63597606646e1f";
    const userData = {
      userId,
      email: "adidas@mail.com",
      username: "n1223e233",
    };
    const token = await createToken(userData, "7d");

    const id = "658d141431d1e1727f48d5ce";
    const updatedBlogData = {
      title: "11232333331",
      content: "0101010110",
      img: "updated-image.jpg",
      visibility: "private",
      category: "IT",
    };

    const blogToUpdate = {
      _id: id,
      userId: userId,
      title: "Original Title",
      content: "Original Content",
      image: "Image URL",
      views: 0,
      likes: 0,
      visible: true,
      category: "IT",
      __v: 0,
    };

    findByIdStub.resolves(blogToUpdate);
    redisSetStub.resolves(null);
    redisDelStub.resolves(null);

    findByIdAndUpdateStub.resolves({
      _id: id,
      ...updatedBlogData,
      userId: userId,
    });

    const res = await chai
      .request(app)
      .put(`/api/blog/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedBlogData);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("processedResponse").that.is.an("object");
    expect(res.body.processedResponse)
      .to.have.property("message")
      .that.includes("Blog post updated successfully");
    expect(res.body.processedResponse)
      .to.have.property("updatedBlogData")
      .that.is.an("object");
    expect(res.body.processedResponse.updatedBlogData)
      .to.have.property("_id")
      .that.equals(id);
  });
  it(`should return an error if the blog is not found`, async () => {
    const userId = "655c92eebe63597606646e1f";
    const userData = {
      userId,
      email: "1@11",
      username: "user12sd22f11",
    };
    const token = await createToken(userData, "7d");

    const id = "6562e22d365a633b118c3b3d";
    const updatedBlogData = {
      title: "Updated Title",
      content: "Updated Content",
    };

    findByIdStub.withArgs(id).resolves(null);
    redisSetStub.resolves(null);
    redisDelStub.resolves(null);

    const res = await chai
      .request(app)
      .put(`/api/blog/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedBlogData);

    expect(res).to.have.status(500);
    expect(res.body.message).to.include(`Internal Server Error`);
  });
  it(`should return an error if access token is expired`, async () => {
    const userDataJwt = {
      userId: "655c92eebe63597606646e1f",
      email: "1@11",
      username: "user12sd22f11",
    };
    const id = "6562e22d365a633b118c3b3d";

    const accessJwtToken = await createToken(userDataJwt, "-1s");

    const res = await chai
      .request(app)
      .put(`/api/blog/${id}`)
      .set("Authorization", `Bearer ${accessJwtToken}`)
      .send({
        title: "Updated Title",
        content: "Updated Content",
      });

    expect(res).to.have.status(500);
    expect(res.body.message).to.include("Internal Server Error");
  });
  it(`should return an error if another authorized user attempts to update a blog not owned by them`, async () => {
    const userId = "differentUserId";

    const userData = {
      userId: userId,
      email: "another@user.com",
      username: "anotherUser",
    };

    const id = "6562e22d365a633b118c3b3d";
    const updatedBlogData = {
      title: "Updated Title",
      content: "Updated Content",
    };

    findByIdStub.withArgs(id).resolves({
      _id: id,
      title: "Original Title",
      content: "Original Content",
      userId: userId,
      views: 0,
      likes: 0,
      visible: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      __v: 0,
    });
    redisSetStub.resolves(null);
    redisDelStub.resolves(null);

    const token = await createToken(userData, "7d");

    const res = await chai
      .request(app)
      .put(`/api/blog/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedBlogData);

    expect(res).to.have.status(500);
    expect(res.body.message).to.include("Internal Server Error");
  });
});
