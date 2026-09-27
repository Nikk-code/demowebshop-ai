# Project Context

This document outlines the core context, tools, and structural goals for the DemoWebShop_AI automation repository.

## Core Metadata
*   **Project Name**: `DemoWebShop_AI`
*   **Application Under Test (AUT)**: [Tricentis Demo Web Shop](https://demowebshop.tricentis.com/)
*   **Automation Technology**: Playwright Test (`@playwright/test`)
*   **Programming Language**: JavaScript (ES6+)
*   **Test Scope**: UI testing only
*   **Browser Coverage**: Chromium, Firefox, WebKit (cross-browser testing enabled)

## Architecture & Framework Design
*   **Architecture Goal**: Maintain an AI-assisted Playwright automation framework.
*   **Design Pattern**: Page Object Model (POM) for encapsulating page elements and operations.
*   **Fixtures**: Use custom Playwright fixtures where appropriate for clean setup/teardown and sharing state.
*   **Incremental Progression**: Project Skills, Prompts, Workflows, and domain knowledge are introduced step-by-step; do not implement future architecture prematurely.

## Core Rules for the AI Agent
*   **Inspect Before Creating**: Always check the existing code, Page Objects, fixtures, tests, Skills, Prompts, Workflows, and knowledge before creating new files or artifacts.
*   **Reuse Existing Code**: Do not create duplicates. Reuse existing utilities, Page Objects, and selectors whenever appropriate to ensure a single source of truth.
