const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pageObjects/LoginPage');

const { InventoryPage } = require('../pageObjects/InventoryPage');

const { CartPage } = require('../pageObjects/CartPage');

const { CheckoutPage } = require('../pageObjects/CheckoutPage');

const { CheckoutCompletePage } = require('../pageObjects/CheckoutCompletePage');

test.describe("Z to A Purchase Flow test",()=>{

    test("Q3 performance_glitch_user Test", async({page})=>{
        test.setTimeout(90000);

        const loginPage = new LoginPage(page);

        const inventoryPage = new InventoryPage(page);

        const cartPage = new CartPage(page);

        const checkoutPage = new CheckoutPage(page);

        const checkoutCompletePage = new CheckoutCompletePage(page);

        await loginPage.openWebsite();

        // Login
        await loginPage.enterUsername("performance_glitch_user");

        await loginPage.enterPassword("secret_sauce");

        await loginPage.clickOnLoginButton();

        // Opening hamburger Menu
        await inventoryPage.openMenu();

        // Reset App State
        await inventoryPage.resetAppState();

        // Sorting Products Z to A
        await inventoryPage.sortProductsZToA();

        // Adding First Product
        await inventoryPage.addFirstProductToCart();

        // Going To Cart
        await inventoryPage.goToCart();

        // Verifying Product Name In Cart
        const cartProducts = await cartPage.getAllProductNames();

        await expect(cartProducts.length).toBe(1);

        // Checkout
        await cartPage.clickOnCheckoutButton();

        // Fill Checkout Information
        await checkoutPage.enterFirstName("Rawnak");

        await checkoutPage.enterLastName("Jahan");

        await checkoutPage.enterPostalCode("1208");

        await checkoutPage.clickOnContinueButton();

        // Verifying Product Name In Overview Page
        const overviewProducts = await checkoutPage.getAllProductNames();

        await expect(overviewProducts.length).toBe(1);

        // Verifying Total Price
        const totalPrice = await checkoutPage.getTotalPrice();

        await expect(totalPrice).toContain("Total");

        // Finish Order
        await checkoutCompletePage.clickOnFinishButton();

        // Verify Success Message
        const successMessage = await checkoutCompletePage.getSuccessMessage();

        await expect(successMessage).toContain("Thank you for your order!");

        // Open Menu Again
        await inventoryPage.openMenu();

        // Reset App State Again
        await inventoryPage.resetAppState();

        // Logout
        await inventoryPage.logout();

    });

});