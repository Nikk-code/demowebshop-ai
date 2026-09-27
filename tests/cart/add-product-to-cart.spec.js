const { test, expect } = require('../../fixtures/test-fixtures');
const { products } = require('../../test-data/products');

test.describe('Shopping Cart UI Tests', () => {
  test('should add product from listing and display in cart with quantity 1', async ({ productPage, cartPage }) => {
    const product = products.computingAndInternet;

    // 1. Arrange: Navigate to category listing page
    await productPage.gotoCategory(product.categoryPath);

    // 2. Act: Add target product to cart directly from catalog listing card
    await productPage.addProductToCartFromListing(product.name);

    // Wait and dismiss ajax success notification banner
    await productPage.closeNotificationBanner();

    // Navigate to cart viewport
    await cartPage.goto();

    // 3. Assert: Verify target product is visible inside cart row and quantity is 1
    const cartRow = cartPage.getCartRow(product.name);
    await expect(cartRow).toBeVisible();

    const quantity = await cartPage.getProductQuantity(product.name);
    expect(quantity).toBe('1');
  });
});
