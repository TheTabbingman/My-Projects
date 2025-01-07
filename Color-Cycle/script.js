const startingColorInput = document.getElementById("startingColor");
const colorBox = document.getElementById("colorBox");
const startButton = document.getElementById("startButton");

const redOffset = document.getElementById("redOffset");
const greenOffset = document.getElementById("greenOffset");
const blueOffset = document.getElementById("blueOffset");

const intervalInput = document.getElementById("intervalInput");
const intervalApplyButton = document.getElementById("applyInterval");

let running = false;
let offsetInterval = null;
let intervalAmount = 250;

function setColor(inputColorDictionary) {
  colorBox.style.backgroundColor = `rgb(${inputColorDictionary["red"]}, ${inputColorDictionary["green"]}, ${inputColorDictionary["blue"]})`;
}

function offsetColor() {
  const redOffsetValue = redOffset.value;
  const greenOffsetValue = greenOffset.value;
  const blueOffsetValue = blueOffset.value;
  const colorBoxStyle = window.getComputedStyle(colorBox);

  const colorBoxStyleDictionary = convertToRgb(colorBoxStyle.backgroundColor);
  colorBoxStyleDictionary["red"] += Number(redOffsetValue);
  colorBoxStyleDictionary["green"] += Number(greenOffsetValue);
  colorBoxStyleDictionary["blue"] += Number(blueOffsetValue);
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

function changeInterval() {
  intervalAmount = intervalInput.value;
  colorBox.style.transitionDuration = `${intervalAmount / 1000}s`;
  if (running) {
    clearInterval(offsetInterval);
    offsetInterval = setInterval(offsetColor, intervalAmount);
  }
}

startButton.addEventListener("click", () => {
  if (!running) {
    setColor(formatGlobalColor());
    offsetInterval = setInterval(offsetColor, intervalAmount);
    startButton.innerText = "Stop";
  } else {
    clearInterval(offsetInterval);
    offsetInterval = null;
    startButton.innerText = "Start";
  }
  running = !running;
});

intervalApplyButton.addEventListener("click", changeInterval);
