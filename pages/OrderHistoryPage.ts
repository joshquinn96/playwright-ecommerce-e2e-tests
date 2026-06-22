import { expect, Locator, Page } from '@playwright/test';

export class OrderHistoryPage {
  constructor(private page: Page) {}

  get ordersHistoryText(): Locator {
    return this.page.getByText(/orders history page/i);
  }

  get orderRows(): Locator {
    return this.page.locator('.table tbody tr');
  }

  getOrderRow(orderId: string): Locator {
    return this.orderRows.filter({ hasText: orderId });
  }

  getViewButtonForOrder(orderId: string): Locator {
    return this.getOrderRow(orderId).getByRole('button', { name: /view/i });
  }

  async goToOrders() {
    await this.page.goto('https://rahulshettyacademy.com/client/#/dashboard/myorders');
    await this.page.waitForURL('**/dashboard/myorders');
  }

  async viewOrder(orderId: string) {
    const orderRow = this.getOrderRow(orderId);
    await expect(orderRow).toBeVisible();
    await this.getViewButtonForOrder(orderId).click();
    await this.page.waitForURL(`**/dashboard/order-details/${orderId}`, { timeout: 10000 });
  }

  async verifyOrderDetails(orderId: string) {
    await expect(this.page.locator(`text=${orderId}`)).toHaveText(orderId);
  }
}
