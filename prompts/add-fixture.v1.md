# Reusable AI Template: Add Playwright Fixture

This prompt template guides an AI coding agent on evaluating, designing, implementing, and validating a new Playwright Test fixture.

---

## 1. OBJECTIVE
Create a reusable, maintainable Playwright Test fixture only when the requirement benefits from custom setup/teardown, state isolation, dependency injection, or browser/page lifecycle control. Avoid creating redundant or unnecessarily complex fixtures.

## 2. INPUT
The target requirement for this run is:
```text
FIXTURE_REQUIREMENT: "${FIXTURE_REQUIREMENT}"
```

## 3. PRE-CONDITIONS
Before implementing code:
*   Inspect existing fixtures inside the `fixtures/` directory (specifically [`fixtures/test-fixtures.js`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/fixtures/test-fixtures.js)).
*   Inspect existing Page Objects (`pages/`) and test specifications (`tests/`).
*   Consult the project rules inside [`.agents/rules/`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/.agents/rules/) (specifically `project-context.md`, `playwright-rules.md`, `coding-standards.md`, and `ai-agent-rules.md`).
*   Load and review the **fixtures Skill** ([`fixtures/SKILL.md`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/.agents/skills/fixtures/SKILL.md)), **pages Skill** ([`pages/SKILL.md`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/.agents/skills/pages/SKILL.md)), and **atomic-tests Skill** ([`atomic-tests/SKILL.md`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/.agents/skills/atomic-tests/SKILL.md)).

## 4. NECESSITY CHECK
Verify that a fixture is the correct abstraction for this requirement:
*   Does it require setup/cleanup lifecycle management?
*   Does it inject page object dependencies?
*   Does it provide an isolated browser context or authentication state?
*   If the code is a pure helper function with no Playwright lifecycle ties, it belongs in `utils/`.
*   If the code is a direct page element interaction, it belongs in a Page Object under `pages/`.
*   *If a fixture is not the correct abstraction, stop and report why.*

## 5. EXISTING FIXTURE ANALYSIS
*   Review all currently defined fixtures.
*   Determine if the requested functionality overlaps with an existing fixture.
*   Check if an existing fixture can be extended or customized instead of creating a new one.
*   Do not create duplicate fixtures that provide the same dependency or resource.

## 6. FIXTURE DESIGN
Formulate a clean design:
*   Define the exact resource the fixture will expose.
*   Determine the actions required for setup (pre-test) and cleanup (post-test).
*   Specify required dependencies.
*   Ensure the fixture has a narrow, single responsibility. Do not build "god fixtures" that bundle unrelated workflows.

## 7. SCOPE DECISION
Choose the correct scope for execution:
*   **Test Scope** (Default): Destroys and recreates the state per test. This preserves test isolation.
*   **Worker Scope**: Reuses the setup across multiple tests in the same worker thread. Use only for highly expensive, read-only operations.
*   *You must explicitly document and justify the chosen scope.*

## 8. DEPENDENCIES
*   Incorporate Playwright's built-in fixtures (`page`, `context`, `browser`, `request`) as dependencies.
*   Do not manually instantiate browsers or context elements unless required by architecture.
*   Ensure fixture dependencies are explicitly declared. Avoid circular dependency chains.

## 9. IMPLEMENTATION
*   Implement the fixture extending the base runner using Playwright's `test.extend()` mechanism in [`fixtures/test-fixtures.js`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/fixtures/test-fixtures.js) (or create a modular fixture module if requested).
*   Use descriptive, camelCase naming conventions.
*   Do not write test assertions inside the fixture setup/cleanup code.
*   Do not hardcode secrets or credentials; retrieve them from environment variables (`process.env`).

## 10. TEST USAGE
Demonstrate how a test spec imports and consumes this fixture.
```javascript
const { test, expect } = require('../../fixtures/test-fixtures');

test('example scenario', async ({ ${FIXTURE_NAME} }) => {
  // Use the injected fixture dependency
});
```
*   Ensure that injecting the fixture does not obscure the core business workflow of the test.

## 11. VALIDATION
After implementation, you must:
1.  Verify the fixture code against the **fixtures Skill quality checklist**.
2.  Check code syntax, module exports, and relative paths.
3.  Execute tests that consume the fixture using Playwright (`npx playwright test`).
4.  Ensure that existing tests remain stable and pass.
5.  Diagnose failures systematically without weakening validations.

## 12. OUTPUT
Provide a completion report containing:
*   Fixture requirement.
*   Fixture name and scope.
*   Modified or created file paths.
*   Explicit dependencies.
*   Setup and cleanup lifecycle actions.
*   Reasoning for the abstraction selection.
*   Example test usage.
*   Tests executed and results.

## 13. STOP CONDITIONS
Immediately pause and request clarification from the user if:
*   The `FIXTURE_REQUIREMENT` is ambiguous.
*   Multiple existing fixtures conflict on responsibilities.
*   The required setup/cleanup lifecycle is unknown or risky.
*   Target application state changes are undocumented.

---

> [!IMPORTANT]
> The permanent rules inside [`.agents/rules/`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/.agents/rules/) take precedence over this prompt template. In the event of any conflict, project Rules take precedence.
