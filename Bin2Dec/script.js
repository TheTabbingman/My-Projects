function updateOutput(input) {
  document.getElementById("number").textContent = input;
}

function bin2Dec(binary) {
  const binaryString = binary.toString();
  if (binaryString === "") {
    updateOutput(0);
    return;
  }
  if (!/^[01]+$/.test(binaryString)) {
    updateOutput("Not a binary number");
    return;
  }
  let decimalValue = 0;
  for (let i = 0; i < binaryString.length; i++) {
    let currentBit = binaryString.charAt(i);
    decimalValue = decimalValue * 2 + parseInt(currentBit);
  }
  updateOutput(decimalValue);
}

function dec2Bin(decimal) {
  let currentDecimal = decimal;
  if (currentDecimal === 0 || currentDecimal === "") {
    updateOutput(0);
    return;
  }
  if (!/^[0-9]+$/.test(currentDecimal)) {
    updateOutput("Not a number");
    return;
  }
  let binaryString = "";
  while (currentDecimal > 0) {
    binaryString = (currentDecimal % 2) + binaryString;
    currentDecimal = Math.floor(currentDecimal / 2);
  }
  updateOutput(binaryString);
}

function hex2Dec(hex) {
  const hexString = hex.toString();
  if (!/[0-9a-fA-F]/.test(hexString) ) {
    updateOutput("Not a hex number")
    return
  }
  let decimalValue = 0;
  for (let i = 0; i < hexString.length; i++) {
    let hexValue = hexString.charAt(i);
    decimalValue = decimalValue * 16 + parseInt(hexValue, 16);
  }
  updateOutput(decimalValue);
}

function dec2Hex(decimal) {
  let decimalValue = decimal;
  if (isNaN(decimal)) {
    console.log("Input not a number");
    return;
  }
  let hexValue = "";
  while (decimalValue !== 0) {
    let tempHex = decimalValue % 16;
    decimalValue = Math.floor(decimalValue / 16);
    tempHex = tempHex.toString(16).toUpperCase();
    hexValue = tempHex + hexValue;
  }
  hexValue = "0x" + hexValue;
  updateOutput(hexValue);
}
