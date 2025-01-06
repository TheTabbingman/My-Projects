const startingColorInput = document.getElementById("startingColor");
const colorBox = document.getElementById("colorBox");
const startButton = document.getElementById("startButton");

const redOffset = document.getElementById("redOffset");
const greenOffset = document.getElementById("greenOffset");
const blueOffset = document.getElementById("blueOffset");

let running = false;
let offsetInterval = null;

function setColor(inputColorDictionary) {
  const formattedStartingColor = `rgb(${inputColorDictionary["red"]}, ${inputColorDictionary["green"]}, ${inputColorDictionary["blue"]})`;
  colorBox.style.backgroundColor = formattedStartingColor;
}

function offsetColor() {
  console.log("farts");
  const redOffsetValue = redOffset.value;
  const greenOffsetValue = greenOffset.value;
  const blueOffsetValue = blueOffset.value;
  const colorBoxStyle = window.getComputedStyle(colorBox);
  console.log("Transition: " + colorBoxStyle.transition);

  const colorBoxStyleDictionary = convertToRgb(colorBoxStyle.backgroundColor);
  console.log(colorBoxStyleDictionary);
  colorBoxStyleDictionary["red"] += Number(redOffsetValue);
  colorBoxStyleDictionary["green"] += Number(greenOffsetValue);
  colorBoxStyleDictionary["blue"] += Number(blueOffsetValue);
  console.log(colorBoxStyleDictionary);
  setColor(colorBoxStyleDictionary);
}

function convertToRgb(rgbString) {
  const rgbArray = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbArray) {
    return {
      red: Number(rgbArray[1]),
      green: Number(rgbArray[2]),
      blue: Number(rgbArray[3]),
    };
  }
}

function formatGlobalColor() {
  const startingColorHexTemp = startingColorInput.value.match(
    /^#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
  );
  const startingColorRgbTemp = startingColorInput.value.match(
    /(\d+),\s*(\d+),\s*(\d+)/,
  );
  let rgbStartingColor;
  if (startingColorHexTemp) {
    console.log(startingColorHexTemp);
    rgbStartingColor = {
      red: parseInt(startingColorHexTemp[1], 16),
      green: parseInt(startingColorHexTemp[2], 16),
      blue: parseInt(startingColorHexTemp[3], 16),
    };
  }
  if (startingColorRgbTemp) {
    rgbStartingColor = {
      red: Number(startingColorRgbTemp[1]),
      green: Number(startingColorRgbTemp[2]),
      blue: Number(startingColorRgbTemp[3]),
    };
  }
  return rgbStartingColor;
}

startButton.addEventListener("click", () => {
  if (!running) {
    setColor(formatGlobalColor());
    offsetInterval = setInterval(offsetColor, 250);
    startButton.innerText = "Stop";
  } else {
    clearInterval(offsetInterval);
    offsetInterval = null;
    startButton.innerText = "Start";
  }
  running = !running;
});
