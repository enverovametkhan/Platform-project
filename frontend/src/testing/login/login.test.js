const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/");
})();

const puppeteer = require("puppeteer");

const APP_URL = "http://localhost:3000/auth/login";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(APP_URL);
  const form = await page.$("form");
  if (!form) {
    console.error("Test 1 failed: Login form not found");
  } else {
    console.log("Test 1 passed: Login form found");
  }

  await page.goto(APP_URL);
  await page.type('input[name="email"]', "adidas@mail.com");
  let emailValue = await page.$eval(
    'input[name="email"]',
    (input) => input.value
  );
  if (emailValue !== "adidas@mail.com") {
    console.error("Test 2 failed: Email input not updated");
  } else {
    console.log("Test 2 passed: Email input updated");
  }

  await page.type('input[name="password"]', "adidas");
  let passwordValue = await page.$eval(
    'input[name="password"]',
    (input) => input.value
  );
  if (passwordValue !== "adidas") {
    console.error("Test 2 failed: Password input not updated");
  } else {
    console.log("Test 2 passed: Password input updated");
  }
})();
