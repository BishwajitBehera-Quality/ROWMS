import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    private userNameInput: Locator;
    private nextButton: Locator;
    private passwordInput: Locator;
    private signInButton: Locator;
    private crossmark: Locator;
    private applogo: Locator;
    private userProfile: Locator;
    private logout: Locator;

    constructor(page: Page) {
        super(page);

        this.userNameInput = page.getByRole('textbox', { name: 'someone@example.com' });
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.passwordInput = page.getByRole('textbox', { name: 'Enter the password for'});
        this.signInButton = page.getByRole('button', { name: 'Sign in' });

    }

    async login(username: string, password: string): Promise<void>{
        await this.userNameInput.fill(username);
        await this.clickElement(this.nextButton);
        await this.passwordInput.fill(password);
        await this.clickElement(this.signInButton);

    }

    async closethepopup(): Promise<void> {
        await this.clickElement(this.crossmark);
        await this.clickElement(this.applogo);
        await this.sleep(2);
    }

    async logOut(): Promise<void> {
        await this.clickElement(this.userProfile);
        await this.clickElement(this.logout);

    }
}