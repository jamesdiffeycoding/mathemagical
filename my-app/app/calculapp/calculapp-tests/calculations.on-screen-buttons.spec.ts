import { test, expect } from '@playwright/test';
// BUGS
// keyboard -
// when pressing a number, it resets answer, variable, and operation
// when pressing an operation, it resets answer, variable, and operation 
test('Press buttons', async ({ page }) => {
  await page.goto('http://localhost:3000/calculapp');
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
  await page.click('button:has-text(".")');
  await page.click('button:has-text("÷")');
  await page.click('button:has-text("×")');
  await page.click('button:has-text("=")');
  await page.click('button:has-text("ce")');
});

test('addition', async ({ page }) => {
  await page.goto('http://localhost:3000/calculapp');
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
  let text = await page.textContent('#answer');
  expect(text).toBe('8.5');
  let history = await page.textContent('#history')
  expect(history).toBe('4.2 + 3 + 1.3')
});


test('subtraction', async ({ page }) => {
  await page.goto('http://localhost:3000/calculapp');
  // Case: minus test with multiple decimals and negative answer
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
  let text = await page.textContent('#answer');
  expect(text).toBe('-0.1');
  let history = await page.textContent('#history')
  expect(history).toBe('4.2 - 3 - 1.3')
});

test('multiplication', async ({ page }) => {
  await page.goto('http://localhost:3000/calculapp');
  // Case: multiplication test with multiple decimals and negative answer
  await page.click('button:has-text("4")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("×")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("-")');
  await page.click('button:has-text("1")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("=")');
  let text = await page.textContent('#answer');
  expect(text).toBe('11.3');
  let history = await page.textContent('#history')
  expect(history).toBe('4.2 × 3 - 1.3')
});


test('division', async ({ page }) => {
  await page.goto('http://localhost:3000/calculapp');
  // Case: simple division test with multiple decimals and negative answer
  await page.click('button:has-text("4")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text("÷")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text("-")');
  await page.click('button:has-text("1")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("=")');
  let text = await page.textContent('#answer');
  expect(text).toBe('19.7');
  let history = await page.textContent('#history')
  expect(history).toBe('42 ÷ 2 - 1.3')
  await page.click('#Clear'); // clear page
  // Case: complicated division test
  await page.click('button:has-text("4")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text("4")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text("÷")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text("1")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("1")');
  await page.click('button:has-text("÷")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("=")');
  text = await page.textContent('#answer');
  expect(text).toBe('6.395296246'); //1 significant specified to it fits in calculator
  history = await page.textContent('#history')
  expect(history).toBe('4242 ÷ 221.1 ÷ 3')
});

test('decimal places', async ({ page }) => {
  await page.goto('http://localhost:3000/calculapp');
  let text = await page.textContent('#answer');
  // Case: entering a single decimal
  await page.click('#Clear'); // clear page
  await page.click('button:has-text("1")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("4")');
  await page.click('button:has-text("5")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("1")');
  await page.click('button:has-text("=")');
  text = await page.textContent('#answer');
  expect(text).toBe('124.45');
  let history = await page.textContent('#history')
  expect(history).toBe('123.45 + 1')
  // Case: entering a decimal with no zero
  await page.click('#Clear'); // clear page
  await page.click('button:has-text(".")');
  await page.click('button:has-text("6")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("1")');
  await page.click('button:has-text("=")');
  text = await page.textContent('#answer');
  expect(text).toBe('1.6');
  history = await page.textContent('#history')
  expect(history).toBe('0.6 + 1')
  // Case: entering a number instantly with three decimal places
  await page.click('#Clear'); // clear page
  await page.click('button:has-text(".")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("5")');
  await page.click('button:has-text("×")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text(".")');
  await page.click('button:has-text("5")');
  await page.click('button:has-text("=")');
  text = await page.textContent('#answer');
  expect(text).toBe('1.25');
  history = await page.textContent('#history')
  expect(history).toBe('0.5 × 2.5')
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
  text = await page.textContent('#answer');
  expect(text).toBe('1.3');
  history = await page.textContent('#history')
  expect(history).toBe('2.2 + 0.3 - 1.2')
});


test('double "=" press does not clear answer', async ({ page }) => {
  await page.goto('http://localhost:3000/calculapp');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("4")');
  await page.click('button:has-text("=")');
  await page.click('button:has-text("=")');
  let text = await page.textContent('#answer');
  expect(text).toBe('7');
  let history = await page.textContent('#history')
  expect(history).toBe('3 + 4')
})

test('"=" -> ".", "Ans" or a number clears answer', async ({ page }) => {
  await page.goto('http://localhost:3000/calculapp');
  // Case: = followed by "."
  await page.click('button:has-text("3")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("4")');
  await page.click('button:has-text("=")');
  await page.click('button:has-text(".")');
  let text = await page.textContent('#answer');
  expect(text).toBe('0');
  let history = await page.textContent('#history')
  expect(history).toBe('')
  // Case: = followed by number
  await page.click('#Clear');
  await page.click('button:has-text("1")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text("=")');
  await page.click('button:has-text("3")');
  text = await page.textContent('#answer');
  expect(text).toBe('0');
  history = await page.textContent('#history')
  expect(history).toBe('')
})

test('"=" -> new operation does not recent answer to 0', async ({ page }) => {
  await page.goto('http://localhost:3000/calculapp');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("4")');
  await page.click('button:has-text("=")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("5")');
  await page.click('button:has-text("=")');
  let text = await page.textContent('#answer');
  expect(text).toBe('12');
  let history = await page.textContent('#history')
  expect(history).toBe('3 + 4 + 5')
})

test('"Ans"', async ({ page }) => {
  await page.goto('http://localhost:3000/calculapp');
  // Case: 3 + 4 - Ans = "0"
  await page.click('button:has-text("3")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("4")');
  await page.click('button:has-text("-")');
  await page.click('button:has-text("Ans")');
  await page.click('button:has-text("=")');
  let text = await page.textContent('#answer');
  expect(text).toBe('0');
  let history = await page.textContent('#history')
  expect(history).toBe('3 + 4 - 7')
  // Case: 3 + 4 = Ans = "0"
  await page.click('#Clear');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("4")');
  await page.click('button:has-text("=")');
  await page.click('button:has-text("Ans")');
  await page.click('button:has-text("=")');
  text = await page.textContent('#answer');
  expect(text).toBe('0');
  history = await page.textContent('#history')
  expect(history).toBe('')
})



test('swapping to addition/subtraction from division/multiplication is handled correctly', async ({ page }) => {
  await page.goto('http://localhost:3000/calculapp');

  // Case 1: multiplication and division, then subtraction
  await page.click('button:has-text("3")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("×")');
  await page.click('button:has-text("-")');
  await page.click('button:has-text("×")');
  await page.click('button:has-text("÷")');
  await page.click('button:has-text("×")');
  await page.click('button:has-text("-")');
  await page.click('button:has-text("7")');
  await page.click('button:has-text("=")');

  let text = await page.textContent('#answer');
  expect(text).toBe('-4');
  let history = await page.textContent('#history');
  expect(history).toBe('3 - 7');

  // Case 2: division and multiplication, then addition and subtraction
  await page.click('#Clear');  // Assuming there's a clear button to reset
  await page.click('button:has-text("3")');
  await page.click('button:has-text("÷")');
  await page.click('button:has-text("×")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text("÷")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("-")');
  await page.click('button:has-text("7")');
  await page.click('button:has-text("=")');

  text = await page.textContent('#answer');
  expect(text).toBe('-1');
  history = await page.textContent('#history');
  expect(history).toBe('3 × 2 - 7');
});