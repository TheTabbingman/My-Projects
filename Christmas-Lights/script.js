const button = document.getElementById("button");
const slider = document.getElementById("slider");
const output = document.getElementById("output");
const lights = document.querySelectorAll(".dot");
let running = false;
let interval = null;
let intervalAmount = 250;
let currentBrightness;

const lastLight = lights[6];
const lastLightStyle = window.getComputedStyle(lastLight);
let previousBrightness = lastLightStyle.getPropertyValue("filter");

let counter = 0;

/**
 * Cycles brightness of each light to the brightness of the previous light
 */
function cycleBrightness() {
  counter++;
  console.log(counter);
  lights.forEach((light) => {
    const light_style = window.getComputedStyle(light);
    currentBrightness = light_style.getPropertyValue("filter");
    if (counter > 0 && counter % 7 === 0 && light.id === "light1") {
      previousBrightness = "brightness(2)";
    }
    if (counter > 0 && counter % 7 === 0 && light.id === "light7") {
      currentBrightness = "brightness(0.5)";
    }
    light.style.filter = previousBrightness;
    console.log(light.id + " previousBrightness: " + previousBrightness);
    console.log(light.id + " currentBrightness: " + currentBrightness);
    previousBrightness = currentBrightness;
    console.log(light.id + " previousBrightnessAS: " + previousBrightness);
  });
  console.log("----------------------------------------------");
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

slider.addEventListener("input", () => {
  intervalAmount = slider.value;
  if (running) {
    if (interval !== null) clearInterval(interval);
    interval = setInterval(cycleBrightness, intervalAmount);
  }
  output.innerText = "Interval: " + slider.value + "ms";
});
