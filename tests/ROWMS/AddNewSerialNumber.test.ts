import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Page/LoginPage";
import { BasePage } from "../../Page/BasePage";
import urls from "../../config/env";
import { users } from "../../fixtures/TestData";
import { NewSerialNumber } from "../../Page/NewSerialNumber";

let basePage: BasePage;
let loginPage: LoginPage;
let newSerialNumber: NewSerialNumber;
var inVoiceNo: string;

test.describe('Add a new serial number', () => {
test.setTimeout(120000);
    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        loginPage = new LoginPage(page);
        newSerialNumber = new NewSerialNumber(page);
        // Go to the UAT environment and login
        //await basePage.goTo(urls.DIME.uat);
        //await loginPage.login(users.testAdmin.userName, users.testAdmin.passWord);
        
    });

    test('Validate serial number should be in proper format ', async ({ page }) => {
    })
    
    test('Add a new serial number with valid format ', async ({ page }) => {
        // let projectNoPart1: String = basePage.generateRandomNumber(4);
        // let projectNoPart2: String = basePage.generateRandomNumber(4);
        // let projectNo: String = projectNoPart1 + "-" + projectNoPart2;
        // console.log("Project no is:" + projectNo);
        await basePage.goTo(urls.DIME.uat);
        //await basePage.waitForPageLoad();
        await page.waitForTimeout (7000);
        await loginPage.login(users.testAdmin.userName, users.testAdmin.passWord);
        await page.waitForTimeout (7000);
        await newSerialNumber.assignNewSerialNumber("Acquisition");

        
    })

    


})







