const btn = document.getElementById("button");
const input = document.querySelector("input");

function updateNumbers(id, text) {
  document.getElementById(id).textContent = text;
}

function dollars2Cents(dollars) {
  // Remove $ from string and convert to number
  let cents = Number(dollars.toString().replace(/\$/g, ""));
  // round to 2 decimal points and remove decimal point
  cents = Math.round((cents + Number.EPSILON) * 100);
  // Check cents is a number
  if (isNaN(cents)) {
    updateNumbers("cents", "Not a number");
    return;
  }
  // Check amount of coins for each value
  const quarters = Math.floor(cents / 25);
  const dimes = Math.floor((cents % 25) / 10);
  const nickels = Math.floor(((cents % 25) % 10) / 5);
  const pennies = cents % 5;
  // update display for each coin value
  updateNumbers("cents", "Cents: " + cents + "¢");
  updateNumbers("quarters", "Quarters: " + quarters);
  updateNumbers("dimes", "Dimes: " + dimes);
  updateNumbers("nickels", "Nickels: " + nickels);
  updateNumbers("pennies", "Pennies: " + pennies);
}

btn.addEventListener("click", () => {
  dollars2Cents(input.value);
});
