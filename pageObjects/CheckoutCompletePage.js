class CheckoutCompletePage{

    constructor(page){

        this.page = page;

        this.finishButton = this.page.getByRole("button",{name:"Finish"});

        this.successMessage = this.page.getByRole("heading",{name:"Thank you for your order!"});
    }

    async clickOnFinishButton(){

        await this.finishButton.click();
    }

    async getSuccessMessage(){

        return await this.successMessage.textContent();
    }

}

module.exports = { CheckoutCompletePage };