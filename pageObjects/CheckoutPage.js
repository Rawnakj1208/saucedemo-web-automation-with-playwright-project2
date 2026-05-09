class CheckoutPage{

    constructor(page){

        this.page = page;

        this.firstNameInputField = this.page.getByRole("textbox",{name:"First Name"});

        this.lastNameInputField = this.page.getByRole("textbox",{name:"Last Name"});

        this.postalCodeInputField = this.page.getByRole("textbox",{name:"Zip/Postal Code"});

        this.continueButton = this.page.getByRole("button",{name:"Continue"});

        this.totalPriceText = this.page.locator(".summary_total_label");

        this.productNames = this.page.locator(".inventory_item_name");
    }

    async enterFirstName(firstName){

        await this.firstNameInputField.fill(firstName);
    }

    async enterLastName(lastName){

        await this.lastNameInputField.fill(lastName);
    }

    async enterPostalCode(postalCode){

        await this.postalCodeInputField.fill(postalCode);
    }

    async clickOnContinueButton(){

        await this.continueButton.click();
    }

    async getTotalPrice(){

        return await this.totalPriceText.textContent();
    }

    async getAllProductNames(){

        return await this.productNames.allTextContents();
    }

}

module.exports = { CheckoutPage };