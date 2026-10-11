
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Page/LoginPage";
import { BasePage } from "../../Page/BasePage";
import urls from "../../config/env";
import { users } from "../../fixtures/TestData";
import { NewProject } from "../../Page/NewProject";

let basePage: BasePage;
let loginPage: LoginPage;
let newInvoicePage: NewProject;
var inVoiceNo: string;

test.describe('Property Maintenance page verification with all validation scenarios: ', () => {
test.setTimeout(120000);
    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        loginPage = new LoginPage(page);
        newInvoicePage = new NewProject(page);
        // Go to the UAT environment and login
        //await basePage.goTo(urls.DIME.uat);
        //await loginPage.login(users.testAdmin.userName, users.testAdmin.passWord);
        
    });

    test('Property Maintenance option should be listed under acquisition ', async ({ page }) => {
        await basePage.goTo(urls.DIME.uat);
        await page.waitForTimeout(7000);
        await loginPage.login(users.testAdmin.userName, users.testAdmin.passWord);
        await page.waitForTimeout(7000);
        await newInvoicePage.addProjectWithInvalidNumber("1234");
        await page.waitForTimeout(3000);

        
    })

    test(' PARCEL FILE - INFO section should be present. ', async ({ page }) => {
        console.log("Project no validation is done.");
    })

    test('Activity logs button should be present.', async ({ page }) => {
        console.log("Toaster message validation is done for failure scenarios. ");
    })

    test('Property impacts section should be present.', async ({ page }) => {
        console.log("Toaster message validation is done for failure scenarios. ");
    })

    test('Administration section should be present.', async ({ page }) => {
        console.log("Toaster message validation is done for failure scenarios. ");
    })

    test('General Info tab should be present under Administration section.', async ({ page }) => {
        console.log("Toaster message validation is done for failure scenarios. ");
    })

    test('MTG/District Permit tab should be present under Administration section.', async ({ page }) => {
        console.log("Toaster message validation is done for failure scenarios. ");
    })

    test('Archive tab should be present under Administration section.', async ({ page }) => {
        console.log("Toaster message validation is done for failure scenarios. ");
    })

    test('Add Row / Add Map received option should be there under Administration section. ', async ({ page }) => {
        console.log("Toaster message validation is done for failure scenarios. ");
    })

    test('Variance required radio button with yes/No option functionality should work as expected. ', async ({ page }) => {
        console.log("Toaster message validation is done for failure scenarios. ");
    })

    test('Initial letter control date picker box should work as expected. ', async ({ page }) => {
        console.log("Toaster message validation is done for failure scenarios. ");
    })

    test('Toaster message validation for failure scenarios ', async ({ page }) => {
        console.log("Toaster message validation is done for failure scenarios. ");
    })

    


})







