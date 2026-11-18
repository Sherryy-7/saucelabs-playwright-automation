//@ts-check
const { test, expect } = require('@playwright/test');
const {LoginPage} = require('../pages/LoginPage');

const {Inventory} = require('../pages/Inventory');
const constant = require ('../data/constants');

/** @type {LoginPage} */
let loginPage;

/** @type {Inventory} */
let inventory;

test.beforeEach(async ({ page }) => {
     loginPage = new LoginPage(page);
     inventory = new Inventory(page);
      await loginPage.open();
      await loginPage.login('standard_user', 'secret_sauce');


})

test('Cart number update when we add products @smoke', async ({ page }) => {
await inventory.addProductToCart(constant.texts.sauceLabsBackpackText);
await  inventory.addProductToCart(constant.texts.sauceLabsBikeLightText);
const cartCount = await inventory.getCartCount();
expect (cartCount).toBe(2);
})