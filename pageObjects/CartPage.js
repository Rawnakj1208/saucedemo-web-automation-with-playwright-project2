class CartPage{

    constructor(page){

        this.page = page;

        this.checkoutButton = this.page.getByRole("button",{name:"Checkout"});

        this.productNames = this.page.locator(".inventory_item_name");
    }

    async clickOnCheckoutButton(){

        await this.checkoutButton.click();
    }

    async getAllProductNames(){

        return await this.productNames.allTextContents();
    }

}

module.exports = { CartPage };