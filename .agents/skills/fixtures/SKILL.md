---
name: fixtures
description: Guidance for designing and implementing Playwright Test fixtures in the JavaScript automation framework.
---

# Playwright Fixtures Skill

This Skill defines the design, implementation, and lifecycle requirements for custom Playwright Test fixtures in our automation framework. Fixtures must govern dependency injection, setup, and teardown states to maintain clean and independent test specifications.

---

## 1. Fixture Definition
A Playwright fixture is a modular, reusable dependency injected into test execution blocks. In this framework, fixtures are used to:
*   **Establish Dependency Injection**: Automatically instantiate and inject Page Objects or utility configurations into tests, eliminating manual construction boilers.
*   **Encapsulate Lifecycles**: Isolate prerequisite setups and post-test cleanups away from test scenarios.
*   **Maintain State Scoping**: Explicitly control execution context ranges (test-scoped vs. worker-scoped).

## 2. Fixture Responsibilities

### Fixtures MAY:
*   Construct Page Objects and inject them as ready-to-use instances.
*   Provide reusable test setup logic (e.g. seeding dummy databases, navigating to initial areas).
*   Manage controlled test lifecycles (executing cleanup/teardown actions).
*   Provide isolated test dependencies (like specific configuration states or dynamic API contexts).
*   Rebuild or inject authenticated states (e.g., storage states) safely.

### Fixtures Must NOT:
*   **Contain Business Assertions**: Verification checks (`expect()`) must reside only inside test spec files (`*.spec.js`).
*   **Contain Unrelated Business Logic**: Fixtures are adapters, not business scenarios. Do not chain user action steps inside fixtures.
*   **Replace Page Objects**: Do not write direct element selector queries or low-level click/fill actions inside fixtures.
*   **Become Generic Utility Containers**: Stateless helper functions belong in `utils/`.
*   **Store Secrets Directly**: Never hardcode credentials or tokens.
*   **Create Global Mutable State**: Do not share mutable setups that introduce cross-test coupling.

## 3. Our Fixture Architecture
The framework stores all shared custom fixtures in a single entrypoint file:
[`fixtures/test-fixtures.js`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/fixtures/test-fixtures.js)

The current Custom Page Object fixtures include:
*   `loginPage`: Provides a pre-initialized instance of the `LoginPage` class.
*   `productPage`: Provides a pre-initialized instance of the `ProductPage` class.
*   `cartPage`: Provides a pre-initialized instance of the `CartPage` class.

### Test Spec Consumption Example
Tests import the custom `test` wrapper directly from our fixtures module and declare the requested Page Object instances inside the destructuring arguments list:
```javascript
const { test, expect } = require('../../fixtures/test-fixtures');

test('should complete cart additions', async ({ productPage, cartPage }) => {
  // Page Objects are pre-instantiated and ready to use
  await productPage.gotoCategory('/books');
  await productPage.addProductToCartFromListing('Computing and Internet');
  await cartPage.goto();
  await expect(cartPage.getCartRow('Computing and Internet')).toBeVisible();
});
```

## 4. Fixture Scope Rules
Playwright fixtures support two scope levels:
*   **Test Scope** (Default): Destroys and reconstructs the fixture instance for every single test spec. This is the default scoping policy because it preserves complete test isolation.
*   **Worker Scope**: Reuses the setup across multiple tests in the same worker thread.

**Worker scope must only be used when all of the following conditions are met**:
1.  The setup operation is highly expensive (e.g. spinning up a local container or compiling an app).
2.  The shared state can safely be treated as read-only.
3.  Sharing the state does not introduce test-order dependency.
4.  State leakage between tests is fully isolated or prevented.

*Note: Never select worker scope merely to make tests execute faster at the expense of isolation.*

## 5. Fixture Dependency Rules
Fixtures can depend on Playwright's built-in fixtures (`page`, `context`, `browser`, `request`) and other custom fixtures. Declare these dependencies inside the argument list of the fixture definition.

### Page Object Construction Example
```javascript
// Exposing ProductPage as a test-scoped fixture in test-fixtures.js
productPage: async ({ page }, use) => {
  // Construct the Page Object injecting the page context dependency
  const productPage = new ProductPage(page);
  // Pass the instantiated object to the test spec
  await use(productPage);
}
```
*   Always prefer exposing Page Objects through fixtures rather than instantiating classes (`new PageClass(page)`) inside the test specifications.

## 6. Page Object vs. Fixture vs. Utility Decision Matrix

| Layer | Responsibility | Allowed Actions | Prohibited Actions |
| :--- | :--- | :--- | :--- |
| **Page Object** | Encapsulates page-level UI locators and interactions. | Locating inputs, clicking buttons, filling text. | Assertions (`expect()`), business flows, credentials. |
| **Fixture** | Manages dependency injection, setups, and teardown lifecycles. | Class instantiations, caching login states, cleanup scripts. | Assertions, direct selector queries, business actions. |
| **Utility** | Houses stateless calculations or helper transformations. | String formatting, dates parsing, math helpers. | Browser controls, page accesses, assertions. |
| **Test Spec** | Declares target business scenarios and verifications. | Ordering user actions, validating expectations. | Direct element locating, instantiating page classes. |

