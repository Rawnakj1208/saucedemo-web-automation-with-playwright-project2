const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pageObjects/LoginPage');

const { InventoryPage } = require('../pageObjects/InventoryPage');

const { CartPage } = require('../pageObjects/CartPage');

const { CheckoutPage } = require('../pageObjects/CheckoutPage');

const { CheckoutCompletePage } = require('../pageObjects/CheckoutCompletePage');

test.describe("Purchase Flow for standard-user",()=>{

    test("Q2 standard-user Purchase Test", async({page})=>{

        const loginPage = new LoginPage(page);

        const inventoryPage = new InventoryPage(page);

        const cartPage = new CartPage(page);

        const checkoutPage = new CheckoutPage(page);

        const checkoutCompletePage = new CheckoutCompletePage(page);

        
        await loginPage.openWebsite();

        // Login
        await loginPage.enterUsername("standard_user");

        await loginPage.enterPassword("secret_sauce");

        await loginPage.clickOnLoginButton();

        // Opening hamburger menu
        await inventoryPage.openMenu();

        // Reset App State
        await inventoryPage.resetAppState();

        // Adding 3 Products
        await inventoryPage.addThreeProductsToCart();

        // Going To Cart
        await inventoryPage.goToCart();

        // Verifying Product Names In Cart
        const cartProducts = await cartPage.getAllProductNames();

        await expect(cartProducts.length).toBe(3);

        // Checkout
        await cartPage.clickOnCheckoutButton();

        // Filling Checkout Information
        await checkoutPage.enterFirstName("Rawnak");
        await checkoutPage.enterLastName("Jahan");
        await checkoutPage.enterPostalCode("1208");
        await checkoutPage.clickOnContinueButton();

        // Verifying Product Names
        const overviewProducts = await checkoutPage.getAllProductNames();

        await expect(overviewProducts.length).toBe(3);

        // Verifying Total Price
        const totalPrice = await checkoutPage.getTotalPrice();

        await expect(totalPrice).toContain("Total");

        // Finish Order
        await checkoutCompletePage.clickOnFinishButton();

        // Verify Success Message
        const successMessage = await checkoutCompletePage.getSuccessMessage();

        await expect(successMessage)
        .toContain("Thank you for your order!");

        // Open Menu Again
        await inventoryPage.openMenu();
        // Reset App State Again
        await inventoryPage.resetAppState();

        // Logout
        await inventoryPage.logout();

    });

});