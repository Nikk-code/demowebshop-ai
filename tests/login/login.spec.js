const { test, expect } = require('../../fixtures/test-fixtures');

test.describe('Login Functionality', () => {
  const email = process.env.DEMO_USER_EMAIL;
  const password = process.env.DEMO_USER_PASSWORD;

  // Enforce configuration check prior to running tests
  test.beforeAll(() => {
    if (!email || !password) {
      throw new Error(
        'Missing environment variables: DEMO_USER_EMAIL and DEMO_USER_PASSWORD must be configured.'
      );
    }
  });

  test('User can successfully log in with valid credentials', async ({ loginPage, page }) => {

    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.login(email, password);

    // Assert
    // Verify successful authentication by checking for the user-specific account email link and the Logout link
    await expect(page.getByRole('link', { name: email })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  });
});
