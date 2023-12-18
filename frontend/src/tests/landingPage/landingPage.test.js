const puppeteer = require("puppeteer");

describe("Landing Page", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto("http://localhost:3000");
    jest.setTimeout(15000);
  });

  it("should render landing page with 'the happy blog' heading", async () => {
    await page.waitForSelector("h1", { timeout: 10000 });
    const heading = await page.$("h1");
    expect(heading).toBeTruthy();
    const headingText = await page.evaluate((el) => el.textContent, heading);
    expect(headingText).toContain("the happy blog");
  });

  afterAll(async () => {
    await browser.close();
  });
});