## 7. Naming Conventions
*   Use camelCase for all fixture names (e.g. `loginPage`, `productPage`, `cartPage`, `authenticatedPage`, `testUser`).
*   Avoid vague names like `helper`, `manager`, `common`, `data`, or `setup` unless there is a clear framework-wide architectural reason.

## 8. Authentication Fixture Guidance
*   For tests requiring a logged-in state, prefer reusing authentication tokens (caching session cookies using Playwright's `storageState`) rather than executing UI logins before every test.
*   **Credentials Security**: Credentials must always be retrieved from environment configuration (`process.env.DEMO_USER_PASSWORD`), never hardcoded.
*   **State Safety**: Ensure that tests mutating user settings (like profile details or checkout histories) do not run concurrently on the same shared credentials to prevent collisions.

## 9. Fixture Lifecycle and Teardown
Use the execution split around `use(...)` to configure setup and cleanup blocks. Playwright guarantees that the teardown block executes even if the test fails.

### Teardown Implementation Example
```javascript
databaseFixture: async ({ page }, use) => {
  // 1. SETUP: Create temporary resources
  const userId = await database.createUser();

  // 2. USE: Pass control to the test
  await use(userId);

  // 3. TEARDOWN: Execute cleanup block (Runs even if test fails)
  await database.deleteUser(userId);
}
```

## 10. Fixture Composition
Tests compose multiple dependencies by declaring fixtures inside the destructured arguments list. Tests must always consume Page Objects through these injected fixtures instead of manually constructing classes inside the spec file (e.g. avoiding `new ProductPage(page)` inside `*.spec.js`).

## 11. Prohibited Anti-Patterns
*   **Assertions in Fixtures**: Writing `expect()` checks inside fixture setups or cleanups.
*   **Hardcoded Secrets**: Hardcoding account passwords in fixture files.
*   **Arbitrary Sleeps**: Inserting `await page.waitForTimeout()` in fixture logic.
*   **Global Mutable State**: Sharing objects across tests that modify global records, leading to test-order dependency.
*   **Silently Modifying State**: Fixtures that modify unrelated records, making debugging non-deterministic.
*   **Bypassing POMs**: Performing low-level element click/fill actions directly in a fixture instead of calling POM methods.

## 12. AI Fixture Design Workflow
When an AI agent is requested to create or update fixtures, follow this workflow:
```text
Define Fixture Requirement
   └── Determine if fixture is the correct abstraction layer
         └── Check existing fixtures in test-fixtures.js (Avoid duplication)
               └── Choose Scope (Test-scoped by default)
                     └── Identify Dependencies (Built-in fixtures & Page Objects)
                           └── Implement setup & teardown code
                                 └── Verify cleanup executes on test failures
                                       └── Consume through test arguments
                                             └── Run focused test & regression suites
```

## 13. Quality Checklist
Before finalizing a fixture implementation, verify:
*   [ ] The `fixtures/` directory was audited to prevent duplication.
*   [ ] Default test-scoping is used unless worker-scoping is explicitly justified.
*   [ ] Fixture dependencies are explicitly declared in the parameter arguments.
*   [ ] Setup and teardown blocks are cleanly separated around `use()`.
*   [ ] No assertions (`expect()`) are written inside the fixture.
*   [ ] No passwords, keys, or secrets are hardcoded.
*   [ ] Teardown blocks clean up created states reliably (even on test failure).
*   [ ] Test-scoped isolation is maintained.
*   [ ] Page Objects are constructed in the fixture and passed to the test.
*   [ ] Fixture name uses camelCase convention.
*   [ ] Test specs consume the fixture without instantiating page classes.
*   [ ] All tests execute and pass successfully.

## 14. AI Agent Restrictions
The AI agent must **never**:
*   Create duplicate fixtures.
*   Put assertions or business scenario logic inside fixtures.
*   Hardcode passwords or credentials.
*   Bypass Page Objects to query selectors directly inside a fixture.
*   Instantiate Page Objects manually inside tests when a fixture exists.
*   Weaken assertions to force fixture validations to pass.
*   Use `page.waitForTimeout()` in fixtures.

## 15. Relationship with Existing Architecture
*   **Permanent Rules** in `.agents/rules/` take precedence over this Skill.
*   **Page Objects** own element locators and page UI interactions.
*   **Fixtures** own dependency injection, lifecycle management, and environment setup.
*   **Tests** own business scenarios and assertions.
*   **Test Data** owns test inputs.
*   **Utilities** own generic, browser-independent helpers.
*   **Knowledge files** own application-specific behavior documentation.
*   **Prompts** own task-specific workflows.
