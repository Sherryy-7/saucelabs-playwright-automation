//@ts-check
const { test, expect } = require('@playwright/test');
const {LoginPage} = require('../pages/LoginPage');

const {Inventory} = require('../pages/Inventory');
const constant = require ('../data/constants');
const users =require('../data/users');


/** @type {LoginPage} */
let loginPage;

/** @type {Inventory} */
let inventory;

test.beforeEach(async ({ page }) => {
     loginPage = new LoginPage(page);
     inventory = new Inventory(page);
      await loginPage.open();
      await loginPage.login(users.standardUser.username, users.standardUser.password);


})

test('Cart number update when we add products @smoke', async ({ page }) => {
await inventory.addProductToCart(constant.texts.sauceLabsBackpackText);
await  inventory.addProductToCart(constant.texts.sauceLabsBikeLightText);
const cartCount = await inventory.getCartCount();
expect (cartCount).toBe(2);
})

test('products can be sorted from low to high', async({page}) =>{

   inventory.sortBy(constant.sortOptions.priceLowtoHight);// click on sort option
    const prices = await inventory.getAllProductPrices(); // get all product prices
    const sortedPrices = [...prices].sort((a, b) => a - b); // sort the prices in ascending order
    expect(prices).toEqual(sortedPrices); // compare the original prices with the sorted prices

    
});