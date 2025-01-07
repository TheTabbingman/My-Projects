const startingColorInput = document.getElementById("startingColor");
const colorBox = document.getElementById("colorBox");
const startButton = document.getElementById("startButton");
const errorOutput = document.getElementById("error");

const redOffset = document.getElementById("redOffset");
const greenOffset = document.getElementById("greenOffset");
const blueOffset = document.getElementById("blueOffset");

const intervalInput = document.getElementById("intervalInput");
const intervalApplyButton = document.getElementById("applyInterval");
const currentColorOutput = document.getElementById("currentColor");

class ColorCycler {
  constructor() {
    this.running = false;
    this.offsetInterval = null;
    this.intervalAmount = 250;
  }

  setColor(inputColorDictionary) {
    colorBox.style.backgroundColor = `rgb(${inputColorDictionary["red"]}, ${inputColorDictionary["green"]}, ${inputColorDictionary["blue"]})`;
    const colorBoxStyle = window.getComputedStyle(colorBox);
    currentColorOutput.innerText = colorBoxStyle.backgroundColor;
  }

  offsetColor() {
    const redOffsetValue = redOffset.value;
    const greenOffsetValue = greenOffset.value;
    const blueOffsetValue = blueOffset.value;
    const colorBoxStyle = window.getComputedStyle(colorBox);

    const colorBoxStyleDictionary = this.convertToRgb(
      colorBoxStyle.backgroundColor,
    );
    colorBoxStyleDictionary["red"] += Number(redOffsetValue);
    colorBoxStyleDictionary["green"] += Number(greenOffsetValue);
    colorBoxStyleDictionary["blue"] += Number(blueOffsetValue);
    this.setColor(colorBoxStyleDictionary);
  }

  convertToRgb(rgbString) {
    const rgbArray = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbArray) {
      return {
        red: Number(rgbArray[1]),
        green: Number(rgbArray[2]),
        blue: Number(rgbArray[3]),
      };
    }
  }

  formatGlobalColor() {
    const startingColorHexTemp = startingColorInput.value.match(
      /^#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
    );
    const startingColorRgbTemp = startingColorInput.value.match(
      /(\d+),\s*(\d+),\s*(\d+)/,
    );
    let rgbStartingColor;
    if (startingColorHexTemp) {
      errorOutput.innerText = "";
      rgbStartingColor = {
        red: parseInt(startingColorHexTemp[1], 16),
        green: parseInt(startingColorHexTemp[2], 16),
        blue: parseInt(startingColorHexTemp[3], 16),
      };
      return rgbStartingColor;
    } else if (startingColorRgbTemp) {
      errorOutput.innerText = "";
      rgbStartingColor = {
        red: Number(startingColorRgbTemp[1]),
        green: Number(startingColorRgbTemp[2]),
        blue: Number(startingColorRgbTemp[3]),
      };
      return rgbStartingColor;
    } else {
      errorOutput.innerText = "Not a valid input";
      return null;
    }
  }

  changeInterval() {
    if (intervalInput.value === "") this.intervalAmount = 250;
    else this.intervalAmount = intervalInput.value;
    colorBox.style.transitionDuration = `${this.intervalAmount / 1000}s`;
    if (this.running) {
      clearInterval(this.offsetInterval);
      this.offsetInterval = setInterval(
        this.offsetColor.bind(colorCycler),
        this.intervalAmount,
      );
    }
  }
}

const colorCycler = new ColorCycler();

startButton.addEventListener("click", () => {
  if (!colorCycler.running) {
    const formattedColor = colorCycler.formatGlobalColor();
    if (formattedColor) colorCycler.setColor(formattedColor);
    else return;
    colorCycler.offsetInterval = setInterval(
      colorCycler.offsetColor.bind(colorCycler),
      colorCycler.intervalAmount,
    );
    startButton.innerText = "Stop";
  } else {
    clearInterval(colorCycler.offsetInterval);
    colorCycler.offsetInterval = null;
    startButton.innerText = "Start";
  }
  colorCycler.running = !colorCycler.running;
});

intervalApplyButton.addEventListener("click", () => {
  colorCycler.changeInterval();
});
