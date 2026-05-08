const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pageObjects/LoginPage');

test.describe("Login Test",()=>{

    test("Locked Out User Test", async({page})=>{

        const loginPage = new LoginPage(page);

        await loginPage.openWebsite();

        await loginPage.enterUsername("locked_out_user");

        await loginPage.enterPassword("secret_sauce");

        await loginPage.clickOnLoginButton();

        const actualErrorMessage = await loginPage.getErrorMessage();

        await expect(actualErrorMessage)
        .toContain("Epic sadface: Sorry, this user has been locked out.");

    });

});