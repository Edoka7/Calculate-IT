const numberKeys = document.querySelectorAll("[data-calckey");
const specialKeys = document.querySelectorAll("[data-calcspecialkey");

const mainInputScreen = document.querySelector("[data-calcScreen = main]");
const secondInputScreen = document.querySelector("[data-calcScreen = second]");

let valueX, valueY, operationType;

let equalsFlage = false;

const renderScreen = () => {
  if (valueY === null || valueY === undefined) {
    secondInputScreen.textContent = valueY;
  } else {
    secondInputScreen.textContent = `${valueY} ${operationType}`;
  }
  mainInputScreen.textContent = valueX;

  console.log(equalsFlage);
};

const inputNumber = (e) => {
  if (equalsFlage) {
    equalsFlage = false;
    valueX = null;
    valueY = null;
    renderScreen();
  }

  if (
    valueX === null ||
    valueX === undefined ||
    valueX === "0" ||
    valueX === 0
  ) {
    if (e.target.dataset.calckey === ".") {
      valueX = "0" + ".";
      return renderScreen();
    }
    valueX = e.target.dataset.calckey;
  } else if (e.target.dataset.calckey === "." && valueX.includes(".")) {
    return;
  } else {
    valueX += e.target.dataset.calckey;
  }

  renderScreen();
};

const doEqueals = () => {
  equalsFlage = true;

  valueX = Number(valueX);
  valueY = Number(valueY);

  switch (operationType) {
    case "÷":
      return valueY / valueX;
      break;

    case "+":
      return valueY + valueX;
      break;

    case "-":
      return valueY - valueX;
      break;

    case "×":
      return valueY * valueX;
      break;

    default:
      break;
  }
};

const checkInputs = (operation) => {
  if (
    valueX !== null &&
    valueX !== undefined &&
    valueX !== "0." &&
    valueY !== null &&
    valueY !== undefined
  ) {
    valueY = doEqueals();
    valueX = null;
    operationType = operation;
    renderScreen();
    return true;
  }
};

const specialOperation = (e) => {
  const clickKey = e.target.dataset.calcspecialkey;
  equalsFlage = false;

  if (clickKey === "ac") {
    valueX = null;
    valueY = null;
    renderScreen();
  } else if (valueX === null || valueX === undefined) return;
  else {
    switch (clickKey) {
      case "del":
        valueX = valueX.toString();

        valueX = valueX.slice(0, -1);

        break;

      case "div":
        if (checkInputs("÷")) return;

        operationType = "÷";
        valueY = valueX;
        valueX = null;
        break;

      case "plus":
        if (checkInputs("+")) return;

        operationType = "+";
        valueY = valueX;
        valueX = null;

        break;

      case "minus":
        if (checkInputs("-")) return;

        operationType = "-";
        valueY = valueX;
        valueX = null;

        break;

      case "mul":
        if (checkInputs("×")) return;

        operationType = "×";
        valueY = valueX;
        valueX = null;

        break;

      case "equals":
        valueX = doEqueals();
        valueY = null;
        operationType = null;
        break;

      default:
        break;
    }
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
