class ProductPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators for single-product details viewport (reused dynamically)
    this.quantityInput = page.getByLabel('Qty:');
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.successNotification = page.locator('#bar-notification');
    this.notificationCloseButton = page.locator('#bar-notification .close');
  }

  /**
   * Navigates to a specific category listing path relative to the baseURL
   * @param {string} categoryPath E.g. '/books' or '/computers'
   */
  async gotoCategory(categoryPath) {
    await this.page.goto(categoryPath);
  }

  /**
   * Locates a product item card container on a listing page
   * @param {string} productName The display name of the target product
   */
  getProductCard(productName) {
    return this.page.locator('.product-item').filter({
      has: this.page.locator('.product-title a', { hasText: productName })
    });
  }

  /**
   * Clicks on the product title link from the listing page to navigate to product details
   * @param {string} productName The name of the product to click
   */
  async openProductDetails(productName) {
    const card = this.getProductCard(productName);
    await card.locator('.product-title a').click();
  }

  /**
   * Click "Add to cart" directly from the category listing card
   * @param {string} productName The name of the product to add
   */
  async addProductToCartFromListing(productName) {
    const card = this.getProductCard(productName);
    await card.locator('.product-box-add-to-cart-button').click();
  }

  /**
   * Click "Add to cart" on the product details page
   * @param {number} [quantity] Optional quantity to override
   */
  async addProductToCartFromDetails(quantity) {
    if (quantity !== undefined) {
      await this.quantityInput.fill(quantity.toString());
    }
    await this.addToCartButton.click();
  }

  /**
   * Closes the top AJAX green notification banner if visible
   */
  async closeNotificationBanner() {
    await this.successNotification.waitFor({ state: 'visible' });
    await this.notificationCloseButton.click();
    await this.successNotification.waitFor({ state: 'hidden' });
  }

  /**
   * Adds a product to the cart from its category listing page — but only if it
   * is not already present in the cart. If the product is already in the cart,
   * this method skips browsing and adding entirely.
   *
   * After this method resolves, the browser will always be on the cart page.
   *
   * @param {string} categoryPath  The category URL path e.g. '/books'
   * @param {string} productName   The display name of the product to add
   * @param {import('../pages/CartPage').CartPage} cartPage  CartPage instance used to check cart state
   */
  async addProductToCartIfNotPresent(categoryPath, productName, cartPage) {
    // First check the cart — navigate there and see if product is already present
    await cartPage.goto();
    const alreadyInCart = await cartPage.hasProduct(productName);

    if (alreadyInCart) {
      // Product is already in the cart — nothing to do, stay on cart page
      return;
    }

    // Product not in cart yet — navigate to category and add it
    await this.gotoCategory(categoryPath);
    await this.addProductToCartFromListing(productName);
    await this.closeNotificationBanner();

    // Return to cart page so the caller is always left on the cart
    await cartPage.goto();
  }
}

module.exports = { ProductPage };
