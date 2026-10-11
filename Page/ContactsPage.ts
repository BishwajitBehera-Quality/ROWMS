import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ContactsPage extends BasePage {

    private menuAllPendingInvoices: Locator;
    private pageHeader: Locator;
    private searchBox: Locator;
    //private newInvoiceButton: Locator;
    //private exportButton: Locator;
    private searchverifiertext: Locator;

    constructor(page: Page) {
        super(page);

        // Left Navigation Menu Locator
        this.menuAllPendingInvoices = page.getByRole('link', { name: 'All Pending Invoices' });

        // Page Elements
        this.pageHeader = page.getByRole("heading", { name: 'All Pending Invoices' });
        this.searchBox = page.getByRole('searchbox', { name: 'Search for an Invoice...' });
        this.searchverifiertext=page.getByText('00DOT0003AA');
       

        
    }

    // Public getter methods to access private elements
    public get menuAllPendingInvoicesLocator(): Locator {
        return this.menuAllPendingInvoices;
    }

    public get searchBoxLocator(): Locator {
        return this.searchBox;
    }

    

    /// Search for an invoice by invoice number
    async searchInvoice(invoiceno: string): Promise<void> {
        //await this.searchBox.waitFor({ state: 'visible', timeout: 10000 }); 
        //await this.clickElement(this.searchBox);
        let invNo = invoiceno;
        await this.clickElement(this.searchBox);
        await this.searchBox.fill(invNo.toString());
        await this.sleep(3);
        //await this.searchBox.press('Enter'); // Press Enter to trigger the search
        //await this.clickElement(this.searchverifiertext);
        await this.clickElement(this.searchverifiertext);
       
        await this.sleep(3);
    }

    async createNewContact(contactName: string, contactEmail: string): Promise<void> {

        

    }

    

    
}