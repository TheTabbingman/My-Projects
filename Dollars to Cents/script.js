function updateNumbers(id, text) {
  document.getElementById(id).textContent = text;
}

function dollars2Cents(dollars) {
  const cents = Number(dollars.toString().replace(/[$.]/g, ""));
  updateNumbers("cents", "Cents: " + cents + "¢");
  quarters = Math.floor(cents / 25);
  updateNumbers("quarters", "Quarters: " + quarters);
  dimes = Math.floor((cents % 25) / 10);
  updateNumbers("dimes", "Dimes: " + dimes);
  nickels = Math.floor(((cents % 25) % 10) / 5);
  updateNumbers("nickels", "Nickels: " + nickels);
  pennies = Math.floor((((cents % 25) % 10) % 5) / 1);
  updateNumbers("pennies", "Pennies: " + pennies);
}
