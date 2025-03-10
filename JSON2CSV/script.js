addEventListener("submit", (e) => {
  e.preventDefault();

  let inputArray = null;
  try {
    inputArray = JSON.parse(document.getElementById("input").value);
  } catch (error) {
    const errorStr = String(error);

    const errorOutput = document.createElement("h6");
    errorOutput.className = "alert alert-danger";

    // console.error(error);
    if (errorStr.includes("double-quoted")) {
      console.error("Must have double quotes around properties.");
      errorOutput.innerText = "Must have double quotes around properties.";
    } else {
      console.error(errorStr);
      errorOutput.innerText = errorStr;
    }

    const inputForm = document.getElementById("input-form");
    const outputLabel = document.getElementById("output-label");
    inputForm.parentElement.insertBefore(errorOutput, outputLabel);
    setTimeout(() => document.querySelector(".alert").remove(), 5000);
  }

  if (inputArray) {
    console.log(inputArray);

    if (Array.isArray(inputArray)) JSONArray2CSV(inputArray);
    else JSON2CSV(inputArray);
  }
});

function JSON2CSV(inputArray) {
  const keysSet = new Set();
  const valuesArray = [];

  Object.keys(inputArray).forEach((key) => keysSet.add(key));
  valuesArray.push(Object.values(inputArray));

  let outputStr = "";

  let index = 0;
  keysSet.forEach((key) => {
    if (index === 0) {
      outputStr += key;
    } else if (index + 1 === keysSet.size) {
      outputStr += "," + key + "\n";
    } else {
      outputStr += "," + key;
    }
    index++;
  });

  valuesArray.forEach((value, index) => {
    if (index === 0) {
      outputStr += value;
    } else {
      outputStr += "," + value;
    }
  });
  document.getElementById("output").value = outputStr;
}

function JSONArray2CSV(inputArray) {
  const keysSet = new Set();
  const valuesArrayArray = [];

  inputArray.forEach((input) => {
    Object.keys(input).forEach((key) => keysSet.add(key));
  });

  inputArray.forEach((input) => {
    valuesArrayArray.push(Object.values(input));
  });

  let outputStr = "";

  let index = 0;
  keysSet.forEach((key) => {
    if (index === 0) {
      outputStr += key;
    } else if (index + 1 === keysSet.size) {
      outputStr += "," + key + "\n";
    } else {
      outputStr += "," + key;
    }
    index++;
  });

  valuesArrayArray.forEach((valuesArray, papaIndex) => {
    valuesArray.forEach((value, index) => {
      if (
        papaIndex + 1 === valuesArrayArray.length &&
        index + 1 === valuesArray.length
      ) {
        outputStr += "," + value;
      } else if (index === 0) {
        outputStr += value;
      } else if (index + 1 === valuesArray.length) {
        outputStr += "," + value + "\n";
      } else {
        outputStr += "," + value;
      }
    });
  });
  document.getElementById("output").value = outputStr;
}
