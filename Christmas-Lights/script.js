const light1 = document.getElementById("light1");
const light1_style = window.getComputedStyle(light1);
const light2 = document.getElementById("light2");
const light2_style = window.getComputedStyle(light2);
const light3 = document.getElementById("light3");
const light3_style = window.getComputedStyle(light3);
const light4 = document.getElementById("light4");
const light4_style = window.getComputedStyle(light4);
const light5 = document.getElementById("light5");
const light5_style = window.getComputedStyle(light5);
const light6 = document.getElementById("light6");
const light6_style = window.getComputedStyle(light6);
const light7 = document.getElementById("light7");
const light7_style = window.getComputedStyle(light7);
const button = document.getElementById("button");
const slider = document.getElementById("slider");
const output = document.getElementById("output");
let running = false;
let interval = null;
let intervalAmount = 250;

/**
 * Cycles brightness of each light to the brightness of the previous light
 */
function cycleBrightness() {
  const brightness1 = light1_style.getPropertyValue("filter");
  const brightness2 = light2_style.getPropertyValue("filter");
  const brightness3 = light3_style.getPropertyValue("filter");
  const brightness4 = light4_style.getPropertyValue("filter");
  const brightness5 = light5_style.getPropertyValue("filter");
  const brightness6 = light6_style.getPropertyValue("filter");
  const brightness7 = light7_style.getPropertyValue("filter");
  light1.style.filter = brightness7;
  light2.style.filter = brightness1;
  light3.style.filter = brightness2;
  light4.style.filter = brightness3;
  light5.style.filter = brightness4;
  light6.style.filter = brightness5;
  light7.style.filter = brightness6;
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
