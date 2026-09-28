# E2E Scenario: Guest Checkout Flow

## Overview

This scenario covers a **guest (unauthenticated) customer** successfully purchasing a product from the Demo Web Shop without registering or logging in.

It validates the guest path through the checkout system: anonymous browsing, add to cart, guest selection page, billing, shipping, payment, and order confirmation.

---

## Business Goal

> **As a guest customer, I want to add a product to my cart, proceed through checkout without creating an account, and receive an order confirmation — so that I can make a purchase quickly without registering.**

---

## Actors

| Actor | Description |
|---|---|
| **Guest User** | An unauthenticated visitor browsing the Demo Web Shop without logging in |

---

## Preconditions

- The user is NOT logged in (no active session)
- The Demo Web Shop is accessible and running
- The product being purchased is available in the catalog

---

## Scenario Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Guest navigates to the **Books category** page | List of book products is displayed |
| 2 | Guest clicks **"Add to cart"** on the target product from the listing | A green success notification appears confirming the item was added |
| 3 | Guest dismisses the notification and navigates to the **Shopping Cart** | Cart page loads with the added product visible |
| 4 | Guest checks the **Terms of Service** checkbox and clicks **Checkout** | Guest/Login selection page appears at `/login/checkoutasguest` |
| 5 | Guest clicks **"Checkout as Guest"** | Guest is taken to the One Page Checkout (`/onepagecheckout`) |
| 6 | Guest fills in the **Billing Address** form and continues | Billing step completes, Shipping address step appears |
| 7 | Guest confirms the **Shipping Address** and continues | Shipping address step completes, Shipping method step appears |
| 8 | Guest selects the **Shipping Method** and continues | Shipping method step completes, Payment method step appears |
| 9 | Guest selects the **Payment Method** and continues | Payment method step completes, Payment info step appears |
| 10 | Guest reviews the **Payment Info** and continues | Payment info step completes, Order Confirmation step appears |
| 11 | Guest clicks **"Confirm"** to place the order | Order is placed successfully |
| 12 | System displays the **Order Completion** page | Page shows "Your order has been successfully processed!" with a unique order number |

---

## Postconditions

- A new order is created in the system with a valid order number
- Order was placed without requiring account registration

---

## What This Scenario Tests

- Anonymous cart population (no login required)
- Guest checkout path selection page
- Full multi-step checkout flow without authentication
- Order placement and confirmation for guest users

---

## Linked Test File

- `tests/e2e/guest-checkout-flow.spec.js`

---

## Notes

- No environment variables are required — this scenario is fully self-contained
- Billing address data is stored in `test-data/guest-checkout-data.json`
- All page interactions are encapsulated in **Page Object classes** — the spec file itself contains no selectors or raw Playwright code
- The `checkoutAsGuest()` method on `CheckoutPage` handles the guest selection step
