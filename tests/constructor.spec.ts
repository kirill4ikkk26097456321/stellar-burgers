import { test, expect } from '@playwright/test';

test.describe('Страница конструктора (Stellar Burgers)', () => {

  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/network.har', {
      url: '**/api/**',
      update: false
    });
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });

  test('Сценарий 1: Сборка бургера', async ({ page }) => {
    await page.goto('/');

    const dropZone = page.locator('section').filter({ hasText: 'Оформить заказ' });

    await page.locator('li').filter({ hasText: 'Краторная булка N-200i' }).getByRole('button', { name: 'Добавить' }).click();
    await page.locator('li').filter({ hasText: 'Соус традиционный галактический' }).getByRole('button', { name: 'Добавить' }).click();

    const bunInConstructor = dropZone.locator('.constructor-element__text', { hasText: 'Краторная булка N-200i (верх)' });
    await expect(bunInConstructor).toBeVisible();

    const sauceInConstructor = dropZone.locator('.constructor-element__text', { hasText: 'Соус традиционный галактический' });
    await expect(sauceInConstructor).toBeVisible();
  });

  test('Сценарий 2: Модальные окна ингредиентов', async ({ page }) => {
    await page.goto('/');

    const bun = page.getByText('Краторная булка N-200i');
    
    await bun.click();

    const modal = page.locator('#modals');
    await expect(modal.getByText('Детали ингредиента')).toBeVisible();
    await expect(modal.getByText('Краторная булка N-200i')).toBeVisible();

    const closeButton = modal.locator('button').first();
    await closeButton.click();
    await expect(modal).toBeHidden();

    await bun.click();
    await expect(modal.getByText('Детали ингредиента')).toBeVisible();

    await page.mouse.click(10, 10);
    await expect(modal).toBeHidden();
  });

  test('Сценарий 3: Оформление заказа', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'mock-refresh-token');
    });
    
    await page.context().addCookies([
      {
        name: 'accessToken',
        value: 'Bearer mock-access-token',
        domain: 'localhost',
        path: '/'
      }
    ]);

    await page.goto('/');

    const dropZone = page.locator('section').filter({ hasText: 'Оформить заказ' });
    await page.locator('li').filter({ hasText: 'Краторная булка N-200i' }).getByRole('button', { name: 'Добавить' }).click();
    await page.locator('li').filter({ hasText: 'Соус традиционный галактический' }).getByRole('button', { name: 'Добавить' }).click();

    const orderButton = page.getByRole('button', { name: 'Оформить заказ' });
    await expect(orderButton).toBeEnabled();
    await orderButton.click();

    const modal = page.locator('#modals');
    await expect(modal.getByText('1337')).toBeVisible();
    await expect(modal.getByText('идентификатор заказа')).toBeVisible();

    const closeButton = modal.locator('button').first();
    await closeButton.click();
    await expect(modal).toBeHidden();

    const sauceInConstructor = dropZone.locator('.constructor-element__text', { hasText: 'Соус традиционный галактический' });
    await expect(sauceInConstructor).toBeHidden();
  });
});
