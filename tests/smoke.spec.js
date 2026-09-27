const { test, expect } = require('@playwright/test');

test('homepage smoke test', async ({ page }) => {
  // Navigate to the base URL configured in playwright.config.js
  await page.goto('/');

  // Verify the page title contains 'Demo Web Shop'
  await expect(page).toHaveTitle(/Demo Web Shop/);

  // Verify the logo or main content is loaded
  const logo = page.locator('.header-logo img');
  await expect(logo).toBeVisible();
});
