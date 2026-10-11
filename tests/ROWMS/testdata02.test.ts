import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  test.setTimeout(120000);
  await page.goto('https://ctgovexec.sharepoint.com/sites/DOT-IRMS-Test?project=0001-0001&page=Homepage&tab=litigation&parcel=364801');
  await page.getByRole('textbox', { name: 'someone@example.com' }).fill('CompassAdmin@ct.gov');
  await page.getByRole('textbox', { name: 'someone@example.com' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('#i0118').fill('6WV_H%Y:S/%*c>*L');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'File', exact: true }).click();
  await page.getByRole('menuitem', { name: 'Add New Serial Number' }).click();
 // await page.locator('span:nth-child(2) > .reactSelect_67e02d0b > .rsControl_67e02d0b > .css-hlgwow > .css-19bb58m').click();

  await page.reload();
  //await page.locator('span:nth-child(2) > .reactSelect_67e02d0b > .rsControl_67e02d0b > .css-hlgwow > .css-19bb58m').click();
  await page.locator('#react-select-3-input').fill('1234');
  await page.getByRole('option', { name: '-5678 - test automation project' }).click();
  await page.locator('#Dropdown28-option').click();
  await page.getByRole('option', { name: 'ACQUISITION' }).click();

  await page.getByRole('textbox', { name: 'Serial Number' }).click();
  await page.getByRole('textbox', { name: 'Serial Number' }).fill('001B');
  await page.getByRole('textbox', { name: 'Serial Number' }).click();
  await page.getByRole('textbox', { name: 'Street Address 1' }).click();
  await page.getByRole('textbox', { name: 'Street Address 1' }).fill('Addrs01A');
  // await page.getByRole('textbox', { name: 'Street Address 2' }).click({
  //   modifiers: ['Shift']
  // });
  await page.getByRole('textbox', { name: 'Street Address 2' }).click();
  await page.getByRole('textbox', { name: 'Street Address 2' }).fill('Address02');
  await page.getByRole('cell', { name: 'Town' }).locator('svg').click();
  await page.getByRole('option', { name: 'UNKNOWN' }).click();
  await page.getByRole('textbox', { name: 'ZIP' }).click();
  await page.getByRole('textbox', { name: 'ZIP' }).fill('75601');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('#MessageBar739').click();
});