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
  const factorial = new Decimal(n * oldFactorialDecimal(n - 1));
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
 * @param {number} digits - Number of decimal digits to calculate
 * @returns {string} - Digits of e specified
 */
function e(digits) {
  Decimal.set({ precision: digits + 3 });
  let e = new Decimal(2);
  let factorial = new Decimal(1);
  for (let i = 1; i < digits + 3; i++) {
    const numerator = new Decimal(2 * i + 2);
    factorial = factorial.times(2 * i).times(2 * i + 1);
    e = e.plus(numerator.div(factorial));
  }
  const result = e.toString().slice(0, digits + 2);
  return result;
}

/**
 *
 * @param {number} digits - Fibonacci digit to calculate
 * @returns {number} - Fibonacci number at the specified digit
 */
function fibonacci(digits) {
  const fibonacci = [0, 1];
  for (let n = 2; n < digits + 1; n++) {
    fibonacci[n] = fibonacci[n - 1] + fibonacci[n - 2];
  }
  return fibonacci[digits];
}

/**
 *
 * @param {any[]} array - Array to deduplicate
 * @returns {any[]} - Array with duplicates removed
 */
function array_deduplicate(array) {
  return [...new Set(array)];
}

/**
 *
 * @param {number} number - Number to calculate prime factors of
 * @returns {number[]} - Prime factors of the specified number
 */
function prime_factors(number) {
  let factors = [];
  for (let i = 2; number !== 1; i++) {
    if (number % i === 0) {
      number /= i;
      factors.push(i);
      i = 1;
    }
  }
  factors = array_deduplicate(factors);
  return factors;
}

console.log(e(100));
console.log(fibonacci(19));
console.log(prime_factors(4568));
