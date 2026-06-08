import { test, expect } from '@playwright/test';

test('Debug page text', async ({ page }) => {
  await page.routeFromHAR('tests/hars/network.har', {
    url: '**/api/**',
    update: false
  });
  await page.goto('/');
  await page.waitForTimeout(3000);
  const text = await page.evaluate(() => document.body.innerText);
  console.log(text);
});
