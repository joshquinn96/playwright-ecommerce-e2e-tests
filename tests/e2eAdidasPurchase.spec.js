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
  const downloadOrderButton = page.locator('button:has-text("Click To Download Order Details in CSV")');

  await page.goto('https://rahulshettyacademy.com/client/#/auth/login', { waitUntil: 'networkidle' });
  await expect(registerLink).toBeVisible({ timeout: 20000 });
  await registerLink.click();

  await expect(firstName).toBeVisible({ timeout: 20000 });
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
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login', { waitUntil: 'networkidle' });

  await expect(loginEmail).toBeVisible({ timeout: 20000 });
  await loginEmail.fill('quinn1@live.ie');
  await loginPassword.fill('JoshUdemy123');
  await loginButton.click();
  await page.waitForURL('**/dashboard/dash', { timeout: 60000 });

  await expect(adidasOriginalCart).toBeVisible({ timeout: 20000 });
  await adidasOriginalCart.click();
  await expect(cartItems).toBeVisible({ timeout: 20000 });
  await cartItems.click();
  await page.waitForURL('**/dashboard/cart', { timeout: 60000 });

  await expect(checkoutButton).toBeVisible({ timeout: 20000 });
  await checkoutButton.click();
  await expect(selectCountry).toBeVisible({ timeout: 20000 });
  await selectCountry.fill('Canada');
  await expect(placeOrderButton).toBeVisible({ timeout: 20000 });
  await placeOrderButton.click();
  await page.waitForURL('**/dashboard/thanks*', { timeout: 60000 });

  await expect(downloadOrderButton).toBeVisible({ timeout: 20000 });
  await downloadOrderButton.click();
});
