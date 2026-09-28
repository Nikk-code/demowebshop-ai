# DemoWebShop AI — Framework Context Map

> **Auto-loaded by Antigravity AI at session start.**
> This file is the single source of truth for framework structure, patterns, and conventions.
> Read this first. Only open individual files when you need method-level detail.
> Update the relevant section at the end of every task when new files or methods are added.

---

## 1. Project Identity

| Property | Value |
|---|---|
| **Project** | `DemoWebShop_AI` |
| **AUT** | https://demowebshop.tricentis.com (nopCommerce sandbox) |
| **Framework** | Playwright Test (`@playwright/test`) — JavaScript ES6+ |
| **Pattern** | Page Object Model (POM) + Fixtures + Data-driven tests |
| **Browsers** | Chromium, Firefox, WebKit (all enabled in `playwright.config.js`) |
| **Base URL** | `https://demowebshop.tricentis.com` (set in config, use relative paths) |
| **Reporters** | List + HTML (`playwright-report/`) + Allure (`allure-results/`) |
| **Env vars** | Loaded from `.env` by `playwright.config.js` (no dotenv package needed) |

---

## 2. Directory Map

```
DemoWebShop_AI/
├── pages/                    # Page Object classes (one per page/component)
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── ProductPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── fixtures/
│   └── test-fixtures.js      # Custom Playwright fixtures — always import test from here
├── test-data/
│   ├── purchase-flow-data.json
│   ├── guest-checkout-data.json
│   ├── addresses.js
│   └── registered-users.csv
├── tests/
│   ├── smoke.spec.js
│   ├── login/
│   │   └── login.spec.js
│   ├── cart/
│   │   ├── add-product-to-cart.spec.js
│   │   ├── remove-product-from-cart.spec.js
│   │   └── update-cart-quantity.spec.js
│   └── e2e/
│       ├── complete-purchase-flow.spec.js
│       ├── guest-checkout-flow.spec.js
│       └── user-registration-login.spec.js
├── docs/scenarios/           # Business scenario documentation
├── knowledge/                # Verified app knowledge (read before creating locators)
│   ├── application/          # App overview, areas, business flows, auth, constraints
│   ├── locators/             # Verified stable selectors
│   ├── decisions/            # Architecture Decision Records (ADRs)
│   ├── history/              # Major structural change log
│   └── test-design/          # Testing patterns and validation scope
├── .agents/
│   ├── rules/                # Permanent coding + AI behavior rules (never auto-modify)
│   └── skills/               # Skill files: pages, fixtures, assertions, knowledge, etc.
├── playwright.config.js
└── GEMINI.md                 # ← THIS FILE
```

---

## 3. The Golden Rule — Always Import from Fixtures

```javascript
// ✅ CORRECT — always import test from fixtures, never from @playwright/test directly
const { test } = require('../../fixtures/test-fixtures');

// ❌ WRONG
const { test } = require('@playwright/test');
```

---

## 4. Available Fixtures (auto-injected via `test-fixtures.js`)

| Fixture | Class | Usage |
|---|---|---|
| `loginPage` | `LoginPage` | Login / logout flows |
| `registerPage` | `RegisterPage` | Registration flows |
| `productPage` | `ProductPage` | Browse categories, add to cart |
| `cartPage` | `CartPage` | Cart management |
| `checkoutPage` | `CheckoutPage` | Full checkout wizard |

All fixtures are **test-scoped** (fresh instance per test).
`afterEach` auto-attaches a full-page screenshot to every test report.

---

## 5. Page Object API Reference

### `LoginPage` (`pages/LoginPage.js`)
| Method | Description |
|---|---|
| `goto()` | Navigate to `/login` |
| `login(email, password)` | Fill and submit login form |
| `logout()` | Click logout if visible |
| `getLoggedInAccountEmail()` | Returns header email text (string) |

---

