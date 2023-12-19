// const puppeteer = require("puppeteer");

// describe("Login Page", () => {
//   let page;
//   let browser;

//   beforeAll(async () => {
//     browser = await puppeteer.launch({ headless: false });
//     page = await browser.newPage();
//     await page.goto("http://localhost:3000/auth/login");
//   });

//   it("should render login form", async () => {
//     const form = await page.$("form");
//     expect(form).toBeTruthy();
//   });

//   it("should have email and password input fields", async () => {
//     const emailInput = await page.$('input[name="email"]');
//     const passwordInput = await page.$('input[name="password"]');
//     await page.waitForTimeout(1000);
//     expect(emailInput).toBeTruthy();
//     expect(passwordInput).toBeTruthy();
//   });

//   it("should display error message for short email", async () => {
//     await page.type('input[name="email"]', "short");
//     await page.click('button[type="submit"]');
//   });

//   it("should display error message for short password", async () => {
//     await page.type('input[name="password"]', "short");
//     await page.click('button[type="submit"]');
//   });
//   it("should log in successfully with valid credentials", async () => {
//     await page.type('input[name="email"]', "adidas@mail.com");
//     await page.type('input[name="password"]', "adidas");
//     await page.click('button[type="submit"]');

//     await page.waitForNavigation();

//     await page.goto("http://localhost:3000/dashboard");
//   });

//   it("should navigate to signup page when 'Sign up' link is clicked", async () => {
//     await page.goto("http://localhost:3000/auth/signup");
//     await page.waitForTimeout(1000);
//   });

//   it("should navigate to password reset page when 'Forgot Password' link is clicked", async () => {
//     await page.goto("http://localhost:3000/auth/resetpass");
//     await page.waitForTimeout(1000);
//   });
//   afterAll(async () => {
//     await browser.close();
//   });
// });
