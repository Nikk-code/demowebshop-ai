# Reusable AI Template: Create New Playwright UI Test

This prompt template guides an AI coding agent on designing, implementing, and validating a new atomic Playwright UI test.

---

## 1. OBJECTIVE
Create a focused, independent, and maintainable Playwright UI test in JavaScript to validate the single business behavior specified in the user requirement.

## 2. INPUT
The target requirement for this run is:
```text
TEST_REQUIREMENT: "${TEST_REQUIREMENT}"
```

## 3. PRE-CONDITIONS
Before writing code or creating files:
*   Inspect existing tests in the `tests/` directory.
*   Inspect existing Page Objects in the `pages/` directory.
*   Inspect custom fixtures in `fixtures/` and test data files in `test-data/`.
*   Consult the project rules inside [`.agents/rules/`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/.agents/rules/) (specifically `project-context.md`, `playwright-rules.md`, `test-design-rules.md`, `coding-standards.md`, and `ai-agent-rules.md`).
*   Load and review the **atomic-tests Skill** ([`atomic-tests/SKILL.md`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/.agents/skills/atomic-tests/SKILL.md)), **pages Skill** ([`pages/SKILL.md`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/.agents/skills/pages/SKILL.md)), and **fixtures Skill** ([`fixtures/SKILL.md`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/.agents/skills/fixtures/SKILL.md)).
*   Do not assume that the required element locators, Page Objects, or fixtures already exist.

## 4. REQUIREMENT ANALYSIS
Analyze the target business requirement:
*   Identify the exact business objective.
*   Distinguish between **required setup** (e.g. user authentication, database states) and the **actual behavior** being verified. Do not verify setup steps as separate business goals.
*   Specify required page state, user role, and test variables.

## 5. EXISTING COVERAGE CHECK
Verify that duplicate coverage is not introduced:
*   Search the `tests/` directory to check if the behavior is already validated.
*   Determine if an existing test should be enhanced or extended instead of creating a new file.
*   Confirm if existing Page Objects and custom fixtures can be reused to provide the required interactions and setups.

## 6. TEST DESIGN
Align implementation with the **atomic-tests Skill**:
*   The test must verify **one clear business objective**.
*   Structure the test body using the **Arrange-Act-Assert** pattern.
*   Assign a descriptive, outcome-oriented test title.
*   Ensure the test is fully independent and can run concurrently. Do not introduce sequence dependencies or share mutable states between tests.
*   Do not combine multiple unrelated user flows.

## 7. PAGE OBJECT AND FIXTURE USAGE
*   Use Page Objects to encapsulate UI actions. Do not write raw locators or action commands directly in test specifications.
*   Inject Page Objects using custom fixtures. Do not construct classes manually inside the test body if the fixture architecture supports them.
*   If a Page Object or fixture is missing, verify if it is genuinely required. Do not silently create complex files; report the missing dependency and follow appropriate creation workflows.

## 8. TEST DATA
*   Check the `test-data/` directory before defining new payloads.
*   Reuse deterministic test data where appropriate.
*   Do not hardcode secrets (like user passwords) inside source code. Always load secrets from environment variables (`process.env`).
*   Keep large data payloads decoupled from the test logic.

## 9. IMPLEMENTATION
*   Create the test inside the appropriate subdirectory under `tests/` (e.g., `tests/login/`).
*   Use clean, modern JavaScript.
*   Import `test` and `expect` from the project's custom fixtures file ([`fixtures/test-fixtures.js`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/fixtures/test-fixtures.js)) instead of `@playwright/test` directly, if custom Page Objects or setups are used.
*   Do not write custom sleep commands or `page.waitForTimeout()`.
*   Avoid adding unrelated code refactoring.

## 10. ASSERTIONS
*   Assert the expected business outcome using Playwright's `expect()` matcher.
*   Prefer user-visible, accessible elements (headers, confirmation labels, success indicators).
*   Avoid asserting raw implementation parameters.
*   Never weaken, comment out, or delete assertions to force validation passes.

## 11. VALIDATION
After implementation, you must:
1.  Verify the spec file against the **atomic-tests Skill quality checklist**.
2.  Verify Page Object usage complies with the **pages Skill**.
3.  Verify fixture configuration complies with the **fixtures Skill**.
4.  Confirm imports, relative paths, and JavaScript syntax.
5.  Execute the specific test using Playwright (`npx playwright test <path_to_spec>`) and verify it passes.
6.  Investigate any test failure systematically before modifying code.
7.  Run the broader test suites if the individual test passes.

## 12. OUTPUT
Provide a completion report containing:
*   Business requirement being validated.
*   Created test file path.
*   Test objective description.
*   Reused/created Page Objects, fixtures, and test data.
*   Selected assertions.
*   Tests executed and results.
*   Unresolved issues or configuration gaps.

## 13. STOP CONDITIONS
Immediately pause and request clarification from the user if:
*   The `TEST_REQUIREMENT` is ambiguous.
*   The expected application behavior cannot be determined.
*   Required test data or credentials cannot be resolved safely.
*   The proposed test duplicates an existing test spec.

---

> [!IMPORTANT]
> The permanent rules inside [`.agents/rules/`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/.agents/rules/) take precedence over this prompt template. In the event of any conflict, project Rules take precedence.
