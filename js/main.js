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

const doEqueals = () => {
  valueX = Number(valueX);
  valueY = Number(valueY);

  switch (operationType) {
    case "/":
      return valueY / valueX;
      break;

    case "+":
      return valueX + valueY;
      break;

    case "-":
      return valueX - valueY;
      break;

    case "*":
      return valueX * valueY;
      break;

    default:
      break;
  }
};

const specialOperation = (e) => {
  const clickKey = e.target.dataset.calcspecialkey;

  switch (clickKey) {
    case "ac":
      valueX = null;
      valueY = null;
      renderScreen();
      break;

    default:
      break;
  }

  if (valueX === null || valueX === undefined) return;

  switch (clickKey) {
    case "del":
      valueX = valueX.slice(0, -1);

      break;

    case "div":
      operationType = "/";
      valueY = valueX;
      valueX = null;

      break;

    case "plus":
      operationType = "+";
      valueY = valueX;
      valueX = null;

      break;

    case "minus":
      operationType = "-";
      valueY = valueX;
      valueX = null;

      break;

    case "mul":
      operationType = "*";
      valueY = valueX;
      valueX = null;

      break;

    case "equals":
      valueX = doEqueals();
      valueY = null;
      break;

    default:
      break;
  }

  renderScreen();
};

const eventsBind = () => {
  numberKeys.forEach((key) => {
    key.addEventListener("click", (e) => inputNumber(e));
  });

  specialKeys.forEach((key) => {
    key.addEventListener("click", (e) => specialOperation(e));
  });
};

eventsBind();
