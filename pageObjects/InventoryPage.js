class InventoryPage{

    constructor(page){

        this.page = page;

        this.menuButton = this.page.getByRole("button",{name:"Open Menu"});

        this.resetAppStateLink = this.page.getByRole("link",{name:"Reset App State"});

        this.logoutLink = this.page.getByRole("link",{name:"Logout"});

        this.backpackAddToCartButton = this.page.locator("//button[@data-test='add-to-cart-sauce-labs-backpack']");

        this.bikeLightAddToCartButton = this.page.locator("//button[@data-test='add-to-cart-sauce-labs-bike-light']");

        this.boltTShirtAddToCartButton = this.page.locator("//button[@data-test='add-to-cart-sauce-labs-bolt-t-shirt']");

        this.cartLink = this.page.locator("//a[@data-test='shopping-cart-link']");
    }

    async openMenu(){

        await this.menuButton.click();
    }

    async resetAppState(){

        await this.resetAppStateLink.click();
    }

    async addThreeProductsToCart(){

        await this.backpackAddToCartButton.click();

        await this.bikeLightAddToCartButton.click();

        await this.boltTShirtAddToCartButton.click();
    }

    async goToCart(){

        await this.cartLink.click();
    }

    async logout(){

        await this.logoutLink.click();
    }

}

module.exports = { InventoryPage };