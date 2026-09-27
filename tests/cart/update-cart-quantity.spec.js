const { test, expect } = require('../../fixtures/test-fixtures');
const { products } = require('../../test-data/products');

test.describe('Shopping Cart UI Tests', () => {
  test('should update product quantity in shopping cart and display updated value', async ({ productPage, cartPage }) => {
    const product = products.computingAndInternet;

    // 1. Arrange: Navigate to Books category, add product to cart, and navigate to shopping cart
    await productPage.gotoCategory(product.categoryPath);
    await productPage.addProductToCartFromListing(product.name);
    await productPage.closeNotificationBanner();
    await cartPage.goto();

    // 2. Act: Locate row, update quantity field value to 2, and update shopping cart
    const cartRow = cartPage.getCartRow(product.name);
    await expect(cartRow).toBeVisible();
    await cartPage.updateProductQuantity(product.name, 2);
    await cartPage.updateCart();

    // 3. Assert: Verify the cart row is visible and quantity field value is updated to 2
    await expect(cartRow).toBeVisible();
    await expect(cartRow.locator('.qty-input')).toHaveValue('2');
  });
});
