# Test Design Rules

This document outlines the rules for designing robust, readable, and maintainable automated UI tests.

## 1. Test Design Principles
*   **Business-Focused**: Design tests to validate business behavior and user flows rather than internal implementation details.
*   **Atomic Tests**: Prefer small, atomic tests. A single test should verify a single, clear business objective.
*   **Independent Tests**: Do not chain tests together. A test must never depend on the state, execution, or result of another test.
*   **Simplicity**: Prefer simple, readable, and maintainable test flows over clever or overly complex test logic.

## 2. Structure & Readability
*   **Descriptive Titles**: Use clear, descriptive test titles that explain the scenario and expected outcome.
*   **Setup vs Validation**: Keep test setup/teardown logic (e.g., hooks like `beforeEach`) separate from the actual test validation steps.
*   **Focused Assertions**: Assertions should clearly and explicitly verify the goal of the test. Avoid adding excessive, unrelated assertions that add noise to test reports.

## 3. Framework Abstractions
*   **Page Object Model (POM)**: Store page-specific interactions and selectors in Page Object classes. Do not place complex UI interaction steps directly inside test spec files.
*   **Fixtures**: Utilize Playwright fixtures for page initialization, user session injection, and sharing common test states.
*   **Separation of Data**: Separate test data (URLs, user credentials, input text payload) from test code logic. Store externalized test data in `test-data/` when appropriate.
*   **Quality over Quantity**: Do not write tests solely to increase the total test count. Each test must verify a unique business logic path or regression risk.
