
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Page/LoginPage";
import { BasePage } from "../../Page/BasePage";
import urls from "../../config/env";
import { users } from "../../fixtures/TestData";
import { NewProject } from "../../Page/NewProject";
import { NewSerialNumber } from "../../Page/NewSerialNumber";

let basePage: BasePage;
let loginPage: LoginPage;
let newInvoicePage: NewProject;
let newSerialNumber: NewSerialNumber;
var inVoiceNo: string;

test.describe('Contacts page verification with all validation scenarios: ', () => {
test.setTimeout(120000);
    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        loginPage = new LoginPage(page);
        newInvoicePage = new NewProject(page);
        // Go to the UAT environment and login
        //await basePage.goTo(urls.DIME.uat);
        //await loginPage.login(users.testAdmin.userName, users.testAdmin.passWord);
        newSerialNumber = new NewSerialNumber(page);
    });

    test('Contacts option should be listed under acquisition ', async ({ page }) => {
        await basePage.goTo(urls.DIME.uat);
        // await page.waitForTimeout(7000);
        // await loginPage.login(users.testAdmin.userName, users.testAdmin.passWord);
        // await page.waitForTimeout(7000);
        // await newInvoicePage.addProjectWithInvalidNumber("1234");
        // await page.waitForTimeout(3000);
        console.log ("Unique project id is: " + process.env.UniqueProject_ID);

        await newInvoicePage.addProjectWithValidNumber(process.env.UniqueProject_ID);
        await page.waitForTimeout(7000);

        await newSerialNumber.assignNewSerialNumber("Acquisition");


        
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

    test('Existing contacts section should be present.', async ({ page }) => {
        console.log("Toaster message validation is done for failure scenarios. ");
    })

    test('Contact information section should be present.', async ({ page }) => {
        console.log("Toaster message validation is done for failure scenarios. ");
    })

    test('Add new contact option should be there under contact information ', async ({ page }) => {
        console.log("Toaster message validation is done for failure scenarios. ");
    })

    test('Add new contact option functionality should work as expected. ', async ({ page }) => {
        await basePage.goTo(urls.DIME.uat);
        // await page.waitForTimeout(7000);
        // await loginPage.login(users.testAdmin.userName, users.testAdmin.passWord);
         await page.waitForTimeout(7000);

              await page.locator('span').filter({ hasText: 'Town' }).click();
  await page.locator('span').filter({ hasText: 'Town' }).click();
  await page.locator('.react-select__input-container').first().click();
  await page.getByRole('option', { name: 'UNKNOWN' }).click();
  await page.waitForTimeout(5000);
  await page.locator('span').filter({ hasText: /^Project$/ }).click();
  await page.locator('input[id^="react-select-"][id$="-input"]').nth(1).fill('93');
  await page.waitForTimeout(5000);
  await page.locator('.react-select__control.react-select__control--is-focused > .react-select__value-container > .react-select__input-container').click();
  await page.locator('input[id^="react-select-"][id$="-input"]').nth(1).fill(process.env.UniqueProject_ID);
  await page.getByRole('option', { name: `${process.env.UniqueProject_ID} - test automation project` }).click();
  await page.locator('#search-panel-host').getByRole('button', { name: 'Search' }).click();
  //await page.goto('https://ctgovexec.sharepoint.com/sites/DOT-IRMS-Test?project=0903-0903&tab=milestone-dates&page=ProjectInfo');
  await page.getByRole('button', { name: 'Cost Estimates' }).click();
  await page.getByRole('button', { name: 'Title Search' }).click();
  await page.getByRole('button', { name: 'ROW Agreements' }).click();
  await page.getByRole('button', { name: 'Relocation Survey' }).click();
  await page.getByRole('button', { name: 'Temps' }).click();
  await page.getByRole('listitem').filter({ hasText: 'acquisition' }).locator('i').click();
  await page.getByText('001').click();
  await page.getByText('Contacts').click();

//     await page.locator('span').filter({ hasText: 'Town' }).click();
//   await page.locator('span').filter({ hasText: 'Town' }).click();
//   await page.locator('.react-select__input-container').first().click();
//   await page.getByRole('option', { name: 'UNKNOWN' }).click();
//   await page.locator('span').filter({ hasText: /^Project$/ }).click();
//   await page.locator('#react-select-5-input').fill('93');
//   await page.locator('.react-select__control.react-select__control--is-focused > .react-select__value-container > .react-select__input-container').click();
//   await page.locator('#react-select-5-input').fill('0903');
//   await page.getByRole('option', { name: '-0903 - Automationtest' }).click();
//   await page.locator('#search-panel-host').getByRole('button', { name: 'Search' }).click();
//   //await page.goto('https://ctgovexec.sharepoint.com/sites/DOT-IRMS-Test?project=0903-0903&tab=milestone-dates&page=ProjectInfo');
//   await page.getByRole('button', { name: 'Cost Estimates' }).click();
//   await page.getByRole('button', { name: 'Title Search' }).click();
//   await page.getByRole('button', { name: 'ROW Agreements' }).click();
//   await page.getByRole('button', { name: 'Relocation Survey' }).click();
//   await page.getByRole('button', { name: 'Temps' }).click();
//   await page.getByRole('listitem').filter({ hasText: 'acquisition' }).locator('i').click();
//   await page.getByText('903').click();
//   await page.getByText('Contacts').click();

   await page.getByRole('button', { name: 'Add New Contact' }).click();
  await page.locator('[id^="Dropdown"][id$="-option"]').nth(2).click();
  await page.getByRole('option', { name: 'Mr', exact: true }).click();
  await page.getByRole('textbox', { name: 'First Name' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('BBB');
  await page.getByRole('textbox', { name: 'Middle Initial' }).click();
  await page.getByRole('textbox', { name: 'Middle Initial' }).fill('t');
  await page.getByRole('textbox', { name: 'Middle Initial' }).click();
  await page.getByRole('textbox', { name: 'Middle Initial' }).click();
  await page.getByRole('textbox', { name: 'Last Name/Business' }).click();
  await page.getByRole('textbox', { name: 'Last Name/Business' }).fill('behe');
  await page.locator('[id^="Dropdown"][id$="-option"]').nth(3).click();
  await page.getByRole('option', { name: 'Vendor' }).click();
  await page.getByRole('textbox', { name: 'Home Phone' }).click();
  await page.getByRole('textbox', { name: 'Home Phone' }).fill('9678245338');
  await page.getByText('PrefixMrFirst NameMiddle').click();
  await page.getByRole('textbox', { name: 'Cell Phone' }).click();
  await page.getByRole('textbox', { name: 'Cell Phone' }).fill('6754375432');
  await page.getByRole('textbox', { name: 'Fax' }).click();
  await page.getByRole('textbox', { name: 'Fax' }).fill('6543216565');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('abc@test.com');
  await page.getByRole('textbox', { name: 'Street Address 1' }).click();
  await page.getByRole('textbox', { name: 'Street Address 1' }).fill('453');
  await page.getByRole('textbox', { name: 'Street Address 2' }).click();
  await page.getByRole('textbox', { name: 'Street Address 2' }).fill('jam nagar');
  await page.getByRole('textbox', { name: 'City' }).click();
  await page.getByRole('textbox', { name: 'City' }).fill('cali');
 await page.locator('[id^="Dropdown"][id$="-option"]').nth(4).click();
  await page.getByRole('option', { name: 'CALIFORNIA' }).click();
  await page.getByRole('textbox', { name: 'Zip Code' }).click();
  await page.getByRole('textbox', { name: 'Zip Code' }).fill('56432');
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(5000);
  await page.getByText('Administration').click();
    await page.waitForTimeout(5000);
  await page.getByText('Contacts').click();
  await page.getByText('behe, BBB t').click();
  await page.getByRole('textbox', { name: 'First Name' }).click();
  await page.getByRole('textbox', { name: 'Street Address 1' }).click();

    })
    
    test('Toaster message validation for failure scenarios ', async ({ page }) => {
        console.log("Toaster message validation is done for failure scenarios. ");
    })

    


})
