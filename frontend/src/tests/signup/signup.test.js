const puppeteer = require("puppeteer");

describe("Signup Page", () => {
  let page;
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/auth/signup");
  });

  it("should render signup form", async () => {
    const form = await page.$("form");
    expect(form).toBeTruthy();
    await page.waitForTimeout(1000);
  });

  it("should have username, email, password, and confirmedPassword input fields", async () => {
    const usernameInput = await page.$('input[name="username"]');
    const emailInput = await page.$('input[name="email"]');
    const passwordInput = await page.$('input[name="password"]');
    const confirmedPasswordInput = await page.$(
      'input[name="confirmedPassword"]'
    );

    expect(usernameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(confirmedPasswordInput).toBeTruthy();
    await page.waitForTimeout(1000);
  });

  //   it("should display error message for short email", async () => {
  //     await page.type('input[name="email"]', "short");
  //     await page.click('button[type="submit"]');
  //     await page.waitForTimeout(1000);
  //   });

  //   it("should display error message for short password", async () => {
  //     await page.type('input[name="password"]', "short");
  //     await page.click('button[type="submit"]');
  //     await page.waitForTimeout(1000);
  //   });

  //   it("should display error message for password and confirmedPassword mismatch", async () => {
  //     await page.type('input[name="confirmedPassword"]', "mismatched");
  //     await page.click('button[type="submit"]');
  //     await page.waitForTimeout(1000);
  //   });

  it("should sign up successfully with valid credentials and show 'Thanks for signing up' notification", async () => {
    await page.type('input[name="username"]', "testuser");
    await page.type('input[name="email"]', "testuser@mail.com");
    await page.type('input[name="password"]', "password");
    await page.type('input[name="confirmedPassword"]', "password");
    await page.click('button[type="submit"]');

    await page.waitForSelector(".notification");
    await page.waitForTimeout(5000);
  });

  afterAll(async () => {
    await browser.close();
  });
});
