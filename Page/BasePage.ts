import { expect, Page, APIResponse, Locator } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as ExcelJS from "exceljs";

export class BasePage {
   protected page: Page;

   constructor(page: Page) {
      this.page = page;
   }

   async waitForPageLoad(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
      console.log(`Waiting for page load state: ${state}`);
      await this.page.waitForLoadState(state);
      console.log(`Page loaded with state: ${state}`);
   }

   async maximizeScreen(width?: number, height?: number): Promise<void> {
      await this.page.evaluate(([w, h]) => {
         if (w && h) {
            console.log(`Window resizing to ${w}width & ${h}heigght`);
            window.resizeTo(w, h);
         }
         else {
            window.moveTo(0, 0);
            window.resizeTo(screen.availWidth, screen.availHeight);
         }
      }, [width, height]);
   }

   async verifyTitle(expectedTitle: string, timeout: number = 5000): Promise<void> {
      try {
         await this.page.waitForFunction(
            (title: string) => document.title === title,
            expectedTitle,
            { timeout }
         );
         const actualTitle = await this.page.title();
         console.log(`Page title: ${actualTitle}`);
         expect(actualTitle).toBe(expectedTitle);
      } catch (error) {
         console.error(`Title verification failed: Expected "${expectedTitle}" but got "${await this.page.title()}".`);
         throw error;
      }
   }

   async checkAllLinks(): Promise<void> {
      const links = await this.page.$$eval('a[href]', (anchors) =>
         anchors.map((a) => (a as HTMLAnchorElement).href)
      );

      const brokenlinks: string[] = [];

      for (const link of links) {
         if (!link.startsWith('http')) continue;


         try {
            const response: APIResponse = await this.page.request.get(link);
            const status = response.status();

            if (status >= 400) {
               console.warn(`Broken link: ${link} | Status: ${status}`);
               brokenlinks.push(`${link} (Status: ${status})`);
            }
            else {
               console.log(`Working link: ${link} | Status: ${status}`)
            }

         }
         catch (error) {
            console.error(`Error checking link: ${link}`, error);
            brokenlinks.push(`${link} (Error)`);
         }

         expect(brokenlinks, `Broken links found:\n${brokenlinks.join('\n')}`).toEqual([]);
      }
   }

   async sleep(seconds: number): Promise<void> {
      console.log(`Waiting for ${seconds} seconds....`)
      await this.page.waitForTimeout(seconds * 1000);
   }

   async goTo(url: string, excpectedStatus: number = 200): Promise<void> {
      console.log(`Navigating to ${url}`)
      try {
         const response = await this.page.goto(url, { waitUntil: 'load' });

         if (!response) {
            throw new Error(`Navigation Failed: No response recevied for URL: ${url}`);
         }
         const status = response.status();
         if (status !== excpectedStatus) {
            throw new Error(`Unexpected status code ${status} received from: ${url}`);
         }
         console.log(`Page luanched successfully ${url}`);

      }
      catch (error) {
         throw new Error(`Failed to load URL: ${url}\nReason: ${(error as Error).message}`);
      }
   }

