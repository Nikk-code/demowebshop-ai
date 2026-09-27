# Coding Standards

This document outlines the JavaScript coding standards and guidelines for development within the project.

## 1. JavaScript Standards & Syntax
*   **Modern JS**: Write modern, clean JavaScript (ES6+ features).
*   **Variable Declarations**: 
    *   Use `const` by default for all variable declarations.
    *   Use `let` only when variable reassignment is explicitly required.
    *   **Never use `var`**.
*   **Formatting**: Use semicolons consistently at the end of statements.

## 2. Naming Conventions
*   **Descriptive Names**: Ensure names clearly express intent and functionality.
*   **camelCase**: Use camelCase for variables, constants, functions, methods, and properties.
*   **PascalCase**: Use PascalCase for class names (e.g., Page Objects).

## 3. Function & Class Design
*   **Single Responsibility**: Keep functions, methods, and classes focused on a single responsibility.
*   **Avoid Bloat**: Keep methods and functions short. Avoid writing unnecessarily large blocks of code.
*   **DRY Principle**: Avoid duplicate code. Extract common logic into helper methods or components where appropriate.
*   **Early Returns**: Prefer early returns (e.g., returning early from a function if a guard clause fails) to avoid deep nesting and improve readability.

## 4. Documentation & Comments
*   **No Redundant Comments**: Do not write comments that simply repeat what the code says.
*   **Reasoning-Focused Comments**: Add comments only to explain "why" something is done (non-obvious behavior, complex business rules, or critical workarounds).

## 5. Dependencies
*   **Minimalist Approach**: Do not install third-party libraries unless there is an approved, clear project requirement. Rely on Node.js and Playwright built-in modules first.
