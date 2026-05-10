# SauceDemo Web Automation Testing Project Using Playwright
###
This project was developed as part of a web automation testing assignment using Playwright with JavaScript. The framework was designed using Page Object Model (POM) structure and includes cross-browser execution, sequential execution, Allure reporting, failure analysis, screenshots, videos and GitHub integration.

## Project Overview

This project demonstrates automated web testing for the SauceDemo website using Playwright with JavaScript.
  
Website link: https://www.saucedemo.com/  

The automation framework was developed using:
* Playwright
* JavaScript
* Page Object Model (POM)
* Cross-browser testing
* Allure Reporting
* GitHub

The project questions are:

* Q1: Try login with locked_out_user and verify the error message.
* Q2: Log in with standard_user. Then, from the hamburger menu, reset the App State. Add any three items to the cart. Navigate to the final checkout page and verify the product name and total price. Finish the purchase journey and verify the successful order message. Then, reset the App State again and log out.
* Q3: Login with performance_glitch_user and reset the App State. Then filter by name (Z to A) and select the first product into the cart. Then navigate up to the final checkout page and verify all the products' names and the total price. Then finish the purchase journey and verify the successful order message. Then, reset the App State again and log out.

---

# Project Structure

```text
PROJECT 2/
│
├── allure-report-failure/
├── allure-report-success/
├── allure-results-failure/
├── allure-results-success/
├── node_modules/
│
├── pageObjects/
│   ├── CartPage.js
│   ├── CheckoutCompletePage.js
│   ├── CheckoutPage.js
│   ├── InventoryPage.js
│   └── LoginPage.js
│
├── test-results/
│
├── tests/
│   ├── lockedOutUser.spec.js
│   ├── purchaseFlow.spec.js
│   └── zToAPurchaseFlow.spec.js
│
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.js
└── README.md
```

---

# Tools & Technologies Used

| Tool          | Purpose                |
| ------------- | ---------------------- |
| Playwright    | Web Automation Testing |
| JavaScript    | Programming Language   |
| VS Code       | IDE                    |
| GitHub        | Version Control        |
| Allure Report | Test Reporting         |

---

# Tests Implemented

## Q1 -  Try login with locked_out_user and verify the error message.

### Objective

Verify that a locked-out user cannot log into the application.

### Test File

```text
lockedOutUser.spec.js
```

### Steps

1. Open website
2. Enter "locked_out_user' username
3. Enter password "secret_sauce"
4. Click Login button
5. Verify error message is displayed

### Validation

Expected error message:

```text
Epic sadface: Sorry, this user has been locked out.
```

---

## Q2 - Log in with standard_user. Then, from the hamburger menu, reset the App State. Add any three items to the cart. Navigate to the final checkout page and verify the product name and total price. Finish the purchase journey and verify the successful order message. Then, reset the App State again and log out.

### Objective

Automate the complete purchase flow for a "standard user".

### Test File

```text
purchaseFlow.spec.js
```

### Steps

1. Open website
2. Login with "standard_user" and password "secret_sauce"
3. Open hamburger menu
4. Click "Reset App State"
5. Add any 3 products to cart
6. Open cart page
7. Click Checkout button
8. Fill checkout information
9. Click Continue button
10. Verify product names
11. Verify total price
12. Click Finish button
13. Verify successful order completion message
14. Open hamburger menu again
15. Click "Reset App State" again
16. Click Logout
17. Verify user redirected to login page

### Success Validation

Expected message:

```text
Thank you for your order!
```

---

## Q3 - Login with performance_glitch_user and reset the App State. Then filter by name (Z to A) and select the first product into the cart. Then navigate up to the final checkout page and verify all the products' names and the total price. Then finish the purchase journey and verify the successful order message. Then, reset the App State again and log out.

### Objective

Test purchase flow using "performance_glitch_user" and analyze timeout issue.

### Test File

```text
zToAPurchaseFlow.spec.js
```

### Steps

1. Open website
2. Login with "performance_glitch_user" and password "secret_sauce"
3. Open hamburger menu
4. Click "Reset App State"
5. Sort products by Name "Z to A"
6. Select the first product after sorting
7. Add the selected product to cart
8. Open cart page
9. Click Checkout button
10. Fill checkout information
11. Click Continue button
12. Verify product name
13. Verify total price
14. Click Finish button
15. Verify successful order completion message
16. Open hamburger menu again
17. Click "Reset App State"
18. Click Logout
19. Verify user redirected to login page

# Q3 Timeout Analysis

