// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const sinon = require("sinon");
// const { expect } = chai;
// const { BlogModel } = require("../../blogs/blogs.data");
// const { app } = require("../../app");
// const { createToken } = require("../../utilities/jwt");

// chai.use(chaiHttp);

// describe("GET USER BLOGS IN CATEGORY", () => {
//   let findStub;

//   before(() => {
//     findStub = sinon.stub(BlogModel, "find");
//   });

//   after(() => {
//     findStub.restore();
//   });

//   it(`should successfully retrieve user blogs in a category`, async () => {
//     const userId = "655c92eebe63597606646e1f";
//     const category = "Nature";
//     const userData = {
//       userId,
//       email: "1@11",
//       username: "user12sd22f11",
//     };

//     const token = await createToken(userData, "7d");

//     const blogData = {
//       _id: "6562e22d365a633b118c3b3d",
//       title: "User Blog Title",
//       content: "User Blog Content",
//       image: "User Image URL",
//       category: "Nature",
//       userId,
//       views: 0,
//       likes: 0,
//       visible: true,
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//       __v: 0,
//     };

//     findStub.withArgs({ category, userId }).resolves([blogData]);

//     const res = await chai
//       .request(app)
//       .get(`/api/blog/user/${userId}/category/${category}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(res).to.have.status(200);

//     expect(res.body.processedResponse).to.deep.include(blogData);
//   });

//   it(`should return an error if required fields are missing`, async () => {
//     const userId = "655c92eebe63597606646e1f";
//     const category = null;

//     const res = await chai
//       .request(app)
//       .get(`/api/blog/user/${userId}/category/${category}`);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include("Unauthorized");
//   });

//   it(`should return an error if the access token is expired`, async () => {
//     const userId = "655c92eebe63597606646e1f";
//     const category = "Nature";
//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const expiredToken = await createToken(userDataJwt, "-1s");

//     const res = await chai
//       .request(app)
//       .get(`/api/blog/user/${userId}/category/${category}`)
//       .set("Authorization", `Bearer ${expiredToken}`);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include("Unauthorized");
//   });

//   it(`should return an error if the refresh token is expired`, async () => {
//     const userId = "655c92eebe63597606646e1f";
//     const category = "Nature";
//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const expiredToken = await createToken(userDataJwt, "-1s");

//     const res = await chai
//       .request(app)
//       .get(`/api/blog/user/${userId}/category/${category}`)
//       .set("Authorization", `Bearer ${expiredToken}`);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include("Unauthorized");
//   });

//   it(`should return an error if both tokens are expired`, async () => {
//     const userId = "655c92eebe63597606646e1f";
//     const category = "Nature";
//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const expiredToken = await createToken(userDataJwt, "-1s");

//     const res = await chai
//       .request(app)
//       .get(`/api/blog/user/${userId}/category/${category}`)
//       .set("Authorization", `Bearer ${expiredToken}`);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include("Unauthorized");
//   });

//   it(`should return an error if an unauthorized user attempts to access user blogs`, async () => {
//     const authorizedUserId = "655c92eebe63597606646e1f";
//     const unauthorizedUserId = "differentUserId";
//     const authorizedUserData = {
//       userId: authorizedUserId,
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const unauthorizedUserData = {
//       userId: unauthorizedUserId,
//       email: "another@user.com",
//       username: "anotherUser",
//     };
//     const token = await createToken(authorizedUserData, "7d");

//     const res = await chai
//       .request(app)
//       .get(`/api/blog/user/${unauthorizedUserId}/category/Nature`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include(
//       "Something went wrong when trying to get User Blogs in category"
//     );
//   });
// });
