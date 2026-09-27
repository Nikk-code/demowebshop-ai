# Reusable AI Template: Create New Page Object

This prompt template guides an AI coding agent on designing, implementing, and validating a new Playwright JavaScript Page Object.

---

## 1. OBJECTIVE
Create a clean, maintainable, and standard-compliant Playwright Page Object in JavaScript for the application page or UI component specified in the user requirement.

## 2. INPUT
The target requirement for this run is:
```text
PAGE_REQUIREMENT: "${PAGE_REQUIREMENT}"
```

## 3. PRE-CONDITIONS
Before writing code or creating files:
*   Inspect the workspace's existing structure and Page Objects under the `pages/` directory.
*   Consult the **pages Skill** ([`pages/SKILL.md`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/.agents/skills/pages/SKILL.md)) for framework design patterns.
*   Consult the project rules inside [`.agents/rules/`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/.agents/rules/) (specifically `project-context.md`, `playwright-rules.md`, `coding-standards.md`, and `ai-agent-rules.md`).
*   Verify if an equivalent Page Object class already exists. Do not create duplicate classes representing the same viewport or DOM region.
*   Determine if the requested functionality can be integrated into an existing class rather than creating a new file.

## 4. INVESTIGATION
Inspect the target application state to map elements and actions:
*   Identify the target page URL and check if relative navigation pathing is feasible.
*   Explore the page DOM hierarchy to discover semantic attributes, labels, and roles.
*   Identify reusable structural blocks (e.g., standard headers, forms) that can be extracted into reusable component layers.
*   **Do not invent application behavior**. Rely strictly on live inspections or verified workspace files.

## 5. IMPLEMENTATION RULES
The generated file must adhere to these structural criteria:
*   Written in clean, modern JavaScript.
*   Uses constructor dependency injection (`constructor(page) { this.page = page; }`) to accept the Playwright `page` runner instance.
*   Do not instantiate custom contexts or browser runtimes inside the class.
*   Follow JavaScript naming standards: PascalCase for class declarations; camelCase for variables, attributes, and methods.
*   Use relative URLs in navigation methods (rely on `baseURL` configuration). Do not hardcode host domains.
*   Keep page interactions focused. Do not mix unrelated domains or store complex static test datasets in the page file.
*   Do not write test assertions or full test scenarios inside Page Object actions.

## 6. LOCATOR STRATEGY
Follow the prioritized locator strategy defined in the project's **pages Skill**:
1.  `page.getByRole()`
2.  `page.getByLabel()`
3.  `page.getByPlaceholder()`
4.  `page.getByText()` (when appropriate/stable)
5.  `page.getByTestId()`
6.  CSS Selectors
7.  XPath (only as a last resort)

*   Avoid brittle DOM traversals and dynamically generated classes.
*   Do not use `page.waitForTimeout()` for synchronization.

## 7. PAGE OBJECT DESIGN
*   Design actions as unified, atomic business-level methods (e.g., `login(user, pass)` or `addProductToCart(productName)`) rather than low-level click/fill actions (e.g., `clickSubmit()`), unless there is a clear modular design requirement.
*   Keep methods cohesive and refactored. Avoid building giant, non-reusable methods.

## 8. VALIDATION
After implementation, you must:
1.  Verify the new class against the **pages Skill quality checklist**.
2.  Verify there is no duplicate coverage.
3.  Check syntax and execution path imports.
4.  Run the smallest relevant automated test suite first (e.g., running `npx playwright test <spec_file>`) to confirm the Page Object performs as expected.
5.  Run broader regression suites if applicable.
6.  Investigate any failure. Do not weaken assertions or disable tests to force validation.

## 9. OUTPUT
Provide a completion report containing:
*   Name of the created/modified Page Object.
*   Absolute file path.
*   Selected locator keys and rationale.
*   Exposed public methods.
*   Design decisions.
*   Tests executed and output result.
*   Unresolved warnings or context gaps.

## 10. STOP CONDITIONS
Immediately pause and request clarification from the user if:
*   The page context or `PAGE_REQUIREMENT` is ambiguous.
*   Multiple existing Page Object files conflict on element ownership.
*   The actual application DOM structure is unreachable or cannot be verified.
*   Important credentials or setup steps are missing.

---

> [!IMPORTANT]
> The permanent rules inside [`.agents/rules/`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/.agents/rules/) take precedence over this prompt template. In the event of any conflict, project Rules take precedence.
