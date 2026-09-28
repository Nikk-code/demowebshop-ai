/**
 * E2E Scenario: Guest Checkout Flow
 *
 * Business Scenario:
 *   An unauthenticated (guest) user browses the Books category,
 *   adds a product to the cart, selects "Checkout as Guest" on the
 *   login/guest selection page, proceeds through checkout,
 *   and successfully places an order — without registering an account.
 *
 * Scenario Doc: docs/scenarios/guest-checkout-flow.md
 */

const { test } = require('../../fixtures/test-fixtures');
const testData = require('../../test-data/guest-checkout-data.json');

test.describe('Guest Checkout Flow', () => {
  // Run data rows serially — each row shares the same browser session
  test.describe.configure({ mode: 'serial' });

  // The public demo site's AJAX steps can take longer than the default 30s
  // on Firefox and WebKit due to network latency and rendering differences.
  test.setTimeout(60000);

  for (const data of testData) {
    test(data.scenarioName, async ({
      productPage,
      cartPage,
      checkoutPage,
    }) => {
      const { product, billing } = data;

      await test.step('Step 1 & 2: Add product to cart as guest', async () => {
        await productPage.gotoCategory(product.categoryPath);
        await productPage.addProductToCartFromListing(product.name);
        await productPage.closeNotificationBanner();
      });

      await test.step('Step 3: Verify product is in cart', async () => {
        await cartPage.goto();
        await cartPage.verifyProductVisible(product.name);
      });

      await test.step('Step 4: Accept Terms of Service and proceed to checkout', async () => {
        await cartPage.checkTermsOfService();
        await cartPage.proceedToCheckout();
      });

      await test.step('Step 5: Select "Checkout as Guest"', async () => {
        await checkoutPage.checkoutAsGuest();
      });

      await test.step('Step 6: Fill billing address and continue', async () => {
        await checkoutPage.fillBillingAddress(billing);
        await checkoutPage.continueBilling();
      });

      await test.step('Step 7: Confirm shipping address', async () => {
        await checkoutPage.continueShippingAddress();
      });

      await test.step('Step 8: Select shipping method', async () => {
        await checkoutPage.continueShipping();
      });

      await test.step('Step 9: Select payment method', async () => {
        await checkoutPage.continuePayment();
      });

      await test.step('Step 10: Review payment info', async () => {
        await checkoutPage.continuePaymentInfo();
      });

      await test.step('Step 11: Confirm the order', async () => {
        await checkoutPage.confirmOrder();
      });

      await test.step('Step 12: Verify order placed successfully', async () => {
        await checkoutPage.verifyOrderCompleted();
      });
    });
  }
});
