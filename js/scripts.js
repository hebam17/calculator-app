// get elements
const toggleBtn = document.getElementsByClassName("toggle-btn")[0];
const main = document.getElementsByClassName("main")[0];

// funcs
const toggleBtnElements = [...toggleBtn.children];
const mainElement = [...main];
console.log(main);

const toggleHandler = (e, index) => {
  // console.log(e.target.id);
  // console.log(index);
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
