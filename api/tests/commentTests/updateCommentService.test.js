const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const { expect } = chai;
const { BlogCommentModel } = require("../../blogs/blogs.data");
const { app } = require("../../app");
const { createToken } = require("../../utilities/jwt");
chai.use(chaiHttp);

describe("UPDATE COMMENT", () => {
  let findByIdStub, findByIdAndUpdateStub;

  before(() => {
    findByIdStub = sinon.stub(BlogCommentModel, "findById");
    findByIdAndUpdateStub = sinon.stub(BlogCommentModel, "findByIdAndUpdate");
  });

  after(() => {
    findByIdStub.restore();
    findByIdAndUpdateStub.restore();
  });

  it("should update a comment successfully", async () => {
    const userDataJwt = {
      userId: "6577d5504e1f9dd56aa2628d",
      email: "adidas@mail.com",
      username: "Adidas",
    };

    const token = await createToken(userDataJwt, "7d");

    const commentId = "658eded6a77d6c6c31936ead";
    const updatedCommentData = {
      content: "third comment",
      userId: "6577d5504e1f9dd56aa2628d",
      blogId: "658d80a2ae4830199e49747d",
    };

    findByIdStub.resolves({
      _id: commentId,
      content: "Original Comment Content",
      userId: "6577d5504e1f9dd56aa2628d",
      blogId: "658d80a2ae4830199e49747d",
      likes: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      __v: 0,
    });

    findByIdAndUpdateStub.resolves({
      _id: commentId,
      ...updatedCommentData,
      likes: 0,
      updatedAt: Date.now(),
    });

    const response = await chai
      .request(app)
      .put(`/api/comments/${commentId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedCommentData);
    console.log("Response:", response.body);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
    expect(response.body.processedResponse.updatedCommentData)
      .to.have.property("_id")
      .that.equals(commentId);

    expect(response.body.processedResponse.updatedCommentData)
      .to.have.property("content")
      .that.equals(updatedCommentData.content);
  });
  it("should update a comment successfully", async () => {
    const userDataJwt = {
      userId: "6577d5504e1f9dd56aa2628d",
      email: "adidas@mail.com",
      username: "Adidas",
    };

    const token = await createToken(userDataJwt, "7d");

    const commentId = "658eded6a77d6c6c31936ead";
    const updatedCommentData = {
      content: "third comment",
      userId: "6577d5504e1f9dd56aa2628d",
      blogId: "658d80a2ae4830199e49747d",
    };

    findByIdStub.resolves(null);

    const response = await chai
      .request(app)
      .put(`/api/comments/${commentId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedCommentData);

    expect(response).to.have.status(500);
    expect(response.body).to.be.an("object");
  });
});
