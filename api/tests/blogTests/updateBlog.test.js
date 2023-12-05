const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");
const { expect } = chai;
const { app } = require("../../app");
const { createToken } = require("../../utilities/jwt");
const { BlogModel } = require("../../blogs/blogs.data");

chai.use(chaiHttp);

describe("UPDATE BLOG", () => {
  let findByIdStub, findByIdAndUpdateStub;

  before(() => {
    findByIdStub = sinon.stub(BlogModel, "findById");
    findByIdAndUpdateStub = sinon.stub(BlogModel, "findByIdAndUpdate");
  });

  after(() => {
    findByIdStub.restore();
    findByIdAndUpdateStub.restore();
  });

  it(`should update a blog successfully`, async () => {
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
      image: "Updated Image URL",
      visible: true,
      categories: ["Updated Category"],
    };

    const blogToUpdate = {
      _id: id,
      title: "Original Title",
      content: "Original Content",
      image: "Original Image URL",
      visible: true,
      categories: ["Original Category"],
    };

    findByIdStub.withArgs(id).resolves(blogToUpdate);
    findByIdAndUpdateStub
      .withArgs(id, updatedBlogData, {
        new: true,
        runValidators: true,
      })
      .resolves({
        _id: id,
        ...updatedBlogData,
      });

    const res = await chai
      .request(app)
      .put(`/api/blog/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedBlogData);

    expect(res).to.have.status(200);
    expect(res.body.processedResponse.message).to.equal(
      "Blog post updated successfully"
    );
    expect(res.body.processedResponse).to.have.property("updatedBlogData");
    expect(res.body.processedResponse.updatedBlogData).to.deep.equal({
      _id: id,
      ...updatedBlogData,
    });
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

    const res = await chai
      .request(app)
      .put(`/api/blog/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedBlogData);

    expect(res).to.have.status(500);
    expect(res.body.message).to.include(
      `Something went wrong when updating a Blog`
    );
  });
  it(`should return an error if access token is expired`, async () => {
    const userDataJwt = {
      userId: "655c92eebe63597606646e1f",
      email: "1@11",
      username: "user12sd22f11",
    };
    const id = "6562e22d365a633b118c3b3d";

    const expiredToken = await createToken(userDataJwt, "-1s");

    const res = await chai
      .request(app)
      .put(`/api/blog/${id}`)
      .set("Authorization", `Bearer ${expiredToken}`)
      .send({
        title: "Updated Title",
        content: "Updated Content",
      });

    expect(res).to.have.status(500);
    expect(res.body.message).to.include("Unauthorized");
  });

  it(`should return an error if refresh token is expired`, async () => {
    const userDataJwt = {
      userId: "655c92eebe63597606646e1f",
      email: "1@11",
      username: "user12sd22f11",
    };
    const id = "6562e22d365a633b118c3b3d";

    const expiredToken = await createToken(userDataJwt, "-1s");

    const res = await chai
      .request(app)
      .put(`/api/blog/${id}`)
      .set("Authorization", `Bearer ${expiredToken}`)
      .send({
        title: "Updated Title",
        content: "Updated Content",
      });

    expect(res).to.have.status(500);
    expect(res.body.message).to.include("Unauthorized");
  });

  it(`should return an error if both tokens are expired`, async () => {
    const userDataJwt = {
      userId: "655c92eebe63597606646e1f",
      email: "1@11",
      username: "user12sd22f11",
    };
    const id = "6562e22d365a633b118c3b3d";

    const expiredToken = await createToken(userDataJwt, "-1s");

    const res = await chai
      .request(app)
      .put(`/api/blog/${id}`)
      .set("Authorization", `Bearer ${expiredToken}`)
      .send({
        title: "Updated Title",
        content: "Updated Content",
      });

    expect(res).to.have.status(500);
    expect(res.body.message).to.include("Unauthorized");
  });

  it(`should return an error if another authorized user attempts to update a blog not owned by them`, async () => {
    const authorizedUserId = "655c92eebe63597606646e1f";
    const unauthorizedUserId = "differentUserId";

    const authorizedUserData = {
      userId: authorizedUserId,
      email: "1@11",
      username: "user12sd22f11",
    };

    const unauthorizedUserData = {
      userId: unauthorizedUserId,
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
      userId: unauthorizedUserId,
      views: 0,
      likes: 0,
      visible: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      __v: 0,
    });

    const authorizedUserToken = await createToken(authorizedUserData, "7d");

    const res = await chai
      .request(app)
      .put(`/api/blog/${id}`)
      .set("Authorization", `Bearer ${authorizedUserToken}`)
      .send(updatedBlogData);

    expect(res).to.have.status(500);
    expect(res.body.message).to.include(
      "Something went wrong when updating a Blog"
    );
  });
});