During execution, the performance_glitch_user account caused slower website response.

When Playwright default timeout was used:

```javascript
// test.setTimeout not used
```

The test failed because the default timeout limit was exceeded.

### Failure Observed

* Timeout exceeded
* Browser response delay
* Slower page loading
* Logout action failed after timeout

### Solution Applied

Custom timeout was added:

```javascript
test.setTimeout(90000);
```

After increasing timeout:

* Test passed successfully
* All browsers executed properly
* Purchase flow completed successfully

---

# Cross Browser Testing

Tests were executed in:

* Chromium
* Firefox
* Webkit

All three scenarios were:

* Run separately
* Run sequentially together

---

# Playwright Configuration

## Slow Motion

```javascript
launchOptions: {
    slowMo: 1000,
}
```

Used to visually observe automation steps.

---

## Screenshot Capture

```javascript
screenshot: 'only-on-failure'
```
Captures screenshot only when test fails.

---

## Video Recording

```javascript
video: 'retain-on-failure'
```
Stores video evidence for failed tests.

---

# Reporting

## Allure Reporting

Two types of reports were generated:

### Success Report

Folder:

```text
allure-report-success
```

Contains:

* Successful execution
* Browser-wise results
* Execution timing
* Test summary

---

### Failure Report

Folder:

```text
allure-report-failure
```

Contains:

* Timeout failure analysis
* Broken test execution
* Browser-wise failure
* Debugging evidence

---

# Failure Evidence

Failure screenshots, videos and traces are stored inside:

```text
test-results
```

Contains:

* Screenshots (.png)
* Videos (.webm)
* Error-context

---


## Allure Report Generation Process

In this project,two types of Allure reports were created :

1. Success report
2. Failure report

The reason for creating two reports is to show both successful automation execution and failure analysis for Q3.

### Step 1: Success Execution With Timeout

For Q3, "performance_glitch_user" is intentionally slow. So custom timeout added :

```javascript
test.setTimeout(90000);
```
Then ran all tests:

```bash
npx playwright test
```
This generated raw Allure result data in:

```text
allure-results
```
Then renamed it as:

```text
allure-results-success
```

This folder contains raw successful test execution data.

### Step 2: Generate Readable Success Report

Raw "allure-results-success" is not easy to read directly. So converted it into a readable Allure report:

```bash
allure generate allure-results-success --clean -o allure-report-success
```
Final readable success report folder:

```text
allure-report-success
```

### Step 3: Failure Execution Without Timeout

To show failure analysis, temporarily commented the Q3 custom timeout:

```javascript
// test.setTimeout(90000);
```
Then ran all tests again:

```bash
npx playwright test
```
This time Q3 failed because "performance_glitch_user" was too slow for the default Playwright timeout.

This generated raw failed test data in:

```text
allure-results
```

Then renamed it as:

```text
allure-results-failure
```

### Step 4: Generate Readable Failure Report

Raw "allure-results-failure" is also not easy to read directly. So converted it into a readable Allure report:

```bash
allure generate allure-results-failure --clean -o allure-report-failure
```
Final readable failure report folder:

```text
allure-report-failure
```

### Step 5: View Reports Locally

Success report:

```bash
allure open allure-report-success
```

Failure report:

```bash
allure open allure-report-failure
```



### Explanation of Q3 Failure

Q3 uses "performance_glitch_user", which loads pages slower than normal users. Without custom timeout, Playwright default timeout was not enough, so Q3 failed.

After analyzing the failure report, added:

```javascript
test.setTimeout(90000);
```
This made Q3 stable and allowed the full execution to complete successfully.


# How To Run This Project

## Step 1

Clone repository:

```bash
git clone "https://github.com/Rawnakj1208/saucedemo-web-automation-with-playwright-project2.git"
```
---

## Step 2

Install dependencies:

```bash
npm install
```
---

## Step 3

## Run Single Test

### Q1
```bash
npx playwright test tests/lockedOutUser.spec.js --headed
```
### Q2
```bash
npx playwright test tests/purchaseFlow.spec.js --headed
```
### Q3
```bash
npx playwright test tests/zToAPurchaseFlow.spec.js --headed
```
### Run All Tests Sequentially
```bash
npx playwright test --headed
```

---

# How To View Reports

## Success Report

Open:

```text
allure-report-success/index.html
```
---
or Run command in terminal
```bash
allure open allure-report-success
```

## Failure Report

Open:

```text
allure-report-failure/index.html
```
---

or Run command in terminal
```bash
allure open allure-report-failure
```
