import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class NewSerialNumber extends BasePage {

    private file: Locator;
    private menuitem: Locator;
    private projectNo: Locator;
    private projMenu: Locator;
    private saveButton: Locator;
    private transactionDropdown: Locator;
    private serialNoTextBox: Locator;
    private stretAddr1: Locator;
    private submitButton: Locator;
    private townList: Locator;
    private stateList: Locator;
    private zip: Locator;
    private closeIcon: Locator;
    private stretAddr2: Locator;
    private errorMessage: Locator;
    private transitionCategoryAcquisitionOption: Locator;
    private transitionCategoryConcurrenceOption: Locator;
    private transitionCategoryLeaseOption: Locator;
    private transitionCategoryReleaseOption: Locator;


    constructor(page: Page) {
        super(page);

        this.file = page.getByRole('button', { name: 'File', exact: true });
        this.menuitem = page.getByRole('menuitem', { name: 'Add New Serial Number' });
        this.projectNo = page.locator('#react-select-3-input');
        this.projMenu = page.getByRole('option', { name: process.env.UniqueProject_ID });
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.transactionDropdown = page.locator('[id^="Dropdown"][id$="-option"]');
        this.serialNoTextBox = page.getByRole('textbox', { name: 'Serial Number' });
        this.stretAddr1 = page.getByRole('textbox', { name: 'Street Address 1' });
        this.stretAddr2 = page.getByRole('textbox', { name: 'Street Address 2' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.townList = page.getByRole('cell', { name: 'Town' }).locator('svg');
        this.stateList = page.getByRole('cell', { name: 'State' }).locator('svg')
        this.zip = page.getByRole('textbox', { name: 'Zip' });

        this.closeIcon = page.getByRole('button', { name: 'Sign in' });
        this.errorMessage = page.locator('[id^="MessageBar"]');

        this.transitionCategoryAcquisitionOption = page.getByRole('option', { name: 'ACQUISITION' });
        this.transitionCategoryConcurrenceOption = page.getByRole('option', { name: 'CONCURRENCE' });
        this.transitionCategoryLeaseOption = page.getByRole('option', { name: 'LEASE' });
        this.transitionCategoryReleaseOption = page.getByRole('option', { name: 'RELEASE' });
        

    }

    async assignNewSerialNumber( transitionType: string): Promise<void> {

    // await page.goto('https://ctgovexec.sharepoint.com/sites/DOT-IRMS-Test?project=0001-0001&page=Homepage&tab=litigation&parcel=364801');
    // await page.getByRole('textbox', { name: 'someone@example.com' }).fill('CompassAdmin@ct.gov');
    // await page.getByRole('textbox', { name: 'someone@example.com' }).click();
    // await page.getByRole('button', { name: 'Next' }).click();
    // await page.locator('#i0118').fill('6WV_H%Y:S/%*c>*L');
    // await page.getByRole('button', { name: 'Sign in' }).click();

    let transitionCategory = transitionType.toUpperCase();
    await this.file.click();
    await this.menuitem.click();
    await this.projectNo.click();

    await this.page.reload();

    await this.projectNo.click();
    await this.projectNo.fill(process.env.UniqueProject_ID);
    await this.projMenu.click();

    await this.transactionDropdown.first().click();

    switch (transitionCategory) {
        case "ACQUISITION":
            await this.transitionCategoryAcquisitionOption.click();
            break;
        case "CONCURRENCE":
            await this.transitionCategoryConcurrenceOption.click();
            break;
        case "LEASE":
            await this.transitionCategoryLeaseOption.click();
            break;
        case "RELEASE":
            await this.transitionCategoryReleaseOption.click();
            break;
        default:
            console.log(`Invalid transition category: ${transitionCategory}`);
    }


    // if (transitionCategory === "ACQUISITION") {
    //     await this.transitionCategoryAcquisitionOption.click();
    // }
    //await this.page.getByRole('option', { name: 'transitionCategory' }).click();

    await this.serialNoTextBox.click();
    await this.serialNoTextBox.fill('001B');
    await this.stretAddr1.click();
    await this.stretAddr1.fill('Addrs01A');
    await this.stretAddr2.click();
    await this.stretAddr2.fill('Address02');
    await this.townList.click();

    await this.page.getByRole('option', { name: 'UNKNOWN' }).click();
    await this.zip.click();
    await this.zip.fill('75601');
    await this.saveButton.click();
    await this.errorMessage.click();
    
    
    

    //await page.getByRole('button', { name: 'File', exact: true }).click();
    //await page.getByRole('menuitem', { name: 'Add New Serial Number' }).click();
    //await page.locator('span:nth-child(2) > .reactSelect_67e02d0b > .rsControl_67e02d0b > .css-hlgwow > .css-19bb58m').click();

    //await page.reload();
    //await page.locator('span:nth-child(2) > .reactSelect_67e02d0b > .rsControl_67e02d0b > .css-hlgwow > .css-19bb58m').click();
    //await page.locator('#react-select-3-input').fill('1234');
    //await page.getByRole('option', { name: '-5678 - test automation project' }).click();
    // await page.locator('#Dropdown28-option').click();
    // await page.getByRole('option', { name: 'ACQUISITION' }).click();
  
    // await page.getByRole('textbox', { name: 'Serial Number' }).click();
    // await page.getByRole('textbox', { name: 'Serial Number' }).fill('001B');
    // await page.getByRole('textbox', { name: 'Serial Number' }).click();
    // await page.getByRole('textbox', { name: 'Street Address 1' }).click();
    // await page.getByRole('textbox', { name: 'Street Address 1' }).fill('Addrs01A');
    // await page.getByRole('textbox', { name: 'Street Address 2' }).click({
    //     modifiers: ['Shift']
    // });
    // await page.getByRole('textbox', { name: 'Street Address 2' }).click();
    // await page.getByRole('textbox', { name: 'Street Address 2' }).fill('Address02');
    // await page.getByRole('cell', { name: 'Town' }).locator('svg').click();
    // await page.getByRole('option', { name: 'UNKNOWN' }).click();
    // await page.getByRole('textbox', { name: 'ZIP' }).click();
    // await page.getByRole('textbox', { name: 'ZIP' }).fill('75601');
    // await page.getByRole('button', { name: 'Save' }).click();

    // Validate error popup appears
        await this.validateSuccessPopup("New serial number successfully added.");

        await this.sleep(7);
    }

    async validateErrorPopup(expectedText?: string): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
        if (expectedText) {
            await expect(this.errorMessage).toContainText(expectedText);
        }
        console.log("Error popup validated successfully.");
    }

    async validateSuccessPopup(expectedText?: string): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
        if (expectedText) {
            await expect(this.errorMessage).toContainText(expectedText);
        }
        console.log("Success popup validated successfully.");
    }
}