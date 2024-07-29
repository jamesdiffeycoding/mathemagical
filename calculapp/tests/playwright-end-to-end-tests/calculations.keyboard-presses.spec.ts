import { test, expect } from '@playwright/test';

test('Press hotkeys', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.keyboard.press('1');
  await page.keyboard.press('2')
  await page.keyboard.press('3')
  await page.keyboard.press('4')
  await page.keyboard.press('5')
  await page.keyboard.press('6')
  await page.keyboard.press('7')
  await page.keyboard.press('8')
  await page.keyboard.press('9')
  await page.keyboard.press('C')
  await page.keyboard.press('+')
  await page.keyboard.press('-')
  await page.keyboard.press('.')
  await page.keyboard.press('x')
  await page.keyboard.press('/')
  await page.keyboard.press('D')
  await page.keyboard.press('d')
  await page.keyboard.press('d')
  await page.keyboard.press('d')
  await page.keyboard.press('p')
  await page.keyboard.press('P')


  await page.keyboard.press('*')
  await page.keyboard.press('=')
  await page.keyboard.press('c')
  await page.keyboard.press('C')
  await page.keyboard.press('a')
  await page.keyboard.press('A')
  await page.keyboard.press('=')
  await page.keyboard.press('Escape') //clear

});

test('addition', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Case: addition
  await page.keyboard.press('4')
  await page.keyboard.press('.')
  await page.keyboard.press('2')
  await page.keyboard.press('+')
  await page.keyboard.press('+')
  await page.keyboard.press('3')
  await page.keyboard.press('+')
  await page.keyboard.press('1')
  await page.keyboard.press('.')
  await page.keyboard.press('.')
  await page.keyboard.press('3')
  await page.keyboard.press('=')

  let text = await page.textContent('#answer');
  expect(text).toBe('8.5');
  let history = await page.textContent('#history')
  expect(history).toBe('4.2 + 3 + 1.3')
});


test('subtraction', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Case: minus test with multiple decimals and negative answer
  await page.keyboard.press('4');
  await page.keyboard.press('.');
  await page.keyboard.press('2');
  await page.keyboard.press('+');
  await page.keyboard.press('-');
  await page.keyboard.press('3');
  await page.keyboard.press('-');
  await page.keyboard.press('1');
  await page.keyboard.press('.');
  await page.keyboard.press('3');
  await page.keyboard.press('=')

  let text = await page.textContent('#answer');
  expect(text).toBe('-0.1');
  let history = await page.textContent('#history')
  expect(history).toBe('4.2 - 3 - 1.3')
});

test('multiplication with "*"', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Case: multiplication test with multiple decimals and negative answer
  await page.keyboard.press('4');
  await page.keyboard.press('.');
  await page.keyboard.press('2');
  await page.keyboard.press('+');
  await page.keyboard.press('*');
  await page.keyboard.press('3');
  await page.keyboard.press('-');
  await page.keyboard.press('1');
  await page.keyboard.press('.');
  await page.keyboard.press('3');
  await page.keyboard.press('=')
  let text = await page.textContent('#answer');
  expect(text).toBe('11.3');
  let history = await page.textContent('#history')
  expect(history).toBe('4.2 × 3 - 1.3')
});

test('multiplication with "x"', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Case: multiplication test with multiple decimals and negative answer
  await page.keyboard.press('4');
  await page.keyboard.press('.');
  await page.keyboard.press('2');
  await page.keyboard.press('+');
  await page.keyboard.press('x');
  await page.keyboard.press('3');
  await page.keyboard.press('-');
  await page.keyboard.press('1');
  await page.keyboard.press('.');
  await page.keyboard.press('3');
  await page.keyboard.press('=')

  let text = await page.textContent('#answer');
  expect(text).toBe('11.3');
  let history = await page.textContent('#history')
  expect(history).toBe('4.2 × 3 - 1.3')
});