### `RegisterPage` (`pages/RegisterPage.js`)
| Method | Description |
|---|---|
| `goto()` | Navigate to `/register` |
| `fillForm(userData)` | Fill registration form fields |
| `submit()` | Click Register button |
| `registerWithUniqueEmail(userData)` | Register; auto-retries with unique email on duplicate. Returns `{ email, password, firstName, lastName }` |
| `logout()` | Click logout if visible |
| `getLoggedInAccountEmail()` | Returns header email text (string) |

---

### `ProductPage` (`pages/ProductPage.js`)
| Method | Description |
|---|---|
| `gotoCategory(categoryPath)` | Navigate to `/books`, `/computers`, etc. |
| `getProductCard(productName)` | Returns locator for a product card on listing page |
| `openProductDetails(productName)` | Click product title to open detail page |
| `addProductToCartFromListing(productName)` | Click add-to-cart button directly on listing card |
| `addProductToCartFromDetails(quantity?)` | Click add-to-cart on product detail page |
| `closeNotificationBanner()` | Wait for and close the green AJAX success banner |
| `addProductToCartIfNotPresent(categoryPath, productName, cartPage)` | Smart add: checks cart first, skips if already present. Leaves browser on cart page. |

---

### `CartPage` (`pages/CartPage.js`)
| Method | Description |
|---|---|
| `goto()` | Navigate to `/cart` |
| `getCartRow(productName)` | Returns locator for a cart table row |
| `hasProduct(productName)` | Returns `true/false` — safe conditional check |
| `verifyProductVisible(productName)` | Asserts product row is visible (use in spec) |
| `getProductQuantity(productName)` | Returns current qty input value (string) |
| `updateProductQuantity(productName, quantity)` | Fill qty input field |
| `markProductForRemoval(productName)` | Check the remove checkbox |
| `getProductUnitPrice(productName)` | Returns unit price text |
| `getProductSubtotal(productName)` | Returns subtotal text |
| `updateCart()` | Click "Update shopping cart" button |
| `continueShopping()` | Click "Continue shopping" button |
| `checkTermsOfService()` | Check the ToS checkbox (required before checkout) |
| `proceedToCheckout()` | Click "Checkout" button |
| `isEmpty()` | Returns `true` if cart shows empty message |

---

### `CheckoutPage` (`pages/CheckoutPage.js`)
| Method | Description |
|---|---|
| `checkoutAsGuest()` | Click "Checkout as Guest" + wait for `/onepagecheckout` nav (guest flow only) |
| `fillBillingAddress(billingData)` | Fill new-address form if visible; skips if saved address already selected. Handles AJAX re-render delay after country selection (Firefox/WebKit safe). |
| `continueBilling()` | Click billing Continue (handles both existing/new-address button variants) |
| `continueShippingAddress()` | Click shipping address Continue (waits for AJAX container activation) |
| `continueShipping()` | Click shipping method Continue |
| `continuePayment()` | Click payment method Continue |
| `continuePaymentInfo()` | Click payment info Continue (container wait + force click for WebKit) |
| `confirmOrder()` | Click Confirm to place order |
| `getOrderCompletedTitle()` | Returns order completion title text |
| `getOrderNumber()` | Returns order number from confirmation page |
| `verifyOrderCompleted()` | Asserts title = "Your order has been successfully processed!" + order number present |

**`billingData` shape:**
```javascript
{ firstName, lastName, email, country, city, address, zip, phone }
```

---

## 6. Test Data Files

| File | Used By | Contents |
|---|---|---|
| `purchase-flow-data.json` | `complete-purchase-flow.spec.js` | 2 rows: Computing & Internet, Fiction (registered user) |
| `guest-checkout-data.json` | `guest-checkout-flow.spec.js` | 2 rows: Computing & Internet, Fiction (guest billing) |
| `addresses.js` | General reuse | Reusable address objects |
| `registered-users.csv` | `user-registration-login.spec.js` | CSV rows for registration/login data-driven tests |

---

## 7. Environment Variables

