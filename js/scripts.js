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
let result = 0;
let operand = "";
let number2 = 0;

const getNumber = (e) => {
  if (!e.target.classList.contains("operand")) {
    if (text === "0") {
      text = "";
      text += e.target.innerText;
    } else {
      text += e.target.innerText;
    }
    if ((text !== "0" || text !== "") && result !== 0 && operand === "") {
      result = 0;
      text = "";
      text += e.target.innerText;
    }
    screen.innerText = text;
  }
};

const getOperand = (e) => {
  if (text !== "" || text !== "0") {
    if (result === 0) {
      result = parseInt(text);
      operand = e.target.innerText;
      text = "0";
    } else if (
      (text !== "0" || text !== "") &&
      result !== 0 &&
      operand === ""
    ) {
      text = "";
      operand = e.target.innerText;
    } else {
      number2 = parseInt(text);
      calcOperations(operand, result, number2);
      operand = e.target.innerText;
      text = result;
      number2 = 0;
      screen.innerText = text;
      text = "0";
    }
  }
};

const sum = () => {
  if (result !== 0 && number2 !== 0 && operand !== "") {
    calcOperations(operand, result, number2);
    text = result;
    screen.innerText = text;
  } else if (result !== 0 && number2 === 0 && operand !== "" && text !== "") {
    number2 = parseFloat(text);
    calcOperations(operand, result, number2);
    text = result;
    screen.innerText = text;
  } else {
    result = text;
    screen.innerText = text;
  }
};

const delHandler = () => {
  if (text.length === 1) {
    text = "0";
    screen.innerText = text;
  } else if (text !== "") {
    let textList = text.split("");
    console.log(textList);
    textList.pop();
    text = textList.join("");
    screen.innerText = text;
  }
};

const resetHandler = () => {
  text = "0";
  result = 0;
  number2 = 0;
  operand = "";
  screen.innerText = text;
};

// ADD EVENT LISTENERS
numKeysElements.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    getNumber(e);
  });
});

operandKeysElements.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    getOperand(e);
  });
});

resultElement.addEventListener("click", sum);

delBtn.addEventListener("click", delHandler);
resetBtn.addEventListener("click", resetHandler);
// ////////////////////
