/**
 * E2E Scenario: Complete Purchase Flow
 *
 * Business Scenario:
 *   A registered user logs in, browses the Books category,
 *   adds a product to the cart, proceeds through checkout,
 *   and successfully places an order.
 *
 * Scenario Doc: docs/scenarios/complete-purchase-flow.md
 */

const { test } = require('../../fixtures/test-fixtures');
const testData = require('../../test-data/purchase-flow-data.json');

const email    = process.env.DEMO_USER_EMAIL;
const password = process.env.DEMO_USER_PASSWORD;

test.describe('Complete Purchase Flow', () => {

  // Guard: ensure credentials are configured before running
  test.beforeAll(() => {
    if (!email || !password) {
      throw new Error(
        'Missing environment variables: DEMO_USER_EMAIL and DEMO_USER_PASSWORD must be set in .env'
      );
    }
  });

  for (const data of testData) {
    test(data.scenarioName, async ({
      loginPage,
      productPage,
      cartPage,
      checkoutPage,
    }) => {
      const { product, billing } = data;

    await test.step('Step 1 & 2: Login as registered user', async () => {
      await loginPage.goto();
      await loginPage.login(email, password);
    });

    await test.step('Step 3, 4 & 5: Add product to cart', async () => {
      await productPage.addProductToCartIfNotPresent(product.categoryPath, product.name, cartPage);
      await cartPage.verifyProductVisible(product.name);
    });

    await test.step('Step 6: Accept Terms of Service and proceed to checkout', async () => {
      await cartPage.checkTermsOfService();
      await cartPage.proceedToCheckout();
    });

    await test.step('Step 7: Confirm billing address', async () => {
      await checkoutPage.fillBillingAddress(billing);
      await checkoutPage.continueBilling();
    });

    await test.step('Step 8: Confirm shipping address', async () => {
      await checkoutPage.continueShippingAddress();
    });

    await test.step('Step 9: Select shipping method', async () => {
      await checkoutPage.continueShipping();
    });

    await test.step('Step 10: Select payment method', async () => {
      await checkoutPage.continuePayment();
    });

    await test.step('Step 11: Review payment info', async () => {
      await checkoutPage.continuePaymentInfo();
    });

    await test.step('Step 12: Confirm the order', async () => {
      await checkoutPage.confirmOrder();
    });

    await test.step('Step 13: Verify order placed successfully', async () => {
      await checkoutPage.verifyOrderCompleted();
    });
  });
  }

});
