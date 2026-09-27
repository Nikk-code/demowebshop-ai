const { expect } = require('@playwright/test');

class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // ── Billing step ──────────────────────────────────────────────────────────
    // If the account already has a saved address, the checkout shows a dropdown
    // to pick an existing address instead of showing the blank form directly.
    this.billingAddressDropdown = page.locator('#billing-address-select');

    // New-address form fields (visible when "Enter New Address" is selected or
    // when the account has no saved addresses yet)
    this.billingFirstName   = page.locator('#BillingNewAddress_FirstName');
    this.billingLastName    = page.locator('#BillingNewAddress_LastName');
    this.billingEmail       = page.locator('#BillingNewAddress_Email');
    this.billingCountry     = page.locator('#BillingNewAddress_CountryId');
    this.billingCity        = page.locator('#BillingNewAddress_City');
    this.billingAddress1    = page.locator('#BillingNewAddress_Address1');
    this.billingZip         = page.locator('#BillingNewAddress_ZipPostalCode');
    this.billingPhone       = page.locator('#BillingNewAddress_PhoneNumber');

    // "Continue" buttons for each checkout step.
    // Billing has TWO possible Continue buttons depending on mode:
    //   - .existing-address-next-step-button → when a saved address is selected from dropdown
    //   - .new-address-next-step-button      → when "Enter New Address" form is filled
    // The CSS comma selector matches whichever one is present.
    this.billingContinueBtn      = page.locator('#billing-buttons-container .existing-address-next-step-button, #billing-buttons-container .new-address-next-step-button');
    // Shipping Address (Step 2) — confirmed from screenshot:
    // container: #shipping-buttons-container, class: new-address-next-step-button
    this.shippingAddressContinueBtn = page.locator('#shipping-buttons-container .new-address-next-step-button');
    // Shipping Method (Step 3) — confirmed from screenshot: class="shipping-method-next-step-button"
    this.shippingContinueBtn     = page.locator('#shipping-method-buttons-container .shipping-method-next-step-button');
    // Payment Method — follows the same nopCommerce step-class naming pattern
    this.paymentContinueBtn      = page.locator('#payment-method-buttons-container .payment-method-next-step-button');
    // Payment Info — follows the same nopCommerce step-class naming pattern
    this.paymentInfoContinueBtn  = page.locator('#payment-info-buttons-container .payment-info-next-step-button');
    this.confirmOrderBtn         = page.locator('#confirm-order-buttons-container .confirm-order-next-step-button');

    // ── Order completion ───────────────────────────────────────────────────────
    this.orderCompletedTitle  = page.locator('.order-completed .title');
    this.orderNumberLink      = page.locator('.order-completed .details a');
  }

  /**
   * Handles the billing step intelligently:
   *   - If the account has a saved address → selects it from the dropdown.
   *   - If no saved address → fills in the new-address form fields.
   *
   * In both cases the "Continue" button is NOT clicked here; call continueBilling() after.
   *
   * @param {{ firstName: string, lastName: string, email: string, country: string, city: string, address: string, zip: string, phone: string }} billingData
   */
  async fillBillingAddress(billingData) {
    // Check the form field visibility directly — confirmed from error log that
    // #BillingNewAddress_FirstName is always in the DOM, just hidden when a
    // saved address is active in the dropdown.
    // isVisible() on a hidden-but-present element returns false instantly (no AJAX wait needed).
    const formVisible = await this.billingFirstName.isVisible();

    if (!formVisible) {
      // New-address form is hidden — a saved address is already selected.
      // Nothing to fill; the existing address will be used when Continue is clicked.
      return;
    }

    // Form is visible — fill all new-address fields
    await this.billingFirstName.fill(billingData.firstName);
    await this.billingLastName.fill(billingData.lastName);
    await this.billingEmail.fill(billingData.email);
    await this.billingCountry.selectOption({ label: billingData.country });

    // City/Address/Zip/Phone may appear after country selection (AJAX)
    await this.billingCity.waitFor({ state: 'visible' });
    await this.billingCity.fill(billingData.city);
    await this.billingAddress1.fill(billingData.address);
    await this.billingZip.fill(billingData.zip);
    await this.billingPhone.fill(billingData.phone);
  }

  /**
   * Clicks "Continue" on the Billing Address step.
   */
  async continueBilling() {
    await this.billingContinueBtn.waitFor({ state: 'visible' });
    await this.billingContinueBtn.click();
  }

  /**
   * Clicks "Continue" on the Shipping Address step (Step 2).
   * Uses a saved address if already selected — no form filling needed.
   */
  async continueShippingAddress() {
    await this.shippingAddressContinueBtn.waitFor({ state: 'visible' });
    await this.shippingAddressContinueBtn.click();
  }

  /**
   * Clicks "Continue" on the Shipping Method step.
   */
  async continueShipping() {
    await this.shippingContinueBtn.waitFor({ state: 'visible' });
    await this.shippingContinueBtn.click();
  }

  /**
   * Clicks "Continue" on the Payment Method step.
   */
  async continuePayment() {
    await this.paymentContinueBtn.waitFor({ state: 'visible' });
    await this.paymentContinueBtn.click();
  }

  /**
   * Clicks "Continue" on the Payment Info step.
   */
  async continuePaymentInfo() {
    await this.paymentInfoContinueBtn.waitFor({ state: 'visible' });
    await this.paymentInfoContinueBtn.click();
  }

  /**
   * Clicks "Confirm" to place the order on the final Confirm Order step.
   */
  async confirmOrder() {
    await this.confirmOrderBtn.waitFor({ state: 'visible' });
    await this.confirmOrderBtn.click();
  }

  /**
   * Returns the order completion title text.
   * Expected: "Your order has been successfully processed!"
   * @returns {Promise<string>}
   */
  async getOrderCompletedTitle() {
    await this.orderCompletedTitle.waitFor({ state: 'visible' });
    return (await this.orderCompletedTitle.textContent()).trim();
  }

  /**
   * Returns the order number from the order confirmation page link.
   * @returns {Promise<string>}
   */
  async getOrderNumber() {
    return (await this.orderNumberLink.textContent()).trim();
  }

  /**
   * Asserts that the order was placed successfully.
   * Verifies both the completion title and that a valid order number is present.
   * Intended for use in spec files as a readable, business-language verification step.
   */
  async verifyOrderCompleted() {
    await this.orderCompletedTitle.waitFor({ state: 'visible' });
    await expect(this.orderCompletedTitle).toHaveText('Your order has been successfully processed!');
    const orderNumber = await this.getOrderNumber();
    expect(orderNumber).toBeTruthy();
  }
}

module.exports = { CheckoutPage };
