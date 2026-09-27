# Automation Constraints

---
*   **Discovery Date**: 2026-08-18
*   **Application URL**: https://demowebshop.tricentis.com/
*   **Source**: Live application inspection
*   **Last Reviewed Date**: 2026-08-18
---

This document lists identified and verified observations that can affect automated UI test executions on the Tricentis Demo Web Shop application.

## 1. Authentication State dependencies
*   **Shared Sandbox Site**: Because the application is a public demo environment, many users or other automation tasks may register accounts concurrently.
*   **Uniqueness of Email**: Email registration is unique. Attempting to register the same email address multiple times results in validation failures ("The specified email already exists"). Automation scripts must generate unique emails for registration tests (e.g., using timestamps or UUID strings like `testuser_17180000@example.com`).

## 2. Dynamic Shopping Cart Updates
*   **AJAX Loading**: Adding products to the cart triggers an asynchronous AJAX request that updates the cart quantity count in the top-right header link `.header-links .cart-qty`.
*   **Race Conditions**: When clicking "Add to cart", there is a slight delay before the cart count updates. Assertions verifying the quantity in the header link must account for this delay (relying on Playwright `expect().toHaveText()` auto-waiting rather than immediately querying `.innerText()`).
*   **Notification Bar**: A success banner (`#bar-notification`) slides down at the top of the page. It can obstruct header links (like Login/Logout) if actions are performed immediately after. Ensure the banner is closed or actions are independent.

## 3. Checkout Prerequisite States
*   **Checkout redirects**: Trying to navigate directly to `/checkout` without items in the shopping cart redirects the user back to the empty shopping cart page `/cart`.
*   **Terms Agreement**: The Checkout button on the cart page is disabled or throws an alert dialog if the "Terms of Service" checkbox is not checked prior to clicking.

## 4. Environment Limitations
*   **External Email Verification**: The demo site does not require email confirmation/verification links to activate registered accounts. Accounts are immediately active upon form submission.
*   **Payment gateways**: Checkout payment methods include mock selections (like "Cash On Delivery" or "Check / Money Order"). These methods allow order completion without actual card processing steps.
