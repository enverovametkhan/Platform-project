// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const sinon = require("sinon");
// const { expect } = chai;
// const { BlogModel } = require("../../blogs/blogs.data");
// const { app } = require("../../app");
// const { createToken } = require("../../utilities/jwt");

// chai.use(chaiHttp);

// describe("CREATE BLOG", () => {
//   let saveStub;

//   before(() => {
//     saveStub = sinon.stub(BlogModel.prototype, "save");
//   });

//   after(() => {
//     saveStub.restore();
//   });

//   it(`should create a new blog and return message`, async () => {
//     const newBlogData = {
//       title: "Blog Title",
//       content: "Blog Content",
//       category: "Nature",
//       visible: true,
//       image: "Image URL",
//     };

//     saveStub.resolves({
//       _id: "testBlogId",
//     });

//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };

//     const token = await createToken(userDataJwt, "7d");

//     const res = await chai
//       .request(app)
//       .post("/api/blog")
//       .set("Authorization", `Bearer ${token}`)
//       .send(newBlogData);

//     expect(res).to.have.status(200);
//     expect(res.body).to.deep.equal({
//       processedResponse: {
//         message: "Blog created successfully",
//         response: { _id: "testBlogId" },
//       },
//     });
//   });

//   it(`should return an error if required fields are missing`, async () => {
//     const newBlogData = {
//       title: "Blog Title",
//       content: "Blog Content",
//     };

//     saveStub.resolves({
//       _id: "testBlogId",
//     });

//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };
//     const token = await createToken(userDataJwt, "7d");

//     const res = await chai
//       .request(app)
//       .post("/api/blog")
//       .set("Authorization", `Bearer ${token}`)
//       .send(newBlogData);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include("Internal Server Error");
//   });

//   it(`should return an error if access token is expired`, async () => {
//     const newBlogData = {
//       title: "Blog Title",
//       content: "Blog Content",
//       category: "Nature",
//       visible: true,
//       image: "Image URL",
//     };

//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };

//     const accessJwtToken = await createToken(userDataJwt, "-1s");

//     const res = await chai
//       .request(app)
//       .post("/api/blog")
//       .set("Authorization", `Bearer ${accessJwtToken}`)
//       .send(newBlogData);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include("Internal Server Error");
//   });

//   it(`should return an error if refresh token is expired`, async () => {
//     const newBlogData = {
//       title: "Blog Title",
//       content: "Blog Content",
//       category: "Nature",
//       visible: true,
//       image: "Image URL",
//     };

//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };

//     const refreshJwtToken = await createToken(userDataJwt, "-1s");

//     const res = await chai
//       .request(app)
//       .post("/api/blog")
//       .set("Authorization", `Bearer ${refreshJwtToken}`)
//       .send(newBlogData);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include("Internal Server Error");
//   });

//   it(`should return an error if both tokens are expired`, async () => {
//     const newBlogData = {
//       title: "Blog Title",
//       content: "Blog Content",
//       category: "Nature",
//       visible: true,
//       image: "Image URL",
//     };

//     const userDataJwt = {
//       userId: "655c92eebe63597606646e1f",
//       email: "1@11",
//       username: "user12sd22f11",
//     };

//     const accessJwtToken = await createToken(userDataJwt, "-1s");
//     const refreshJwtToken = await createToken(userDataJwt, "-1s");

//     const res = await chai
//       .request(app)
//       .post("/api/blog")
//       .set("Authorization", `Bearer ${accessJwtToken}`)
//       .set("refreshtoken", `Bearer ${refreshJwtToken}`)
//       .send(newBlogData);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include("Internal Server Error");
//   });
//   it(`should return an error if no tokens are provided`, async () => {
//     const newBlogData = {
//       title: "Blog Title",
//       content: "Blog Content",
//       category: "Nature",
//       visible: true,
//       image: "Image URL",
//     };

//     const res = await chai.request(app).post("/api/blog").send(newBlogData);

//     expect(res).to.have.status(500);
//     expect(res.body.message).to.include("Internal Server Error");
//   });
// });