test('Combination of key press and on-screen "×"', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Case: multiplication test with multiple decimals and negative answer
  await page.keyboard.press('4');
  await page.keyboard.press('.');
  await page.keyboard.press('2');
  await page.keyboard.press('+');
  await page.keyboard.press('x');
  await page.keyboard.press('3');
  await page.keyboard.press('-');
  await page.keyboard.press('1');
  await page.keyboard.press('.');
  await page.keyboard.press('3');
  await page.keyboard.press('=')

  let text = await page.textContent('#answer');
  expect(text).toBe('11.3');
  let history = await page.textContent('#history')
  expect(history).toBe('4.2 × 3 - 1.3')
});
test('division with hotkeys', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Case: simple division test with multiple decimals and negative answer
  await page.keyboard.press('4');
  await page.keyboard.press('2');
  await page.keyboard.press('/');
  await page.keyboard.press('2');
  await page.keyboard.press('-');
  await page.keyboard.press('1');
  await page.keyboard.press('.');
  await page.keyboard.press('3');
  await page.keyboard.press('=')
  let text = await page.textContent('#answer');
  expect(text).toBe('19.7');
  let history = await page.textContent('#history')
  expect(history).toBe('42 ÷ 2 - 1.3')
  await page.keyboard.press('Escape');
  // Case: complicated division test
  await page.keyboard.press('4');
  await page.keyboard.press('2');
  await page.keyboard.press('4');
  await page.keyboard.press('2');
  await page.keyboard.press('d');
  await page.keyboard.press('2');
  await page.keyboard.press('2');
  await page.keyboard.press('1');
  await page.keyboard.press('.');
  await page.keyboard.press('1');
  await page.keyboard.press('D');
  await page.keyboard.press('3');
  await page.keyboard.press('=')

  text = await page.textContent('#answer');
  expect(text).toBe('6.395296246'); //1 significant specified to it fits in calculator
  history = await page.textContent('#history')
  expect(history).toBe('4242 ÷ 221.1 ÷ 3')
});
test('Combination of key press and on-screen "÷"', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Case: simple division test with multiple decimals and negative answer
  await page.keyboard.press('4');
  await page.keyboard.press('2');
  await page.keyboard.press("/")
  await page.keyboard.press('2');
  await page.keyboard.press('-');
  await page.keyboard.press('1');
  await page.keyboard.press('.');
  await page.keyboard.press('3');
  await page.keyboard.press('=')

  let text = await page.textContent('#answer');
  expect(text).toBe('19.7');
  let history = await page.textContent('#history')
  expect(history).toBe('42 ÷ 2 - 1.3')
  await page.keyboard.press('Escape');
  // Case: complicated division test
  await page.keyboard.press('4');
  await page.keyboard.press('2');
  await page.keyboard.press('4');
  await page.keyboard.press('2');
  await page.keyboard.press("/");
  await page.keyboard.press('2');
  await page.keyboard.press('2');
  await page.keyboard.press('1');
  await page.keyboard.press('.');
  await page.keyboard.press('1');
  await page.keyboard.press("/");
  await page.keyboard.press('3');
  await page.keyboard.press('E')

  text = await page.textContent('#answer');
  expect(text).toBe('6.395296246'); //1 significant specified to it fits in calculator
  history = await page.textContent('#history')
  expect(history).toBe('4242 ÷ 221.1 ÷ 3')
});



test('duplicate decimal places', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  let text = await page.textContent('#answer');
  // Case: Entering a single decimal
  await page.keyboard.press('Escape');
  await page.keyboard.press('1');
  await page.keyboard.press('2');
  await page.keyboard.press('3');
  await page.keyboard.press('.');
  await page.keyboard.press('4');
  await page.keyboard.press('5');
  await page.keyboard.press('+');
  await page.keyboard.press('1');
  await page.keyboard.press('=')
  text = await page.textContent('#answer');
  expect(text).toBe('124.45');
  let history = await page.textContent('#history')
  expect(history).toBe('123.45 + 1')
  // Case: Entering a decimal with no zero
  await page.keyboard.press('Escape');
  await page.keyboard.press('.');
  await page.keyboard.press('6');
  await page.keyboard.press('+');
  await page.keyboard.press('1');
  await page.keyboard.press('=')

  text = await page.textContent('#answer');
  expect(text).toBe('1.6');
  history = await page.textContent('#history')
  expect(history).toBe('0.6 + 1')
  // Case: Entering a number instantly with three decimal places
  await page.keyboard.press('Escape');
  await page.keyboard.press('.');
  await page.keyboard.press('.');
  await page.keyboard.press('.');
  await page.keyboard.press('5');
  await page.keyboard.press('x');
  await page.keyboard.press('2');
  await page.keyboard.press('.');
  await page.keyboard.press('5');
  await page.keyboard.press('=')

  text = await page.textContent('#answer');
  expect(text).toBe('1.25');
  history = await page.textContent('#history')
  expect(history).toBe('0.5 × 2.5')
  await page.keyboard.press('Escape');
  // Case: Entering two decimal places after a calculation
  await page.keyboard.press('2');
  await page.keyboard.press('.');
  await page.keyboard.press('2');
  await page.keyboard.press('P');
  await page.keyboard.press('.');
  await page.keyboard.press('3');
  await page.keyboard.press('m');
  await page.keyboard.press('1');
  await page.keyboard.press('.');
  await page.keyboard.press('.');
  await page.keyboard.press('2');
  await page.keyboard.press('e')
  text = await page.textContent('#answer');
  expect(text).toBe('1.3');
  history = await page.textContent('#history')
  expect(history).toBe('2.2 + 0.3 - 1.2')
});


