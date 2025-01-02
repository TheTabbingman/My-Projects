const button = document.getElementById("button");

const intervalSlider = document.getElementById("intervalSlider");
const intervalOutput = document.getElementById("intervalOutput");

const lights = document.querySelectorAll(".dot");

const brightnessSlider = document.getElementById("brightnessSlider");
const brightnessOutput = document.getElementById("brightnessOutput");

const darknessSlider = document.getElementById("darknessSlider");
const darknessOutput = document.getElementById("darknessOutput");

const colorSliders = document.querySelectorAll(".colorSliders");
const redSlider = document.getElementById("redSlider");
const redOutput = document.getElementById("redOutput");
const greenSlider = document.getElementById("greenSlider");
const greenOutput = document.getElementById("greenOutput");
const blueSlider = document.getElementById("blueSlider");
const blueOutput = document.getElementById("blueOutput");

const lightsDropdown = document.getElementById("lightsDropdown");

const sizeSlider = document.getElementById("sizeSlider");
const sizeOutput = document.getElementById("sizeOutput");

let running = false;
let interval = null;
let intervalAmount = 250;
let currentBrightness;

const lastLight = lights[6];
const lastLightStyle = window.getComputedStyle(lastLight);
let previousBrightness = lastLightStyle.getPropertyValue("filter");

let counter = 0;
let setBrightness = 2;
let setDarkness = 0.5;

const colors = new Map();
colors.set("red", 0);
colors.set("green", 0);
colors.set("blue", 0);

let size = 25;

/**
 * Cycles brightness of each light to the brightness of the previous light
 */
function cycleBrightness() {
  counter++;
  console.debug("Counter: " + counter);
  lights.forEach((light) => {
    const light_style = window.getComputedStyle(light);
    if (counter === 7 && light.id === "light1")
      previousBrightness = "brightness(" + setBrightness + ")";
    if (counter === 7 && light.id === "light7")
      currentBrightness = "brightness(0.5)";
    else currentBrightness = light_style.getPropertyValue("filter");
    const previousBrightnessValue = Number(
      previousBrightness.match(/-?\d+(\.\d+)?/g)
    );
    if (previousBrightnessValue > 0.5) {
      light.style.filter = "brightness(" + setBrightness + ")";
    } else {
      light.style.filter = "brightness(" + setDarkness + ")";
    }
    console.debug(light.id + " previousBrightness: " + previousBrightness);
    console.debug(light.id + " currentBrightness: " + currentBrightness);
    previousBrightness = currentBrightness;
    console.debug(light.id + " previousBrightnessAS: " + previousBrightness);
  });
  if (counter === 7) {
    counter = 0;
  }
  console.debug("----------------------------------------------");
}

button.addEventListener("click", () => {
  if (running) {
    clearInterval(interval);
    interval = null;
    button.textContent = "Start";
  } else {
    interval = setInterval(cycleBrightness, intervalAmount);
    button.textContent = "Stop";
  }
  running = !running;
});

intervalSlider.addEventListener("input", () => {
  intervalAmount = intervalSlider.value;
  if (running) {
    if (interval !== null) clearInterval(interval);
    interval = setInterval(cycleBrightness, intervalAmount);
  }
  intervalOutput.innerText = "Interval: " + intervalSlider.value + "ms";
});

brightnessSlider.addEventListener("input", () => {
  setBrightness = brightnessSlider.value;
  if (running) {
    if (interval !== null) clearInterval(interval);
    interval = setInterval(cycleBrightness, intervalAmount);
  }
  brightnessOutput.innerText = "Brightness: " + brightnessSlider.value;
});

darknessSlider.addEventListener("input", () => {
  setDarkness = darknessSlider.value;
  if (running) {
    if (interval !== null) clearInterval(interval);
    interval = setInterval(cycleBrightness, intervalAmount);
  }
  darknessOutput.innerText = "Darkness: " + darknessSlider.value;
});

colorSliders.forEach((slider) => {
  slider.addEventListener("input", () => {
    const currentColor = slider.id.replace(/Slider/g, "");
    colors.set(currentColor, slider.value);
    switch (currentColor) {
      case "red":
        redOutput.innerText = "red: " + colors.get(currentColor);
        break;
      case "green":
        greenOutput.innerText = "green: " + colors.get(currentColor);
        break;
      case "blue":
        blueOutput.innerText = "Blue: " + colors.get(currentColor);
        break;
    }
    lights.forEach((light) => {
      if (lightsDropdown.value === light.id) {
        light.style.backgroundColor =
          "rgb(" +
          colors.get("red") +
          ", " +
          colors.get("green") +
          ", " +
          colors.get("blue");
      }
    });
  });
});

lightsDropdown.addEventListener("input", () => {
  lights.forEach((light) => {
    if (lightsDropdown.value === light.id) {
      const lightColorStyle = window.getComputedStyle(light);
      const lightColor = lightColorStyle.getPropertyValue("background-color");
      console.debug(lightColor);
      const tempColors = lightColor.match(/\d+/g);
      colors.set("red", tempColors[0]);
      colors.set("green", tempColors[1]);
      colors.set("blue", tempColors[2]);
      console.debug(colors);
      redSlider.value = colors.get("red");
      redOutput.innerText = "Red: " + colors.get("red");
      greenSlider.value = colors.get("green");
      greenOutput.innerText = "Green: " + colors.get("green");
      blueSlider.value = colors.get("blue");
      blueOutput.innerText = "Blue: " + colors.get("blue");

      const lightWidth = lightColorStyle.getPropertyValue("width");
      const lightHeight = lightColorStyle.getPropertyValue("height");
      console.log(lightWidth);
      console.log(lightHeight);
      if (lightWidth === lightHeight) {
        sizeSlider.value = lightWidth.match(/\d+/g);
        sizeOutput.innerText = "Size: " + lightWidth;
      } else throw new Error("lightWidth doesn't equal lightHeight");
    }
  });
});

sizeSlider.addEventListener("input", () => {
  size = sizeSlider.value + "px";
  lights.forEach((light) => {
    if (lightsDropdown.value === light.id) {
      light.style.height = size;
      light.style.width = size;
      sizeOutput.innerText = "Size: " + size;
    }
  });
});
