// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const sinon = require("sinon");
// const { expect } = chai;
// const { BlogModel } = require("../../blogs/blogs.data");
// const { app } = require("../../app");
// const { createToken } = require("../../utilities/jwt");
// const yellowColor = "\x1b[33m";

// chai.use(chaiHttp);

// describe("GET USER BLOGS IN CATEGORY", () => {
//   let findStub;

//   before(() => {
//     findStub = sinon.stub(BlogModel, "find");
//   });

//   after(() => {
//     findStub.restore();
//   });

//   it(`${yellowColor}should successfully retrieve user blogs in a category`, async () => {
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

//   it(`${yellowColor}should return an error if required fields are missing`, async () => {
//     const userId = "655c92eebe63597606646e1f";
//     const category = null;

//     const res = await chai
//       .request(app)
//       .get(`/api/blog/user/${userId}/category/${category}`);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include("Unauthorized");
//   });

//   it(`${yellowColor}should return an error if the token has expired`, async () => {
//     const userId = "655c92eebe63597606646e1f";
//     const category = "Nature";
//     const expiredToken = await createToken({ userId }, "-1s");

//     const res = await chai
//       .request(app)
//       .get(`/api/blog/user/${userId}/category/${category}`)
//       .set("Authorization", `Bearer ${expiredToken}`);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include("Unauthorized");
//   });
// });
