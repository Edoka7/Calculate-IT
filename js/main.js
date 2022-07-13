const numberKeys = document.querySelectorAll("[data-calckey");
const specialKeys = document.querySelectorAll("[data-calcspecialkey");

const mainInputScreen = document.querySelector("[data-calcScreen = main]");
const secondInputScreen = document.querySelector("[data-calcScreen = second]");

let valueX, valueY, operationType;

const renderScreen = () => {
  secondInputScreen.textContent = valueY;
  mainInputScreen.textContent = valueX;
};

const inputNumber = (e) => {
  if (valueX === null || valueX === undefined) {
    valueX = e.target.dataset.calckey;
  } else {
    valueX += e.target.dataset.calckey;
  }

  renderScreen();
};

const specialOperation = (e) => {};

const eventsBind = () => {
  numberKeys.forEach((key) => {
    key.addEventListener("click", (e) => inputNumber(e));
  });

  specialKeys.forEach((key) => {
    key.addEventListener("click", (e) => specialOperation(e));
  });
};

eventsBind();
