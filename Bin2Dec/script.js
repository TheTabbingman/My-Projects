function bin2Dec(binary) {
  const binaryString = binary.toString();
  let previousBit = 0;
  for (let i = 0; i < binaryString.length; i++) {
    let currentBit = binaryString.charAt(i);
    if (currentBit != 0 && currentBit != 1) {
      document.getElementById("number").textContent = "Not a binary number";
      return;
    }
    previousBit = previousBit * 2 + parseInt(currentBit);
  }
  document.getElementById("number").textContent = previousBit;
}

function dec2Bin(decimal) {
  let currentDecimal = decimal;
  let binaryString = "";
  if (currentDecimal === 0 || currentDecimal === "") {
    binaryString = "0";
  }
  while (currentDecimal > 0) {
    let tempBinary = currentDecimal % 2;
    binaryString = tempBinary + binaryString;
    currentDecimal = Math.floor(currentDecimal / 2);
  }
  document.getElementById("number").textContent = binaryString;
}
