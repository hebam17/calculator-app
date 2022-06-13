// get elements
const toggleBtn = document.getElementsByClassName("toggle-btn")[0];
const main = document.getElementsByClassName("main")[0];
const toggleNum = document.getElementsByClassName("toggle-nums")[0];
const container = document.getElementsByClassName("container")[0];
const keysContainer = document.getElementsByClassName("keys-container")[0];
const header = document.querySelector("h1");
const header2 = document.querySelector("h2");

// funcs
const toggleBtnElements = [...toggleBtn.children];
const containerElements = [...container.children];
const keysContainerElements = [...keysContainer.children];
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
    // console.log(thyme);
    // console.log(elem.classList);
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
  // const index = index;
  elem.addEventListener("click", (e) => {
    toggleHandler(e, index);
  });
});