| Variable | Required By | Description |
|---|---|---|
| `DEMO_USER_EMAIL` | `complete-purchase-flow.spec.js` | Registered user email for authenticated checkout |
| `DEMO_USER_PASSWORD` | `complete-purchase-flow.spec.js` | Registered user password |

Set in `.env` file at project root (not committed). See `.env.example` for template.

---

## 8. Key Application Facts (Verified)

- **Base URL**: `https://demowebshop.tricentis.com`
- **Cart page**: `/cart` — works anonymously; product can be added as guest
- **Login page**: `/login`
- **Register page**: `/register`
- **One-page checkout**: `/onepagecheckout` (reached after clicking Checkout)
- **Guest checkout selection**: `/login/checkoutasguest?returnUrl=%2Fcart` — appears when unauthenticated user clicks Checkout. Button selector: `.checkout-as-guest-button`
- **ToS checkbox**: `#termsofservice` — has no `<label>`, use CSS ID directly
- **Cart AJAX banner**: `#bar-notification` — slides down after add-to-cart; must be closed before further header interactions
- **Email uniqueness**: Registration fails on duplicate email — use `registerWithUniqueEmail()` for all registration tests
- **Payment methods**: Mock only (Cash On Delivery, Check/Money Order) — no real card processing
- **Country AJAX**: Selecting country on billing form disables city/address/zip/phone briefly — always wait for `#BillingNewAddress_PhoneNumber` to be enabled before filling

---

## 9. Completed Test Scenarios

| Spec File | Type | Scenarios | Status |
|---|---|---|---|
| `tests/smoke.spec.js` | Smoke | Homepage loads | ✅ |
| `tests/login/login.spec.js` | Login | Valid login | ✅ |
| `tests/cart/add-product-to-cart.spec.js` | Cart | Add product | ✅ |
| `tests/cart/remove-product-from-cart.spec.js` | Cart | Remove product | ✅ |
| `tests/cart/update-cart-quantity.spec.js` | Cart | Update quantity | ✅ |
| `tests/e2e/user-registration-login.spec.js` | E2E | Register + login + logout | ✅ |
| `tests/e2e/complete-purchase-flow.spec.js` | E2E | Registered user full purchase (2 products) | ✅ |
| `tests/e2e/guest-checkout-flow.spec.js` | E2E | Guest full purchase (2 products, no account) | ✅ |

---

## 10. Coding Rules (Summary — full detail in `.agents/rules/`)

- **Never use `var`** — use `const` / `let`
- **Never use `page.waitForTimeout()`** — use proper waits
- **Never put selectors in spec files** — always in Page Objects
- **Never put assertions in Page Objects** — always in spec files (except named verify* methods)
- **Locator priority**: `getByRole` → `getByLabel` → `getByPlaceholder` → `getByText` → CSS → XPath (last resort)
- **No third-party libs** without explicit approval
- **Reuse before creating** — check existing Page Objects and fixtures first
- **Run tests before committing** — verify affected spec passes

---

## 11. Skills Available (`.agents/skills/`)

| Skill | When to Read |
|---|---|
| `pages` | Creating or modifying a Page Object |
| `fixtures` | Creating or modifying a fixture |
| `assertions` | Writing or reviewing assertions |
| `atomic-tests` | Designing a new test spec |
| `test-data` | Creating or modifying test data |
| `knowledge` | Updating the knowledge base |
| `decisions` | Documenting an architecture decision |

---

## 12. Maintenance — Keep This File Updated

**After completing any task, update the relevant sections above:**

- Added a new Page Object method → update **Section 5**
- Added a new test spec → update **Section 9**
- Added a new test data file → update **Section 6**
- Discovered a new app constraint or locator → update **Section 8**
- Added a new env variable → update **Section 7**

> This file is the framework memory. Keeping it current means future AI sessions
> start with full context in one read — no repeated file scanning.

---

*Last updated: 2026-09-28 | Covers commits up to `1541f59`*
