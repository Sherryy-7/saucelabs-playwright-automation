
class Inventory {
    constructor(page) {
        this.page = page;
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.itemPrices = page.locator  ('[data-test="inventory-item-prices"]');
    }

    getProductCard(productName) {
        return this.inventoryItems.filter({
            hasText: productName
        });
    }

   async addProductToCart(productName) {

    console.log('Searching product:', productName);

    await this.inventoryItems.first().waitFor({
        state: 'visible'
    });

    console.log(
        'Total inventory items:',
        await this.inventoryItems.count()
    );

    console.log(
        'Available products:',
        await this.inventoryItems.allTextContents()
    );

    const product = this.getProductCard(productName);

    console.log('Matching product count:', await product.count());

    await product.getByRole('button', {
        name: 'Add to cart'
    }).click();
}

    async getCartCount() {
        if (await this.cartBadge.count() === 0) {
            return 0;
        }

        return Number(await this.cartBadge.textContent());
    }
async sortBy (option) {

await this.sortDropdown.selectOption(option);   // this will select low-hi
}

async getAllProductPrices(){
const priceTexts = await this.itemPrices.allTextContents();
return priceTexts.map((p) => parseFloat(p.replace('$','')));

}


}
module.exports = { Inventory };
