import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillDetails(opts: { country: string; cvv: string; cardName: string }) {
    const countryInput = this.page.locator('input[placeholder="Select Country"]');
    await countryInput.fill(opts.country);

    const textboxes = this.page.locator('input[type="text"]');
    const visibleTextboxes = textboxes.filter({ hasNot: this.page.locator('[placeholder="Select Country"]') });

    await visibleTextboxes.nth(0).fill(opts.cvv);
    await visibleTextboxes.nth(1).fill(opts.cardName);
    await this.page.waitForLoadState('networkidle');
  }

  async placeOrder() {
    const placeOrderButton = this.page.getByRole('link', { name: /place order/i });
    await placeOrderButton.click();
    await this.page.waitForURL('**/dashboard/thanks', { timeout: 10000 });
  }
}
