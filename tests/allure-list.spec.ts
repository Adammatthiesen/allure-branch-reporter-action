import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/allure/');
  await expect(page.getByRole('cell', { name: '-08-10 20:27:29' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Open report 5929584265' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-08-09 16:40:49' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Open report 5924491320' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-08-07 09:07:29' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Open report 5924418676' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-08-06 05:20:49' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Open report 5918532444' })).toBeVisible();

  await expect(page).toHaveScreenshot();
});