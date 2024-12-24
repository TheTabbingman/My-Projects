const buttons = document.querySelectorAll(".buttons");
const color = document.getElementById("color");
const font = document.getElementById("font");
const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "black",
  "white",
  "brown",
];
const fonts = [
  "Jetbrains Mono",
  "Arial",
  "Times New Roman",
  "Courier New",
  "Verdana",
  "Georgia",
  "Comic Sans MS",
  "Impact",
  "Lucida Console",
  "Tahoma",
];

/**
 * Returns a random number between the min and max
 * @param {number} min - Minimum number to generate
 * @param {number} max - Maximum number to generate
 * @returns {number} - Random number between min and max
 */
function random(min, max) {
  if (max === 1) {
    max = 0;
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Randomly select color
 * @returns {string[]} - Array of random colors
 */
function randomColor() {
  const fartBackgroundColor = colors[random(0, 9)];
  let fartColor = colors[random(0, 9)];
  while (fartColor === fartBackgroundColor) {
    fartColor = colors[random(0, 9)];
  }
  let backgroundColor = colors[random(0, colors.length - 1)];
  while (backgroundColor === fartBackgroundColor) {
    backgroundColor = colors[random(0, colors.length - 1)];
  }
  return [fartBackgroundColor, fartColor, backgroundColor];
}

/**
 * Chooses random font from fonts array
 * @returns {string} - Random font
 */
function randomFont() {
  const font = fonts[random(0, fonts.length - 1)];
  return font;
}

// @ts-ignore
color.addEventListener("click", () => {
  const randomColors = randomColor();
  buttons.forEach((button) => {
    // @ts-ignore
    button.style.backgroundColor = randomColors[0];
    // @ts-ignore
    button.style.color = randomColors[1];
  });
  document.body.style.backgroundColor = randomColors[2];
});

// @ts-ignore
font.addEventListener("click", () => {
  const randomFonts = randomFont();
  buttons.forEach((button) => {
    // @ts-ignore
    button.style.fontFamily = randomFonts;
  });
});
