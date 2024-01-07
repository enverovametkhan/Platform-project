// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const sinon = require("sinon");
// const { expect } = chai;
// const { BlogCommentModel } = require("../../blogs/blogs.data");
// const { app } = require("../../app");
// const { createToken } = require("../../utilities/jwt");

// chai.use(chaiHttp);

// describe("CREATE COMMENT", () => {
//   let saveStub;

//   before(() => {
//     saveStub = sinon.stub(BlogCommentModel.prototype, "save");
//   });

//   after(() => {
//     saveStub.restore();
//   });

//   it("should create a comment successfully", async () => {
//     const userId = "6577d5504e1f9dd56aa2628d";
//     const userDataJwt = {
//       userId: "6577d5504e1f9dd56aa2628d",
//       email: "adidas@mail.com",
//       username: "Adidas",
//     };

//     const token = await createToken(userDataJwt, "7d");

//     const newCommentData = {
//       content: "New Comment Content",
//       userId: "6577d5504e1f9dd56aa2628d",
//       blogId: "658d80a2ae4830199e49747d",
//     };

//     saveStub.resolves({ _id: "newCommentId", ...newCommentData, likes: 0 });

//     const response = await chai
//       .request(app)
//       .post("/api/comments")
//       .set("Authorization", `Bearer ${token}`)
//       .send(newCommentData);

//     expect(response).to.have.status(200);
//     expect(response.body).to.be.an("object");
//     expect(userId).to.equal(newCommentData.userId);
//   });

//   it("should handle the case when content is missing", async () => {
//     const userDataJwt = {
//       userId: "6577d5504e1f9dd56aa2628d",
//       email: "adidas@mail.com",
//       username: "Adidas",
//     };

//     const token = await createToken(userDataJwt, "7d");
//     const newCommentData = {
//       userId: "6577d5504e1f9dd56aa2628d",
//       blogId: "658d80a2ae4830199e49747d",
//     };

//     const response = await chai
//       .request(app)
//       .post("/api/comments")
//       .set("Authorization", `Bearer ${token}`)
//       .send(newCommentData);

//     expect(response).to.have.status(500);
//     expect(response.body.message).to.include("Internal Server Error");
//   });
// });
