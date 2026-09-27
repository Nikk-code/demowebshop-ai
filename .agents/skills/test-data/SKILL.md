---
name: test-data
description: Guidance for designing and implementing test data in the JavaScript automation framework.
---

# Test Data Management Skill

This Skill defines the standards for creating, selecting, managing, and maintaining test data in our Playwright UI automation framework. Separating test data from test behavior and Page Objects ensures tests are isolated, maintainable, and secure.

---

## 1. Purpose of Test Data Separation
Decoupling test data from test execution logic prevents tests from breaking due to simple content updates, simplifies the management of dynamic environments, and prevents the storage of configuration parameters or secrets in automation source code.

## 2. Categories of Test Data
We categorize test data into the following distinct types:
*   **Static Test Data**: Immutable catalog values that do not change between runs (e.g. standard category names: `'/books'`, `'/computers'`).
*   **Scenario-Specific Data**: Specific parameters required to execute a business logic flow (e.g. quantity `= 1`, targeting product `productName = 'Computing and Internet'`).
*   **Generated (Dynamic) Data**: Data created at runtime to ensure uniqueness and prevent collision during parallel execution (e.g. unique registration email: `testuser_17180000@example.com`).
*   **Environment-Specific Data**: URLs and site attributes that vary between environments (e.g. base URLs, database profiles).
*   **Credentials & Secrets**: Sensitive authorization details (passwords, tokens, API keys).

## 3. Storage Location Matrix
Refer to the following storage guidelines:

| Data Type | Primary Storage Location | Example |
| :--- | :--- | :--- |
| **Small, Scenario-Specific Data** | Inline inside test file (`*.spec.js`) | `const productName = 'Computing and Internet';` |
| **Reusable Catalog Data** | `test-data/` subdirectory (JS or JSON) | `test-data/products.json` |
| **Sensitive Secrets / Logins** | Environment variables (`process.env`) | `process.env.DEMO_USER_PASSWORD` |
| **Environment Settings** | Playwright config or `.env` files | `baseURL: 'https://demowebshop.tricentis.com/'` |
| **Application Context** | `knowledge/` subdirectory | Mapping verified DOM element behavior |

## 4. Small Inline Data
*   Simple, scenario-specific variables that do not affect other test files should remain inline within the spec file to preserve readability.
*   *Example*: `const quantity = 1;` or `const category = '/books';`.
*   **Maintainability Threshold**: If a dataset is used across multiple separate test files, or contains more than 5 distinct data structures, it must be extracted out of the test file into the `test-data/` folder.

## 5. Reusable Data (JS vs. JSON)
When storing reusable data in `test-data/`:
*   **Use JSON (`*.json`)** when the dataset is purely static, structured, and flat. This is language-agnostic and easy to parse.
*   **Use JavaScript (`*.js`)** when the data requires minimal logic, dynamic generation parameters (e.g., generating timestamp-based emails), or functions to extract specific items.
*   Export datasets as constants and freeze them (`Object.freeze()`) to prevent accidental runtime mutations.

## 6. Dynamic Data Generation
*   Generate data dynamically only when necessary to prevent state collisions (e.g., creating a unique email for user registration tests).
*   Use deterministic, static data for all other fields. Do not inject random inputs (e.g. random product categories or random quantities) as this makes test failures difficult to reproduce.
*   *Example of dynamic email generation*:
    ```javascript
    const uniqueEmail = `testuser_${Date.now()}@example.com`;
    ```

## 7. Test Independence & State Isolation
Test data must support parallel execution and isolation:
*   **No Dependency Chains**: A test must never rely on another test to create or seed its data.
*   **No Shared Mutable State**: If multiple tests import the same test data module, they must treat the data as read-only.
*   **Unique Accounts**: Concurrent tests that mutate user states (such as adding items to the cart or completing checkout) should run on separate accounts to prevent cart pollution.

## 8. Data Mutation Controls
To prevent tests from polluting shared test data arrays:
*   Treat imported data as immutable constants.
*   If a test must modify a dataset structure, create a deep clone before applying changes:
    ```javascript
    const testData = JSON.parse(JSON.stringify(importedProductData));
    ```