   async clickElement(element: Locator, description?: string): Promise<void> {

      const retryInterval = 5000;
      const maxAttempts = 5;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
         try {
            await element.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
            await element.click({ timeout: retryInterval });
            console.log(`Successfully clicked on: ${description || element}`);
            return;
         } catch (error) {
            if (attempt === maxAttempts) {
               const errorMessage = `Failed to click on the ${description || element} after ${maxAttempts} attempts. Error: ${error}`;
               console.error(errorMessage);
               throw new Error(errorMessage);
            } else {
               const waitTime = retryInterval * attempt;
               console.log(`Waiting to retry clicking the ${description || element} in ${waitTime / 1000} seconds...`);
               await this.page.waitForTimeout(retryInterval);
            }
         }
      }
   }

   async waitForElement(selector: string, timeOutInSeconds = 10): Promise<void> {
      const timeout = timeOutInSeconds * 1000;
      await this.page.waitForSelector(selector, { timeout });
   }

   async selectOptionByText(dropdown: Locator, visibleText: string): Promise<void> {
      try {
         await dropdown.selectOption({ label: visibleText });
         console.log(`Option selected: ${visibleText}`)
      }
      catch (e) {
         const optionLocator = dropdown.locator(`"//*[text()="${visibleText}"]"`);
         await this.clickElement(dropdown);
         await this.clickElement(optionLocator);
      }

   }

   generateRandomNumber(digits?: number): string {
      if (digits) {
         const min = Math.pow(10, digits - 1);
         const max = Math.pow(10, digits) - 1;
         const number = Math.floor(Math.random() * (max - min + 1) + min).toString();
         return number;
      }
      else {
         const today = new Date;
         const dd = String(today.getDate()).padStart(2, '0');
         const mm = String(today.getMonth() + 1).padStart(2, '0');
         const y = today.getFullYear();
         const hours = String(today.getHours()).padStart(2, '0');
         const minutes = String(today.getMinutes()).padStart(2, '0');
         console.log(`Unique Number is: ${dd}${mm}${y}${hours}${minutes}`)
         return `${dd}${mm}${y}${hours}${minutes}`;
      }
   }

   async filterAndValidateValue(
      searchInputSelector: Locator,
      value: string,
      timeout = 5000
   ): Promise<void> {
      await searchInputSelector.fill(value);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(2000);

      const row = this.page.getByText(value);
      await row.waitFor({ state: 'visible', timeout });

      const rowText = (await row.textContent())?.trim() || '';

      if (!rowText.includes(value)) {
         throw new Error(`Filter value "${value}" not found`);
      }

      console.log(`Filter Value "${value}" found`);
   }

   async selectProductAndSection(product: string, section: string): Promise<void> {
      await this.waitForElement('//a[@class="navbar-brand navbar-home"]');
      await this.clickIfVisible("//button[@data-original-title='Toggle Sidebar']");
      const application = this.page.locator(`(//span[text()='${product}']//following::div)[1]`);
      await this.clickElement(application);
      console.log(`Product selected : ${product}}`);
      const sectionXpath = this.page.locator(`//span[text()="${section}"]`);
      await this.clickElement(sectionXpath);
      console.log(`Section selected : ${section}}`);

   }

   async clickLink(link: string): Promise<void> {
      const linkLocator: Locator = this.page.getByText(link, { exact: false });
      await expect(linkLocator).toBeVisible({ timeout: 5000 });
      await this.clickElement(linkLocator);
      console.log(`${link} clicked.`);

   }


   async selectOptionFromSuggestion(inputText: string, inputSelector: Locator,
      optionSelector: string = '[role="listbox"] [role="option"]',
      alternativeSelector: string = `//*[contains(text(), "${inputText}")]`): Promise<void> {
      await inputSelector.fill('');
      await inputSelector.fill(inputText);
      await this.page.waitForSelector(alternativeSelector);
      await this.page.waitForSelector(optionSelector, { timeout: 5000 })
         .catch(async () => {

            await this.page.waitForSelector(alternativeSelector, { timeout: 5000 });
         });


      let option = await this.page.locator(`${optionSelector}:has-text("${inputText}")`).first();
      if (!option) {

         option = await this.page.locator(`//*[contains(text(),"${inputText}")]`).first();
      }

      if (option) {
         console.log(`Option found with text "${inputText}". Pressing Enter key.`);
         await inputSelector.press('Enter');
      } else {
         throw new Error(`Option with text "${inputText}" not found`);
      }
   }

   async pressKey(KeyBoardKey: string): Promise<void> {
      await this.page.keyboard.press(KeyBoardKey);
      console.log(`Pressed ${KeyBoardKey} key`);
   }

   async clickIfVisible(selector: string, description?: string): Promise<void> {
      const element = this.page.locator(selector);
      this.sleep(1);
      const isVisible = await element.isVisible();
      if (isVisible) {
         await this.clickElement(element);
         console.log(`ELement visable. Clicked ${element}`);
      }
      else {
         console.log(`${element} not visiable. Skipping click`)
      }
   }

   async enterText(element: Locator, text: string): Promise<void> {
      // await element.waitFor({ state: 'visible' });
      const tagName = await element.evaluate(e => e.tagName.toLowerCase());
      const isInputType = ['input', 'textarea', 'select'].includes(tagName) || await element.evaluate(el => (el as HTMLElement).isContentEditable);
      if (isInputType) {
         await element.fill('');
         await element.fill(text);
         console.log(`Text Entered : ${text}`);
         await this.sleep(1);
         await element.press('Enter');
      } else {
         await element.click();
         const inputField = element.locator('input, textarea, select, [contenteditable]');
         await inputField.waitFor({ state: 'visible' });
         await inputField.fill('');
         await inputField.fill(text);
         console.log(`Text Entered : ${text}`);
         await this.sleep(1);
      }
   }

   async verifyTextContent(element: Locator, expectedMessage: string): Promise<boolean> {
      try {
         // await element.waitFor({state: 'visible', timeout: 5000});
         const actualText = await element.textContent();
         console.log(`Element Message: '${actualText ? actualText.trim() : '[No Message]'}'`);
         console.log(`Expected Message: '${expectedMessage.trim()}'`);
         if (actualText == null) {
            return false;
         }
         // return actualText ? actualText.trim() === expectedMessage.trim(): false;
         return actualText.trim() === expectedMessage.trim();
      }
      catch (error) {
         console.error(`Failed to get text from element: ${element}`, error);
         return false;
      }
   }

   async getTextContent(element: Locator): Promise<string> {
      // await element.waitFor({state: 'visible', timeout: 5000});
      const text = await element.textContent();
      console.log(`Text is : ${text}`)
      return text ? text.trim() : '';

   }

   async takeScreenshot(fileName: string, folderPath: string = 'screenshots/'): Promise<void> {

      try {
         if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
         }
         const newFilePath = path.join(folderPath, `${fileName}.png`);

         const files = fs.readdirSync(folderPath);
         for (const file of files) {
            fs.unlinkSync(path.join(folderPath, file));
         }

         await this.page.screenshot({ path: newFilePath, fullPage: true });
         console.log(`Screenshot saved in : ${newFilePath}`);
      } catch (err) {
         console.error('Error taking screenshot:', err.message);
      }
   }

   async fillText(element: Locator, text: string): Promise<void> {
      await element.fill(text);
   }

   async isElementVisible(selector: string): Promise<boolean> {
      try {
         const element = this.page.locator(selector);
         await this.page.waitForTimeout(1000);
         return await element.isVisible();
      }
      catch (error) {
         return false;
      }
   }

   async uploadFile(selector: string, filePath: string): Promise<void> {


      const fullPath = path.resolve(filePath);
      await this.sleep(1);

      const inputElementHandle = await this.page.$(selector);
      if (!inputElementHandle) {
         throw new Error(`No element found for selector: ${selector}`);
      }

      const tagName = await inputElementHandle.evaluate(element => element.tagName);
      const inputType = await inputElementHandle.evaluate(element => element.getAttribute('type'));

      if (tagName !== 'INPUT' || inputType !== 'file') {
         throw new Error(`Element found by selector is not an input of type file: ${selector}`);
      }

      await inputElementHandle.setInputFiles(fullPath);
      console.log(`${fullPath} : File uploaded`);
   }

   async createExcelFile(fileName: string, sheetName: string, headers: string[]): Promise<void> {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(sheetName);

      worksheet.addRow(headers);

      const resourcesDir = path.join(process.cwd(), "resources");
      if (!fs.existsSync(resourcesDir)) {
         fs.mkdirSync(resourcesDir, { recursive: true });
      }

      const filePath = path.join(resourcesDir, fileName);

      if (fs.existsSync(filePath)) {
         throw new Error(`File "${fileName} already exists inside Resources folder.`);
      }

      await workbook.xlsx.writeFile(filePath);
      console.log(`Excel file created : ${filePath}`);
   }

   async updateExcelByHeader(fileName: string, sheetName: string, headerName: string, value: string): Promise<void> {
      const resourcesDir = path.join(process.cwd(), "Resources");
      const filePath = path.join(resourcesDir, fileName);

      if (!fs.existsSync(filePath)) {
         throw new Error(`File "${fileName}" does not exist in Resources folder.`);
      }

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);

      const worksheet = workbook.getWorksheet(sheetName);
      if (!worksheet) {
         throw new Error(`Sheet "${sheetName}" not found in file "${fileName}".`);
      }

      const headerRow = worksheet.getRow(1);

      let headerIndex: number | null = null;
      headerRow.eachCell((cell, colNumber) => {
         if (cell.value === headerName) {
            headerIndex = colNumber;
         }
      });

      if (headerIndex === null) {
         throw new Error(`Header "${headerName}" not found in sheet "${sheetName}".`);
      }

      let rowIndex = worksheet.rowCount + 1;
      for (let i = 2; i <= worksheet.rowCount; i++) {
         const cellValue = worksheet.getRow(i).getCell(headerIndex).value;
         if (!cellValue) {
            rowIndex = i;
            break;
         }
      }

      worksheet.getRow(rowIndex).getCell(headerIndex).value = value;

      await workbook.xlsx.writeFile(filePath);
      console.log(`Value "${value}" added under header "${headerName}" in ${fileName}`);
   }

   async updateCellByHeaderValue(fileName: string, sheetName: string, headerName: string, oldValue: string, newValue: string): Promise<void> {
      const resourcesDir = path.join(process.cwd(), "Resources");
      const filePath = path.join(resourcesDir, fileName);

      if (!fs.existsSync(filePath)) {
         throw new Error(`File "${fileName}" does not exist in Resources folder.`);
      }

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);

      const worksheet = workbook.getWorksheet(sheetName);
      if (!worksheet) {
         throw new Error(`Sheet "${sheetName}" not found in file "${fileName}".`);
      }

      const headerRow = worksheet.getRow(1);

      let headerIndex: number | null = null;
      headerRow.eachCell((cell, colNumber) => {
         if (cell.value === headerName) {
            headerIndex = colNumber;
         }
      });

      if (headerIndex === null) {
         throw new Error(`Header "${headerName}" not found in sheet "${sheetName}".`);
      }

      let updated = false;
      worksheet.eachRow((row, rowNumber) => {
         if (rowNumber === 1) return;
         const cell = row.getCell(headerIndex!);
         if (cell.value === oldValue) {
            cell.value = newValue;
            row.commit();
            updated = true;
         }
      });

      if (!updated) {
         throw new Error(`Value "${oldValue}" not found under header "${headerName}" in sheet "${sheetName}".`);
      }

      await workbook.xlsx.writeFile(filePath);
      console.log(`Updated "${oldValue}" → "${newValue}" under header "${headerName}" in ${fileName}`);
   }


   async getColumnValuesByHeader(fileName: string, sheetName: string, headerName: string): Promise<string[]> {
      const resourcesDir = path.join(process.cwd(), "Resources");
      const filePath = path.join(resourcesDir, fileName);

      if (!fs.existsSync(filePath)) {
         throw new Error(`File "${fileName}" does not exist in Resources folder.`);
      }

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);

      const worksheet = workbook.getWorksheet(sheetName);
      if (!worksheet) {
         throw new Error(`Sheet "${sheetName}" not found in file "${fileName}".`);
      }

      const headerRow = worksheet.getRow(1);

      let headerIndex: number | null = null;
      headerRow.eachCell((cell, colNumber) => {
         if (cell.value === headerName) {
            headerIndex = colNumber;
         }
      });

      if (headerIndex === null) {
         throw new Error(`Header "${headerName}" not found in sheet "${sheetName}".`);
      }

      const values: string[] = [];
      worksheet.eachRow((row, rowNumber) => {
         if (rowNumber === 1) return;
         const cellValue = row.getCell(headerIndex!).value;
         if (cellValue !== null && cellValue !== undefined && cellValue !== "") {
            values.push(String(cellValue));
         }
      });

      console.log(`Values under header "${headerName}":`, values);
      return values;
   }

   async deleteExcelFile(fileName: string): Promise<void> {
      const resourcesDir = path.join(process.cwd(), "resources");
      const filePath = path.join(resourcesDir, fileName);

      if (!fs.existsSync(filePath)) {
         throw new Error(`File "${fileName}" does not exit in Resources folder.`);
      }

      fs.unlinkSync(filePath);
      console.log(`File "${fileName}" deleted successfully from resources folder.`)
   }

   async downloadFile(selector: Locator, fileName: string): Promise<string> {
      const downloadPath = path.join(__dirname, '..', 'resources', fileName);

      const [download] = await Promise.all([
         this.page.waitForEvent('download'),
         this.clickElement(selector)
      ]);

      await download.saveAs(downloadPath);
      console.log(`File downloaded at: ${downloadPath}`);
      return downloadPath;
   }

   async formatDate(date: Date): Promise<string> {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${day}-${month}-${year}`;
   }

   async forwardDate(days: number): Promise<string> {
      const date = new Date();
      date.setDate(date.getDate() + days);
      return this.formatDate(date);
   }

   async backDate(days: number): Promise<string> {
      const date = new Date();
      date.setDate(date.getDate() - days);
      return this.formatDate(date);
   }

   async getCellBelowHeader(fileName: string, sheetName: string, headerName: string): Promise<string> {
      const resourcesDir = path.join(process.cwd(), "Sources");
      const filePath = path.join(resourcesDir, fileName);

      if (!fs.existsSync(filePath)) {
         throw new Error(`File "${fileName}" does not exist in Resources folder`);
      }

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);

      const worksheet = workbook.getWorksheet(sheetName);
      if (!worksheet) {
         throw new Error(`Sheet "${sheetName}" not found in file "${fileName}"`);
      }

      const headerRow = worksheet.getRow(1);

      // Find column index of header
      let headerIndex: number | null = null;
      headerRow.eachCell((cell, colNumber) => {
         if (cell.value === headerName) {
            headerIndex = colNumber;
         }
      });

      if (headerIndex === null) {
         throw new Error(`Header "${headerName}" not found in sheet "${sheetName}"`);
      }

      // Get first cell below header (row 2)
      const firstCell = worksheet.getRow(2).getCell(headerIndex);

      if (firstCell.value instanceof Date) {
         // Format as dd-MM-yyyy
         const date = firstCell.value as Date;
         const day = String(date.getDate()).padStart(2, "0");
         const month = String(date.getMonth() + 1).padStart(2, "0");
         const year = date.getFullYear();
         return `${day}-${month}-${year}`;
      }

      return firstCell.value ? String(firstCell.value) : "";
   }

   async deleteRow(fileName: string, sheetName: string, rowNumber: number): Promise<void> {
      const resourcesDir = path.join(process.cwd(), "Sources");
      const filePath = path.join(resourcesDir, fileName);

      if (!fs.existsSync(filePath)) {
         throw new Error(`File "${fileName}" does not exist in Resources folder`);
      }

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);

      const worksheet = workbook.getWorksheet(sheetName);
      if (!worksheet) {
         throw new Error(`Sheet "${sheetName}" not found in file "${fileName}"`);
      }

      if (rowNumber < 1 || rowNumber > worksheet.rowCount) {
         throw new Error(`Row number ${rowNumber} is out of range`);
      }

      worksheet.spliceRows(rowNumber, 1); // delete the row

      await workbook.xlsx.writeFile(filePath);
      console.log(`Row ${rowNumber} deleted successfully from sheet "${sheetName}"`);
   }



}