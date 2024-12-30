const slider = document.getElementById("slider");
const word = document.getElementById("word");
const output = document.getElementById("output");

slider.oninput = function () {
  const slider_value = slider.value + "px";
  word.style.borderRadius = slider_value;
  slider.style.borderRadius = slider_value;
  output.innerText = "Value: " + slider_value;
};
