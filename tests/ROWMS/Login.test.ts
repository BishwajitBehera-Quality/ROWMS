import { test, expect, type Page} from "@playwright/test";
import {BasePage} from "../../Page/BasePage";
import { LoginPage } from '../../Page/LoginPage';
import urls from "../../config/env";
import {users} from "../../fixtures/TestData";

let basePage: BasePage;
let loginPage: LoginPage;


test.describe('Login Functionality @login',() => {

    //test.setTimeout(120000);
    test.beforeEach(async ({ page }) => {

        basePage = new BasePage(page);
        loginPage = new LoginPage(page);

    });

    test('Login with valid credentials for admin role @smoke', async ({page}) => {

        await basePage.goTo(urls.DIME.uat);
        //await basePage.waitForPageLoad();
        await page.waitForTimeout (7000);
        await loginPage.login(users.testAdmin.userName, users.testAdmin.passWord);
        //await basePage.verifyTitle("DIME");
        await page.waitForTimeout (7000);
    })

    test('Login with Invalid credentials for admin role @smoke', async ({page}) => {

        await basePage.goTo(urls.DIME.uat);
       // await basePage.waitForPageLoad();
       await page.waitForTimeout (7000);
        await loginPage.login(users.dummyUser.userName, users.dummyUser.passWord);
    })


})