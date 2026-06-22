import { Locator, Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  get checkoutButton(): Locator {
    return this.page.getByRole('button', { name: /checkout/i });
  }

  async checkout() {
    await this.checkoutButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}
