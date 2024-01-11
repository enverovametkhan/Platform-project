const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const { expect } = chai;
const { BlogModel } = require("../../blogs/blogs.data");
const { app } = require("../../app");
const { redisClient } = require("../../database/caching");

chai.use(chaiHttp);

describe("GET BLOG", () => {
  let findByIdStub, findStub, redisGetStub, redisSetStub;

  before(() => {
    (resolve) => {
      redisClient.on("connect", resolve);
    };
    findByIdStub = sinon.stub(BlogModel, "findById");
    findStub = sinon.stub(BlogModel, "find");
    redisGetStub = sinon.stub(redisClient, "get");
    redisSetStub = sinon.stub(redisClient, "set");
  });

  after(() => {
    findByIdStub.restore();
    findStub.restore();
    redisGetStub.restore();
    redisSetStub.restore();
  });

  it(`should successfully retrieve a blog when it exists`, async () => {
    const blogId = "658d80a2ae4830199e49747d";
    const blogData = {
      _id: blogId,
      title: "Updated Title",
      content: "Updated Content",
      image: "Image URL",
      category: "Nature",
      userId: "6577d5504e1f9dd56aa2628d",
      views: 0,
      likes: 0,
      visible: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      __v: 0,
      comments: "[]",
    };
    redisGetStub.resolves(null);

    findByIdStub.withArgs(blogData._id).resolves(blogData);

    const res = await chai
      .request(app)
      .get(`/api/blog/${blogData._id}/user/${blogData.userId}`);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body.processedResponse)
      .to.have.property("_id")
      .that.equals(blogData._id.toString());
  });

  it(`should handle the case when no blog is found`, async () => {
    const nonExistingBlogId = "nonExistingBlogId";
    const userId = "6577d5504e1f9dd56aa2628d";

    redisGetStub.resolves(null);

    findStub.resolves(null);

    const res = await chai
      .request(app)
      .get(`/api/blog/${nonExistingBlogId}/user/${userId}`);

    expect(res).to.have.status(500);
  });
});
