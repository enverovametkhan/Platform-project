// const chai = require("chai");
// const sinon = require("sinon");
// const chaiHttp = require("chai-http");
// const { expect } = chai;
// const { app } = require("../../app");
// const { createToken } = require("../../utilities/jwt");
// const { BlogModel } = require("../../blogs/blogs.data");

// chai.use(chaiHttp);

// describe("UPDATE BLOG", () => {
//   let findByIdStub, findByIdAndUpdateStub;

//   before(() => {
//     findByIdStub = sinon.stub(BlogModel, "findById");
//     findByIdAndUpdateStub = sinon.stub(BlogModel, "findByIdAndUpdate");
//   });

//   after(() => {
//     findByIdStub.restore();
//     findByIdAndUpdateStub.restore();
//   });

//   it("should update a blog successfully", async () => {
//     const userId = "6577d5504e1f9dd56aa2628d";
//     const userData = {
//       userId,
//       email: "adidas@mail.com",
//       username: "n1223e233",
//     };
//     const token = await createToken(userData, "7d");

//     const id = "658d80a2ae4830199e49747d";
//     const updatedBlogData = {
//       title: "Updated Title",
//       content: "Updated Content",
//       image: "Updated Image URL",
//       visible: true,
//       categories: ["Updated Category"],
//     };

//     const blogToUpdate = {
//       _id: id,
//       title: "Original Title",
//       content: "Original Content",
//       image: "Original Image URL",
//       visible: true,
//       categories: ["Original Category"],
//       userId: userId,
//     };

//     findByIdStub.withArgs(id).resolves(blogToUpdate);

//     findByIdAndUpdateStub
//       .withArgs(id, updatedBlogData, { new: true, runValidators: true })
//       .resolves({ _id: id, ...updatedBlogData, userId: userId });

//     const res = await chai
//       .request(app)
//       .put(`/api/blog/${id}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send(updatedBlogData);
//     expect(res).to.have.status(200);
//     expect(res.body).to.have.property("updatedBlogData").that.is.an("object");
//     expect(res.body.updatedBlogData).to.have.property("_id").that.equals(id);
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
//     const updatedBlogData = {
//       title: "Updated Title",
//       content: "Updated Content",
//     };

//     findByIdStub.withArgs(id).resolves(null);

//     const res = await chai
//       .request(app)
//       .put(`/api/blog/${id}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send(updatedBlogData);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include(`Internal Server Error`);
//   });
//   it(`should return an error if access token is expired`, async () => {
//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const id = "6562e22d365a633b118c3b3d";

//     const accessJwtToken = await createToken(userDataJwt, "-1s");

//     const res = await chai
//       .request(app)
//       .put(`/api/blog/${id}`)
//       .set("Authorization", `Bearer ${accessJwtToken}`)
//       .send({
//         title: "Updated Title",
//         content: "Updated Content",
//       });

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include("Internal Server Error");
//   });

//   it(`should return an error if refresh token is expired`, async () => {
//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const id = "6562e22d365a633b118c3b3d";

//     const refreshJwtToken = await createToken(userDataJwt, "-1s");

//     const res = await chai
//       .request(app)
//       .put(`/api/blog/${id}`)
//       .set("Authorization", `Bearer ${refreshJwtToken}`)
//       .send({
//         title: "Updated Title",
//         content: "Updated Content",
//       });

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include("Internal Server Error");
//   });

//   it(`should return an error if both tokens are expired`, async () => {
//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const id = "6562e22d365a633b118c3b3d";

//     const accessJwtToken = await createToken(userDataJwt, "-1s");
//     const refreshJwtToken = await createToken(userDataJwt, "-1s");

//     const res = await chai
//       .request(app)
//       .put(`/api/blog/${id}`)
//       .set("Authorization", `Bearer ${accessJwtToken}`)
//       .set("refreshtoken", `Bearer ${refreshJwtToken}`)
//       .send({
//         title: "Updated Title",
//         content: "Updated Content",
//       });

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include("Internal Server Error");
//   });

//   it(`should return an error if another authorized user attempts to update a blog not owned by them`, async () => {
//     const authorizedUserId = "655c92eebe63597606646e1f";
//     const unauthorizedUserId = "differentUserId";

//     const authorizedUserData = {
//       userId: authorizedUserId,
//       email: "1@11",
//       username: "user12sd22f11",
//     };

//     const userData = {
//       userId: unauthorizedUserId,
//       email: "another@user.com",
//       username: "anotherUser",
//     };

//     const id = "6562e22d365a633b118c3b3d";
//     const updatedBlogData = {
//       title: "Updated Title",
//       content: "Updated Content",
//     };

//     findByIdStub.withArgs(id).resolves({
//       _id: id,
//       title: "Original Title",
//       content: "Original Content",
//       userId: unauthorizedUserId,
//       views: 0,
//       likes: 0,
//       visible: true,
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//       __v: 0,
//     });

//     const token = await createToken(userData, "7d");

//     const res = await chai
//       .request(app)
//       .put(`/api/blog/${id}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send(updatedBlogData);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include("Internal Server Error");
//   });
// });
