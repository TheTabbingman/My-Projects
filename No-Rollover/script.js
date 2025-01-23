const input = document.getElementById("input");

let pressed = false;
input.addEventListener("keydown", (e) => {
  if (pressed) e.preventDefault();
  else pressed = true;
});

input.addEventListener("keyup", () => {
  pressed = false;
});
