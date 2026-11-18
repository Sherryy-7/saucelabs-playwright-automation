
class Inventory {
    constructor(page) {
        this.page = page;
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.cartBadge = page.locator('.shopping_cart_badge');
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
}

module.exports = { Inventory };
