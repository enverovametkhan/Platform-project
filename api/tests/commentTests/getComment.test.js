const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const { expect } = chai;
const { BlogCommentModel } = require("../../blogs/blogs.data");
const { app } = require("../../app");

chai.use(chaiHttp);

describe("GET COMMENT", () => {
  let findByIdStub;

  before(() => {
    findByIdStub = sinon.stub(BlogCommentModel, "findById");
  });

  after(() => {
    findByIdStub.restore();
  });

  it(`should successfully retrieve a comment when it exists`, async () => {
    const commentId = "658d80a2ae4830199e49747d";
    const commentData = {
      _id: commentId,
      blogId: "6577d5504e1f9dd56aa2628d",
      content: "Comment Content",
      userId: "6577d5504e1f9dd56aa2628e",
      likes: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    findByIdStub.withArgs(commentData._id).resolves(commentData);
    const res = await chai.request(app).get(`/api/comments/${commentData._id}`);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body.processedResponse)
      .to.have.property("_id")
      .that.equals(commentData._id.toString());
  });

  it(`should handle the case when no comment is found`, async () => {
    const nonExistingCommentId = "nonExistingCommentId";

    findByIdStub.resolves(null);

    const res = await chai
      .request(app)
      .get(`/api/comments/${nonExistingCommentId}`);

    expect(res).to.have.status(500);
  });
});
