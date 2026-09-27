# Application Areas

---
*   **Discovery Date**: 2026-08-18
*   **Application URL**: https://demowebshop.tricentis.com/
*   **Source**: Live application inspection
*   **Last Reviewed Date**: 2026-08-18
---

This document outlines the major application areas/pages relevant to UI automation.

## 1. Home
*   **Purpose**: The main landing page displaying banner sliders, featured products, categories, and footer.
*   **Path**: `/` (relative)
*   **Key User Actions**: Click category items, add featured products to cart directly, click login/register links.
*   **Dependencies**: None.

## 2. Login
*   **Purpose**: Form page for logging in existing users.
*   **Path**: `/login` (relative)
*   **Key User Actions**: Input email, input password, check "Remember me?", click Log in.
*   **Dependencies**: Requires a registered account.

## 3. Register
*   **Purpose**: Form page for creating a new user account.
*   **Path**: `/register` (relative)
*   **Key User Actions**: Choose gender, input first/last names, input email, input password, confirm password, click Register.
*   **Dependencies**: None.

## 4. Product Listing (Categories)
*   **Purpose**: Displaying lists of products belonging to a specific category (e.g., Books).
*   **Path**: `/books`, `/computers`, etc.
*   **Key User Actions**: Sort products, change page size, switch view layout, click product title, click add-to-cart.
*   **Dependencies**: None.

## 5. Product Details
*   **Purpose**: Detail screen displaying price, quantity selector, add-to-cart buttons, description, and reviews for a single product.
*   **Path**: `/<product-name-friendly-url>` (e.g. `/computing-and-electronics` or `/science`)
*   **Key User Actions**: Choose product options (if any), input quantity, click "Add to cart", click "Add to wishlist".
*   **Dependencies**: None.

## 6. Shopping Cart
*   **Purpose**: Displaying selected products, quantities, prices, terms of service checkbox, and checkout button.
*   **Path**: `/cart` (relative)
*   **Key User Actions**: Update quantity, remove product checkboxes, apply discount coupon/gift card, check Terms of Service, click Checkout.
*   **Dependencies**: None (cart can be populated anonymously).

## 7. Checkout
*   **Purpose**: Multi-step checkout wizard for inputting billing/shipping address, shipping method, payment method, payment info, and confirming order.
*   **Path**: `/checkout` (relative)
*   **Key User Actions**: Select/input addresses, choose shipping/payment options, click "Confirm".
*   **Dependencies**: Requires items in the cart and user authentication (login or registration).

## 8. Account (My Account)
*   **Purpose**: Customer portal to edit info, manage addresses, and view order list.
*   **Path**: `/customer/info` (relative)
*   **Key User Actions**: Update names, change password, check reward points.
*   **Dependencies**: Requires user authentication.

## 9. Orders (Order History)
*   **Purpose**: List previous purchases and view invoice details.
*   **Path**: `/customer/orders` (relative)
*   **Key User Actions**: View order details, click re-order button.
*   **Dependencies**: Requires user authentication.
