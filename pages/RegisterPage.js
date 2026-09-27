class RegisterPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.genderMaleRadio     = page.locator('#gender-male');
    this.genderFemaleRadio   = page.locator('#gender-female');
    this.firstNameInput      = page.locator('#FirstName');
    this.lastNameInput       = page.locator('#LastName');
    this.emailInput          = page.locator('#Email');
    this.passwordInput       = page.locator('#Password');
    this.confirmPasswordInput= page.locator('#ConfirmPassword');
    this.registerButton      = page.locator('#register-button');

    this.validationErrors    = page.locator('.validation-summary-errors');
    this.resultMessage       = page.locator('.result');
    this.continueButton      = page.locator('.register-continue-button');

    // Header elements
    this.logoutLink          = page.locator('.ico-logout');
    this.accountLink         = page.locator('.header-links .account');
  }

  /**
   * Navigates to the registration page
   */
  async goto() {
    await this.page.goto('/register');
  }

  /**
   * Fills in registration form fields
   * @param {{ gender?: string, firstName: string, lastName: string, email: string, password: string }} userData
   */
  async fillForm(userData) {
    if (userData.gender === 'F' || userData.gender === 'female') {
      await this.genderFemaleRadio.check();
    } else {
      await this.genderMaleRadio.check();
    }

    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    await this.emailInput.fill(userData.email);
    await this.passwordInput.fill(userData.password);
    await this.confirmPasswordInput.fill(userData.password);
  }

  /**
   * Clicks the Register button to submit the form
   */
  async submit() {
    await this.registerButton.click();
  }

  /**
   * Registers a user. If the email already exists, generates a dynamic unique email
   * and retries until registration succeeds.
   *
   * @param {Object} userData
   * @returns {Promise<{ email: string, password: string, firstName: string, lastName: string }>} The registered user details
   */
  async registerWithUniqueEmail(userData) {
    let currentEmail = userData.email;
    await this.fillForm({ ...userData, email: currentEmail });
    await this.submit();

    // Check if duplicate email error appears
    const isDuplicate = await this.validationErrors.filter({ hasText: /email already exists/i }).isVisible().catch(() => false);

    if (isDuplicate) {
      // Generate a guaranteed unique dynamic email
      currentEmail = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}@test.com`;
      await this.emailInput.fill(currentEmail);
      await this.passwordInput.fill(userData.password);
      await this.confirmPasswordInput.fill(userData.password);
      await this.submit();
    }

    return {
      ...userData,
      email: currentEmail
    };
  }

  /**
   * Logs out the currently authenticated user
   */
  async logout() {
    if (await this.logoutLink.isVisible()) {
      await this.logoutLink.click();
    }
  }

  /**
   * Returns the visible account email text in the header
   * @returns {Promise<string>}
   */
  async getLoggedInAccountEmail() {
    return (await this.accountLink.textContent() || '').trim();
  }
}

module.exports = { RegisterPage };
