const button = document.getElementById("button");
const intervalSlider = document.getElementById("intervalSlider");
const intervalOutput = document.getElementById("intervalOutput");
const lights = document.querySelectorAll(".dot");
const brightnessSlider = document.getElementById("brightnessSlider");
const brightnessOutput = document.getElementById("brightnessOutput");
let running = false;
let interval = null;
let intervalAmount = 250;
let currentBrightness;

const lastLight = lights[6];
const lastLightStyle = window.getComputedStyle(lastLight);
let previousBrightness = lastLightStyle.getPropertyValue("filter");

let counter = 0;
let setBrightness = 2;

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
    light.style.filter = previousBrightness;
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
