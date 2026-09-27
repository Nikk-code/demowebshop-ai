---
name: assertions
description: Guidance for designing, implementing, reviewing, and improving assertions in the Playwright JavaScript framework.
---

# Playwright Assertions Skill

This Skill defines the standards for designing, implementing, and validating assertions in our Playwright JavaScript UI automation framework. Assertions must prioritize business-outcome validation over implementation details to ensure tests are stable, readable, and highly maintainable.

---

## 1. Purpose of Assertions
The primary purpose of an assertion is to validate that the expected business outcome of a user action has been achieved successfully. An assertion acts as the final verification gate, confirming that the application matches the desired state.

## 2. Assertion Ownership Rules
To maintain a strict separation of concerns, the ownership of assertion logic is partitioned as follows:
*   **Tests Own Assertions**: All business verifications and outcome validations must reside inside test files (`*.spec.js`).
*   **Page Objects Must Not Contain Assertions**: Page Objects (`pages/`) are action and locator wrappers. They must never contain `expect()` checks or throw assertion-like errors, except for self-validation during initialization.
*   **Fixtures Must Not Contain Business Assertions**: Fixtures (`fixtures/`) manage lifecycle setup and dependency injection. They must not assert business outcomes, although they may assert framework-level preconditions (e.g. verifying that environment variables are successfully loaded before running tests).
*   **Utility Functions Must Not Assert**: Utilities (`utils/`) are stateless helper functions. They must never assert business outcomes.

## 3. Assertion Hierarchy
Always prefer Playwright's native **web-first assertions** over manual value extraction. The hierarchy of preferred validations:
1.  **Visibility & Existence**: `expect(locator).toBeVisible()` (verifies element exists and is rendered).
2.  **Text & Content Matchers**: `expect(locator).toHaveText()` or `expect(locator).toContainText()`.
3.  **Form Input Values**: `expect(locator).toHaveValue()` or `expect(locator).toBeChecked()`.
4.  **Application URLs**: `expect(page).toHaveURL()` (verifies correct redirect paths).
5.  **State Flags**: `expect(locator).toBeEnabled()` or `expect(locator).toBeDisabled()`.
6.  **Attributes & CSS Classes**: Use only when they represent a direct business rule (e.g. validating an element has an `active` state).

## 4. Strong vs. Weak Assertions

### Weak Assertions
Weak assertions verify that a container exists or match generic layout states, failing to guarantee the specific business intent.
```javascript
// WEAK: Only proves that some cart row is visible; does not verify the actual added item
await expect(page.locator('.cart-item-row').first()).toBeVisible();

// WEAK: Matches raw inner HTML which can fluctuate with design updates
const html = await page.locator('.product-name').innerHTML();
expect(html).toContain('Computing and Internet');
```

### Strong Assertions
Strong assertions verify the exact business entity and target value.
```javascript
// STRONG: Verifies that the row for the specific product is present
const cartRow = cartPage.getCartRow('Computing and Internet');
await expect(cartRow).toBeVisible();

// STRONG: Verifies the quantity of the specific item matches expectations
const quantity = await cartPage.getProductQuantity('Computing and Internet');
expect(quantity).toBe('1');
```

## 5. Business Outcome over Implementation Detail
Tests must validate what the user experiences, not how the code is structured.
*   **Avoid asserting CSS classes** (e.g. `expect(el).toHaveClass('btn-primary-blue-active')`) unless the class itself is a business requirement. Prefer testing visibility or accessibility roles.
*   **Avoid asserting internal DOM structures** (e.g. nested `div > span > input`).
*   **Avoid generated/dynamic attributes** (e.g. `id="item-748903"`).
*   **Avoid verifying transitions or animations** unless they affect element visibility/interactability.

## 6. Locator Usage in Assertions
Always bind assertions to stable, accessibility-focused locators.
*   **Preferred**: `page.getByRole()`, `page.getByLabel()`, `page.getByPlaceholder()`, `page.getByText()`, `page.getByTestId()`.
*   **Page Object Helpers**: Target elements through Page Object properties or filtering methods (e.g. `cartPage.getCartRow(productName)`).
*   **Avoid**: Fragile XPath indices (e.g. `//tr[3]/td[2]/input`) and deep CSS child queries.

## 7. Web-First Assertions
Playwright's web-first assertions (`expect(locator).toBeVisible()`) auto-wait for up to 5 seconds (or custom configured timeouts) for conditions to be met.
*   **Auto-Waiting**: They automatically retry checks until the condition passes or times out, eliminating the need for manual sleeps.
*   **Recommended Matchers**:
    *   `await expect(locator).toBeVisible()`
    *   `await expect(locator).toHaveText('Expected Text')`
    *   `await expect(locator).toHaveValue('Expected Value')`
    *   `await expect(locator).toBeChecked()`
    *   `await expect(locator).toHaveURL(/\/cart/)`

