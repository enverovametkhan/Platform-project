// const puppeteer = require("puppeteer");

// describe("Reset Password Page", () => {
//   let page;
//   let browser;

//   beforeAll(async () => {
//     browser = await puppeteer.launch({ headless: false });
//     page = await browser.newPage();
//     await page.goto("http://localhost:3000/auth/resetpass");
//   });

//   it("should render reset password form", async () => {
//     const form = await page.$("div > h1");
//     expect(form).toBeTruthy();
//   });

//   it("should have an email input field", async () => {
//     const emailInput = await page.$('input[type="email"]');
//     expect(emailInput).toBeTruthy();
//   });

//   it("should reset password successfully and show notification", async () => {
//     const email = "testuser@mail.com";

//     await page.type('input[type="email"]', email);

//     await page.click("button");

//     await page.waitForSelector(".notification", { timeout: 10000 });

//     const notificationText = await page.$eval(
//       ".notification",
//       (el) => el.textContent
//     );
//     expect(notificationText).toContain(
//       "A link has been sent to your email to reset your password."
//     );
//   });

//   afterAll(async () => {
//     await browser.close();
//   });
// });