test('double "=" press does not clear answer', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.keyboard.press('3')
  await page.keyboard.press('+')
  await page.keyboard.press('4')
  await page.keyboard.press('=')
  let text = await page.textContent('#answer');
  expect(text).toBe('7');
  let history = await page.textContent('#history')
  expect(history).toBe('3 + 4')
})

test('"=" -> ".", "Ans" or a number clears answer', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Case: = followed by "."
  await page.keyboard.press('3');
  await page.keyboard.press('+');
  await page.keyboard.press('4');
  await page.keyboard.press('=')

  await page.keyboard.press('.')
  let text = await page.textContent('#answer');
  expect(text).toBe('0');
  let history = await page.textContent('#history')
  expect(history).toBe('')
  // Case: = followed by number
  await page.keyboard.press('Escape')
  await page.keyboard.press('1');
  await page.keyboard.press('+');
  await page.keyboard.press('2');
  await page.keyboard.press('=')

  await page.keyboard.press('3');
  text = await page.textContent('#answer');
  expect(text).toBe('0');
  history = await page.textContent('#history')
  expect(history).toBe('')
})

test('"=" -> new operation does not recent answer to 0', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.keyboard.press('3');
  await page.keyboard.press('+');
  await page.keyboard.press('4');
  await page.keyboard.press('=')

  await page.keyboard.press('+');
  await page.keyboard.press('5');
  await page.keyboard.press('=')

  let text = await page.textContent('#answer');
  expect(text).toBe('12');
  let history = await page.textContent('#history')
  expect(history).toBe('3 + 4 + 5')
})

test('"Ans"', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Case: 3 + 4 - Ans = "0"
  await page.keyboard.press('3');
  await page.keyboard.press('+');
  await page.keyboard.press('4');
  await page.keyboard.press('-');
  await page.keyboard.press('a');
  await page.keyboard.press('=')

  let text = await page.textContent('#answer');
  expect(text).toBe('0');
  let history = await page.textContent('#history')
  expect(history).toBe('3 + 4 - 7')
  // Case: 3 + 4 = Ans = "0"
  await page.keyboard.press('Escape')
  await page.keyboard.press('3');
  await page.keyboard.press('+');
  await page.keyboard.press('4');
  await page.keyboard.press('=')

  await page.keyboard.press('A');
  await page.keyboard.press('=')

  text = await page.textContent('#answer');
  expect(text).toBe('0');
  history = await page.textContent('#history')
  expect(history).toBe('')
})

test('swapping to addition/subtraction from division/multiplicaiton is handled correctly ', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Case 1: multiplication
  await page.keyboard.press('3')
  await page.keyboard.press('+')
  await page.keyboard.press('*');
  await page.keyboard.press('-');
  await page.keyboard.press('*');
  await page.keyboard.press('/');
  await page.keyboard.press('*');
  await page.keyboard.press('-');
  await page.keyboard.press('7')
  await page.keyboard.press('=')
  let text = await page.textContent('#answer');
  expect(text).toBe('-4');
  let history = await page.textContent('#history')
  expect(history).toBe('3 - 7')

  // Case 2: division
  await page.keyboard.press('3')
  await page.keyboard.press('/')
  await page.keyboard.press('*');
  await page.keyboard.press('2');
  await page.keyboard.press('d')
  await page.keyboard.press('+');
  await page.keyboard.press('-');
  await page.keyboard.press('7')
  await page.keyboard.press('=')
  text = await page.textContent('#answer');
  expect(text).toBe('-1');
  history = await page.textContent('#history')
  expect(history).toBe('3 × 2 - 7')

})