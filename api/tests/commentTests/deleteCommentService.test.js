// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const sinon = require("sinon");
// const { expect } = chai;
// const { BlogCommentModel } = require("../../blogs/blogs.data");
// const { app } = require("../../app");
// const { createToken } = require("../../utilities/jwt");

// chai.use(chaiHttp);

// describe("DELETE COMMENT", () => {
//   let findByIdStub, deleteOneStub;

//   before(() => {
//     findByIdStub = sinon.stub(BlogCommentModel, "findById");
//     deleteOneStub = sinon.stub(BlogCommentModel, "deleteOne");
//   });

//   after(() => {
//     findByIdStub.restore();
//     deleteOneStub.restore();
//   });

//   it(`should successfully delete a comment`, async () => {
//     const userId = "6577d5504e1f9dd56aa2628d";
//     const userData = {
//       userId,
//       email: "adidas@mail.com",
//       username: "n1223e233",
//     };
//     const token = await createToken(userData, "7d");

//     const deletedComment = {
//       _id: "658d03ef94d4b2649d6b3dce",
//       content: "Comment Content",
//       userId,
//       blogId: "658d141431d1e1727f48d5ce",
//       likes: 0,
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//       __v: 0,
//     };

//     const commentId = deletedComment._id;

//     findByIdStub.withArgs(commentId).resolves(deletedComment);
//     deleteOneStub.withArgs({ _id: commentId }).resolves({ deletedCount: 1 });

//     const res = await chai
//       .request(app)
//       .delete(`/api/comments/${commentId}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(res).to.have.status(200);
//     expect(res.body.processedResponse.message).to.equal(
//       "Comment deleted successfully"
//     );
//     expect(res.body.processedResponse).to.have.property("userData");
//     expect(res.body.processedResponse).to.have.property("comment");
//     expect(res.body.processedResponse.comment).to.deep.equal(deletedComment);
//   });

//   it(`should return an error if the comment is not found`, async () => {
//     const userId = "655c92eebe63597606646e1f";
//     const userData = {
//       userId,
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const token = await createToken(userData, "7d");

//     const commentId = "6562e22d365a633b118c3b3d";

//     findByIdStub.withArgs(commentId).resolves(null);

//     const res = await chai
//       .request(app)
//       .delete(`/api/comments/${commentId}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include("Internal Server Error");
//   });

//   it(`should return an error if unauthorized deletion attempt`, async () => {
//     const userId = "655c92eebe63597606646e1f";
//     const userData = {
//       userId: "differentUserId",
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const token = await createToken(userData, "7d");

//     const deletedComment = {
//       _id: "6562e22d365a633b118c3b3d",
//       content: "Comment Content",
//       userId,
//       blogId: "658d141431d1e1727f48d5ce",
//       likes: 0,
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//       __v: 0,
//     };
//     const commentId = deletedComment._id;

//     findByIdStub.withArgs(commentId).resolves(deletedComment);

//     const res = await chai
//       .request(app)
//       .delete(`/api/comments/${commentId}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include("Internal Server Error");
//   });

//   it(`should return an error if an error occurs during deletion`, async () => {
//     const userId = "655c92eebe63597606646e1f";
//     const userData = {
//       userId,
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const token = await createToken(userData, "7d");

//     const commentId = "6562e22d365a633b118c3b3d";
//     const deletedComment = {
//       _id: commentId,
//       content: "Comment Content",
//       userId,
//       blogId: "658d141431d1e1727f48d5ce",
//       likes: 0,
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//       __v: 0,
//     };

//     findByIdStub.resolves(deletedComment);
//     deleteOneStub
//       .withArgs({ _id: commentId })
//       .rejects(new Error("Internal Server Error"));

//     const res = await chai
//       .request(app)
//       .delete(`/api/comments/${commentId}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include("Internal Server Error");
//   });
// });
