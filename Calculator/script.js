const output = document.getElementById("output");
const numButtons = document.querySelectorAll(".numButtons");
const clearButton = document.getElementById("clearButton");
const addButton = document.getElementById("addButton");
const equalsButton = document.getElementById("equalsButton");

let numberBuffer = "";
let previousNumberBuffer = "";
let operand = "";

function appendNumber(buttonId) {
  numberBuffer += buttonId;
  output.innerText = numberBuffer;
}

function clearOutput() {
  numberBuffer = "";
  previousNumberBuffer = "";
  output.innerText = "0";
}

numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.id);
  });
});

clearButton.addEventListener("click", () => {
  clearOutput();
});

addButton.addEventListener("click", () => {
  previousNumberBuffer = numberBuffer;
  numberBuffer = "";
  output.innerText = "0";
  operand = "+";
});

equalsButton.addEventListener("click", () => {
  if (!isNaN(numberBuffer) && !isNaN(previousNumberBuffer)) {
    let result;
    const number = Number(numberBuffer);
    const previousNumber = Number(previousNumberBuffer);
    switch (operand) {
      case "+":
        result = number + previousNumber;
        break;
    }
    console.log(result);
    output.innerText = result;
    numberBuffer = "";
    previousNumberBuffer = "";
  }
});
