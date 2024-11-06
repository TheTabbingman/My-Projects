function updateNumbers(id, text) {
  document.getElementById(id).textContent = text;
}

function dollars2Cents(dollars) {
  const cents = Number(dollars.toString().replace(/[$.]/g, ""));
  const quarters = Math.floor(cents / 25);
  const dimes = Math.floor((cents % 25) / 10);
  const nickels = Math.floor((cents % 25 % 10) / 5);
  const pennies = Math.floor(cents % 25 % 10 % 5);
  updateNumbers("cents", "Cents: " + cents + "¢");
  updateNumbers("pennies", "Pennies: " + pennies);
  updateNumbers("quarters", "Quarters: " + quarters);
  updateNumbers("nickels", "Nickels: " + nickels);
  updateNumbers("dimes", "Dimes: " + dimes);
}