## 9. Secrets and Credentials
*   **NEVER** hardcode passwords, API keys, tokens, or personal secrets in test scripts, Page Objects, custom fixtures, test-data files, or markdown documentation.
*   Always load secrets at runtime using environment variables (`process.env.SECRET_NAME`).
*   Configure mock data placeholder configurations in `.env.example` files to guide contributors without disclosing actual keys.

## 10. Environment-Specific Data
*   Site URLs, ports, and configuration profiles must be configured in `playwright.config.js` or loaded from `.env` files.
*   Do not hardcode environment profiles inside test logic.

## 11. Application Knowledge vs. Test Data
It is critical to distinguish between application knowledge and test data:
*   **Application Knowledge** (`knowledge/`): Verified information regarding the application under test (e.g. documenting that the "Books" category page displays product cards with a `.product-item` class). This describes *how* the application behaves.
*   **Test Data** (`test-data/`): Data parameters used to drive a specific scenario (e.g. choosing the string `"Computing and Internet"` to add to the cart). This describes *what* goes into the test.

## 12. Data-Driven Tests
*   Use data-driven testing (parameterized loops) when multiple equivalent datasets validate the same business logic flow.
*   *Example*: Verifying that different product categories (Books, Computers, Electronics) display listing pages correctly.
*   Do not parameterize tests if the validations require distinct, custom validation steps.

## 13. Test Data Naming Conventions
*   Use descriptive, self-explanatory variable names:
    *   `productName` instead of `name` or `text`.
    *   `targetQuantity` instead of `num` or `qty`.
    *   `registrationPayload` instead of `user`.

## 14. AI Data Selection Workflow
When selecting data for a test, the AI agent must follow this process:
```text
Identify Required Inputs
   └── Check existing test-data/ (Audit for reuse)
         └── Check application knowledge (Verify data validity)
               └── Select Storage Location (Inline vs external)
                     └── Configure Uniqueness (Dynamic email if registering)
                           └── Verify Isolation (Clean context per run)
```

## 15. Data Quality Rules
All test datasets must be:
*   **Deterministic**: Perform predictably across runs.
*   **Minimal**: Store only the properties required to execute the test.
*   **Isolated**: Independent of other runs or parallel threads.
*   **Valid**: Contain real, verified application catalog parameters.

## 16. Anti-Patterns
*   **Hardcoding Passwords**: Placing a test account password inside a JSON data file.
*   **Over-Randomization**: Generating random product quantities (e.g., `Math.random()`) inside a cart test.
*   **Hiding Data in POMs**: Storing test data constants (like product name strings or default logins) inside Page Object classes.
*   **Huge JSON payloads**: Creating 500-line JSON lists for a test that only consumes 2 products.
*   **Shared Mutable Pools**: Modifying a shared test array that causes subsequent tests to fail depending on execution order.

## 17. Quality Checklist
Before finalizing test data implementation, verify:
*   [ ] No passwords, keys, or credentials are committed to source files or JSON data files.
*   [ ] Secrets are loaded strictly via `process.env`.
*   [ ] Inline variables (e.g. `productName = 'Computing and Internet'`) are used only for small, localized tests.
*   [ ] Reusable arrays are stored under the `test-data/` folder.
*   [ ] Shared data objects are frozen or cloned to prevent mutation.
*   [ ] User accounts and emails generated dynamically are unique to avoid collision.
*   [ ] Playwright base URLs are loaded from the config file, not hardcoded.
*   [ ] Datasets contain only minimal, required properties.
*   [ ] Parameterized tests verify equivalent loops, not unrelated behaviors.

## 18. AI Agent Restrictions
The AI agent must **never**:
*   Commit actual credentials or secrets to source control.
*   Place test data attributes inside Page Object files.
*   Randomize test variables unnecessarily.
*   Move small, single-use strings out of test files into JSON files.
*   Establish data structures that couple test execution sequences.

---

> [!IMPORTANT]
> The permanent rules inside [`.agents/rules/`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/.agents/rules/) take precedence over this Skill. In the event of any conflict, project Rules take precedence.
