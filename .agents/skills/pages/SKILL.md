---
name: pages
description: Guidance for creating, modifying, and reviewing Playwright Page Objects in the JavaScript automation framework.
---

# Page Object Model Skill

## 1. Purpose
This Skill governs the creation, modification, and review of Page Objects in the Playwright JavaScript framework.

## 2. When to Use
Use this Skill when you need to:
*   Create a new Page Object class.
*   Modify elements or methods inside an existing Page Object.
*   Add a new page interaction flow.
*   Identify where a new selector or page method belongs.
*   Review Page Object structure, naming, or locator strategy.
*   Refactor and consolidate duplicated page interaction logic.

## 3. Page Object Responsibilities
*   **Do**:
    *   Represent a single meaningful page or a reusable UI component.
    *   Contain and encapsulate locators belonging to that page or component.
    *   Expose reusable, high-level business interaction methods.
    *   Hide locator details and raw page operations from the test files.
    *   Expose state properties or methods that tests can query for assertions.
*   **Do Not**:
    *   Contain test assertions (keep checks in the test specification, unless a specific utility assertion is clearly justified).
    *   Model entire test scenarios inside a single page method.
    *   Contain large datasets or unrelated business configuration data.
    *   Duplicate locators or interactions available in other Page Objects.

## 4. Locator Guidelines
Always use stable, user-facing, and accessible locators. Use Playwright's locator APIs in this priority order:
1.  `page.getByRole()`
2.  `page.getByLabel()`
3.  `page.getByPlaceholder()`
4.  `page.getByText()` (when appropriate/stable)
5.  `page.getByTestId()`
6.  CSS Selectors (when semantic options are unavailable)
7.  XPath (only as a last resort)

### Best Practices:
*   Inspect the actual application DOM structure first.
*   Reuse existing locators rather than defining duplicate paths.
*   Avoid selecting via unstable DOM traversal or dynamic generated classes.
*   Never use `page.waitForTimeout()` to handle element synchronization.

## 5. Methods Design
*   **High-Level Actions**: Expose methods representing complete business interactions rather than low-level clicks and keystrokes.
    *   *Prefer*: `login(username, password)`, `addProductToCart(productName)`, `searchProduct(productName)`.
    *   *Avoid*: `clickLoginLink()`, `fillEmailField()`, `clickSubmitButton()` as standalone public methods unless there is a clear modular design reason.
*   **Cohesiveness**: Keep methods focused and reusable. Do not combine unrelated interactions into a single large method.

## 6. Constructor Injection
Use dependency injection to share the Playwright `page` instance.
```javascript
class LoginPage {
  constructor(page) {
    this.page = page;
  }
}
```
*   Do not create browser or context instances inside Page Objects.

## 7. Locator Storage
*   Store commonly reused locators as class properties inside the constructor if it improves readability and maintenance.
    ```javascript
    this.usernameInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    ```
*   Do not create constructor properties for elements that are only clicked once in a specific method; query them inline inside that method to keep the class clean.

## 8. URL & Navigation
Page Objects may include a navigation method if it belongs naturally to the page.
```javascript
async goto() {
  await this.page.goto('/login');
}
```
*   Always use relative URLs. Rely on Playwright's configured `baseURL`.
*   Do not hard-code the host domain inside the Page Object.

## 9. Assertions
*   Tests must own the assertions.
*   Page Object methods should execute the actions and optionally return states/text/locators for the test's `expect` block to verify.
*   Do not obscure assertion verification inside page methods.

## 10. Reuse Check
Prior to creating any new Page Object:
*   Inspect the `pages/` directory.
*   Determine if an existing Page Object represents the same screen.
*   Decide if your proposed methods should be added to an existing Page Object.
*   Never create duplicate classes representing the same application viewport.

## 11. Component Abstractions
If a section of the user interface (e.g., header, navigation bar, footer, search block) is shared across multiple pages:
*   Create a reusable component class (e.g., `HeaderComponent`).
*   Inject or initialize the component inside relevant Page Objects to avoid locator duplication.
*   Do not over-engineer; introduce components only when code reuse justifies it.

## 12. Quality Checklist
Before completing a Page Object implementation, verify:
*   [ ] Correct page/component responsibility partition.
*   [ ] Use of stable, prioritize-ordered locators.
*   [ ] Absence of XPath selectors (unless absolutely required).
*   [ ] Absence of `waitForTimeout()` calls.
*   [ ] Absence of browser/context creation inside the class.
*   [ ] Proper constructor accepting Playwright `page`.
*   [ ] Exposes meaningful high-level methods.
*   [ ] Contains no test scenarios or assertions.
*   [ ] Avoids duplicated selectors or interactions.
*   [ ] Existing tests remain unaffected and pass.

## 13. AI Implementation Process
When tasking an AI to write/update a Page Object:
1.  **Inspect**: Check the actual AUT DOM structure.
2.  **Verify**: Inspect the `pages/` directory for existing Page Objects.
3.  **Review**: Consult standard project rules and context.
4.  **Confirm**: Determine if reuse is possible or extension is needed.
5.  **Identify**: Pinpoint stable locator strategies.
6.  **Implement**: Make the smallest code change required.
7.  **Quality Check**: Validate code against the checklist above.
8.  **Execute**: Run relevant tests to confirm execution is clean.
9.  **Report**: Deliver a summary of changed code and test execution results.

---

> [!IMPORTANT]
> This Skill provides architectural guidelines for Page Objects. It does not override the permanent rules in `.agents/rules/`. In the event of any conflict, project Rules take precedence.