## 8. Value Extraction vs. Web-First Assertions
You must decide when to extract values versus checking them via web-first APIs.

### Direct Value Extraction
Using `.inputValue()` or `.textContent()` followed by a synchronous `expect(val).toBe(expected)` is appropriate when:
*   The value must be parsed or manipulated (e.g. converting price strings to numbers: `parseFloat(priceText)`).
*   The value is used in subsequent calculations or dynamic logging.
*   The element state has already settled (e.g., after a navigation has completed).

```javascript
const quantity = await cartPage.getProductQuantity('Computing and Internet');
expect(quantity).toBe('1'); // Synchronous check on extracted value
```

### Web-First Matchers
Using `await expect(locator).toHaveValue('1')` is preferred when:
*   The field value changes dynamically via AJAX, requiring auto-retry waiting.
*   The check should block execution until a condition resolves.

```javascript
// Web-first auto-retries until value is populated
await expect(cartRow.locator('.qty-input')).toHaveValue('1');
```

## 9. Multiple Assertions
*   Multiple assertions are encouraged inside a single atomic test **only** when they are cohesive and validate different facets of the **same business outcome** (e.g. asserting that a cart contains the correct item *and* that its quantity is correct).
*   Avoid grouping unrelated business outcomes (e.g. asserting product cart addition and then asserting payment checkout steps). These must be split into separate atomic tests.

## 10. Negative Assertions
*   Use negative assertions (e.g. `not.toBeVisible()`) to verify that items are removed, logged out, or hidden.
*   Ensure that negative assertions have a meaningful purpose (e.g., verifying an item is deleted after clicking a remove button).
*   **Caution**: Be sure the element was present in the DOM *before* asserting its absence, to prevent false positives.

## 11. Assertion Timing & Synchronization
*   **Never use `page.waitForTimeout()` or arbitrary sleeps**.
*   Rely on Playwright's automatic retry mechanisms.
*   Synchronize tests by waiting for transitions to settle (e.g. waiting for AJAX banners to appear/disappear, or checking for navigation URLs).

## 12. Failure Diagnostic Quality
Write assertions that fail with readable errors:
*   Keep variable names descriptive (e.g. `cartRow` instead of `el`).
*   Include custom failure messages when appropriate:
    ```javascript
    expect(quantity, 'Shopping cart item quantity should default to 1').toBe('1');
    ```

## 13. AI Assertion Design Workflow
When creating assertions, follow this flow:
```text
Define Business Goal
   └── Identify Observable UI Changes
         └── Build Stable Locator / POM Reference
               └── Apply Web-First Assertion
                     └── Validate Failure Diagnostics
```

## 14. Anti-Patterns
*   **Asserting Everything**: Verifying headers, sidebar links, and footers in a login test.
*   **Hiding Assertions in POMs**: Placing `expect()` statements inside Page Object action methods.
*   **Duplicate Assertions**: Asserting visibility, then text, then attributes for the same static element.
*   **Hardcoded Waits**: Inserting `await page.waitForTimeout(3000)` before asserting.
*   **Universal Counts**: Asserting `expect(page.locator('tr').count()).toBe(3)` instead of targeting specific text rows.
*   **Weakening Checks**: Lowering expectation parameters or deleting assertions to hide broken behaviors.

## 15. Quality Checklist
Before finalizing a test, ensure:
*   [ ] The assertions verify a single, cohesive business outcome.
*   [ ] Assertions are inside the test specification (`*.spec.js`), not in Page Objects.
*   [ ] No arbitrary sleep times (`waitForTimeout`) are used.
*   [ ] Locators used in assertions are stable and accessibility-first.
*   [ ] Web-first auto-waiting assertions are preferred over static DOM checks.
*   [ ] If value extraction is used, the state is fully synchronized first.
*   [ ] Custom warning messages are added to complex verifications.
*   [ ] Negative assertions verify the removal of previously visible elements.
*   [ ] Internal CSS styles and DOM layouts are not hardcoded.

## 16. AI Agent Restrictions
The AI agent must **never**:
*   Silently place assertions in Page Objects.
*   Use hardcoded timeouts to bypass synchronizations.
*   Comment out, delete, or weaken failing assertions to force green test reports.
*   Use count checks as a replacement for element visibility.

---

> [!IMPORTANT]
> The permanent rules inside [`.agents/rules/`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/.agents/rules/) take precedence over this Skill. In the event of any conflict, project Rules take precedence.
