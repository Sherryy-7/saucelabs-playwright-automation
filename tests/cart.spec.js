//@ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { Inventory } = require('../pages/Inventory');
const { Cart } = require('../pages/Cart');
const constant = require('../data/constants');
const users = require('../data/users');

/** @type {Cart} */
let cart;
/** @type {LoginPage} */
let loginPage;
/** @type {Inventory} */
let inventory;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventory = new Inventory(page);
  cart = new Cart(page);

  await loginPage.open();
  await loginPage.login(users.standardUser.username, users.standardUser.password);
});

test('added products should appear correctly in the cart', async ({ page }) => {
  await inventory.addProductToCart(constant.texts.sauceLabsBackpackText);
  await inventory.addProductToCart(constant.texts.sauceLabsBikeLightText);

  await cart.goToCart();
  await expect(page).toHaveURL(constant.urls.cart);

  const itemNames = await cart.getAllCartNames();
  expect(itemNames).toEqual([
    constant.texts.sauceLabsBackpackText,
    constant.texts.sauceLabsBikeLightText,
  ]);
});

test('product can be removed from cart', async ({ page }) => {
  await inventory.addProductToCart(constant.texts.sauceLabsBackpackText);
  await inventory.addProductToCart(constant.texts.sauceLabsBikeLightText);

  await cart.goToCart();
  await cart.removeProduct(constant.texts.sauceLabsBackpackText);

  await expect(cart.cartItem).toHaveCount(1); // auto-wait karta hai

  const remainingNames = await cart.getAllCartNames();
  expect(remainingNames).toEqual([constant.texts.sauceLabsBikeLightText]);
});

test('Add a product to cart and head to checkout and user can proceed with right information', async ({ page }) => {
  await inventory.addProductToCart(constant.texts.sauceLabsBackpackText);
  await inventory.addProductToCart(constant.texts.sauceLabsBikeLightText);

  await cart.goToCart();
  await cart.clickOnCheckout();
  await cart.fillInformation(
    constant.checkOutData.firstName,
    constant.checkOutData.lastName,
    constant.checkOutData.postalCode
  );
  await cart.clickContinue();

  await expect(page).toHaveURL(constant.urls.checkoutStepTwo);

  const subTotal = await cart.getSubTotal();
  expect(subTotal).toBeGreaterThan(0);

  const tax = await cart.getTax();
  expect(tax).toBeGreaterThan(0);

  const totalPrice = await cart.getTotalPrice();
  expect(totalPrice).toBeGreaterThan(0);
  expect(totalPrice).toBeCloseTo(subTotal + tax, 2);

  await cart.clickFinishButton();

  await expect(page).toHaveURL(constant.urls.ThankYouPageUrl);
  await expect(cart.completeHeader).toHaveText('Thank you for your order!');
});