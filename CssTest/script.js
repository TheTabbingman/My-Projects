const fart = document.getElementById("change");
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

// @ts-ignore
fart.addEventListener("click", () => {
  const randomColors = randomColor();
  // @ts-ignore
  fart.style.backgroundColor = randomColors[0];
  // @ts-ignore
  fart.style.color = randomColors[1];
  document.body.style.backgroundColor = randomColors[2];
});
