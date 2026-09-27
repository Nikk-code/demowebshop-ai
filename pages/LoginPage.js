class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators stored as properties for reuse and maintenance
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.rememberMeCheckbox = page.getByLabel('Remember me?');
    this.logoutLink = page.locator('.ico-logout');
    this.accountLink = page.locator('.header-links .account');
  }

  /**
   * Navigates to the login page relative to the baseURL
   */
  async goto() {
    await this.page.goto('/login');
  }

  /**
   * Performs the reusable login action flow
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Logs out the user if currently logged in
   */
  async logout() {
    if (await this.logoutLink.isVisible()) {
      await this.logoutLink.click();
    }
  }

  /**
   * Returns the account email visible in header
   * @returns {Promise<string>}
   */
  async getLoggedInAccountEmail() {
    return (await this.accountLink.textContent() || '').trim();
  }
}

module.exports = { LoginPage };
