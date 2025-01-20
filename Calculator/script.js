class Calculator {
  #operand;
  constructor() {
    this.numberBuffer = "";
    this.previousNumberBuffer = "";
    this.#operand = "";
    this.previousCurrentBuffer = "";
    this.wasEquals = false;
  }

  /**
   * Append input string to this.numberBuffer
   * @param {string} button - Input button.innerText
   */
  appendNumber(button) {
    if (button === "0" && this.numberBuffer.length === 0) return;
    this.numberBuffer += button;
  }

  /**
   * Update output display
   */
  updateOutput() {
    const output = document.getElementById("output");
    if (this.numberBuffer === "") output.innerText = "0";
    else output.innerText = this.numberBuffer;

    const previousOutput = document.getElementById("previousOutput");
    if (this.previousNumberBuffer === "") previousOutput.innerText = "0";
    else previousOutput.innerText = this.previousNumberBuffer;

    const operandDisplay = document.getElementById("operandDisplay");
    if (this.#operand !== "") operandDisplay.innerText = this.#operand;
    else operandDisplay.innerText = "";

    const previousCurrent = document.getElementById("previousCurrent");
    previousCurrent.innerText = this.previousCurrentBuffer;
  }

  /**
   * Clear all buffers and update output
   */
  clearOutput() {
    this.numberBuffer = "";
    this.previousNumberBuffer = "";
    this.#operand = "";
    this.previousCurrentBuffer = "";
    this.updateOutput();
  }

  /**
   * Set this.#operand based on button input
   * @param {string} operation - Input button.innerText
   */
  operation(operation) {
    if (this.numberBuffer !== "" && this.previousNumberBuffer === "") {
      this.previousNumberBuffer = this.numberBuffer;
      this.numberBuffer = "";
    }

    if (operation === "+") this.#operand = "+";
    if (operation === "-") this.#operand = "-";
    if (operation === "×") this.#operand = "×";
    if (operation === "÷") this.#operand = "÷";
  }

  /**
   * Perform calculation based on this.#operand
   * @param {boolean} isEqualsButton - Whether this function is called by equalsButton
   */
  calculate(isEqualsButton = false) {
    if (this.numberBuffer !== "" && this.previousNumberBuffer !== "") {
      if (isEqualsButton) this.previousCurrentBuffer = this.numberBuffer;
      const number = Number(this.numberBuffer);
      const previousNumber = Number(this.previousNumberBuffer);
      switch (this.#operand) {
        case "+":
          this.numberBuffer = number + previousNumber;
          break;
        case "-":
          this.numberBuffer = previousNumber - number;
          break;
        case "×":
          this.numberBuffer = previousNumber * number;
          break;
        case "÷":
          this.numberBuffer = previousNumber / number;
          break;
      }
      if (!isEqualsButton) this.#operand = "";
      if (!isEqualsButton) this.previousNumberBuffer = "";
      this.wasEquals = isEqualsButton;
    }
  }
}

const calculator = new Calculator();

const numButtons = document.querySelectorAll(".numButtons");
numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateOutput();
  });
});

const operationButtons = document.querySelectorAll(".operationButtons");
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (calculator.wasEquals) {
      calculator.previousNumberBuffer = calculator.numberBuffer;
      calculator.numberBuffer = "";
      calculator.previousCurrentBuffer = "";
      calculator.wasEquals = false;
    }
    if (
      calculator.numberBuffer !== "" &&
      calculator.previousNumberBuffer !== ""
    )
      calculator.calculate();
    calculator.operation(button.innerText);
    calculator.updateOutput();
  });
});

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", () => {
  calculator.clearOutput();
});

const equalsButton = document.getElementById("equalsButton");
equalsButton.addEventListener("click", () => {
  calculator.calculate(true);
  calculator.updateOutput();
});

const periodButton = document.getElementById("periodButton");
periodButton.addEventListener("click", () => {
  if (!calculator.numberBuffer.includes(".")) {
    if (calculator.numberBuffer === "") calculator.numberBuffer += "0.";
    else calculator.numberBuffer += ".";
    calculator.updateOutput();
  }
});

const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", () => {
  calculator.numberBuffer = calculator.numberBuffer.slice(
    0,
    calculator.numberBuffer.length - 1,
  );
  calculator.updateOutput();
});
