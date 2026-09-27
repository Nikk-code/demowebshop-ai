const { expect } = require('@playwright/test');

class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Global cart elements
    this.updateCartButton = page.getByRole('button', { name: 'Update shopping cart' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue shopping' });
    this.emptyCartMessage = page.locator('.order-summary-content').getByText('Your Shopping Cart is empty!');
    // Note: The ToS checkbox has no associated <label> element in the DOM.
    // It is identified directly by its input ID: <input id="termsofservice">
    this.termsOfServiceCheckbox = page.locator('#termsofservice');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  /**
   * Navigates to the shopping cart page relative to the baseURL
   */
  async goto() {
    await this.page.goto('/cart');
  }

  /**
   * Locates the table row associated with a specific product in the cart
   * @param {string} productName The name of the product
   */
  getCartRow(productName) {
    return this.page.locator('tr.cart-item-row').filter({
      has: this.page.locator('.product-name', { hasText: productName })
    });
  }

  /**
   * Checks whether a specific product is already present in the cart.
   * Returns true/false without throwing — safe to use as a conditional guard.
   * @param {string} productName
   * @returns {Promise<boolean>}
   */
  async hasProduct(productName) {
    return await this.getCartRow(productName).isVisible();
  }

  /**
   * Asserts that a specific product is visible in the cart.
   * Intended for use in spec files as a readable, business-language verification step.
   * @param {string} productName
   */
  async verifyProductVisible(productName) {
    await expect(this.getCartRow(productName)).toBeVisible();
  }

  /**
   * Gets the quantity value currently inputted for a specific product in the cart
   * @param {string} productName
   * @returns {Promise<string>}
   */
  async getProductQuantity(productName) {
    const row = this.getCartRow(productName);
    return await row.locator('.qty-input').inputValue();
  }

  /**
   * Modifies the quantity field value for a specific product in the cart
   * @param {string} productName
   * @param {number} quantity
   */
  async updateProductQuantity(productName, quantity) {
    const row = this.getCartRow(productName);
    await row.locator('.qty-input').fill(quantity.toString());
  }

  /**
   * Marks the remove checkbox for a specific product in the cart
   * @param {string} productName
   */
  async markProductForRemoval(productName) {
    const row = this.getCartRow(productName);
    await row.locator('.remove-from-cart input[type="checkbox"]').check();
  }

  /**
   * Gets the unit price for a specific product in the cart
   * @param {string} productName
   * @returns {Promise<string>}
   */
  async getProductUnitPrice(productName) {
    const row = this.getCartRow(productName);
    return (await row.locator('.product-unit-price').textContent()).trim();
  }

  /**
   * Gets the subtotal price for a specific product in the cart
   * @param {string} productName
   * @returns {Promise<string>}
   */
  async getProductSubtotal(productName) {
    const row = this.getCartRow(productName);
    return (await row.locator('.product-subtotal').textContent()).trim();
  }

  /**
   * Clicks the "Update shopping cart" button
   */
  async updateCart() {
    await this.updateCartButton.click();
  }

  /**
   * Clicks the "Continue shopping" button
   */
  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  /**
   * Checks the Terms of Service checkbox
   */
  async checkTermsOfService() {
    await this.termsOfServiceCheckbox.check();
  }

  /**
   * Clicks the "Checkout" button to proceed
   */
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Checks if the empty cart warning notification is visible
   * @returns {Promise<boolean>}
   */
  async isEmpty() {
    return await this.emptyCartMessage.isVisible();
  }
}

module.exports = { CartPage };
