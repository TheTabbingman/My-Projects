function bin2Dec(binary) {
  const binaryString = binary.toString();
  let previousBit = 0;
  if (binaryString === "") {
    document.getElementById("number").textContent = 0;
    return;
  }
  const isBinary = /^[01]+$/.test(binaryString);
  if (!isBinary) {
    document.getElementById("number").textContent = "Not a binary number";
    return;
  }
  for (let i = 0; i < binaryString.length; i++) {
    let currentBit = binaryString.charAt(i);
    previousBit = previousBit * 2 + parseInt(currentBit);
  }
  document.getElementById("number").textContent = previousBit;
}

function dec2Bin(decimal) {
  let currentDecimal = decimal;
  let binaryString = "";
  if (currentDecimal === 0 || currentDecimal === "") {
    document.getElementById("number").textContent = 0;
    return;
  }
  const isNumber = /^[0-9]+$/.test(currentDecimal);
  if (!isNumber) {
    document.getElementById("number").textContent = "Not a number";
    return;
  }
  while (currentDecimal > 0) {
    let tempBinary = currentDecimal % 2;
    binaryString = tempBinary + binaryString;
    currentDecimal = Math.floor(currentDecimal / 2);
  }
  document.getElementById("number").textContent = binaryString;
}
