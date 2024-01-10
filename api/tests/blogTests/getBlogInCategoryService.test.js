// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const sinon = require("sinon");
// const { expect } = chai;
// const { BlogModel } = require("../../blogs/blogs.data");
// const { app } = require("../../app");
// const { redisClient } = require("../../database/caching");

// chai.use(chaiHttp);

// describe("GET BLOGS IN CATEGORY", () => {
//   let findStub, redisGetStub, redisSetStub;

//   before(async () => {
//     (resolve) => {
//       redisClient.on("connect", resolve);
//     };

//     findStub = sinon.stub(BlogModel, "find");
//     redisGetStub = sinon.stub(redisClient, "get");
//     redisSetStub = sinon.stub(redisClient, "set");
//   });

//   after(() => {
//     findStub.restore();
//     redisGetStub.restore();
//     redisSetStub.restore();
//   });

//   it("should successfully retrieve top 10 blogs in a category", async () => {
//     const category = "Nature";
//     const blogData = [
//       {
//         _id: "6562e22d365a633b118c3b3d",
//         title: "Updated Title",
//         content: "Updated Content",
//         image: "Image URL",
//         category: "Nature",
//         userId: "655c92eebe63597606646e1f",
//         views: 0,
//         likes: 0,
//         visible: true,
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         __v: 0,
//       },
//     ];

//     redisGetStub.resolves(null);

//     redisSetStub.resolves("OK");

//     findStub.resolves(blogData);
//     const res = await chai.request(app).get(`/api/blog/category/${category}`);
//     expect(res).to.have.status(200);
//     expect(res.body).to.be.an("object");
//     expect(res.body).to.have.property("processedResponse").that.is.an("array");
//   });

//   it(`should handle the case when no blogs are found in the category`, async () => {
//     const nonExistingCategory = "nonExistingCategory";

//     redisGetStub.resolves(null);

//     redisSetStub.resolves("OK");

//     findStub.resolves(null);

//     const res = await chai
//       .request(app)
//       .get(`/api/blog/category/${nonExistingCategory}`);

//     expect(res).to.have.status(500);
//   });
// });
