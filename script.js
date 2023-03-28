// Math Functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: Division by zero";
  }
  return a / b;
}

// Operate function
function operate(operator, a, b) {
  switch (operator) {
    case "add":
      return add(a, b);
    case "subtract":
      return subtract(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      return divide(a, b);
    default:
      return "Error: Invalid operator";
  }
}

// Get DOM elements for display, digits, operators, clear, and equals buttons
const display = document.querySelector(".display");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const clearBtn = document.querySelector(".clear");
const backspaceBtn = document.querySelector(".backspace");
const decimalBtn = document.querySelector(".decimal");
const equalsBtn = document.querySelector(".equals");

// Initialize variables to store the current value, stored value, and current operator
let currentValue = "";
let storedValue = null;
let currentOperator = null;
let resultDisplayed = false;

// Function to update the calculator display
function updateDisplay(value) {
  display.textContent = value;
}

// Function to handle digit button clicks
function handleDigitClick(e) {
  // If the result is displayed, clear the current value before appending the new digit
  if (resultDisplayed) {
    currentValue = "";
    resultDisplayed = false;
  }

  // Append the clicked digit to the current value and update the display
  currentValue += e.target.textContent;
  updateDisplay(currentValue);
}

// Function to handle digit button clicks
function handleDigitClick(e) {
  // Append the clicked digit to the current value and update the display
  currentValue += e.target.textContent;
  updateDisplay(currentValue);
}

// Function to handle operator button clicks
function handleOperatorClick(e) {
  // If an operator is already selected and a stored value exists, calculate the result
  if (currentOperator && storedValue !== null) {
    currentValue = String(operate(currentOperator, parseFloat(storedValue), parseFloat(currentValue)));
    updateDisplay(currentValue);
  }
  // Store the current value and set the current operator
  storedValue = currentValue;
  currentValue = "";
  currentOperator = e.target.dataset.operator;

  // Display the stored value and the operator symbol
  updateDisplay(`${storedValue} ${e.target.textContent}`);
}


// Function to handle equals button clicks
function handleEqualsClick() {
  // If an operator is selected and a stored value exists, calculate the result
  if (currentOperator && storedValue !== null) {
    currentValue = String(operate(currentOperator, parseFloat(storedValue), parseFloat(currentValue)));
    updateDisplay(currentValue);
    // Reset the stored value and current operator
    storedValue = null;
    currentOperator = null;

    // Set resultDisplayed to true after showing the result
    resultDisplayed = true;
  }
}

// Function to handle clear button clicks
function handleClearClick() {
  // Reset the current value, stored value, and current operator, then update the display
  currentValue = "";
  storedValue = null;
  currentOperator = null;
  updateDisplay("0");
}

// Function to handle backspace button clicks
function handleBackspaceClick() {
  // Remove the last character from the current value and update the display
  currentValue = currentValue.slice(0, -1);
  updateDisplay(currentValue || "0");
}

// Function to handle decimal button clicks
function handleDecimalClick() {
  // If there's no decimal point in the current value, add one
  if (!currentValue.includes('.')) {
    currentValue += '.';
    updateDisplay(currentValue);
  }
}

// Function to handle equals button clicks
function handleEqualsClick() {
  // If an operator is selected and a stored value exists, calculate the result
  if (currentOperator && storedValue !== null) {
    const result = String(operate(currentOperator, parseFloat(storedValue), parseFloat(currentValue)));
    // Display the equation and the result
    updateDisplay(`${storedValue} ${getOperatorSymbol(currentOperator)} ${currentValue} = ${result}`);

    // Reset the stored value and current operator
    currentValue = result;
    storedValue = null;
    currentOperator = null;
    resultDisplayed = true;
  }
}

// Helper function to get the operator symbol from the dataset operator
function getOperatorSymbol(operator) {
  switch (operator) {
    case 'add':
      return '+';
    case 'subtract':
      return '-';
    case 'multiply':
      return '*';
    case 'divide':
      return '/';
  }
}

// Add event listeners for digit buttons, operator buttons, clear button, backspace button, decimal button, and equals button
digits.forEach((digit) => digit.addEventListener("click", handleDigitClick));
operators.forEach((operator) => operator.addEventListener("click", handleOperatorClick));
clearBtn.addEventListener("click", handleClearClick);
backspaceBtn.addEventListener("click", handleBackspaceClick);
decimalBtn.addEventListener("click", handleDecimalClick);
equalsBtn.addEventListener("click", handleEqualsClick);

// Function to handle keypress events for keyboard support
function handleKeyPress(e) {
  // Get the key code of the pressed key
  const key = e.key;

  // Check if the pressed key is a digit, operator, decimal point, backspace, or enter key
  if (/\d/.test(key)) { // If it's a digit
    currentValue += key;
    updateDisplay(currentValue);
  } else if (key === '+' || key === '-' || key === '*' || key === '/') { // If it's an operator
    if (currentOperator && storedValue !== null) {
      currentValue = String(operate(currentOperator, parseFloat(storedValue), parseFloat(currentValue)));
      updateDisplay(currentValue);
    }
    storedValue = currentValue;
    currentValue = "";
    currentOperator = key === '+' ? 'add' : key === '-' ? 'subtract' : key === '*' ? 'multiply' : 'divide';
  } else if (key === '.') { // If it's a decimal point
    if (!currentValue.includes('.')) {
      currentValue += '.';
      updateDisplay(currentValue);
    }
  } else if (key === 'Backspace') { // If it's a backspace
    currentValue = currentValue.slice(0, -1);
    updateDisplay(currentValue || "0");
  } else if (key === 'Enter' || key === '=') { // If it's an enter or equals key
    if (currentOperator && storedValue !== null) {
      currentValue = String(operate(currentOperator, parseFloat(storedValue), parseFloat(currentValue)));
      updateDisplay(currentValue);
      storedValue = null;
      currentOperator = null;
    }
  } else if (key === 'c' || key === 'C') { // If it's a clear key
    currentValue = "";
    storedValue = null;
    currentOperator = null;
    updateDisplay("0");
  }
}

// Add an event listener for keypress events
document.addEventListener("keydown", handleKeyPress);