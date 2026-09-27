# Playwright-Specific Engineering Rules

This document establishes the technical guidelines and best practices for writing tests using Playwright.

## 1. Syntax & Core API
*   **Playwright Test Library**: Always import and use Playwright Test APIs from `@playwright/test`.
*   **Asynchronous Code**: Use standard `async/await` syntax for all Playwright actions and assertions.
*   **Assertions**: Use Playwright's built-in `expect()` assertions (e.g., `expect(locator).toBeVisible()`). Do not use third-party assertion libraries.

## 2. Element Locators Strategy
*   **Use Locators**: Always use the Playwright `Locator` APIs. Avoid using raw string selectors directly in action calls.
*   **Locator Priority**: Locate elements in this general order of preference:
    1.  `page.getByRole()` (accessibility-based)
    2.  `page.getByLabel()`
    3.  `page.getByPlaceholder()`
    4.  `page.getByText()` (when appropriate/stable)
    5.  `page.getByTestId()`
    6.  CSS selector (when user-facing locators are not feasible or clean)
    7.  XPath (only as a last resort)
*   **Stable Selectors**: Prefer user-facing, stable locators. Avoid brittle selectors based on deeply nested DOM structures or auto-generated, unstable CSS classes.

## 3. Synchronization & Waits
*   **No Arbitrary Sleep**: Never use `page.waitForTimeout()` or arbitrary hard-coded sleeps to resolve synchronization issues.
*   **Auto-Waiting**: Rely on Playwright's built-in auto-waiting mechanism (actions wait for elements to be visible, enabled, stable).
*   **Explicit Waits**: Use explicit waits (e.g., awaiting locator state or API response) only when a real and documentable asynchronous synchronization requirement exists.

## 4. Test execution & Lifecycle
*   **Lifecycle Management**: Let Playwright Test manage browser, context, and page lifecycle via built-in fixtures (`page`, `context`, etc.), unless there is an explicit requirement for custom lifecycle management.
*   **Independence**: Design tests to run independently and concurrently. Avoid chaining tests or depending on the outcome of previous tests unless deliberately documented.
*   **Minimal Abstractions**: Do not wrap standard Playwright commands (like clicks or fills) in custom helper functions unless they add genuine value. Keep abstractions minimal.
*   **Debugging Features**: Utilize Playwright's built-in trace viewer, screenshots, and video recordings to debug issues rather than custom logging wrappers.
