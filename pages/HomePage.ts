import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  get registerLink(): Locator {
    return this.page.getByRole('link', { name: /register/i });
  }

  get firstNameInput(): Locator {
    return this.page.locator('#firstName');
  }

  get lastNameInput(): Locator {
    return this.page.locator('#lastName');
  }

  get emailInput(): Locator {
    return this.page.locator('#userEmail');
  }

  get mobileInput(): Locator {
    return this.page.locator('#userMobile');
  }

  get occupationSelect(): Locator {
    return this.page.getByRole('combobox');
  }

  get genderMaleRadio(): Locator {
    return this.page.locator('input[value="Male"]');
  }

  get passwordInput(): Locator {
    return this.page.locator('#userPassword');
  }

  get confirmPasswordInput(): Locator {
    return this.page.locator('#confirmPassword');
  }

  get termsCheckbox(): Locator {
    return this.page.locator('input[type="checkbox"]');
  }

  get submitRegistrationButton(): Locator {
    return this.page.getByRole('button', { name: /sign up|register/i });
  }

  get loginEmailInput(): Locator {
    return this.page.locator('#userEmail');
  }

  get loginPasswordInput(): Locator {
    return this.page.locator('#userPassword');
  }

  get loginButton(): Locator {
    return this.page.getByRole('button', { name: /login/i });
  }

  get firstAddToCartButton(): Locator {
    return this.page.locator('button:has-text("Add To Cart")').first();
  }

  get cartButton(): Locator {
    return this.page.locator('button').filter({ hasText: /cart/i }).first();
  }

  async gotoLogin() {
    await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await expect(this.registerLink).toBeVisible();
  }

  async register(user: { firstName: string; lastName: string; email: string; mobile?: string; occupation?: string; password?: string }) {
    await this.registerLink.click();
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    if (user.mobile) await this.mobileInput.fill(user.mobile);
    await this.occupationSelect.selectOption(user.occupation ?? 'Engineer');
    await this.genderMaleRadio.click();
    if (user.password) {
      await this.passwordInput.fill(user.password);
      await this.confirmPasswordInput.fill(user.password);
    }
    await this.termsCheckbox.check();
    await this.submitRegistrationButton.click();

    try {
      await this.page.waitForURL('**/auth/login', { timeout: 10000 });
    } catch {
      // Some app flows stay on the same page and show the login button instead.
    }

    await expect(this.loginButton).toBeVisible({ timeout: 15000 });
  }

  async login(email: string, password: string) {
    await this.gotoLogin();
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL('**/dashboard/dash');
  }

  async addFirstProductToCart() {
    await this.firstAddToCartButton.click();
    // Wait for toast/confirmation or cart count update
    await this.page.waitForURL('**/dashboard/dash', { timeout: 5000 }).catch(() => {});
  }

  async goToCart() {
    await this.cartButton.click();
    await this.page.waitForURL('**/dashboard/cart');
  }
}
