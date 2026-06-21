import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderHistoryPage } from '../pages/OrderHistoryPage';
import { testUser } from '../utils/test-data';
import { extractOrderIdFromUrl } from '../utils/helpers';

test('E2E purchase flow (page objects)', async ({ page }) => {
  const home = new HomePage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);
  const orders = new OrderHistoryPage(page);

  const email = `quinn${Date.now()}@live.ie`;

  await home.goto();
  await home.register({ ...testUser, email });
  await home.login(email, testUser.password);

  await home.addFirstProductToCart();
  await home.goToCart();

  await cart.checkout();

  await checkout.fillDetails({ country: 'Canada', cvv: '666', cardName: 'Joshua Quinn' });
  await checkout.placeOrder();

  const orderId = extractOrderIdFromUrl(page.url());
  expect(orderId).toBeTruthy();

  await orders.goToOrders();
  await orders.viewOrder(orderId!);
  await orders.verifyOrderDetails(orderId!);
});
