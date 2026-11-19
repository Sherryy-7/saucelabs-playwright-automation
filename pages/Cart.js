class Cart {
  constructor(page) {
    this.page = page;

    this.cartLink = page.locator('.shopping_cart_link');

    // Poora item (container) - Remove button isi ke andar hota hai
    this.cartItem = page.locator('[data-test="inventory-item"]');
    // Sirf product ka naam
    this.itemNames = page.locator('[data-test="inventory-item-name"]');

    this.checkOutButton = page.locator('[data-test="checkout"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueOverviewButton = page.locator('[data-test="continue"]');

    this.subtotal = page.locator('[data-test="subtotal-label"]');
    this.tax = page.locator('[data-test="tax-label"]');
    this.totalPrice = page.locator('[data-test="total-label"]');

    // Locator ke naam alag rakhe, taaki methods se na takraayein
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async getAllCartNames() {
    return await this.itemNames.allTextContents();
  }

  getCartItemByName(productName) {
    return this.cartItem.filter({ hasText: productName });
  }

  async removeProduct(productName) {
    const item = this.getCartItemByName(productName);
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async getCartItemCount() {
    return await this.cartItem.count();
  }

  async clickOnCheckout() {
    await this.checkOutButton.click();
  }

  async fillInformation(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue() {
    await this.continueOverviewButton.click();
  }

  async getSubTotal() {
    const text = await this.subtotal.textContent();
    return parseFloat(text.replace('Item total: $', ''));
  }

  async getTax() {
    const text = await this.tax.textContent();
    return parseFloat(text.replace('Tax: $', ''));
  }

  async getTotalPrice() {
    const text = await this.totalPrice.textContent();
    return parseFloat(text.replace('Total: $', ''));
  }

  async clickFinishButton() {
    await this.finishButton.click();
  }
}

module.exports = { Cart };