---
name: knowledge
description: Guidance for discovering, verifying, updating, maintaining, and using application-specific knowledge in this framework.
---

# Application Knowledge Management Skill

This Skill defines the requirements for discovering, verifying, updating, maintaining, and consuming application-specific knowledge in our automation framework. Standardizing how application context is logged ensures that future AI agents can navigate target viewports, selectors, and business flows with high predictability.

---

## 1. Purpose of the Knowledge Base
The knowledge base under `knowledge/` houses verified, durable facts about the Application Under Test (AUT). It catalogs application behaviors, paths, login workflows, locator strategies, constraints, and asynchronous behaviors. 
*   **Durable Context**: Knowledge documents represent structural context; they are not executable code files.
*   **Constraint Preservation**: Captures quirks or constraints (e.g. AJAX latency or field uniqueness) to guide automated test design.

## 2. Knowledge Architecture
The knowledge base is structured into five distinct directories. Do not introduce additional top-level directories without an explicit architectural justification:

*   **`knowledge/application/`**: Documents general application context, page listings, navigation endpoints, authentication states, business flows, and automation constraints.
*   **`knowledge/decisions/`**: Houses Architecture Decision Records (ADRs) that document framework design choices and technical boundaries.
*   **`knowledge/history/`**: Records historical discoveries, legacy workflows, or system changes useful for understanding the evolution of application behavior.
*   **`knowledge/locators/`**: Documents verified stable locator strategies and accessible selector priorities.
*   **`knowledge/test-design/`**: Documents application-specific testing patterns, validation scopes, and regression parameters.

## 3. Knowledge vs. Code vs. Rules vs. Skills vs. Prompts

| Layer | Purpose | Content | Allowed Actions |
| :--- | :--- | :--- | :--- |
| **Rules** | Permanent engineering boundaries. | Coding standards, locator priorities. | Directing developer/AI behavior. |
| **Skills** | Permanent specialized implementation guidance. | Page Object design patterns, assertions guidelines. | Outlining checklists and design rules. |
| **Prompts** | Task-specific AI workflows. | Execution step templates. | Executing one-shot file operations. |
| **Knowledge** | Verified application-specific facts. | URLs, paths, locator strategies, constraints. | Documenting app state and behaviors. |
| **Page Objects** | Executable UI selectors & actions. | Class wrappers, element interactions. | Navigating, clicking, inputting. |
| **Fixtures** | Dependency injection & lifecycles. | Class instantiations, setup/teardowns. | Injecting pre-initialized dependencies. |
| **Test Data** | Reusable input values. | Static variables (names, quantities). | Feeding data parameters to specs. |
| **Tests** | Business scenarios & assertions. | Arrange-Act-Assert scripts. | Verifying business outcomes. |

## 4. Source of Truth
Acceptable sources of application knowledge are:
1.  **Live Application DOM**: Direct DOM inspections of the target application.
2.  **Observed Browser State**: Playwright execution logs, trace viewers, or page logs.
3.  **Verified Spec Files**: Existing tests that consistently execute successfully in the repository.
4.  **Verified Page Objects**: Standard, active Page Object wrappers.

The AI must explicitly distinguish information using the following categories. Never present Likely or Unknown statements as Verified Facts:
*   **Verified Fact**: Information confirmed through live inspection, execution traces, or working code.
*   **Assumption**: Hypotheses based on generic site structures that have not been tested.
*   **Unknown**: Missing or uninvestigated behaviors.

## 5. Discovery Workflow
When discovering new application features or locators, apply this flow:
```text
Identify Requirement
   └── Search existing knowledge (Verify if already documented)
         └── Inspect existing implementation (Page Objects and spec files)
               └── Inspect application behavior (Verify live page DOM state)
                     └── Verify discovery (Run validation execution)
                           └── Classify knowledge (Assign to correct directory)
                                 └── Check for duplicate files (Confirm no duplication)
                                       └── Update existing files (Prefer modifying over creating)
                                             └── Record metadata (Log discovery URL, date, status)
                                                   └── Validate affected automation & review diff
```

## 6. Existing Knowledge First
Before creating any new documentation file:
*   Always search `knowledge/` to check if a document already covers the target page, component, or flow.
*   Evaluate if the new context should be appended to an existing file (e.g., adding a newly verified checkout locator to `application-locators.md`).
*   **Never create duplicate files** containing overlapping selectors or workflows.

## 7. Verification Rules
*   Never document locators, redirect paths, or business sequences based on assumptions.
*   Verify every selector by inspecting the live DOM or checking Playwright trace outputs before logging.
*   Verify complex workflows (such as cart additions or AJAX counts) by executing small automated scripts or inspecting network requests.

## 8. Locator Knowledge
Log locator guidelines only for important, stable targets.
*   **Priority**: accessibility roles (`page.getByRole()`), labels (`page.getByLabel()`), placeholders (`page.getByPlaceholder()`), text (`page.getByText()`), and test IDs (`page.getByTestId()`).
*   Avoid documenting volatile CSS classes, nested indices, or dynamic attributes (like auto-incrementing database IDs).
*   **Log Details**: Element purpose, strategy, target, verification status, known constraints, discovery date, and review date.

