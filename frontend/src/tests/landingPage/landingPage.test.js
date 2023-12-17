const puppeteer = require("puppeteer");

describe("Landing Page", () => {
  let page;
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto("http://localhost:3000");
  });

  it("should render landing page", async () => {
    await page.waitForSelector(".landingPage");
    const landingPage = await page.$(".landingPage");
    expect(landingPage).toBeTruthy();
  });

  it("should have 'Nature', 'Technology', and 'Life' buttons", async () => {
    const natureButton = await page.$$eval("button", (buttons) =>
      buttons.find((button) => button.innerText === "Nature")
    );
    const technologyButton = await page.$$eval("button", (buttons) =>
      buttons.find((button) => button.innerText === "Technology")
    );
    const lifeButton = await page.$$eval("button", (buttons) =>
      buttons.find((button) => button.innerText === "Life")
    );

    expect(natureButton).toBeTruthy();
    expect(technologyButton).toBeTruthy();
    expect(lifeButton).toBeTruthy();
  });

  afterAll(async () => {
    await browser.close();
  });
});
