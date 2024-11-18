function updateOutput(input) {
  document.getElementById("number").textContent = input;
}

function dec2Bin(decimal) {
  let currentDecimal = decimal;
  isDec(currentDecimal);
  let binaryString = "";
  while (currentDecimal > 0) {
    binaryString = (currentDecimal % 2) + binaryString;
    currentDecimal = Math.floor(currentDecimal / 2);
  }
  updateOutput(binaryString);
}

function dec2Hex(decimal) {
  let decimalValue = decimal;
  isDec(decimalValue);
  let hexValue = "";
  while (decimalValue !== 0) {
    let tempHex = decimalValue % 16;
    decimalValue = Math.floor(decimalValue / 16);
    tempHex = tempHex.toString(16).toUpperCase();
    hexValue = tempHex + hexValue;
  }
  updateOutput("0x" + hexValue);
}

function isDec(decimal) {
  if (decimal == 0 || decimal === "") {
    updateOutput(0);
    throw new Error("Invalid decimal number");
  } else if (!/^[0-9]+$/.test(decimal)) {
    updateOutput("Not a decimal number");
    throw new Error("Not a decimal number");
  } else if (isNaN(decimal)) {
    updateOutput("Not a decimal number");
    throw new Error("Not a decimal number");
  }
}

function bin2Dec(binary) {
  const binaryString = binary.toString();
  isBin(binaryString)
  let decimalValue = 0;
  for (let i = 0; i < binaryString.length; i++) {
    let currentBit = binaryString.charAt(i);
    decimalValue = decimalValue * 2 + parseInt(currentBit);
  }
  updateOutput(decimalValue);
}

function bin2Hex(binary) {
  let binaryString = binary.toString();
  isBin(binaryString)
  let binaryChunk = "";
  let hexValue = "";
  while (binaryString.length % 4 !== 0) {
    binaryString = "0" + binaryString;
  }
  for (let i = binaryString.length - 1; i >= 0; i--) {
    binaryChunk = binaryString.charAt(i) + binaryChunk;
    if (binaryChunk.toString().length === 4) {
      hexValue = parseInt(binaryChunk, 2).toString(16).toUpperCase() + hexValue;
      binaryChunk = "";
    }
  }
  updateOutput("0x" + hexValue);
}

function isBin(binary) {
  if (binary === "") {
    updateOutput("0x" + 0);
    throw new Error("Not a valid number")
  } else if (!/^[01]+$/.test(binary)) {
    updateOutput("Not a binary number");
    throw new Error("Not a binary number")
  }
}

function hex2Dec(hex) {
  const hexString = hex.toString();
  isHex(hexString)
  let decimalValue = 0;
  for (let i = 0; i < hexString.length; i++) {
    let hexValue = hexString.charAt(i);
    decimalValue = decimalValue * 16 + parseInt(hexValue, 16);
  }
  updateOutput(decimalValue);
}

function hex2Bin(hex) {
  const hexString = hex;
  isHex(hexString)
  let binValue = "";
  for (let i = 0; i < hexString.length; i++) {
    let tempHex = hexString.charAt(i);
    tempHex = parseInt(tempHex, 16).toString(2);
    while (tempHex.length % 4 !== 0 && i > 0) {
      tempHex = "0" + tempHex;
    }
    binValue = binValue + tempHex;
  }
  updateOutput(binValue);
}

function isHex(hex) {
  if (hex === "") {
    updateOutput(0);
    throw new Error("Not a valid number")
  } else if (!/^[0-9a-fA-F]+$/.test(hex)) {
    updateOutput("Not a hex number");
    throw new Error("Not a hex number")
  }
}
