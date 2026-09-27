# Reusable AI Template: Create or Update Test Data

This prompt template guides an AI coding agent on evaluating, designing, implementing, and validating reusable test data in this automation framework.

---

## 1. OBJECTIVE
Create or update reusable test data structures based on the target requirements, keeping data values isolated from test execution behavior, Page Objects, and custom fixtures.

## 2. INPUT
The target requirement for this run is:
```text
TEST_DATA_REQUIREMENT: "${TEST_DATA_REQUIREMENT}"
```

## 3. PRE-CONDITIONS
Before writing code or files:
*   Inspect the repository structure, specifically `test-data/` and `tests/`.
*   Read and apply project rules in [`.agents/rules/`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/.agents/rules/).
*   Load and review the **test-data Skill** ([`test-data/SKILL.md`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/.agents/skills/test-data/SKILL.md)), **pages Skill** ([`pages/SKILL.md`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/.agents/skills/pages/SKILL.md)), and **fixtures Skill** ([`fixtures/SKILL.md`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/.agents/skills/fixtures/SKILL.md)).
*   Inspect existing test specs that might already utilize similar data.
*   Consult application documentation in `knowledge/`.
*   Inspect the live application DOM state if catalog validation is required.

## 4. EXISTING DATA ANALYSIS
Before implementing:
*   Verify if the requested data already exists in the `test-data/` directory.
*   Determine if an existing data object can be extended or refactored instead of creating a new module.
*   Do not create duplicate data definitions. If equivalent values exist, report them and reuse.

## 5. DATA VERIFICATION
*   For all application-specific data (such as product titles, categories, shipping methods, and button values), verify that the data matches actual, live application state.
*   Do not invent catalog values or mock parameters.

## 6. DATA CLASSIFICATION
Classify the requested data:
*   **Static application data**: Immutable catalog values (belongs in `test-data/*.js` or `test-data/*.json`).
*   **Dynamic runtime data**: Unique values generated at execution (belongs in runtime test generators or `utils/`).
*   **Credentials & secrets**: Sensitive tokens/passwords (must reside exclusively in environment variables).
*   **Environment-specific data**: Base URLs or environment options (belongs in config or `.env`).

## 7. STORAGE DECISION
Apply these rules to determine the storage layer:
*   Use `test-data/` files for reusable, structured data shared across multiple specs.
*   Keep small, single-use variables (e.g. single product names or categories used in one spec) inline in the test file.
*   Use environment variables (`process.env`) for passwords and secrets. Never place credentials in `test-data/` or test files.

## 8. TEST DATA STRUCTURE
*   Organize external data files under `test-data/` into semantic, domain-oriented modules (e.g. `test-data/products.js`, `test-data/users.js`, `test-data/checkout.js`).
*   Do not create generic, monolithic dumping grounds (like `testData.js` or `commonData.json`).

## 9. IMMUTABILITY
*   Protect reusable static data from accidental runtime mutations.
*   Apply `Object.freeze()` on all exported test-data properties as defined in the **test-data Skill**.
*   Export data as read-only constants.

## 10. DYNAMIC DATA
*   For unique attributes (such as dynamic user registration emails, timestamps, or unique IDs), compute the values at runtime rather than hardcoding static values.
*   Evaluate whether runtime generators belong inline within the test or as helper functions inside `utils/`.

## 11. SECRETS
*   **Never** hardcode passwords, API keys, tokens, or personal secrets in source files or data files.
*   All sensitive values must be loaded dynamically using environment variables (`process.env`).

## 12. TEST DATA VS PAGE OBJECT VS FIXTURE VS UTILITY VS TEST
Refer to this decision matrix:
*   **Test Data**: Holds static values, routes, and scenario parameters.
*   **Page Object**: Owns UI elements, locators, and actions.
*   **Fixture**: Exposes dependencies, page object setups, and lifecycles.
*   **Utility**: Houses stateless calculations and browser-independent helpers.
*   **Test**: Declares target business flows and checks outcomes (assertions).

## 13. NAMING CONVENTIONS
*   Use descriptive, camelCase keys (e.g. `computingAndInternet`, `checkoutAddress`, `registeredUser`).
*   Avoid vague or numbered suffixes (e.g. `product1`, `user1`, `data1`).

## 14. AI TEST-DATA CREATION WORKFLOW
Follow these steps:
1.  Analyze requirements and classify the data type.
2.  Audit existing `test-data/` modules for duplicates or extendable schemas.
3.  Cross-reference live page DOM contexts to verify catalog details.
4.  Determine correct storage location (inline, external file, or environment variables).
5.  Structure the module, protecting reusable static data with `Object.freeze()`.
6.  Import and consume data inside target tests.
7.  Execute tests locally via Playwright.
8.  Audit the diff to ensure no secrets are exposed.

## 15. UPDATING KNOWLEDGE
If your live application investigation discovers new locator paths or application behavior facts, determine if the relevant knowledge files in `knowledge/` (specifically `knowledge/locators/application-locators.md`) should be updated. Do not create duplicate files.

## 16. VALIDATION
*   Run the specific test suite affected by the changes.
*   Run broader regression suites (e.g. `tests/smoke.spec.js`) to confirm stability.
*   Never modify tests or weaken assertions to force validation passes.

## 17. OUTPUT
Include a final execution report detailing:
*   Created or modified test-data modules.
*   Exact properties and structures exposed.
*   Verification steps executed against the live application.
*   Executed test specs and output results.
*   Discovered application constraints or unresolved gaps.

## 18. STOP CONDITIONS
Immediately pause and request clarification from the user if:
*   The `TEST_DATA_REQUIREMENT` is ambiguous.
*   Catalog values cannot be verified against the live application.
*   Credentials or keys are required but missing.
*   Requested changes conflict with permanent project rules.

## 19. QUALITY CHECKLIST
Before completing:
*   [ ] Existing data files searched for duplicates.
*   [ ] Data classification resolved successfully.
*   [ ] Product details or URLs verified against live site.
*   [ ] Correct storage layer selected (inline vs external vs config).
*   [ ] No passwords, keys, or secrets are written to files.
*   [ ] Static data objects are frozen via `Object.freeze()`.
*   [ ] Naming conventions follow camelCase rules.
*   [ ] No Playwright locator or action commands are written in data modules.
*   [ ] Affected tests run and passed.
*   [ ] Baseline regression tests run and passed.
*   [ ] Final diff reviewed.

## 20. AI AGENT RESTRICTIONS
The AI agent must **never**:
*   Commit secrets or hardcoded passwords to source control.
*   Write assertions or locators inside test data files.
*   Construct shared mutable state.
*   Move small, single-use strings out of tests into external files.
*   Create a generic dumping ground file.

---

> [!IMPORTANT]
> The permanent rules inside [`.agents/rules/`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/.agents/rules/) take precedence over this prompt template. In the event of any conflict, project Rules take precedence.
