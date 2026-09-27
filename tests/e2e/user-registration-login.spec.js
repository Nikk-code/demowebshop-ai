/**
 * E2E Scenario: User Registration and Login Validation
 *
 * Business Scenario:
 *   1. Navigate to Registration page.
 *   2. Submit registration details.
 *   3. If the email already exists, dynamically generate a fresh email and complete registration.
 *   4. Verify registration was completed successfully.
 *   5. Save the newly created credentials to CSV (`test-data/registered-users.csv`).
 *   6. Log out.
 *   7. Log in with the newly created credentials.
 *   8. Verify the user is successfully logged in.
 *
 * Scenario Doc: docs/scenarios/user-registration-login.md
 */

const { test, expect } = require('../../fixtures/test-fixtures');
const { saveUserToCsv } = require('../../utils/csv-helper');

test.describe('User Registration and Authentication Flow', () => {

  test('Register new user with unique email fallback, save to CSV, and verify login', async ({
    registerPage,
    loginPage,
  }) => {
    // Initial user details (with dynamic seed to attempt unique registration)
    const initialUserData = {
      gender: 'male',
      firstName: 'Demo',
      lastName: 'User',
      email: `demouser_${Date.now()}@example.com`,
      password: 'Password@123',
    };

    let registeredUser;

    await test.step('Step 1: Navigate to registration page', async () => {
      await registerPage.goto();
    });

    await test.step('Step 2 & 3: Fill registration form and handle email collision', async () => {
      registeredUser = await registerPage.registerWithUniqueEmail(initialUserData);
    });

    await test.step('Step 4: Verify registration completed successfully', async () => {
      await expect(registerPage.resultMessage).toHaveText('Your registration completed');
    });

    await test.step('Step 5: Save registered user credentials to CSV', async () => {
      saveUserToCsv(registeredUser);
    });

    await test.step('Step 6: Log out from the newly registered session', async () => {
      await registerPage.logout();
    });

    await test.step('Step 7: Log in with the newly registered user credentials', async () => {
      await loginPage.goto();
      await loginPage.login(registeredUser.email, registeredUser.password);
    });

    await test.step('Step 8: Verify user is authenticated and header displays user email', async () => {
      const loggedInEmail = await loginPage.getLoggedInAccountEmail();
      expect(loggedInEmail).toBe(registeredUser.email);
    });
  });

});
