class LoginPage{

    constructor(page){

        this.page = page;

        this.usernameInputField = this.page.getByRole("textbox",{name:"Username"});

        this.passwordInputField = this.page.getByRole("textbox",{name:"Password"});

        this.loginButton = this.page.getByRole("button",{name:"Login"});

        this.errorMessage = this.page.locator("//h3[@data-test='error']");
    }

    async openWebsite(){

        await this.page.goto("https://www.saucedemo.com/");
    }

    async enterUsername(username){

        await this.usernameInputField.fill(username);
    }

    async enterPassword(password){

        await this.passwordInputField.fill(password);
    }

    async clickOnLoginButton(){

        await this.loginButton.click();
    }

    async getErrorMessage(){

        return await this.errorMessage.textContent();
    }

}

module.exports = { LoginPage };