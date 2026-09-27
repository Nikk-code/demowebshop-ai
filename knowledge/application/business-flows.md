# Business Flows

---
*   **Discovery Date**: 2026-08-18
*   **Application URL**: https://demowebshop.tricentis.com/
*   **Source**: Live application inspection
*   **Last Reviewed Date**: 2026-08-18
---

This document outlines the high-level sequence of steps for major business flows in the Demo Web Shop application.

## 1. User Registration
1.  Navigate to `/register`.
2.  Select Gender (optional).
3.  Enter First Name, Last Name, and Email.
4.  Enter Password and Confirm Password.
5.  Click the "Register" submit button.
6.  Assert that registration confirmation page is loaded.
7.  Click "Continue" (optional).

## 2. User Login
1.  Navigate to `/login`.
2.  Enter Email and Password.
3.  Click the "Log in" submit button.
4.  Verify authenticated header state (user email link and "Log out" link visible).

## 3. Product Search and Add to Cart
1.  Navigate to Homepage `/`.
2.  Input product name in the header Search box.
3.  Click "Search" (or select from suggestion dropdown).
4.  Click the product card to navigate to the Product Details page.
5.  Adjust quantity (optional).
6.  Click the "Add to cart" button.
7.  Assert that the green notification bar ("The product has been added to your shopping cart") is displayed.

## 4. Shopping Cart Management
1.  Navigate to `/cart`.
2.  Modify product quantity input fields (optional).
3.  Check "Remove" checkboxes for products to delete (optional).
4.  Click "Update shopping cart".
5.  Assert that quantities/totals update correctly or items are removed.

## 5. Checkout (Authenticated User)
1.  Navigate to `/cart`.
2.  Verify items are present.
3.  Check the "I agree with the terms of service" checkbox.
4.  Click "Checkout".
5.  Billing Address step: Select existing address or fill in new billing form, click "Continue".
6.  Shipping Address step: Select existing shipping address or fill new form, click "Continue".
7.  Shipping Method step: Select shipping option (e.g., Ground), click "Continue".
8.  Payment Method step: Select payment method (e.g., Cash On Delivery), click "Continue".
9.  Payment Information step: Click "Continue".
10. Confirm Order step: Review totals and click "Confirm".
11. Assert that the confirmation title "Thank you" and order number are displayed.
