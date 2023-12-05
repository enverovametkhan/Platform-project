// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const sinon = require("sinon");
// const { expect } = chai;
// const { BlogModel } = require("../../blogs/blogs.data");
// const { app } = require("../../app");
// const { createToken } = require("../../utilities/jwt");

// chai.use(chaiHttp);

// describe("DELETE BLOG", () => {
//   let findByIdStub, deleteOneStub;

//   before(() => {
//     findByIdStub = sinon.stub(BlogModel, "findById");
//     deleteOneStub = sinon.stub(BlogModel, "deleteOne");
//   });

//   after(() => {
//     findByIdStub.restore();
//     deleteOneStub.restore();
//   });

//   it(`should successfully delete a blog`, async () => {
//     const userId = "655c92eebe63597606646e1f";
//     const userData = {
//       userId,
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const token = await createToken(userData, "7d");

//     const deletedBlog = {
//       _id: "6562e22d365a633b118c3b3d",
//       title: "Blog Title",
//       content: "Blog Content",
//       userId,
//       views: 0,
//       likes: 0,
//       visible: true,
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//       __v: 0,
//     };

//     const id = deletedBlog._id;
//     findByIdStub.withArgs(id).resolves(deletedBlog);
//     deleteOneStub.withArgs({ _id: id }).resolves({ deletedCount: 1 });

//     const res = await chai
//       .request(app)
//       .delete(`/api/blog/${id}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(res).to.have.status(200);
//     expect(res.body.processedResponse.message).to.equal(
//       "Blog deleted successfully"
//     );
//     expect(res.body.processedResponse).to.have.property("userData");
//     expect(res.body.processedResponse).to.have.property("blog");
//     expect(res.body.processedResponse.blog).to.deep.equal(deletedBlog);
//   });

//   it(`should return an error if the blog is not found`, async () => {
//     const userId = "655c92eebe63597606646e1f";
//     const userData = {
//       userId,
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const token = await createToken(userData, "7d");

//     const id = "6562e22d365a633b118c3b3d";

//     findByIdStub.withArgs(id).resolves(null);

//     const res = await chai
//       .request(app)
//       .delete(`/api/blog/${id}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include(
//       "Something went wrong when deleting a Blog"
//     );
//   });

//   it(`should return an error if unauthorized deletion attempt`, async () => {
//     const userId = "655c92eebe63597606646e1f";
//     const userData = {
//       userId: "differentUserId",
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const token = await createToken(userData, "7d");

//     const deletedBlog = {
//       _id: "6562e22d365a633b118c3b3d",
//       title: "Blog Title",
//       content: "Blog Content",
//       userId,
//       views: 0,
//       likes: 0,
//       visible: true,
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//       __v: 0,
//     };
//     const id = deletedBlog._id;
//     findByIdStub.resolves(deletedBlog);

//     const res = await chai
//       .request(app)
//       .delete(`/api/blog/${id}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include(
//       "Something went wrong when deleting a Blog"
//     );
//   });

//   it(`should return an error if an error occurs during deletion`, async () => {
//     const userId = "655c92eebe63597606646e1f";
//     const userData = {
//       userId,
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const token = await createToken(userData, "7d");

//     const blogId = "6562e22d365a633b118c3b3d";
//     const deletedBlog = {
//       _id: blogId,
//       title: "Blog Title",
//       content: "Blog Content",
//       userId,
//       views: 0,
//       likes: 0,
//       visible: true,
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//       __v: 0,
//     };

//     findByIdStub.resolves(deletedBlog);
//     deleteOneStub
//       .withArgs({ _id: blogId })
//       .rejects(new Error("Something went wrong when deleting a Blog"));

//     const res = await chai
//       .request(app)
//       .delete(`/api/blog/${blogId}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include(
//       "Something went wrong when deleting a Blog"
//     );
//   });
//   it(`should return an error if access token is expired`, async () => {
//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const id = "6562e22d365a633b118c3b3d";

//     const expiredToken = await createToken(userDataJwt, "-1s");

//     const res = await chai
//       .request(app)
//       .delete(`/api/blog/${id}`)
//       .set("Authorization", `Bearer ${expiredToken}`);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include("Unauthorized");
//   });

//   it(`should return an error if refresh token is expired`, async () => {
//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const id = "6562e22d365a633b118c3b3d";

//     const expiredToken = await createToken(userDataJwt, "-1s");

//     const res = await chai
//       .request(app)
//       .delete(`/api/blog/${id}`)
//       .set("Authorization", `Bearer ${expiredToken}`);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include("Unauthorized");
//   });

//   it(`should return an error if both tokens are expired`, async () => {
//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const id = "6562e22d365a633b118c3b3d";

//     const expiredToken = await createToken(userDataJwt, "-1s");

//     const res = await chai
//       .request(app)
//       .delete(`/api/blog/${id}`)
//       .set("Authorization", `Bearer ${expiredToken}`);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include("Unauthorized");
//   });
//   it(`should return an error if another authorized user attempts to delete a blog not owned by them`, async () => {
//     const authorizedUserId = "655c92eebe63597606646e1f";
//     const anotherUserId = "differentUserId";

//     const authorizedUserData = {
//       userId: authorizedUserId,
//       email: "1@11",
//       username: "user12sd22f11",
//     };

//     const blogId = "6562e22d365a633b118c3b3d";
//     const blogOwnedByAnotherUser = {
//       _id: blogId,
//       title: "Blog Title",
//       content: "Blog Content",
//       userId: anotherUserId,
//       views: 0,
//       likes: 0,
//       visible: true,
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//       __v: 0,
//     };

//     findByIdStub.withArgs(blogId).resolves(blogOwnedByAnotherUser);

//     const authorizedUserToken = await createToken(authorizedUserData, "7d");

//     const res = await chai
//       .request(app)
//       .delete(`/api/blog/${blogId}`)
//       .set("Authorization", `Bearer ${authorizedUserToken}`);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include(
//       "Something went wrong when deleting a Blog"
//     );
//   });
// });
