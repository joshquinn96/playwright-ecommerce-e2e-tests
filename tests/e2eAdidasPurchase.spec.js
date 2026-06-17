const { test, expect } = require('@playwright/test');

test('E2E Adidas Purchase', async ({ browser }) =>

{
      const context = await browser.newContext();
      const page = await context.newPage();
      const registerLink = page.locator('a:has-text("Register here")');
      const firstName = page.locator("#firstName");
      const lastName = page.locator("#lastName");
      const email = page.locator("#userEmail");
      const phoneNumber = page.locator("#userMobile");
      const OccupationMenu = page.getByRole('combobox');
      const gender = page.locator("input[value='Male']");
      const password = page.locator("#userPassword");
      const confirmPassword = page.locator("#confirmPassword");
      const ageVerification = page.locator("input[type='checkbox']")
      const registerButton = page.locator('[name="login"]')
      const loginLink = page.locator('a:has-text("Login here")')
      const loginEmail = page.locator("#userEmail");
      const loginPassword = page.locator("#userPassword");
      const loginButton = page.locator('[name="login"]')
      const adidasOriginalCart = page.locator('button').filter({ hasText: 'Add To Cart' }).first()
      const cartItems = page.locator('button:has-text("Cart 1")')
      const checkoutButton = page.locator('button:has-text("Checkout")')
      const cvvField = page.locator("//div[@class='form__cc']//div[1]//div[1]//input[1]")
      const selectCountry = page.locator("//input[@placeholder='Select Country']")
      const placeOrderButton = page.locator('a:has-text("PLACE ORDER")')
      const downloadOrderButton = page.locator('button:has-text("Click To Download Order Details in CSV")')
    




      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
      console.log(await page.title());
      await registerLink.click();
      await firstName.fill('Josh');
      await lastName.fill('Quinn');
      await email.fill('quinn1@live.ie');
      await phoneNumber.fill('1234567890');
      await OccupationMenu.selectOption('Engineer');
      await gender.click();
      await password.fill('JoshUdemy123');
      await confirmPassword.fill('JoshUdemy123');
      await ageVerification.click();
      await loginLink.click();
      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
      await loginEmail.fill('quinn1@live.ie');
      await loginPassword.fill('JoshUdemy123');
      await loginButton.click();
      await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
      await adidasOriginalCart.click();
      await cartItems.click();
      await page.goto('https://rahulshettyacademy.com/client/#/dashboard/cart');
      await checkoutButton.click();
      await selectCountry.fill('Canada');
      await placeOrderButton.click();
      await page.goto('https://rahulshettyacademy.com/client/#/dashboard/thanks?prop=%5B%22699e6c8eb29b83fc4aeff8e2%22%5D');
      await downloadOrderButton.click();
});