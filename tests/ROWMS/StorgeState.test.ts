import { test, devices } from '@playwright/test';
import urls from '../../config/env';

test('verify login', async ({ page }) => {
    test.setTimeout(120000);
await page.goto(urls.ROWMS.uat);
await page.locator('span').filter({ hasText: 'Town' }).click();
   await page.locator('.react-select__input-container').first().click();
  await page.getByRole('option', { name: 'UNKNOWN' }).click();
  await page.locator('span:nth-child(2) > .css-b62m3t-container > .react-select__control > .react-select__value-container > .react-select__input-container').click();
  await page.locator('#react-select-5-input').fill('0628');
  await page.locator('.react-select__input-container.css-1cfo1cf').click();
  await page.locator('#react-select-5-input').fill('0628');
  await page.getByRole('option', { name: '-6016 - test automation project' }).dblclick();
  await page.locator('#search-panel-host').getByRole('button', { name: 'Search' }).click();
console.log(await page.url());
});