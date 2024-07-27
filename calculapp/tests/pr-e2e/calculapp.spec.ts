import { test, expect } from '@playwright/test';

test('Load page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
});
test('Page title', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle(/Calculapp/);
});
test('Click buttons', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.click('button:has-text("1")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("4")');
  await page.click('button:has-text("5")');
  await page.click('button:has-text("6")');
  await page.click('button:has-text("7")');
  await page.click('button:has-text("8")');
  await page.click('button:has-text("9")');
  await page.click('button:has-text("Clear")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("-")');
  await page.click('button:has-text("%")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("÷")');
  await page.click('button:has-text("×")');
  await page.click('button:has-text("=")');
  await page.click('button:has-text("ce")');
});

test('Check basic inputs', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Case: starting with empty output
  let text = await page.textContent('#output');
  expect(text).toBe('');
  let history = await page.textContent('#history')
  expect(history).toBe('')
  // Case: entering a single number
  await page.click('button:has-text("1")');
  await page.click('button:has-text("=")');
  text = await page.textContent('#output');
  expect(text).toBe('1');
  history = await page.textContent('#history')
  expect(history).toBe('1')
});

test('Check addition', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Case: addition
  await page.click('button:has-text("4")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("1")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("=")');
  let text = await page.textContent('#output');
  expect(text).toBe('8.5');
  let history = await page.textContent('#history')
  expect(history).toBe('4.2 + 3 + 1.3')
});


test('Check subtraction', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Case: minus test with multiple decimals and negative output
  await page.click('button:has-text("4")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("-")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("-")');
  await page.click('button:has-text("1")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("=")');
  let text = await page.textContent('#output');
  expect(text).toBe('-0.1');
  let history = await page.textContent('#history')
  expect(history).toBe('4.2 - 3 - 1.3')
});

test('Check multiplication', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Case: multiplication test with multiple decimals and negative output
  await page.click('button:has-text("4")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("×")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("-")');
  await page.click('button:has-text("1")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("=")');
  let text = await page.textContent('#output');
  expect(text).toBe('11.3');
  let history = await page.textContent('#history')
  expect(history).toBe('4.2 × 3 - 1.3')
});


test('Check division', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Case: simple division test with multiple decimals and negative output
  await page.click('button:has-text("4")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("÷")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("-")');
  await page.click('button:has-text("1")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("=")');
  let text = await page.textContent('#output');
  expect(text).toBe('1.7');
  let history = await page.textContent('#history')
  expect(history).toBe('4.2 ÷ 3 - 1.3')

});

test('Check percentage', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Case: percentage test on first input
  await page.click('button:has-text("4")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text("%")');
  await page.click('button:has-text("×")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("-")');
  await page.click('button:has-text("1")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("=")');
  let text = await page.textContent('#output');
  expect(text).toBe('-1.174');
  let history = await page.textContent('#history')
  expect(history).toBe('0.042 × 3 - 1.3')
  // Case: percentage test on second variable, where percentage creates a decimal naturally 
  await page.click('#Clear'); // clear page
  await page.click('button:has-text("4")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text("%")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("-")');
  await page.click('button:has-text("1")');
  await page.click('button:has-text("%")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("=")');
  text = await page.textContent('#output');
  expect(text).toBe('0.0293');
  history = await page.textContent('#history')
  expect(history).toBe('0.0423 - 0.013')
});


test('Check duplicate decimal places', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  let text = await page.textContent('#output');
  // Case: entering a single decimal
  await page.click('#Clear'); // clear page
  await page.click('button:has-text("1")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("4")');
  await page.click('button:has-text("5")');
  await page.click('button:has-text("=")');
  text = await page.textContent('#output');
  expect(text).toBe('123.45');
  let history = await page.textContent('#history')
  expect(history).toBe('123.45')
  // Case: entering a decimal with no zero
  await page.click('#Clear'); // clear page
  await page.click('button:has-text(".")');
  await page.click('button:has-text("6")');
  await page.click('button:has-text("=")');
  text = await page.textContent('#output');
  expect(text).toBe('0.6');
  history = await page.textContent('#history')
  expect(history).toBe('0.6')
  // Case: entering a number instantly with three decimal places
  await page.click('#Clear'); // clear page
  await page.click('button:has-text(".")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("5")');
  await page.click('button:has-text("=")');
  text = await page.textContent('#output');
  expect(text).toBe('0.5');
  history = await page.textContent('#history')
  expect(history).toBe('0.5')
  await page.click('#Clear'); // clear page
  // Case: entering two decimal places after a calculation
  await page.click('button:has-text("2")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("-")');
  await page.click('button:has-text("1")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text("=")');
  text = await page.textContent('#output');
  expect(text).toBe('1.3');
  history = await page.textContent('#history')
  expect(history).toBe('2.2 + 0.3 - 1.2')
});

