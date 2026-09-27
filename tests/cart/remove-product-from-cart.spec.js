const { test, expect } = require('../../fixtures/test-fixtures');
const { products } = require('../../test-data/products');

test.describe('Shopping Cart UI Tests', () => {
  test('should remove product from shopping cart and verify its absence', async ({ productPage, cartPage }) => {
    const product = products.computingAndInternet;

    // 1. Arrange: Navigate to Books category, add product, and navigate to shopping cart
    await productPage.gotoCategory(product.categoryPath);
    await productPage.addProductToCartFromListing(product.name);
    await productPage.closeNotificationBanner();
    await cartPage.goto();

    // Verify product row exists in cart before attempting removal
    const cartRow = cartPage.getCartRow(product.name);
    await expect(cartRow).toBeVisible();

    // 2. Act: Mark product for removal and update cart
    await cartPage.markProductForRemoval(product.name);
    await cartPage.updateCart();

    // 3. Assert: Verify the product cart row is no longer visible in the shopping cart
    await expect(cartRow).not.toBeVisible();
  });
});
