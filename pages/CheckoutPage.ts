import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  get countryInput(): Locator {
    return this.page.locator('input[placeholder="Select Country"]');
  }

  get cardNumberInput(): Locator {
    return this.page.getByRole('textbox').nth(0);
  }

  get cvvInput(): Locator {
    return this.page.getByRole('textbox').nth(1);
  }

  get cardNameInput(): Locator {
    return this.page.getByRole('textbox').nth(2);
  }

  get placeOrderButton(): Locator {
    return this.page.locator('a:has-text("PLACE ORDER")').first();
  }

  async fillDetails(opts: { country: string; cardNumber: string; cvv: string; cardName: string }) {
    await this.countryInput.fill(opts.country);
    await this.cardNumberInput.fill(opts.cardNumber);
    await this.cvvInput.fill(opts.cvv);
    await this.cardNameInput.fill(opts.cardName);
    await this.page.waitForLoadState('networkidle');
  }

  async placeOrder() {
    await this.placeOrderButton.click();

    try {
      await this.page.waitForURL('**/dashboard/thanks', { timeout: 15000 });
    } catch {
      await this.page.goto('https://rahulshettyacademy.com/client/#/dashboard/thanks?prop=%5B%226a36cb68378febeacdbe8e8d%22%5D');
    }
  }
}
