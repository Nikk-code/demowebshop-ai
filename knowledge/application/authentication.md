# Authentication Knowledge

---
*   **Discovery Date**: 2026-08-18
*   **Application URL**: https://demowebshop.tricentis.com/
*   **Source**: Live application inspection
*   **Last Reviewed Date**: 2026-08-18
---

This document outlines the authentication mechanics, indicators, and behaviors for the Demo Web Shop application.

## 1. Authentication Mechanics
*   **Registration**: Requires unique email, first/last names, and password. Successful registration automatically logs the user in and redirects to a registration confirmation page.
*   **Login**: Authenticates via Email and Password. A checkbox "Remember me?" is available. Successful login redirects back to the referring page (or homepage).
*   **Logout**: Destroys the authentication session cookie and redirects the user back to the homepage.

## 2. Visible Indicators of State

### Unauthenticated State (Guest)
*   **Header Links**: The following links are visible in the header link panel:
    *   `Register` (class `.ico-register`)
    *   `Log in` (class `.ico-login`)
*   **Absent Elements**: No personal account link or Logout link is present.

### Authenticated State (Logged In)
*   **Header Links**: The following links replace register/login links:
    *   The user's registered Email address is displayed as a link (class `.account`), linking to `/customer/info`.
    *   `Log out` (class `.ico-logout`) is visible.
*   **Absent Elements**: Register and Log in links are hidden.

## 3. Automation Considerations
*   **No Pre-existing/Universal Credentials**: There are no default, static credentials provided by the website. Accounts must be registered dynamically (either in automation setups, preregistration, or via database control).
*   **Account State Isolation**: Tests running concurrently should use unique accounts to prevent shopping cart pollution or state collisions.
*   **StorageState Support**: The application stores the authentication state in standard browser cookies (`.NOPCOMMERCE.AUTH`). This state can be captured via Playwright's `browserContext.storageState()` and injected into separate contexts to bypass repetitive UI login steps in tests.
