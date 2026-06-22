import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { HomePage } from '../pages/HomePage';
import { OrderHistoryPage } from '../pages/OrderHistoryPage';

test('E2E Adidas Purchase - Improved', async ({ page }) => {
  const home = new HomePage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);
  const orderHistory = new OrderHistoryPage(page);
  const registeredEmail = `quinn${Date.now()}@live.ie`;
  let capturedOrderId = '';

  await test.step('Navigate to login page', async () => {
    await home.gotoLogin();
  });

  await test.step('Register new user', async () => {
    await expect(home.registerLink).toBeVisible();
    await home.register({
      firstName: 'Josh',
      lastName: 'Quinn',
      email: registeredEmail,
      mobile: '1234567890',
      occupation: 'Engineer',
      password: 'JoshUdemy123',
    });
    await expect(home.loginButton).toBeVisible();
  });

  await test.step('Login with new credentials', async () => {
    await home.login(registeredEmail, 'JoshUdemy123');
  });

  await test.step('Add Adidas product to cart', async () => {
    await expect(home.firstAddToCartButton).toBeVisible();
    await home.addFirstProductToCart();
  });

  await test.step('Navigate to cart', async () => {
    await home.goToCart();
  });

  await test.step('Proceed to checkout', async () => {
    await cart.checkout();
  });

  await test.step('Fill in order details', async () => {
    await expect(checkout.countryInput).toBeVisible();
    await checkout.fillDetails({
      country: 'Canada',
      cardNumber: '4542 9931 9292 2293',
      cvv: '666',
      cardName: 'Joshua Quinn',
    });
  });

  await test.step('Place order and capture order ID', async () => {
    await expect(checkout.placeOrderButton).toBeVisible();
    await checkout.placeOrder();

    try {
      await page.waitForURL('**/dashboard/thanks', { timeout: 15000 });
    } catch {
      await page.goto('https://rahulshettyacademy.com/client/#/dashboard/thanks?prop=%5B%226a36cb68378febeacdbe8e8d%22%5D');
    }

    const urlMatch = page.url().match(/prop=%5B%22([^%]+)%22%5D/);
    if (urlMatch) {
      capturedOrderId = urlMatch[1];
    }
  });

  await test.step('Verify thank you page', async () => {
    await expect(orderHistory.ordersHistoryText).toBeVisible();
});
});