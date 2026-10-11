import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class NewProject extends BasePage {

    private file: Locator;
    private menuitem: Locator;
    private projectNo: Locator;
    private projDescription: Locator;
    private saveButton: Locator;
    private engName: Locator;
    private certifyCheck: Locator;
    private uploadInvoiceFile: Locator;
    private submitButton: Locator;
    private confirmButton: Locator;
    private CancelButton: Locator;
    private closeMark: Locator;
    private closeIcon: Locator;
    private newInvoice: Locator;
    private errorMessage: Locator;

    constructor(page: Page) {
        super(page);

        this.file = page.getByRole('button', { name: 'File', exact: true });
        this.menuitem = page.getByRole('menuitem', { name: 'Add New Project' });
        this.projectNo = page.getByRole('textbox', { name: 'Project Number' });
        this.projDescription = page.getByRole('textbox', { name: 'Project Description' });
        this.saveButton = page.getByRole('button', { name: 'Save' });
        //this.projectNo = page.getByRole('option', { name: '00DOT0003AA - Pearl Harbor' });
        this.engName = page.getByRole('group', { name: 'ENGINEERING CONTACT' }).getByLabel('Name');
        this.certifyCheck = page.locator('label').filter({ hasText: 'I certify the claim for' }).locator('i');
        this.uploadInvoiceFile = page.locator('input[type="file"]');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.confirmButton = page.getByRole('button', { name: 'Yes' });
        this.CancelButton = page.getByRole('button', { name: 'Next' });
        this.closeMark = page.getByRole('textbox', { name: 'Enter the password for' });
        this.closeIcon = page.getByRole('button', { name: 'Sign in' });
        this.newInvoice = page.getByRole('button', { name: 'New Invoice' });
        this.errorMessage = page.locator('[id^="MessageBar"]');

    }

    async addProject(): Promise<void> {


    await this.file.click();
 await this.menuitem.click();
  await this.projectNo.click(); 
    await this.projectNo.fill('1234');
    await this.projDescription.click();
    await this.projDescription.fill('test automation project');
    await this.saveButton.click();



    await this.projectNo.click();
    await this.projectNo.fill('1235-5678');
    await this.saveButton.click();
    await this.CancelButton.click();
//     await page.getByRole('button', { name: 'File', exact: true }).click();
//   await page.getByRole('menuitem', { name: 'Add New Project' }).click();
//   await page.getByRole('textbox', { name: 'Project Number' }).click();
//   await page.getByRole('textbox', { name: 'Project Number' }).fill('1234');
//   await page.getByRole('textbox', { name: 'Project Description' }).click();
//   await page.getByRole('textbox', { name: 'Project Description' }).click();
//   await page.getByRole('textbox', { name: 'Project Description' }).fill('test automation project');
//   await page.getByRole('button', { name: 'Save' }).click();
//   await page.locator('#MessageBar571').click();
//   await page.getByRole('textbox', { name: 'Project Number' }).click();
//   await page.getByRole('textbox', { name: 'Project Number' }).fill('1234-5678');
//   await page.getByRole('button', { name: 'Save' }).click();
//   await page.locator('#MessageBar575').click();
//   await page.getByRole('button', { name: 'Cancel' }).click();        

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


    async addProjectWithInvalidNumber(projectNumber: string): Promise<void> {
        let projectNo: String = projectNumber;
        await this.file.click();
        await this.menuitem.click();
        await this.projectNo.click();
        await this.projectNo.fill(projectNo.toString());
        await this.projDescription.click();
        await this.projDescription.fill('test automation project');
        await this.saveButton.click();
        // Validate error popup appears
        await this.validateErrorPopup("Project number must be of format");
    }

    async addProjectWithValidNumber(projectNumber: string): Promise<void> {
        let projectNo: String = projectNumber;
        await this.file.click();
        await this.menuitem.click();
        await this.projectNo.click();
        await this.projectNo.fill(projectNo.toString());
        await this.projDescription.click();
        await this.projDescription.fill('test automation project');
        await this.saveButton.click();
        // Validate error popup appears
        await this.validateSuccessPopup("New project successfully created");
        
         await this.CancelButton.click();
    }
}