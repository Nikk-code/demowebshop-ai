---
name: atomic-tests
description: Guidance for designing and implementing focused, independent, and maintainable automated UI tests.
---

# Atomic UI Tests Skill

## 1. Purpose
This Skill governs the design and implementation of focused, independent, and maintainable Playwright UI tests. The core objective is to validate one distinct business behavior per test while avoiding complex dependencies and excessive validation scopes.

## 2. What is an Atomic Test?
An atomic test is a test containing:
*   **One clear business objective**.
*   **Focused setup** (prepares only what is needed).
*   **Focused action** (performs the core interaction).
*   **Focused validation** (asserts the direct result of the action).
*   **Minimal unrelated behavior**.

### Examples:
*   **Good**: *"User can add a product to the shopping cart."* (Tests one action and one outcome).
*   **Bad**: *"User logs in, searches for a product, adds it to the cart, changes shipping address, checks out, verifies order, and logs out."* (Combines authentication, search, cart, checkout, and account profile operations into a single fragile test).

## 3. Test Independence
All tests must be capable of running independently and concurrently. Do not rely on:
*   Another test running or completing first.
*   Application data created by a previous test (unless controlled via shared fixtures).
*   Browser state or cookies left behind by other tests.
*   A specific execution order.
*   Shared mutable global state.

If a test requires prerequisites (e.g., an authenticated session or specific items in the database), establish them explicitly in the test setup or through customized Playwright fixtures.

## 4. Test Structure
Organize test files using the **Arrange-Act-Assert (AAA)** pattern to maximize readability:
*   **Arrange**: Set up prerequisites, variables, test data, and navigate to the starting page.
*   **Act**: Perform the specific UI interaction under test.
*   **Assert**: Verify the direct outcome of the interaction.

*Note: Do not create arbitrary abstractions or utility wrappers just to force all tests into a fixed number of lines.*

## 5. Test Naming
Use descriptive, business-focused test titles that explain the expected behavior:
*   *Prefer*: `"User can add a product to the cart"`, `"User sees validation message for invalid login"`, `"User can remove a product from the cart"`.
*   *Avoid*: `"Test 1"`, `"Add cart test"`, `"Login functionality"`, `"Checkout flow"`.

## 6. Assertions
*   Assertions must directly validate the outcome of the business action under test.
*   Avoid adding redundant, weak, or unrelated assertions that clutter the test execution.
*   Always use Playwright's built-in `expect()` assertions to leverage auto-waiting.
*   Do not remove, weaken, or comment out assertions simply to make a test pass.

## 7. Page Object Usage
*   Tests should consume Page Objects to interact with pages. Do not place raw locators or complex UI step commands directly inside the test specifications.
*   Consult the **pages Skill** for details on Page Object design. This Skill defines how tests consume those Page Objects.
*   Always verify if an existing Page Object method covers the required action before writing new interaction logic.

## 8. Fixture Usage
Use custom Playwright fixtures to isolate reusable setup operations:
*   Authenticated user context.
*   Common database state.
*   Pre-instantiated Page Objects.
*   Standard environment variables.

*Note: Do not use global mutable variables. Avoid creating fixtures for setups that only take one or two lines of normal code.*

## 9. Test Data
*   Separate test data payloads from test execution logic.
*   Use deterministic, stable data where possible.
*   Avoid hardcoding large objects or configuration files inside test specifications.
*   Never share mutable test data objects between concurrently running tests.

## 10. Test Scope
Keep UI tests focused. Unrelated workflows should reside in separate test specifications. For example, keep these scenarios isolated:
*   User Login
*   Search Product
*   Add Product to Cart
*   Remove Product from Cart
*   Wishlist Actions
*   Checkout Process

A test is allowed to perform multiple sequential actions only when they are direct prerequisites to verify the final objective (e.g. `Login -> Search -> Add to Cart -> Verify Cart` for a test validating *"Authenticated user can add a product to the cart"*).

## 11. Duplication
Before writing any new test case, the AI agent must:
1.  Search existing test specifications (`tests/`).
2.  Determine if the behavior is already validated in another suite.
3.  Decide if an existing test should be enhanced or extended instead of creating a new test file.
4.  Do not create tests simply to increase test count.

## 12. State & Data Isolation
Where possible:
*   Rely on independent browser contexts (`browserContext` is isolated by default in Playwright).
*   Use unique testing accounts or transaction data.
*   Avoid modifying shared system configurations or shared state accounts.
*   Clean up testing artifacts or data if the application requires it.

## 13. Negative Tests
Negative validation tests are critical for robust test suites (e.g., verifying error alerts, input validation, unavailable buttons, missing permissions).
*   Do not create negative tests by changing random input parameters.
*   Ensure each invalid state tests a specific, expected business outcome.

## 14. Cross-Browser Considerations
*   Keep tests browser-agnostic.
*   Do not introduce browser-specific conditional execution logic in tests unless there is a confirmed application behavior difference.
*   Do not skip or disable tests in specific browsers without investigating the root cause first.

## 15. AI Test Creation Process
When tasked with writing a new test, the AI must follow these steps:
1.  **Understand**: Define the exact business behavior being tested.
2.  **Inspect**: Check existing tests in the `tests/` directory.
3.  **Confirm**: Ensure equivalent coverage does not already exist.
4.  **Analyze**: Inspect relevant Page Objects and fixtures.
5.  **Identify**: Determine the required test setup and variables.
6.  **Design**: Ensure the test is atomic, independent, and uses Page Objects.
7.  **Implement**: Write the minimal test script required.
8.  **Execute**: Run the specific test using Playwright.
9.  **Diagnose**: Investigate any failure systematically. Do not blindly rewrite the test.
10. **Report**: Summarize the test objective, files created/modified, and validation results.

## 16. Atomic Test Quality Checklist
Before marking a test as complete, verify:
*   [ ] The test verifies a single, clear business objective.
*   [ ] The test has a meaningful, outcome-based title.
*   [ ] The test can run independently of all other tests.
*   [ ] The test conforms to the Arrange-Act-Assert pattern.
*   [ ] All UI interactions are encapsulated in Page Objects.
*   [ ] No raw locators are defined directly in the test file.
*   [ ] Fixtures are used for prerequisite setups (e.g., login).
*   [ ] Assertions are meaningful, robust, and use Playwright's `expect`.
*   [ ] No `waitForTimeout()` calls are used.
*   [ ] No duplicate test coverage is introduced.
*   [ ] The test passes successfully across all configured browsers.

## 17. AI Agent Restrictions
The AI agent must **never**:
*   Write massive end-to-end tests covering multiple unrelated objectives.
*   Generate duplicate test cases.
*   Disable or weaken assertions to make tests pass.
*   Introduce artificial test execution sequence dependencies.
*   Bypass Page Objects to write inline page locator interactions.
*   Create unnecessary fixtures or abstractions.
*   Invent expected behaviors without application verification.

---

> [!IMPORTANT]
> This Skill governs test design. Permanent project Rules in `.agents/rules/` take precedence over this Skill. Page Object implementation details are governed by the `pages` Skill.
