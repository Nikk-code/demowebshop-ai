# AI Agent Workspace Rules

This document defines the behavior, decision-making principles, and coding workflow that AI agents must follow when contributing to this repository.

## 1. Research & Analysis
*   **Inspect Before Modifying**: Before creating or modifying any file, inspect relevant existing files, Page Objects, fixtures, tests, Skills, Prompts, Workflows, and project knowledge.
*   **Do Not Invent Behavior**: Do not make assumptions about application functionality, locators, or APIs. Inspect the actual application or read existing repository rules/knowledge first.
*   **Handle Ambiguity**: If any task requirements are ambiguous and can materially affect the implementation, ask the user for clarification instead of guessing.

## 2. Code Contribution & Modification
*   **Reuse First**: Always check for and reuse existing Page Objects, fixtures, utilities, Skills, or components before creating new ones. Do not introduce duplicate architecture.
*   **Minimal Changes**: Write the minimal amount of code necessary to implement the requested change. Avoid "refactoring" unrelated code blocks.
*   **Preserve Working Code**: Understand why code is written in a certain way before editing it. Do not blindly modify or break working, passing implementations.
*   **Cleanliness**: Keep AI-generated code simple, well-structured, and easily understandable to human QA engineers. Do not add unnecessary abstraction layers.

## 3. Failure Investigation & Diagnostics
*   **Validate Changes**: After editing, run the smallest relevant subset of tests to verify the change, followed by the full test suite when appropriate.
*   **Do Not Hide Failures**: Never remove, disable, or weaken an assertion just to make a failing test pass.
*   **No Quick Fix Sleeps**: Do not introduce `page.waitForTimeout()` as a workaround for synchronization errors.
*   **Analyze Root Cause**: When a test fails, systematically determine the root cause before changing code:
    *   Is it a test code bug?
    *   Is it an outdated/incorrect locator?
    *   Is it an application synchronization issue?
    *   Is it a fixture initialization failure?
    *   Is it actual application/functional regression?
    *   Is it an environment, network, or config issue?

## 4. Controlled Project Knowledge
*   **Do Not Rewrite Rules/Skills**: Do not automatically modify repository rules, Skills, prompts, or workflows. Any updates to controlled project knowledge must be deliberate, documented, and justified.
*   **Suggest Improvements**: When you identify a repeatable pattern or improvement, document it as a suggestion in the appropriate Skill or knowledge base instead of making silent changes.
*   **No Speculative Implementation**: Do not anticipate or implement future framework architecture unless explicitly requested by the user.

## 5. Task Completion Reporting
Before declaring a task complete, always provide a summary containing:
*   **Files Created**
*   **Files Modified**
*   **Important Implementation Decisions**
*   **Tests Executed**
*   **Test Results**
*   **Unresolved Issues or Warnings** (if any)
