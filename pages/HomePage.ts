import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login', { waitUntil: 'networkidle' });
  }

  async register(user: { firstName: string; lastName: string; email: string; mobile?: string; occupation?: string; password?: string }) {
    await this.page.getByRole('link', { name: /register/i }).click();
    await this.page.locator('#firstName').fill(user.firstName);
    await this.page.locator('#lastName').fill(user.lastName);
    await this.page.locator('#userEmail').fill(user.email);
    if (user.mobile) await this.page.locator('#userMobile').fill(user.mobile);
    await this.page.getByRole('combobox').selectOption(user.occupation ?? 'Engineer');
    await this.page.locator('input[value="Male"]').click();
    if (user.password) {
      await this.page.locator('#userPassword').fill(user.password);
      await this.page.locator('#confirmPassword').fill(user.password);
    }
    await this.page.locator('input[type="checkbox"]').check();
    await this.page.getByRole('button', { name: /register/i }).click();
    await this.page.waitForURL('**/auth/login');
  }

  async login(email: string, password: string) {
    await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await this.page.locator('#userEmail').fill(email);
    await this.page.locator('#userPassword').fill(password);
    await this.page.getByRole('button', { name: /login/i }).click();
    await this.page.waitForURL('**/dashboard/dash');
  }

  async addFirstProductToCart() {
    await this.page.locator('button:has-text("Add To Cart")').first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async goToCart() {
    const cartButton = this.page.locator('button').filter({ hasText: /cart/i }).first();
    await cartButton.click();
    await this.page.waitForURL('**/dashboard/cart');
  }
}
