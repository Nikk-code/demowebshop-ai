# E2E Scenario: Complete Purchase Flow

## Overview

This scenario covers the **most important customer journey** on the Demo Web Shop — a registered user successfully purchasing a product from start to finish.

It is the foundation of our End-to-End (E2E) test suite and validates that all the key parts of the system work together correctly: authentication, product browsing, cart management, checkout, and order confirmation.

---

## Business Goal

> **As a registered customer, I want to browse products, add one to my cart, go through checkout, and receive an order confirmation — so that I know my purchase was successfully placed.**

---

## Actors

| Actor | Description |
|---|---|
| **Registered User** | A customer who already has an account on the Demo Web Shop |

---

## Preconditions

- The user has a valid registered account (email + password)
- The Demo Web Shop is accessible and running
- The product being purchased is available in the catalog

---

## Scenario Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | User navigates to the **Login page** | Login form is displayed |
| 2 | User enters valid **email and password** and clicks Log In | User is authenticated and redirected to the home page |
| 3 | User navigates to the **Books category** page | List of book products is displayed |
| 4 | User clicks **"Add to cart"** on the target product from the listing | A green success notification appears confirming the item was added |
| 5 | User dismisses the notification and navigates to the **Shopping Cart** | Cart page loads with the added product visible |
| 6 | User checks the **Terms of Service** checkbox and clicks **Checkout** | User is taken to the Checkout page |
| 7 | User fills in the **Billing Address** form and continues | Billing step completes, Shipping method step appears |
| 8 | User selects the **Shipping Method** and continues | Shipping step completes, Payment method step appears |
| 9 | User selects the **Payment Method** and continues | Payment method step completes, Payment info step appears |
| 10 | User reviews the **Payment Info** and continues | Payment info step completes, Order Confirmation step appears |
| 11 | User clicks **"Confirm"** to place the order | Order is placed successfully |
| 12 | System displays the **Order Completion** page | Page shows "Your order has been successfully processed!" with a unique order number |

---

## Postconditions

- A new order is created in the system with a valid order number
- The user can see their order in the "My Orders" account section

---

## What This Scenario Tests

- Login and session management
- Category browsing and product listing
- Add to cart from listing page
- Cart review and terms acceptance
- Full multi-step checkout flow
- Order placement and confirmation

---

## Linked Test File

- `tests/e2e/complete-purchase-flow.spec.js`

---

## Notes

- This test uses a **real registered account** via environment variables (`DEMO_USER_EMAIL` / `DEMO_USER_PASSWORD`)
- Billing address data is stored in `test-data/addresses.js` for reuse across scenarios
- All page interactions are encapsulated in **Page Object classes** — the spec file itself contains no selectors or raw Playwright code
