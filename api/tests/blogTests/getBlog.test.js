// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const sinon = require("sinon");
// const { expect } = chai;
// const { BlogModel } = require("../../blogs/blogs.data");
// const { app } = require("../../app");
// const yellowColor = "\x1b[33m";

// chai.use(chaiHttp);

// describe("GET BLOG", () => {
//   let findByIdStub;

//   before(() => {
//     findByIdStub = sinon.stub(BlogModel, "findById");
//   });

//   after(() => {
//     findByIdStub.restore();
//   });

//   it(`${yellowColor}should successfully retrieve a blog when it exists`, async () => {
//     const blogId = "6562e22d365a633b118c3b3d";
//     const blogData = {
//       _id: blogId,
//       title: "Updated Title",
//       content: "Updated Content",
//       image: "Image URL",
//       category: "Nature",
//       userId: "655c92eebe63597606646e1f",
//       views: 0,
//       likes: 0,
//       visible: true,
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//       __v: 0,
//       comments: "[]",
//     };

//     findByIdStub.withArgs(blogData._id).resolves(blogData);
//     const res = await chai.request(app).get(`/api/blog/${blogData._id}`);

//     expect(res).to.have.status(200);

//     expect(res.body.processedResponse).to.have.property(
//       "_id",
//       blogData._id.toString()
//     );
//     expect(res.body.processedResponse).to.have.property("comments");
//   });

//   it(`${yellowColor}should handle the case when no blog is found`, async () => {
//     const nonExistingBlogId = "6562e22d365a633b118c3b3d";

//     findByIdStub.withArgs(nonExistingBlogId).resolves(null);

//     const res = await chai.request(app).get(`/api/blog/${nonExistingBlogId}`);

//     expect(res).to.have.status(500);
//     expect(res.body)
//       .to.have.property("message")
//       .to.equal(
//         `Something went wrong while processing getBlog controller with ID ${nonExistingBlogId}`
//       );
//   });
// });
