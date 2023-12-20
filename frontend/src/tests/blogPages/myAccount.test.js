// const puppeteer = require("puppeteer");

// describe("MyAccount Component", () => {
//   let browser;
//   let page;

//   beforeAll(async () => {
//     browser = await puppeteer.launch({ headless: false });
//     page = await browser.newPage();
//     await page.goto("http://localhost:3000/auth/login");

//     await page.type('input[name="email"]', "adidas@mail.com");
//     await page.type('input[name="password"]', "adidas");
//     await page.click('button[type="submit"]');

//     await page.waitForNavigation();
//   });

//   it("renders My Account page with personal information form", async () => {
//     await page.goto("http://localhost:3000/dashboard/myaccount");

//     await page.waitForSelector("form");

//     await page.waitForSelector('input[name="email"]');
//     await page.waitForSelector('input[name="username"]');

//     await page.waitForFunction(
//       'document.querySelector(\'input[name="email"]\').value !== ""'
//     );
//     await page.waitForFunction(
//       'document.querySelector(\'input[name="username"]\').value !== ""'
//     );

//     const emailValue = await page.$eval(
//       'input[name="email"]',
//       (input) => input.value
//     );
//     const usernameValue = await page.$eval(
//       'input[name="username"]',
//       (input) => input.value
//     );

//     expect(emailValue).toBe("adidas@mail.com");
//     expect(usernameValue).toBe("Adidas");
//   });

//   afterAll(async () => {
//     await browser.close();
//   });
// });
