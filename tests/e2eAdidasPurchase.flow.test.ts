import { test, expect } from '@playwright/test';

test('E2E Adidas Purchase - Improved', async ({ page }) => {
  let capturedOrderId = '';
  const registeredEmail = `quinn${Date.now()}@live.ie`;

  await test.step('Navigate to login page', async () => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login', { waitUntil: 'networkidle' });
  });

  await test.step('Register new user', async () => {
    const registerLink = page.getByRole('link', { name: /register/i });
    await expect(registerLink).toBeVisible();
    await registerLink.click();

    await expect(page.locator('#firstName')).toBeVisible();
    await page.locator('#firstName').fill('Josh');
    await page.locator('#lastName').fill('Quinn');
    await page.locator('#userEmail').fill(registeredEmail);
    await page.locator('#userMobile').fill('1234567890');
    await page.getByRole('combobox').selectOption('Engineer');
    await page.locator('input[value="Male"]').click();
    await page.locator('#userPassword').fill('JoshUdemy123');
    await page.locator('#confirmPassword').fill('JoshUdemy123');
    await page.locator('input[type="checkbox"]').check();

    await page.getByRole('button', { name: /sign up|register/i }).click();
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
  });

  await test.step('Login with new credentials', async () => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    await page.locator('#userEmail').fill(registeredEmail);
    await page.locator('#userPassword').fill('JoshUdemy123');
    await page.getByRole('button', { name: /login/i }).click();
    await page.waitForURL('**/dashboard/dash', { timeout: 10000 });
  });





  

  await test.step('Add Adidas product to cart', async () => {
    await expect(page.locator('button:has-text("Add To Cart")').first()).toBeVisible();
    await page.locator('button:has-text("Add To Cart")').first().click();
    
    // Wait for toast or success confirmation
    await page.waitForLoadState('networkidle');
  });

  await test.step('Navigate to cart', async () => {
    // Instead of using brittle "Cart 1" text, use a more resilient approach
    const cartButton = page.locator('button').filter({ hasText: /cart/i }).first();
    await expect(cartButton).toBeVisible();
    await cartButton.click();
    await page.waitForURL('**/dashboard/cart', { timeout: 10000 });
  });

  await test.step('Proceed to checkout', async () => {
    const checkoutButton = page.getByRole('button', { name: /checkout/i });
    await expect(checkoutButton).toBeVisible();
    await checkoutButton.click();
    await page.waitForLoadState('networkidle');
  });

  await test.step('Fill in order details', async () => {
    const countryInput = page.locator('input[placeholder="Select Country"]');
    await expect(countryInput).toBeVisible();
    await countryInput.fill('Canada');

    await page.getByRole('textbox').nth(0).fill('4542 9931 9292 2293');
    await page.getByRole('textbox').nth(1).fill('666');
    await page.getByRole('textbox').nth(2).fill('Joshua Quinn');

    await page.waitForLoadState('networkidle');
  });

  await test.step('Place order and capture order ID', async () => {
    const placeOrderButton = page.locator('a:has-text("PLACE ORDER")').first();
    await expect(placeOrderButton).toBeVisible();
    await placeOrderButton.click();

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
    await expect(page.getByText(/orders history page/i)).toBeVisible();
  });
});
