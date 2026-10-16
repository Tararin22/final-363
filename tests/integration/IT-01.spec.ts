import { test, expect } from '@playwright/test';

test('IT-01: top-down REAL Login -> browser-level Inventory STUB', {
  annotation: {
    type: 'description',
    description: 'ทดสอบ Login จริงร่วมกับ Inventory Stub ที่จำลองด้วย page.setContent()'
  }
}, async ({ page }) => {
  await test.step('Login ผ่านหน้าเว็บไซต์จริง', async () => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  await test.step('สร้าง Inventory Stub', async () => {
    await page.setContent(`
      <main id="inventory-stub">
        <h1 data-test="stub-status">Mock Inventory Ready</h1>
        <ul data-test="stub-list">
          <li data-test="stub-item">Mock Backpack</li>
          <li data-test="stub-item">Mock Bike Light</li>
        </ul>
      </main>
    `);
  });

  await test.step('ตรวจสอบผลจาก Stub', async () => {
    await expect(page.locator('[data-test="stub-status"]')).toHaveText('Mock Inventory Ready');
    const items = page.locator('[data-test="stub-item"]');
    await expect(items).toHaveCount(2);
    await expect(items.nth(0)).toHaveText('Mock Backpack');
    await expect(items.nth(1)).toHaveText('Mock Bike Light');
  });
});