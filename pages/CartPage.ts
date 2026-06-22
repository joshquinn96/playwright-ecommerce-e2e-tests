import { Locator, Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  get checkoutButton(): Locator {
    return this.page.getByRole('button', { name: /checkout/i });
  }

  async checkout() {
    await this.checkoutButton.click();
    // Wait for checkout page to load
    await this.page.waitForURL('**/checkout/cart', { timeout: 5000 }).catch(() => {});
  }
}
