# Application Locators

---
*   **Discovery Date**: 2026-08-18
*   **Application URL**: https://demowebshop.tricentis.com/
*   **Source**: Live application inspection
*   **Last Reviewed Date**: 2026-08-18
---

This document lists recommended, stable locators for the Demo Web Shop application based on role, label, and semantic accessible targets.

## 1. Header Navigation Links

*   **Register link**:
    *   *Recommended strategy*: `page.getByRole('link', { name: 'Register' })`
    *   *Alternative*: `page.locator('.ico-register')`
    *   *Reason*: Standard accessibility link.
*   **Log in link**:
    *   *Recommended strategy*: `page.getByRole('link', { name: 'Log in' })`
    *   *Alternative*: `page.locator('.ico-login')`
    *   *Reason*: Standard accessibility link.
*   **Log out link**:
    *   *Recommended strategy*: `page.getByRole('link', { name: 'Log out' })`
    *   *Alternative*: `page.locator('.ico-logout')`
    *   *Reason*: Appears only in authenticated state.
*   **Account/Email link**:
    *   *Recommended strategy*: `page.getByRole('link', { name: email })` (dynamic using logged-in email)
    *   *Alternative*: `page.locator('.header-links .account')`
    *   *Reason*: Links directly to the user info page; text value is the email address.

## 2. Login Form Elements

*   **Email field**:
    *   *Recommended strategy*: `page.getByLabel('Email')`
    *   *Reason*: Associated with label `<label for="Email">Email:</label>`.
*   **Password field**:
    *   *Recommended strategy*: `page.getByLabel('Password')`
    *   *Reason*: Associated with label `<label for="Password">Password:</label>`.
*   **Remember Me checkbox**:
    *   *Recommended strategy*: `page.getByLabel('Remember me?')`
    *   *Reason*: Associated with label `<label for="RememberMe">Remember me?</label>`.
*   **Log in button**:
    *   *Recommended strategy*: `page.getByRole('button', { name: 'Log in' })`
    *   *Alternative*: `page.locator('.login-button')`
    *   *Reason*: Role button selector matches `<input type="submit" value="Log in" />`.

## 3. Product Listing, Details, and Search

*   **Search input**:
    *   *Recommended strategy*: `page.getByRole('textbox', { name: 'Search store' })`
    *   *Alternative*: `page.locator('#small-searchterms')`
    *   *Reason*: Input defaults to value="Search store".
*   **Search submit button**:
    *   *Recommended strategy*: `page.getByRole('button', { name: 'Search' })`
    *   *Reason*: Role button selector matches `<input type="submit" value="Search" />`.
*   **Product item card (Catalog)**:
    *   *Recommended strategy*: `page.locator('.product-item').filter({ has: page.locator('.product-title a', { hasText: productName }) })`
    *   *Reason*: Isolates a specific product card in the category listing by text.
*   **Add to cart button (Catalog)**:
    *   *Recommended strategy*: `productCard.locator('.product-box-add-to-cart-button')`
    *   *Reason*: Located nested inside the specific product item card container.
*   **Product title header (Details)**:
    *   *Recommended strategy*: `page.getByRole('heading', { name: productName, exact: true })`
    *   *Reason*: Standard accessibility heading representation in the main details viewport.
*   **Quantity input field (Details)**:
    *   *Recommended strategy*: `page.getByLabel('Qty:')`
    *   *Reason*: Mapped to label element `<label class="qty-label" for="addtocart_X_EnteredQuantity">Qty:</label>`.
*   **Add to cart button (Details)**:
    *   *Recommended strategy*: `page.getByRole('button', { name: 'Add to cart' })`
    *   *Reason*: Role button selector matches `<input type="button" class="button-1 add-to-cart-button" value="Add to cart" />`.
*   **Success Notification Bar**:
    *   *Recommended strategy*: `page.locator('#bar-notification')`
    *   *Reason*: ID-based container for AJAX response popup messages.
*   **Notification Close button**:
    *   *Recommended strategy*: `page.locator('#bar-notification .close')`
    *   *Reason*: Nested close link element (`<span class="close">`).

## 4. Shopping Cart

*   **Cart item row**:
    *   *Recommended strategy*: `page.locator('tr.cart-item-row').filter({ has: page.locator('.product-name', { hasText: productName }) })`
    *   *Reason*: Selects the specific row containing the product's name.
*   **Remove checkbox**:
    *   *Recommended strategy*: `cartRow.locator('.remove-from-cart input[type="checkbox"]')`
    *   *Reason*: Selects the checkbox inside the specific cart row to mark it for deletion.
*   **Quantity input field**:
    *   *Recommended strategy*: `cartRow.locator('.qty-input')`
    *   *Reason*: Selects the input field class inside the specific cart row.
*   **Unit price**:
    *   *Recommended strategy*: `cartRow.locator('.product-unit-price')`
    *   *Reason*: Selects unit price text element in the row.
*   **Item subtotal**:
    *   *Recommended strategy*: `cartRow.locator('.product-subtotal')`
    *   *Reason*: Selects subtotal text element in the row.
*   **Update Shopping Cart button**:
    *   *Recommended strategy*: `page.getByRole('button', { name: 'Update shopping cart' })`
    *   *Alternative*: `page.locator('.update-cart-button')`
    *   *Reason*: Role button selector matches `<input type="submit" class="button-2 update-cart-button" value="Update shopping cart" />`.
*   **Continue Shopping button**:
    *   *Recommended strategy*: `page.getByRole('button', { name: 'Continue shopping' })`
    *   *Alternative*: `page.locator('.continue-shopping-button')`
    *   *Reason*: Role button selector matches `<input type="submit" class="button-2 continue-shopping-button" value="Continue shopping" />`.
*   **Empty Cart Message**:
    *   *Recommended strategy*: `page.locator('.order-summary-content').getByText('Your Shopping Cart is empty!')`
    *   *Reason*: Text display area indicating empty cart.
*   **Terms of Service checkbox**:
    *   *Recommended strategy*: `page.getByLabel('I agree with the terms of service and I adhere to them unconditionally')`
    *   *Alternative*: `page.locator('#termsofservice')`
    *   *Reason*: Standard terms checkbox on `/cart`.
*   **Checkout button**:
    *   *Recommended strategy*: `page.getByRole('button', { name: 'Checkout' })`
    *   *Alternative*: `page.locator('#checkout')`
    *   *Reason*: Button ID checkout exists inside the cart form.
