import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async checkout() {
    const checkoutButton = this.page.getByRole('button', { name: /checkout/i });
    await checkoutButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}
