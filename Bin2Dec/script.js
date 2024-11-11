function updateOutput(input) {
  document.getElementById("number").textContent = input;
}

function dec2Bin(decimal) {
  let currentDecimal = decimal;
  if (currentDecimal == 0 || currentDecimal === "") {
    updateOutput(0);
    return;
  }
  if (!/^[0-9]+$/.test(currentDecimal)) {
    updateOutput("Not a decimal number");
    return;
  }
  let binaryString = "";
  while (currentDecimal > 0) {
    binaryString = (currentDecimal % 2) + binaryString;
    currentDecimal = Math.floor(currentDecimal / 2);
  }
  updateOutput(binaryString);
}

function dec2Hex(decimal) {
  let decimalValue = decimal;
  if (isNaN(decimal)) {
    updateOutput("Not a decimal number");
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

function bin2Hex(binary) {
  let binaryString = binary.toString()
  if (binaryString === "") {
    updateOutput("0x" + 0);
    return;
  }
  if (!/^[01]+$/.test(binaryString)) {
    updateOutput("Not a binary number");
    return;
  }
  let binaryChunk = ""
  let hexValue = ""
  while (binaryString.length % 4 !== 0) {
    binaryString = "0" + binaryString
  }
  for (let i = binaryString.length - 1; i >= 0; i--) {
    binaryChunk = binaryString.charAt(i) + binaryChunk 
    if (binaryChunk.toString().length === 4) {
      hexValue = parseInt(binaryChunk, 2).toString(16).toUpperCase() + hexValue 
      binaryChunk = ""
    }
  }
  updateOutput("0x" + hexValue)
}

function hex2Dec(hex) {
  const hexString = hex.toString();
  console.log(hexString)
  if (hexString === "") {
    updateOutput(0);
    return;
  }
  if (!/^[0-9a-fA-F]+$/.test(hexString) ) {
    updateOutput("Not a hex number")
    return
  }
  console.log('fart')
  let decimalValue = 0;
  for (let i = 0; i < hexString.length; i++) {
    let hexValue = hexString.charAt(i);
    decimalValue = decimalValue * 16 + parseInt(hexValue, 16);
  }
  updateOutput(decimalValue);
}

function hex2Bin(hex) {
  const hexString = hex
  if (!isHex(hexString)) {
    return
  }
  let binValue = ""
  for (let i = 0; i < hexString.length; i++) {
    let tempHex = hexString.charAt(i)
    tempHex = parseInt(tempHex, 16).toString(2)
    while (tempHex.length % 4 !== 0 && i > 0) {
      tempHex = "0" + tempHex
    }
    binValue = binValue + tempHex
  }
  updateOutput(binValue)
}

function isHex(hex) {
  if (hex === "") {
    updateOutput(0);
    return false;
  }
  else if (!/^[0-9a-fA-F]+$/.test(hex) ) {
    updateOutput("Not a hex number")
    return false
  }
  else {
    return true
  }
}