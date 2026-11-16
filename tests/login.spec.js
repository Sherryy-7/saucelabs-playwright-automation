const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pages/LoginPage');

let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.open();
});


//test case :1 Login Scenario
test('User can login with valid credentials @smoke', async ({ page }) => {
 
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.getByText('Products')).toBeVisible();
});