## 9. Knowledge Metadata
Every knowledge file must include the following metadata headers at the top or bottom of the document:
```markdown
---
*   **Discovery Date**: YYYY-MM-DD
*   **Application URL**: [Target AUT URL]
*   **Source**: Live application inspection | Execution traces
*   **Verification Status**: Verified | Likely | Unknown
*   **Last Reviewed Date**: YYYY-MM-DD
---
```
*Note: Do not invent metadata fields or use placeholder dates; use the actual execution date.*

## 10. Knowledge Freshness & Stale Resolution
When automation fails because documented knowledge appears outdated:
1.  **Do not modify the test spec immediately** to bypass the failure.
2.  systematically diagnose the failure cause:
    *   *Did the application change?* (DOM structural change, route update).
    *   *Is the knowledge stale?* (Documented locator no longer matches).
    *   *Is the automation script incorrect?* (Incorrect Page Object call or timing issue).
    *   *Is the environment unstable?* (Transient network delay).
3.  Update the appropriate layer (code vs. knowledge) only after verifying the root cause.

## 11. Knowledge Update Rules
*   **Modify an existing file** when the new discovery extends or corrects an existing category (e.g. adding a product field selector to `application-locators.md`).
*   **Create a new file** only when the topic covers a completely separate application area (e.g. adding a new Payment Gateway integration subpage) and merging it would make existing documents confusing.

## 12. History Recording
*   Use `knowledge/history/` only to record major, automation-impacting structural updates (e.g., a complete redesign of the checkout flow, or deprecation of a browser support policy).
*   Do not log minor text adjustments, spelling corrections, or simple locator updates in history.

## 13. Application vs. Framework Knowledge
Keep application details and framework rules strictly separated:
*   **Application Knowledge** (`knowledge/`): Domain context (e.g., "The cart is empty when no cookies are active").
*   **Framework Knowledge** (`.agents/`): Architectural rules (e.g., "Page Objects must inject page via constructor").

## 14. Automatic Knowledge Maintenance
During every task, the AI agent must automatically evaluate if a knowledge update is required after:
*   Creating or modifying a Page Object.
*   Implementing a new test spec.
*   Discovering a new locator or AJAX timing constraint.
*   Investigating an application-level test failure.

*Note: Do not modify files automatically unless a meaningful application discovery has been verified.*

## 15. Knowledge Usage by AI
Before starting implementation work:
*   **New Page Object**: Read relevant files in `knowledge/locators/` and `knowledge/application/`.
*   **New Test Spec**: Read `application-areas.md`, `business-flows.md`, and `automation-constraints.md`.
*   **New Fixture**: Read `authentication.md` and lifecycle guidelines.
*   **Failure Diagnostics**: Audit relevant locators and constraints before refactoring code.

## 16. Anti-Patterns
*   **Fabricating Facts**: Documenting paths or locators without verifying them on the live application.
*   **Duplicate Files**: Creating `cart-page-locators.md` when `application-locators.md` has a cart section.
*   **Mixing Layers**: Placing Playwright configuration rules inside application business flows.
*   **Storing Secrets**: Logging passwords, API tokens, or test account credentials inside markdown files.
*   **Hiding Defects**: Modifying knowledge files to match an incorrect test implementation just to force a validation pass.
*   **Commit Logs**: Writing minor revision notes inside history files.

## 17. Quality Checklist
Before completing a task, verify:
*   [ ] Existing knowledge files were audited to prevent duplicates.
*   [ ] Correct knowledge category selected (application, locators, decisions, history, test-design).
*   [ ] Application behavior or locator targets verified against the live site.
*   [ ] Source, dates, and verification status are documented.
*   [ ] No passwords, keys, or secrets are recorded.
*   [ ] Locator guidelines prefer accessibility-first selectors.
*   [ ] No Playwright code or test scenarios are written inside knowledge files.
*   [ ] Stale information is corrected in the existing file.
*   [ ] Test-design guidelines remain isolated from framework-level rules.
*   [ ] Verification tests execute and pass successfully.

## 18. AI Agent Restrictions
The AI agent must **never**:
*   Fabricate selectors or routes.
*   Silently write assumptions into verified documents.
*   Delete historical context without clear architectural reasons.
*   Create duplicate documentation.
*   Store credentials.
*   Weaken tests to match outdated or incorrect knowledge guidelines.

## 19. Relationship with Existing Knowledge
*   **Permanent Rules** in `.agents/rules/` take precedence over this Skill.
*   **Preserve Files**: Inspect and utilize the existing files; do not rename or duplicate:
    *   `application-overview.md`
    *   `application-areas.md`
    *   `authentication.md`
    *   `business-flows.md`
    *   `application-locators.md`
    *   `automation-constraints.md`
