const base = require('@playwright/test');
const { LoginPage }    = require('../pages/LoginPage');
const { ProductPage }  = require('../pages/ProductPage');
const { CartPage }     = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

// Extend standard Playwright Test to inject custom fixtures
const test = base.test.extend({
  // Test-scoped fixture providing LoginPage instance
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Test-scoped fixture providing ProductPage instance
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },

  // Test-scoped fixture providing CartPage instance
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  // Test-scoped fixture providing CheckoutPage instance
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

// Preserve a visual checkpoint for every test in the Allure report.
test.afterEach(async ({ page }, testInfo) => {
  if (page.isClosed()) return;

  try {
    await testInfo.attach('Final page screenshot', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  } catch (error) {
    console.warn(`Could not capture the final screenshot: ${error.message}`);
  }
});

module.exports = {
  test,
  expect: base.expect
};
