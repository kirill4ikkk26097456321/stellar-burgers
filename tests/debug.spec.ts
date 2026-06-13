import { test, expect } from '@playwright/test';

test.describe('Сборка бургера: верхняя и нижняя булка', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/network.har', {
      url: '**/api/**',
      update: false
    });
  });

  test('Добавленная булка отображается и сверху, и снизу конструктора', async ({ page }) => {
    await page.goto('/');

    const dropZone = page.locator('section').filter({ hasText: 'Оформить заказ' });

    await page.locator('li').filter({ hasText: 'Краторная булка N-200i' }).getByRole('button', { name: 'Добавить' }).click();

    const bunTop = dropZone.locator('.constructor-element__text', { hasText: 'Краторная булка N-200i (верх)' });
    const bunBottom = dropZone.locator('.constructor-element__text', { hasText: 'Краторная булка N-200i (низ)' });

    await expect(bunTop).toBeVisible();
    await expect(bunBottom).toBeVisible();
  });
});
