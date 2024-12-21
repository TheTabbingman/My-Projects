import Decimal from "decimal.js";

function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

function oldFactorialDecimal(n, precision) {
  // Decimal.precision = precision;
  if (n === 0 || n === 1) {
    return new Decimal(1);
  }
  const factorial = new Decimal(n * factorialDecimal(n - 1));
  return factorial;
}

function factorialDecimal(n) {
  let result = new Decimal(1);
  for (let i = 1; i <= n; i++) {
    result = result.times(i);
  }
  return result;
}

/**
 * Calculate the number e with the specified number of digits
 * @param {number} digits - Number of digits to calculate
 * @returns {string} - Digits of e specified
 */
function calculate_e(digits) {
  Decimal.set({ precision: digits + 3 });
  let e = new Decimal(2);
  for (let i = 1; i < digits + 3; i++) {
    const numerator = new Decimal(2 * i + 2);
    const denominator = new Decimal(factorialDecimal(2 * i + 1));
    e = e.plus(numerator.div(denominator));
  }
  const result = e.toString().slice(0, digits + 2);
  return result;
}

console.log(calculate_e(10000));
