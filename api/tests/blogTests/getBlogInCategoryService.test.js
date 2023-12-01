// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const sinon = require("sinon");
// const { expect } = chai;
// const { BlogModel } = require("../../blogs/blogs.data");
// const { app } = require("../../app");

// chai.use(chaiHttp);

// describe("GET BLOGS IN CATEGORY", () => {
//   let findStub;

//   before(() => {
//     findStub = sinon.stub(BlogModel, "find");
//   });

//   after(() => {
//     findStub.restore();
//   });

//   it("should successfully retrieve top 10 blogs in a category", async () => {
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
//     };

//     findStub.withArgs(blogData.category).resolves(blogData);
//     const res = await chai
//       .request(app)
//       .get(`/api/blog/category/${blogData.category}`);
//     console.log(res);
//     expect(res).to.have.status(200);

//     if (res.body.thisBlog) {
//       expect(res.body.thisBlog).to.have.property(
//         "category",
//         blogData._id.toString()
//       );
//     }
//   });

//   it("should handle the case when no blogs are found in the category", async () => {
//     const nonExistingCategory = "Nature";

//     findStub.withArgs(nonExistingCategory).resolves(null);

//     const res = await chai
//       .request(app)
//       .get(`/api/blog/category/${nonExistingCategory}`);

//     expect(res).to.have.status(500);
//     expect(res.body)
//       .to.have.property("message")
//       .to.equal(`Internal Server Error`);
//   });
// });
