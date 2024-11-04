function updateOutput(input) {
  document.getElementById("number").textContent = input;
}

function bin2Dec(binary) {
  const binaryString = binary.toString();
  if (binaryString === "") {
    updateOutput(0);
    return;
  }
  const isBinary = /^[01]+$/.test(binaryString);
  if (!isBinary) {
    updateOutput("Not a binary number");
    return;
  }
  let previousBit = 0;
  for (let i = 0; i < binaryString.length; i++) {
    let currentBit = binaryString.charAt(i);
    previousBit = previousBit * 2 + parseInt(currentBit);
  }
  updateOutput(previousBit);
}

function dec2Bin(decimal) {
  let currentDecimal = decimal;
  if (currentDecimal === 0 || currentDecimal === "") {
    updateOutput(0);
    return;
  }
  const isNumber = /^[0-9]+$/.test(currentDecimal);
  if (!isNumber) {
    updateOutput("Not a number");
    return;
  }
  let binaryString = "";
  while (currentDecimal > 0) {
    let tempBinary = currentDecimal % 2;
    binaryString = tempBinary + binaryString;
    currentDecimal = Math.floor(currentDecimal / 2);
  }
  updateOutput(binaryString);
}
