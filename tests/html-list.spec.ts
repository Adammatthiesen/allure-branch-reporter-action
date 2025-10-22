import { test, expect } from '@playwright/test'

test('html-list', async ({ page }) => {
    await page.goto('/html')
    await expect(page.locator('#links')).toContainText('Parent Directory')
    await expect(page.locator('#links')).toContainText('main')
    await expect(page.locator('#links')).toContainText('feature-branch')
    await expect(page).toHaveScreenshot()
})
