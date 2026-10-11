import { chromium } from '@playwright/test';

async function saveStorageState() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  // Perform actions to set up the desired storage state
  await page.goto('https://ctgovexec.sharepoint.com/sites/DOT-IRMS-Test?project=0001-0001&page=Homepage&tab=litigation&parcel=364801');
    await page.getByRole('textbox', { name: 'someone@example.com' }).click();
  await page.getByRole('textbox', { name: 'someone@example.com' }).fill('CompassAdmin@ct.gov');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Enter the password for' }).click();
  await page.getByRole('textbox', { name: 'Enter the password for' }).fill('6WV_H%Y:S/%*c>*L');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.locator('span').filter({ hasText: 'Town' }).waitFor({ state: 'visible', timeout: 120000 });

  // Save the storage state
  await context.storageState({ path: '.auth/storage-state.json' });
  await browser.close();
}

export default saveStorageState;