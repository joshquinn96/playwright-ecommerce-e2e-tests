import { Page, expect } from '@playwright/test';

export class OrderHistoryPage {
  constructor(private page: Page) {}

  async goToOrders() {
    await this.page.goto('https://rahulshettyacademy.com/client/#/dashboard/myorders');
    await this.page.waitForURL('**/dashboard/myorders');
  }

  async viewOrder(orderId: string) {
    const orderRow = this.page.locator('.table tbody tr').filter({ hasText: orderId });
    await expect(orderRow).toBeVisible();
    const viewButton = orderRow.getByRole('button', { name: /view/i });
    await viewButton.click();
    await this.page.waitForURL(`**/dashboard/order-details/${orderId}`, { timeout: 10000 });
  }

  async verifyOrderDetails(orderId: string) {
    const orderIdLocator = this.page.locator(`text=${orderId}`);
    await expect(orderIdLocator).toHaveText(orderId);
  }
}
