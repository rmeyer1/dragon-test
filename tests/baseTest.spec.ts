// tests/baseTest.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test.describe('Dragon Base Test', () => {
  test('should click each featured item, then navigate back to home page', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();

    await page.waitForTimeout(3000);

    const featuredItemCount = await homePage.featuredItems.count();

    for (let i = 0; i < featuredItemCount; i++) {
      //page is already loaded on the first index
        if(i != 0)    {
            await homePage.open();
        }

        const featuredItem = await homePage.featuredItems.nth(i);
        
        const featuredItemText = await featuredItem.innerText()

        await featuredItem.click();
        
        await page.waitForTimeout(3000);

        console.log(`Featured Item: ${featuredItemText}`)

        await page.goBack();
    }
  });
});
