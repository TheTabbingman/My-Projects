const output = document.getElementById("output");
const previousOutput = document.getElementById("previousOutput");
const operandDisplay = document.getElementById("operandDisplay");
const previousCurrent = document.getElementById("previousCurrent");

const numButtons = document.querySelectorAll(".numButtons");
const periodButton = document.getElementById("periodButton");

const clearButton = document.getElementById("clearButton");
const deleteButton = document.getElementById("deleteButton");
const equalsButton = document.getElementById("equalsButton");

const operationButtons = document.querySelectorAll(".operationButtons");

let numberBuffer = "";
let previousNumberBuffer = "";
let operand = "";
let previousCurrentBuffer = "";
let wasEquals = false;

/**
 * Append input string to numberBuffer
 * @param {string} button - Input button.innerText
 */
function appendNumber(button) {
  if (button === "0" && numberBuffer.length === 0) return;
  numberBuffer += button;
}

/**
 * Update output display
 */
function updateOutput() {
  if (numberBuffer === "") output.innerText = "0";
  else output.innerText = numberBuffer;
  if (previousNumberBuffer === "") previousOutput.innerText = "0";
  else previousOutput.innerText = previousNumberBuffer;
  if (operand !== "") operandDisplay.innerText = operand;
  else operandDisplay.innerText = "";
  previousCurrent.innerText = previousCurrentBuffer;
}

/**
 * Clear all buffers and update output
 */
function clearOutput() {
  numberBuffer = "";
  previousNumberBuffer = "";
  operand = "";
  previousCurrentBuffer = "";
  updateOutput();
}

/**
 * Set operand based on button input
 * @param {string} operation - Input button.innerText
 */
function operation(operation) {
  if (numberBuffer !== "" && previousNumberBuffer === "") {
    previousNumberBuffer = numberBuffer;
    numberBuffer = "";
  }

  if (operation === "+") operand = "+";
  if (operation === "-") operand = "-";
  if (operation === "×") operand = "×";
  if (operation === "÷") operand = "÷";
}

/**
 * Perform calculation based on operand
 * @param {boolean} isEqualsButton - Whether this function is called by equalsButton
 */
function calculate(isEqualsButton = false) {
  if (numberBuffer !== "" && previousNumberBuffer !== "") {
    if (isEqualsButton) previousCurrentBuffer = numberBuffer;
    const number = Number(numberBuffer);
    const previousNumber = Number(previousNumberBuffer);
    switch (operand) {
      case "+":
        numberBuffer = number + previousNumber;
        break;
      case "-":
        numberBuffer = previousNumber - number;
        break;
      case "×":
        numberBuffer = previousNumber * number;
        break;
      case "÷":
        numberBuffer = previousNumber / number;
        break;
    }
    if (!isEqualsButton) operand = "";
    if (!isEqualsButton) previousNumberBuffer = "";
    if (isEqualsButton) wasEquals = true;
    else wasEquals = false;
  }
}

numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.innerText);
    updateOutput();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (wasEquals) {
      previousNumberBuffer = numberBuffer;
      numberBuffer = "";
      previousCurrentBuffer = "";
    }
    if (numberBuffer !== "" && previousNumberBuffer !== "") calculate();
    operation(button.innerText);
    updateOutput();
  });
});

clearButton.addEventListener("click", () => {
  clearOutput();
});

equalsButton.addEventListener("click", () => {
  calculate(true);
  updateOutput();
});

periodButton.addEventListener("click", () => {
  if (!numberBuffer.includes(".")) {
    if (numberBuffer === "") numberBuffer += "0.";
    else numberBuffer += ".";
    updateOutput();
  }
});

deleteButton.addEventListener("click", () => {
  numberBuffer = numberBuffer.slice(0, numberBuffer.length - 1);
  updateOutput();
});
