# Scenario: User Registration and Login Validation

## Business Purpose
Verify that a new user can register an account on Tricentis Demo Web Shop, handling duplicate email collisions dynamically, persisting the created credentials to a CSV file for reuse, and confirming successful authentication by logging back in.

## Test File
`tests/e2e/user-registration-login.spec.js`

## Pre-conditions
- Application is reachable at `BASE_URL`.

## Flow Summary
1. **Navigate to Registration**: Open `/register`.
2. **Submit Details**: Fill in personal information, password, and email.
3. **Collision Handling**: If the email already exists, detect the error message and submit with a fresh unique email.
4. **Registration Verification**: Confirm the success message `"Your registration completed"`.
5. **CSV Persistence**: Append new user credentials to `test-data/registered-users.csv`.
6. **Log Out**: Sign out of the registered session.
7. **Log In**: Navigate to `/login` and submit the new credentials.
8. **Authentication Verification**: Verify header displays the logged-in email.

## Reusable Components
- Page Object: [`pages/RegisterPage.js`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/pages/RegisterPage.js)
- Page Object: [`pages/LoginPage.js`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/pages/LoginPage.js)
- CSV Utility: [`utils/csv-helper.js`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/utils/csv-helper.js)
- Output CSV: [`test-data/registered-users.csv`](file:///c:/Newfolder/Testing/playwright/DemoWebShop_AI/test-data/registered-users.csv)
