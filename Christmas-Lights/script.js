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
let running = false;
let interval = null;

/**
 * Changes each light to the color of the previous light
 */
function changeLights() {
  const color1 = light1_style.getPropertyValue("background-color");
  const color2 = light2_style.getPropertyValue("background-color");
  const color3 = light3_style.getPropertyValue("background-color");
  const color4 = light4_style.getPropertyValue("background-color");
  const color5 = light5_style.getPropertyValue("background-color");
  const color6 = light6_style.getPropertyValue("background-color");
  const color7 = light7_style.getPropertyValue("background-color");
  light1.style.backgroundColor = color7;
  light2.style.backgroundColor = color1;
  light3.style.backgroundColor = color2;
  light4.style.backgroundColor = color3;
  light5.style.backgroundColor = color4;
  light6.style.backgroundColor = color5;
  light7.style.backgroundColor = color6;
}

button.addEventListener("click", () => {
  if (running) {
    clearInterval(interval);
    interval = null;
    button.textContent = "Start";
  } else {
    interval = setInterval(changeLights, 250);
    button.textContent = "Stop";
  }
  running = !running;
});
