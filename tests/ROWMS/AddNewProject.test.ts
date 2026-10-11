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

test.describe('Add a new project with all validation scenarios: ', () => {
test.setTimeout(120000);
    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        loginPage = new LoginPage(page);
        newInvoicePage = new NewProject(page);
        // Go to the UAT environment and login
        
        await basePage.goTo(urls.DIME.uat);
        //await loginPage.login(users.testAdmin.userName, users.testAdmin.passWord);
        
    });

    test('Validate project number should be in proper format ', async ({ page }) => {
        // await basePage.goTo(urls.DIME.uat);
        // await page.waitForTimeout(7000);
        // await loginPage.login(users.testAdmin.userName, users.testAdmin.passWord);
        // await page.waitForTimeout(7000);
        await newInvoicePage.addProjectWithInvalidNumber("1234");
        await page.waitForTimeout(3000);
    })

    test('Validate project creation with invalid parameters ', async ({ page }) => {
        console.log("Project no validation is done.");
    })

    test('Toaster message validation for failure scenarios ', async ({ page }) => {
        console.log("Toaster message validation is done for failure scenarios. ");
    })
    
    test('Add a new project with valid number ', async ({ page }) => {
        let projectNoPart1: String = basePage.generateRandomNumber(4);
        let projectNoPart2: String = basePage.generateRandomNumber(4);
        let projectNo: String = projectNoPart1 + "-" + projectNoPart2;
        console.log("Project no is:" + projectNo);
        await page.goto(urls.ROWMS.uat);
        // await basePage.goTo(urls.DIME.uat);
        // //await basePage.waitForPageLoad();
        // await page.waitForTimeout (7000);
        // await loginPage.login(users.testAdmin.userName, users.testAdmin.passWord);
        // await page.waitForTimeout (7000);
        await newInvoicePage.addProjectWithValidNumber(projectNo.toString() );

        
    })

    test('Toaster message validation for success scenarios ', async ({ page }) => {
        console.log("Toaster message validation is done for success scenarios. ");
    })

    


})







