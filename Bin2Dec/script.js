function bin2Dec(binary) {
  const binaryString = binary.toString();
  let previousBit = 0;
  for (let i = 0; i < binaryString.length; i++) {
    let currentBit = binaryString.charAt(i);
    previousBit = previousBit * 2 + parseInt(currentBit);
  }
  document.getElementById("number").textContent = previousBit;
}
