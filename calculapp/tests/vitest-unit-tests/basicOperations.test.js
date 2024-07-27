import { expect, test } from 'vitest'
import { sum, divide, multiply, exponent, subtract, remainder } from 'basicOperations.js'

test('Basic mathematical operations', () => {
    expect(Math.sqrt(4)).toBe(2)
    expect(sum(15, 24)).toBe(39)
    expect(subtract(31, 24)).toBe(7)
    expect(multiply(15, 24)).toBe(360)
    expect(exponent(3, 5)).toBe(243)
    expect(divide(9, 2)).toBe(4.5)
    expect(remainder(30, 4)).toBe(2)
})


