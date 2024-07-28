import { test, expect } from '@playwright/test';
test('Load page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
});
test('Page title', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle(/Calculapp/); // This refers to the page title at the top of the browser
});

test('basic inputs', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Case: starting with empty answer
  let text = await page.textContent('#answer');
  expect(text).toBe('0');
  let history = await page.textContent('#history')
  expect(history).toBe('')
});
