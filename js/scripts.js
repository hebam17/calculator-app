// get elements
const toggleBtn = document.getElementsByClassName("toggle-btn")[0];
const main = document.getElementsByClassName("main")[0];
const toggleNum = document.getElementsByClassName("toggle-nums")[0];
const container = document.getElementsByClassName("container")[0];
const keysContainer = document.getElementsByClassName("keys-container")[0];
const screen = document.getElementsByClassName("screen")[0];
const numKeys = document.getElementsByClassName("key");
const operandKeys = document.getElementsByClassName("operand");
const header = document.querySelector("h1");
const header2 = document.querySelector("h2");
const resultElement = document.getElementsByClassName("result")[0];

const delBtn = document.getElementsByClassName("del-key")[0];
const resetBtn = document.getElementsByClassName("reset")[0];

// funcs
const toggleBtnElements = [...toggleBtn.children];
const containerElements = [...container.children];
const keysContainerElements = [...keysContainer.children];
const numKeysElements = [...numKeys];
const operandKeysElements = [...operandKeys];
const allElemes = [
  toggleBtn,
  main,
  header,
  header2,
  toggleNum,
  container,
  ...containerElements,
];

// change keys thyme
const keysContainerThymeChanger = (thyme) => {
  keysContainerElements.forEach((elem) => {
    let class1 = elem.classList[0];
    let class2 = `${class1}-${thyme}`;
    elem.classList.replace(elem.classList[1], class2);
  });
};

const toggleHandler = (e, index) => {
  let thyme = `thyme${index + 1}`;
  allElemes.forEach((elem) => {
    let classFirst = elem.classList[0];
    elem.id = `${classFirst}-${thyme}`;
  });
  keysContainerThymeChanger(thyme);
  e.target.id = `toggle${index + 1}-thyme${index + 1}`;
  toggleBtnElements.forEach((elem) => {
    if (elem !== e.target) {
      elem.id = "";
    }
  });
};

// eventlisteners
toggleBtnElements.forEach((elem, index) => {
  elem.addEventListener("click", (e) => {
    toggleHandler(e, index);
  });
});

// // end change keys thyme/////////

// CALCULATOR WORK

const calcOperations = (operand, a, b) => {
  switch (operand) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = a / b;
      break;

    default:
      result = 0;
      break;
  }
};

let text = "";
let operand = "";
let number1 = 0;
let number2 = 0;
let result = 0;

// to get the number and sync it with the screen
const getNumber = (e) => {
  if (!e.target.classList.contains("operand")) {
    if (text === "0") {
      text = "";
      text += e.target.innerText;
    } else if (parseFloat(text) == result) {
      text = "";
      text += e.target.innerText;
      result = 0;
    } else {
      text += e.target.innerText;
    }

    screen.innerText = text;
  }
};

// to get the operand and get result
const getOperand = (e) => {
  if (text !== "0" || text !== "") {
    if (result === 0 && number1 === 0 && operand === "") {
      number1 = parseFloat(text);
      text = "0";
      operand = e.target.innerText;
    } else if (
      (result === 0 && number1 !== 0) ||
      (result === 0 && number1 === 0 && operand !== "")
    ) {
      number2 = parseFloat(text);
      calcOperations(operand, number1, number2);
      text = result;
      screen.innerText = text;

      operand = e.target.innerText;
    } else if (result !== 0) {
      number1 = result;
      operand = e.target.innerText;
      result = 0;
      text = "0";
    }
  } else if (text === "0" || text === "") {
    if (number1 === 0) {
      operand = e.target.innerText;
    }
  }
};

// to get the result when clicking =
const sum = () => {
  if (result === 0 && operand !== "") {
    number2 = parseFloat(text);
    calcOperations(operand, number1, number2);
    text = result;
    screen.innerText = text;
    number1 = 0;
    number2 = 0;
    operand = "";
  }
};

// handle clicking the del button
const delHandler = () => {
  if (text.length === 1 || text === Infinity) {
    text = "0";
    screen.innerText = text;
  } else if (text !== "") {
    let textList = text.split("");
    textList.pop();
    text = textList.join("");
    screen.innerText = text;
  }
};

// handle clicking the reset button
const resetHandler = () => {
  text = "0";
  number1 = 0;
  number2 = 0;
  operand = "";
  result = 0;
  screen.innerText = text;
};

// want the boxshadow to disappear on keydown
// ADD EVENT LISTENERS
numKeysElements.forEach((elem) => {
  elem.addEventListener("click", getNumber);
});

// to mimic a moving key ////////////////
numKeysElements.forEach((elem) => {
  elem.addEventListener("mousedown", (e) => {
    e.target.classList.add("move");
  });
});

delBtn.addEventListener("mousedown", (e) => {
  e.target.classList.add("move");
});

resetBtn.addEventListener("mousedown", (e) => {
  e.target.classList.add("move");
});

resultElement.addEventListener("mousedown", (e) => {
  e.target.classList.add("move");
});

numKeysElements.forEach((elem) => {
  elem.addEventListener("mouseup", (e) => {
    e.target.classList.remove("move");
  });
});

delBtn.addEventListener("mouseup", (e) => {
  e.target.classList.remove("move");
});

resultElement.addEventListener("mouseup", (e) => {
  e.target.classList.remove("move");
});

resetBtn.addEventListener("mouseup", (e) => {
  e.target.classList.remove("move");
});

// ////////////////

operandKeysElements.forEach((elem) => {
  elem.addEventListener("click", getOperand);
});

resultElement.addEventListener("click", sum);

delBtn.addEventListener("click", delHandler);

resetBtn.addEventListener("click", resetHandler);
// ////////////////////
