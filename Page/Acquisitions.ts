import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class NewInvoicePage extends BasePage {

    private townSelector: Locator;
    private projectSelector: Locator;
    private contractorOption: Locator;
    private addressIcon: Locator;
    private addressOption: Locator;
    private updateButton: Locator;
    private engName: Locator;
    private engPhone: Locator;
    private engEmail: Locator;
    private finName: Locator;
    private finPhone: Locator;
    private finEmail: Locator;
    private invoiceNo: Locator;
    private billedAmount: Locator;
    private billingFrom: Locator;
    private billingTo: Locator;
    private dateButton: Locator;
    private invoiceDescription: Locator;
    private comments: Locator;
    private certifyCheck: Locator;
    private uploadInvoiceFile: Locator;
    private submitButton: Locator;
    private confirmButton: Locator;
    private CancelButton: Locator;
    private closeMark: Locator;
    private closeIcon: Locator;
    private newInvoice: Locator;

    constructor(page: Page) {
        super(page);

        this.townSelector = page.locator('.react-select__input-container').first();
        this.projectSelector = page.locator('.react-select__input-container').nth(1);
        this.contractorOption = page.getByRole('option', { name: '00DOT0003AA - Pearl Harbor' });
        this.addressIcon = page.getByText('');
        this.addressOption = page.getByText('PO BOX 116183 null null');
        this.updateButton = page.getByRole('button', { name: 'Update' });
        this.engName = page.getByRole('group', { name: 'ENGINEERING CONTACT' }).getByLabel('Name');
        this.engPhone = page.getByRole('group', { name: 'ENGINEERING CONTACT' }).getByLabel('Phone');
        this.engEmail = page.getByRole('group', { name: 'ENGINEERING CONTACT' }).getByLabel('Email');
        this.finName = page.getByRole('group', { name: 'FINANCIAL CONTACT' }).getByLabel('Name');
        this.finPhone = page.getByRole('group', { name: 'FINANCIAL CONTACT' }).getByLabel('Phone');
        this.finEmail = page.getByRole('group', { name: 'FINANCIAL CONTACT' }).getByLabel('Email');
        this.invoiceNo = page.getByRole('textbox', { name: 'Invoice number *' });
        this.billedAmount = page.getByRole('textbox', { name: 'Billed Amount *' });
        this.billingFrom = page.getByText('Bill from');
        this.billingTo = page.getByText('Bill to');
        this.dateButton = page.getByRole('button', { name: '11, March,' });
        this.invoiceDescription = page.getByRole('textbox', { name: 'Brief Invoice description' });
        this.comments = page.getByRole('textbox', { name: 'Comments' });
        this.certifyCheck = page.locator('label').filter({ hasText: 'I certify the claim for' }).locator('i');
        this.uploadInvoiceFile = page.locator('input[type="file"]');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.confirmButton = page.getByRole('button', { name: 'Yes' });
        this.CancelButton = page.getByRole('button', { name: 'Next' });
        this.closeMark = page.getByRole('textbox', { name: 'Enter the password for' });
        this.closeIcon = page.getByRole('button', { name: 'Sign in' });
        this.newInvoice = page.getByRole('button', { name: 'New Invoice' });

        await page.locator('.react-select__input-container').first().click();
  await page.getByRole('option', { name: 'UNKNOWN' }).click();
  await page.locator('.react-select__input-container').nth(1).click();
  //await page.locator('span').filter({ hasText: /^Project$/ }).click();
  await page.getByRole('option', { name: '-9100 - Test' }).click();
  await page.locator('#search-panel-host').getByRole('button', { name: 'Search' }).click();
  //await page.locator('#search-panel-host').getByRole('button', { name: 'Search' }).click();
  await page.getByText('').click();
  await page.getByRole('listitem').filter({ hasText: '000' }).locator('i').click();
  await page.getByText('Contacts').click();
  await page.getByText('Administration').click();
  await page.getByRole('button', { name: 'MTG/District Permit' }).click();
  await page.getByRole('button', { name: 'Archive' }).click();
  await page.getByText('Appraisals').click();
  await page.getByText('VALUATION ID').click();
  await page.getByText('RECEIVED').click();
  await page.getByText('REGISTERED VALUE').click();
  //await page.locator('[id="4amkeg-container"]').getByText('Actions').click();
  await page.getByText('Acquisitions').click();
  await page.getByRole('button', { name: 'Relocations' }).click();
  await page.getByRole('button', { name: 'Litigation' }).click();
  await page.getByRole('button', { name: 'Negotiations' }).click();
  await page.getByText('Titles').click();
  await page.getByRole('button', { name: 'Condemnation' }).click();
  await page.getByRole('button', { name: 'MTG' }).click();
  await page.getByRole('button', { name: 'Recording Information' }).click();
  await page.getByRole('button', { name: 'PM Release' }).click();

    }

    async createInvoice(invoNo: string): Promise<void> {

        let invoiceNo: string = invoNo;
        // await page.goto('https://ctgovexec.sharepoint.com/sites/DOT-DIME-Test/SitePages/Home.aspx');
        // await page.getByRole('textbox', { name: 'someone@example.com' }).click();
        // await page.getByRole('textbox', { name: 'someone@example.com' }).fill('CompassAdmin@ct.gov');
        // await page.getByRole('button', { name: 'Next' }).click();
        // await page.locator('#i0118').fill('6WV_H%Y:S/%*c>*L');
        // await page.getByRole('button', { name: 'Sign in' }).click();
        // await page.waitForTimeout(6000);
        await this.clickElement(this.newInvoice);
        console.log("New Invoice button validation done:" + invoiceNo);
        await this.clickElement(this.contractorCoreId);
        console.log("Contractor Core ID clicked.");
        await this.clickElement(this.contractorCoreId);
        console.log("Contractor Core ID validation done.");
        await this.clickElement(this.contractList);
        console.log("Contract List validation done.");
        await this.clickElement(this.contractorOption);
        console.log("Contractor Option clicked and validation done.");
        await this.sleep(3);
        await this.clickElement(this.addressIcon);
        console.log("Address Icon validation completed.");
        await this.sleep(3);
        await this.clickElement(this.addressOption);
        console.log("Address Option clicked and validation done.");
        await this.clickElement(this.addressOption);
        await this.sleep(2);
        await this.clickElement(this.updateButton);
        console.log("Update Button clicked and validation done.");

        await this.clickElement(this.engName);
        console.log("Engineering Contact Name validation completed.");
        await this.engName.fill('Testname1');
        console.log("Engineering Contact Name filled.");
        await this.clickElement(this.engPhone);
        console.log("Engineering Contact Phone validation completed.");
        await this.engPhone.fill('(354) 234-63567');
        console.log("Engineering Contact Phone filled.");
        await this.clickElement(this.engEmail);
        console.log("Engineering Contact Email validation completed.");
        await this.engEmail.fill('test1@abc.com');
        console.log("Engineering Contact Email filled.");
        await this.clickElement(this.finName);
        console.log("Financial Contact Name validation completed.");
        await this.finName.fill('Testname2');
        console.log("Financial Contact Name filled.");
        await this.clickElement(this.finPhone);
        console.log("Financial Contact Phone validation completed.");
        await this.finPhone.fill('(546) 234-5566_');
        console.log("Financial Contact Phone filled.");
        await this.clickElement(this.finEmail);
        console.log("Financial Contact Email validation completed.");
        await this.finEmail.fill('test2@abc.com');
        console.log("Financial Contact Email filled.");

        await this.clickElement(this.invoiceNo);
        console.log("Invoice Number validation completed.");
        await this.invoiceNo.fill(invoiceNo.toString());
        console.log("Invoice Number filled.");

        await this.clickElement(this.billedAmount);
        console.log("Billed Amount validation completed.");
        await this.sleep(3);
        await this.billedAmount.fill('50000');
        console.log("Billed Amount filled.");

        await this.clickElement(this.billingFrom);
        console.log("Billing From validation completed.");
        console.log("Billing To validation completed.");
        await this.sleep(3);
        await this.clickElement(this.dateButton);
        console.log("Date selection done.");

        await this.sleep(3);

        await this.clickElement(this.invoiceDescription);
        console.log("Invoice Description validation completed.");
        await this.invoiceDescription.fill('This description is for test.');
        console.log("Invoice Description filled.");

        await this.clickElement(this.comments);
        console.log("Comments validation completed.");
        await this.comments.fill('This comment is for test.');
        console.log("Comments filled.");
        await this.sleep(3);

        const fileInput2 = this.uploadInvoiceFile;
        console.log("File input located and validated.");
        await this.sleep(5);
        //await page.getByRole('button').filter({ hasText: '' }).setInputFiles('J1038694eea378-7c07-4416-840f-1759afa6dbe9.pdf');
        await fileInput2.setInputFiles('J1038694eea378-7c07-4416-840f-1759afa6dbe9.pdf');
        console.log("File uploaded successfully.");
        await this.sleep(3);

        await this.clickElement(this.certifyCheck);
        console.log("Certify Check clicked and validation done.");
        await this.sleep(3);

        await this.clickElement(this.submitButton);
        console.log("Submit Button clicked and validation done.");
        await this.sleep(3);

        //const confirmButton = this.confirmButton;
        if (await this.confirmButton.isVisible()) {
            await this.clickElement(this.confirmButton);
            console.log("Confirm Button clicked and validation done.");
        }

       await this.sleep(7);

    }

    
    async createInvoiceWithNewValidation(invoNo: string): Promise<void> {

        let invoiceNo: string = invoNo;
        // await page.goto('https://ctgovexec.sharepoint.com/sites/DOT-DIME-Test/SitePages/Home.aspx');
        // await page.getByRole('textbox', { name: 'someone@example.com' }).click();
        // await page.getByRole('textbox', { name: 'someone@example.com' }).fill('CompassAdmin@ct.gov');
        // await page.getByRole('button', { name: 'Next' }).click();
        // await page.locator('#i0118').fill('6WV_H%Y:S/%*c>*L');
        // await page.getByRole('button', { name: 'Sign in' }).click();
        // await page.waitForTimeout(6000);
        await this.clickElement(this.newInvoice);
        console.log("New Invoice button validation done:" + invoiceNo);
        await this.clickElement(this.contractorCoreId);
        console.log("Contractor Core ID clicked.");
        await this.clickElement(this.contractorCoreId);
        console.log("Contractor Core ID validation done.");
        await this.clickElement(this.contractList);
        console.log("Contract List validation done.");
        await this.clickElement(this.contractorOption);
        console.log("Contractor Option clicked and validation done.");
        await this.sleep(3);
        await this.clickElement(this.addressIcon);
        console.log("Address Icon validation completed.");
        await this.sleep(3);
        await this.clickElement(this.addressOption);
        console.log("Address Option clicked and validation done.");
        await this.clickElement(this.addressOption);
        await this.sleep(2);
        await this.clickElement(this.updateButton);
        console.log("Update Button clicked and validation done.");

        await this.clickElement(this.engName);
        console.log("Engineering Contact Name validation completed.");
        await this.engName.fill('Testname1#&+');
        console.log("Engineering Contact Name filled.");
        await this.clickElement(this.engPhone);
        console.log("Engineering Contact Phone validation completed.");
        await this.engPhone.fill('(354) 234-63567');
        console.log("Engineering Contact Phone filled.");
        await this.clickElement(this.engEmail);
        console.log("Engineering Contact Email validation completed.");
        await this.engEmail.fill('test1@abc.com');
        console.log("Engineering Contact Email filled.");
        await this.clickElement(this.finName);
        console.log("Financial Contact Name validation completed.");
        await this.finName.fill('Testname2#&+');
        console.log("Financial Contact Name filled.");
        await this.clickElement(this.finPhone);
        console.log("Financial Contact Phone validation completed.");
        await this.finPhone.fill('(546) 234-5566_');
        console.log("Financial Contact Phone filled.");
        await this.clickElement(this.finEmail);
        console.log("Financial Contact Email validation completed.");
        await this.finEmail.fill('test2@abc.com');
        console.log("Financial Contact Email filled.");

        await this.clickElement(this.invoiceNo);
        console.log("Invoice Number validation completed.");
        await this.invoiceNo.fill(invoiceNo.toString());
        console.log("Invoice Number filled.");

        await this.clickElement(this.billedAmount);
        console.log("Billed Amount validation completed.");
        await this.sleep(3);
        await this.billedAmount.fill('50000.00');
        console.log("Billed Amount filled.");

        await this.clickElement(this.billingFrom);
        console.log("Billing From validation completed.");
        console.log("Billing To validation completed.");
        await this.sleep(3);
        await this.clickElement(this.dateButton);
        console.log("Date selection done.");

        await this.sleep(3);

        await this.clickElement(this.invoiceDescription);
        console.log("Invoice Description validation completed.");
        await this.invoiceDescription.fill('This description is for test #&+.');
        console.log("Invoice Description filled.");

        await this.clickElement(this.comments);
        console.log("Comments validation completed #&+.");
        await this.comments.fill('This comment is for test.');
        console.log("Comments filled.");
        await this.sleep(3);

        const fileInput2 = this.uploadInvoiceFile;
        console.log("File input located and validated.");
        await this.sleep(5);
        //await page.getByRole('button').filter({ hasText: '' }).setInputFiles('J1038694eea378-7c07-4416-840f-1759afa6dbe9.pdf');
        await fileInput2.setInputFiles('J1038694eea378-7c07-4416-840f-1759afa6dbe9.pdf');
        console.log("File uploaded successfully.");
        await this.sleep(3);

        await this.clickElement(this.certifyCheck);
        console.log("Certify Check clicked and validation done.");
        await this.sleep(3);

        await this.clickElement(this.submitButton);
        console.log("Submit Button clicked and validation done.");
        await this.sleep(3);

        //const confirmButton = this.confirmButton;
        if (await this.confirmButton.isVisible()) {
            await this.clickElement(this.confirmButton);
            console.log("Confirm Button clicked and validation done.");
        }

       await this.sleep(7);

    }
}