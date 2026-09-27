---
name: decisions
description: Guidance on documenting and maintaining important framework and automation architecture decisions.
---

# Architecture Decision Records (ADR) Skill

## 1. Purpose
This Skill governs how important framework and automation architecture decisions are documented and maintained. Architecture Decision Records (ADRs) document the reasoning and context behind structural, behavioral, or design choices, preventing future AI agents from repeatedly reconsidering, duplicating, or contradicting established directions.

## 2. When to Create a Decision
Propose and document an ADR only when a decision has a meaningful, long-term impact on the framework.

### Examples of Decisions Requiring an ADR:
*   Page Object responsibility boundaries (e.g., nesting components vs pages).
*   Test fixture structure and scoping policies.
*   Application authentication state management strategy.
*   Test data externalization and environment profile strategy.
*   Locator strategy exceptions (e.g., when XPath or CSS is required over semantic locators).
*   Directory layout conventions and file-placement policies.
*   Parallel execution and worker configuration strategy.
*   Handling a major application-specific automation constraint.

### Examples NOT Requiring an ADR:
*   Variable, selector, or function names.
*   Single, localized locator selections.
*   Code formatting styles.
*   Localized code refactoring.
*   Adding simple new test cases.

## 3. Decision Format
Use the following standard markdown structure for documenting decisions. Save records under `knowledge/decisions/` with the filename format `adr-xxx.md`.

```markdown
# ADR-XXX: [Decision Title]

*   **Status**: Proposed | Accepted | Superseded | Rejected
*   **Date**: YYYY-MM-DD
*   **Related Files**: [List related file paths]

## Context
[Describe the problem, requirements, or constraints that led to this decision.]

## Decision
[State the exact choice or technical approach that was adopted.]

## Rationale
[Explain the reasoning behind this decision. Why is this solution preferred?]

## Consequences
[Detail the positive, negative, or neutral outcomes resulting from this decision.]

## Alternatives Considered
[List the alternative solutions evaluated and why they were rejected.]

## Review Notes
[Record reviewer feedback or verification requirements.]
```

*Note: Keep ADRs concise and focused on the technical choice; do not write them as tutorials.*

## 4. Decision Numbering
*   Use sequential three-digit identifiers: `ADR-001`, `ADR-002`, `ADR-003`, etc.
*   Never reuse an existing number.
*   Before creating an ADR, always inspect `knowledge/decisions/` to identify the next free number in the sequence.

## 5. Status Definitions
*   **Proposed**: The decision is drafted and awaiting reviewer approval.
*   **Accepted**: The decision is approved and must be followed by all contributors and agents.
*   **Superseded**: A newer decision (`ADR-YYY`) has replaced this decision. Maintain superseded records in history; do not delete them.
*   **Rejected**: The proposed decision was reviewed and declined.

## 6. AI Workspace Behavior
Before proposing or making a significant architectural change, the AI agent must:
1.  Inspect all existing ADRs in `knowledge/decisions/`.
2.  Determine if an accepted decision already addresses the issue.
3.  Follow accepted decisions. Do not contradict them.
4.  If a new approach contradicts an accepted decision, document the conflict and propose a new ADR to supersede the older decision.
5.  Do not edit or delete historical ADR files to hide previous decisions.

## 7. Decision Quality Metrics
A high-quality ADR must clearly explain:
*   The exact problem and context.
*   The chosen solution.
*   The rationale for selection.
*   Alternatives considered and why they were declined.
*   Consequences and technical debt introduced.

## 8. Application-Specific Context
*   Decisions may reference application context documented under `knowledge/application/` (e.g., Demo Web Shop authentication mechanics, cart AJAX behaviors, checkout step validations).
*   Reference these knowledge files directly; do not duplicate their complete contents inside the ADR file.

## 9. Architectural Hierarchy
The framework's rule hierarchy is structured as follows:
```text
Permanent Rules (.agents/rules/)
      └── Accepted Architecture Decisions (knowledge/decisions/)
            └── Skills (.agents/skills/)
                  └── Prompts (prompts/)
                        └── Implementation Code
```
*   **Permanent Rules take precedence over ADRs**. If an ADR conflicts with a permanent Rule, the Rule takes precedence.
*   If an accepted ADR changes how a Skill should be applied, the Skill file must be updated to align with the decision.

## 10. AI Decision Workflow
When encountering an architectural or design choice:
1.  **Search**: Check existing ADRs in `knowledge/decisions/`.
2.  **Verify**: Search relevant application knowledge.
3.  **Inspect**: Check current implementation code in the workspace.
4.  **Evaluate**: Determine if an existing decision applies.
5.  **Apply**: Reuse the accepted design patterns.
6.  **Propose**: If a new architectural pattern is required, write a proposed ADR.
7.  **Implement**: Implement code only after the decision status is accepted or resolved.

## 11. Validation Checklist
Before proposing a new ADR, verify:
*   [ ] The decision has a meaningful, long-term structural impact on the framework.
*   [ ] Existing decisions were audited to ensure no duplicate numbering or scope overlap.
*   [ ] Context, problem statement, and requirements are clearly defined.
*   [ ] Rejected alternatives are documented.
*   [ ] The technical decision is explicit.
*   [ ] Consequences and trade-offs are documented.
*   [ ] The ADR does not duplicate rules or skills.
*   [ ] The file path follows `knowledge/decisions/adr-xxx.md`.

## 12. AI Agent Restrictions
The AI agent must **never**:
*   Delete or hide historical ADR records.
*   Silently implement changes that contradict accepted ADR decisions.
*   Create ADRs for trivial code implementations or single locators.
*   Duplicate entire Skills inside ADR files.
*   Use ADRs as test logs, execution walkthroughs, or application user guides.
*   Modify accepted ADRs retroactively to justify a different code implementation.

---

> [!IMPORTANT]
> This Skill defines how decisions are documented. Permanent project Rules in `.agents/rules/` take precedence over this Skill and any documented ADRs.
