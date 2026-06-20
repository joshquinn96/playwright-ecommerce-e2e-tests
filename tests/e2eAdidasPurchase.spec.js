const { test, expect } = require('@playwright/test');

test('E2E Adidas Purchase', async ({ browser }) => {
  const page = await browser.newPage();

  const registerLink = page.locator('a:has-text("Register here")');
  const firstName = page.locator('#firstName');
  const lastName = page.locator('#lastName');
  const email = page.locator('#userEmail');
  const phoneNumber = page.locator('#userMobile');
  const occupationMenu = page.getByRole('combobox');
  const gender = page.locator("input[value='Male']");
  const password = page.locator('#userPassword');
  const confirmPassword = page.locator('#confirmPassword');
  const ageVerification = page.locator('input[type="checkbox"]');
  const loginEmail = page.locator('#userEmail');
  const loginPassword = page.locator('#userPassword');
  const loginButton = page.locator('[name="login"]');
  const adidasOriginalCart = page.locator('button:has-text("Add To Cart")').first();
  const cartItems = page.locator('button:has-text("Cart 1")');
  const checkoutButton = page.locator('button:has-text("Checkout")');
  const selectCountry = page.locator('input[placeholder="Select Country"]');
  const placeOrderButton = page.locator('a:has-text("PLACE ORDER")');

  await page.goto('https://rahulshettyacademy.com/client/#/auth/login', { waitUntil: 'networkidle' });
  await expect(registerLink).toBeVisible();
  await registerLink.click();

  await expect(firstName).toBeVisible();
  await firstName.fill('Josh');
  await lastName.fill('Quinn');
  await email.fill('quinn1@live.ie');
  await phoneNumber.fill('1234567890');
  await occupationMenu.selectOption('Engineer');
  await gender.click();
  await password.fill('JoshUdemy123');
  await confirmPassword.fill('JoshUdemy123');
  await ageVerification.check();

  await page.waitForLoadState('networkidle');
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

  await expect(loginEmail).toBeVisible();
  await loginEmail.fill('quinn1@live.ie');
  await loginPassword.fill('JoshUdemy123');
  await loginButton.click();
  await page.waitForURL('**/dashboard/dash',);

  await expect(adidasOriginalCart).toBeVisible();
  await adidasOriginalCart.click();
  await expect(cartItems).toBeVisible();
  await cartItems.click();
  await page.waitForURL('**/dashboard/cart', );

  await expect(checkoutButton).toBeVisible();
  await checkoutButton.click();

  await page.waitForLoadState('networkidle');
  await page.goto('https://rahulshettyacademy.com/client/#/dashboard/order?prop=%5B%226960eac0c941646b7a8b3e68%22%5D',);
  await expect(selectCountry).toBeVisible();
  await selectCountry.fill('Canada');
  await page.getByRole('textbox').nth(1).fill('666');
  await page.getByRole('textbox').nth(2).fill('Joshua Quinn');
  await expect(placeOrderButton).toBeVisible();
  await placeOrderButton.click();

  await page.goto('https://rahulshettyacademy.com/client/#/dashboard/thanks?prop=%5B%226a36cb68378febeacdbe8e8d%22%5D');
  await page.getByText('Orders History Page').click();

  await page.goto('https://rahulshettyacademy.com/client/#/dashboard/myorders');
  const orderId = '6a36cb68378febeacdbe8e8d';
  const orderRow = page.locator('.table tr', { hasText: orderId });
  await expect(orderRow).toBeVisible();
  const viewButton = orderRow.locator('button:has-text("View")');
  await expect(viewButton).toBeVisible();
  await viewButton.click();

  await page.goto('https://rahulshettyacademy.com/client/#/dashboard/order-details/6a36cb68378febeacdbe8e8d');
  const orderSummaryLocator = page.locator(`text=${orderId}`);
  await expect(orderSummaryLocator).toBeVisible();
  const orderIdSummary = (await orderSummaryLocator.first().textContent()).trim();
  console.log(`Order number: ${orderIdSummary}`);
});